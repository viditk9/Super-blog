export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
          ...project,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId : authorId,
          createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project});    
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err});
        })
    }
};

export const updateProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        // here we can run async code
        const firestore = getFirestore();
        firestore.collection('projects').doc(project[1]).set({
            ...project[0],
            authorFirstName : getState().firebase.profile.firstName,
            authorLastName : getState().firebase.profile.lastName,
            authorId : getState().firebase.auth.uid,
            createdAt : new Date()
        }).then(() => {
            dispatch({type : 'UPDATE_PROJECT', project});
        }).catch((e) => {
            dispatch({type : 'UPDATE_PROJECT_ERROR', e});
        })
        
    }
}

export const deleteProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        // here we can run async code
        const firestore = getFirestore();
        firestore.collection('projects').doc(project).delete()
        .then(() => {
            dispatch({type : 'DELETE_PROJECT', project});
        }).catch((e) => {
            dispatch({type : 'DELETE_PROJECT_ERROR', e});
        })
    }
}