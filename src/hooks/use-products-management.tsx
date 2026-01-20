import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/lib/mock-data';
import { productService } from '@/lib/supabase';

/**
 * Hook personalizado para gerenciar operações de produtos no admin
 * Centraliza toda a lógica de CRUD de produtos
 */
export function useProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar produtos: ${errorMessage}`);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      setError(null);
      const created = await productService.create(newProduct);
      setProducts(prev => [created, ...prev]);
      return { success: true, product: created };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao criar produto: ${errorMessage}`);
      console.error('Erro ao criar produto:', err);
      return { success: false, error: errorMessage };
    }
  };

  const updateProduct = async (id: number, updatedProduct: Omit<Product, 'id'>) => {
    try {
      setError(null);
      const updated = await productService.update(id, updatedProduct);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      return { success: true, product: updated };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao atualizar produto: ${errorMessage}`);
      console.error('Erro ao atualizar produto:', err);
      return { success: false, error: errorMessage };
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setError(null);
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao excluir produto: ${errorMessage}`);
      console.error('Erro ao excluir produto:', err);
      return { success: false, error: errorMessage };
    }
  };

  const getActiveProducts = () => {
    return products.filter(p => p.status === 'active');
  };

  const getInactiveProducts = () => {
    return products.filter(p => p.status === 'inactive');
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const getTotalValue = () => {
    return products.reduce((sum, p) => sum + p.price, 0);
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getActiveProducts,
    getInactiveProducts,
    getProductsByCategory,
    getTotalValue,
  };
}