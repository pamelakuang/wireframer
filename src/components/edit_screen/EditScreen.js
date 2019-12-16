import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import ListControls from './ListControls.js';
import {getFirestore} from 'redux-firestore';
import { SliderPicker } from 'react-color';

class EditScreen extends Component {

    state = {
        key: null,
        close: false,
        save: false,
        currentControl: null,
        controls: [],
    }

    updateBorder = (b) => {
        console.log(b.target.name);
        var currentControl;
        for (var i = 0; i < this.props.wireframe.controls.length; i++) {
            if (this.state.key === this.props.wireframe.controls[i].key) {
                currentControl = this.props.wireframe.controls[i];
            }
        }
        currentControl[b.target.name] = b.target.value;
        for(var j=0; j<this.props.wireframe.controls.length;j++){
            if(this.props.wireframe.controls[j].key===this.state.key){
                this.props.wireframe.controls[j]=currentControl;
            }
        }
        this.props.wireframes[this.props.wireframe.key] = this.props.wireframe;
        const fireStore = getFirestore();
            fireStore.collection('users').doc(this.props.auth.uid).update({
                wireframes: this.props.wireframes,
        });
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

    updateFontColor = (color) => {
        var currentControl;
        for (var i = 0; i < this.props.wireframe.controls.length; i++) {
            if (this.state.key === this.props.wireframe.controls[i].key) {
                currentControl = this.props.wireframe.controls[i];
                currentControl.fontColor = color.hex;
            }
        }

        if (currentControl) {
            for (var j = 0; j < this.props.wireframe.controls.length; j++) {
                if (this.state.key === this.props.wireframe.controls[j].key) {
                    this.props.wireframe.controls[j] = currentControl;
                }
            }
        }
        
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: this.props.wireframes,
        });
    }

    updateBorderColor = (color) => {
        var currentControl;
        for (var i = 0; i < this.props.wireframe.controls.length; i++) {
            if (this.state.key === this.props.wireframe.controls[i].key) {
                currentControl = this.props.wireframe.controls[i];
                currentControl.borderColor = color.hex;
            }
        }

        if (currentControl) {
            for (var j = 0; j < this.props.wireframe.controls.length; j++) {
                if (this.state.key === this.props.wireframe.controls[j].key) {
                    this.props.wireframe.controls[j] = currentControl;
                }
            }
        }
        
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: this.props.wireframes,
        });
    }

    updateBackgroundColor = (color) => {
        var currentControl;
        for (var i = 0; i < this.props.wireframe.controls.length; i++) {
            if (this.state.key === this.props.wireframe.controls[i].key) {
                currentControl = this.props.wireframe.controls[i];
                currentControl.background = color.hex;
            }
        }

        if (currentControl) {
            for (var j = 0; j < this.props.wireframe.controls.length; j++) {
                if (this.state.key === this.props.wireframe.controls[j].key) {
                    this.props.wireframe.controls[j] = currentControl;
                }
            }
        }
        
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireframes: this.props.wireframes,
        });
    }

    getControlKey = (key) => {
        this.setState({key: key});
        for (let i = 0; i < this.props.wireframe.controls.length; i++) {
            if (key == this.props.wireframe.controls[i].key) {
                this.setState({currentControl: this.props.wireframe.controls[i]});
            }
        }
    }

    handleKeyPress = (e) => {
        if (this.state.currentControl) {
            console.log(this.state.currentControl.key);
            let button = String.fromCharCode(e.which).toLowerCase();
            if (e.keyCode === 8) {
                e.preventDefault();
                // for (let i = 0; i < this.props.wireframe.controls.length; i++) {
                //     if (this.state.currentControl === this.props.wireframe.controls[i]) {
                //         this.props.wireframe.controls.splice(this.state.currentControl, 1);
                //     }
                // }
                // const fireStore = getFirestore();
                // fireStore.collection('users').doc(this.props.auth.uid).update({
                //     wireframes: this.props.wireframes,
                // });
            }
            else if (e.ctrlKey && button === 'd') {
                const dupe = {
                name: this.state.currentControl.name,
                key: this.props.wireframe.controls.length,
                width: this.state.currentControl.width,
                height: this.state.currentControl.height,
                x: this.state.currentControl.x + 100,
                y: this.state.currentControl.y + 100,
                fontSize: this.state.currentControl.fontSize,
                fontColor: this.state.currentControl.fontColor,
                borderRadius: this.state.currentControl.borderRadius, 
                borderThickness: this.state.currentControl.borderThickness,
                borderColor: this.state.currentControl.borderColor,
                background: this.state.currentControl.background,
                }
                dupe.innerHTML = document.getElementById(this.state.currentControl.name + this.state.key).innerHTML;
                // console.log(document.getElementById(this.state.currentControl.name + this.state.key).innerHTML);
                this.props.wireframe.controls.push(dupe);
                const fireStore = getFirestore();
                fireStore.collection('users').doc(this.props.auth.uid).update({
                    wireframes: this.props.wireframes,
                });
            }
        }
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
            width: 80,
            height: 40,
            x: 0,
            y: 0,
            fontSize: "16px",
            fontColor: "black",
            borderRadius: "5px", 
            borderThickness: "2px",
            borderColor: "black",
            background: "white",
        }
        if (controlName === "button") {
            newControl.borderColor = "teal";
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
        document.addEventListener('keydown', this.handleKeyPress);
       if (this.state.close || this.state.save) {
           return <Redirect to="/" />
       }
       if (!this.props.users) {
           return <React.Fragment />
       }

        const wireframe = this.props.wireframe;
        var currentControl;
        if (wireframe !== null) {
            for (var i = 0; i < wireframe.controls.length; i++) {
                if (this.state.key === wireframe.controls[i].key) {
                    currentControl = wireframe.controls[i];
                }
            }
        }
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
                        <ListControls wireframe={wireframe} updateProperties={this.updateProperties}
                        getControlKey={this.getControlKey}/>
                    </div>
                    <div className="column col s3">
                        <h4>Properties</h4>
                        <div>Font Size: 
                            <input type="text" value={((this.state.key||this.state.key===0) && currentControl) ? currentControl.fontSize : ""}></input>
                        </div>
                        <div>Font Color: 
                        <SliderPicker
                            color={ ((this.state.key||this.state.key===0) && currentControl) ? currentControl.fontColor : "red"}
                            onChangeComplete={ color => this.updateFontColor (color)}
                        />
                        </div>
                        <div>Background Color
                        <SliderPicker
                            color={ ((this.state.key||this.state.key===0) && currentControl) ? currentControl.background : "red"}
                            onChangeComplete={ color => this.updateBackgroundColor (color)}
                        />
                        </div>
                        <div>Border Color
                        <SliderPicker
                            color={ ((this.state.key||this.state.key===0) && currentControl) ? currentControl.borderColor : "red"}
                            onChangeComplete={ color => this.updateBorderColor (color)}
                        />
                        </div>
                        <div> Border Thickness
                            <input name="borderThickness" type="text" value={((this.state.key ||this.state.key===0) && currentControl) ? currentControl.borderThickness : ""} 
                            onChange={e => this.updateBorder(e)}
                            ></input>
                        </div>
                        <div> Border Radius
                            <input name="borderRadius" type="text" value={((this.state.key ||this.state.key===0) && currentControl) ? currentControl.borderRadius : ""}
                            onChange={e => this.updateBorder(e)}
                            ></input>
                        </div>
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