<?php

namespace N360Blocks;

class Installer {
   /**
    * Run the installer
    *
    * @return void
    */
   public function run() {
       $this->add_version();
   }

   /**
    * Add time and version on DB
    */
   public function add_version() {
       $installed = get_option( 'N360Blocks_installed' );

       if ( ! $installed ) {
           update_option( 'N360Blocks_installed', time() );
       }

       update_option( 'N360Blocks_installed', N360Blocks_VERSION );
   }

}
