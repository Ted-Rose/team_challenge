import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./Trading.css";
import Navbar from "./Navbar";
import Nfc from "./Nfc";

const Trading = () => {
  const [player, setPlayer] = useState(null);
  const [playersArray, setPlayersArray] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(true)
  const [authorized, setAuthorized] = useState(false);
  const [nfcNumber, setNfcNumber] = useState(""); // State for NFC cards serial number
  const [getPlayerMethod, setGetPlayerMethod] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerPassword, setPlayerPassword] = useState("");
  const location = useLocation(); // Using location from React Router DOM to get token

  useEffect(() => {
    getNewPoints();
  }, []);

  // Function to change points for a player
  const changePoints = async (Value) => {
    const url = "http://127.0.0.1:8000/change-player-points";
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
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });

      if (response.ok) {
        setAuthorized(true);
        const data = await response.json();
        if (Array.isArray(data)) {
          setPlayersArray(data);
          if (getPlayerMethod === "nfc") {
            console.log(getPlayerMethod);
            getPlayerByNfcSerializer(data)
          }
          if (getPlayerMethod === "name") {
            getPlayerByName(data)
          }
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

  const changeNfcNumber = (nfcNumber) => {
    setNfcNumber(nfcNumber);
    return
  }

  const getPlayerByNfcSerializer = async (freshPlayersArray) => {
    if (freshPlayersArray && freshPlayersArray.length > 0) {
      const player = freshPlayersArray.find((player) => player.nfc_number === nfcNumber);
      setPlayer(player);
    } else {
      console.log("No players found in the array");
    }
  };

  const handleCredentials = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    getPlayerByName(playersArray);
  }

  const getPlayerByName = (freshPlayersArray) => {
    if (freshPlayersArray && freshPlayersArray.length > 0) {
      const player = freshPlayersArray.find((player) =>
        player.name === playerName && player.password === playerPassword);
      setPlayer(player);
    } else {
      console.log("No players found in the array");
    }
  };

  const createPlayerForm = async () => {
    setGetPlayerMethod("name");
    setFormSubmitted(false);
  }



  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            {player ? (
              <>
              <h3>Atrastais dalībnieks:</h3>
                <h4>{player.name}</h4>
                <h4>{player.points} EUR</h4>
              </>
            ) : (
              <h3>Izvēlieties dalībnieku skenējot NFC karti vai ievadot vārdu un paroli</h3>
            )}
            <Nfc
              changeSerializer={changeNfcNumber}
            />
            <button
              onClick={() => createPlayerForm()}
              className="w-50 btn btn-med btn-primary"
            >
              Ievadīt vārdu un paroli
            </button>
            {formSubmitted === false ? (
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
              <button type="submit" className="w-50 btn btn-med btn-primary">Aiziet!</button>
            </form>
             ) : null}

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
