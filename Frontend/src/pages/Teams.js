import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PointsControl from "../components/PointsControl";
import urls from "../urls.json";
import { getAuthToken } from "../util/auth";
import "./TeamPoints.css";


const Teams = (props) => {
  const [teams, setTeams] = useState([]); // State for team data
  const [selectedID, setSelectedID] = useState(1); // State for selected team ID
  const [authorized, setAuthorized] = useState(false); // State for authorization status
  const token = getAuthToken();
  // useEffect hook to fetch teams data on component mount
  useEffect(() => {
    GetNewPoints();
  }, []);

  // Function to change points of a team
  const changePoints = async (value) => {
    const url = urls[0].base_url + "/api/change-team-points";

    const data = {
      id: selectedID,
      points: value,
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

      if (response.ok) {
        console.log(
          `Data changed successfully for team with ID ${selectedID}`
        );
      } else {
        console.log("Failed to change data. Status:", response.status);
      }
    } catch (error) {
      console.log("Request failed with error:", error);
    }
    // Fetching new team data to update UI
    GetNewPoints();
  };

  // Function to fetch new team data from API
  const GetNewPoints = async () => {
    // Local network
    const url = urls[0].base_url + "/api/teams";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAuthorized(true);
        const data = await response.json();
        if (Array.isArray(data)) {
          setTeams(data);
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
            <h3>Pievieno vai noņem punktus komandai</h3>
            <div className="btn-group-lg center lg-1">
              {[-10, -5, -1, +1, +5, +10].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`btn btn-sm btn-outline-secondary ms-5 ${value > 0 ? "btn-outline-success" : "btn-outline-danger"
                    }`}
                  onClick={() =>
                    changePoints(value)
                  }
                >
                  {value > 0 ? "+" : "-"} {Math.abs(value)}
                </button>
              ))}
            </div>
          </div>
          {!authorized && <h2>Nepieciešams atkārtoti autorizēties!</h2>}

          {teams.map(({ id, name, points }) => (
            <PointsControl
              key={id}
              ID={id}
              count={points}
              teamName={name}
              changeCheckedState={setSelectedID}
              selectedState={selectedID === id ? "selected" : "unselected"}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Teams;