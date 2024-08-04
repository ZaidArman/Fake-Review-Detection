# Libraries
from tensorflow.keras.models import load_model
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences

class ReviewClassifier:
    def __init__(self, model_path, tokenizer_path, max_len, threshold=0.55):
        # Load the model
        self.model = load_model(model_path)
        
        # Load the tokenizer
        with open(tokenizer_path, 'rb') as f:
            self.tokenizer = pickle.load(f)
        
        self.max_len = max_len
        self.threshold = threshold

    def preprocess_text(self, text):
        text_seq = self.tokenizer.texts_to_sequences([text])
        text_pad = pad_sequences(text_seq, maxlen=self.max_len)
        return text_pad

    def classify_review(self, text):
        input_text_pad = self.preprocess_text(text)
        predicted_label = self.model.predict(input_text_pad)[0][0]
        is_genuine = predicted_label >= self.threshold
        return is_genuine, predicted_label

    def classify_reviews(self, input_texts):
        results = []
        
        for i, text in enumerate(input_texts):
            is_genuine, predicted_label = self.classify_review(text)
            results.append((i + 1, is_genuine, predicted_label))
            print(f"Review {i+1}: {'Genuine' if is_genuine else 'Fake'} with confidence {predicted_label:.2f}")

        return results

# Example usage:
if __name__ == "__main__":
    model_path = '/Users/apple/Downloads/backend/ML_Model/reviews_classification_model.h5'
    tokenizer_path = '/Users/apple/Downloads/backend/ML_Model/tokenizers.pkl'
    max_len = 100

    # Example list of input texts
    input_texts = ["This product is great!", "This is a terrible product.", "Absolutely love it!"] # Replace with your actual list of texts

    # Initialize the classifier
    classifier = ReviewClassifier(model_path, tokenizer_path, max_len)

    # Classify reviews
    classifier.classify_reviews(input_texts) # product_review = input_text
