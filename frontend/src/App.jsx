import React, { useState } from "react";
import FlightCard from "./Components/FlightCard";
import { formatDate } from "../../backend/utils/formateDate";
import Dropdown from "./Components/Dropdown";
import "./App.css";
import axios from "axios";

function App() {
  const [origin, setOrigin] = useState("SYD");
  const [destination, setDestination] = useState("JFK");
  const [cabinClass, setCabinClass] = useState("economy");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleCabinClassChange = (event) => {
    setCabinClass(event.target.value);
  };

  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,hi;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    // "user-agent":
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  };

  const json_data = {
    origin: `${origin}`,
    destination: `${destination}`,
    partnerPrograms: [
      "Air Canada",
      "United Airlines",
      "KLM",
      "Qantas",
      "American Airlines",
      "Etihad Airways",
      "Alaska Airlines",
      "Qatar Airways",
      "LifeMiles",
    ],
    stops: 2,
    departureTimeFrom: "2024-07-09T00:00:00Z",
    departureTimeTo: "2024-10-07T00:00:00Z",
    isOldData: false,
    limit: 302,
    offset: 0,
    cabinSelection: ["Business"],
    date: new Date(),
  };

  const handleClick = (e) => {
    axios
      .post("http://localhost:3000/getFlights", json_data, { headers })
      .then((response) => {
        console.log("GetFligts: ", response);
        setData(response.data);
        setError("");
      })
      .catch((error) => {
        setError(error.message || error);
        console.log(error);
      });
  };
  return (
    <div>
      <div className="search-box">
        <h1>Choose Origin & Destination Airports:</h1>

        <Dropdown
          label="Origin"
          value={origin}
          options={["JFK", "DEL", "SYD", "BOM", "BNE", "BLR"]}
          onChange={handleOriginChange}
        />

        <Dropdown
          label="Destination"
          value={destination}
          options={["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"]}
          onChange={handleDestinationChange}
        />
        <div className="dropdown-container">
          <label style={{backgroundColor:"rgb(255,255,255,0.05)"}} className="dropdown-label">Class Selection</label>
          <select
            className="dropdown"
            style={{ backgroundColor: "rgb(255,255,255,0.05)" }}
          >
            <option style={{ opacity: "100%", color: "white", backgroundColor:"#333333"}}>abc</option>
            <option style={{ opacity: "100%", color: "white", backgroundColor:"#333333"}}>abc</option>
            <option style={{ opacity: "100%", color: "white", backgroundColor:"#333333"}}>abc</option>
          </select>
        </div>

        <button onClick={handleClick}>Search</button>
        {error && <p style={{ color: "red", margin: "0 auto" }}>{error}</p>}
      </div>

      <div className="data-box">
        {data &&
          data.map((flight, index) => (
            <FlightCard
              key={index}
              airline={flight.partner_program}
              origin={origin}
              destination={destination}
              dateFrom={formatDate(json_data.departureTimeFrom)}
              dateTo={formatDate(json_data.departureTimeTo)}
              businessMiles={flight.min_business_miles}
              businessTax={flight.min_business_tax}
              economyMiles={flight.min_economy_miles}
              economyTax={flight.min_economy_tax}
              firstMiles={flight.min_first_miles}
              firstTax={flight.min_first_tax}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
