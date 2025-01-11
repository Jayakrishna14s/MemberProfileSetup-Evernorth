import React, { useEffect, useState } from "react";

const Locate = () => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null); // State for managing the InfoWindow
  const [currentMarker, setCurrentMarker] = useState(null); // State to track the current marker

  const locations = [
    { lat: 28.6139, lng: 77.2090, name: "City Hospital", type: "Hospital" },
    { lat: 19.0760, lng: 72.8777, name: "Metro Diagnostics", type: "Diagnostic Center" },
    { lat: 13.0827, lng: 80.2707, name: "Branch Office", type: "Office" },
    { lat: 12.9716, lng: 77.5946, name: "Zonal Office", type: "Office" },
    { lat: 22.5726, lng: 88.3639, name: "Care Hospital", type: "Hospital" },
  ];

  // Function to return the appropriate icon URL based on the type
  const getMarkerIcon = (type) => {
    switch (type) {
      case "Hospital":
        return "https://res.cloudinary.com/dfkfysygf/image/upload/v1729922942/hospital_Icon_pniygz.svg";
      case "Diagnostic Center":
        return "https://res.cloudinary.com/dfkfysygf/image/upload/v1729922942/hospital_Icon_pniygz.svg";
      case "Office":
        return "https://res.cloudinary.com/dfkfysygf/image/upload/v1729923229/Build_Icon_a1yk5b.svg";
      default:
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Default icon if type is unknown
    }
  };

  useEffect(() => {
    const initMap = () => {
      const googleMaps = window.google.maps;
      const mapOptions = {
        zoom: 5,
        center: new googleMaps.LatLng(20.5937, 78.9629), // Center of India
      };
      const mapInstance = new googleMaps.Map(document.getElementById("map"), mapOptions);
      setMap(mapInstance);

      const infoWindowInstance = new googleMaps.InfoWindow();
      setInfoWindow(infoWindowInstance); // Set the InfoWindow instance

      locations.forEach((location) => {
        const marker = new googleMaps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.name,
          icon: {
            url: getMarkerIcon(location.type), // Use the function to get the icon based on type
            scaledSize: new googleMaps.Size(30, 30), // Custom size
          },
        });

        marker.addListener("click", () => {
          // Close the previous InfoWindow
          if (currentMarker) {
            infoWindowInstance.close();
          }

          const contentString = `
            <div>
              <strong>${location.name}</strong><br>
              Type: ${location.type}<br>
              <button id="get-directions" style="cursor: pointer;">Get Directions</button>
            </div>
          `;

          infoWindowInstance.setContent(contentString);
          infoWindowInstance.open(mapInstance, marker);

          // Store the current marker
          setCurrentMarker(marker);

          // Get the directions URL
          const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

          // Add event listener to the button
          google.maps.event.addListenerOnce(infoWindowInstance, 'domready', () => {
            const directionsButton = document.getElementById('get-directions');
            directionsButton.addEventListener('click', () => {
              navigator.clipboard.writeText(directionsLink).then(() => {
                alert("Directions link copied to clipboard!");
              });
            });
          });
        });
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBHdWfATegytaxRA7ESHintKP0QazsVTbk`; // Replace with your API Key
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ height: "700px", width: "100%" }} />;
};

export default Locate;
