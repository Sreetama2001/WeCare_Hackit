

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Create the directory for the container
WORKDIR /app
COPY requirements.txt ./requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app
#COPY ./app /app/app



# Run by specifying the host and port
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]
