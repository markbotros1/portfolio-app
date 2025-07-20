import warnings
warnings.filterwarnings('ignore')
import io
import sys
import base64
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

def generate_cap(raw_image, processor=processor, model=model):
    image = Image.open(raw_image)
    inputs = processor(image, return_tensors ="pt")
    out = model.generate(**inputs)
    return processor.decode(out[0], skip_special_tokens=True)

img = io.BytesIO(sys.stdin.buffer.read())
print(generate_cap(img))