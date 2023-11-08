import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';

function Login({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.role) {
          setUserRole(data.role);
          

          // Redirect to the appropriate dashboard based on the user's role
          if (data.role === 'student') {
            navigate('/student');
          } else if (data.role === 'teacher') {
            navigate('/teacher');
          } else if (data.role === 'admin') {
            navigate('/admin');
          }
        }
        if (data.id){
          localStorage.setItem('userId', data.id);
          localStorage.setItem('languageId', data.id);
        }
         else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchUser = async () =>{
    const response = axios.get(`${url}/users/getAll/${setUserRole}`)
    const data = await response.json();
    localStorage.setItem("userId", data.id)
  }

  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('');

  const handleSignup = () => {

    if (!signupEmail || !signupPassword || !confirmPassword || !name || !signupRole) {
      setMessage('Please fill in all fields!');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    fetch(`${url}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: signupEmail, password: signupPassword, name, role: signupRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Signup successful! Please login.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
      <div className="login-body">
      <div className="main"> 
      <input type="checkbox" id="chk" aria-hidden="true"></input>
      <div className="signup">
        <form>
        <label className="signup_login" htmlFor="chk" aria-hidden="true">Sign up</label>
      <input className='input-class'
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input className='input-class'
        type="email"
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input className='input-class' 
        type="password"
        placeholder="Password"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <input className='input-class' 
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select className='select'
        value={signupRole}
        onChange={(e) => setSignupRole(e.target.value)}
      >
        <option className='role-option'  value="">Select Role</option>
        <option className='role-option' value="student">Student</option>
        <option className='role-option' value="teacher">Teacher</option>
        <option className='role-option' value="admin">Admin</option>
      </select>
      <button  className='signup-btn' onClick={handleSignup}>Sign Up</button>

      {message && <p>{message}</p>}
      </form>
      </div>
      <div className="login">
      <label className="signup_login" htmlFor="chk" aria-hidden="true">Login</label>
      <form className='login-form' onSubmit={handleSubmit}>
        {/* <label className='email-login'> */}
         
          <input className="email_input"
          placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        {/* </label> */}
        {/* <label className='email-login'> */}
        
          <input className="email_input"
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {/* </label> */}
        <button className='button-lgn' type="submit">Submit</button>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
