# 🚀 DevroTech CMS - Quick Setup Guide

## 📋 Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

## ⚡ Quick Start (5 minutes)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd devrotech-cms
composer install
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE devrotech_cms;"

# Update .env with your database credentials
# DB_DATABASE=devrotech_cms
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate --seed
```

### 4. Build Assets
```bash
npm run production
```

### 5. Start Application
```bash
php artisan serve
```

Visit: http://localhost:8000

## 🔧 Admin Access

- **URL**: http://localhost:8000/admin
- **Email**: admin@botble.com
- **Password**: 159357

## 🐳 Docker Quick Start

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# With SSL
docker-compose -f docker-compose.prod.yml --profile ssl up -d
```

## 🚀 Production Deployment

### Using Script
```bash
./deploy.sh deploy production
```

### Manual Steps
```bash
# 1. Install dependencies
composer install --no-dev --optimize-autoloader
npm ci --production && npm run production

# 2. Configure environment
cp env.production.example .env
# Edit .env with production settings

# 3. Run migrations
php artisan migrate --force

# 4. Set permissions
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
sudo chmod -R 777 storage bootstrap/cache

# 5. Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🔄 CI/CD Pipeline

### GitHub Actions Setup

1. **Add Repository Secrets**:
   ```
   SSH_PRIVATE_KEY      # Server SSH key
   SERVER_HOST          # Production server IP
   SERVER_USER          # Server username
   DEPLOY_PATH          # Deployment path
   PRODUCTION_URL       # Your domain
   ```

2. **Branch Strategy**:
   - `main` → Development CI/CD
   - `develop` → Development CI/CD
   - `production` → Production deployment
   - `v*` → Release management

3. **Automatic Workflows**:
   - Push to `main`/`develop` → Run tests & deploy to staging
   - Push to `production` → Deploy to production
   - Create tag `v1.0.0` → Create release & build packages

## 📁 Project Structure

```
devrotech-cms/
├── .github/workflows/     # CI/CD pipelines
├── docker/               # Docker configuration
├── platform/            # DevroTech CMS core
├── app/                 # Laravel application
├── public/              # Web root
├── storage/             # Application storage
├── deploy.sh           # Deployment script
├── Dockerfile          # Docker image
├── docker-compose.prod.yml  # Production Docker
└── README.md           # Full documentation
```

## 🔒 Security Features

- ✅ Ready to use (no activation required)
- ✅ Security headers (XSS, CSRF protection)
- ✅ Rate limiting
- ✅ File upload restrictions
- ✅ Environment variable protection

## 🛠️ Troubleshooting

### Common Issues

1. **Permission errors**:
   ```bash
   sudo chown -R www-data:www-data .
   sudo chmod -R 755 .
   sudo chmod -R 777 storage bootstrap/cache
   ```

2. **Database connection**:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

3. **Asset compilation**:
   ```bash
   npm ci
   npm run production
   ```

## 📞 Support

- 📖 Full documentation: [README.md](README.md)
- 🐛 Issues: Create GitHub issue
- 💬 Discussions: GitHub Discussions

---

**🎉 You're all set! Your DevroTech CMS is ready to use!**
