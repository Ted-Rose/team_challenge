import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Nfc from "../components/Nfc";
import { getAuthToken } from "../util/auth";
import urls from "../urls.json";
import "bootstrap/dist/css/bootstrap.min.css";


const Player = () => {
    const [player, setPlayer] = useState(null);
    const [playersArray, setPlayersArray] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(true)
    const [authorized, setAuthorized] = useState(false);
    const [nfcNumber, setNfcNumber] = useState("");
    const [getPlayerMethod, setGetPlayerMethod] = useState("nfc");
    const [playerName, setPlayerName] = useState("");
    const [logForScreen, setLogForScreen] = useState(["First log"]);
    const [playerPassword, setPlayerPassword] = useState("");
    const token = getAuthToken();

    useEffect(() => {
        getNewPoints();
    }, [nfcNumber]);

    const logOnScreen = (logArray) => {
        // Create an array of JSX elements for each log message
        const logElements = logArray.map((logMessage, index) => (
            <React.Fragment key={index}>
                <br />
                {logMessage}
            </React.Fragment>
        ));
        setLogForScreen(prevArray => [
            ...prevArray,
            logElements
        ]);
    };

    // Function to change points for a player
    const changePoints = async (Value) => {
        const url = urls[0].base_url + "/api/change-player-points";

        const data = {
            id: player.id,
            points: Value,
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Points changed successfully");
            } else {
                console.log("Failed to change points. Status:", response.status);
            }
        } catch (error) {
            console.log("Request failed with error:", error);
        }
        // Fetching new player data to update UI
        await getNewPoints();
    };

    // Fetch newest player points
    const getNewPoints = async () => {
        const url = urls[0].base_url + "/api/players";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            logOnScreen([
                "In getNewPoints",
                "getPlayerMethod:",
                getPlayerMethod,
            ]);

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
        setNfcNumber(nfcNumber.serialNumber);

        return
    }

    const getPlayerByNfcSerializer = async (freshPlayersArray) => {
        if (freshPlayersArray && freshPlayersArray.length > 0) {
            const player = freshPlayersArray.find(
                (player) => player.nfc_number === nfcNumber[0]
            );
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
            <main className="container text-center bg-light pt-3">
                {player ? (
                    <>
                        <div className="list-group-item rounded-3 py-3 selected m-3 mt-1">
                            <h3>Atrastais dalībnieks:</h3>
                            <h4>{player.name}</h4>
                            <h4>{player.points} EUR</h4>
                        </div>
                    </>
                ) : (
                    <h3>Izvēlieties dalībnieku skenējot NFC karti vai ievadot vārdu un paroli</h3>
                )}
                PHONE CONSOLE:
                {logForScreen}
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
                        <div className="form-floating">
                            <input
                                onChange={(e) => setPlayerName(e.target.value)}
                                name="email_input"
                                id="floatingUsername"
                                type="text"
                                className={`form-control`}
                                placeholder=""
                            />
                            <label htmlFor="floatingUsername">Vārds</label>
                        </div>
                        <div className="form-floating">
                            <input
                                onChange={(e) => setPlayerPassword(e.target.value)}
                                name="email_input"
                                id="floatingPassword"
                                type="password"
                                className={`form-control`}
                                placeholder=""
                            />
                            <label htmlFor="floatingPassword">Parole</label>
                        </div>
                        <button type="submit" className="w-50 btn btn-med btn-primary">Aiziet!</button>
                    </form>
                ) : null}

                <div className="btn-group-lg center">
                    {[-10, -5, -1, 1, 5, 10].map((Value) => (
                        <button
                            key={Value}
                            type="button"
                            className={`btn ${Value > 0 ? "btn-outline-success" : "btn-outline-danger"
                                }`}
                            onClick={() =>
                                changePoints(Value)
                            }
                        >
                            {Value > 0 ? "+" : "-"} {Math.abs(Value)}
                        </button>
                    ))}
                </div>
                {!authorized && <h2>Nepieciešams atkārtoti autorizēties!</h2>}
            </main>
        </div>
    );
};

export default Player;
