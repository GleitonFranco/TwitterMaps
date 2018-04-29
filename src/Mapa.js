import React from "react";

import { Map, TileLayer, LayersControl, Marker, CircleMarker, Popup } from 'react-leaflet';
import {GoogleLayer} from 'react-leaflet-google';
import { connect } from 'react-redux';

import './Mapa.css';


const { BaseLayer } = LayersControl;
const terrain = 'TERRAIN';
const road = 'ROADMAP';
const satellite = 'SATELLITE';


const Mapa = ({ location, friends, name, googleKey } ) => {
    return (
    <Map className="leaflet-container" center={ location } zoom={2} zoomControl={true}>
        <LayersControl position='topright'>
            <BaseLayer  name='OpenStreetMap'>
                <TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            </BaseLayer>
            <BaseLayer checked name='Google Maps Urbano'>
                <GoogleLayer googlekey={googleKey}  maptype={road} />
            </BaseLayer>
            <BaseLayer  name='Google Maps Geográfico'>
                <GoogleLayer googlekey={googleKey}  maptype={terrain} />
            </BaseLayer>
            <BaseLayer  name='Satélite'>
                <GoogleLayer googlekey={googleKey}  maptype={satellite} />
            </BaseLayer>
            <Marker position={ location }>
                <Popup>
                    <span>{name}</span>
                </Popup>
            </Marker>
            <CircleMarker center={location} radius={15}/>
            {
                friends.map(fr =>
                    <Marker key={fr.id} position={fr.position}>
                        <Popup>
                            <span>{fr.name}</span>
                        </Popup>
                    </Marker>
                )
            }
        </LayersControl>
    </Map>
    );
}
const mapStateToProps = (state, ownProps) => ({
    location: state.location,
    friends: state.friends,
    googleKey: state.googleKey
});

export default connect(mapStateToProps) (Mapa);