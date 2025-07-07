<?php
// Sync ACF JSON files with WordPress database
$json_files = glob('/acf-json/*.json');

foreach ($json_files as $file) {
    $key = basename($file, '.json');
    $json = json_decode(file_get_contents($file), true);
    if (str_starts_with($key, 'group_')) {
        acf_import_field_group($json);
    }
    if (str_starts_with($key, 'post_type_')) {
        acf_import_post_type($json);
    }
    if (str_starts_with($key, 'ui_options_page_')) {
        acf_import_ui_options_page($json);
    }
}

?>
