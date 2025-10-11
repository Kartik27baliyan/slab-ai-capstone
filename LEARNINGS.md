SLAB.AI - Production Deployment Documentation
📋 Project Overview
SLAB.AI is a full-stack AI application deployed on Kubernetes with Helm, featuring a React frontend, Node.js backend, and MongoDB database.


🏗️ Architecture


┌─────────────────┐    ┌──────────────────┐          ┌─────────────────┐
│   Frontend      │    │    Backend API   │          │   MongoDB       │
│  (React)        │◄──►│   (Node.js)      │  ◄──►    │  (Database)     │
│  Port: 80       │    │   Port: 3000     │          │  Port: 27017    │
└─────────────────┘    └──────────────────┘          └─────────────────┘


🚀 Deployment Journey & Critical Breakthroughs
Phase 1: Foundation Setup
Date: September 25, 2025
Objective: Establish basic Kubernetes infrastructure

Key Learnings:
Kubernetes Core Concepts: Mastered Pods, Deployments, Services
Helm Architecture: Understood chart structure and templating
Resource Management: Configured CPU/memory limits appropriately
# Core Kubernetes commands mastered
kubectl explain pods.spec                    # Discover pod options
kubectl get all -n slab-ai                  # View all resources
kubectl describe pod <pod-name> -n slab-ai  # Detailed pod inspection

Phase 2: The Great MongoDB Connection Battle
Date: September 28, 2025
Duration: 48+ hours of intensive debugging
Breakthrough: Separated database and application concerns

Problem Analysis:
graph TD
    A[Backend CrashLoopBackOff] --> B{Check Pod Logs}
    B --> C[Application Errors]
    B --> D[System Issues]
    C --> E[Fix MongoDB Connection]
    D --> F[Adjust Resource Limits]
    E --> G[Add Environment Variables]
    F --> G
    G --> H[Healthy Pod]
   
Root Cause:
Mixed configurations in single Helm values.yaml causing dependency conflicts
Solution Implemented:
# Separate database deployment
helm install mongodb bitnami/mongodb -n slab-ai -f mongodb-values.yaml
# Independent backend deployment  
helm install slab-ai-backend ./helm/slab-ai -n slab-ai

Phase 3: Backend Stabilization
Date: September 28, 2025
Achievement: Backend transitioned from CrashLoopBackOff to Healthy
Critical Fixes:
Environment Variables: Added MongoDB connection string
Health Probes: Configured proper liveness/readiness checks
Resource Allocation: Optimized CPU and memory limits
# Backend deployment configuration
env:
  - name: MONGODB_URI
    value: "mongodb://slab-ai-slab-ai-chart-mongodb:27017/slabai"
  - name: NODE_ENV
    value: "production"
  - name: PORT
    value: "3000"

livenessProbe:
  httpGet:
    path: /api/healthcheck
    port: 3000
  initialDelaySeconds: 30

  Phase 4: Frontend Integration
  Date: October 5, 2025
Challenge: Helm template inconsistencies and port conflicts
Problems Solved:
Label Mismatches: Fixed selector-label inconsistencies
Port Conflicts: Resolved development vs production port mappings
Service Discovery: Corrected Kubernetes service naming
# Production access commands
kubectl port-forward svc/slab-ai-slab-ai-chart-frontend 8081:80    # Frontend
kubectl port-forward pod/slab-ai-slab-ai-chart-<pod-id> 8083:3000 # Backend

Phase 5: Production Deployment Victory
Date: October 11, 2025
Status: Full-stack application successfully deployed and accessible
🛠️ Technical Implementation
Helm Chart Structure
helm/slab-ai/
├── Chart.yaml              # Metadata and dependencies
├── values.yaml             # Production configuration
└── templates/
    ├── deployment.yaml     # Backend pod specification
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── service.yaml        # Backend service
    ├── mongodb-deployment.yaml
    ├── mongodb-service.yaml
    ├── mongodb-pvc.yaml    # Persistent volume claim
    └── ingress.yaml        # External access (future)

