import React from 'react';
import './App.css';
import MapaGoogle from "./Mapa";
import SideMarkers from "./SideMarkers";
import Login from './Login'

export default class App extends React.Component {
    render() {
        return (
            <div className="AppContainer">
                <header className="box">
                    <Login/>
                </header>
                <aside className="box"><SideMarkers/></aside>
                <main className="box"><MapaGoogle/></main>
                <footer className="box"></footer>
            </div>
        );
    }
}


// I.C.E.
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p