import {Component, Host, h, Prop, Watch, State, getAssetPath} from '@stencil/core';
import * as L from 'leaflet'
import {
  IconOptions,
  LatLngExpression, LayerOptions,
  Map,
  MapOptions,
  MarkerOptions,
  PopupOptions,
} from 'leaflet';
import 'leaflet.markercluster';

@Component({
  tag: 'leaflet-street-map',
  styleUrl: 'leaflet-street-map.css',
  shadow: false,
  assetsDirs: ['assets']
})
export class LeafletStreetMap {
  private map;
  private parse = (value: any) => JSON.parse(value);

  @Prop({attribute: 'map-container-id'}) containerId: string = 'leaflet-map';
  @Prop({attribute: 'map-container-style', mutable: true}) containerStyle: string;

  // object attributes need to be passed by serialization
  @Prop({attribute: 'data-source'}) dataSource: string;
  @Prop({attribute: 'map-options'}) mapOptions: string;
  @Prop({attribute: 'tile-layer-options'}) tileLayerOptions: string;
  @Prop({attribute: 'popup-options'}) popupOptions: string;
  @Prop({attribute: 'icon-options'}) iconOptions: string;
  @Prop({attribute: 'marker-options'}) markerOptions: string;
  @Prop({attribute: 'custom-options'}) customOptions: string;

  @State() _provider: Provider = {
    containerStyle: {
      height: '250px'
    },
    dataSource: [
      {coord: [0, 0]}
    ],
    mapOptions: {
      center: [0, 0],
      zoom: 5,
    },
    tileLayerOptions: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    popupOptions: {},
    iconOptions: {
      iconUrl: getAssetPath('./assets/leaflet/marker-icon.png'),
      shadowUrl: getAssetPath('./assets/leaflet/marker-shadow.png'),
      iconAnchor: [12.5, 41]
    },
    markerOptions: {},
    customOptions: {
      showPopup: false,
      showPopupOnHover: false,
      enableClustering: true,
      fitBounds: true
    }
  };

  @Watch('containerStyle')
  watchContainerStyle(newValue: any) {
    this._provider.containerStyle = Object.assign(this._provider.containerStyle, this.parse(newValue));
    console.log('$leaflet-street-map.watchContainerStyle containerStyle=', this._provider.containerStyle);
  }

  @Watch('dataSource')
  watchDataSource(newValue: any) {
    this._provider.dataSource = this.parse(newValue);
    console.log('$leaflet-street-map.watchDataSource dataSource=', this._provider.dataSource);
  }

