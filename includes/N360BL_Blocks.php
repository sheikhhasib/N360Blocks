<?php
/**
 * Load and initiate your blocks
 */

namespace N360Blocks;

use N360Blocks\Blocks\N360BL_DynamicBlock;

class N360BL_Blocks {

  public function __construct(){
    new N360BL_DynamicBlock();
  }

}
