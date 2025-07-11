(function ($) {
  $(document).ready(function () {

    $(document).on('click', '.N360Blocks__link', function (e) {
      e.preventDefault();

      let blockId       = $(this).data('block-id').toString();
      let videoId       = $(this).data('video-id').toString();
      let videoProvider = $(this).data('video-provider');
      let playlistId    = $(this).data('playlist-id');

      const inline_video = $(`#N360Blocks-video-inline-${blockId}-${videoId}`);


      if (inline_video.length) {
        inline_video.show();

        if (videoProvider === 'youtube' || videoProvider === 'vimeo') {
          inline_video.empty();

          if (videoProvider === 'youtube') {
            initializeYouTubePlayer({ videoId, playlistId }, inline_video, $(this));
          } else if (videoProvider === 'vimeo') {
            initializeVimeoPlayer(videoId, inline_video, $(this));
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

    console.log('Initializing YouTube player with videoId:', videoId, 'and playlistId:', playlistId);

    if (videoContainer.hasClass('yt-initialized')) return;
    videoContainer.addClass('yt-initialized');

    currentLink.find('.N360Blocks__loading').show();

    const playerVars = {
      controls: 1,
      playsinline: 1
    };

    // If playlistId is provided, set playlist options
    if (playlistId) {
      playerVars.listType = 'playlist';
      playerVars.list = playlistId;
    }

    const playerInstance = new YT.Player(videoContainer[0], {
      // Always pass videoId — YouTube needs it even for playlists
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

})(jQuery);
