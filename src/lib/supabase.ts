import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: number
  name: string
  category: string
  price: number
  status: 'active' | 'inactive'
  created_at?: string
  updated_at?: string
}

// Funções para CRUD de produtos
export const productService = {
  async getAll() {
    //console.log('🔍 Buscando todos os produtos no Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    //console.log('➕ Criando produto no Supabase:', product.name);
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) throw error
    //console.log('✅ Produto criado com sucesso:', data.id);
    return data as Product
  },

  async update(id: number, updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>) {
    //console.log('✏️ Atualizando produto no Supabase:', id, updates);
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Product
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export interface Admin {
  id: string
  email: string
  name: string
  password_hash: string
  role: 'super_admin' | 'editor' | 'viewer'
  is_active: boolean
  last_login?: string
  created_at?: string
  updated_at?: string
}

// Funções para gerenciamento de admins
export const adminService = {
  async getAll() {
    //console.log('👥 Buscando todos os admins...')
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Admin[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Admin
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single()

    if (error) throw error
    return data as Admin
  },

  async create(admin: Omit<Admin, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('admins')
      .insert([admin])
      .select()
      .single()

    if (error) throw error
    return data as Admin
  },

  async update(id: string, updates: Partial<Omit<Admin, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('admins')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Admin
  },

  async updateLastLogin(id: string) {
    const { error } = await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Função de autenticação usando API JWT (LEGACY - será removida)
  async authenticate(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.getByEmail(email)

      // Verificar senha com bcrypt
      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.compare(password, admin.password_hash);

      if (admin && isValid && admin.is_active) {
        await this.updateLastLogin(admin.id)
        return admin
      }

      return null
    } catch (error) {
      return null
    }
  }
}