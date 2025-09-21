# Slab.AI - Lead-to-Learning Platform

## 🏠 **Local Development Setup**  
*Everything you need to run the project locally*  

### 📦 **Prerequisites**  
1. [Minikube](https://minikube.sigs.k8s.io/docs/start/)  
2. [Node.js v18+](https://nodejs.org/)  
3. [Helm](https://helm.sh/docs/intro/install/)  
4. [Docker](https://docs.docker.com/get-docker/)  

### 🚀 **Quick Start**  
```bash
# 1. Start cluster
minikube start
minikube addons enable ingress

# 2. Deploy MongoDB
helm install mongodb bitnami/mongodb -n slab-ai --set auth.rootPassword=admin123

# 3. Build & deploy backend
docker build -t slab-backend:prod -f backend/Dockerfile.prod backend/
helm install slab-ai ./helm/slab-ai -n slab-ai

# 4. Access services
kubectl port-forward svc/slab-ai-slab-ai-chart 8080:80 -n slab-ai &
kubectl port-forward svc/mongodb 27017:27017 -n slab-ai &
```
🌐 Access Endpoints
Backend Healthcheck: http://localhost:8080/api/healthcheck
MongoDB: mongodb://admin:admin123@localhost:27017/slabai

🛠️ Project Structure
slab-ai-capstone/
├── backend/            # Node.js server
│   ├── Dockerfile      # Dev image
│   ├── Dockerfile.prod # Optimized production image
│   └── server.js       # Main app
├── helm/               # Kubernetes templates
├── terraform/          # Cloud infrastructure
└── README.md           # This file

💡 Key Features
✅ Local Kubernetes

Minikube cluster with MongoDB
Helm charts for easy deployment
✅ Backend

Dockerized Node.js server
Healthcheck endpoint (/api/healthcheck)
✅ Automation Ready

GitHub Actions workflow (.github/workflows/deploy.yml)
Terraform configs for AWS

🚧 Troubleshooting
Problem: Port 8080 already in use
# Find and kill the process
sudo lsof -i :8080
kill -9 <PID>

Problem: Pods crash repeatedly
# Check logs
kubectl logs -n slab-ai <pod-name> --previous

📜 License
MIT © 2023 [Kartik27baliyan]
