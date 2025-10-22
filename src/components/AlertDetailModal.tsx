import { AppAlert, AlertColors, AlertType } from '@/constants/alerts';
import React from 'react';
import { Modal, Text, TouchableOpacity, View, ScrollView } from 'react-native';

interface AlertDetailModalProps {
  alert: AppAlert | null;
  visible: boolean;
  onClose: () => void;
}

export default function AlertDetailModal({
  alert,
  visible,
  onClose,
}: AlertDetailModalProps) {
  if (!alert) return null;

  const alertColor = AlertColors[alert.type as AlertType] || '#4F46E5';

  const typeTitles: Record<AlertType, string> = {
    info: 'Información',
    warning: 'Advertencia',
    critical: 'Crítica',
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <View
            className="p-6"
            style={{ backgroundColor: alertColor }}
          >
            <Text className="text-white text-2xl font-bold">
              {typeTitles[alert.type as AlertType] || alert.type}
            </Text>
          </View>

          {/* Content */}
          <ScrollView className="p-6" style={{ maxHeight: 400 }}>
            <View className="mb-4">
              <Text className="text-gray-500 text-sm font-semibold mb-1">
                Mensaje
              </Text>
              <Text className="text-gray-800 text-base">{alert.message}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500 text-sm font-semibold mb-1">
                Fecha y Hora
              </Text>
              <Text className="text-gray-800 text-base">
                {new Date(alert.timestamp).toLocaleString('es-ES', {
                  dateStyle: 'full',
                  timeStyle: 'medium',
                })}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500 text-sm font-semibold mb-1">
                Tutor
              </Text>
              <Text className="text-gray-800 text-base">
                {alert.tutor_name || `ID: ${alert.id_user_tutor}`}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500 text-sm font-semibold mb-1">
                Niño
              </Text>
              <Text className="text-gray-800 text-base">
                {alert.child_name || `ID: ${alert.id_user_child}`}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500 text-sm font-semibold mb-1">
                Estado
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: alert.status ? '#10B981' : '#EF4444',
                  }}
                />
                <Text className="text-gray-800 text-base">
                  {alert.status ? 'Activa' : 'Inactiva'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="p-6 border-t border-gray-200">
            <TouchableOpacity
              className="bg-primary py-3 rounded-xl"
              onPress={onClose}
            >
              <Text className="text-white text-center font-semibold text-base">
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}