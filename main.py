import random
import re
from collections import defaultdict

class WordPredictor:
    def __init__(self):
        # Dictionary where each word maps to a list of possible next words
        self.model = defaultdict(list)

    def train(self, text):
        # Break text into lowercase words (only letters/numbers)
        words = re.findall(r"\w+", text.lower())
        
        # Build a mapping: each word → the word(s) that follow it
        for i in range(len(words) - 1):
            self.model[words[i]].append(words[i + 1])

    def predict(self, word, num=3):
        # If the word wasn't seen in training, return a placeholder
        if word not in self.model:
            return ["<no suggestion>"]
        
        # Get all possible next words for this word
        suggestions = self.model[word]
        
        # Randomly sample up to `num` suggestions (avoid duplicates if fewer exist)
        return random.sample(suggestions, min(num, len(suggestions)))


# Example Usage
if __name__ == "__main__":
    sample_text = """I love AI. I love Python. I love machine learning. 
                     You love AI too. AI is amazing."""
    
    predictor = WordPredictor()
    predictor.train(sample_text)  # Train model with the sample text
    
    # Ask the model: "What words usually come after 'love'?"
    print("Next word after 'I love':", predictor.predict("love"))
    
    # Ask the model: "What words usually come after 'ai'?"
    print("Next word after 'AI':", predictor.predict("ai"))
