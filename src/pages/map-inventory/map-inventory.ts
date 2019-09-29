import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ToastController, AlertController } from 'ionic-angular';
import { Properties } from '../../providers';
import { PopoverController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
declare var H: any;

declare var MarkerCluster: any;
declare var MarkerClusterer: any;


@IonicPage()
@Component({
   selector: 'page-map-inventory',
  templateUrl: 'map-inventory.html',
})
export class MapInventoryPage {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId = 'uYrt36TOhwviFRYoJgXV';

  @Input()
  public appCode = 'dfsfKzKlWfZg4tyBGmPeQQ';

  public userPos : any ;

  public userMark : any;
  public userMarkCors: any;


  public hiddenRoutes = '';


  public routeMark: any;
  public routeMarkCors: any;
  public platformMap : any ;

  public seccion = 1;
  public routing = "fastest;car";


  /**------------------------ */
  public map: any; 
  public cluster : any ;
  public mapstyle =[{
                    featureType : "poi.business",
                    elementType : "labels",
                    stylers     : [{ visibility: "off" }]
                  }];


  /** Configuracion del mapa*/
  public mapProp: any; 

  /** Indicaciones de navegacion hacia una direccion*/
  public item: any;  

  /** Contiene el texto a buscar y guarda ultimo texto buscado */
  private textSearchbar: { currentSearch: string, lastSearch: string } = { currentSearch: '', lastSearch :''}

  /** Clase autocompletar de google */
  private googleAutocomplete: any;  

  /** Elemento input searchbar */
  private inputSearch: any;  
  
  public typeSearch :any ;

  /** Atributos del autocompletar */
  private optionsAc = { componentRestrictions: { country: "mx" } };                       


  constructor(private geolocation: Geolocation,public alertCtrl : AlertController, public menu: MenuController, public popoverController: PopoverController, public SplashScreen: SplashScreen,  public properties : Properties, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {

  }

  center(){
    this.map.setCenter(this.userPos);
  }

  ionViewWillEnter() {
    this.setMarkersv2();
  }

  ionViewDidLoad() {
    this.menu.enable(true);

    /**Inicialica el mapa en la pagina. */
    this.loadMap();
  }
 
  updateMarks(seccion){


    this.hiddenRoutes = '';
    this.map.removeObjects(this.map.getObjects());

    let icon = new H.map.Icon('assets/icon/location2.png'), coords = this.userMarkCors;

    this.userMark = new H.map.Marker(coords, { icon: icon });
    this.userMark.id = 'user_location';
    this.map.addObject(this.userMark);


    this.setMarkersv2();
   


}

  loadMap() {
    //var mapEle: HTMLElement = document.getElementById('mapa2');    
    //this.map = new google.maps.Map(mapEle, this.mapProp);

    this.platformMap = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });


    //Configura la plataforma
    var defaultLayers = this.platformMap.createDefaultLayers();

    //let ui = H.ui.UI.createDefault(this.map, defaultLayers);
    var $this = this;

    this.geolocation.getCurrentPosition().then((resp) => {

      $this.map = new H.Map(
        document.getElementById('mapa'),
        defaultLayers.normal.map,
        {
          zoom: 10,
          center: { lat: resp.coords.latitude, lng: resp.coords.longitude }
        }
      );

      //$this.map.addLayer(defaultLayers.normal.trafficincidents);

      let icon = new H.map.Icon('assets/icon/location2.png'), coords = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      $this.userMark = new H.map.Marker(coords, { icon: icon });
      $this.userMark.id = 'user_location';
      $this.userMarkCors = coords;
      $this.map.addObject($this.userMark);

      $this.map.addEventListener('longpress', function (evt) {

        var coord = $this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);



        // Log 'tap' and 'mouse' events:

        let icon = new H.map.Icon('assets/icon/location.png'), coords = { lat: Math.abs(coord.lat.toFixed(4)), lng: (-(Math.abs(coord.lng.toFixed(4))))};
        $this.routeMark = new H.map.Marker(coords, { icon: icon });
        $this.routeMark.id = 'location';
        $this.routeMarkCors = coords;

        $this.map.getObjects().forEach(element => {

          if (element.id === 'location') {
            $this.map.removeObject(element);
          }
        });


        $this.map.getObjects().forEach(element => {

          if (element.id === 'route') {
            $this.map.removeObject(element);
          }
        });


        $this.map.addObject($this.routeMark);
        $this.route($this.routeMarkCors);
      });









      $this.userPos = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents($this.map));

    }).catch((error) => {
    });


    //this.autocompleteInit();


  }


  setMarkersv2(){

    var properties : any ;

    if(this.seccion == 1){
    properties = this.properties.seccion_1;

    }else if(this.seccion == 2){
      properties = this.properties.seccion_2;

    } else if (this.seccion == 3) {
      properties = this.properties.seccion_3;

    }else if(this.seccion == 4){
      properties = this.properties.seccion_4;

    } else if (this.seccion == 5) {
      properties = this.properties.seccion_5;

    }


    var markers: any = [];
    var $this = this;

    for (var i = 0; i < properties.length; i++) {

      console.log('ocultando rutas');
      console.log(properties[i]['mark'].getPosition().lat + ',' + properties[i]['mark'].getPosition().lng);

      this.hiddenRoute(properties[i]['mark'].getPosition().lat + ',' + properties[i]['mark'].getPosition().lng)
       
    

      var marker = properties[i]['mark'];

      markers.push(marker);                                            
      $this.map.addObject(marker);
    }


  }
    
  updateRouting(){
    var $this = this;
    
    this.map.getObjects().forEach(element => {
      if (element.id === 'route') {
        $this.map.removeObject(element);
      }
    });

    this.route(this.routeMarkCors);
  }

  route(waypoint) {

    var cor = waypoint.lat + ',' + waypoint.lng; 

    var $this = this;

    var onResult = function (result) {

      var route,        routeShape,        startPoint,        endPoint,        linestring;
      if (result.response.route) {

        route       = result.response.route[0];
        routeShape  = route.shape;
        linestring = new H.geo.LineString();
        linestring.id = 'route';

        routeShape.forEach(function (point) {
          var parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        var routeLine = new H.map.Polyline(linestring, {
          style: { lineWidth: 4 }
        });
        routeLine.setArrows({ fillColor: 'white', frequency: 5, width: 1, length: 1 });
        routeLine.id = 'route';
        //$this.removeObjectById();

        // crea marcadores y los agrega
        // Add the route polyline and the two markers to the map:

        $this.map.addObjects([routeLine]);

        // Set the map's viewport to make the whole route visible:
        $this.map.setViewBounds(routeLine.getBounds());
      }
    };


    // Get an instance of the routing service:
    var router = this.platformMap.getRoutingService();



    var routingParameters = {
      'mode': this.routing,
      'waypoint0': 'geo!' + this.userPos.lat + ',' + this.userPos.lng,
      'waypoint1': 'geo!' + cor,
      'avoidlinks': this.hiddenRoutes,
      'representation': 'display'
    };
    console.log(routingParameters);
    router.calculateRoute(routingParameters, onResult,
      function (error) {
        alert(error.message);
      });
  }








  hiddenRoute(waypoint) {
 
    var routingParameters2 = {
      'mode': this.routing,
      'waypoint0': 'geo!' + waypoint,
      'waypoint1': 'geo!'+ waypoint,
      'representation': 'display'
    };

 
    var $this = this;

    var onResult2 = function (result) {

      if ($this.hiddenRoutes == '') {
        $this.hiddenRoutes = result.response.route[0].waypoint[0].linkId
      } else {
        $this.hiddenRoutes = $this.hiddenRoutes  + ',' + result.response.route[0].waypoint[0].linkId;

      }
      console.log($this.hiddenRoutes)
    };


    // Get an instance of the routing service:
    var router = this.platformMap.getRoutingService();
    console.log('calculando rutas', routingParameters2);
    router.calculateRoute(routingParameters2, onResult2,
      function (error) {
        alert(error.message);
      });

  }

}