  @Watch('mapOptions')
  watchMapOptions(newValue: any) {
    this._provider.mapOptions = Object.assign(this._provider.mapOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchMapOptions mapOptions=', this._provider.mapOptions);
  }

  @Watch('tileLayerOptions')
  watchTileLayerOptions(newValue: any) {
    this._provider.tileLayerOptions = Object.assign(this._provider.tileLayerOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchTileLayerOptions tileLayerOptions=', this._provider.tileLayerOptions);
  }

  @Watch('popupOptions')
  watchPopupOptions(newValue: any) {
    this._provider.popupOptions = Object.assign(this._provider.popupOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchPopupOptions popupOptions=', this._provider.popupOptions);
  }

  @Watch('iconOptions')
  watchIconOptions(newValue: any) {
    this._provider.iconOptions = Object.assign(this._provider.iconOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchIconOptions iconOptions=', this._provider.iconOptions);
  }

  @Watch('markerOptions')
  watchMarkerOptions(newValue: any) {
    this._provider.markerOptions = Object.assign(this._provider.markerOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchMarkerOptions customOptions=', this._provider.markerOptions);
  }

  @Watch('customOptions')
  watchCustomOptions(newValue: any) {
    this._provider.customOptions = Object.assign(this._provider.customOptions, this.parse(newValue));
    console.log('$leaflet-street-map.watchCustomOptions customOptions=', this._provider.customOptions);
  }

  private buildMap(mapOptions: MapOptions, tileLayerOptions: TileLayerOptions): Map {
    const {url, ...layerOptions} = tileLayerOptions;
    const tileLayer = L.tileLayer(url, layerOptions);
    const map = L.map(this.containerId, mapOptions);
    tileLayer.addTo(map);
    return map;
  };

  private buildMarker(coordMarker: CoordMarker, markerOptions: MarkerOptions = {}, _popupOptions: PopupOptions = {}) {
    const marker = L.marker(coordMarker.coord, markerOptions);
    const domPopup = document.getElementsByClassName('leaflet-popup');
    let popupHover = false;

    if (this._provider.customOptions.showPopup) {
      const popupContent = coordMarker.popupContent || '';
      const popup = L.popup().setContent(popupContent);
      const popupOptions = Object.assign(_popupOptions, coordMarker.popupOptions);
      marker.bindPopup(popup, popupOptions);

      if (this._provider.customOptions.showPopupOnHover) {
        const addListener = (): void => {
          if (domPopup.length > 0) {
            const target = domPopup[0];
            target.addEventListener('mouseover', () => {
              popupHover = true;
            }, false);

            target.addEventListener('mouseleave', () => {
              popupHover = false;
              marker.closePopup();
            }, false);
          }
        };
        marker.on('mouseover', (_) => {
          marker.openPopup();
          addListener();
        });

        marker.on('mouseout', (_) => {
          new Promise(r => setTimeout(r, 250)).then(() => {
            if (!popupHover) {
              marker.closePopup();
            }
          });
        });
      }
    }

    return marker;
  }

  /** Reset map to be render again */
  resetMap(map: Map): void {
    if (!!map) {
      try {
        map.off();
        map.remove();
      } catch (e) {
        console.log('$leaflet-street-map.resetMap error=', e);
      }
    }
  }

  componentWillLoad() {
    console.log('$leaflet-street-map.componentWillLoad provider=', this._provider);
    console.log('$leaflet-street-map.componentWillLoad #mapId=', this.containerId);
  }

  componentDidRender() {
    this.resetMap(this.map);
    this.map = this.buildMap(this._provider.mapOptions, this._provider.tileLayerOptions);
    const markers = L.featureGroup();

    this._provider.dataSource.forEach((coordMarker) => {
      const iconOptions = Object.assign(this._provider.iconOptions, coordMarker.iconOptions)
      const icon = new L.Icon(iconOptions);
      const markerOptions = Object.assign(this._provider.markerOptions, {icon: icon})
      const marker = this.buildMarker(coordMarker, markerOptions, this._provider.popupOptions);
      marker.addTo(markers);
    });

    if (this._provider.customOptions.enableClustering) {
      const clusteringMarkersLayer = L.markerClusterGroup({
        chunkedLoading: true,
        disableClusteringAtZoom: 18,
        spiderfyOnMaxZoom: true
      });
      clusteringMarkersLayer.addLayer(markers);
      clusteringMarkersLayer.addTo(this.map);
    } else {
      markers.addTo(this.map);
    }

    if (this._provider.customOptions.fitBounds && !!this._provider.dataSource?.length) {
      try {
        this.map.fitBounds(markers.getBounds());
      } catch (e) {
        console.log('$leaflet-street-map.fitBounds error=', e, ' _provider.dataSource=', this._provider.dataSource);
      }
    }
  }

  render() {
    console.log('$leaflet-street-map.render()');
    if (!!this.map) {
      // force to solve map rendering issue
      this.map.invalidateSize();
    }

    return (
      <Host>
        <div id={this.containerId}
             style={this._provider.containerStyle}>
        </div>
      </Host>
    );
  }
}

export interface CoordMarker {
  coord: LatLngExpression;
  popupContent?: string;
  popupOptions?: PopupOptions;
  iconOptions?: IconOptions;
}

export interface TileLayerOptions extends LayerOptions {
  url: string;
}

export interface CustomOptions {
  showPopup: boolean;
  showPopupOnHover: boolean;
  enableClustering: boolean;
  fitBounds: boolean;
}

export interface Provider {
  containerStyle: { [key: string]: string },
  dataSource: CoordMarker[];
  mapOptions: MapOptions;
  tileLayerOptions: TileLayerOptions;
  popupOptions: PopupOptions;
  iconOptions: IconOptions;
  markerOptions: MarkerOptions;
  customOptions: CustomOptions;
}
