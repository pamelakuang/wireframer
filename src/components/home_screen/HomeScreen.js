import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore'
import WireframeLinks from './WireframeLinks.js';

class HomeScreen extends Component {
    
    state = {
        newLength: null,
    }

    handleNewList = () => {
        const fireStore = getFirestore();

        let wireframes = null;
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].id === this.props.auth.uid) {
                wireframes = this.props.users[i].wireframes;
            }
        }
        console.log(wireframes);
        const newWireframe = {
            controls: [],
            name: "unknown",
            wireframeID: wireframes.length,
        }
        wireframes.push(newWireframe);

        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: wireframes,
        });
        this.setState({newLength: wireframes.length});
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (this.state.newLength !== null) {
            return <Redirect to={"/wireframe/" + this.state.newLength}/>
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer<br />
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users'},
    ]),
)(HomeScreen); 