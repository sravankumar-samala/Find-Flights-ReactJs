import { useState } from "react";
import SuccessView from "./components/successView";
import FailureView from "./components/failedView";
import NoDataView from "./components/noDataView";
import { MdLocationOn } from 'react-icons/md'
import "./App.css";

// sample test data (from data/db.json file)
// try after initializing json server 

// {
//  "boardingFrom": "Hyderabad",
//  "toDestination": "Noida",
//  "date": "2023-09-07"
//  }

// {
// "boardingFrom": "Hyderabad",
// "toDestination": "Mumbai",
// "date": "2023-09-09",
// }

// formatting date so that initial value of date input accepts 'YYY-MM-DD' format 
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const serviceCities = ["Hyderabad", "Noida", "Mumbai", "Delhi", "Pune"];

export default function App() {
  // useReducer will be very efficient but the state is minimal
  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [apiStatus, setApiStatus] = useState("initial");
  const [flightsList, setFlights] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  // Api function created separately in order to have access to other handlers
  // I used json-server for fetching the dummy data which is in data/db.json file
  const fetchFlights = async () => {
    setApiStatus("pending");
    const Url = `http://localhost:3700/flights?boardingFrom=${boarding}&toDestination=${destination}&date=${date}`;
    try {
      const response = await fetch(Url);
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      setFlights(data);
      setApiStatus("success");
    } catch (error) {
      setApiStatus("failed");
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    setApiStatus('initial')
    if (!boarding || !destination) {
      setErrorMsg("Please provide both boarding and destination cities.");
    } else if (
      !serviceCities.includes(boarding) ||
      !serviceCities.includes(destination)
    ) {
      setErrorMsg("Service not available.");
    } else {
      setErrorMsg(null);
      fetchFlights();
    }
  };

  const handleChange = (e, setChanges) => {
    setChanges(e.target.value);
    setErrorMsg(null);
  };

  return (
    <div className="app-container">
      <h1>Find Your Perfect Flight for the Journey Ahead</h1>

      {/* ------ form container ------  */}
      {/* Thought creating separate component but it requires more prop drilling  */}
      <form className="form-container" onSubmit={onSubmitForm}>
        <h2>Enter your boarding and destination cities</h2>
        <div className="inputs-container">
          <div className="input-holder">
            <MdLocationOn className="location-icon" />
            <input
              type="text"
              placeholder="Enter your boarding location"
              value={boarding}
              onChange={(e) => handleChange(e, setBoarding)}
              autoFocus={apiStatus === "initial"}
            />
          </div>

          <span>To</span>
          <div className="input-holder">
            <MdLocationOn className="location-icon" />

            <input
              type="text"
              placeholder="Enter your destination location"
              value={destination}
              onChange={(e) => handleChange(e, setDestination)}
            />
          </div>
        </div>
        <div className="inner-container">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <p className="note">
          <strong className="note-title">Note: </strong>Services available in
          between{" "}
          {serviceCities.map((city, i) => (
            // here the last values ends with '.' instead ',' 
            (i !== serviceCities.length - 1) ? <strong key={city}>{city}, </strong> : <strong key={city}>{city}.</strong>
          ))}
        </p>
      </form>

      {/* ------- search results container ------- */}
      <div className="search-results-container">
        {apiStatus === "initial" && <InitialView />}
        {apiStatus === "pending" && <Loading />}
        {apiStatus === "failed" && <FailureView setApiStatus={setApiStatus} />}
        {apiStatus === "success" && flightsList.length !== 0 && (
          <SuccessView flightsList={flightsList} />
        )}
        {apiStatus === "success" && flightsList.length === 0 && (
          <NoDataView setApiStatus={setApiStatus} />
        )}
      </div>
    </div>
  );
}

function InitialView() {
  return (
    <div className="non-success-container ">
      <p>Discover Flights  ✈️  for Your Journey...👆</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="non-success-container">
      <h2>Loading...</h2>
    </div>
  );
}
