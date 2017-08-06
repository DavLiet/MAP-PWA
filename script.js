
        
    
        
        
      var geolocate; //set geolocate as a global variable
      var option; //allows the user to either get their location or pick an artificial starting point
      var travel; //allows user to select type of transportation
       var options; // for accuracy
  
  
        
        
      function initMap() {
          
          
        var directionsService = new google.maps.DirectionsService;      //initializes directionsService and directionsDisplay
        var directionsDisplay = new google.maps.DirectionsRenderer;
          
       var map = new google.maps.Map(document.getElementById('map'), {    //initializes map
          zoom: 18,
        });
       
       
         
          
          
          options = {
           enableHighAccuracy: true,
           timeout: Infinity,
           maximumAge:0
           
          };
     
          
       var marker = new google.maps.Marker({
           icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
          },
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
        
        
       
        
        
        
