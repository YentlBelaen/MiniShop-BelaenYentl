import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/products";

export function useProduct(productId: number) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: Number.isFinite(productId),
  });
}
