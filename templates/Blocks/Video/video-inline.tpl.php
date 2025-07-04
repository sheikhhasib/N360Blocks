<?php

use N360Blocks\Helper\VpPosts;

$video_id          = '';
$video_playlist_id = '';
$video_thumbnail   = '';

$video_url      = $attributes['video_url'] ?? '';
$video_provider = $attributes['video_provider'] ?? '';
$aspect_ratio   = $attributes['ratio'] ?? 'ratio-16-9';
$template       = '';

if ($video_provider === 'youtube' && !empty($video_url)) {
  $video_data        = VpPosts::youtubeExtractVideoAndPlaylistId($video_url);
  $video_id          = $video_data['videoId'] ?? '';
  $video_playlist_id = $video_data['playlistId'] ?? '';
} elseif ($video_provider === 'vimeo' && !empty($video_url)) {
  $video_id = VpPosts::extractVimeoId($video_url);
}
?>
<div class="N360Blocks <?php echo esc_attr($attributes['className'] ?? ''); ?>">
  <div class="N360Blocks__container">
    <div class="N360Blocks__frame <?php echo esc_attr($aspect_ratio); ?>">
      <?php if (!empty($video_id) && !empty($video_provider)) : ?>
        <div class="section--video video-item mb-8">
          <div id="<?php echo esc_attr($video_id); ?>"></div>

          <?php switch ($video_provider):
            case 'youtube': ?>
              <script>
                var media_id = <?php echo json_encode($video_id); ?>;
                (window.YT_videos = window.YT_videos || []).push(media_id);

                if (typeof onYouTubeIframeAPIReady !== 'function') {
                  function onYouTubeIframeAPIReady() {
                    let playerVars = {
                      'playsinline': 1,
                      'autoplay': <?php echo $attributes['autoplay'] ? '1' : '0'; ?>,
                      'loop': <?php echo $attributes['loop'] ? '1' : '0'; ?>,
                      'controls': <?php echo $attributes['controls'] ? '1' : '0'; ?>,
                      'mute': <?php echo $attributes['autoplay'] ? '1' : '0'; ?>,
                    };

                    console.log("youtube playvars", playerVars);


                    window.YT_videos?.forEach(function(media_id) {
                      let container_id = media_id;
                      let player = new YT.Player(container_id, {
                        videoId: media_id,
                        playerVars: playerVars,
                        events: {
                          'onReady': onPlayerReady,
                          'onStateChange': onPlayerStateChange
                        }
                      });
                    });
                  }
                }

                if (typeof onPlayerReady !== 'function') {
                  function onPlayerReady(event) {
                    // Optional: handle ready state
                  }
                }

                if (typeof onPlayerStateChange !== 'function') {
                  function onPlayerStateChange(event) {
                    if (event.data === YT.PlayerState.PAUSED) {
                      // Optional: handle pause state
                    }
                  }
                }
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
                  let container_id = media_id;
                  let vimeoOptions = {
                    id: media_id,
                    autoplay: <?php echo $attributes['autoplay'] ? 'true' : 'false'; ?>,
                    loop: <?php echo $attributes['loop'] ? 'true' : 'false'; ?>,
                    controls: <?php echo $attributes['controls'] ? 'true' : 'false'; ?>,
                    muted: <?php echo $attributes['autoplay'] ? 'true' : 'false'; ?>,
                    background: false,
                    dnt: true
                  };
                  console.log("vimeo playvars", vimeoOptions);

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
