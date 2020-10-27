import React, {useState} from 'react'
import { updateProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

function UpdateProject(props) {
    const { project, projectId, auth } = props;
    const initialState = {
        title: '',
        content : ''
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

    const updateMyState = () => {
        setState({
            title : project.title,
            content : project.content
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state, this.props.projectId);
        const myvar = [state, projectId];
        props.updateProject(myvar);
        props.history.push('/');
    }

    if(!auth.uid) return <Redirect to='../signin' />
    if(project){
        if(state.title.length === 0) updateMyState();
    }
    return (
        <div className="container">
        <form onSubmit={handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Project</h5>
            <div className="input-field">
                <h6 className="grey-text text-lighten-1">Title</h6>
                <input type="text" id="title" value = {state.title} onChange={handleChange} />
            </div>

            <div className="input-field">
                <h6 className="grey-text text-lighten-1">Content</h6>
                <textarea id="content" className="materialize-textarea" value={state.content} onChange={handleChange}></textarea>
            </div>
            <div className="input-field">
                <div className="btn blue  z-depth-0" onClick={handleSubmit}>Update</div>
            </div>
        </form>
    </div>
    )
} 

const mapStateToProps = (state,ownProps) => {
    const id=ownProps.match.params.id
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        projectId: id,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (project) => dispatch(updateProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);