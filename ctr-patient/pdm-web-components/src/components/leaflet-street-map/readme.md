# Leaflet Street Map

## Global DOM Properties
- `map-container-id`: div element id where map will be loaded, by default the div id is `leaflet-map`.
  - If there is more than one map on the page the property must be changed
- `map-container-style`: map container div HTML style
  - default: `{ height: 250px; }`
- `data-source`: Array of geographical coordinates markers to be displayed on the map. See`Data Source Marker Options` for details.
  - _example: [ { coord: [51.509865, -0.118092] }, { coord: [-23.533773, -46.625290] }, {...} ]_
- `map-options`:  [Leaflet map state options](https://leafletjs.com/reference-1.7.1.html#map-factory)
  - values set by default:
    - center
    - zoom
- `layer-options`:  [Leaflet tile layer options](https://leafletjs.com/reference-1.7.1.html#tilelayer)
  - values set by default:
    - url: open street map layer
    - attribution: leaflet  & open street map
- `popup-options'`:  [Leaflet popup options](https://leafletjs.com/reference-1.7.1.html#popup-option)
  - To set a custom __popup__ for each marker see `Data Source Marker Options`
- `icon-options`: [Leaflet icon options](https://leafletjs.com/reference-1.7.1.html#icon-option)
  - To set a custom __icon__ for each marker see `Data Source Marker Options`
- `marker-options`:  [Leaflet marker options](https://leafletjs.com/reference-1.7.1.html#marker-option)
- `custom-options`: Custom properties to control map functionalities and methods. Only available properties are:
  - __showPopup__: Show popup on marker click event
    - `default: false`
  - __showPopupOnHover__:  Show popup on mouse hover instead mouse click event
    - `default: false`
  - __enableClustering__: Enable [clustering functionality](https://github.com/Leaflet/Leaflet.markercluster) on map markers
    - `default: true`
  - __fitBounds__:  Set the map view to contain the geographical  markers with the maximum zoom level possible.
    - `default: true`

## Data Source Marker Options
- __coord__: Representation of geographical point with  latitude and longitude as _Leaflet_ `LatLngExpression`:
  - __LatLng__: `{ lat: number, lng: number }`
  - __LatLngLiteral__: `'{ lat: number, lng: number; }'`
  - __LatLngTuple__: `[number, number]`
- __popupContent__ < optional >: Sets the HTML content of the popup
  - showPopup on global custom options need to be `true`
- __popupOptions__ < optional >: [Leaflet popup options](https://leafletjs.com/reference-1.7.1.html#popup-option).
  - Overwrites/merged the global `popup-options`
- __iconOptions__ < optional >: [Leaflet icon options](https://leafletjs.com/reference-1.7.1.html#icon-option).
  - Overwrites/merged the global `icon-options`

## ![alt text](assets/leaflet/marker-icon.png)  Default Marker Icon

Changeable in `./assets/leaflet` folder

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description | Type     | Default         |
| ------------------ | --------------------- | ----------- | -------- | --------------- |
| `containerId`      | `map-container-id`    |             | `string` | `'leaflet-map'` |
| `containerStyle`   | `map-container-style` |             | `string` | `undefined`     |
| `customOptions`    | `custom-options`      |             | `string` | `undefined`     |
| `dataSource`       | `data-source`         |             | `string` | `undefined`     |
| `iconOptions`      | `icon-options`        |             | `string` | `undefined`     |
| `mapOptions`       | `map-options`         |             | `string` | `undefined`     |
| `markerOptions`    | `marker-options`      |             | `string` | `undefined`     |
| `popupOptions`     | `popup-options`       |             | `string` | `undefined`     |
| `tileLayerOptions` | `tile-layer-options`  |             | `string` | `undefined`     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
