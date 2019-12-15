import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import ControlsCard from './ControlsCard.js';

class ListControls extends Component {
    render () {
        const wireframe = this.props.wireframe;
        return (
            <div>
                {wireframe.controls && wireframe.controls.map(control =>(
                    <ControlsCard control={control}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
    };
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
  )(ListControls);