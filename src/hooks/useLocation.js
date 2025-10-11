// src/hooks/useLocation.js
import React, { createContext, useContext, useState } from 'react';
import { locationDatabase } from '../data/locationData';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const states = Object.keys(locationDatabase).map(key => ({
    value: key,
    name: locationDatabase[key].name
  }));

  const updateDistricts = (stateValue) => {
    setSelectedState(stateValue);
    setSelectedDistrict('');
    setSelectedCity('');
    
    if (stateValue && locationDatabase[stateValue]) {
      const stateDistricts = locationDatabase[stateValue].districts;
      const districtList = Object.keys(stateDistricts).map(key => ({
        value: key,
        name: stateDistricts[key].name
      }));
      setDistricts(districtList);
      setCities([]);
    } else {
      setDistricts([]);
      setCities([]);
    }
  };

  const updateCities = (districtValue) => {
    setSelectedDistrict(districtValue);
    setSelectedCity('');
    
    if (selectedState && districtValue && locationDatabase[selectedState]?.districts[districtValue]) {
      const districtCities = locationDatabase[selectedState].districts[districtValue].cities;
      const cityList = Object.keys(districtCities).map(key => ({
        value: key,
        name: districtCities[key]
      }));
      setCities(cityList);
    } else {
      setCities([]);
    }
  };

  const updateSelectedCity = (cityValue) => {
    setSelectedCity(cityValue);
  };

  const getCurrentLocation = () => {
    if (!selectedState || !selectedDistrict || !selectedCity) return null;
    
    const stateName = locationDatabase[selectedState]?.name;
    const districtName = locationDatabase[selectedState]?.districts[selectedDistrict]?.name;
    const cityName = locationDatabase[selectedState]?.districts[selectedDistrict]?.cities[selectedCity];
    
    return {
      state: stateName,
      district: districtName,
      city: cityName,
      fullLocation: `${cityName}, ${districtName}, ${stateName}`
    };
  };

  const value = {
    states,
    districts,
    cities,
    selectedState,
    selectedDistrict,
    selectedCity,
    updateDistricts,
    updateCities,
    updateSelectedCity,
    getCurrentLocation
  };

  return React.createElement(
    LocationContext.Provider,
    { value: value },
    children
  );
};