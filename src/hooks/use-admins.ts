'use client';

import { useState, useEffect } from 'react';
import { adminService, Admin } from '@/lib/supabase';

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAll();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar admins');
      console.error('Erro ao carregar admins:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (admin: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login'>) => {
    try {
      const newAdmin = await adminService.create(admin);
      setAdmins(prev => [newAdmin, ...prev]);
      return newAdmin;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar admin';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateAdmin = async (id: string, updates: Partial<Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login'>>) => {
    try {
      const updatedAdmin = await adminService.update(id, updates);
      setAdmins(prev => prev.map(a => a.id === id ? updatedAdmin : a));
      return updatedAdmin;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar admin';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      await adminService.delete(id);
      setAdmins(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir admin';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    loadAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    clearError: () => setError(null),
  };
}