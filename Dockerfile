FROM python:3.11.5-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y \
    gcc \
    && apt-get clean

RUN pip install pipenv

RUN pipenv install --deploy --ignore-pipfile

ENTRYPOINT ["/app/entrypoint.sh"]
