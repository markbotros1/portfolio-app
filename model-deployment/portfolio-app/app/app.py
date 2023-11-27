import warnings
warnings.filterwarnings('ignore')
import io
import os
import json
import base64
from PIL import Image
from transformers import pipeline
from streaming_form_data import StreamingFormDataParser
from streaming_form_data.targets import ValueTarget

t_model_dir = os.getenv('MODEL_DIR_TRANSLATE', '/mnt/ml/translate/')
c_model_dir = os.getenv('MODEL_DIR_CAPTION', '/mnt/ml/caption/')
translation_pipe = pipeline("text2text-generation", model=t_model_dir)
caption_pipe = pipeline('image-to-text', model=c_model_dir)

def translate(input):
    translation = translation_pipe(input)[0]['generated_text']
    return translation

def caption(input):
    image = Image.open(io.BytesIO(input))
    caption = caption_pipe(image)[0]['generated_text']
    return postprocess(caption)

def postprocess(output:str):
    lst = output.split(' ')
    for i, x in enumerate(lst):
        if x == 'arafed':
            lst[i] = 'a'
    processed = lst[0]
    for i in range(1, len(lst)):
        processed = processed + ' ' + lst[i]
    return processed

def lambda_handler(event, context):
    func = event['headers']['function']
    if func == 'translate':
        input = event['body']
        output = translate(input)
    if func == 'caption':
        parser = StreamingFormDataParser(headers=event['headers'])
        input = ValueTarget()
        parser.register('image', input)
        data = base64.b64decode(event['body'])
        parser.data_received(data)
        output = caption(input.value)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,function",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        'body': json.dumps(
            {
                'output': output,
            }
        )
    }
