import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./Trading.css";
import Navbar from "./Navbar";
import Nfc from "./Nfc";

const Trading = () => {
  const [player, setPlayer] = useState(null);
  const [playersArray, setPlayersArray] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [nfcNumber, setNfcNumber] = useState("eqwe123"); // State for NFC cards serial number
  const [getPlayerMethod, setGetPlayerMethod] = useState("nfc");
  const [playerName, setPlayerName] = useState("");
  const [playerPassword, setPlayerPassword] = useState("");
  const location = useLocation(); // Using location from React Router DOM to get token

  useEffect(() => {
    getNewPoints();
  }, []);

  // Function to change points for a player
  const changePoints = async (Value) => {
    console.log("Current serial is: ");
    console.log(nfcNumber);
    const url = "http://127.0.0.1:8000/change-player-points";
    // const playerId = player[0].id;
    const data = {
      id: player.id,
      points: Value,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWFuYWdlciJ9.4SY1fWD_LqSikG8NJjAWIvMQYasbZmAtU9OBZRhI5H0`,
        },
      });
      if (response.ok) {
        console.log("Points changed successfully");
        await getNewPoints();
      } else {
        console.log("Failed to change points. Status:", response.status);
      }
    } catch (error) {
      console.log("Request failed with error:", error);
    }
  };

  // Fetch newest player points
  const getNewPoints = async () => {
    // const url =
    //   "https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player";
    const url = "http://127.0.0.1:8000/players";

    // const data = {
    //   nfcNumber: nfcNumber,
    //   Value: 10
    // };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWFuYWdlciJ9.4SY1fWD_LqSikG8NJjAWIvMQYasbZmAtU9OBZRhI5H0`,
          // Authorization: `Bearer ${token}`,
        }
    });

      // Checking if request was successful
      if (response.ok) {
        setAuthorized(true);
        const data = await response.json();
        if (Array.isArray(data)) {
          setPlayersArray(data);
          await getPlayerByNfcSerializer(nfcNumber, data);
        } else {
          console.log("Response data is not an array:", data);
        }
      } else {
        console.log("Failed to get player. Status:", response.status);
      }

    } catch (error) {
      console.log("Request failed with error:", error);
    }
  };

  const getPlayerByNfcSerializer = async (nfcSerializer, rawPlayerData) => {
      const player = rawPlayerData.find((player) => player.nfc_number === nfcSerializer);
      setPlayer(player);
      return
  };

  const handleCredentials = (e) => {
    e.preventDefault();
    getPlayerByName();

    return
  }

  const getPlayerByName = async (name, password) => {
      const player = playersArray.find((player) =>
        player.playerName === name && player.playerPassword === password);
      setPlayer(player);
      setGetPlayerMethod("nfc")
      return
  };



  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            
            <Nfc
              // changeSerializer={setNfcNumber}
              // changeMessage={setMessage}
            />
           
            <button
              onClick={() => setGetPlayerMethod("name")}
              className="w-50 btn btn-med btn-primary"
            >
              Ievadīt vārdu un paroli
            </button>
            {getPlayerMethod === "name" ? (
            <form onSubmit={handleCredentials}>
              <label>Vārds</label>
              <input
              type="text"
              onChange={(e) => setPlayerName(e.target.value)}
              />
              <label>Parole</label>
              <input
              type="text"
              onChange={(e) => setPlayerPassword(e.target.value)}
              />
              <button type="submit" className="w-50 btn btn-med btn-primary">Submit</button>
            </form>
             ) : null}
          {player ? (
            <>
              <h2>{player.name}</h2>
              <h3>{player.points} punkti</h3>
            </>
          ) : (
            <h2>Izvēlieties dalībnieku</h2>
          )}

            <div className="btn-group-lg center">
              {[-10, -5, -1, 1, 5, 10].map((Value) => (
                <button
                  key={Value}
                  type="button"
                  className={`btn ${
                    Value > 0 ? "btn-outline-success" : "btn-outline-danger"
                  }`}
                  onClick={() =>
                    changePoints(Value)
                  }
                >
                  {Value > 0 ? "+" : "-"} {Math.abs(Value)}
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
