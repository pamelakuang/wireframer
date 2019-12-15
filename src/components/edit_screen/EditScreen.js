import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import ListControls from './ListControls.js';

class EditScreen extends Component {

    state = {
        close: false,
    }

    zoomIn = () => {
        
    }

    createNewButton = () => {
        
    }

    noChanges = () => {
        this.setState({close: true});
    }
    render() {
       if (this.state.close) {
           return <Redirect to="/" />
       }
       if (!this.props.users) {
           return <React.Fragment />
       }
       const wireframe = this.props.wireframe;
    
        return (
            
            <div className="row">
                    <div className="column col s3">
                        <div className="row">
                            <Button className="col s3" onClick={() => this.zoomIn()}icon={<i className="material-icons">zoom_in</i>}></Button>
                            <Button className="col s3" icon={<i className="material-icons">zoom_out</i>}></Button>
                            <Button className="col s3">Save</Button>
                            <Button className="col s3" onClick={() => this.noChanges()}>Close</Button>
                        </div>
                        <center>
                            <div>
                                <Button className="container_button" onClick={this.createNewButton()}></Button>
                                <p><strong>Container</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <div className="label_button">Prompt for Input:</div>
                                <p><strong>Label</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <Button className="input_button grey-text">Input</Button>
                                <p><strong>Textfield</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <Button onClick={() => {this.createNewButton()}}>Submit</Button>
                                <p><strong>Button</strong></p>
                            </div>
                        </center>
                    </div>
                    <div className="column col s5">
                        <ListControls wireframe={wireframe}/>
                    </div>
                    <div className="column col s3">c3
                        <p>testing</p>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {wireframeID} = ownProps.match.params;
    const users = state.firestore.ordered.users;
    const auth = state.firebase.auth;
    let wireframes = null;
    let wireframe = null;
   // let controls = null;

    if(users){
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === auth.uid) {
                wireframes = users[i].wireframes;
                for (let j = 0; j < wireframes.length; j++) {
                    if (wireframeID == wireframes[j].wireframeID) {
                        //console.log(wireframes[j].controls);
                        wireframe = wireframes[j];
                    }
                }
            }
        }
    }
    
    return {
        wireframe: wireframe,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        //controls: controls,
    };
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
  )(EditScreen);