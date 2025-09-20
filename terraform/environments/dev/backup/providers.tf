provider "kubernetes" {
  config_path = "~/.kube/config"  # Placeholder for initial init
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"  # Placeholder for initial init
  }
}
