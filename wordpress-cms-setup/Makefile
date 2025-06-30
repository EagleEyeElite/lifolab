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
	@echo "🔒 Disabling search engine indexing..."
	@wp option update blog_public 0
	@echo "💬 Disabling comments..."
	@wp plugin install disable-comments --version=2.5.2 --activate
	@wp option update disable_comments_options '{"remove_everywhere":true,"disabled_post_types":[],"db_version":6}' --format=json
	@echo "🗑️ Removing default WordPress plugins..."
	@wp plugin delete hello akismet
	@echo "📁 Setting up ACF JSON sync..."
	@mkdir -p ./wp-content/themes/$$(wp theme list --status=active --field=name)/acf-json
	@cp /acf-json/*.json ./wp-content/themes/$$(wp theme list --status=active --field=name)/acf-json/
	@echo "🔌 Installing plugins."
	@wp plugin install updraftplus --version=1.25.6 --activate
	@wp plugin install advanced-custom-fields --version=6.4.2 --activate
	# @wp plugin install wp-multilang --version=2.4.19.1 --activate # TODO use multilang?
	@wp plugin install wp-graphql --version=2.3.3 --activate
	@wp plugin install wpgraphql-acf --version=2.4.1 --activate
	@wp eval-file /php-scripts/sync-acf-json.php
	# TODO For auth use this: https://www.wpgraphql.com/docs/authentication-and-authorization

delete-default-content:
	@echo "Deleting default WordPress content..."
	@wp post delete $(shell wp post list --post_type='page' --name='sample-page' --format=ids) --force
	@wp post delete $(shell wp post list --post_type='post' --name='hello-world' --format=ids) --force
	@wp post delete $(shell wp post list --post_type='page' --name='privacy-policy' --format=ids) --force

add_content:
	@echo "📸 Uploading images from /uploads..."
	@for file in $$(find /uploads -type f); do \
	   echo "Uploading $$file..."; \
	   wp media import "$$file"; \
	done
	@echo "Setting up tags..."
	@wp term create post_tag 'Project'
	@wp term create post_tag 'Workshop'
	@echo "📝 Creating custom post and collaborator"
	@PROJECT_POST_ID=$$(wp post create \
	   --post_type=post \
	   --post_title='Title Projekt #1' \
	   --post_content='<h2>Explore WordPress Formatting</h2><p><strong>Bold Text</strong> and <em>Italic Text</em> are essential for emphasizing points. Combine them for <strong><em>extra emphasis</em></strong>.</p><blockquote>"To be or not to be, that is the question." - Shakespeare</blockquote><p>Lists are great for readability:</p><ul><li>First Item</li><li>Second Item with a <a href="https://example.com">link</a></li><li>Third Item</li></ul><p>And dont forget about <code>inline code</code> for technical content!</p>' \
	   --post_status=publish \
	   --tags_input='Project,Workshop' \
	   --porcelain); \
	COLLABORATOR_POST_ID=$$(wp post create \
	   --post_type=collaborator \
	   --post_title='Max Mustermann' \
	   --post_content='<p>info text</p>' \
	   --post_status=publish \
	   --porcelain); \
	wp post meta set $$COLLABORATOR_POST_ID referenced_posts $$PROJECT_POST_ID; \
	wp post meta set $$PROJECT_POST_ID referenced_collaborators $$COLLABORATOR_POST_ID; \


end_banner:
	@echo "*************************************************************"
	@echo "* SETUP COMPLETED SUCCESSFULLY                              *"
	@echo "*************************************************************"
