import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      toast.success('¡Bienvenido!');
      navigate('/admin');
    } else {
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-4 border-[#E8B4B8] bg-[#F5EDE0] shadow-xl">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E8B4B8]/30 flex items-center justify-center border-4 border-[#E8B4B8]">
              <Lock className="w-10 h-10 text-[#C9A875]" />
            </div>
            <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2">
              Panel de Administración
            </h1>
            <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">
              Dulcesal Pastelería
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F6F]" />
                <Input
                  data-testid="login-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="pl-10 border-2 border-[#E8B4B8] bg-[#F5EDE0] focus:ring-[#C9A875] focus:border-[#C9A875]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F6F]" />
                <Input
                  data-testid="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="pl-10 pr-10 border-2 border-[#E8B4B8] bg-[#F5EDE0] focus:ring-[#C9A875] focus:border-[#C9A875]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B6F6F] hover:text-[#5c3a3a]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              data-testid="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold text-lg py-6 border-2 border-[#C9A5A5] transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-[#5c3a3a] border-t-transparent"></span>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>

          {/* Back to home */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-[#8B6F6F] hover:text-[#5c3a3a] font-['Cormorant_Garamond'] underline transition-colors"
            >
              Volver al sitio
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
