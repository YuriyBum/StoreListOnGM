import React, {useState, useEffect, useMemo}  from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api'
import {useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/reducer'
import  * as config from '../config'



const Map = () => {

    const State = useSelector((state: RootState) => {
        return state
     })

    // Loading map after an api data 
    const { isLoaded } = useLoadScript({googleMapsApiKey: String(process.env.GM_API_KEY)})
    
    const markers : config.itemsList = State.itemsList

    // Using an address itself as an id because no id present
    const activeMark : config.itemsList = markers.filter((item : config.itemData) => {
        return (State.selectedItem === item.address)
    })

    const mapCenter = activeMark.length > 0 ? {
        lat: activeMark[0].latitude,
        lng: activeMark[0].longitude 
    } : { 
        lat: config.defaultMapCenter.latitude,
        lng: config.defaultMapCenter.longitude 
    }

    return(
        <div className="map--container">
            {isLoaded ? <GoogleMap zoom={12} center={mapCenter}
            mapContainerClassName="map--ctnr"
             >
                {activeMark.map((mark : config.itemData, ind) => {
                    return(
                    <MarkerF key={"mrk".concat(String(ind * 3))} position={{
                        lng: mark.longitude,
                        lat: mark.latitude
                    }} />)
                })}
             </GoogleMap> : 
            <div>Loading...</div>}
        </div>
    )
}

export default Map;