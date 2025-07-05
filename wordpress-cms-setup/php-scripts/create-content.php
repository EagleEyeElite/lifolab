<?php
/**
 * Create sample content for WordPress CMS
 * This script creates collaborators and posts with proper relationships
 */

function find_attachment_by_filename($filename) {
    $attachments = get_posts(array(
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'numberposts' => 1,
        'meta_query' => array(
            array(
                'key' => '_wp_attached_file',
                'value' => $filename,
                'compare' => 'LIKE'
            )
        )
    ));
    return $attachments[0]->ID;
}

$image_1_id = find_attachment_by_filename('exampleUpload1.jpeg');
$image_2_id = find_attachment_by_filename('exampleUpload2.jpeg');
$image_3_id = find_attachment_by_filename('exampleUpload3.jpeg');

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

// Post 1: Projekt Workshop Alpha (Max only)
$post1_id = wp_insert_post(array(
    'post_type' => 'post',
    'post_title' => 'Projekt Workshop Alpha',
    'post_content' => '<h2>Explore WordPress Formatting</h2><p><strong>Bold Text</strong> and <em>Italic Text</em> are essential for emphasizing points. Combine them for <strong><em>extra emphasis</em></strong>.</p><blockquote>"To be or not to be, that is the question." - Shakespeare</blockquote><p>Lists are great for readability:</p><ul><li>First Item</li><li>Second Item with a <a href="https://example.com">link</a></li><li>Third Item</li></ul><p>And dont forget about <code>inline code</code> for technical content!</p>',
    'post_excerpt' => 'An exploration of WordPress formatting features and typography elements.',
    'post_status' => 'publish',
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
    'post_content' => '<h2>Workshop Content</h2><p>This is a workshop focused on collaborative learning and skill development.</p><ul><li>Interactive sessions</li><li>Hands-on experience</li><li>Peer learning</li></ul>',
    'post_excerpt' => 'A collaborative workshop focused on learning and skill development.',
    'post_status' => 'publish',
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
    'post_content' => '<h2>Collaborative Project</h2><p>A comprehensive project that brings together multiple collaborators and combines various skills.</p><blockquote>"Collaboration is the key to innovation."</blockquote><p>Key features:</p><ul><li>Multi-disciplinary approach</li><li>Innovative solutions</li><li>Community impact</li></ul>',
    'post_excerpt' => 'A comprehensive collaborative project combining multiple skills and disciplines.',
    'post_status' => 'publish',
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
