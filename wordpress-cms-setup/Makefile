# References
#- Based on the [work](https://github.com/kassambara/wordpress-docker-compose/) from kassambara.
#- Related [blog post](https://www.datanovia.com/en/lessons/wordpress-docker-setup-files-example-for-local-development/).

install: banner configure delete-default-content upload_images setup-tags posts end_banner

banner:
	@echo "*************************************************************"
	@echo "* 🚀  ENVIRONMENT SETUP                                     *"
	@echo "*************************************************************"

configure:
	@echo "⚙️ Configuring WordPress parameters..."
	wp core install --url="${WORDPRESS_CMS_PUBLIC_URL}" \
		--title="" \
		--admin_user="admin" \
		--admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
		--admin_email="noreply@example.com" \
		--locale="en_US"
	@echo "🔒 Disabling search engine indexing..."
	wp option update blog_public 0
	@echo "🗑️ Removing default WordPress plugins..."
	wp plugin delete hello akismet
	@echo "🔌 Installing and activating plugins."
	wp plugin install wp-graphql --activate
	wp plugin install https://github.com/wp-graphql/wp-graphql-jwt-authentication/archive/refs/tags/v0.7.0.zip --activate
	# The GRAPHQL_JWT_AUTH_SECRET_KEY must not be at the end of the file. It has to be before the ABSPATH definition.
	@awk '/NONCE_SALT/{print;print "define( '\''GRAPHQL_JWT_AUTH_SECRET_KEY'\'', '\''${WORDPRESS_GRAPHQL_JWT_AUTH_SECRET_KEY}'\'' );";next}1' ./wp-config.php > ./wp-config-temp.php
	@mv ./wp-config-temp.php ./wp-config.php
	@echo "🔐 JWT Auth secret key appended successfully."
	wp plugin install updraftplus --activate

delete-default-content:
	@echo "Deleting default WordPress content..."
	@wp post delete $(shell wp post list --post_type='page' --name='sample-page' --format=ids) --force
	@echo "'Sample Page' deleted."
	@wp post delete $(shell wp post list --post_type='post' --name='hello-world' --format=ids) --force
	@echo "'Hello World!' post deleted."
	@wp post delete $(shell wp post list --post_type='page' --name='privacy-policy' --format=ids) --force
	@echo "'Privacy Policy' page deleted."
	@echo "Default content cleanup complete."

upload_images:
	@echo "📸 Uploading images from /uploads..."
	@for file in $$(find /uploads -type f); do \
		echo "Uploading $$file..."; \
		wp media import "$$file" --porcelain; \
	done

setup-tags:
	@echo "Setting up tags..."
	@wp term create post_tag 'Project' --porcelain
	@wp term create post_tag 'Workshop' --porcelain
	@echo "'Project' and 'Workshop' tags created."

posts:
	@echo "📝 Creating custom post"
	wp post create \
		--post_type=post \
		--post_title='Title Projekt #1' \
		--post_content='<h2>Explore WordPress Formatting</h2><p><strong>Bold Text</strong> and <em>Italic Text</em> are essential for emphasizing points. Combine them for <strong><em>extra emphasis</em></strong>.</p><blockquote>“To be or not to be, that is the question.” - Shakespeare</blockquote><p>Lists are great for readability:</p><ul><li>First Item</li><li>Second Item with a <a href="https://example.com">link</a></li><li>Third Item</li></ul><p>And don’t forget about <code>inline code</code> for technical content!</p>' \
		--post_status=publish \
		--tags_input='Project,Workshop' \
		--porcelain
	@echo "✅ Post 'Title Projekt #1' created with Project and Workshop tags!"

end_banner:
	@echo "*************************************************************"
	@echo "* SETUP COMPLETED SUCCESSFULLY                              *"
	@echo "*************************************************************"
