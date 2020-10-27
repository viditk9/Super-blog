import React, {useState} from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

function SignIn(props) {
    const initialState = {
        email: '',
        password: ''
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
        props.signIn(state)
    }

    const { authError, auth } = props;

    if(auth.uid) return <Redirect to='/' />

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={state.email} onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={state.password} onChange={handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className="red-text center">
                      { authError && <p>{authError}</p> }  
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
