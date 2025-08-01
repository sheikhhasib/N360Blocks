<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// Add custom block category
add_filter( 'block_categories_all', function( $categories ) {
  return array_merge(
    array(
      array(
        'slug'  => 'vp-category',
        'title' => __( 'N360Blocks', 'n360blocks' ),
        'icon'  => null,
      )
    ),
    $categories
  );
}, 999 );

// Disable remote block patterns
add_filter( 'should_load_remote_block_patterns', '__return_false' );

/**
 * Register video-related scripts
 */
add_action( 'wp_enqueue_scripts', function () {
  // Register custom N360Blocks video script
  wp_register_script(
    'n360-video',
    N360BL_URL . '/assets/n360-video.js',
    [ 'jquery' ],
    N360BL_VERSION,
    true
  );

  // Register custom N360Blocks video inline script
  wp_register_script(
    'n360-video-inline',
    N360BL_URL . '/assets/n360-video-inline.js',
    [ 'jquery' ],
    N360BL_VERSION,
    true
  );

  // Register external APIs
  wp_register_script(
    'vimeo_embed_api',
    'https://player.vimeo.com/api/player.js',
    [],
    N360BL_VERSION,
    true
  );

  wp_register_script(
    'yt_embed_api',
    'https://www.youtube.com/iframe_api',
    [],
    N360BL_VERSION,
    true
  );

  // Enqueue scripts
  wp_enqueue_script('n360-video');
  wp_enqueue_script('vimeo_embed_api');
  wp_enqueue_script('yt_embed_api');
} );
