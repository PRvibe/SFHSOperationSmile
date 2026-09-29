/* The connector follows the dedicated empty lane between milestone columns.
   All milestone text remains available if JavaScript is disabled. */
(() => {
  'use strict';

  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  const svg = timeline.querySelector('.timeline-connector');
  const path = timeline.querySelector('.timeline-connector__path');
  const markers = Array.from(timeline.querySelectorAll('.milestone-marker'));
  if (!svg || !path || !markers.length) return;

  let scheduledFrame = 0;

  const drawConnector = () => {
    scheduledFrame = 0;
    const bounds = timeline.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const mobile = window.matchMedia('(max-width: 680px)').matches;
    // Batch all layout reads before writing SVG attributes. Markers never animate.
    const points = markers.map((marker) => {
      const rect = marker.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - bounds.left,
        y: rect.top + rect.height / 2 - bounds.top,
      };
    });

    const first = points[0];
    let d = `M ${first.x} ${Math.max(0, first.y - 35)} L ${first.x} ${first.y}`;
    points.slice(1).forEach((point, index) => {
      const previous = points[index];
      const distance = point.y - previous.y;
      // Desktop marker positions alternate across the empty lane, producing
      // a clear S curve without allowing any control point outside that lane.
      // Mobile markers share a gutter, so add only a small sideways wave.
      const bend = mobile ? 9 * (index % 2 === 0 ? 1 : -1) : 0;
      d += ` C ${previous.x + bend} ${previous.y + distance * 0.5},`;
      d += ` ${point.x - bend} ${previous.y + distance * 0.5}, ${point.x} ${point.y}`;
    });
    const last = points[points.length - 1];
    d += ` L ${last.x} ${Math.min(bounds.height, last.y + 35)}`;

    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    path.setAttribute('d', d);
  };

  const scheduleDraw = () => {
    if (!scheduledFrame) scheduledFrame = window.requestAnimationFrame(drawConnector);
  };

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(timeline);
    timeline.querySelectorAll('.milestone').forEach((milestone) => observer.observe(milestone));
  }

  window.addEventListener('resize', scheduleDraw, { passive: true });
  window.addEventListener('load', scheduleDraw, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleDraw);
  scheduleDraw();
})();
