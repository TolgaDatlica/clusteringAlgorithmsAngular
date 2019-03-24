
import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { MainPageService } from './mainpage.service';
import { NgForm } from '@angular/forms';
import Map from 'ol/Map';
import Vector from 'ol/source/Vector';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import * as tilegrid from 'ol/tilegrid';
import Overlay from 'ol/Overlay';
import * as proj from 'ol/proj';
import * as interaction from 'ol/interaction';
import * as control from 'ol/control';
import * as layer from 'ol/layer';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import * as style from 'ol/style';
import * as geom from 'ol/geom';
import { toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
@Component({
  selector: 'mainpage',
  styleUrls: ['mainpage.component.scss'],
  templateUrl: './mainpage.component.html',
})
export class MainPageComponent implements OnInit, AfterViewInit {
  public graph = {
    data: [],
    layout: { width: 600, height: 700, title: 'Graph' }
  };
  a = []; b = []; c = [];
  d = []; e = []; g = [];
  // Map initliaze kullanılanlar
  view = new View({});
  map = new Map({});
  popup = new Overlay({});
  element: any;
  public markerIndex = 0;
  container: any;
  content: any;
  closer: any;
  mapSetting: any;
  private nativeElement: Node;
  mapHybridControl = new control.Control({});
  selectedMapType: number;
  buttonHybrid: any;
  googleMap: any;
  /*
  * Harita üzerinde ki iconlar için katman
  */
  vectorSource = new Vector({});
  terminalLayer: any = new layer.Vector({
    source: this.vectorSource,
    visible: true,
    zIndex: 101
  });
  @ViewChild('f') f: NgForm;
  model: any = {
    textjson: 'giriniz'
  };
  wifilist = [];
  constructor(private mainPageService: MainPageService, private renderer: Renderer2, private elementRef: ElementRef,
    private sampleService: MainPageService) {
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.model.textjson = JSON.stringify(this.sampleService.sampleData1);
    setTimeout(() => {
      this.googleMap = new TileLayer({
        source: new XYZ({
          url: 'http://mt{0-3}.google.com/vt/lyrs=m@355000000&hl=tr&x={x}&s=&y={y}&z={z}',
          projection: 'EPSG:3395',
          tileGrid: tilegrid.createXYZ({
            extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
          })
        }),
        visible: true,
      });
      if (!this.mapSetting) {
        this.mapSetting = JSON.parse('{"Latitude":39.875618, "Longitude":32.814320, "Zoom":13, "MapType":1}');
      }

    }, 1000);


  }
  submit() {
    try {
      this.wifilist = [];
      const parsedJSON = JSON.parse(this.model.textjson);
      let counter = 1;
      const lengtAll = parsedJSON.WIFI.length;
      if (lengtAll === 0) {
        alert('En az 1 wifi bilgisi bulunmalıdır.');
        return;
      }
      parsedJSON.WIFI.forEach(element => {
        this.mainPageService.getWifiResult(element.MAC).subscribe(res => {
          if (res.result === 200) {
            this.wifilist.push({
              lat: res.data.lat,
              lon: res.data.lon,
              mac: element.MAC,
              cluster: '',
              clusterNumber: Math.floor(Math.random() * 1000) + 100
            });
          } else {
            this.model.textjson += '<br/>' + ' hata';
            this.wifilist.push({
              lat: 0,
              lon: 0,
              mac: element.MAC + ' (HATA)',
              cluster: '',
              clusterNumber: Math.floor(Math.random() * 1000) + 100
            });
          }
          if (counter === lengtAll) {
            this.map = null;
            this.updatemap();
            this.graphCreate();
          }
          counter++;
        },
          err => {
            console.error(err);
            if (counter === lengtAll) {
              this.map = null;
              this.updatemap();
              this.graphCreate();
            }
            counter++;
          });
      });
    } catch (error) {
      alert(error);
    }
  }
  updatemap() {
    if (!this.wifilist) {
      alert('Henüz gösterilecek veri girilmedi');
      return;
    }
    setTimeout(() => {
      document.getElementById('map2').remove();
      const divMap = this.renderer.createElement('div');
      this.renderer.setStyle(divMap, 'display', 'block');
      this.renderer.setStyle(divMap, 'height', '100%');
      this.renderer.setAttribute(divMap, 'id', 'map2');
      document.getElementById('mapwrapper').appendChild(divMap);
      document.getElementById('map2').style.height =
        document.getElementsByTagName('html')[0].clientHeight + 'px';
      this.initMap();
      // document.getElementById('map').style.height =
      //   document.getElementsByTagName('html')[0].clientHeight - document.getElementsByTagName('header')[0].clientHeight + 'px';
      this.map.updateSize();
    }, 1000);
  }
  initMap() {
    this.view = new View({
      center: proj.fromLonLat([this.mapSetting.Longitude, this.mapSetting.Latitude]),
      zoom: this.mapSetting.Zoom,
      minZoom: 3,
      maxZoom: 20
    });

    this.popup = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.nativeElement = this.elementRef.nativeElement;

    const divMapTypes = this.renderer.createElement('div');
    this.buttonHybrid = this.renderer.createElement('button');
    // this.buttonHybrid.addEventListener('click', this.changeMapType.bind(this));
    divMapTypes.className = 'earth-map ol-unselectable ol-control';
    const textMap = this.renderer.createText('H');
    this.renderer.appendChild(this.buttonHybrid, textMap);
    this.renderer.appendChild(divMapTypes, this.buttonHybrid);
    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, divMapTypes, this.elementRef.nativeElement.nextSibling);
    this.mapHybridControl.element = divMapTypes;
    this.map = new Map({
      /*Simülasyon için VectorLayer eklendi*/
      layers: [
        this.googleMap,
        this.terminalLayer,
      ],
      interactions: interaction.defaults({
        dragPan: false,
        mouseWheelZoom: false
      }).extend([
        new interaction.DragPan({ kinetic: false }),
        new interaction.MouseWheelZoom({ duration: 0 })
      ]),
      loadTilesWhileAnimating: true,
      target: 'map2',
      controls: control.defaults({
        attributionOptions: ({
          collapsible: false,
        })
      }).extend([this.mapHybridControl]),
      view: this.view
    });
    if (this.wifilist.length > 0) {
      this.wifilist.forEach(d => {
        this.addMarkerWithHeading(d);
      });
    }
    this.focusToGroup(this.wifilist);
  }
  addMarkerWithHeading(terminal: any) {
    if (terminal) {
      const detail = terminal;
      const circleOfTerminal = new geom.Circle(
        proj.transform([detail.lon, detail.lat], 'EPSG:4326', 'EPSG:3857'),
        detail.LBSError
      );
      /** */
      const feature = new Feature({
        geometry: circleOfTerminal,
        point: new geom.Point(proj.transform([detail.lon, detail.lat], 'EPSG:4326', 'EPSG:3857')),
        name: 'kutu',
        Id: detail.mac,
        zIndex: 1
      });
      const color = '100,229,255';
      // if (detail.LocationSource === 1) {
      //   color = '255,255,100';
      // }
      const imageObject = new style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.9,
        rotateWithView: true,
        // rotation: terminal.Heading * Math.PI / 180,
        src: this.mainPageService.getColorIcon(terminal.clusterNumber).Icon,
        scale: 0.7,
        snapToPixel: false,
        zIndex: 11
      });
      const circle = '●';
      const tName = terminal.mac + ' (' + terminal.clusterNumber + ')';
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '11px roboto,sans-serif';
      const width1 = context.measureText(circle).width;
      const iconStyle = [
        new style.Style({ // araba iconları
          geometry: 'point',
          image: imageObject,
          zIndex: 13,
          text: new style.Text({ // araç plakasını yazdırmak için
            text: tName,
            textAlign: 'center',
            font: '11px roboto,sans-serif',
            fill: new style.Fill({
              color: 'white'
            }),
            stroke: new style.Stroke({
              color: 'black',
              lineCap: 'butt',
              width: 4
            }),
            offsetX: width1 / 2,
            offsetY: 25.5,
          })
        }),
        new style.Style({
          zIndex: 1,
          fill: new style.Fill({
            color: 'rgba(' + color + ',0.2)',
          }),
          stroke: new style.Stroke({
            color: 'rgba(' + color + ',0.8)',
            width: 2
          })
        }),
        new style.Style({
          zIndex: 1,
          geometry: 'point',
          image: new style.Circle({
            radius: 35,
            fill: new style.Fill({
              color: 'rgba(255,255,100,0.01)',
            }),
            stroke: new style.Stroke({
              color: 'rgba(255,255,100,0.01)',
              width: 2
            })
          })
        })
      ];
      feature.setStyle(iconStyle);
      feature.setId(terminal.mac);
      this.vectorSource.addFeature(feature);
    }
  }
  focusToGroup(group) {
    let coordinates: {
      lat: number,
      lon: number,
      count: number,
      minLat: number,
      maxLat: number,
      minLon: number,
      maxLon: number
    } = {
      lat: 0,
      lon: 0,
      count: 0,
      minLat: 90,
      maxLat: -90,
      minLon: 180,
      maxLon: -180
    };
    coordinates = group.reduce((coordinateSum, item) => {
      const terminal = item;
      if (terminal.lat && terminal.lon && !isNaN(terminal.lat) && !isNaN(terminal.lon)) {
        coordinateSum.lat += terminal.lat;
        coordinateSum.lon += terminal.lon;
        if (coordinateSum.minLat > terminal.lat) {
          coordinateSum.minLat = terminal.lat;
        }
        if (coordinateSum.maxLat < terminal.lat) {
          coordinateSum.maxLat = terminal.lat;
        }
        if (coordinateSum.minLon > terminal.lon) {
          coordinateSum.minLon = terminal.lon;
        }
        if (coordinateSum.maxLon < terminal.lon) {
          coordinateSum.maxLon = terminal.lon;
        }
        coordinateSum.count++;
      }
      return coordinateSum;
    }, coordinates);

    coordinates.lat /= coordinates.count;
    coordinates.lon /= coordinates.count;

    const location = proj.transform([coordinates.lon, coordinates.lat], 'EPSG:4326', 'EPSG:3857');
    const min = proj.transform([coordinates.minLon, coordinates.minLat], 'EPSG:4326', 'EPSG:3857');
    const max = proj.transform([coordinates.maxLon, coordinates.maxLat], 'EPSG:4326', 'EPSG:3857');

    this.view.setCenter(location);
    this.view.fit([min[0], min[1], max[0], max[1]]);
  }
  sampledatacontent(datanumber) {
    if (datanumber === 1) {
      this.model.textjson = JSON.stringify(this.sampleService.sampleData1);
    } else if (datanumber === 2) {
      this.model.textjson = JSON.stringify(this.sampleService.sampleData2);
    } else if (datanumber === 3) {
      this.model.textjson = JSON.stringify(this.sampleService.sampleData3);
    } else if (datanumber === 4) {
      this.model.textjson = JSON.stringify(this.sampleService.sampleData4);
    } else if (datanumber === 5) {
      this.model.textjson = JSON.stringify(this.sampleService.sampleData5);
    }
  }
  graphCreate() {
    const usedElements = [];
    this.wifilist.forEach(element => {
      if (usedElements.filter(x => x.name == element.clusterNumber).length > 0) {
        const findedElement = usedElements.filter(x => x.name == element.clusterNumber)[0];
        findedElement.x.push(element.lat);
        findedElement.y.push(element.lon);
        findedElement.text.push(element.mac);
      } else {
        usedElements.push(
          {
            x: [element.lat],
            y: [element.lon],
            mode: 'markers+text',
            type: 'scatter',
            name: element.clusterNumber,
            text: [element.mac],
            textposition: 'top center',
            textfont: {
              family: 'Raleway, sans-serif'
            },
            marker: { size: 12 }
          }
        );
      }
    });
    var sampledata = usedElements;
    this.graph.data = sampledata;
  }
}


