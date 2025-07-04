<?php

namespace N360Blocks\Blocks;

class DynamicBlock {
  private array $blocks = [
    'video',
  ];

  public function __construct() {
    add_action('init', [$this, 'blocks_init']);
    add_filter('vp_allowed_block', [$this, 'allow_blocks'], 99, 1);
  }

  public function blocks_init() {
    foreach ($this->blocks as $block) {
      $this->register_block($block);
    }
  }

  private function register_block($name, $options = []): void {
    register_block_type(N360Blocks_PATH . '/build/blocks/' . $name, $options);
  }

  public function allow_blocks($allowed_blocks) {
    $blocks = array_map(function ($item) {
      return 'vp/' . $item;
    }, $this->blocks);

    return array_merge($blocks, $allowed_blocks);
  }

}
