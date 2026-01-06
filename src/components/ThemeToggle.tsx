import { Pressable, Text, View } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/slices/themeSlice';
import { useTheme } from '../theme/useTheme';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const { mode, colors } = useTheme();

  return (
    <Pressable onPress={() => dispatch(toggleTheme())}>
      <View
        style={{
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}
      >
        <Text style={{ color: colors.text, fontWeight: '700' }}>
          Theme: {mode} (tap to toggle)
        </Text>
      </View>
    </Pressable>
  );
}
