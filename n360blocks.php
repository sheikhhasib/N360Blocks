<?php
/**
 * Plugin Name:       N360Blocks
 * Plugin URI:        https://newsn360.com/n360blocks
 * Description:       A powerful WordPress plugin offering customizable video blocks, post grids, and scalable content layouts for Gutenberg.
 * Version:           1.0.3
 * Contributors:      hasib2130, grohon
 * Author:            Hasibul Hossain Santo Sheikh
 * Author URI:        https://newsn360.com
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       n360blocks
 * Domain Path:       /languages
 *
 * @package           N360Blocks
 */

// Abort if this file is called directly.
if ( ! defined( 'WPINC' ) ) {
    exit;
}

// Autoload dependencies.
require_once __DIR__ . '/vendor/autoload.php';

// Initialize plugin after plugins are loaded.
add_action( 'plugins_loaded', array( 'N360Blocks', 'instance' ) );

/**
 * The main plugin class
 */
final class N360Blocks {

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.3';

    /**
     * N360Blocks constructor.
     */
    private function __construct() {
        $this->define_constants();
        $this->init_plugin();
        register_activation_hook( __FILE__, [ $this, 'activate' ] );
    }

    /**
     * Initialize singleton instance
     *
     * @return N360Blocks
     */
    public static function instance() {
        static $instance = null;

        if ( is_null( $instance ) ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define plugin constants
     */
    public function define_constants() {
        $theme_obj    = wp_get_theme();
        $parent_theme = $theme_obj->get( 'Template' );
        $template_dir = ! empty( $parent_theme ) ? get_stylesheet_directory() : get_template_directory();

        define( 'N360BL_THEME_PATH', $template_dir );
        define( 'N360BL_VERSION', self::version );
        define( 'N360BL_FILE', __FILE__ );
        define( 'N360BL_PATH', __DIR__ );
        define( 'N360BL_URL', plugins_url( '', __FILE__ ) );
        define( 'N360BL_ASSETS', N360BL_URL . '/assets' );
    }

    /**
     * Initialize plugin parts
     */
    public function init_plugin() {
        if ( is_admin() ) {
            new N360Blocks\N360BL_Admin();
        } else {
            new N360Blocks\N360BL_Frontend();
        }

        new N360Blocks\N360BL_Blocks();
    }

    /**
     * Actions to run on plugin activation
     */
    public function activate() {
        $installer = new N360Blocks\Installer();
        $installer->run();
    }
}
