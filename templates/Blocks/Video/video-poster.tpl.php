<?php

use N360Blocks\Helper\N360BL_VpPosts;

if (! defined('ABSPATH')) exit;

$id = 'n360blocks-video-' . ($attributes['block_id'] ?? uniqid());

$video_id          = '';
$video_playlist_id = '';
$video_thumbnail   = '';
$jwp_player_id     = '';

$video_url      = $attributes['video_url'] ?? '';
$video_provider = $attributes['video_provider'] ?? '';
$aspect_ratio   = $attributes['ratio'] ?? 'ratio-16-9';
$template       = '';

if ($video_provider === 'youtube' && !empty($video_url)) { // YouTube
  $video_data        = N360BL_VpPosts::youtubeExtractVideoAndPlaylistId($video_url);
  $video_id          = $video_data['videoId'] ?? '';
  $video_playlist_id = $video_data['playlistId'] ?? '';
  $video_thumbnail   = N360BL_VpPosts::getYouTubeThumbnail($video_id, 'maxresdefault');
} elseif ($video_provider === 'vimeo' && !empty($video_url)) { // Vimeo
  $video_id = N360BL_VpPosts::extractVimeoId($video_url);
  $video_thumbnail = N360BL_VpPosts::getVimeoThumbnail($video_id);
} elseif ($video_provider === 'jwplayer' && !empty($video_url)) { // JWP
  $video_data      = N360BL_VpPosts::jwplayerExtractMediaAndPlayerId($video_url);
  $video_id        = $video_data['mediaId'] ?? '';
  $jwp_player_id   = $video_data['playerId'] ?? '';
  $video_thumbnail = N360BL_VpPosts::getJwplayerThumbnail($video_id);
}


$unique_id = $attributes['block_id'] ?? uniqid();

$link_attributes = sprintf(
  "data-block-id=%s data-video-id=%s data-video-provider=%s data-playlist-id=%s",
  $unique_id,
  $video_id,
  $video_provider,
  !empty($video_playlist_id) ? $video_playlist_id : '',
);

$block_class = 'N360Blocks n360blocks-video n360blocks-video__inline';

$wrapper_attributes = get_block_wrapper_attributes(['class' => $block_class, 'id' => $id]);
?>
<div <?php echo $wrapper_attributes; ?>>
  <div class="N360Blocks__container">
    <div class="N360Blocks__frame <?php echo esc_html($aspect_ratio); ?>">
      <a href="#" class="N360Blocks__link" data-player-id="<?php echo $jwp_player_id; ?>" <?php echo esc_html($link_attributes); ?>>
        <svg class="N360Blocks__play-icon" width="48" height="48" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="39" cy="39" r="38" stroke="#ffffff" stroke-width="2" fill="rgba(0, 0, 0, 0.6)" />
          <polygon points="33,28 53,39 33,50" fill="#ffffff" />
        </svg>
        <span class="N360Blocks__loading N360Blocks-hide">
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="#3498db" stroke-width="4" fill="none" stroke-dasharray="31.4 31.4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="1s"
                repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
        <?php if (!empty($video_thumbnail)) : ?>
          <img
            onerror="this.style.visibility='hidden'; this.style.fontSize=0"
            class="N360Blocks__thumbnail <?php echo esc_html($aspect_ratio); ?>"
            src="<?php echo esc_url($video_thumbnail); ?>"
            alt="<?php echo esc_html($video_provider) ?? ''; ?>"
          >
        <?php endif; ?>
      </a>
      <section class="N360Blocks__section-video <?php echo esc_html($aspect_ratio) ?? ''; ?>">
        <div id="N360Blocks-video-inline-<?php echo esc_html($unique_id) . '-' . esc_html($video_id) ?>" class="N360Blocks-hide"></div>
      </section>
    </div>
  </div>
</div>