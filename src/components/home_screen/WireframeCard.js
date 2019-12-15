import React from 'react';
import { Button, Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore'

class WireframeCard extends React.Component {
    
    // state = {
    //     //id: null,
    // }
    stopPropagation = (e) => {
        e.preventDefault();
    }

    deleteWireframe = (e) => {
        e.preventDefault();
        const firestore = getFirestore();
        let wireframes = null;
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].id === this.props.auth.uid) {
                wireframes = this.props.users[i].wireframes;
            }
        }
        const { wireframe } = this.props;
        console.log(wireframe);

        console.log(wireframes.splice(wireframes.indexOf(wireframe), 1));
        firestore.collection('users').doc(this.props.auth.uid).update({
            wireframes: wireframes,
        });
    }

    cancel = (e) => {
        e.preventDefault();
    }

    render() {
        const { wireframe } = this.props;
    
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                    <Modal trigger = {
                        <Button className="delete_wireframe" floating icon={<i className="material-icons">close</i>}></Button>
                    } onClick={e => this.stopPropagation(e)}>
                        <center>
                        <div>Are you sure you want to delete the wireframe?</div>
                        <div>Note: this action is undoable</div>
                        <Button className="yes_no_button" modal="close" onClick={e => this.deleteWireframe(e)}>yes</Button>
                        &nbsp;
                        <Button className="yes_no_button"modal="close" onClick={e => this.cancel(e)}>no</Button>
                        </center>
                    </Modal>
                    
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
)(WireframeCard); 