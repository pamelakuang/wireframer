import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import ListControls from './ListControls.js';
import {getFirestore} from 'redux-firestore';
import ControlsProperties from './ControlsProperties.js';

class EditScreen extends Component {

    state = {
        key: null,
        close: false,
        save: false,
        width: 80,
        height: 40,
        x: 0,
        y: 0,
        fontSize: "12px",
        fontColor: "black",
        borderRadius: "5px", 
        borderThickness: "2px",
        borderColor: "black",
        background: "white",
        controls: [],
    }

    updateProperties = (key, width, height, x, y) => {
        var wireframe = this.props.wireframe;
        for (let i = 0; i < wireframe.controls.length; i++) {
            if (wireframe.controls[i].key == key) {
                this.props.wireframe.controls[i].width = width;
                this.props.wireframe.controls[i].height = height;
                this.props.wireframe.controls[i].x = x;
                this.props.wireframe.controls[i].y = y;
            }
        }
    }

    getControlKey = (key) => {
        this.state.key = key;
        console.log(this.state.key);
    }
    zoomIn = () => {
        
    }

    createNewControl = (controlName) => {
        const length = this.props.wireframe.controls.length;
        const wireframes = this.props.wireframes;
        const fireStore = getFirestore();
        const newControl = {
            name: controlName,
            key: length,
            width: this.state.width,
            height: this.state.height,
            x: this.state.x,
            y: this.state.y,
            fontSize: this.state.fontSize,
            fontColor: this.state.fontColor,
            borderRadius: this.state.borderRadius, 
            borderThickness: this.state.borderThickness,
            borderColor: this.state.borderColor,
            background: this.state.background,
        }
        if (controlName === "button") {
            newControl.background = "waves-teal";
            newControl.borderColor = "teal";
            newControl.fontColor = "white";
        }
        if (controlName === "container") {
            newControl.height = 80;
            newControl.fontColor = ""; // no such thing in container
            newControl.fontSize = ""; 
        }
        this.props.wireframe.controls.push(newControl);
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: wireframes,
        });
        // console.log(this.props.wireframe.controls);
    }

    saveChanges = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: this.props.wireframes,
        });
        this.setState({save: true});
    }
    noChanges = () => {
        this.setState({close: true});
    }
    render() {
       if (this.state.close || this.state.save) {
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
                            <Button className="col s3" onClick={() => this.saveChanges()}>Save</Button>
                            <Button className="col s3" onClick={() => this.noChanges()}>Close</Button>
                        </div>
                        <center>
                            <div>
                                <Button onClick={() => {this.createNewControl("container")}} className="container_button"></Button>
                                <p><strong>Container</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <div onClick={() => {this.createNewControl("label")}} className="label_button">Prompt for Input:</div>
                                <p><strong>Label</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <Button onClick={() => {this.createNewControl("textfield")}} className="input_button grey-text">Input</Button>
                                <p><strong>Textfield</strong></p>
                            </div>
                            <br></br>
                            <div>
                                <Button onClick={() => {this.createNewControl("button")}}>Submit</Button>
                                <p><strong>Button</strong></p>
                            </div>
                        </center>
                    </div>
                    <div className="column col s5">
                        <ListControls wireframe={wireframe} updateProperties={this.updateProperties} getControlKey={this.getControlKey}/>
                    </div>
                    <div className="column col s3">
                        <ControlsProperties wireframe={wireframe} key={this.state.key}/>
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
        wireframes: wireframes,
        wireframe: wireframe,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        //controls: controls,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users'},
    ]),
  )(EditScreen);