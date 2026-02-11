FROM python:3.10-slim

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y gcc

# Copy backend + digital twin
COPY backend/ backend/
COPY digital_twin/ digital_twin/

# Install python deps
RUN pip install --no-cache-dir \
    django djangorestframework \
    numpy pandas scikit-learn \
    redis kafka-python \
    prometheus-client

EXPOSE 3000

CMD ["python", "backend/server.py"]
