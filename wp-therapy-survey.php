<?php
/**
 * Plugin Name: WP Therapy Survey
 * Description: Interactive therapy survey with personalized results
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: wp-therapy-survey
 */

defined('ABSPATH') || exit;

class WP_Therapy_Survey {
    private $version = '1.0.0';
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'init'));
        add_shortcode('therapy_survey', array($this, 'render_survey'));
    }

    public function init() {
        wp_register_style(
            'wp-therapy-survey',
            plugins_url('assets/css/frontend.css', __FILE__),
            array(),
            $this->version
        );

        wp_register_script(
            'wp-therapy-survey',
            plugins_url('assets/js/frontend.js', __FILE__),
            array('jquery'),
            $this->version,
            true
        );
    }

    public function render_survey($atts) {
        wp_enqueue_style('wp-therapy-survey');
        wp_enqueue_script('wp-therapy-survey');

        ob_start();
        include plugin_dir_path(__FILE__) . 'templates/survey-template.php';
        return ob_get_clean();
    }
}

// Inicjalizacja
function init_therapy_survey() {
    return WP_Therapy_Survey::get_instance();
}

init_therapy_survey(); 