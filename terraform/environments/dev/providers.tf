# AWS Provider - Just enough to create the EKS cluster
provider "aws" {
  region = "ca-central-1"
}

# Placeholder Kubernetes provider - we'll configure this AFTER cluster is built
provider "kubernetes" {
  config_path = "~/.kube/config"  # This file doesn't exist yet, and that's OK for now
}

# Placeholder Helm provider - we'll configure this AFTER cluster is built  
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"  # Same placeholder
  }
}
