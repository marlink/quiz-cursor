<?php
/**
 * Plugin Name: WP Therapy Survey
 * Description: Interactive therapy survey with personalized results
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: wp-therapy-survey
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

defined('ABSPATH') || exit;

// Stałe pluginu
define('WP_THERAPY_SURVEY_VERSION', '1.0.0');
define('WP_THERAPY_SURVEY_FILE', __FILE__);
define('WP_THERAPY_SURVEY_PATH', plugin_dir_path(__FILE__));
define('WP_THERAPY_SURVEY_URL', plugin_dir_url(__FILE__));

// Autoloader klas
spl_autoload_register(function ($class) {
    $prefix = 'WP_Therapy_Survey_';
    if (strpos($class, $prefix) !== 0) {
        return;
    }
    
    $class_path = str_replace($prefix, '', $class);
    $class_path = strtolower(str_replace('_', '-', $class_path));
    $file = WP_THERAPY_SURVEY_PATH . 'includes/class-' . $class_path . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

// Instalacja/Aktualizacja
register_activation_hook(__FILE__, function() {
    require_once WP_THERAPY_SURVEY_PATH . 'includes/class-wp-therapy-survey-installer.php';
    WP_Therapy_Survey_Installer::install();
});

// Inicjalizacja
function wp_therapy_survey() {
    return WP_Therapy_Survey::get_instance();
}

add_action('plugins_loaded', 'wp_therapy_survey');

// Dodaj link do ustawień w panelu pluginów
add_filter('plugin_action_links_' . plugin_basename(__FILE__), function($links) {
    $settings_link = '<a href="admin.php?page=wp-therapy-survey-settings">' . __('Ustawienia') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
});

// Obsługa deaktywacji
register_deactivation_hook(__FILE__, function() {
    // Wyczyść cache i tymczasowe dane
    delete_transient('wp_therapy_survey_cache');
});

// Obsługa odinstalowania
register_uninstall_hook(__FILE__, function() {
    // Usuń wszystkie dane pluginu
    global $wpdb;
    $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}therapy_survey_results");
    delete_option('wp_therapy_survey_version');
    delete_option('wp_therapy_survey_settings');
}); 