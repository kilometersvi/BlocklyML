# typical dockerfile

FROM python:3.9-slim

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

# create a directory for generated matplotlib images
RUN mkdir -p /usr/src/app/generated_images

COPY . .

EXPOSE 80

ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
