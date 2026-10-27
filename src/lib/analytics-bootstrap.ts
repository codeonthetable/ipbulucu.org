// Only a fixed QA flag is retained in this tab. No lookup values or identifiers.
// Kept as one inline script so classification precedes Google's first page view.
export const analyticsBootstrap = String.raw`
(function () {
  if (!['ipbulucu.org', 'www.ipbulucu.org'].includes(location.hostname)) return;
  var qa = false;
  var storageKey = 'ipbulucu.operational-qa';
  function context() {
    if (new URLSearchParams(location.search).get('utm_medium') === 'internal') qa = true;
    try {
      if (sessionStorage.getItem(storageKey) === '1') qa = true;
      if (qa) sessionStorage.setItem(storageKey, '1');
    } catch (_) { /* Memory and the navigation marker also work without storage. */ }
    return qa ? 'operational_qa' : 'unclassified';
  }
  function page() {
    var clean = new URL(location.origin + location.pathname);
    var campaign = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (key) {
      var value = campaign.get(key);
      if (value && /^[a-z0-9_-]{1,64}$/i.test(value)) clean.searchParams.set(key, value);
    });
    // Also preserves the existing tool_success URL exclusion on every event.
    if (context() === 'operational_qa') clean.searchParams.set('utm_medium', 'internal');
    return clean.href;
  }
  window.ipbulucuTelemetry = {context: context, page: page};
  window.dataLayer = window.dataLayer || [];
  function queue() { window.dataLayer.push(arguments); }
  function defaults() { queue('set', {usage_context: context(), page_location: page()}); }
  window.gtag = function (command, name, fields) {
    if (command === 'event') {
      fields = Object.assign({}, fields, {usage_context: context(), page_location: page()});
      queue(command, name, fields);
    } else { queue.apply(null, arguments); }
  };
  function markedUrl(value) {
    if (value == null || context() !== 'operational_qa') return value;
    var url = new URL(value, location.href);
    if (url.origin !== location.origin) return value;
    url.searchParams.set('utm_medium', 'internal');
    return url.href;
  }
  // Keep QA classification through Next navigation, reload and back/forward.
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function (state, unused, url) {
      var result = original.call(this, state, unused, markedUrl(url));
      defaults();
      return result;
    };
  });
  window.addEventListener('popstate', function () {
    if (context() === 'operational_qa') history.replaceState(history.state, '', markedUrl(location.href));
    else defaults();
  });
  // Full document links also carry the fixed marker if browser storage is denied.
  function markLink(event) {
    if (context() !== 'operational_qa') return;
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download')) return;
    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol) || url.pathname.startsWith('/api/') || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    link.href = markedUrl(link.href);
  }
  document.addEventListener('click', markLink, true);
  document.addEventListener('auxclick', markLink, true);
  if (context() === 'operational_qa') history.replaceState(history.state, '', markedUrl(location.href));
  defaults();
  gtag('js', new Date());
  gtag('config', 'G-WYQCJWTWHF', {
    page_referrer: document.referrer.split('?')[0].split('#')[0],
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-WYQCJWTWHF';
  document.head.appendChild(tag);
})();
`;
