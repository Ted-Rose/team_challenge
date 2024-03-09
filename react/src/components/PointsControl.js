import React from "react";

function PointsControl(props) {
  const handleOnChange = () => {
    props.changeCheckedState(props.ID);
  };

  return (
    <div className={`list-group-item rounded-3 py-3 p-4 ${props.selectedState}`} onClick={handleOnChange}>
      <div className="d-flex gap-6 justify-content-between align-items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUxWz1t3EWprdLje0Qhx7TfkPGq_HEI5x-xfwVFfbqA&s"
          alt="twbs"
          width="32"
          height="32"
          className="rounded-circle flex-shrink-0"
        />
        <h6 className="mb-0">{props.teamName}</h6>
        <div>
          <p className="mb-0 me-2">Punkti:</p>
          <p className="mb-0">{props.count}</p>
        </div>
      </div>
    </div>
  );
}

export default PointsControl;
