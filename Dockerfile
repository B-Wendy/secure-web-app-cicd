FROM python:3.11-slim

WORKDIR /app

# Copy all files into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Render expects
EXPOSE 10000

# Run your Flask app
CMD ["flask", "--app", "app.app", "run", "--host=0.0.0.0", "--port=10000"]