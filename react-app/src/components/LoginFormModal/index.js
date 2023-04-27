import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));

    setEmail("demo@aa.io");
    setPassword("password");
    closeModal();
    history.push("/feed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form-modal">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit} className="form">
        {errors.length ? (
          <span className="LM-Errors">
            The email or password you entered is invalid
          </span>
        ) : null}
        <div className="LM-Email-Div">
          <div className="LM-Email-Container">
            <p className="LM-Email-Text">Email</p>
            <input
              className="LM-Input"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="LM-Password-Div">
          <div className="LM-Password-Container">
            <p className="LM-Password-Text">Password</p>
            <input
              className="LM-Input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="LM-Button" onClick={handleSubmit} type="submit">
          Login
        </div>
        <div className="LM-Demo-Button" onClick={demoLogin}>
          Demo User
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
