FROM public.ecr.aws/lambda/python:3.11

COPY requirements.txt ./

RUN yum install -y gcc gcc-c++
RUN python3.11 -m pip install -r requirements.txt -t .

RUN mkdir -p /mnt/ml

COPY app.py ./

CMD ["app.lambda_handler"]
