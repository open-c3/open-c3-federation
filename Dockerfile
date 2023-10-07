FROM python:3.11.5-slim

WORKDIR /app

COPY Pipfile /app
COPY Pipfile.lock /app

RUN mkdir -p /app/log
RUN mkdir -p /app/data

RUN pip install pipenv

RUN pipenv install --deploy --ignore-pipfile