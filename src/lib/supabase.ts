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
    console.log('🔍 Buscando todos os produtos no Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    console.log('➕ Criando produto no Supabase:', product.name);
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) throw error
    console.log('✅ Produto criado com sucesso:', data.id);
    return data as Product
  },

  async update(id: number, updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>) {
    console.log('✏️ Atualizando produto no Supabase:', id, updates);
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    console.log('✅ Produto atualizado com sucesso');
    return data as Product
  },

  async delete(id: number) {
    console.log('🗑️ Excluindo produto no Supabase:', id);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    console.log('✅ Produto excluído com sucesso');
  }
}