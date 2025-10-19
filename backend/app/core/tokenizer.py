import re
from typing import List

TOKEN_RE = re.compile(r"[A-Za-z0-9']+")
START = "<s>"
END = "</s>"

def tokenize(text: str) -> List[str]:
    return [t.lower() for t in TOKEN_RE.findall(text or "")]

def sentenceize(text: str) -> List[List[str]]:
    parts = re.split(r"[.!?]+\s*", (text or "").strip())
    sents = []
    for p in parts:
        if not p:
            continue
        toks = tokenize(p)
        if toks:
            sents.append([START, START] + toks + [END])
    return sents
