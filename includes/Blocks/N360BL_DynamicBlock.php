<?php

namespace N360Blocks\Blocks;

class N360BL_DynamicBlock {
  private array $blocks = [
    'video',
  ];

  public function __construct() {
    add_action('init', [$this, 'blocks_init']);
    add_filter('vp_allowed_block', [$this, 'allow_blocks']);
    add_filter('enqueue_block_assets', [$this, 'vp_enqueue_block_assets']);
  }

  public function blocks_init() {
    foreach ($this->blocks as $block) {
      $this->register_block($block);
    }
  }

  private function register_block($name, $options = []): void {
    register_block_type(N360BL_PATH . '/build/blocks/' . $name, $options);
  }

  public function allow_blocks($allowed_blocks) {
    $blocks = array_map(function ($item) {
      return 'vp/' . $item;
    }, $this->blocks);

    return array_merge($blocks, $allowed_blocks);
  }

  public function vp_enqueue_block_assets() {
    wp_enqueue_style('dashicons');
  }
}
