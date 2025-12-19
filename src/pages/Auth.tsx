import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email inválido').max(255),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(100),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validation = authSchema.safeParse({ 
        email, 
        password, 
        name: isLogin ? undefined : name 
      });

      if (!validation.success) {
        toast({
          title: 'Erro de validação',
          description: validation.error.errors[0].message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erro ao entrar',
            description: error.message === 'Invalid login credentials' 
              ? 'Email ou senha incorretos' 
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Bem-vindo de volta!',
            description: 'Login realizado com sucesso',
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          const errorMessage = error.message.includes('already registered')
            ? 'Este email já está cadastrado'
            : error.message;
          toast({
            title: 'Erro ao criar conta',
            description: errorMessage,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Conta criada!',
            description: 'Seja bem-vindo ao Palha Italiana Lucrativa!',
          });
          navigate('/');
        }
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-gold mb-4 shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
            <ChefHat className="w-10 h-10 text-primary-foreground" />
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-gold floating-animation" />
          </div>
          <h1 className="font-heading text-3xl font-bold gradient-text-premium">
            Palha Italiana
          </h1>
          <p className="text-muted-foreground mt-1">Lucrativa</p>
        </div>

        {/* Card de Login/Cadastro */}
        <div className="card-glass p-8 rounded-2xl animate-scale-in border border-border/50">
          {/* Alternador Entrar/Cadastrar */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-muted/30 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              aria-pressed={isLogin}
              className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground shadow-sm border border-accent/20'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              aria-pressed={!isLogin}
              className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-foreground shadow-sm border border-accent/20'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <h2 className="font-heading text-xl font-bold text-foreground text-center mb-6">
            {isLogin ? 'Entrar na sua conta' : 'Criar sua conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Nome</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-muted/50 border-border/50 focus:border-accent/50 transition-colors"
                    required={!isLogin}
                    maxLength={100}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-muted-foreground">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-accent/50 transition-colors"
                  required
                  maxLength={255}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-muted-foreground">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-accent/50 transition-colors"
                  required
                  minLength={6}
                  maxLength={100}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-premium text-primary-foreground font-semibold py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Aguarde...
                </>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors underline underline-offset-4"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Ao continuar, você concorda com nossos termos de uso
        </p>
      </div>
    </div>
  );
}