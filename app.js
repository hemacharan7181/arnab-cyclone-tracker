(() => {
  const $ = (selector) => document.querySelector(selector);
  const toCartesian = (points, height = 10000) => points.map(([lon, lat]) => Cesium.Cartesian3.fromDegrees(lon, lat, height));
  const line = (points, color, width = 3, dashed = false) => ({
    polyline: { positions: toCartesian(points), width, material: dashed ? new Cesium.PolylineDashMaterialProperty({ color, dashLength: 12 }) : color, clampToGround: false }
  });

  function addSimulation(viewer) {
    const data = ArnabData.simulation;
    const corridor = [...data.corridorLeft, ...[...data.corridorRight].reverse(), data.corridorLeft[0]];
    const entities = {
      observed: viewer.entities.add(line(data.observed, Cesium.Color.fromCssColorString("#62e8f4"), 4)),
      forecast: viewer.entities.add(line(data.forecast, Cesium.Color.fromCssColorString("#9b7dff"), 3, true)),
      corridor: viewer.entities.add({ polygon: { hierarchy: Cesium.Cartesian3.fromDegreesArray(corridor.flat()), material: Cesium.Color.fromCssColorString("#8e6cff").withAlpha(.15), outline: true, outlineColor: Cesium.Color.fromCssColorString("#8e6cff").withAlpha(.55), height: 9000, extrudedHeight: 9200 } }),
      warning: viewer.entities.add({ position: Cesium.Cartesian3.fromDegrees(82.9, 18.7, 12000), point: { pixelSize: 13, color: Cesium.Color.fromCssColorString("#e88cff"), outlineColor: Cesium.Color.WHITE, outlineWidth: 2 }, label: { text: "SIMULATION ONLY", font: "10px DM Mono", fillColor: Cesium.Color.WHITE, pixelOffset: new Cesium.Cartesian2(0, -22), style: Cesium.LabelStyle.FILL } })
    };
    viewer.entities.add({ position: Cesium.Cartesian3.fromDegrees(80.2, 16.3, 0), label: { text: "Bay of Bengal", font: "13px Manrope", fillColor: Cesium.Color.fromCssColorString("#8390b7"), style: Cesium.LabelStyle.FILL, scale: .8 } });
    viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(83.8, 17.6, 1850000), duration: 1.2 });
    return entities;
  }

  function initGlobe() {
    if (!window.Cesium) { $("#cesiumContainer").innerHTML = '<div class="globe-fallback">3D globe unavailable. Check your network connection to load CesiumJS.</div>'; return; }
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, timeline: false, baseLayerPicker: false, geocoder: false, homeButton: false,
      sceneModePicker: false, navigationHelpButton: false, fullscreenButton: false, infoBox: false,
      selectionIndicator: false, terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      imageryProvider: false
    });
    // OSM's public tile endpoint rejects direct app usage. Esri's public
    // World Imagery service is available for this prototype and includes
    // provider attribution through Cesium's credit display.
    const imageryProvider = new Cesium.UrlTemplateImageryProvider({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maximumLevel: 19,
      credit: "Esri World Imagery"
    });
    viewer.imageryLayers.addImageryProvider(imageryProvider);
    window.arnabViewer = viewer;
    viewer.scene.globe.enableLighting = true;
    viewer.camera.setView({
      destination: Cesium.Rectangle.fromDegrees(68, 5, 98, 28)
    });
    viewer.scene.requestRender();
    const entities = addSimulation(viewer);
    document.querySelectorAll(".map-control").forEach((button) => button.addEventListener("click", () => {
      document.querySelectorAll(".map-control").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const layer = button.dataset.layer;
      Object.entries(entities).forEach(([name, entity]) => { entity.show = layer === "all" || layer === name || (layer === "forecast" && name === "corridor") || (layer === "warnings" && name === "warning"); });
    }));
  }

  function init() {
    const now = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date());
    $("#uiTimestamp").textContent = now;
    initGlobe();
  }
  window.addEventListener("load", init);
})();
