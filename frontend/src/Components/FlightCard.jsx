// src/FlightCard.js
import React from "react";

const FlightCard = ({
  airline,
  origin,
  destination,
  dateFrom,
  dateTo,
  businessMiles,
  businessTax,
  economyMiles,
  economyTax,
  firstMiles,
  firstTax,
}) => {
  return (
    <div className="card">
      <div className="header">
        <img src="logo.png" alt="logo" className="logo" />
        <h2>{airline}</h2>
      </div>
      <div className="route">
        <p>
          {origin}→{destination}
        </p>
        <p>
          {dateFrom} - {dateTo}
        </p>
      </div>
      <div className="miles">
        <div className="miles-data">
          <p>
            {businessMiles ? businessMiles : "N/A"}{" "}
            {businessTax && <span className="subtext figures">+{businessTax}</span>}
          </p>
          <span className="subtext">Min Business Miles</span>
        </div>
        <div className="miles-data">
          <p>
            {economyMiles ? economyMiles : "N/A"}
            {economyTax && <span className="subtext figures">+{economyTax}</span>}
          </p>
          {<span className="subtext">Min Economy Miles</span>}
        </div>
        <div className="miles-data">
          <p>{firstMiles ? firstMiles : "N/A"} {firstTax && <span className="subtext figures">+{firstTax}</span>}</p>
          <span className="subtext">Min First Miles</span>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
