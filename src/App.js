import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import CreateProject from './components/projects/CreateProject';
import UpdateProject from './components/projects/updateProject';
import ProjectDetails from './components/projects/ProjectDetails'
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Splash Screen</div>
  return children
}


function App() {
  return (
    <BrowserRouter>
    <AuthIsLoaded>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/project/:id" component={ProjectDetails} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/create" component={CreateProject} />
        <Route path='/update/:id' component={UpdateProject} />
      </Switch>
    </div>
    </AuthIsLoaded>
    </BrowserRouter>
  );
}

export default App;
