/**
 * Data boundary for ARNAB.
 *
 * This module intentionally contains no live values. Production data must be
 * fetched by a trusted server-side adapter after official access is approved.
 * Never put IMD API keys or JWTs in this browser bundle or a public repository.
 */
const ArnabData = Object.freeze({
  mode: "DEMO",
  liveFeedConnected: false,
  lastUpdated: null,
  sources: {
    imd: "https://mausam.imd.gov.in/",
    imdApi: "https://api.imd.gov.in/public/index.php",
    apsdma: "https://apsdma.ap.gov.in/",
    apsdmaCyclone: "https://apsdmagis.ap.gov.in/weather-watch/cyclone.html"
  },
  simulation: {
    // Illustrative geometry only; these points are not a storm observation.
    observed: [[88.8, 15.1], [87.7, 15.8], [86.4, 16.4], [85.2, 17.1]],
    forecast: [[85.2, 17.1], [84.0, 17.8], [82.9, 18.7], [81.7, 19.8]],
    corridorLeft: [[85.2, 17.1], [84.0, 18.5], [82.9, 19.6], [81.7, 20.7]],
    corridorRight: [[85.2, 17.1], [84.2, 17.1], [83.0, 17.8], [81.7, 18.9]]
  }
});
