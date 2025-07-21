<?php

/**
 *  Provides Wordpress Backend Capability like any dashboard setting
 */

namespace N360Blocks\Helper;

class N360BL_VpPosts {
  public static function youtubeExtractVideoAndPlaylistId($url) {
    $videoId = null;
    $playlistId = null;

    // Match YouTube video ID
    if (preg_match('/(?:[?&]v=|youtu\.be\/|embed\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})/', $url, $videoMatches)) {
      $videoId = $videoMatches[1];
    }

    // Match YouTube playlist ID
    if (preg_match('/[?&]list=([a-zA-Z0-9_-]+)/', $url, $playlistMatches)) {
      $playlistId = $playlistMatches[1];
    }

    return [
      'videoId' => $videoId,
      'playlistId' => $playlistId,
    ];
  }

  public static function jwplayerExtractMediaAndPlayerId($url) {
    $mediaId = null;
    $playerId = null;

    // Match pattern: /players/{mediaId}-{playerId}.html
    if (preg_match('#/players/([a-zA-Z0-9]+)-([a-zA-Z0-9]+)\.html#', $url, $matches)) {
      $mediaId = $matches[1];
      $playerId = $matches[2];
    }

    return [
      'mediaId' => $mediaId,
      'playerId' => $playerId,
    ];
  }

  public static function extractVimeoId($url) {
    if (preg_match('/vimeo\.com\/(?:video\/)?(\d+)/', $url, $matches)) {
        return $matches[1];
    }
    return null;
  }

  public static function getYouTubeThumbnail($videoId, $quality = 'hqdefault') {
    if(empty($videoId)) {
      return '';
    }

    // Available qualities: default, mqdefault, hqdefault, sddefault, maxresdefault
    return "https://img.youtube.com/vi/{$videoId}/{$quality}.jpg";
  }

  public static function getVimeoThumbnail($video_id) {
    $url = "https://vimeo.com/api/oembed.json?url=https://vimeo.com/$video_id";

    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        return false;
    }

    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);

    return isset($data['thumbnail_url']) ? $data['thumbnail_url'] : false;
  }

  public static function getJwplayerThumbnail($media_id) {
    if (empty($media_id)) {
      return false;
    }

    // 720px preview image is standard; you can also use -640 or -1200
    return "https://cdn.jwplayer.com/thumbs/{$media_id}-720.jpg";
  }
}
