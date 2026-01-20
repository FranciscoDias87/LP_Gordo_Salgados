'use client';

import { useState } from 'react';
import { Admin } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface AdminFormProps {
  admin?: Admin;
  onSave: (admin: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login'>) => void;
  trigger: React.ReactNode;
}

export function AdminForm({ admin, onSave, trigger }: AdminFormProps) {
  const [email, setEmail] = useState(admin?.email || '');
  const [name, setName] = useState(admin?.name || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'super_admin' | 'editor' | 'viewer'>(admin?.role || 'editor');
  const [isActive, setIsActive] = useState(admin?.is_active ?? true);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminData = {
      email,
      name,
      role,
      is_active: isActive,
    } as Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'last_login'>;

    if (!admin && password) {
      // Para criação, hash da senha
      const bcrypt = await import('bcryptjs');
      adminData.password_hash = await bcrypt.hash(password, 12);
    } else if (admin) {
      // Para edição, manter password_hash existente
      adminData.password_hash = admin.password_hash;
    }

    onSave(adminData);
    setIsOpen(false);
    // Reset form
    if (!admin) {
      setEmail('');
      setName('');
      setPassword('');
      setRole('editor');
      setIsActive(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{admin ? 'Editar Admin' : 'Novo Admin'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!admin && (
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!admin}
              />
            </div>
          )}
          <div>
            <Label htmlFor="role">Função</Label>
            <Select value={role} onValueChange={(value: 'super_admin' | 'editor' | 'viewer') => setRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Visualizador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="is-active">Ativo</Label>
          </div>
          <Button type="submit" className="w-full">
            {admin ? 'Salvar Alterações' : 'Criar Admin'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}