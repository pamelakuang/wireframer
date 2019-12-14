import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';

class EditScreen extends Component {

    createNewButton = () => {
        console.log("hi");
        React.createElement('button');

    }

    render() {
        return (
            <Button onClick={() => {this.createNewButton()}}>Submit</Button>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
  )(EditScreen);