FROM python:3.11.5-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y \
    gcc \
    && apt-get clean

RUN pip install pipenv

RUN pipenv install --deploy --ignore-pipfile

EXPOSE 5000

CMD ["pipenv", "run", "gunicorn", "run:app", "-w", "5", "-b", "0.0.0.0:5000"]

