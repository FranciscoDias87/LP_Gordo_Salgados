'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/mock-data';
import { adminService } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, TrendingUp, Users, DollarSign, Database, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalRevenue: 0,
    customers: 150,
    totalAdmins: 0,
    activeAdmins: 0
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      //console.log('📊 Carregando dados do dashboard...');

      // Carregar dados do admin atual
      const adminData = localStorage.getItem('adminData');
      if (adminData) {
        setCurrentAdmin(JSON.parse(adminData));
      }

      const products = await getProducts();

      if (products.length > 0 && products[0].created_at) {
        setDbStatus('connected');
        //console.log('🗄️ Dados carregados do Supabase');
      } else {
        setDbStatus('fallback');
        //console.log('📦 Dados carregados do mock (fallback)');
      }

      const activeProducts = products.filter(p => p.status === 'active');
      const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

      // Carregar estatísticas de admins
      let totalAdmins = 0;
      let activeAdmins = 0;
      try {
        const admins = await adminService.getAll();
        totalAdmins = admins.length;
        activeAdmins = admins.filter((admin: any) => admin.active).length;
      } catch (error) {
        console.log('Erro ao carregar admins:', error);
      }

      setStats({
        totalProducts: products.length,
        activeProducts: activeProducts.length,
        totalRevenue,
        customers: 150, // Mock data
        totalAdmins,
        activeAdmins
      });

      setRecentProducts(products.slice(0, 3));
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      setDbStatus('fallback');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Carregando dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: 'text-blue-600',
    },
    {
      title: 'Produtos Ativos',
      value: stats.activeProducts,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Receita Potencial',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-yellow-600',
    },
    {
      title: 'Clientes',
      value: `${stats.customers}+`,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Total de Admins',
      value: stats.totalAdmins,
      icon: Shield,
      color: 'text-red-600',
    },
    {
      title: 'Admins Ativos',
      value: stats.activeAdmins,
      icon: Shield,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4" />
          <span className="text-sm text-gray-600">Banco de dados:</span>
          {dbStatus === 'connected' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Supabase</span>
            </div>
          )}
          {dbStatus === 'fallback' && (
            <div className="flex items-center text-yellow-600">
              <XCircle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Mock (Local)</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Link href="/admin/products">
              <Button className="w-full justify-start" variant="outline">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Gerenciar Produtos
              </Button>
            </Link>
            {currentAdmin?.role === 'super_admin' && (
              <Link href="/admin/admins">
                <Button className="w-full mt-6 justify-start" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Gerenciar Admins
                </Button>
              </Link>
            )}
            <Button className="w-full justify-start" variant="outline" disabled>
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Pedidos (Em breve)
            </Button>
            <Button className="w-full justify-start" variant="outline" disabled>
              <TrendingUp className="mr-2 h-4 w-4" />
              Relatórios (Em breve)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              ))}
              {recentProducts.length === 0 && (
                <p className="text-gray-500 text-sm">Nenhum produto cadastrado ainda.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}