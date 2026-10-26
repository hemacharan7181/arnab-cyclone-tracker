# ARNAB

**3D cyclone tracking, live weather alerts and public safety — visual briefing prototype**

ARNAB is a static, GitHub Pages-friendly interface for exploring how verified cyclone observations, forecasts and public-safety guidance could be presented clearly. It is **not an official government website**, and the initial build is intentionally labelled **DEMO DATA / LIVE FEED NOT CONNECTED**.

## Run locally

No build step or package manager is required:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). A local HTTP server is recommended because browsers may block map resources when opening `index.html` directly. The page loads CesiumJS and OpenStreetMap imagery from their public CDNs, so an internet connection is needed for the 3D globe.

## What is included

- Responsive dark navy dashboard with accessible labels, visible timestamps and mobile layouts.
- CesiumJS 3D globe centred on India and the Bay of Bengal, using Esri World Imagery as the base layer.
- Visually distinct simulated observed/forecast tracks, uncertainty corridor and warning marker.
- Clear empty states for bulletins and unavailable live values rather than fabricated coordinates, intensity or warnings.
- Official source links for the India Meteorological Department (IMD), APSDMA and its cyclone GIS view.
- A data boundary in `data-service.js` that keeps the browser UI separate from future verified ingestion.

The map lines and marker are illustrative geometry to exercise the UI. They are **not satellite imagery, an observation, an official forecast, or an active warning**.

## Verified data connection: remaining work

1. Apply for access through the [IMD API Management Portal](https://api.imd.gov.in/public/index.php) and review the [API reference](https://api.imd.gov.in/public/api_reference.html). The portal requires account approval and authenticated API keys/JWTs; production access can require a registered static server IP.
2. Do not put IMD API keys, JWTs or other credentials in this public GitHub Pages repository. Add a small trusted server/edge proxy to authenticate requests, validate schemas and apply rate limits.
3. Confirm permitted use, update frequency, attribution and retention requirements with IMD. Map APSDMA district alerts through its official [Weather Watch cyclone portal](https://apsdmagis.ap.gov.in/weather-watch/cyclone.html).
4. Define a normalized payload for observed fixes, forecast points, uncertainty polygons, bulletin metadata, source URLs and `issuedAt` timestamps. Render only validated records and preserve the source timestamp on every card.
5. Add resilient loading, stale-data and API-error states, plus automated tests for coordinate order, units, timestamps and warning severity.
6. Conduct a content and accessibility review with disaster-management stakeholders before publishing safety guidance. Keep authoritative evacuation instructions on the official channels.

## Hosting

This is plain HTML/CSS/JavaScript and can be deployed from the repository root with GitHub Pages. CesiumJS is loaded from cdnjs and the globe uses Esri's public World Imagery MapServer endpoint. The original OpenStreetMap tile endpoint was removed because it returned an access-denied response under the OpenStreetMap tile usage policy in the target browser environment. Review the [Esri terms](https://www.esri.com/en-us/legal/terms/full-master-agreement) and [World Imagery service terms](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08f5b1c6f7) before production use. The project is a public-information visualization aid, not a replacement for official warnings.
