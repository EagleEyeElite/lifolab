<?php
/**
 * Create sample content for WordPress CMS
 * This script creates collaborators and posts with proper relationships
 */

function get_attachment_id($filename) {
    $attachments = get_posts([
        'post_type' => 'attachment',
        'meta_key' => '_wp_attached_file',
        'meta_value' => $filename,
        'meta_compare' => 'LIKE',
        'numberposts' => 1
    ]);
    return $attachments[0]->ID;
}

// Get your image IDs
$image_1_id = get_attachment_id('exampleUpload1.jpeg');
$image_2_id = get_attachment_id('exampleUpload2.jpeg');
$image_3_id = get_attachment_id('exampleUpload3.jpeg');

// Create tags
echo "Setting up tags...\n";
wp_insert_term('Projekt', 'post_tag');
wp_insert_term('Workshop', 'post_tag');

// Max Mustermann - not core member, role: musterrolle
$max_id = wp_insert_post(array(
    'post_type' => 'collaborator',
    'post_title' => 'Max Mustermann',
    'post_content' => '<p>info text</p>',
    'post_status' => 'publish',
    'meta_input' => array(
        'roles' => 'musterrolle',
        'core_member' => 0
    )
));

// Conrad Klaus - core member, roles: developer | designer
$conrad_id = wp_insert_post(array(
    'post_type' => 'collaborator',
    'post_title' => 'Conrad Klaus',
    'post_content' => '<p>info text</p>',
    'post_status' => 'publish',
    'meta_input' => array(
        'roles' => 'developer | designer',
        'core_member' => 1
    )
));

// Get admin user ID
$admin_id = get_user_by('login', 'admin')->ID;

$post1_content = '
<h2>Explore WordPress Formatting</h2>

<p><strong>Bold Text</strong> and <em>Italic Text</em> are essential for emphasizing points. Combine them for <strong><em>extra emphasis</em></strong>.</p>

<!-- wp:gallery {"columns":3,"linkTo":"none","sizeSlug":"full","ids":[' . $image_1_id . ',' . $image_2_id . ',' . $image_3_id . ']} -->
<figure class="wp-block-gallery has-nested-images columns-3 is-cropped">
    <!-- wp:image {"id":' . $image_1_id . ',"sizeSlug":"full","linkDestination":"none"} -->
    <figure class="wp-block-image size-full"><img src="' . wp_get_attachment_image_url($image_1_id, 'full') . '" alt="Gallery image 1" class="wp-image-' . $image_1_id . '"/></figure>
    <!-- /wp:image -->

    <!-- wp:image {"id":' . $image_2_id . ',"sizeSlug":"full","linkDestination":"none"} -->
    <figure class="wp-block-image size-full"><img src="' . wp_get_attachment_image_url($image_2_id, 'full') . '" alt="Gallery image 2" class="wp-image-' . $image_2_id . '"/></figure>
    <!-- /wp:image -->

    <!-- wp:image {"id":' . $image_3_id . ',"sizeSlug":"full","linkDestination":"none"} -->
    <figure class="wp-block-image size-full"><img src="' . wp_get_attachment_image_url($image_3_id, 'full') . '" alt="Gallery image 3" class="wp-image-' . $image_3_id . '"/></figure>
    <!-- /wp:image -->
</figure>
<!-- /wp:gallery -->

<!-- wp:columns -->
<div class="wp-block-columns">
    <!-- wp:column -->
    <div class="wp-block-column">
        <!-- wp:paragraph -->
        <p>This text appears on the left.</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column">
        <!-- wp:image {"id":' . $image_1_id . ',"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img src="' . wp_get_attachment_image_url($image_1_id, 'full') . '" alt="Workshop image" class="wp-image-' . $image_1_id . '"/></figure>
        <!-- /wp:image -->
    </div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->

<blockquote>
    <p>To be or not to be, that is the question. - Shakespeare</p>
</blockquote>

<p>Lists are great for readability:</p>

<ul>
    <li>First Item</li>
    <li>Second Item with a <a href="https://example.com">link</a></li>
    <li>Third Item</li>
</ul>

<p>And dont forget about <code>inline code</code> for technical content!</p>
';

$post1_id = wp_insert_post(array(
    'post_type' => 'post',
    'post_title' => 'Projekt Workshop Alpha',
    'post_content' => $post1_content,
    'post_excerpt' => 'An exploration of WordPress formatting features and typography elements.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Projekt'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_1_id,
        'referenced_collaborators' => $max_id
    )
));

// Post 2: Projekt Workshop Beta (Conrad only)
$post2_id = wp_insert_post(array(
    'post_type' => 'post',
    'post_title' => 'Projekt Workshop Beta',
    'post_content' => '<h2>Workshop Content</h2><p>Text</p>',
    'post_excerpt' => 'A collaborative workshop focused on learning and skill development.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Workshop'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_2_id,
        'referenced_collaborators' => $conrad_id
    )
));

// Post 3: Projekt Workshop Gamma (both collaborators)
$post3_id = wp_insert_post(array(
    'post_type' => 'post',
    'post_title' => 'Projekt Workshop Gamma',
    'post_content' => '<h2>Workshop Content</h2><p>Text</p>',
    'post_excerpt' => 'A comprehensive collaborative project combining multiple skills and disciplines.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Projekt', 'Workshop'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_3_id,
        'referenced_collaborators' => array($max_id, $conrad_id)
    )
));

// Set up reverse relationships (collaborators -> posts)
update_post_meta($max_id, 'referenced_posts', array($post1_id, $post3_id));
update_post_meta($conrad_id, 'referenced_posts', array($post2_id, $post3_id));

?>
