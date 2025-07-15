// youtube iframe player
document.addEventListener('DOMContentLoaded', function() {

  window.YT_videos = window.YT_videos || [];

  function initializeYouTubePlayers() {
    window.YT_videos.forEach(function (v) {
      const media_id = v.media_id || v; // Support for both structured and simple entries
      const media_type = v.media_type || 'youtube'; // Default to 'youtube' if not provided
      const container_id = v.block_id ? `${v.block_id}_${media_id}` : media_id;

      if (media_type === 'youtube') {
        new YT.Player(container_id, {
          videoId: media_id,
          playerVars: {
            playsinline: 1,
            autoplay: v.autoplay,
            loop: v.loop,
            mute: v.mute,
            rel: 0
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

      } else if (media_type === 'yt_playlist') {
        new YT.Player(container_id, {
          playerVars: {
            listType: 'playlist',
            list: media_id,
            autoplay: 0,
            controls: 1,
            loop: 1,
            rel: 0,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    });
  }

  function onYouTubeIframeAPIReady() {
    initializeYouTubePlayers();
  }

  if (typeof window.onYouTubeIframeAPIReady !== 'function') {
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  } else {
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      originalCallback();
      onYouTubeIframeAPIReady();
    };
  }

  if (typeof onPlayerReady !== 'function') {
    function onPlayerReady(event) {}
  }

  if (typeof onPlayerStateChange !== 'function') {
    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.PAUSED) {}
    }
  }

  // Check if the YouTube API script is already loaded
  if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
    // Load the YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    // If the API is already loaded, initialize the players immediately
    onYouTubeIframeAPIReady();
  }
});
