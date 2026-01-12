import type { Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

async function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products/category/${category}?limit=30`);
  return handleResponse<ProductsResponse>(res);
}

export async function fetchComputerProducts(): Promise<ProductsResponse> {
  const [laptops, smartphones] = await Promise.all([
    fetchProductsByCategory('laptops'),
    fetchProductsByCategory('smartphones'),
  ]);

  const merged = [...laptops.products, ...smartphones.products];

  return {
    products: merged,
    total: merged.length,
    skip: 0,
    limit: merged.length,
  };
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse<Product>(res);
}
