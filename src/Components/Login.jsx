import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

function Login({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/users/login', {
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
        }
         else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
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

    fetch('http://localhost:5000/users/signup', {
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
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select
        value={signupRole}
        onChange={(e) => setSignupRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button  onClick={handleSignup}>Sign Up</button>

      {message && <p>{message}</p>}
      </form>
      </div>
      <div className="login">
      <label className="signup_login" htmlFor="chk" aria-hidden="true">Login</label>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input className="email_input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input className="email_input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
