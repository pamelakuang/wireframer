import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ControlsCard from './ControlsCard.js';

class ListControls extends Component {
    render () {
        const wireframe = this.props.wireframe;
        if (!wireframe) {
            return <React.Fragment />
        }
        return (
            
            <div>
                {wireframe.controls && wireframe.controls.map(control =>(
                    <ControlsCard control={control} updateProperties={this.props.updateProperties} 
                    getControlKey={this.props.getControlKey}/>
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
    firestoreConnect([
        { collection: 'users'},
    ]),
    connect(mapStateToProps),
  )(ListControls);