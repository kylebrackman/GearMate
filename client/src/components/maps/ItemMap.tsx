import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Box } from '@mui/material';

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const ItemMap: React.FC<MapProps> = ({ center, zoom }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    let mapElement: HTMLElement;

    loader
      .load()
      .then((google) => {
        mapElement = document.getElementById('map') as HTMLElement;

        if (!mapElement) {
          console.error('Map element not found');
          return;
        }

        const mapInstance = new google.maps.Map(mapElement, {
          center,
          zoom,
        });

        setMap(mapInstance);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [center, zoom]);

  return (
    <>
      <Box
        id="map"
        sx={{
          width: {
            sm: '200px', // Height for small screens
            md: '300px', // Height for medium screens
            lg: '400px', // Height for large screens
            xl: '500px', // Height for extra large screens
          },
          height: {
            sm: '200px', // Height for small screens
            md: '300px', // Height for medium screens
            lg: '400px', // Height for large screens
            xl: '500px', // Height for extra large screens
          },
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #ccc',
        }}
      />
      {map && (
        <>{/* You can add markers, overlays, or other map features here */}</>
      )}
    </>
  );
};

export default ItemMap;
