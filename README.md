portfolio-app
============
A web app to showcase some of my favorite projects

![alt text](https://github.com/markbotros1/action-recognition/blob/main/resources/example.gif)

Summary
-------
- Containerized project using Docker to recreate project env (including OpenCV, PyTorch, hugginface, etc...)
- Uploaded data and Docker image to AWS S3 and ECR, respectively 
- Finetuned pretrained ViViT model (from hugginface) on AWS EC2 GPU-enabled instance
- Model based on [ViViT: A Video Vision Transformer](https://arxiv.org/abs/2103.15691)

Setup
-----
Assuming you have docker installed:
1. Pull data from: https://www.kaggle.com/competitions/nfl-player-contact-detection/data
2. Store data in project directory
