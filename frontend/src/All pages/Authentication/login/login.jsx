import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import eye from '../../../assets/eye.svg';
import eyeSlash from '../../../assets/eye-slash.svg';
import './login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    roletype: '',
    role: ''
  });
  const [errors, setErrors] = useState({ identifier: '', password: '', roletype: '', role: '', global: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roletypeOptions = ['Admin', 'Employee'];
  const roleOptions = {
    Admin: ['Super Admin', 'Supervisor', 'Leave Manager'],
    Employee: ['Full Stack Developer Intern', 'UI/UX Designer Intern', 'Graphic Designer Intern', 'Testing Intern', 'Investment Intern']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '', global: '' }));
    setFormData(prev => ({ ...prev, [name]: value, ...(name === 'roletype' && { role: '' }) }));
  };

  const validate = () => {
    const errs = { identifier: '', password: '', roletype: '', role: '', global: '' };
    if (!formData.identifier) errs.identifier = 'Email or username is required';
    if (!formData.password) errs.password = 'Password is required';
    if (!formData.roletype) errs.roletype = 'Role type is required';
    if (!formData.role) errs.role = 'Role is required';
    setErrors(errs);
    return !errs.identifier && !errs.password && !errs.roletype && !errs.role;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);
  

  try {
    const payload = {
      identifier: formData.identifier,
      password: formData.password,
      roletype: formData.roletype,
      role: formData.role
    };

    const { data } = await axios.post('http://localhost:5000/api/auth/login', payload);

    localStorage.setItem('token', data.token);
    console.log(data.token)
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log(data.user)

    const { roletype, role } = data.user;
    let redirectPath = '/';

    if (roletype === 'Employee') {
      redirectPath = '/employee-dashboard';
    } else {
      switch (role) {
        case 'Super Admin':
          redirectPath = '/super-admin-dashboard';
          break;
        case 'Supervisor':
          redirectPath = '/supervisor-dashboard';
          break;
        case 'Leave Manager':
          redirectPath = '/leave-manager-dashboard';
          break;
        default:
          redirectPath = '/admin-dashboard';
      }

    }

    navigate(redirectPath, { replace: true });
  } catch (err) {
    const msg = err.response?.data?.message || 'Login failed. Please try again.';
    if (msg.toLowerCase().includes('user not found')) {
      setErrors(prev => ({ ...prev, identifier: msg }));
    } else if (msg.toLowerCase().includes('password')) {
      setErrors(prev => ({ ...prev, password: msg }));
    } else if (msg.toLowerCase().includes('role type')) {
      setErrors(prev => ({ ...prev, roletype: msg }));
    } else if (msg.toLowerCase().includes('role mismatch')) {
      setErrors(prev => ({ ...prev, role: msg }));
    } else {
      setErrors(prev => ({ ...prev, global: msg }));
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>
        {errors.global && <div className="error-banner">{errors.global}</div>}

        <label htmlFor="identifier" className='usernameclass'>Email or Username</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          className='usernameplaceholder'
          placeholder="Enter email or username"
          value={formData.identifier}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.identifier && <div className="field-error">{errors.identifier}</div>}

        <label htmlFor="password" className='passwordclass'>Password</label>
        <div className=" show-pass">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="password-input"
          />
          <button
            type="button"
            className="show-password "
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
          >
            <img
              src={showPassword ? eyeSlash : eye}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className='eyecolor'
            />
          </button>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}

        <div className="dropdown-row">
          <div className="dropdown">
            <label htmlFor="roletype" className='roleroletypeclass'>Role Type</label>
            <select
              id="roletype"
              name="roletype"
              className='selectroletypeclass'
              value={formData.roletype}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Role Type</option>
              {roletypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.roletype && <div className="field-error">{errors.roletype}</div>}
          </div>
          <div className="dropdown">
            <label htmlFor="role" className='role_heading'>Role</label>
            <select
              id="role"
              name="role"
              className='selectroleclass'
              value={formData.role}
              onChange={handleChange}
              disabled={!formData.roletype || loading}
            >
              <option value="">Select Role</option>
              {formData.roletype && roleOptions[formData.roletype].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <div className="field-error">{errors.role}</div>}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p><span onClick={()=> navigate('../forgot')}>Forgot Password</span></p>
        <p>Dont have an account? <span onClick={() => navigate('../register')}>Register here</span></p>
      </form>
    </div>
  );
};

export default LoginPage;
