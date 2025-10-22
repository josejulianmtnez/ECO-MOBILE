import { AlertColors, AlertType, AppAlert } from '@/constants/alerts';
import { useAlerts } from '@/src/hooks/useAlerts';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AlertList() {
  const { alerts, isOnline } = useAlerts();

  const typeTitles: Record<AlertType, string> = {
    info: 'Información',
    warning: 'Advertencia',
    critical: 'Crítica',
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {!isOnline && (
        <Text className="text-red-500 text-center mb-2">Modo sin conexión</Text>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {alerts.length === 0 ? (
          <Text className="text-center text-gray-500 mt-6">No hay alertas</Text>
        ) : (
          alerts.map((alert: AppAlert) => (
            <TouchableOpacity
              key={alert.id}
              className="p-3 mb-3 rounded-xl shadow bg-gray-100 border-l-4"
              style={{ borderLeftColor: AlertColors[alert.type as AlertType] }}
              onPress={() => console.log('Ver detalles de:', alert.id)}
            >
              <Text className="font-bold text-base mb-1">
                {typeTitles[alert.type as AlertType]}
              </Text>
              <Text className="text-gray-700">{alert.message}</Text>
              <Text className="text-gray-400 text-xs mt-2 text-right">
                {new Date(alert.timestamp).toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
