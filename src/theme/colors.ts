export type ThemeMode = 'light' | 'dark';

export const colors = {
  light: {
    background: '#FFFFFF',
    card: '#F7F7F7',
    border: '#E3E3E3',
    text: '#111111',
    mutedText: '#555555',
  },
  dark: {
    background: '#0F1115',
    card: '#181B22',
    border: '#2A2F3A',
    text: '#FFFFFF',
    mutedText: '#C8CBD3',
  },
} as const;
