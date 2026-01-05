import type { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Cart: undefined;
  Profile: undefined;
};