Production Values Configuration
    # values.yaml - Production ready configuration
replicaCount: 1

image:
  repository: slab-backend
  pullPolicy: IfNotPresent  
  tag: "prod"

service:
  type: ClusterIP
  port: 3000

serviceAccount:
  create: true
  automount: true

frontend:
  enabled: true
  image:
    repository: slab-ai-frontend
    tag: latest
  service:
    type: ClusterIP  
    port: 80

mongodb:
  enabled: true

resources:
  limits:
    cpu: 500m
    memory: 256Mi
  requests:
    cpu: 200m
    memory: 128Mi

🔧 Critical Debugging Methodology
Problem-Solving Framework
One Command at a Time: Systematic approach to avoid confusion
Log Analysis: Always check pod logs first
Resource Inspection: Use kubectl describe for detailed info
Incremental Testing: Verify each component independently
Common Issues & Solutions
Problem       ||	Symptoms	        ||     Solution:

CrashLoopBackOff	||Pod restarts continuously	|| Check logs, adjust probes, verify resources
Service Not Found	|| Connection refused errors	|| Verify service names and selectors
Port Conflicts	|| Bind permission errors	|| Use alternative ports (8081, 8083)
MongoDB Disconnected	||  Health check failures	|| Add environment variables, verify service DNS

🎯 Production Access Points
Current Deployment Status
# Verify all services
kubectl get all -n slab-ai

# Expected output:
# ✅ Backend Pod: Running
# ✅ Frontend Pod: Running  
# ✅ MongoDB Pod: Running
# ✅ All Services: Active

Application Endpoints
Frontend: http://localhost:8081
Backend API: http://localhost:8083/api/healthcheck
MongoDB: Internal service (slab-ai-slab-ai-chart-mongodb:27017)
Health Verification
# Backend health check
curl http://localhost:8083/api/healthcheck
# Expected: {"status":"healthy","mongo":"connected","timestamp":"..."}

# Frontend accessibility  
curl -I http://localhost:8081
# Expected: HTTP 200 OK

📚 Key Technical Learnings
Kubernetes Mastery
Pod Management: Lifecycle, resource allocation, health monitoring
Service Discovery: DNS-based communication between services
Persistent Storage: MongoDB data persistence with PVC
Networking: ClusterIP services and port forwarding
Helm Best Practices
Template Functions: Conditional resources, value injection
Value Management: Structured configuration hierarchy
Release Management: Upgrade/rollback procedures
Dependency Handling: Separate concerns for database and application
Production Readiness
Health Monitoring: Liveness and readiness probes
Resource Optimization: Appropriate CPU/memory limits
Environment Configuration: Secure management of sensitive data
Service Reliability: Proper service naming and discovery
🚀 Future Enhancements
Immediate Next Steps
Ingress Configuration: External access with proper domains
CI/CD Pipeline: Automated testing and deployment
Monitoring Stack: Prometheus and Grafana integration
Security Hardening: Network policies and secrets management
Production Scaling
# Future scaling configuration
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80

  🎓 Demonstration Script
For Presentation
Infrastructure Overview
kubectl get all -n slab-ai

Application Access
Open browser: http://localhost:8081
Show backend API: curl http://localhost:8083/api/healthcheck
Problem-Solving Demonstration

Explain the 5 major deployment challenges
Show how each was systematically resolved
Highlight the debugging methodology
Technical Depth

Discuss Helm template improvements
Explain Kubernetes networking
Demonstrate production configuration
📈 Success Metrics
✅ 100% Service Uptime: All components running stable
✅ Database Persistence: MongoDB data surviving pod restarts
✅ Health Monitoring: Proper probe configuration
✅ Resource Efficiency: Optimal CPU/memory utilization
✅ Development Experience: Smooth local development workflow

Documentation Version: 1.0
Last Updated: October 11, 2025
Deployment Status: ✅ Production Ready
Maintainer: Kartik Baliyan


