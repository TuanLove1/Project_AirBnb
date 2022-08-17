import React from 'react'
import Map from 'react-map-gl';
export const MapBox = () => {
    return (
        <Map
            initialViewState={{
                width: '100%',
                height: '100%',
                latitude: 21.0244246,
                longitude: 105.7938072,
                zoom: 5
            }}
            style={{height:'100%',marginTop:'10px'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoiamFja2pvaG5zb24yMzUiLCJhIjoiY2w2cHpwbGtnMHBrajNkb2Q1bGNqeTh5NyJ9.rAV_6iwy4y_moAsb1LXcew'
        />
  )
}
