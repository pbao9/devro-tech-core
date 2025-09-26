#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[ENTRYPOINT]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Wait for database to be ready
wait_for_db() {
    log "⏳ Waiting for database connection..."
    
    if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
        until nc -z $DB_HOST $DB_PORT; do
            log "Waiting for database on $DB_HOST:$DB_PORT..."
            sleep 2
        done
        log "✅ Database is ready!"
    fi
}

# Generate application key if not exists
generate_key() {
    if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:YOUR_APP_KEY_HERE" ]; then
        log "🔑 Generating application key..."
        php artisan key:generate --force
    fi
}

# Run database migrations
run_migrations() {
    log "🗄️ Running database migrations..."
    php artisan migrate --force
}

# Cache configuration
cache_config() {
    log "⚡ Caching configuration..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
}

# Set permissions
set_permissions() {
    log "🔐 Setting permissions..."
    chown -R www-data:www-data /var/www/html
    chmod -R 755 /var/www/html
    chmod -R 777 /var/www/html/storage
    chmod -R 777 /var/www/html/bootstrap/cache
}

# Install dependencies if needed
install_dependencies() {
    if [ ! -d "vendor" ]; then
        log "📥 Installing Composer dependencies..."
        composer install --no-dev --optimize-autoloader --no-interaction
    fi
    
    if [ ! -d "node_modules" ] && [ -f "package.json" ]; then
        log "📥 Installing NPM dependencies..."
        npm ci --production
        npm run production
    fi
}

# Create necessary directories
create_directories() {
    log "📁 Creating necessary directories..."
    mkdir -p /var/www/html/storage/logs
    mkdir -p /var/www/html/storage/framework/cache
    mkdir -p /var/www/html/storage/framework/sessions
    mkdir -p /var/www/html/storage/framework/views
    mkdir -p /var/www/html/bootstrap/cache
}

# Health check
health_check() {
    log "🏥 Performing health check..."
    
    # Check if Laravel is working
    if php artisan --version > /dev/null 2>&1; then
        log "✅ Laravel application is working"
    else
        error "❌ Laravel application is not working"
    fi
}

# Main initialization
main() {
    log "🚀 Starting DevroTech CMS container initialization..."
    
    # Create directories
    create_directories
    
    # Set permissions
    set_permissions
    
    # Wait for database
    wait_for_db
    
    # Install dependencies
    install_dependencies
    
    # Generate key
    generate_key
    
    # Run migrations
    run_migrations
    
    # Cache configuration
    cache_config
    
    # Health check
    health_check
    
    log "🎉 Container initialization completed!"
    
    # Execute the main command
    exec "$@"
}

# Run main function
main "$@"
