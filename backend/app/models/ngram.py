from collections import Counter
from typing import Dict, List, Tuple, Iterable, Set
# To avoid extra file, we’ll import from tokenizer directly:
from app.core.tokenizer import START, END, tokenize, sentenceize

class TrigramModel:
    def __init__(self, alpha: float = 0.8):
        self.alpha = alpha
        self.V: Set[str] = set([START, END])
        self.uni: Counter[str] = Counter()
        self.bi: Counter[tuple] = Counter()
        self.tri: Counter[tuple] = Counter()

    def update_from_text(self, text: str) -> None:
        for s in sentenceize(text):
            for tok in s:
                if tok not in (START, END):
                    self.V.add(tok)
            for i in range(2, len(s)):
                w1, w2, w3 = s[i-2], s[i-1], s[i]
                self.uni[w3] += 1
                self.bi[(w1, w2)] += 1
                self.tri[(w1, w2, w3)] += 1

    def _vocab_size(self) -> int:
        return len(self.V | {END})

    def topk_next(self, context_tokens: Iterable[str], k: int = 5) -> List[Tuple[str, float]]:
        ctx = [START, START] + list(context_tokens)
        w1, w2 = ctx[-2], ctx[-1]
        V = list(self.V | {END})
        alpha = self.alpha
        denom = self.bi[(w1, w2)] + alpha * self._vocab_size()

        if denom == 0:
            total_uni = sum(self.uni.values())
            denom_uni = total_uni + alpha * self._vocab_size()
            scores = [(w, (self.uni[w] + alpha) / denom_uni) for w in V]
        else:
            scores = [(w, (self.tri[(w1, w2, w)] + alpha) / denom) for w in V]

        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:k]

    def to_dict(self) -> Dict:
        return {
            "alpha": self.alpha,
            "V": sorted(list(self.V)),
            "uni": dict(self.uni),
            "bi": {"|".join(k): v for k, v in self.bi.items()},
            "tri": {"|".join(k): v for k, v in self.tri.items()},
        }

    @classmethod
    def from_dict(cls, d: Dict) -> "TrigramModel":
        m = cls(alpha=float(d.get("alpha", 0.8)))
        m.V = set(d.get("V", [])) | {START, END}
        m.uni = Counter(d.get("uni", {}))
        m.bi = Counter({tuple(k.split("|")): v for k, v in d.get("bi", {}).items()})
        m.tri = Counter({tuple(k.split("|")): v for k, v in d.get("tri", {}).items()})
        return m
