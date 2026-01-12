import { useQuery } from '@tanstack/react-query';
import { fetchComputerProducts } from '../../api/products';

export function useProducts() {
  return useQuery({
    queryKey: ['products', 'computer'],
    queryFn: fetchComputerProducts,
  });
}
