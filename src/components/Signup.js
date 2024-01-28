import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Signup(props) {
  let navigate = useNavigate();
  const[value,setValues] = useState({name:"",email:"",password:"",cpassword:""})
  const handleSignup = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/signup`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:value.name,email:value.email,password:value.password}),
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
    setValues({...value,[e.target.name]:e.target.value})
  }
  return (
    <div className='container mt-3'>
        <h2>SignUp to iNotebook</h2>
            <form method='POST' onSubmit={handleSignup}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={value.name} onChange={onChange} maxLength={20}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={value.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password"  value={value.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword"  value={value.cpassword} onChange={onChange} />
                </div>
                <button disabled={value.name.length<5 || value.email.length<5 ||value.password.length<5 ||value.cpassword.length<5} type="submit"  className="btn btn-primary">SignUp</button>
            </form>
        </div>
  )
}
