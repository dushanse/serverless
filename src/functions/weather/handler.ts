import axios from 'axios';
import { formatJSONResponse } from "@libs/api-gateway";

const weather = async (event) => {
  const city = event.queryStringParameters?.city;
  const apiKey = process.env.API_KEY; 

  if (!city) {
    return formatJSONResponse({
      message: 'Invalid city name'
    });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    return formatJSONResponse({
      message: `Weather data for ${city}`,
      data: response.data
    });

  } catch (error) {
    return formatJSONResponse({
      message: 'Failed to fetch weather data',
      error: error.message
    });
  }
};

export const main = weather;
