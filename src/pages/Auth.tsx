import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChefHat, Sparkles, ArrowRight } from 'lucide-react';

export default function Auth() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      localStorage.setItem('chef-name', name.trim());
      navigate('/');
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

        {/* Card */}
        <div className="card-glass p-8 rounded-2xl animate-scale-in border border-border/50">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              Como podemos te chamar? 👩‍🍳
            </h2>
            <p className="text-sm text-muted-foreground">
              Digite seu nome para personalizar sua experiência
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="Seu nome ou apelido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg py-6 bg-muted/50 border-border/50 focus:border-accent/50 transition-colors"
                required
                minLength={2}
                maxLength={50}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-premium text-primary-foreground font-semibold py-6 text-base"
              disabled={name.trim().length < 2}
            >
              Começar minha jornada
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Sua jornada para lucrar com palha italiana começa aqui! 🍫
        </p>
      </div>
    </div>
  );
}
