variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "slab-ai"
}

variable "environment" {
  description = "The deployment environment"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ca-central-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}
