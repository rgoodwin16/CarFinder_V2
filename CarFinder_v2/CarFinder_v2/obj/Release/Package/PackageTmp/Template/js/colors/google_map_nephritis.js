/*-----------------------------------------------------------------------------------------------
Project:  Mos7 - Responsive Bootstrap 3 App Landing Page Template
Version:  1.5.2
Last change:  25/06/2015
Design by:  TemplatesPRO.com.br
-----------------------------------------------------------------------------------------------*/

$(document).ready(function () {
  "use strict";

  /***********************************************************************************************
   Component Contact - Google Maps
   ***********************************************************************************************/
  var map;
  var my_location = new google.maps.LatLng(40.7419614, -74.004624);  // Your location here (latitude/longitude)
  var my_maptype_id = 'custom_style';

  function initialize() {
    var featureOpts = [
      {
        stylers: [
          { hue: '#27ae60' },
          { visibility: 'on' },
          { gamma: 0.5 },
          { weight: 0.5 }
        ]
      },
      {
        featureType: 'water',
        stylers: [
          { color: '#27ae60' }
        ]
      }
    ];

    var mapOptions = {
      zoom: 13,
      center: my_location,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, my_maptype_id]
      },
      mapTypeId: my_maptype_id
    };

    var marker = new google.maps.Marker({
      position: my_location,
      url: '/',
      animation: google.maps.Animation.DROP
    });

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    marker.setMap(map);

    var styledMapOptions = {
      name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(my_maptype_id, customMapType);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
