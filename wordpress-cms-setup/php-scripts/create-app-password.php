<?php
$admin_user = get_user_by('login', 'admin');
$custom_password = getenv('FRONTEND_NEXTJS_PASSWORD');

WP_Application_Passwords::create_new_application_password(
    $admin_user->ID,
    [
        'name' => 'Frontend NextJS',
        'app_id' => 'frontend-nextjs'
    ]
);

$passwords = WP_Application_Passwords::get_user_application_passwords($admin_user->ID);
$passwords[0]['password'] = wp_fast_hash($custom_password);
update_user_meta($admin_user->ID, '_application_passwords', $passwords);

WP_CLI::log('Application password updated with custom password');
?>
