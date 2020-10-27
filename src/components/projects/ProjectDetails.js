import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteProject } from '../../store/actions/projectActions'
import {Link,Redirect} from 'react-router-dom'
import moment from 'moment'

function ProjectDetails(props) {
    const { project, projectId, auth, deleteProject } = props;

    const handleDelete = (e) => {
        e.preventDefault();
        // console.log(projectId);
        deleteProject(projectId);
        props.history.push('/');
    }    

    if(!auth.uid) return <Redirect to='../signin' />
    if(project){
        return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p>{project.content}</p>
                </div>
                <div className="card-action lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    <div>{moment(project.createdAt.toDate()).calendar()}</div>
                </div>
            </div>
            {
                project.authorId === auth.uid ?
                    <div className="row">
                        <Link to={'/update/' + projectId} key={projectId}>
                            <button className="btn blue col waves-effect waves-light" >Edit Article</button>   
                        </Link>
                        <button className="btn red col offset-s1 darken-1" onClick={handleDelete} >Delete</button>
                    </div> :
                    <div></div>
            }
        </div>
        )
    } else {
        return (
            <div className="container center section project-details">
                <p>Loading project...</p>    
            </div>
        )
    }
    
}

const mapStateToProps = (state,ownProps) => {
    const id=ownProps.match.params.id
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        projectId:id,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (project) => dispatch(deleteProject(project))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails) 