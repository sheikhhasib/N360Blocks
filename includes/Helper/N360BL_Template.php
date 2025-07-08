<?php
namespace N360Blocks\Helper;

class N360BL_Template {

  protected $theme_path;
  protected $plugin_path;
  protected $version;

  public function __construct() {
    $this->theme_path  = defined('N360BL_THEME_PATH') ? trailingslashit(N360BL_THEME_PATH) : get_stylesheet_directory() . '/';
    $this->plugin_path = defined('N360BL_PATH') ? trailingslashit(N360BL_PATH) : plugin_dir_path(__FILE__);
    $this->version     = defined('N360BL_VERSION') ? N360BL_VERSION : '1.0.0';
  }

  public function get($template_name, $args = [], $template_path = '', $default_path = '', $print = true) {
    $cache_key = sanitize_key(implode('-', [
        'template', $template_name, $template_path, $default_path, $this->version,
    ]));

    $template = wp_cache_get($cache_key, 'N360BL');

    if (!$template) {
        $template = $this->locate($template_name, $template_path, $default_path);
        $cache_path = $this->tokenize_path($template, $this->get_path_tokens());
        wp_cache_set($cache_key, $cache_path, 'N360BL');
    } else {
        $template = $this->untokenize_path($template, $this->get_path_tokens());
    }

    $template = apply_filters('n360bl_get_template', $template, $template_name, $args, $template_path, $default_path, $print);

    if (!file_exists($template)) {
        return '';
    }

    extract($args, EXTR_SKIP); // Avoid overwriting existing vars

    if ($print) {
        include $template;
    } else {
        ob_start();
        include $template;
        return ob_get_clean();
    }
  }

  public function locate($template_name, $template_path = '', $default_path = '') {
    if (!$template_path) {
      $template_path = $this->theme_path . 'templates/';
    }

    if (!$default_path) {
      $default_path = $this->plugin_path . 'templates/';
    }

    $paths = [
      trailingslashit($template_path) . $template_name,
      trailingslashit($this->theme_path) . $template_name,
      trailingslashit($default_path) . $template_name,
    ];

    foreach ($paths as $path) {
      if (file_exists($path)) {
        return apply_filters('n360bl_locate_template', $path, $template_name, $template_path);
      }
    }

    return null;
  }

  protected function tokenize_path($path, $path_tokens) {
    uasort($path_tokens, fn($a, $b) => strlen($b) <=> strlen($a));

    foreach ($path_tokens as $token => $token_path) {
      if (strpos($path, $token_path) === 0) {
        return str_replace($token_path, '{{' . $token . '}}', $path);
      }
    }

    return $path;
  }

  protected function untokenize_path($path, $path_tokens) {
    foreach ($path_tokens as $token => $token_path) {
      $path = str_replace('{{' . $token . '}}', $token_path, $path);
    }

    return $path;
  }

  protected function get_path_tokens() {
    $defines = [
      'ABSPATH',
      'WP_CONTENT_DIR',
      'WP_PLUGIN_DIR',
      'WPMU_PLUGIN_DIR',
      'PLUGINDIR',
      'WP_THEME_DIR',
      'N360BL_PATH',
      'N360BL_THEME_PATH',
    ];

    $tokens = [];
    foreach ($defines as $define) {
      if (defined($define)) {
        $tokens[$define] = constant($define);
      }
    }

    return apply_filters('n360bl_get_path_define_tokens', $tokens);
  }
}
