FROM python:3.11.5-slim

WORKDIR /app

COPY . /app

COPY /data/open-c3-fed-data/.env /app
COPY /data/open-c3-fed-data/config.json /app

ENV FLASK_APP run.py
ENV FLASK_RUN_HOST 0.0.0.0

RUN apt-get update && apt-get install -y \
    gcc \
    && apt-get clean

RUN pip install pipenv

RUN pipenv install --deploy --ignore-pipfile

EXPOSE 5000

CMD ["pipenv", "run", "gunicorn", "run:app", "-w", "5", "-b", "0.0.0.0:5000"]
