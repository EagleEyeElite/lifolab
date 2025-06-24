<?php
$json = json_decode(file_get_contents('/setup/acf-config.json'), true);

foreach ($json as $item) {
    $post_type = acf_determine_internal_post_type($item['key']);
    $existing = acf_get_internal_post_type_post($item['key'], $post_type);

    if ($existing) $item['ID'] = $existing->ID;

    acf_import_internal_post_type($item, $post_type);
    WP_CLI::success("Imported: " . $item['title']);
}

WP_CLI::success("Import completed");
