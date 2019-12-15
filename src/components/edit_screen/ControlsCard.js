import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import Container from 'react-materialize/lib/Container';
import { Rnd }from 'react-rnd'

class ControlsCard extends Component {
    state = {
        width: this.props.control.width,
        height: this.props.control.height,
        x: this.props.control.x_dimension,
        y: this.props.control.y_dimension,
    }
    render () {
        const {control} = this.props;
        if (control.name === "button") {
            return <Rnd className="rnd"
                size={{ width: this.state.width,  height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
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
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
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
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
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
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                    });
                }}
                >
                <label className="container_controls" id={control.name + control.key} 
                    style={{color:control.fontColor, background:control.background, fontSize: control.fontSize,
                    borderRadius:control.borderRadius, borderStyle:" solid", borderColor:control.borderColor, 
                    borderWidth:control.borderThickness,}}>Label
                </label>
            </Rnd>
        }
        // if (control.name === "container") {
        //     return (<div className="container"></div>);
        // }
        // if (control.name == "textfield") {
        //     return (
        //         <div className="input-field inline">
        //             <input placeholder="Input" type="text"></input>
        //         </div>
        //     );
        // }
        // if (control.name === "label") {
        //     return (
        //         <div className="input-field">
        //             <label>Prompt for input</label>
        //         </div>
        //     );
        // }
        // return (
        //     <div></div>
        // );
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
  )(ControlsCard);