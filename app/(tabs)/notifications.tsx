import { AlertColors, AppAlert, AlertType } from '@/constants/alerts';
import { images } from '@/constants/images';
import AlertDetailModal from '@/src/components/AlertDetailModal';
import { useAlerts } from '@/src/hooks/useAlerts';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Notifications() {
  const { alerts, isOnline } = useAlerts();
  const [selectedAlert, setSelectedAlert] = useState<AppAlert | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAlertPress = (alert: AppAlert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAlert(null);
  };

  const typeTitles: Record<AlertType, string> = {
    info: 'Información',
    warning: 'Advertencia',
    critical: 'Crítica',
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-primary text-4xl font-bold text-center mb-6">
        Notificaciones
      </Text>

      {alerts.length === 0 && (
        <View className="flex-1 justify-center items-center mt-24">
          <Image
            source={images.notification}
            className="w-72 h-72 mb-6"
            resizeMode="contain"
          />
          <Text className="text-gray-500 text-center text-lg">
            No hay notificaciones por mostrar.
          </Text>
          {!isOnline && (
            <Text className="text-red-500 mt-2 text-sm">
              Sin conexión al servidor.
            </Text>
          )}
        </View>
      )}

      {alerts.length > 0 && (
        <View className="w-full max-w-md mb-40">
          {alerts.map((alert) => {
            const alertColor =
              AlertColors[alert.type as keyof typeof AlertColors] || '#4F46E5';

            return (
              <TouchableOpacity
                key={alert.id}
                className="bg-white p-4 mb-3 rounded-2xl shadow flex-row items-start"
                style={{
                  borderLeftWidth: 5,
                  borderLeftColor: alertColor,
                }}
                onPress={() => handleAlertPress(alert)}
              >
                <View className="flex-1">
                  <Text
                    className="font-semibold text-base capitalize"
                    style={{ color: alertColor }}
                  >
                    {typeTitles[alert.type as AlertType] || alert.type}
                  </Text>
                  <Text className="text-gray-700 text-sm mt-1">
                    {alert.message}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-2 text-right">
                    {new Date(alert.timestamp).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {!isOnline && alerts.length > 0 && (
        <View className="mt-4">
          <Text className="text-red-500 text-center text-sm">
            Sin conexión con el backend. Modo local activo.
          </Text>
        </View>
      )}

      <AlertDetailModal
        alert={selectedAlert}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </ScrollView>
  );
}
