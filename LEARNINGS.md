# LEARNINGS.md - Slab.AI Full-Stack Deployment

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
  initialDelaySeconds: 15  # Critical for slow-starting containers
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
