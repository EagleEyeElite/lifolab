<?php
// Sync ACF JSON files with WordPress database
$json_files = glob('/acf-json/*.json');

foreach ($json_files as $file) {
    $key = basename($file, '.json');
    $json = json_decode(file_get_contents($file), true);

    if (strpos($key, 'group_') === 0) {
        acf_import_field_group($json);
        WP_CLI::success("Synced field group: " . $json['title']);
    }

    if (strpos($key, 'post_type_') === 0) {
        acf_import_post_type($json);
        WP_CLI::success("Synced post type: " . $json['title']);
    }
}
?>
