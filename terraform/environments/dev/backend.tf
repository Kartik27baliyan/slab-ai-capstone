terraform {
  backend "s3" {
    bucket         = "slab-ai-terraform-state-dev"  # We'll create this bucket first
    key            = "terraform.tfstate"
    region         = "ca-central-1"                 # Change to your preferred region
    dynamodb_table = "slab-ai-terraform-locks-dev"  # For state locking
    encrypt        = true
  }
}
