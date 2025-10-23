'use client';

/**
 * WeatherTimeWidget - Real-time weather and time display for Los Feliz (90027)
 * Updates every minute for time, every 10 minutes for weather
 * Weather data fetched from OpenWeatherMap API
 */

import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

export function WeatherTimeWidget() {
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'SUNNY',
    icon: '☀️'
  });

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const laTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      
      const hours = laTime.getHours();
      const minutes = laTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      
      setTime(`LOS FELIZ ${displayHours}:${displayMinutes}${ampm} (PST)`);
    };

    // Update immediately
    updateTime();
    
    // Update every minute
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch real weather data every 10 minutes
  useEffect(() => {
    const updateWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    // Update immediately
    updateWeather();
    
    // Update every 10 minutes
    const interval = setInterval(updateWeather, 600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-end shrink-0">
      <div className="font-pci-sans-bold w-full">
        <p className="leading-normal">{time}</p>
      </div>
      <div className="font-pci-sans-bold h-[39px] w-full">
        <p className="leading-normal">{weather.condition}, {weather.temperature}°</p>
      </div>
    </div>
  );
}
