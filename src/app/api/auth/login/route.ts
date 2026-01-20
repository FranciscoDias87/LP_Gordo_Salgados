import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/supabase';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        AuthService.createErrorResponse('Email e senha são obrigatórios'),
        { status: 400 }
      );
    }

    // Buscar admin por email
    const admin = await adminService.getByEmail(email);

    if (!admin) {
      return NextResponse.json(
        AuthService.createErrorResponse('Credenciais inválidas'),
        { status: 401 }
      );
    }

    // Verificar se admin está ativo
    if (!admin.is_active) {
      return NextResponse.json(
        AuthService.createErrorResponse('Conta desativada'),
        { status: 401 }
      );
    }

    // Verificar senha com bcrypt
    const isValidPassword = await AuthService.verifyPassword(password, admin.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        AuthService.createErrorResponse('Credenciais inválidas'),
        { status: 401 }
      );
    }

    // Atualizar last_login
    await adminService.updateLastLogin(admin.id);

    // Criar resposta com token
    const authResponse = AuthService.createAuthResponse(admin);

    // Criar resposta com cookie httpOnly
    const response = NextResponse.json(authResponse);

    // Configurar cookie httpOnly seguro
    response.cookies.set('auth-token', authResponse.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/'
    });

    console.log(`✅ Login bem-sucedido: ${admin.email} (${admin.role})`);

    return response;

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      AuthService.createErrorResponse('Erro interno do servidor'),
      { status: 500 }
    );
  }
}