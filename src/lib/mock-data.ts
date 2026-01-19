import { productService, Product } from './supabase'

export type { Product }

// Dados mock para fallback
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Coxinha de Frango",
    category: "Fritos",
    price: 5.50,
    status: 'active'
  },
  {
    id: 2,
    name: "Esfiha de Carne",
    category: "Assados",
    price: 6.00,
    status: 'active'
  },
  {
    id: 3,
    name: "Kibe com Queijo",
    category: "Fritos",
    price: 6.50,
    status: 'inactive'
  }
];

// Função para obter produtos (do Supabase ou mock)
export async function getProducts(): Promise<Product[]> {
  try {
    return await productService.getAll()
  } catch (error) {
    console.warn('Erro ao carregar produtos do Supabase, usando dados mock:', error)
    return mockProducts
  }
}