'use client';

import { useState, useEffect } from 'react';
import { getProducts, Product } from '../../../lib/mock-data';
import { productService } from '../../../lib/supabase';
import { ProductForm } from '../../../components/admin/product-form';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useProductsManagement } from '@/hooks/use-products-management';

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductsManagement();

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    const result = await addProduct(newProduct);
    if (!result.success) {
      alert(result.error || 'Erro ao criar produto. Tente novamente.');
    }
  };

  const handleUpdateProduct = async (updatedProduct: Omit<Product, 'id'>, id: number) => {
    const result = await updateProduct(id, updatedProduct);
    if (!result.success) {
      alert(result.error || 'Erro ao atualizar produto. Tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    const result = await deleteProduct(id);
    if (!result.success) {
      alert(result.error || 'Erro ao excluir produto. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h1>
        <ProductForm
          onSave={handleAddProduct}
          trigger={
            <Button className="bg-red-600 hover:bg-red-700 text-white bold hover:font-bold hover:uppercase">
              <Plus className="w-4 h-4 mr-2 hover:text-white hover:font-bold " />
              Novo Produto
            </Button>
          }
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R$ {product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ProductForm
                    product={product}
                    onSave={(updated) => handleUpdateProduct(updated, product.id)}
                    trigger={
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        <Edit className="w-4 h-4" />
                      </button>
                    }
                  />
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </div>
  );
}