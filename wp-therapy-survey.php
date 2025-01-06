<?php
/**
 * Plugin Name: WP Therapy Survey
 * Description: Interactive therapy survey with personalized results
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: wp-therapy-survey
 */

defined('ABSPATH') || exit;

require_once plugin_dir_path(__FILE__) . 'includes/class-wp-therapy-survey-loader.php';

// Inicjalizacja pluginu
function init_therapy_survey() {
    return WP_Therapy_Survey_Loader::get_instance();
}

init_therapy_survey(); 