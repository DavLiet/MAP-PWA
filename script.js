
        
    
        
        
      var geolocate; //set geolocate as a global variable
      var option; //allows the user to either get their location or pick an artificial starting point
      var travel; //allows user to select type of transportation
       var options; // for accuracy
  
  
        
        
      function initMap() {
          
          
        var directionsService = new google.maps.DirectionsService;      //initializes directionsService and directionsDisplay
        var directionsDisplay = new google.maps.DirectionsRenderer;
          
       var map = new google.maps.Map(document.getElementById('map'), {    //initializes map
          zoom: 16,
           center: {lat: 29.558488, lng: -95.087177},
           styles: [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 23
            },
            {
                "lightness": "-8"
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#00ff6c"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#7DC45C"
            },
            {
                "saturation": 37
            },
            {
                "lightness": -41
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#A19FA0"
            },
            {
                "saturation": -98
            },
            {
                "lightness": -20
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#3498db"
            },
            {
                "saturation": "81"
            },
            {
                "lightness": "0"
            },
            {
                "weight": "2.28"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#71ABC3"
            },
            {
                "saturation": -10
            },
            {
                "lightness": -21
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]
        });
        
       
         
          
          
          options = {
           enableHighAccuracy: true,
           timeout: Infinity,
           maximumAge:0
           
          };
     
          
          var astro = 'astro.png';
          
       var marker = new google.maps.Marker({
           icon: astro,
           animation: google.maps.Animation.DROP
       });
          
       if(navigator.geolocation)  //if you can find the location then...
       {   
           
           navigator.geolocation.watchPosition(function(position) {
               
                    geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //sets current position
               
                
                    marker.setPosition(geolocate);
                    marker.setMap(map);
                    
                   // map.setCenter(geolocate); //centers the google map on current position
                },function(){
            handleLocationError(true,marker,map.getCenter());
           },options); 
       }
          
          
        directionsDisplay.setMap(map);
          
        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
          
        document.getElementById('go').addEventListener('click', onChangeHandler); 
          
      }  //end of initMap()
        
        
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
          
               if(document.getElementById('start').value == "geolocate"){  //if the user wants their location, set option to current position
                   option = geolocate;
               }
                else{
                option = document.getElementById('start').value;       //otherwise set start to artificial location
                }
          
          
                if(document.getElementById('transport').value == "DRIVING"){   //sets the mode of transport of individual
                    travel = 'DRIVING';
                }
                else{
                    travel = 'WALKING';
                }
             
         
          
        directionsService.route({
          origin:  option,
          destination: document.getElementById('end').value,
          travelMode: travel,
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
        
        
        
        
        
    
        
     
        function fail(){
            alert("something went wrong");
        }
        
        
       
        
        
        
