# N360Blocks

**N360Blocks** is a modern WordPress plugin that extends the Gutenberg editor with custom video blocks for YouTube and Vimeo. It offers sleek, customizable player controls, responsive design, and a user-friendly interface for content creators who want full control over video presentation.

Perfect for publishers, bloggers, and marketers looking for a fast, flexible, and professional video block solution.

> 🚧 *Post grid and additional blocks are under development and coming soon.*

---

## ✨ Features

- Embed YouTube and Vimeo videos with advanced player controls
- Customizable UI elements: play/pause, volume, progress bar, fullscreen
- Fully responsive and mobile-friendly
- Built for performance and Core Web Vitals compliance
- Clean code with a developer-friendly structure
- Compatible with any Gutenberg-ready theme

---

## 📦 Installation

There are two ways to install N360Blocks:

### From the WordPress Admin

1. Go to **Plugins > Add New** in your WordPress dashboard.
2. Search for "N360Blocks".
3. Click **Install Now** and then **Activate**.

### Manual Upload

1. Download the latest version from [WordPress.org](https://wordpress.org/plugins/n360blocks/).
2. In your WordPress dashboard, go to **Plugins > Add New > Upload Plugin**.
3. Select the downloaded ZIP file and click **Install Now**.
4. Activate the plugin via the **Plugins** menu.

### Using FTP/SFTP

1. Upload the `n360blocks` plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin via the **Plugins** menu in WordPress.

---

Once activated, in the Gutenberg editor, search for the "N360Blocks - Video" block. Insert and customize the block as needed.

**Requirements:**
- WordPress 5.8 or higher
- PHP 7.0 or higher

For more details and updates, visit the [N360Blocks plugin page](https://wordpress.org/plugins/n360blocks/).

---

## ❓ Frequently Asked Questions

**Q: Can I use my own player styles?**
A: Yes! The plugin is developer-friendly and allows you to extend or override player styles via CSS.

**Q: Will you support other video platforms?**
A: Currently, only YouTube and Vimeo are supported. More platforms are planned based on user feedback.

**Q: Is the plugin theme-compatible?**
A: Yes, it works with all modern themes that support Gutenberg blocks.

---

## 🖼️ Screenshots

1. N360 Video Block in the Gutenberg editor
2. Settings panel with custom control options
3. Frontend view of embedded video with custom controls

---

## 🌐 External Services Used

This plugin connects to the following APIs **only when a video is embedded**:

### Vimeo API
- **Endpoint**: `https://vimeo.com/api/oembed.json`
- **Purpose**: Retrieves metadata like thumbnails
- **Script**: `https://player.vimeo.com/api/player.js` for playback controls
- **Privacy Policy**: [vimeo.com/privacy](https://vimeo.com/privacy)

### YouTube API
- **Endpoint**: `https://www.youtube.com/iframe_api`
- **Purpose**: Enables video playback functionality and controls
- **Privacy Policy**: [policies.google.com/privacy](https://policies.google.com/privacy)

No personal data is sent from your site by default, but video platforms may track users according to their own policies.

---

## 🗒️ Changelog

### 1.0.3
- Enable JWP player
- URL pattern:https://cdn.jwplayer.com/players/[media_id]-[player_id].html

### 1.0.2
- Fixed a bug with video player with same ID.
- Enabled Lazy loading video.
- Fixed video aspect ratio.

### 1.0.1
- Fixed all issues

### 1.0.0
- Initial release
- YouTube and Vimeo video blocks with customizable player controls

---

## 🔁 Upgrade Notice

Initial release. Post grid block and more features are coming in the next updates.

---

## 👨‍💻 Credits

Developed by [Hasibul Hossain Santo Sheikh](https://newsn360.com)

---

## 👥 Contributors

Thanks to the following people who have contributed to this project:

- [@hasib2130](https://github.com/sheikhhasib) - Creator & maintainer
- [@grohon](https://github.com/grohon)
- [@ahmedisti](https://github.com/ahmedisti)

---

## 🛠️ Support & Feedback

For bug reports, feature suggestions, or contributions:
👉 [GitHub Issues](https://github.com/sheikhhasib/N360Blocks/issues)

If you’d like to support this project:
👉 [Donate here](https://newsn360.com/donate)
