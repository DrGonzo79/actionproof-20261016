FROM node:22-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.13-slim
WORKDIR /app
COPY api ./api
COPY data ./data
RUN pip install --no-cache-dir fastapi==0.119.0 uvicorn==0.37.0
COPY --from=frontend /app/out ./static
EXPOSE 8000
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
