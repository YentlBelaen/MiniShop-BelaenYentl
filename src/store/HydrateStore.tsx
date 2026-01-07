import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { loadPersistedState } from "./persistence";
import { useAppDispatch } from "./hooks";
import { setThemeMode } from "./slices/themeSlice";
import { setCartItems } from "./slices/cartSlice";
import { useTheme } from "../theme/useTheme";

type Props = {
  children: React.ReactNode;
};

export default function HydrateStore({ children }: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const persisted = await loadPersistedState();

      if (cancelled) return;

      if (persisted.themeMode) {
        dispatch(setThemeMode(persisted.themeMode));
      }

      if (persisted.cartItems) {
        dispatch(setCartItems(persisted.cartItems));
      }

      setReady(true);
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  return <>{children}</>;
}
