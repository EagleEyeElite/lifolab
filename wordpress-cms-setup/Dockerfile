FROM wordpress:cli

# Install make tool
USER root
RUN apk add --no-cache make

# Set environment variables for docker-compose-wait
#ENV WAIT_HOSTS_TIMEOUT=300
#ENV WAIT_HOST_CONNECT_TIMEOUT=5
#ENV WAIT_BEFORE_HOSTS=5
#ENV WAIT_AFTER_HOSTS=5
#ENV WAIT_SLEEP_INTERVAL=5

# Add the wait & makefile script and uploads to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:2.12 /wait /wait
ADD Makefile /scripts/
COPY uploads /uploads/
COPY setup /setup/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Disable WP-CLI cache to avoid permission issues
ENV WP_CLI_CACHE_DIR=false

WORKDIR /var/www/html

USER 33:33
ENTRYPOINT ["/entrypoint.sh"]
