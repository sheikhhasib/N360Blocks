=== N360Blocks ===
Contributors: hasib2130
Donate link: https://newsn360.com/donate
Tags: gutenberg, blocks, video, youtube, vimeo, player, custom controls
Requires at least: 5.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
Version: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modern Gutenberg block plugin for embedding YouTube and Vimeo videos with custom player controls.

== Description ==

**N360Blocks** is a modern WordPress plugin that extends the Gutenberg editor with custom video blocks for YouTube and Vimeo. It offers sleek, customizable player controls, responsive design, and a user-friendly interface for content creators who want full control over video presentation.

Perfect for publishers, bloggers, and marketers looking for a fast, flexible, and professional video block solution.

🚧 *Post grid and additional blocks are under development and coming soon.*

== Features ==

- Embed YouTube and Vimeo videos with advanced player controls
- Customizable UI elements: play/pause, volume, progress bar, fullscreen
- Fully responsive and mobile-friendly
- Built for performance and Core Web Vitals compliance
- Clean code with a developer-friendly structure
- Compatible with any Gutenberg-ready theme

== Installation ==

1. Upload the `n360blocks` plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the ‘Plugins’ menu in WordPress.
3. In the Gutenberg editor, search for “N360 Video” block.
4. Insert and customize the block as needed.

== Frequently Asked Questions ==

= Can I use my own player styles? =
Yes, the plugin is developer-friendly and allows you to extend or override player styles via CSS.

= Will you support other video platforms? =
Currently, only YouTube and Vimeo are supported. More platforms are planned based on user feedback.

= Is the plugin theme-compatible? =
Yes, it works with all modern themes that support Gutenberg blocks.

== Screenshots ==

1. N360 Video Block in the Gutenberg editor.
2. Settings panel with custom control options.
3. Frontend view of embedded video with custom controls.

== External services ==

This plugin connects to the following external APIs:

1. **Vimeo API**
  - Endpoint: `https://vimeo.com/api/oembed.json`
  - Purpose: Used to retrieve video metadata, including thumbnails, for Vimeo videos embedded using the plugin.
  - The plugin also loads the Vimeo Player JavaScript API (`https://player.vimeo.com/api/player.js`) to enable custom playback controls.
  - Vimeo’s privacy policy and terms apply: https://vimeo.com/privacy

2. **YouTube API**
  - Endpoint: `https://www.youtube.com/iframe_api`
  - Purpose: Used to enable playback functionality and custom controls for YouTube videos embedded via the plugin.
  - YouTube’s privacy policy and terms apply: https://policies.google.com/privacy

These external services are only called when videos from Vimeo or YouTube are used. No personal data is sent from your site to these services by default, but the respective video platforms may track users according to their own policies.

== Changelog ==

= 1.0.0 =
* Initial release.
* YouTube and Vimeo video blocks with customizable player controls.

== Upgrade Notice ==

Initial release. Post grid block and more features are coming in the next updates.

== Credits ==

Developed by Hasibul Hossain Santo Sheikh — https://newsn360.com

== Support & Feedback ==

For bug reports, suggestions, and feature requests, visit: https://github.com/sheikhhasib/N360Blocks
