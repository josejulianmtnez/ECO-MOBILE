export interface AppAlert {
  id: number;
  id_user_tutor: number;
  id_user_child: number;
  tutor_name?: string;
  child_name?: string;
  timestamp: string;
  type: string;
  message: string;
  status: boolean;
}

export type AlertType = 'info' | 'warning' | 'critical';

export const AlertColors: Record<AlertType, string> = {
  info: '#3B82F6',
  warning: '#F59E0B',
  critical: '#EF4444',
};
