import numpy as np
import pandas as pd
import pickle 
import joblib

import warnings
warnings.filterwarnings('ignore')

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

# Load the model
model = load_model('/Users/apple/Downloads/backend/ML_Model/reviews_classification_model.h5')

# Load the tokenizer
with open('/Users/apple/Downloads/backend/ML_Model/tokenizers.pkl ', 'rb') as f:
    tokenizer = pickle.load(f)

def preprocess_text(text, tokenizer, max_len):
    text_seq = tokenizer.texts_to_sequences([text])
    text_pad = pad_sequences(text_seq, maxlen=max_len)
    return text_pad


input_text = input("Enter Review Comment for testing the model: ")

# Preprocess the input text
max_len = 400
input_text_pad = preprocess_text(input_text, tokenizer, max_len)

# Predict the label (1 for genuine, 0 for fake)
predicted_label = model.predict(input_text_pad)[0][0]

# Classify based on the predicted label
if predicted_label >= 0.5:
    print("The review is Genuine")
else:
    print("The review is Fake")