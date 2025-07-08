<?php
  use N360Blocks\Helper\N360BL_Template;
  if ( ! defined( 'ABSPATH' ) ) exit;

  if(empty($attributes['video_url'])) {
    return;
  }

  $template_loader = new N360BL_Template();
  if(empty($attributes['controls']) || !empty($attributes['autoplay']) || !empty($attributes['loop'])) {
    return $template_loader->get('Blocks/Video/video-inline.tpl.php', ['attributes' => $attributes]);
  } else {
    return $template_loader->get('Blocks/Video/video-inline.tpl.php', ['attributes' => $attributes]);
  }
?>