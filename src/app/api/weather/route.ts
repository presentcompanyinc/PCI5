import { NextResponse } from 'next/server';

export async function GET() {
  // Los Feliz coordinates (90027)
  const latitude = 34.1147;
  const longitude = -118.2909;

  try {
    // First, get the weather station for this location
    const stationResponse = await fetch(
      `https://api.weather.gov/points/${latitude},${longitude}`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'User-Agent': 'Present Company Included Weather Widget (contact@presentcompanyincluded.com)'
        }
      }
    );

    if (!stationResponse.ok) {
      throw new Error('Failed to fetch weather station data');
    }

    const stationData = await stationResponse.json();
    const forecastUrl = stationData.properties.forecast;

    // Get current weather conditions
    const weatherResponse = await fetch(
      forecastUrl,
      { 
        next: { revalidate: 600 }, // Cache for 10 minutes
        headers: {
          'User-Agent': 'Present Company Included Weather Widget (contact@presentcompanyincluded.com)'
        }
      }
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await weatherResponse.json();

    // Get current period data from National Weather Service
    const currentPeriod = data.properties.periods[0];
    
    // Extract temperature and condition
    const temperature = currentPeriod.temperature;
    const shortForecast = currentPeriod.shortForecast.toUpperCase();
    
    let condition = shortForecast;
    let icon = '☀️';

    // Map NWS conditions to appropriate display format and icons
    if (shortForecast.includes('SUNNY') || shortForecast.includes('CLEAR')) {
      condition = 'SUNNY';
      icon = '☀️';
    } else if (shortForecast.includes('PARTLY CLOUDY') || shortForecast.includes('MOSTLY SUNNY')) {
      condition = 'PARTLY CLOUDY';
      icon = '⛅';
    } else if (shortForecast.includes('CLOUDY') || shortForecast.includes('OVERCAST')) {
      condition = 'CLOUDY';
      icon = '☁️';
    } else if (shortForecast.includes('RAIN') || shortForecast.includes('SHOWERS')) {
      condition = 'RAINY';
      icon = '🌧️';
    } else if (shortForecast.includes('DRIZZLE')) {
      condition = 'DRIZZLE';
      icon = '🌦️';
    } else if (shortForecast.includes('THUNDERSTORM') || shortForecast.includes('STORM')) {
      condition = 'STORMY';
      icon = '⛈️';
    } else if (shortForecast.includes('SNOW')) {
      condition = 'SNOWY';
      icon = '❄️';
    } else if (shortForecast.includes('FOG') || shortForecast.includes('HAZE')) {
      condition = 'FOGGY';
      icon = '🌫️';
    }

    return NextResponse.json({
      temperature,
      condition,
      icon
    });
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

