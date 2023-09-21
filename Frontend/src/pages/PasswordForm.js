import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
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
      var response = await checkPassword(passwordInput);
      var passwordValid = "";
      if (response["message"] === "Logged in") {
        passwordValid = true;
        // Save token in local storage for future use in
        // othe pages
        localStorage.setItem("token", response["token"]);
      } else {
        passwordValid = false;
      }
      if (!passwordValid) {
        setInputHasError(true);
        setMessage("Parole nav pareiza!!");
      } else {
        setInputHasError(false);
        setMessage("Parole ir pareiza!");
        navigate("/komandas");
      }
    }
    setHideErrorMessage(false);
  };

  // Function to check password validity
  async function checkPassword(passwordInput) {
    const baseUrl = urls[0].base_url;
    const url = baseUrl;
    const password = { password: passwordInput };

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(password)) {
      formData.append(key, value);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();
    return data;
  }

  const preventDefault = (e) => {
    e.preventDefault();
  };

  // CSS classes for message display
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
