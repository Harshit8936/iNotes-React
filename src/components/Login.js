import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    let navigate = useNavigate();
    const[creds,setCreds] = useState({email:"",password:""})
    const handleLogin = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/signin`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email:creds.email,password:creds.password}),
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // save the authToken and redirect to home page
            localStorage.setItem('token',json.token)
            navigate('/')
            props.showAlert(json.message,"success")
        }else{
                props.showAlert(json.message,"danger")
        }
    }
    const onChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2>Login to continue for iNotebook</h2>
            <form method='POST' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={creds.email} aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" name="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password"  value={creds.password} onChange={onChange} />
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
