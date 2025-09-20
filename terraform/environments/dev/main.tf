# Get AWS availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Create the VPC
module "vpc" {
  source = "../../modules/vpc"
  # ... your other args ...
}

# Create the EKS cluster
module "eks" {
  source = "../../modules/eks"
  # ... your other args ...
}
