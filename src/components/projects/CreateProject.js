import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'

function CreateProject(props) {

    const initialState = {
        title: '',
        content: ''
    }

    const [state, setState] = useState(initialState);
     
    function handleChange(e){
        const {id, value} = e.target;
        setState(prev => {
            return {
            ...prev,
            [id]: value
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createProject(state)
        props.history.push('/');
    }

    if(!props.auth.uid) return <Redirect to='./signin' />

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={state.title} onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea id="content" value={state.content} className="materialize-textarea" onChange={handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)
