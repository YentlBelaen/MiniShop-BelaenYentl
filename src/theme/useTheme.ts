import { useAppSelector } from '../store/hooks';
import { colors } from './colors';

export function useTheme() {
  const mode = useAppSelector((state) => state.theme.mode);
  return {
    mode,
    colors: colors[mode],
  };
}
