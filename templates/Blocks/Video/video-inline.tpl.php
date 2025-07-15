<?php

use N360Blocks\Helper\N360BL_VpPosts;

if (! defined('ABSPATH')) exit;

$id = 'n360blocks-video-' . ($attributes['block_id'] ?? uniqid());

if (!empty($block['anchor'])) {
  $id = $block['anchor'];
}

$video_id          = '';
$video_playlist_id = '';
$video_thumbnail   = '';

$video_url      = $attributes['video_url'] ?? '';
$video_provider = $attributes['video_provider'] ?? '';
$aspect_ratio   = $attributes['ratio'] ?? 'ratio-16-9';

if ($video_provider === 'youtube' && !empty($video_url)) {
  $video_data        = N360BL_VpPosts::youtubeExtractVideoAndPlaylistId($video_url);
  $video_id          = $video_data['videoId'] ?? '';
  $video_playlist_id = $video_data['playlistId'] ?? '';
} elseif ($video_provider === 'vimeo' && !empty($video_url)) {
  $video_id = N360BL_VpPosts::extractVimeoId($video_url);
}

// Enqueue inline video script
wp_enqueue_script('n360-video-inline');

// Generate a unique container ID for this block instance
$unique_container_id = $video_id . '-' . ($attributes['block_id'] ?? uniqid());

$block_class = 'N360Blocks n360blocks-video n360blocks-video__inline';
$wrapper_attributes = get_block_wrapper_attributes(['class' => $block_class, 'id' => $id]);
?>
<div <?php echo $wrapper_attributes; ?>>
  <div class="N360Blocks__container">
    <div class="N360Blocks__frame">
      <?php if (!empty($video_id) && !empty($video_provider)) : ?>
        <div class="section--video video-item <?php echo esc_attr("video-provider-".$video_provider . ' '. $aspect_ratio); ?>">
          <div id="<?php echo esc_attr($unique_container_id . '-inline_' . $video_id); ?>"></div>

          <?php switch ($video_provider):
            case 'youtube': ?>
              <script>
                (window.YT_videos = window.YT_videos || []).push({
                  media_id: <?php echo json_encode($video_id); ?>,
                  media_type: 'youtube',
                  autoplay: <?php echo $attributes['autoplay'] ? 1 : 0; ?>,
                  mute: <?php echo $attributes['autoplay'] ? 1 : 0; ?>,
                  loop: <?php echo $attributes['loop'] ? 1 : 0; ?>,
                  block_id: <?php echo json_encode($unique_container_id . '-inline'); ?>
                });
              </script>
            <?php break;

            case 'vimeo': ?>
              <script>
                new Promise(function(resolve, reject) {
                  let startTime = Date.now();

                  (function waitForVimeoObject(time) {
                    if (typeof Vimeo === "object") {
                      return resolve();
                    } else if (Date.now() > (time + 15000)) {
                      return reject("Vimeo API load timeout");
                    }
                    setTimeout(function() {
                      waitForVimeoObject(time);
                    }, 100);
                  })(startTime);
                }).then(function() {
                  let media_id = '<?php echo esc_js($video_id); ?>';
                  let container_id = '<?php echo esc_js($unique_container_id . '-inline_' . $video_id); ?>';
                  let vimeoOptions = {
                    id: media_id,
                    autoplay: <?php echo $attributes['autoplay'] ? 'true' : 'false'; ?>,
                    loop: <?php echo $attributes['loop'] ? 'true' : 'false'; ?>,
                    controls: <?php echo $attributes['controls'] ? 'true' : 'false'; ?>,
                    muted: <?php echo $attributes['autoplay'] ? 'true' : 'false'; ?>,
                    background: false,
                    dnt: true
                  };

                  let vimeoPlayer = new Vimeo.Player(container_id, vimeoOptions);
                  (window.Vimeo_videos = window.Vimeo_videos || []).push(media_id);

                  vimeoPlayer.on('play', function() {
                    // Optional: handle play event
                  });
                }).catch(function(error) {
                  console.error('Vimeo player init error:', error);
                });
              </script>
          <?php break;
          endswitch; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>
