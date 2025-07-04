<?php
  use N360Blocks\Helper\N360BlocksTemplate;

 wp_enqueue_script('N360Blocks-video');

  if ($attributes['video_provider'] === 'youtube') {
    wp_enqueue_script('yt_embed_api');
  } elseif ($attributes['video_provider'] === 'vimeo') {
    wp_enqueue_script('vimeo_embed_api');
  } else {
    return;
  }

  if(empty($attributes['video_url'])) {
    return;
  }

  $template_loader = new N360BlocksTemplate();
  if(empty($attributes['controls']) || !empty($attributes['autoplay']) || !empty($attributes['loop'])) {
    return $template_loader->get('Blocks/Video/video-inline.tpl.php', ['attributes' => $attributes]);
  } else {
    return $template_loader->get('Blocks/Video/video-inline.tpl.php', ['attributes' => $attributes]);
  }
?>