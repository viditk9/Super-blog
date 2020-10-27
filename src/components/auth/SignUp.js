import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp} from '../../store/actions/authActions'

function SignUp({auth,signUp,authError}) {
    const initialState = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
        signUp(state);
    }

    if(auth.uid) return <Redirect to='/' />

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={state.email} onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={state.password} onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={state.firstName} onChange={handleChange} />
                </div> 
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={state.lastName} onChange={handleChange} />
                </div> 
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">SIGN UP</button>
                    <div className="red-text center">
                        { authError && <p>{ authError }</p> }
                    </div> 
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
