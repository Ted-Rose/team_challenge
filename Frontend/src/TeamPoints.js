import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PointsControl from "./PointsControl";
import { useLocation } from "react-router-dom";
import "./TeamPoints.css";

const TeamPoints = () => {
  const [teams, setTeams] = useState([]); // State for team data
  const [selectedTID, setSelectedTeamId] = useState(1); // State for selected team ID
  const [authorized, setAuthorized] = useState(false); // State for authorization status
  const location = useLocation(); // Using location from React Router DOM to get token
  const token = location.state?.token; // Extracting token from location state

  // useEffect hook to fetch teams data on component mount
  useEffect(() => {
    GetNewPoints();
  }, []);

  // Function to change points of a team
  const changePoints = async (action, value) => {
    const url =
      action === "add"
        ? "http://localhost:8000/add"
        : "http://localhost:8000/subtract";

    const data = {
      TID: selectedTID,
      Value: value,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // Checking if request was successful
      if (response.ok) {
        console.log(
          `Data changed successfully for team with TID ${selectedTID}`
        );
      } else {
        console.log("Failed to change data. Status:", response.status);
      }
    } catch (error) {
      console.log("Request failed with error:", error);
    }
    // Fetching new team data to update UI
    GetNewPoints(token);
  };

  // Function to fetch new team data from API
  const GetNewPoints = async () => {
    const url = "http://localhost:8000/teams";
    // const url =
    //   "https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/teams";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAuthorized(true);
        const data = await response.json();
        // const data = {
        //   teams: [
        //     {
        //       ID: 1,
        //       TID: 1,
        //       Name: "Kaķēni",
        //       Value: 3,
        //     },
        //     {
        //       id: 2,
        //       TID: 2,
        //       Name: "Lauvas",
        //       Value: 8,
        //     },
        //     {
        //       ID: 3,
        //       TID: 3,
        //       Name: "Zivtiņas",
        //       Value: 13,
        //     },
        //   ],
        // };
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          console.log("Response data is not an array:", data);
        }
      } else {
        console.log("Request failed with status:", response.status);
        if (response.status === 401) {
          setAuthorized(false);
        }
      }
    } catch (error) {
      console.log("Request failed with error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            <h2 className="lead">Pievieno vai noņem punktus komandai</h2>
            <div className="points btn-group-lg center lg-1">
              {[-10, -5, -1, +1, +5, +10].map((value) => (
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

          {teams.map(({ ID, TID, Name, Value }) => (
            <PointsControl
              key={ID}
              ID={ID}
              TID={TID}
              count={Value}
              teamName={Name}
              changeUpdatedCheckedState={setSelectedTeamId}
              selectedState={selectedTID === TID ? "selected" : "unselected"}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeamPoints;
