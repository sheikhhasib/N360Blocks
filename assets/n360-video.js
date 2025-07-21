(function ($) {
  $(document).ready(function () {

    $(document).on('click', '.N360Blocks__link', function (e) {
      e.preventDefault();

      let blockId       = $(this).data('block-id').toString();
      let videoId       = $(this).data('video-id').toString();
      let videoProvider = $(this).data('video-provider');
      let playlistId    = $(this).data('playlist-id');
      let playerId      = $(this).data('player-id'); // Required for JW Player

      const inline_video = $(`#N360Blocks-video-inline-${blockId}-${videoId}`);

      if (inline_video.length) {
        inline_video.show();

        if (videoProvider === 'youtube' || videoProvider === 'vimeo' || videoProvider === 'jwplayer') {
          inline_video.empty();

          if (videoProvider === 'youtube') {
            initializeYouTubePlayer({ videoId, playlistId }, inline_video, $(this));
          } else if (videoProvider === 'vimeo') {
            initializeVimeoPlayer(videoId, inline_video, $(this));
          } else if (videoProvider === 'jwplayer') {
            initializeJWPPlayer(videoId, playerId, inline_video, $(this));
          }
        }
      }

      $(this).find('.N360Blocks__play-icon').hide();
    });

  });

  function initializeYouTubePlayer({ videoId, playlistId }, videoContainer, currentLink) {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      console.error('YouTube IFrame API is not loaded.');
      return;
    }

    if (videoContainer.hasClass('yt-initialized')) return;
    videoContainer.addClass('yt-initialized');

    currentLink.find('.N360Blocks__loading').show();

    const playerVars = {
      controls: 1,
      playsinline: 1
    };

    if (playlistId) {
      playerVars.listType = 'playlist';
      playerVars.list = playlistId;
    }

    new YT.Player(videoContainer[0], {
      videoId: videoId,
      playerVars,
      events: {
        onReady: function (event) {
          currentLink.find('.N360Blocks__loading').hide();
          event.target.playVideo();
        }
      }
    });
  }

  let vimeoPlayer = null;
  function initializeVimeoPlayer(videoId, videoContainer, currentLink) {
    if (!window.Vimeo) {
      console.error('Vimeo API is not loaded.');
      return;
    }

    currentLink.find('.N360Blocks__loading').show();

    if (!videoContainer.hasClass('vimeo-initialized')) {
      videoContainer.addClass('vimeo-initialized');

      vimeoPlayer = new Vimeo.Player(videoContainer[0], {
        id: videoId,
        autoplay: true,
      });

      vimeoPlayer.on('loaded', function () {
        currentLink.find('.N360Blocks__loading').hide();
      });
    }
  }

  function initializeJWPPlayer(mediaId, playerId, videoContainer, currentLink) {
    if (!mediaId || !playerId) {
      console.error("JW Player media ID or player ID missing.");
      return;
    }

    const containerId = `jwplayer-${mediaId}-${playerId}`;

    // Prevent re-initialization
    if (videoContainer.hasClass('jwplayer-initialized')) return;
    videoContainer.addClass('jwplayer-initialized');

    currentLink.find('.N360Blocks__loading').show();

    // Set container ID and append it
    videoContainer.attr('id', containerId);

    function loadAndInitJWP() {
      jwplayer(containerId).setup({
        file: `https://cdn.jwplayer.com/videos/${mediaId}.mp4`,
        image: `https://cdn.jwplayer.com/thumbs/${mediaId}-720.jpg`,
        autostart: true,
        mute: true,
        controls: true,
        width: "100%",
        aspectratio: "16:9",
      });

      jwplayer(containerId).on('ready', function () {
        currentLink.find('.N360Blocks__loading').hide();
      });
    }

    if (typeof jwplayer === 'undefined') {
      const jwScript = document.createElement('script');
      jwScript.src = `https://cdn.jwplayer.com/libraries/${playerId}.js`;
      jwScript.onload = loadAndInitJWP;
      document.head.appendChild(jwScript);
    } else {
      loadAndInitJWP();
    }
  }

})(jQuery);
