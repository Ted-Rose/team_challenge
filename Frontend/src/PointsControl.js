import React, { useState } from "react";

function PointsControl(props) {
  const [selectedState, setSelectedState] = useState("unselected");

  // Event handler for checkbox change
  const handleOnChange = (TID) => {
    setSelectedState("selected");
    props.changeUpdatedCheckedState(TID);
  };

  return (
    <div className="list-group list-group-checkable d-grid gap-2 border-0 w-auto">
      <label
        className={`list-group-item rounded-3 py-3 ${props.selectedState}`}
        htmlFor="listGroupCheckableRadios1"
        onClick={() => handleOnChange(props.TID)}
      >
        <div className="d-flex gap-2 w-100 justify-content-between">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUxWz1t3EWprdLje0Qhx7TfkPGq_HEI5x-xfwVFfbqA&s"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0"
          />
          <div>
            <h6 className="mb-0">{props.teamName}</h6>
          </div>
          <p>Punkti:</p>
          <p>{props.count}</p>
        </div>
      </label>
    </div>
  );
}

export default PointsControl;
