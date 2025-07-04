<?php
/**
 * Load and initiate your blocks
 */

namespace N360Blocks;

use N360Blocks\Blocks\DynamicBlock;

class Blocks {

  public function __construct(){
    new DynamicBlock();
  }

}
