#!/bin/bash

# Deployment script for İş Randevu Sistemi
# Usage: ./deploy.sh [staging|production]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
PROJECT_NAME="is-randevu-sistemi"
DOCKER_COMPOSE_FILE="../docker/docker-compose.yml"

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root"
    fi
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        error "Docker daemon is not running"
    fi
    
    success "Prerequisites check passed"
}

# Validate environment
validate_environment() {
    log "Validating environment: $ENVIRONMENT"
    
    if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
        error "Invalid environment. Use 'staging' or 'production'"
    fi
    
    # Check if environment file exists
    if [[ ! -f "../environments/.env.$ENVIRONMENT" ]]; then
        error "Environment file .env.$ENVIRONMENT not found"
    fi
    
    success "Environment validation passed"
}

# Backup current deployment
backup_deployment() {
    log "Creating backup of current deployment..."
    
    BACKUP_DIR="../backups/$(date +'%Y%m%d_%H%M%S')"
    mkdir -p "$BACKUP_DIR"
    
    # Backup Docker volumes
    docker run --rm -v ${PROJECT_NAME}_postgres-data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/postgres-data.tar.gz -C /data .
    docker run --rm -v ${PROJECT_NAME}_redis-data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/redis-data.tar.gz -C /data .
    
    success "Backup created in $BACKUP_DIR"
}

# Pull latest changes
pull_changes() {
    log "Pulling latest changes from Git..."
    
    if [[ -d ".git" ]]; then
        git pull origin main
        success "Git changes pulled successfully"
    else
        warning "Not a Git repository, skipping pull"
    fi
}

# Build and deploy
deploy() {
    log "Starting deployment to $ENVIRONMENT..."
    
    # Load environment variables
    export $(cat "../environments/.env.$ENVIRONMENT" | xargs)
    
    # Build images
    log "Building Docker images..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache
    
    # Stop existing services
    log "Stopping existing services..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" down
    
    # Start services
    log "Starting services..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d
    
    # Wait for services to be ready
    log "Waiting for services to be ready..."
    sleep 30
    
    # Check service health
    check_health
    
    success "Deployment completed successfully"
}

# Health check
check_health() {
    log "Performing health checks..."
    
    # Check frontend
    if curl -f http://localhost:3000/health &> /dev/null; then
        success "Frontend is healthy"
    else
        error "Frontend health check failed"
    fi
    
    # Check backend
    if curl -f http://localhost:8000/health &> /dev/null; then
        success "Backend is healthy"
    else
        error "Backend health check failed"
    fi
    
    # Check database
    if docker exec ${PROJECT_NAME}_postgres_1 pg_isready -U app_user &> /dev/null; then
        success "Database is healthy"
    else
        error "Database health check failed"
    fi
    
    # Check Redis
    if docker exec ${PROJECT_NAME}_redis_1 redis-cli ping &> /dev/null; then
        success "Redis is healthy"
    else
        error "Redis health check failed"
    fi
}

# Run database migrations
run_migrations() {
    log "Running database migrations..."
    
    # This would typically run your migration scripts
    # For now, we'll just log it
    warning "Database migrations not implemented yet"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    
    # Remove unused images
    docker image prune -f
    
    # Remove old containers
    docker container prune -f
    
    # Remove old volumes (be careful with this in production)
    if [[ "$ENVIRONMENT" == "staging" ]]; then
        docker volume prune -f
    fi
    
    success "Cleanup completed"
}

# Main deployment flow
main() {
    log "Starting deployment process for $ENVIRONMENT environment"
    
    check_root
    check_prerequisites
    validate_environment
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        read -p "Are you sure you want to deploy to PRODUCTION? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled"
        fi
    fi
    
    backup_deployment
    pull_changes
    deploy
    run_migrations
    cleanup
    
    success "Deployment process completed successfully!"
    log "Application is now running at:"
    log "  Frontend: http://localhost:3000"
    log "  Backend:  http://localhost:8000"
    log "  Grafana:  http://localhost:3001"
    log "  Prometheus: http://localhost:9090"
}

# Run main function
main "$@"
