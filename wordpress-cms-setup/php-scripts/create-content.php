<?php
/**
 * Create sample content for WordPress CMS
 * This script creates people, posts, and cyclopedia entries with proper relationships
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
wp_insert_term('Project', 'post_tag');
wp_insert_term('Workshop', 'post_tag');

// Max Mustermann - not core member, role: musterrolle
$max_id = wp_insert_post(array(
    'post_type' => 'people',
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
    'post_type' => 'people',
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

$project1_id = wp_insert_post(array(
    'post_type' => 'project',
    'post_title' => 'Project Workshop Alpha',
    'post_content' => $post1_content,
    'post_excerpt' => 'An exploration of WordPress formatting features and typography elements.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Project'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_1_id,
        'referenced_people' =>$max_id
    )
));

// Project 2: Project Workshop Beta (Conrad only)
$project2_id = wp_insert_post(array(
    'post_type' => 'project',
    'post_title' => 'Project Workshop Beta',
    'post_content' => '<h2>Workshop Content</h2><p>Text</p>',
    'post_excerpt' => 'A collaborative workshop focused on learning and skill development.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Workshop'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_2_id,
        'referenced_people' =>$conrad_id
    )
));

// Project 3: Project Workshop Gamma (both people)
$project3_id = wp_insert_post(array(
    'post_type' => 'project',
    'post_title' => 'Project Workshop Gamma',
    'post_content' => '<h2>Workshop Content</h2><p>Text</p>',
    'post_excerpt' => 'A comprehensive collaborative project combining multiple skills and disciplines.',
    'post_status' => 'publish',
    'post_author' => $admin_id,
    'tags_input' => array('Project', 'Workshop'),
    'meta_input' => array(
        'when_and_where' => 'Musterdatum | Musterstadt',
        '_thumbnail_id' => $image_3_id,
        'referenced_people' => array($max_id, $conrad_id)
    )
));

// Set up reverse relationships (people -> projects)
update_field('referenced_projects', array($project1_id, $project3_id), $max_id);
update_field('referenced_projects', array($project2_id, $project3_id), $conrad_id);

// Place 1
$place1_id = wp_insert_post(array(
    'post_type' => 'place',
    'post_title' => 'Research Station Alpha',
    'post_content' => '<p>Text</p>',
    'post_status' => 'publish',
));

// Cyclopedia Entries
$chapter1_id = wp_insert_post(array(
    'post_type' => 'cyclopedia-chapter',
    'post_title' => 'Cyclopedia Chapter Alpha',
    'post_status' => 'publish',
    'meta_input' => array(
        'chapter_order' => 1
    )
));

$cyclopedia_content_1 = '
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius.
Modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minim veniam, quis nostrud.
Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.
Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt.</p>
';

$cyclopedia1_id = wp_insert_post(array(
    'post_type' => 'cyclopedia-entry',
    'post_title' => 'Cyclopedia Entry Alpha',
    'post_content' => $cyclopedia_content_1,
    'post_status' => 'publish',
    'meta_input' => array(
        '_thumbnail_id' => $image_1_id
    )
));

$cyclopedia2_id = wp_insert_post(array(
    'post_type' => 'cyclopedia-entry',
    'post_title' => 'Cyclopedia Entry Beta',
    'post_content' => $cyclopedia_content_1,
    'post_status' => 'publish',
    'meta_input' => array(
        '_thumbnail_id' => $image_2_id
    )
));

$chapter2_id = wp_insert_post(array(
    'post_type' => 'cyclopedia-chapter',
    'post_title' => 'Cyclopedia Chapter Beta',
    'post_status' => 'publish',
    'meta_input' => array(
        'chapter_order' => 2
    )
));

$cyclopedia3_id = wp_insert_post(array(
    'post_type' => 'cyclopedia-entry',
    'post_title' => 'Cyclopedia Entry Gamma',
    'post_content' => $cyclopedia_content_1,
    'post_status' => 'publish',
    'meta_input' => array(
        '_thumbnail_id' => $image_3_id
    )
));

// Set up many-to-many relationships
// Chapter Alpha: Alpha, Beta, Gamma entries
update_field('entries', array($cyclopedia1_id, $cyclopedia2_id, $cyclopedia3_id), $chapter1_id);

// Chapter Beta: Beta entry only
update_field('entries', array($cyclopedia2_id), $chapter2_id);

// The bidirectional sync will automatically set the chapters field on each entry



// Set default values
update_field('contact', [
    'info_1' => 'Living the Forest Lab | Reallabor Wald',
    'infos_contact_person' => [
        [ 'contact_name'  => 'Max Mustermann', 'contact_email' => 'max.mustermann@example.com', ],
        [ 'contact_name'  => 'Max Mustermann', 'contact_email' => 'max.mustermann@example.com', ],
    ],
    'address' => 'Musterstraße 123, 12345 Musterstadt'
], 'option');

update_field('imprint', [
    'imprint_images' => [$image_2_id, $image_3_id]
], 'option');

// Set up Description options page content
$description_content = '<p>Living the Forest Lab...
Our mission is...
We work closely with...
The project focuses on...
Through collaborative efforts...
Our interdisciplinary approach combines...
Join us in our mission to protect...</p>';

update_field('description_content', $description_content, 'option');

// Set up About options page content
update_field('about_title', 'Living the Forest Lab', 'option');

update_field('about_content_text', $cyclopedia_content_1, 'option');

// Define expandable info
$group_titles = [
    ['Alpha', 'Beta'],
    ['Gamma', 'Delta'],
    ['Epsilon', 'Zeta']
];
$lorem_content = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
$create_item = fn($title) => ['title' => "Expandable $title", 'content' => $lorem_content];
$create_group = fn($titles) => ['expandable_info' => array_map($create_item, $titles)];
$about_expandable_info_groups = array_map($create_group, $group_titles);
update_field('about_expandable_info_groups', $about_expandable_info_groups, 'option');

update_field('about_feature_image', $image_1_id, 'option');

?>
