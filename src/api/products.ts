import type { Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function fetchProducts(): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products`);
  return handleResponse<ProductsResponse>(res);
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse<Product>(res);
}
