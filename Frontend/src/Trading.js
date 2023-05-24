import React, { useEffect, useState } from "react";
import "./Trading.css";
import Navbar from "./Navbar";
import Nfc from "./Nfc";

const Trading = () => {
  const [player, setPlayer] = useState([
    {
      id: 1,
      name: "Laima Bedrīte",
      pointCount: 3,
    },
  ]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    getNewPoints();
  }, []);

  // Function to change points for a player
  const changePoints = (pointChange) => {
    const playerId = player[0].id;
    fetch("https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player", {
      method: "POST",
      body: JSON.stringify({ playerId, pointChange }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const body = JSON.stringify({ playerId, pointChange });
        console.log(body); // Example of post request
      })
      .catch((err) => {
        console.log(err.message);
      });
    getNewPoints();
  };

  // Fetch updated player points
  const getNewPoints = () => {
    fetch("https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player")
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
            <Nfc></Nfc>
            <h2>{player[0].name}</h2>
            <h3>{player[0].pointCount} punkti</h3>

            <div className="btn-group-lg center">
              {[-10, -5, -1, 1, 5, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`btn btn-sm btn-outline-secondary ms-5 ${
                    value > 0 ? "btn-outline-success" : "btn-outline-danger"
                  }`}
                  onClick={() => changePoints(value)}
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
