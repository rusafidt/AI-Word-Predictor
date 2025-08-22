import random
import re
from collections import defaultdict

class WordPredictor:
    def __init__(self):
        self.model = defaultdict(list)

    def train(self, text):
        # Simple cleaning
        words = re.findall(r"\w+", text.lower())
        for i in range(len(words) - 1):
            self.model[words[i]].append(words[i + 1])

    def predict(self, word, num=3):
        if word not in self.model:
            return ["<no suggestion>"]
        suggestions = self.model[word]
        return random.sample(suggestions, min(num, len(suggestions)))


# Example Usage
if __name__ == "__main__":
    sample_text = """I love AI. I love Python. I love machine learning. 
                     You love AI too. AI is amazing."""
    
    predictor = WordPredictor()
    predictor.train(sample_text)
    
    print("Next word after 'I love':", predictor.predict("love"))
    print("Next word after 'AI':", predictor.predict("ai"))
