export type FormData =  {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
} ;

export type MovieShow = {
  id: string;
  title: string;
  year?: string;
  image: string;
}

export type NotificationItem = {
  id: string;
  title: string;
  timeAgo: string;
  image: string;
  iconType: 'video' | 'image' | 'file' | 'clock' | 'heart';
}