require('dotenv').config();

const KEY = process.env.KEY;

const searchAutoComplete = async (local) => {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${KEY}&q=${local}`);
  const data = await response.json();
  return data;
};

const current = async (local, days = 3) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${local}&days=${days}&aqi=no&alerts=no`);
  const data = await response.json();
  return data;
};

module.exports = {
  searchAutoComplete,
  current
}