import React, { useState } from "react";
import "./register.css";
import eye from '../../../assets/eye.svg';
import eyeSlash from '../../../assets/eye-slash.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegistrationPage = ({}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("");
  const [roletype, setRoleType] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!mobilenumber || !/^\d{10}$/.test(mobilenumber)) newErrors.mobilenumber = "Valid mobile number required";
    if (!email || !/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(email)) newErrors.email = "Valid email required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!roletype) newErrors.roletype = "Role Type is required";
    if (!role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setLoader(true);
    const registrationData = {
      firstName,
      lastName,
      username,
      mobilenumber,
      email,
      password,
      dateOfBirth,
      gender,
      roletype,
      role,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", registrationData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again later.");
    } finally {
      setLoader(false);
    }
  }
};

  const handleRoleTypeChange = (e) => {
    setRoleType(e.target.value);
    setRole("");
  };

  const getRoleOptions = () => {
    if (roletype === "Admin") {
      return ["Super Admin", "Leave Manager", "Supervisor"];
    } else if (roletype === "Employee") {
      return ["Full Stack Developer Intern", "UI/UX Designer Intern","Graphic Designer Intern","Testing Intern","Investment Intern"];
    }
    return [];
  };

  return (
    <div className="registration-container">
      <form className="registration-form " onSubmit={handleSubmit}>
        <h2 >Register</h2>

        <div className="row ">
          <input type="text" className="namee " placeholder="First Name " value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" className="namee " placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="errorsss">{errors.firstName && <span>{errors.firstName}</span>}
        {errors.lastName && <span>{errors.lastName}</span>}</div>

        <div className="row">
          <input type="text" className="namee " placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
          <input type="text" className="namee " placeholder="Mobile Number" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="errorsss1">{errors.username && <span>{errors.username}</span>}
        {errors.mobilenumber && <span>{errors.mobilenumber}</span>}</div>
    
        <input className="email-style email-style1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="errorssemail">{errors.email && <span>{errors.email}</span>}</div>

     
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative w-full px-4 py-2 border border-gray-600 rounded-lg outline-none transition duration-200 hover:border-[#76a988] focus:border-[#6bcc8d]  focus:ring focus:ring-[#4DC3AB] focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-600 pass_eye"
          >
            {showPassword ? (
              <img
                src={eye}
                className="w-6"
                alt="Hide password"
                width="16"
                height="16"
              />
            ) : (
              <img
                src={eyeSlash}
                className="w-6 "
                alt="Show password"
                width="16"
                height="16"
              />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 errorssemail">{errors.password}</span>
        )}
        <div className="confirm-password">
          <input
            type={showSecondPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="relative w-full px-4 py-2 border border-gray-600 rounded-lg outline-none transition duration-200 hover:border-[#76a988] focus:border-[#6bcc8d] focus:ring focus:ring-[#4DC3AB] focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowSecondPassword(!showSecondPassword)}
            className="ml-2 text-gray-600 pass_eyeslash"
          >
            {showSecondPassword ? (
              <img
                src={eye}
                className="w-6"
                alt="Hide password"
                width="16"
                height="16"
              />
            ) : (
              <img
                src={eyeSlash}
                className="w-6"
                alt="Show password"
                width="16"
                height="16"
              />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword}</span>
        )}

        <div className="row">
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="errorsss2">{errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
        {errors.gender && <span>{errors.gender}</span>}</div>

        <div className="row">
          <select value={roletype} onChange={handleRoleTypeChange}>
            <option value="">Access Type</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            {getRoleOptions().map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="errorsss3">{errors.roletype && <span>{errors.roletype}</span>}
        {errors.role && <span>{errors.role}</span>}</div>

        <button type="submit" disabled={loader}>{loader ? "Registering..." : "Register"}</button>
        <p>Already have an account? <span onClick={() => navigate('../login')}>Login here</span></p>
      </form>
    </div>
  );
};

export default RegistrationPage;