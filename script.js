$.get('city.json', function initMap(data, callback)
{
//reload selsect tag in options
    var cities = Array.from(data);
    cities.forEach(function (city)
    {
        $('<option>', 
        {
          text: city.name,
          value: city.name,
        }).appendTo('#to-input');
    });
  //load the map 
    $('input', function(){
        var Demo = {
            // HTML Nodes
            mapContainer: $('#map'),
            toInput: $('#to-input'),

            // API Objects
            dirService: new google.maps.DirectionsService(),
            dirRenderer: new google.maps.DirectionsRenderer(),
            map: null,

	        getCurrentLocation:function()
	        {
	        	navigator.geolocation.getCurrentPosition(function(position) 
	        	{
	                var pos = {
	                    lat: position.coords.latitude,
	                    lng: position.coords.longitude
	                };
                console.log(pos);
		            return pos;
	            })
	            
	        },

            showDirections: function(dirResult, dirStatus) 
            {
              if (dirStatus != google.maps.DirectionsStatus.OK) {
                alert('Directions failed: ' + dirStatus);
                return;
              }
              // Show directions
              Demo.dirRenderer.setMap(Demo.map);
              Demo.dirRenderer.setDirections(dirResult);
            },

            getDirections: function() 
            {
                var from = Demo.getCurrentLocation;
                var to = Demo.toInput.value;
                var dirRequest = {
                  origin: from,
                  destination: to,
                  provideRouteAlternatives: true
                };
                Demo.dirService.route(dirRequest, Demo.showDirections);
            }
        };
    })
  });