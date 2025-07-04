import React, { useState, useEffect, useRef } from "react";

const YouTubePlayer = ({ data }) => {
    const playerRef = useRef(null);
    const playerInstance = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (!window.YT) {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                initializePlayer();
            }
        };

        window.onYouTubeIframeAPIReady = initializePlayer;
        loadYouTubeAPI();

        return () => {
            if (playerInstance.current) {
                playerInstance.current.destroy();
            }
        };
    }, [data.video_url]);

    const initializePlayer = () => {
        if (!data.video_url) return;

        const { videoId, playlistId } = extractVideoAndPlaylistId(data.video_url);
        if (!videoId) return;

        const playerVars = {
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
        };

        if (playlistId) {
            playerVars.listType = "playlist";
            playerVars.list = playlistId;
        }

        playerInstance.current = new window.YT.Player(playerRef.current, {
            videoId,
            playerVars,
            events: {
                onReady: (event) => {
                    event.target.setVolume(volume);
                    // Start updating progress bar
                    requestAnimationFrame(updateProgress);
                },
                onStateChange: (event) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setIsPlaying(true);
                    } else if (event.data === window.YT.PlayerState.PAUSED) {
                        setIsPlaying(false);
                    }
                },
            },
        });
    };

    const extractVideoAndPlaylistId = (url) => {
        let videoId = null;
        let playlistId = null;

        const videoMatch = url.match(/(?:[?&]v=|youtu\.be\/|embed\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})/);
        if (videoMatch) videoId = videoMatch[1];

        const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
        if (playlistMatch) playlistId = playlistMatch[1];

        return { videoId, playlistId };
    };

    const togglePlayPause = () => {
        if (playerInstance.current) {
            isPlaying ? playerInstance.current.pauseVideo() : playerInstance.current.playVideo();
        }
    };

    const seekForward = () => {
        if (playerInstance.current) {
            playerInstance.current.seekTo(playerInstance.current.getCurrentTime() + 10, true);
        }
    };

    const seekBackward = () => {
        if (playerInstance.current) {
            playerInstance.current.seekTo(Math.max(0, playerInstance.current.getCurrentTime() - 10), true);
        }
    };

    const setVideoVolume = (value) => {
        if (playerInstance.current) {
            playerInstance.current.setVolume(value);
            setVolume(value);
        }
    };

    const toggleMute = () => {
        if (playerInstance.current) {
            if (isMuted) {
                playerInstance.current.unMute();
            } else {
                playerInstance.current.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    const updateProgress = () => {
        if (playerInstance.current && playerInstance.current.getDuration) {
            const currentTime = playerInstance.current.getCurrentTime();
            const duration = playerInstance.current.getDuration();
            const newProgress = (currentTime / duration) * 100;
            setProgress(newProgress);

            // Call updateProgress again to keep it smooth
            if (isPlaying) {
                requestAnimationFrame(updateProgress);
            }
        }
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);
        if (playerInstance.current) {
            const duration = playerInstance.current.getDuration();
            playerInstance.current.seekTo((newProgress / 100) * duration, true);
        }
    };

    return (
        <div className="N360Blocks-controls-container">
            <div ref={playerRef} id="N360Blocks-player"></div>

            <div className="controls-wrapper">
                <div className="controls">
                    <button onClick={seekBackward}><span class="dashicons dashicons-controls-back"></span></button>

                    {isPlaying ? <>
                        <button className="play-btn" onClick={togglePlayPause}><span class="dashicons dashicons-controls-pause"></span></button>
                    </> : <>
                        <button className="play-btn" onClick={togglePlayPause}><span class="dashicons dashicons-controls-play"></span></button>
                    </>}

                    <button onClick={seekForward}><span class="dashicons dashicons-controls-forward"></span></button>
                </div>

                <div className="progress-container">
                    <input
                        type="range"
                        className="N360Blocks-progressbar"
                        value={progress}
                        min="0"
                        max="100"
                        step="0.1"
                        onChange={handleProgressChange}
                    />
                </div>

                <div className="volume-container">
                    <button id="muteButton" onClick={toggleMute}>
                        {isMuted ? <>
                            <span class="dashicons dashicons-controls-volumeoff"></span>
                        </> : <>
                            <span class="dashicons dashicons-controls-volumeon"></span>
                        </>}
                    </button>
                    <div className="volume-slider">
                        <input
                            type="range"
                            class="N360Blocks-volume-slider"
                            value={volume}
                            min="0"
                            max="100"
                            step="1"
                            onChange={(e) => setVideoVolume(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                {/* <button class="full-view-video" onClick={enterFullScreen}>⛶</button> */}
            </div>
        </div>
    );
};

export default YouTubePlayer;
