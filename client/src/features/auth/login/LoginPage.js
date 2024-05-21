import "./login-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../authApiSlice';
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation()
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess)
      //has token
      navigate("/dash");
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());
    login(userObject); // Await the login function call
  };


  return (
    <div className="login-page">
      <div className="login-page-section">
        <img
          // src={user.image || "/noavatar.png"}
          src={"/noavatar.png"}
          alt=""

        />      
        <form onSubmit={handleSubmit} className="login-page-form">
          <label>Username</label>
          <input type="text" required name="username" id="username" placeholder="user name" />
          <label>Password</label>
          <input type="password" required name="password" id="password" placeholder="password" />
          <button type="submit" disabled={isLoading}>Log in</button>
          {error && error.data?.message}
          <Link to={`/register`} className="quizzes-list-button quizzes-list-view">
                                        sign up
                                    </Link>
          </form>

      </div>

      <div className="login-img">      <h1>Welcome back !</h1>
      </div>
    </div>
  );
};

export default LoginPage;
