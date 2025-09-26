# 🚀 DevroTech CMS - Production Ready Setup

[![Laravel](https://img.shields.io/badge/Laravel-10.49.0-red.svg)](https://laravel.com)
[![DevroTech CMS](https://img.shields.io/badge/DevroTech%20CMS-7.5.9.1-blue.svg)](https://devrotech.com)
[![PHP](https://img.shields.io/badge/PHP-8.1+-green.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-Bypassed-yellow.svg)]()

## 📋 Overview

This is a production-ready DevroTech CMS setup with:
- ✅ **DevroTech CMS 7.5.9.1** (Latest version)
- ✅ **Laravel 10.49.0** (Latest LTS)
- ✅ **License bypassed** (No activation required)
- ✅ **CI/CD Pipeline** (GitHub Actions)
- ✅ **Docker Support** (Production ready)
- ✅ **Security Hardened** (Production optimizations)

## 🛠️ Features

### Core Features
- **DevroTech CMS 7.5.9.1** - Latest version with all features
- **License Bypass** - No activation required, works out of the box
- **Laravel 10.49.0** - Latest LTS version with security updates
- **PHP 8.1+** - Modern PHP with performance improvements

### DevOps & Deployment
- **GitHub Actions CI/CD** - Automated testing and deployment
- **Docker Support** - Containerized deployment
- **Production Scripts** - Automated deployment and rollback
- **Environment Management** - Separate configs for dev/staging/prod

### Security & Performance
- **Security Headers** - XSS, CSRF, and other protections
- **Rate Limiting** - API and admin panel protection
- **Caching** - Redis-based caching for performance
- **Optimized Assets** - Minified CSS/JS for production

## 🚀 Quick Start

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18+
- MySQL 8.0+
- Redis (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devrotech-cms
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   php artisan migrate --seed
   ```

5. **Build assets**
   ```bash
   npm run production
   ```

6. **Start the application**
   ```bash
   php artisan serve
   ```

## 🐳 Docker Deployment

### Using Docker Compose

1. **Production deployment**
   ```bash
   cp env.production.example .env
   # Edit .env with your production settings
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **With SSL (using nginx profile)**
   ```bash
   docker-compose -f docker-compose.prod.yml --profile ssl up -d
   ```

3. **With backup service**
   ```bash
   docker-compose -f docker-compose.prod.yml --profile backup up -d
   ```

### Manual Docker Build

```bash
# Build the image
docker build -t devrotech-cms .

# Run the container
docker run -d -p 80:80 --name devrotech-cms devrotech-cms
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **Development CI/CD** (`.github/workflows/development.yml`)
   - Runs on `main` and `develop` branches
   - Code quality checks
   - Security audits
   - Performance tests
   - Deploy to staging

2. **Production Deployment** (`.github/workflows/production-deploy.yml`)
   - Runs on `production` branch
   - Full testing suite
   - Security scans
   - Production deployment
   - Health checks

3. **Release Management** (`.github/workflows/release.yml`)
   - Runs on version tags
   - Creates GitHub releases
   - Builds release packages
   - Docker image publishing

### Required GitHub Secrets

For production deployment, add these secrets to your GitHub repository:

```
SSH_PRIVATE_KEY      # Private SSH key for server access
SERVER_HOST          # Production server IP/hostname
SERVER_USER          # Server username
DEPLOY_PATH          # Deployment path (e.g., /var/www/devrotech-cms)
PRODUCTION_URL       # Production URL for health checks
DOCKER_USERNAME      # Docker Hub username
DOCKER_PASSWORD      # Docker Hub password
MYSQL_ROOT_PASSWORD  # MySQL root password
DB_PASSWORD          # Database password
REDIS_PASSWORD       # Redis password
```

## 🚀 Production Deployment

### Using Deployment Script

```bash
# Deploy to production
./deploy.sh deploy production

# Rollback if needed
./deploy.sh rollback

# Create backup only
./deploy.sh backup
```

### Manual Deployment Steps

1. **Prepare server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install required packages
   sudo apt install nginx mysql-server redis-server php8.1-fpm php8.1-mysql php8.1-redis
   ```

2. **Deploy application**
   ```bash
   # Clone repository
   git clone <your-repo> /var/www/devrotech-cms
   cd /var/www/devrotech-cms
   
   # Install dependencies
   composer install --no-dev --optimize-autoloader
   npm ci --production && npm run production
   
   # Configure environment
   cp env.production.example .env
   # Edit .env with production settings
   
   # Run migrations
   php artisan migrate --force
   
   # Set permissions
   sudo chown -R www-data:www-data /var/www/devrotech-cms
   sudo chmod -R 755 /var/www/devrotech-cms
   sudo chmod -R 777 /var/www/devrotech-cms/storage
   ```

3. **Configure Nginx**
   ```bash
   # Copy nginx configuration
   sudo cp docker/nginx.conf /etc/nginx/sites-available/devrotech-cms
   sudo ln -s /etc/nginx/sites-available/devrotech-cms /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

## 🔧 Configuration

### Environment Variables

Key environment variables for production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=devrotech_production
DB_USERNAME=devrotech_user
DB_PASSWORD=secure_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=redis_password
```

### DevroTech CMS Settings

```env
CMS_ENABLE_INSTALLER=false
CMS_ENABLE_SYSTEM_UPDATER=false
```

## 📊 Monitoring & Maintenance

### Health Checks

- **Application**: `GET /health`
- **Database**: Built-in Laravel health check
- **Cache**: Redis connection check

### Logs

- **Application logs**: `storage/logs/laravel.log`
- **Nginx logs**: `/var/log/nginx/`
- **PHP-FPM logs**: `/var/log/php8.1-fpm.log`

### Backup Strategy

1. **Database backups** (automated via Docker or cron)
2. **File backups** (storage directory)
3. **Configuration backups** (.env, nginx config)

## 🔒 Security Features

### Implemented Security Measures

- ✅ **License bypass** (no external license checks)
- ✅ **Security headers** (XSS, CSRF protection)
- ✅ **Rate limiting** (API and admin protection)
- ✅ **File upload restrictions**
- ✅ **SQL injection protection**
- ✅ **XSS protection**
- ✅ **CSRF tokens**
- ✅ **Secure cookies**
- ✅ **Environment variable protection**

### Security Checklist

- [ ] Change default passwords
- [ ] Configure SSL/TLS certificates
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Monitor access logs
- [ ] Backup verification

## 🐛 Troubleshooting

### Common Issues

1. **Permission errors**
   ```bash
   sudo chown -R www-data:www-data /var/www/devrotech-cms
   sudo chmod -R 755 /var/www/devrotech-cms
   sudo chmod -R 777 /var/www/devrotech-cms/storage
   ```

2. **Database connection issues**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

3. **Asset compilation issues**
   ```bash
   npm ci
   npm run production
   ```

4. **Docker issues**
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## 📚 Documentation

- [DevroTech CMS Documentation](https://docs.devrotech.com)
- [Laravel Documentation](https://laravel.com/docs)
- [Docker Documentation](https://docs.docker.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project includes DevroTech CMS with license bypass for development and testing purposes.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the troubleshooting section
- Review the documentation

---

**⚠️ Important Notes:**

- This setup includes license bypass for development/testing
- Use proper licensing for commercial projects
- Keep your system updated for security
- Regular backups are essential
- Monitor your application logs

**🎉 Enjoy your DevroTech CMS setup!**
