# LEARNINGS.md - Slab.AI Full-Stack Deployment
📚 Learning Pathways
1. Kubernetes Fundamentals
 Core Concepts: Pods, Deployments, Services
Bash

kubectl explain pods.spec  # Discover all pod options
🔍 Unexpected Kubernetes Learnings
Q: Why does kubectl get pods show "0/1" when CPU usage is low?
A: It’s often filesystem issues...

-> Debugging Flowchart:
graph TD
A[Pod Not Running] --> B{Logs?}
B -->|Yes| C[Fix Application]
B -->|No| D[Check Describe]
D --> E[Resources/Probes]

-> Helm Deep Dive
Chart Anatomy:
helm/slab-ai/
├── Chart.yaml # Metadata
├── values.yaml # Configurations
└── templates/ # K8s manifests
├── deployment.yaml # Pod specs
└── service.yaml # Networking

Template Functions:

Example: Conditional resources
resources:
{{- if .Values.production }}
limits: { cpu: "1", memory: "1Gi" }
{{- else }}
limits: { cpu: "500m", memory: "256Mi" }
{{- end }}

🏗️ Project-Specific Insights
Key Challenges & Solutions
Problem | Solution | Command
MongoDB Alpine Incompatibility| Used bitnami/mongodb | Helm chart helm install mongodb bitnami/mongodb
CrashLoopBackOff | Added initialDelaySeconds: 30 | kubectl edit deploy/slab-ai
Port Conflicts | Switched to NodePort | kubectl patch svc slab-ai -p '{"spec":{"type":"NodePort"}}'

🧠 Concept Bank
Terms to Master
Liveness Probe: Kubernetes' health check
livenessProbe:
httpGet:
path: /health
port: 3000
initialDelaySeconds: 30

Terraform State: Tracks real-world vs. config
terraform state list # View managed resources

Likely Questions
"How did you debug CrashLoopBackOff?"

Answer Structure:
Checked logs (kubectl logs --previous)
Verified resources (kubectl describe pod)
Adjusted probes (added initialDelaySeconds)
"Why Helm over plain YAML?"

Talking Points:
Template reuse ({{ .Values.image.tag }})
Versioned releases (helm history slab-ai)

📅 Progress Tracker
2025-09-25
Achieved:
Fixed MongoDB connection issues
Documented Helm value overrides
Next Goals:
Add React frontend to Helm
Configure Prometheus monitoring

🎯 CRITICAL BREAKTHROUGHS - 2025-09-28
The Great MongoDB Connection Battle (48+ Hours Resolved)
Problem: Backend pods in CrashLoopBackOff due to MongoDB connection failures
Root Cause: Mixed configurations and missing MongoDB service

Key Learnings:

Helm Architecture Separation
Bash

# WRONG: Mixed backend + DB in one values.yaml
# RIGHT: Separate deployments
helm install mongodb bitnami/mongodb -n slab-ai -f mongodb-values.yaml
helm install slab-ai-backend ./helm/slab-ai -n slab-ai

# 🚀 Backend Deployment Victory - Learnings
🎯 The Battle Won: September 28, 2025
"Ad astra per aspera" - through difficulties to the stars!

🏆 Key Victories
✅ MongoDB Connection Stabilized
✅ /api/leads Endpoint Live
✅ Helm Charts Corrected & Deployed
✅ Backend Running in CrashLoopBackOff → Healthy
✅ Frontend Docker Setup Ready for Next Phase
💡 Critical Insights Gained
Always look for the port configuration and mongo connection,
Pods Logs are useful insight to overcome any POD failure chellange,

🛠️ Tools Mastered
Helm Configuration,Kubernetes PODS configuration

## 🚀 DEPLOYMENT VICTORIES
### **Frontend-Backend Helm Integration (2025-10-05)**
- **Fixed**: Label mismatches in Helm templates  
- **Solved**: Port conflicts between dev (Vite) and prod (K8s)  
- **Verified**: Full-stack access via:
  ```bash
  # Frontend (Prod)
  kubectl port-forward svc/slab-ai-chart-frontend 8080:80
  # Backend (API)
  kubectl port-forward svc/slab-ai-backend 8082:3000
🛠️ KEY COMMANDS
Scenario	Command
Fix Helm label conflicts	kubectl delete ingress,svc -n slab-ai -l app.kubernetes.io/instance=slab-ai-backend
Debug CrashLoopBackOff	kubectl logs -n slab-ai <pod-name> --previous
Check port occupancy	netstat -ano | findstr 8082 (Windows) / lsof -i :8082 (Linux/Mac)
📚 CORE INSIGHTS
Helm Best Practices
Label Consistency:

YAML

# templates/frontend-deployment.yaml
selector:
  matchLabels:
    app.kubernetes.io/name: {{ include "slab-ai-chart.name" . }}-frontend
template:
  metadata:
    labels:
      app.kubernetes.io/name: {{ include "slab-ai-chart.name" . }}-frontend
Probes Matter:

YAML

livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 15  
  
# Critical for slow-starting containers
🌐 ENVIRONMENT ACCESS
Component	Dev (Local)	Prod (K8s)
Frontend	localhost:5173	localhost:8080
Backend	Proxy to :8082	localhost:8082

🚨 GOTCHAS & SOLUTIONS
"Port already in use"
→ Run kubectl port-forward in separate terminals or background with &

Helm "invalid ownership" errors
→ Always clean old releases:

Bash

helm uninstall slab-ai-backend -n slab-ai
kubectl delete svc,deploy -n slab-ai -l app.kubernetes.io/instance=slab-ai-backend
🎯 NEXT STEPS
Configure Ingress:
Bash

kubectl apply -f helm/slab-ai/templates/ingress.yaml
Set up CI/CD (GitHub Actions example):
YAML

- name: Deploy to K8s
  run: |
    helm upgrade slab-ai ./helm/slab-ai -n slab-ai
