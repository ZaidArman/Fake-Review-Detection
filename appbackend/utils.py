# Libraries
from tensorflow.keras.models import load_model
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences

model_path = 'ML_Model/reviews_classification_model.h5'
tokenizer_path = 'ML_Model/tokenizers.pkl'
# max_len = 100


class ReviewClassifier:
    def __init__(self, max_len, threshold=0.55):
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
    
    
    # """ For All result """

    # def classify_reviews(self, input_texts):
    #     results = []
    #     for i, text in enumerate(input_texts):
    #         is_genuine, predicted_label = self.classify_review(text)
    #         results.append((i + 1, is_genuine, predicted_label))
    #         print(f"Review {i + 1}: {'Genuine' if is_genuine else 'Fake'} with confidence {predicted_label:.2f}")

    #     return results


    # """ For Top_10 Result """
    def classify_reviews(self, input_texts):
        results = []
        for i, text in enumerate(input_texts):
            is_genuine, predicted_label = self.classify_review(text)
            results.append((i + 1, is_genuine, predicted_label))
        
        # Sort reviews by confidence in ascending order
        results.sort(key=lambda x: x[2], reverse=False)  # `reverse=True` for descending order
        
        # Return only top 10 results
        top_results = results[:10]
        
        # Print results
        for review_index, is_genuine, predicted_label in top_results:
            print(f"Review {review_index + 1}: {'Genuine' if is_genuine else 'Fake'} with confidence {predicted_label:.2f}")

        return top_results