import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/mock-data';
import { adminService } from '@/lib/supabase';

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalRevenue: number;
  customers: number;
  totalAdmins: number;
  activeAdmins: number;
}

export interface AdminData {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

/**
 * Hook personalizado para gerenciar estatísticas do dashboard admin
 * Centraliza a lógica de cálculo e carregamento de métricas
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalRevenue: 0,
    customers: 150, // Valor fixo por enquanto
    totalAdmins: 0,
    activeAdmins: 0,
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const [currentAdmin, setCurrentAdmin] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar dados do admin atual
      const adminData = localStorage.getItem('adminData');
      if (adminData) {
        setCurrentAdmin(JSON.parse(adminData));
      }

      // Carregar produtos
      const products = await getProducts();

      // Verificar status da conexão com banco
      if (products.length > 0 && products[0].created_at) {
        setDbStatus('connected');
      } else {
        setDbStatus('fallback');
      }

      // Calcular estatísticas
      const activeProducts = products.filter(p => p.status === 'active');
      const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

      // Carregar dados de admins
      let totalAdmins = 0;
      let activeAdmins = 0;
      try {
        const admins = await adminService.getAll();
        totalAdmins = admins.length;
        activeAdmins = admins.filter((admin: any) => admin.status === 'active').length;
      } catch (adminError) {
        console.warn('Erro ao carregar dados de admins:', adminError);
        // Mantém valores padrão se falhar
      }

      // Produtos recentes (últimos 5)
      const sortedProducts = products
        .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
        .slice(0, 5);

      setStats({
        totalProducts: products.length,
        activeProducts: activeProducts.length,
        totalRevenue,
        customers: 150, // Mantém fixo por enquanto
        totalAdmins,
        activeAdmins,
      });

      setRecentProducts(sortedProducts);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar dados do dashboard: ${errorMessage}`);
      console.error('Erro ao carregar dados do dashboard:', err);
      setDbStatus('fallback');
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = () => {
    loadDashboardData();
  };

  const getRevenueFormatted = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(stats.totalRevenue);
  };

  const getProductStatusSummary = () => {
    return {
      active: stats.activeProducts,
      inactive: stats.totalProducts - stats.activeProducts,
      total: stats.totalProducts,
    };
  };

  const getAdminStatusSummary = () => {
    return {
      active: stats.activeAdmins,
      inactive: stats.totalAdmins - stats.activeAdmins,
      total: stats.totalAdmins,
    };
  };

  return {
    stats,
    recentProducts,
    loading,
    dbStatus,
    currentAdmin,
    error,
    refreshStats,
    getRevenueFormatted,
    getProductStatusSummary,
    getAdminStatusSummary,
  };
}