FROM python:3.10-bookworm

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT PRODUCTION

WORKDIR /app

RUN apt-get update -y 
RUN apt-get install -y git ca-certificates
RUN apt-get update && \
    apt-get install -y \
        python3-dev \
        libpq-dev \
        libmariadb-dev \
        build-essential \
        cmake \
        swig \
        pkgconf

RUN apt-get install curl
RUN curl -k -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xzv

COPY requirements.txt /app/
RUN pip install wheel
RUN pip install --upgrade pip
# RUN pip install faiss-cpu
RUN pip install pyarrow
RUN pip install pyOpenSSL
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

RUN python main.py
