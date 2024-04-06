import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../urls.json";

const PasswordForm = () => {
  const [message, setMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [inputHasError, setInputHasError] = useState(false);
  const [hideErrorMessage, setHideErrorMessage] = useState(true);

  const inputChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  let navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (passwordInput === "") {
      setInputHasError(true);
      setMessage("Ievadi paroli!");
    } else {
      const response = await checkPassword(passwordInput);

      if (!response.ok) {
        setInputHasError(true);
        setMessage("Parole nav pareiza!!");
      } else {
        const responseJson = await response.json();
        const token = responseJson.token;
        localStorage.setItem("token", token);

        setInputHasError(false);
        setMessage("Parole ir pareiza!");
        navigate("/komandas");
      }
    }

    setHideErrorMessage(false);
  };

  async function checkPassword(passwordInput) {
    const baseUrl = urls[0].base_url;
      console.log("urls:");
      console.log(urls)
      console.log("baseUrl:");
      console.log(baseUrl)
    const url = `${baseUrl}/api/login`;
    const email = "bear@example.com";

    const data = {
      email: email,
      password: passwordInput,
    };

    try {
        console.log("url:");
        console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Successfully logged in!");
      } else {
        console.log("Failed to change data. Status:", response.status);
      }

      return response;
    } catch (error) {
      console.log("Request failed with error:", error);
    }
  }

  const messageClass = inputHasError ? "text-danger" : "text-success";
  const showMessage = hideErrorMessage ? "hide" : "show";

  return (
    <div className="container text-center">
      <main className="form-signin m-auto mt-3">
        <form onSubmit={onSubmit}>
          <div className="form-floating">
            <input
              value={passwordInput}
              onChange={inputChangeHandler}
              name="email_input"
              id="floatingPassword" 
              type="password"
              className={`form-control ${messageClass}`}
              placeholder=""
            />
            <label htmlFor="floatingPassword">Parole</label>
          </div>
          <button className="w-100 btn btn-med btn-primary mt-2" type="submit">
            Ienākt
          </button>
                  <div className={`${messageClass} ${showMessage}`}>
            {message}
          </div>
        </form>
      </main>
    </div>
  );
};

export default PasswordForm;