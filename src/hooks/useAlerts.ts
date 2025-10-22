import { AppAlert } from '@/constants/alerts';
import { useEffect, useState } from 'react';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}/api/alerts/get_all`;

export function useAlerts() {
  const [alerts, setAlerts] = useState<AppAlert[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error fetching alerts');
      const data = await response.json();
      setAlerts(data || []);
      setIsOnline(true);
    } catch (error) {
      console.warn('Sin conexión con el backend, usando modo local');
      setIsOnline(false);
      setAlerts([]);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return { alerts, isOnline, fetchAlerts };
}
