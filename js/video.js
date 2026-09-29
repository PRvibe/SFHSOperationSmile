(function () {
  'use strict';

  function resolveVideoUrl(value, baseUrl) {
    if (typeof value !== 'string' || !value.trim() || value.trim() === 'VIDEO_URL_HERE') return null;
    const input = value.trim();
    let url;
    try {
      url = new URL(input, baseUrl || 'https://chapter.example/');
    } catch (_) {
      return null;
    }

    const relativeFile = url.protocol === 'file:' && baseUrl && baseUrl.startsWith('file:') &&
      !/^[a-z][a-z\d+.-]*:/i.test(input) && !input.startsWith('//');
    if ((!['https:', 'http:'].includes(url.protocol) && !relativeFile) || url.username || url.password) return null;

    const host = url.hostname.toLowerCase();
    const youtubeHosts = ['youtube.com', 'www.youtube.com', 'm.youtube.com',
      'youtube-nocookie.com', 'www.youtube-nocookie.com'];
    if (youtubeHosts.includes(host) || host === 'youtu.be' || host === 'www.youtu.be') {
      let id = '';
      if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1] || '';
      else if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else {
        const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)\/?$/);
        if (match) id = match[1];
      }
      if (!/^[\w-]{11}$/.test(id)) return null;
      return { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0' };
    }

    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(host)) {
      const match = url.pathname.match(/^\/(?:video\/)?(\d{1,12})(?:\/([a-z\d]{6,64}))?\/?$/i);
      if (!match) return null;
      const hash = url.searchParams.get('h') || match[2] || '';
      if (hash && !/^[a-z\d]{6,64}$/i.test(hash)) return null;
      const playerUrl = new URL('https://player.vimeo.com/video/' + match[1]);
      playerUrl.searchParams.set('dnt', '1');
      if (hash) playerUrl.searchParams.set('h', hash);
      return { type: 'vimeo', src: playerUrl.href };
    }

    const extension = url.pathname.match(/\.(mp4|webm)$/i);
    if (!extension) return null;
    return {
      type: 'video',
      src: url.href,
      mimeType: extension[1].toLowerCase() === 'webm' ? 'video/webm' : 'video/mp4'
    };
  }

  // The resolver can be checked with Node without a browser or third-party dependencies.
  if (typeof module !== 'undefined' && module.exports) module.exports = { resolveVideoUrl: resolveVideoUrl };
  if (typeof document === 'undefined') return;

  const config = window.CHAPTER_CONFIG || {};
  const source = resolveVideoUrl(config.joinVideoUrl, document.baseURI);
  if (!source) return; // Preserve the useful static "film is on its way" message.

  function resolveAssetUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, document.baseURI);
      const localFile = url.protocol === 'file:' && document.location.protocol === 'file:' &&
        !/^[a-z][a-z\d+.-]*:/i.test(value) && !value.startsWith('//');
      return !url.username && !url.password && (['http:', 'https:'].includes(url.protocol) || localFile) ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  document.querySelectorAll('[data-video-player]').forEach(function (container) {
    const preview = document.createElement('div');
    preview.className = 'video-placeholder video-preview';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = 'A LOOK INSIDE OUR CHAPTER';
    const heading = document.createElement('h2');
    heading.textContent = 'See our chapter in action.';
    const description = document.createElement('p');
    description.className = 'video-preview__description';
    description.textContent = 'Meet the people, moments, and purpose that bring us together.';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play-button';

    const icon = document.createElement('span');
    icon.className = 'video-play-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '\u25b6';
    const label = document.createElement('span');
    label.className = 'video-play-copy';
    label.textContent = 'Play our chapter film';
    button.append(icon, label);
    preview.append(eyebrow, heading, description, button);
    container.replaceChildren(preview);

    const poster = resolveAssetUrl(config.joinVideoPoster);
    if (poster) {
      const image = document.createElement('img');
      image.className = 'video-poster';
      image.src = poster;
      image.alt = '';
      image.loading = 'lazy';
      container.prepend(image);
      container.classList.add('video-player--has-poster');
    }

    container.dataset.videoState = 'ready';
    const filmSection = container.closest('.join-film');
    const filmCaption = filmSection && filmSection.querySelector('.film-caption span:last-child');
    if (filmCaption) filmCaption.textContent = 'Our chapter, in motion';

    button.addEventListener('click', function () {
      let player;
      if (source.type === 'video') {
        player = document.createElement('video');
        player.controls = true;
        player.playsInline = true;
        player.preload = 'metadata';
        player.setAttribute('aria-label', 'South Forsyth Operation Smile chapter film');
        if (poster) player.poster = poster;
        const mediaSource = document.createElement('source');
        mediaSource.src = source.src;
        mediaSource.type = source.mimeType;
        player.appendChild(mediaSource);

        const captions = resolveAssetUrl(config.joinVideoCaptions);
        if (captions) {
          const track = document.createElement('track');
          track.kind = 'captions';
          track.src = captions;
          track.srclang = 'en';
          track.label = 'English';
          track.default = true;
          player.appendChild(track);
        }
        const fallback = document.createElement('a');
        fallback.href = source.src;
        fallback.textContent = 'Open the chapter film';
        player.appendChild(fallback);
      } else {
        player = document.createElement('iframe');
        player.src = source.src;
        player.title = 'South Forsyth Operation Smile chapter film';
        player.allow = 'fullscreen; picture-in-picture; encrypted-media';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
      }
      player.className = 'video-player__media';
      player.tabIndex = 0;
      container.dataset.videoState = 'loaded';
      container.classList.remove('video-player--has-poster');
      container.replaceChildren(player);
      player.focus();
    }, { once: true });
  });
})();
