#!/bin/bash
set -e

echo "Starting WordPress auto-configuration check..."

# Wait for services to be ready
echo "Waiting for services..."
/wait

# Check if WordPress is already configured
if wp core is-installed --url="${WORDPRESS_CMS_PUBLIC_URL}" --path=/var/www/html --quiet; then
    echo "WordPress is already installed and configured. Exiting."
    exit 0
fi

echo "WordPress not found or not configured. Running auto-configuration..."

# Run your existing Makefile installation
make -f /scripts/Makefile install

echo "WordPress auto-configuration completed successfully!"
