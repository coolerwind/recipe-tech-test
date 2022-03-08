import React from "react";

function Description({ description }) {
  return (
    <div className="ingredients">
      <h4>Description:</h4>
      <p>{description}</p>
    </div>
  );
}

export default Description;
