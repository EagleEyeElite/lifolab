# References
# - Based on the [work](https://github.com/kassambara/wordpress-docker-compose/) from kassambara.
# - Related [blog post](https://www.datanovia.com/en/lessons/wordpress-docker-setup-files-example-for-local-development/).

install: banner configure delete-default-content add_content end_banner

banner:
	@echo "*************************************************************"
	@echo "* 🚀  ENVIRONMENT SETUP                                     *"
	@echo "*************************************************************"

configure:
	@echo "⚙️ Configuring WordPress parameters..."
	@wp core install --url="${WORDPRESS_CMS_PUBLIC_URL}" \
	   --title="" \
	   --admin_user="admin" \
	   --admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
	   --admin_email="noreply@example.com" \
	   --locale="en_US"
	@echo "🔎 Disabling search engine indexing..."
	@wp option update blog_public 0
	@echo "💬 Disabling comments..."
	@wp plugin install disable-comments --version=2.5.3 --activate
	@wp option update disable_comments_options '{"remove_everywhere":true,"disabled_post_types":[],"db_version":6}' --format=json
	@echo "🗑️ Removing default WordPress plugins..."
	@wp plugin delete hello akismet
	@echo "📁 Setting up ACF JSON sync..."
	@mkdir -p ./wp-content/themes/$$(wp theme list --status=active --field=name)/acf-json
	@cp /acf-json/*.json ./wp-content/themes/$$(wp theme list --status=active --field=name)/acf-json/
	@echo "🔌 Installing plugins."
	@wp plugin install updraftplus --version=1.25.8 --activate
	@wp plugin install secure-custom-fields --version=6.5.7 --activate
	@wp plugin install wp-graphql --version=2.3.8 --activate
	@wp plugin install wpgraphql-acf --version=2.4.1 --activate
	@wp eval-file /php-scripts/sync-acf-json.php
	@echo "🔒Create application password for Frontend NextJS"
	@wp eval-file /php-scripts/enable-application-passwords.php
	@wp eval-file /php-scripts/create-app-password.php

delete-default-content:
	@echo "Deleting default WordPress content..."
	@wp post delete $(shell wp post list --post_type='page' --name='sample-page' --format=ids) --force
	@wp post delete $(shell wp post list --post_type='post' --name='hello-world' --format=ids) --force
	@wp post delete $(shell wp post list --post_type='page' --name='privacy-policy' --format=ids) --force

add_content:
	@wp media import /uploads/exampleUpload1.jpeg
	@wp media import /uploads/exampleUpload2.jpeg
	@wp media import /uploads/exampleUpload3.jpeg
	@wp eval-file /php-scripts/create-content.php

end_banner:
	@echo "*************************************************************"
	@echo "* SETUP COMPLETED SUCCESSFULLY                              *"
	@echo "*************************************************************"
