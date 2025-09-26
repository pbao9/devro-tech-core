#!/bin/bash

# DevroTech CMS Production Deployment Script
# Usage: ./deploy.sh [environment] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
BACKUP_DIR="/var/backups/devrotech"
LOG_FILE="/var/log/devrotech-deploy.log"
MAINTENANCE_FILE="storage/framework/down"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a $LOG_FILE
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
fi

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    error "Please run this script from the DevroTech CMS root directory"
fi

log "🚀 Starting DevroTech CMS deployment for environment: $ENVIRONMENT"

# Create backup
backup() {
    log "📦 Creating backup..."
    
    # Create backup directory if it doesn't exist
    sudo mkdir -p $BACKUP_DIR
    
    # Create backup filename with timestamp
    BACKUP_FILE="$BACKUP_DIR/devrotech-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    
    # Create backup
    sudo tar -czf "$BACKUP_FILE" \
        --exclude='node_modules' \
        --exclude='vendor' \
        --exclude='storage/logs/*' \
        --exclude='storage/debugbar/*' \
        --exclude='.git' \
        --exclude='.github' \
        .
    
    log "✅ Backup created: $BACKUP_FILE"
    
    # Keep only last 5 backups
    sudo find $BACKUP_DIR -name "devrotech-backup-*.tar.gz" -type f -mtime +5 -delete
}

# Enable maintenance mode
enable_maintenance() {
    log "🔧 Enabling maintenance mode..."
    php artisan down --message="System maintenance in progress" --retry=60
}

# Disable maintenance mode
disable_maintenance() {
    log "🔧 Disabling maintenance mode..."
    php artisan up
}

# Update dependencies
update_dependencies() {
    log "📥 Updating dependencies..."
    
    # Update Composer dependencies
    composer install --no-dev --optimize-autoloader --no-interaction
    
    # Update NPM dependencies if package.json exists
    if [ -f "package.json" ]; then
        npm ci --production
        npm run production
    fi
}

# Run database migrations
run_migrations() {
    log "🗄️ Running database migrations..."
    php artisan migrate --force
    
    # Seed database if needed
    if [ "$ENVIRONMENT" = "production" ]; then
        log "🌱 Seeding production database..."
        php artisan db:seed --force --class=DatabaseSeeder
    fi
}

# Clear caches
clear_caches() {
    log "🧹 Clearing caches..."
    
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    php artisan view:clear
    php artisan event:clear
}

# Optimize application
optimize_application() {
    log "⚡ Optimizing application..."
    
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan event:cache
}

# Set permissions
set_permissions() {
    log "🔐 Setting file permissions..."
    
    # Set ownership
    sudo chown -R www-data:www-data .
    
    # Set directory permissions
    find . -type d -exec chmod 755 {} \;
    
    # Set file permissions
    find . -type f -exec chmod 644 {} \;
    
    # Set special permissions for storage and cache
    chmod -R 775 storage
    chmod -R 775 bootstrap/cache
    
    # Set executable permissions
    chmod +x artisan
}

# Health check
health_check() {
    log "🏥 Performing health check..."
    
    # Check if application is responding
    if command -v curl &> /dev/null; then
        APP_URL=$(php artisan tinker --execute="echo config('app.url');" 2>/dev/null || echo "http://localhost")
        
        if curl -f -s "$APP_URL" > /dev/null; then
            log "✅ Application is responding correctly"
        else
            warning "⚠️ Application health check failed"
        fi
    fi
    
    # Check database connection
    if php artisan tinker --execute="DB::connection()->getPdo();" 2>/dev/null; then
        log "✅ Database connection is working"
    else
        error "❌ Database connection failed"
    fi
}

# Cleanup
cleanup() {
    log "🧹 Performing cleanup..."
    
    # Remove old log files
    find storage/logs -name "*.log" -mtime +30 -delete 2>/dev/null || true
    
    # Remove old cache files
    find storage/framework/cache -type f -mtime +7 -delete 2>/dev/null || true
    
    # Remove old session files
    find storage/framework/sessions -type f -mtime +1 -delete 2>/dev/null || true
}

# Main deployment function
deploy() {
    log "🎯 Starting deployment process..."
    
    # Pre-deployment checks
    if [ ! -f ".env" ]; then
        error ".env file not found. Please create it from .env.example"
    fi
    
    # Enable maintenance mode
    enable_maintenance
    
    # Create backup
    backup
    
    # Update dependencies
    update_dependencies
    
    # Run migrations
    run_migrations
    
    # Clear caches
    clear_caches
    
    # Optimize application
    optimize_application
    
    # Set permissions
    set_permissions
    
    # Health check
    health_check
    
    # Cleanup
    cleanup
    
    # Disable maintenance mode
    disable_maintenance
    
    log "🎉 Deployment completed successfully!"
    
    # Show deployment summary
    info "📊 Deployment Summary:"
    info "   Environment: $ENVIRONMENT"
    info "   Date: $(date)"
    info "   PHP Version: $(php --version | head -n1)"
    info "   Laravel Version: $(php artisan --version)"
    info "   DevroTech Version: $(php artisan tinker --execute="echo core()->getVersion();" 2>/dev/null || echo "Unknown")"
}

# Rollback function
rollback() {
    log "🔄 Starting rollback process..."
    
    # Find latest backup
    LATEST_BACKUP=$(sudo find $BACKUP_DIR -name "devrotech-backup-*.tar.gz" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error "No backup found for rollback"
    fi
    
    log "📦 Rolling back to: $LATEST_BACKUP"
    
    # Enable maintenance mode
    enable_maintenance
    
    # Extract backup
    sudo tar -xzf "$LATEST_BACKUP"
    
    # Set permissions
    set_permissions
    
    # Clear caches
    clear_caches
    
    # Disable maintenance mode
    disable_maintenance
    
    log "✅ Rollback completed successfully!"
}

# Show help
show_help() {
    echo "DevroTech CMS Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [ENVIRONMENT]"
    echo ""
    echo "Commands:"
    echo "  deploy     Deploy the application (default)"
    echo "  rollback   Rollback to previous version"
    echo "  backup     Create backup only"
    echo "  help       Show this help message"
    echo ""
    echo "Environments:"
    echo "  production Production deployment (default)"
    echo "  staging    Staging deployment"
    echo "  development Development deployment"
    echo ""
    echo "Examples:"
    echo "  $0 deploy production"
    echo "  $0 rollback"
    echo "  $0 backup"
}

# Main script logic
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    rollback)
        rollback
        ;;
    backup)
        backup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Unknown command: $1. Use '$0 help' for usage information."
        ;;
esac
