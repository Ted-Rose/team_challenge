import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../App.css";
import urls from '../urls.json';

const PasswordForm = () => {
  const [message, setMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [inputHasError, setInputHasError] = useState(false);
  const [hideErrorMessage, setHideErrorMessage] = useState(true);

  const inputChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  let navigate = useNavigate();

  // Form submission handler
  const onSubmit = async () => {
    if (Object.keys(passwordInput).length === 0) {
      setInputHasError(true);
      setMessage("Ievadi paroli!");
    } else {
      const response = await checkPassword(passwordInput);

      if (!response.ok) {
        setInputHasError(true);
        setMessage("Parole nav pareiza!!");
      } else {

        const responseJson = await response.json();
        const token = await responseJson.token;
        // Save token in local storage for future use
        localStorage.setItem("token", token);

        setInputHasError(false);
        setMessage("Parole ir pareiza!");
        navigate("/komandas");
      }
    }

    setHideErrorMessage(false);
  };

  // Check password validity
  async function checkPassword(passwordInput) {
    const baseUrl = urls[0].base_url;
    const url = baseUrl + "/api/login";
    const email = "bear@example.com";

    const data = {
      email: email,
      password: passwordInput,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(`Successfully logged in!`);
      } else {
        console.log("Failed to change data. Status:", response.status);
      }

      return response;
    } catch (error) {
      console.log("Request failed with error:", error);
    }
  }

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const messageClass = inputHasError ? "error" : "approved";
  const showMessage = hideErrorMessage ? "hide" : "show";

  return (
    <div className="App text-center">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={preventDefault}>
          <div className="form-floating">
            <input
              value={passwordInput}
              onChange={inputChangeHandler}
              name="email_input"
              id="floatingPassword"
              type="password"
              className={`${"form-control"} ${messageClass}`}
              placeholder=""
            />
            <label htmlFor="floatingPassword">Parole</label>
          </div>
          <button
            className="w-100 btn btn-med btn-primary"
            type="submit"
            onClick={onSubmit}
          >
            Ienākt
          </button>
          <div className={`${"message"} ${messageClass} ${showMessage}`}>
            {message}
          </div>
        </form>
      </main>
    </div>
  );
};

export default PasswordForm;