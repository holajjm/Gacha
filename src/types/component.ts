
export interface Notis {
  id: number;
  data: string;
  notificationType: string;
}
export interface NotiData {
  count: number;
  notifications: Notis[];
}