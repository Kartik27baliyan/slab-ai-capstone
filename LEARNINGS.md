# LEARNINGS.md - Slab.AI Project Insights

## 📚 **Learning Pathways**
### 1. Kubernetes Fundamentals
- [ ] **Core Concepts**: Pods, Deployments, Services  
  ```bash
  kubectl explain pods.spec  # Discover all pod options
## 🔍 Unexpected Kubernetes Learnings
### Q: Why does `kubectl get pods` show "0/1" when CPU usage is low?
**A**: It’s often **filesystem issues**...

-> Debugging Flowchart:
graph TD
  A[Pod Not Running] --> B{Logs?}
  B -->|Yes| C[Fix Application]
  B -->|No| D[Check Describe]
  D --> E[Resources/Probes]

 -> Helm Deep Dive
 Chart Anatomy:
helm/slab-ai/
├── Chart.yaml          # Metadata
├── values.yaml         # Configurations
└── templates/          # K8s manifests
    ├── deployment.yaml # Pod specs
    └── service.yaml    # Networking

 Template Functions:
# Example: Conditional resources
resources:
  {{- if .Values.production }}
  limits: { cpu: "1", memory: "1Gi" }
  {{- else }}
  limits: { cpu: "500m", memory: "256Mi" }
  {{- end }}

🏗️ Project-Specific Insights
Key Challenges & Solutions
Problem                       |  	        Solution       |                	Command
MongoDB Alpine Incompatibility|	Used bitnami/mongodb     | Helm chart	helm install mongodb bitnami/mongodb
CrashLoopBackOff	|  Added initialDelaySeconds: 30	 |     kubectl edit deploy/slab-ai
Port Conflicts	|  Switched to NodePort   |	kubectl patch svc slab-ai -p '{"spec":{"type":"NodePort"}}'

🧠 Concept Bank
Terms to Master
Liveness Probe: Kubernetes' health check
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30

Terraform State: Tracks real-world vs. config
terraform state list  # View managed resources

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

 ## 🎯 **CRITICAL BREAKTHROUGHS - 2025-09-28**

### **The Great MongoDB Connection Battle (48+ Hours Resolved)**

**Problem**: Backend pods in CrashLoopBackOff due to MongoDB connection failures
**Root Cause**: Mixed configurations and missing MongoDB service

**Key Learnings:**

1. **Helm Architecture Separation**
   ```bash
   # WRONG: Mixed backend + DB in one values.yaml
   # RIGHT: Separate deployments
   helm install mongodb bitnami/mongodb -n slab-ai -f mongodb-values.yaml
   helm install slab-ai-backend ./helm/slab-ai -n slab-ai



