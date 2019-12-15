import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { firestoreConnect } from 'react-redux-firebase';

class WireframeLinks extends React.Component {

    render() {
        let wireframes = null;
        if (this.props.users !== undefined) {
            for (let i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].id === this.props.auth.uid) {
                    wireframes = this.props.users[i].wireframes;
                }
            }
        }
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.wireframeID} key={wireframe.wireframeID}>
                        <WireframeCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    };
};
export default compose(connect(mapStateToProps), firestoreConnect([
    { collection: 'users'},
  ]),
  )(WireframeLinks);