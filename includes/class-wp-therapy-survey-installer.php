<?php
class WP_Therapy_Survey_Installer {
    
    public static function install() {
        self::check_requirements();
        self::create_tables();
        self::set_version();
    }

    private static function check_requirements() {
        global $wp_version;
        
        // Sprawdź wersję WordPress
        if (version_compare($wp_version, '5.0', '<')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die('Ten plugin wymaga WordPress w wersji 5.0 lub wyższej.');
        }

        // Sprawdź PHP
        if (version_compare(PHP_VERSION, '7.4', '<')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die('Ten plugin wymaga PHP w wersji 7.4 lub wyższej.');
        }
    }

    private static function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        // Tabela wyników
        $table_name = $wpdb->prefix . 'therapy_survey_results';
        
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) DEFAULT NULL,
            gender varchar(10) NOT NULL,
            age_range varchar(20) NOT NULL,
            sleep_score int(11) NOT NULL,
            concentration_score int(11) NOT NULL,
            relaxation_score int(11) NOT NULL,
            memory_score int(11) NOT NULL,
            total_score float NOT NULL,
            recommended_therapy varchar(100) NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    private static function set_version() {
        update_option('wp_therapy_survey_version', '1.0.0');
    }
} 