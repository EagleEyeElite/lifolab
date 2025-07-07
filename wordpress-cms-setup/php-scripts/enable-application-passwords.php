<?php

$functions_file = get_template_directory() . '/functions.php';
$content = file_get_contents($functions_file);

$filters = '
// Force enable Application Passwords for development
add_filter("wp_is_application_passwords_available", "__return_true");
';

file_put_contents($functions_file, $content . PHP_EOL . $filters);

?>
