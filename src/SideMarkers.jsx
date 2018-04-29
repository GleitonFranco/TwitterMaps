import React from 'react';
import { Button, Container } from 'reactstrap';
import {connect} from "react-redux";
import './SideMarkers.css';


const SideMarkers = ( {name, friends} ) => {
    return (
        <Container className="side-container pre-scrollable">
            <Button block color='warning'>{name}</Button>
            {friends.map(friend =>
                <Button key={friend.id} block color='info'>
                    {friend.name}
                </Button>
            )}
        </Container>
    );
}

const mapStateToProps = (state, ownProps) => ({
    name: state.name,
    friends: state.friends
});

export default connect(mapStateToProps) (SideMarkers);
