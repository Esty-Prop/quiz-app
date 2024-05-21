// import "./login-page.css";
import {Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../authApiSlice';
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const [register, { isError, error, isLoading, isSuccess, data }] = useRegisterMutation()
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess)
      //has token
      navigate("/login");
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    register(userObject); // Await the login function call
  };


  return (
    <div className="login-page">
      <div className="login-page-section">
        <img
          // src={user.image || "/noavatar.png"}
          src={"/noavatar.png"}
          alt=""

        />
        {/* <form onSubmit={handleSubmit} className="login-page-form">
          <label>Username</label>
          <input type="text" required name="username" id="username" placeholder="user name" />
          <label>Password</label>
          <input type="password" required name="password" id="password" placeholder="password" />
          <button type="submit" disabled={isLoading}>Log in</button>
          {error && error.data?.message}
          
        </form> */}
        <form onSubmit={handleSubmit} className="login-page-form">
        <input type="text" placeholder="username" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="text" placeholder="firstName" name="firstName" required />
        <input type="text" placeholder="lastName" name="lastName" required />
        <input type="email" placeholder="email" name="email" required />
        {/* <select name="roles" id="roles">
          <option value="User">
            הרשאה
          </option>
          <option value="Admin">מנהל</option>
          <option value="User">משתמש</option>
        </select> */}
        {/* <select name="active" id="active">
          <option value={true}>
            פעיל
          </option>
          <option value={true}>כן</option>
          <option value={false}>לא</option>
        </select> */}
      
        <button type="submit">sign up</button>
        {error&& error.data?.message}
        <Link to={`/login`} className="quizzes-list-button quizzes-list-view">
Already A Member? log in                                    </Link>
      </form>
      </div>

      <div className="login-img"><h1>Create new account !</h1>
      </div>
    </div>
  );
};

export default RegisterPage;

