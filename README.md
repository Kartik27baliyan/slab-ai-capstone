# Slab.ai - Lead-to-Learning Platform  

## **Overview**  
An EdTech platform to capture learner interest, manage enrollments & payments, and deliver content reliably.  

### **Architecture (Target Production)**  
- **AWS EKS** for Kubernetes cluster  
- **Terraform** for provisioning cloud resources  
- **MongoDB Atlas** for the database  
- **Helm** for Kubernetes package management  

---

## **Local Development Setup (Current Progress)**  
### **Prerequisites**  
- Minikube  
- Node.js  
- Helm  
- Terraform  

### **Local Components**  
✅ **Minikube Kubernetes Cluster**  
- MongoDB deployed in `slab-ai` namespace:  
  ```bash
  kubectl port-forward -n slab-ai svc/mongodb 27017:27017

✅ Node.js Backend

Connects to local MongoDB:
mongodb://admin:admin123@localhost:27017/slabai
cd backend && npm start

✅ Helm Chart

Pre-configured for local testing:
Bash:
helm install slab-ai ./helm/slab-ai -n slab-ai --dry-run

✅ Terraform (Local Configs)

Local state management in terraform/environments/dev/:
Bash:
terraform init && terraform plan

Usage
Production (AWS)
terraform init
terraform plan
terraform apply

Local Development
Start Minikube:
minikube start

Deploy MongoDB:
Bash:
helm install mongodb bitnami/mongodb -n slab-ai --set auth.rootPassword=admin123

Run backend:
Bash:
cd backend && npm start





