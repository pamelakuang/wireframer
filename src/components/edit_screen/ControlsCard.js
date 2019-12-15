import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore'
import { Button } from 'react-materialize';
import Container from 'react-materialize/lib/Container';
import { Rnd }from 'react-rnd'

class ControlsCard extends Component {
    state = {
        width: this.props.control.width,
        height: this.props.control.height,
        x: this.props.control.x,
        y: this.props.control.y,
    }
    render () {
        const {control} = this.props;
        if (control.name === "button") {
            return <Rnd className="rnd"
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) 
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                >
                <Button className="container_controls" id={control.name + control.key} 
                    style={{color:control.fontColor, background:control.background, fontSize: control.fontSize,
                    borderRadius:control.borderRadius, borderStyle:" solid", borderColor:control.borderColor, 
                    borderWidth:control.borderThickness,}}>Submit
                </Button>
            </Rnd>
        }
        else if (control.name === "container") {
            return <Rnd className="rnd_container"
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) 
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}>
                <Container className="container_controls" id={control.name + control.key}
                    style={{color:control.fontColor, background:control.background, fontSize: control.fontSize,
                    borderRadius:control.borderRadius, borderStyle:" solid", borderColor:control.borderColor, 
                    borderWidth:control.borderThickness,}}>
                </Container>
            </Rnd>
        }
        else if (control.name === "textfield") {
            return <Rnd className="rnd"
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) 
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);    
                }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                >
                <input type="text" className="container_controls" id={control.name + control.key} 
                    style={{color:control.fontColor, background:control.background, fontSize: control.fontSize,
                    borderRadius:control.borderRadius, borderStyle:" solid", borderColor:control.borderColor, 
                    borderWidth:control.borderThickness,}}>
                </input>
            </Rnd>
        }
        else { // LABEL
            return <Rnd className="rnd"
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) 
                    this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
                this.props.updateProperties(control.key, this.state.width, this.state.height, this.state.x, this.state.y);
                }}
                >
                <label className="container_controls" id={control.name + control.key} 
                    onClick={() => this.props.getControlKey(control.key)}
                    style={{color:control.fontColor, background:control.background, fontSize: control.fontSize,
                    borderRadius:control.borderRadius, borderStyle:" solid", borderColor:control.borderColor, 
                    borderWidth:control.borderThickness,}}>Label
                </label>
            </Rnd>
        }
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
  )(ControlsCard);