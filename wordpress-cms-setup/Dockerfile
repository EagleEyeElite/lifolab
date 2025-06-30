FROM wordpress:cli

# Install make tool
USER root
RUN apk add --no-cache make

# Set environment variables for docker-compose-wait
ENV WAIT_TIMEOUT=60

# Add the wait & makefile script and uploads to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:2.12 /wait /wait
ADD Makefile /scripts/
COPY acf-json /acf-json/
COPY php-scripts /php-scripts/
COPY uploads /uploads/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Disable WP-CLI cache to avoid permission issues
ENV WP_CLI_CACHE_DIR=false

WORKDIR /var/www/html

USER 33:33
ENTRYPOINT ["/entrypoint.sh"]
