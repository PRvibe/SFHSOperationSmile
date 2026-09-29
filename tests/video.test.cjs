const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveVideoUrl } = require('../js/video.js');

test('YouTube formats all resolve to the privacy-conscious player without autoplay', function () {
  const expected = { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0' };
  [
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ&autoplay=1',
    'https://youtu.be/aqz-KE-bpKQ?si=tracking',
    'https://www.youtube.com/embed/aqz-KE-bpKQ',
    'https://m.youtube.com/shorts/aqz-KE-bpKQ',
    'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ'
  ].forEach(function (url) { assert.deepEqual(resolveVideoUrl(url), expected); });
});

test('Vimeo supports public videos and preserves private-video hashes with tracking disabled', function () {
  assert.deepEqual(resolveVideoUrl('https://vimeo.com/123456789'), {
    type: 'vimeo', src: 'https://player.vimeo.com/video/123456789?dnt=1'
  });
  const expected = { type: 'vimeo', src: 'https://player.vimeo.com/video/123456789?dnt=1&h=a1b2c3d4e5' };
  assert.deepEqual(resolveVideoUrl('https://vimeo.com/123456789/a1b2c3d4e5'), expected);
  assert.deepEqual(resolveVideoUrl('https://player.vimeo.com/video/123456789?h=a1b2c3d4e5&autoplay=1'), expected);
});

test('Direct media handles query strings, case-insensitive extensions, and relative paths', function () {
  assert.deepEqual(resolveVideoUrl('https://cdn.example/film.MP4?token=example'), {
    type: 'video', src: 'https://cdn.example/film.MP4?token=example', mimeType: 'video/mp4'
  });
  assert.deepEqual(resolveVideoUrl('media/chapter.webm', 'https://chapter.example/join.html'), {
    type: 'video', src: 'https://chapter.example/media/chapter.webm', mimeType: 'video/webm'
  });
  assert.deepEqual(resolveVideoUrl('media/chapter.mp4', 'file:///C:/site/join.html'), {
    type: 'video', src: 'file:///C:/site/media/chapter.mp4', mimeType: 'video/mp4'
  });
});

test('Missing, malformed, unsafe, unsupported, and impersonated providers remain placeholders', function () {
  [
    undefined, null, 42, '', '   ', 'VIDEO_URL_HERE', 'not a video',
    'javascript:alert(1)', 'data:video/mp4;base64,AAAA', 'file:///private/film.mp4',
    'ftp://cdn.example/film.mp4', 'https://name:password@cdn.example/film.mp4',
    'https://youtube.com.evil.example/watch?v=aqz-KE-bpKQ',
    'https://www.youtube.com/watch?v=invalid', 'https://youtu.be/invalid',
    'https://www.youtube.com/watch', 'https://vimeo.com/not-a-video',
    'https://vimeo.com/123456789?h=%22%3E%3Cscript%3E',
    'https://example.com/page.html', 'https://example.com/film.mp4.exe',
    'https://[invalid/film.mp4'
  ].forEach(function (url) { assert.equal(resolveVideoUrl(url), null, String(url)); });
});
