import React, { useEffect, useState } from "react";
import "./Trading.css";
import Navbar from "./Navbar";
import Nfc from "./Nfc";

const Trading = () => {
  const [player, setPlayer] = useState([{}]);
  const [authorized, setAuthorized] = useState(false);
  const [serial, setSerial] = useState("None"); // State for NFC cards serial number
  // const [message, setMessage] = useState("");// State for NFC cards message

  useEffect(() => {
    getNewPoints();
  }, []);

  // Function to change points for a player
  const changePoints = (action, value) => {
    console.log("Current serial is: ");
    console.log(serial);
    const url =
      action === "add"
        ? "http://localhost:8000/add"
        : "http://localhost:8000/subtract";
    // const playerId = player[0].id;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ serial, value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
      });
    getNewPoints();
  };

  // Fetch updated player points
  const getNewPoints = () => {
    // const url =
    //   "https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player";
    const url = "http://localhost:8000/players";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAuthorized(true);
        setPlayer(data);
      })
      .catch((error) => {
        console.log("Request failed with error:", error);
        setAuthorized(false);
      });
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            <Nfc
              changeSerializer={setSerial}
              // changeMessage={setMessage}
            />
            <h2>{player[0].name}</h2>
            <h3>{player[0].pointCount} punkti</h3>
            <h3>Serial: {serial}</h3>

            <div className="btn-group-lg center">
              {[-10, -5, -1, 1, 5, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`btn ${
                    value > 0 ? "btn-outline-success" : "btn-outline-danger"
                  }`}
                  onClick={() =>
                    changePoints(
                      value > 0 ? "add" : "subtract",
                      Math.abs(value)
                    )
                  }
                >
                  {value > 0 ? "+" : "-"} {Math.abs(value)}
                </button>
              ))}
            </div>
          </div>
          {!authorized && <h2>Nepieciešams atkārtoti autorizēties!</h2>}
        </div>
      </main>
    </div>
  );
};

export default Trading;
