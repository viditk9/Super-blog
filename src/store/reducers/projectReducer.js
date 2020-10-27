const initState={
    projects: [
        {id: '1', title: 'help me find messi', content: 'blah blah blah'},
        {id: '2', title: 'help me find neymar', content: 'blah blah blah'},
        {id: '3', title: 'help me find ronaldo', content: 'blah blah blah'}
    ]
}
const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'UPDATE_PROJECT' : 
            console.log('project updated !', action.project);
            return state;
        case 'UPDATE_PROJECT_ERROR' : 
            console.log('UPDATE PROJECT ERROR', action.e);
            return state;
        case 'DELETE_PROJECT' : 
            console.log('project deleted !', action.project);
            return state;
        case 'DELETE_PROJECT_ERROR' : 
            console.log('DELETE PROJECT ERROR', action.e);
            return state;        
        default: 
            return state;
    }
}

export default projectReducer