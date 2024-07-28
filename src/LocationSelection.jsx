import React, { useEffect, useState } from "react";

const LocationSelection = () => {
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCountry(data);
        // console.log(country);
      } catch (error) {
        console.error("Error fetching Countries", error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getState = async (selectedCountry) => {
      if (!selectedCountry) return;
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setStates(data);
        // console.log(states);
      } catch (error) {
        console.error("Error fetching States", error);
      }
    };
    getState(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    const getCity = async (selectedCountry, selectedState) => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCities(data);
        // console.log(cities);
      } catch (error) {
        console.error("Error fetching Cities", error);
      }
    };
    getCity(selectedCountry, selectedState);
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
  };
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option disabled value="">
          Select Country
        </option>
        {country.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        disabled={selectedCountry == ""}
        value={selectedState}
        onChange={handleStateChange}
      >
        <option value="">Select State</option>
        {states.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        disabled={selectedState == ""}
        value={selectedCity}
        onChange={handleCityChange}
      >
        <option value="">Select City</option>
        {cities.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <div>
        {selectedCity ? (
          <h3>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LocationSelection;
