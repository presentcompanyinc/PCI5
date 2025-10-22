'use client';

/**
 * WeatherTimeWidget - Real-time weather and time display for Los Angeles
 * Updates every minute for time, every 10 minutes for weather
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
      
      setTime(`LOS ANGELES ${displayHours}:${displayMinutes}${ampm} (PST)`);
    };

    // Update immediately
    updateTime();
    
    // Update every minute
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Update weather every 10 minutes (mock data for now)
  useEffect(() => {
    const updateWeather = () => {
      // Mock weather data - in a real app, you'd call a weather API
      const conditions = ['SUNNY', 'PARTLY CLOUDY', 'CLOUDY', 'CLEAR'];
      const icons = ['☀️', '⛅', '☁️', '🌙'];
      const temperatures = [68, 70, 72, 74, 76, 78];
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
      const conditionIndex = conditions.indexOf(randomCondition);
      
      setWeather({
        temperature: randomTemp,
        condition: randomCondition,
        icon: icons[conditionIndex] || '☀️'
      });
    };

    // Update immediately
    updateWeather();
    
    // Update every 10 minutes
    const interval = setInterval(updateWeather, 600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-end shrink-0">
      <div className="font-['PCI_Sans_Bold',_sans-serif] w-full">
        <p className="leading-normal">{time}</p>
      </div>
      <div className="font-['PCI_Sans_Bold',_sans-serif] h-[39px] w-full">
        <p className="leading-normal">{weather.condition}, {weather.temperature}°</p>
      </div>
    </div>
  );
}
