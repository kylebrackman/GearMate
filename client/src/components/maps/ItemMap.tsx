import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Box } from '@mui/material';
import { Item, User } from '@/types/models.types.ts';
import { ItemPosition } from '@/types/models.types.ts';
import { getCityAndStateApi } from '@/services/LocationApi.ts';
interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  item?: Item;
  user?: User;
  isEditing?: boolean;
  onUploadItemPage?: boolean;
  handleSetItemPos?: (itemPosition: ItemPosition) => void;
  // handleSetAddress?: (address: string) => void;
}

const ItemMap: React.FC<MapProps> = ({
  center,
  zoom,
  item,
  user,
  isEditing,
  onUploadItemPage,
  handleSetItemPos,
  // handleSetAddress,
}) => {
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
          disableDefaultUI: true,
        });

        if ((isEditing && user?.id === item?.owner_id) || onUploadItemPage) {
          // Create the location button only after the map is loaded
          const locationButton = document.createElement('button');
          locationButton.textContent = 'Set Item Location';
          locationButton.classList.add('custom-map-control-button');
          locationButton.setAttribute('type', 'button');

          // Add button to the map's controls
          mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(
            locationButton
          );

          const infoWindow = new google.maps.InfoWindow();

          // Add event listener to the button
          locationButton.addEventListener('click', () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                // The below async on line 71 technically causes a linting error. Revisit later.
                // eslint-disable-next-line
                async (position: GeolocationPosition) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };

                  infoWindow.setPosition(pos);
                  infoWindow.setContent('Location found.');
                  infoWindow.open(mapInstance);
                  mapInstance.setCenter(pos);
                  if (handleSetItemPos) {
                    handleSetItemPos(pos);
                  }
                  const cityAndState = await getCityAndStateApi(
                    pos.lat,
                    pos.lng
                  );
                  console.log(cityAndState);
                  // if (handleSetAddress) {
                  //   handleSetAddress(cityAndState.location)
                  // }
                },
                () => {
                  handleLocationError(
                    true,
                    infoWindow,
                    mapInstance.getCenter()!
                  );
                }
              );
            } else {
              handleLocationError(false, infoWindow, mapInstance.getCenter()!);
            }
          });
        }

        // Error handling function
        function handleLocationError(
          browserHasGeolocation: boolean,
          infoWindow: google.maps.InfoWindow,
          pos: google.maps.LatLng
        ) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(
            browserHasGeolocation
              ? 'Error: The Geolocation service failed.'
              : "Error: Your browser doesn't support geolocation."
          );
          infoWindow.open(mapInstance);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [
    center,
    zoom,
    onUploadItemPage,
    isEditing,
    user?.id,
    item?.owner_id,
    handleSetItemPos,
  ]);

  return (
    <Box
      id="map"
      sx={{
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
        height: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default ItemMap;
