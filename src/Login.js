import React from 'react';
import {Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import './Login.css';
import { connect } from 'react-redux';
import {setUserName, resetFriends, setUserLocation, addFriend} from "./ducks/actions";
import friendsSource from './friendsMock.json';
import axios from 'axios';
import Twitter from 'twitter';


const Login = ({ dispatch, googleKey }) => {
    let input, inputPass;
    function setUserLocationWithGeocodification(location) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleKey}`;
        axios.get(url).then( (res) => {
            let position = res.data.results[0].geometry.location;
            dispatch(setUserLocation([position.lat, position.lng]));
        });
    }
    function addFriendWithGeocodification(friend) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${friend.location}&key=${googleKey}`;
        axios.get(url).then( res => {
            let position = res.data.results[0].geometry.location;
            friend.position= [position.lat, position.lng];
            dispatch(addFriend(friend));
        });
    }

    return (
            <Form inline className="subcontainer">
                <Col><p className="display-4">TwitMaps</p></Col>
                <Col xs="4">
                <FormGroup>
                    <Label for="nome">Nome ou e-mail:</Label>
                    <Input id="nome" ref={node => (input = node)} />
                </FormGroup>
                </Col>
                <Col xs="4">
                <FormGroup>
                    <Label for="password">Senha:</Label>
                    <Input type="password" id="password" ref={node => (inputPass = node)} />
                </FormGroup>
                </Col>
                <Col>
                <Button onClick={() => {
                    let nome = input._reactInternalFiber.child.stateNode.value;
                    let pass = inputPass._reactInternalFiber.child.stateNode.value;
                    let client = new Twitter({
                        consumer_key: 'INSERT_KEY',
                        consumer_secret: 'INSERT_SECRET',
                        access_token_key: 'OAUTH_TOKEN',
                        access_token_secret: 'OAUTH_TOKEN_SECRET'
                    });
                    let params = {screen_name: 'nodejs'};
                    client.get('account/settings', params, (error, profile, response) => {
                        if (!error) {
                            dispatch(setUserName(nome));
                            let location = response['trend_location']['name'];
                            setUserLocationWithGeocodification(location);
                        } else { console.log(error);}
                    });
                    dispatch(resetFriends([]));
                    client.get('friends/list', params, (error, list, response) => {
                        if (!error) {
                            response['users'].forEach(addFriendWithGeocodification);
                        }  else { console.log(error);}
                    });

                    // SE NÃO HOUVER O TOKEN PARA A API DO TWITTER, PODE-SE DESCOMENTAR O
                    // CÓDIGO ABAIXO PARA USAR UM PERFIL MOCKADO:
                    // dispatch(setUserName(nome));
                    // setUserLocationWithGeocodification('Fortaleza');
                    // friendsSource.users.forEach(addFriendWithGeocodification);

                } } >Login</Button>
                </Col>
            </Form>
    );
}

const mapStateToProps = (state, ownProps) => ({
    googleKey: state.googleKey
});

export default connect(mapStateToProps) (Login);
