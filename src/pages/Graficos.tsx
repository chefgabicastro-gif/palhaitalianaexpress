import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Sale {
  id: string;
  date: string;
  quantity: number;
  total: number;
}

const COLORS = ['#f59e0b', '#ec4899', '#10b981', '#6366f1', '#f97316'];

export default function Graficos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchSales();
  }, [user, navigate]);

  const fetchSales = async () => {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setSales(data || []);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  // Agrupa vendas por dia
  const dailyData = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.total += Number(sale.total);
      existing.quantity += sale.quantity;
    } else {
      acc.push({ date, total: Number(sale.total), quantity: sale.quantity });
    }
    return acc;
  }, [] as { date: string; total: number; quantity: number }[]);

  // Estatísticas gerais
  const totalRevenue = sales.reduce((acc, s) => acc + Number(s.total), 0);
  const totalUnits = sales.reduce((acc, s) => acc + s.quantity, 0);
  const avgPerSale = sales.length > 0 ? totalRevenue / sales.length : 0;
  const bestDay = dailyData.reduce((best, d) => d.total > (best?.total || 0) ? d : best, dailyData[0]);

  // Dados para pie chart (distribuição por faixa de valor)
  const pieData = [
    { name: 'Até R$50', value: sales.filter(s => Number(s.total) <= 50).length },
    { name: 'R$50-100', value: sales.filter(s => Number(s.total) > 50 && Number(s.total) <= 100).length },
    { name: 'R$100-200', value: sales.filter(s => Number(s.total) > 100 && Number(s.total) <= 200).length },
    { name: 'Acima R$200', value: sales.filter(s => Number(s.total) > 200).length },
  ].filter(d => d.value > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-heading text-2xl font-bold gradient-text-gold">Gráficos de Vendas</h1>
            <p className="text-sm text-muted-foreground">Análise do seu desempenho</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-glow p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-box-gold">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl font-bold gradient-text-gold">
              R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="card-glow p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-box-magenta">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Unidades</span>
            </div>
            <p className="text-2xl font-bold text-accent">{totalUnits}</p>
          </div>

          <div className="card-glow p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-box-green">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-xs text-muted-foreground">Média/Venda</span>
            </div>
            <p className="text-2xl font-bold text-success">
              R$ {avgPerSale.toFixed(2)}
            </p>
          </div>

          <div className="card-glow p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="icon-box-gold">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Melhor Dia</span>
            </div>
            <p className="text-lg font-bold text-foreground">{bestDay?.date || '-'}</p>
            <p className="text-xs text-muted-foreground">R$ {bestDay?.total?.toFixed(2) || '0'}</p>
          </div>
        </div>

        {sales.length === 0 ? (
          <div className="card-glow p-12 rounded-2xl text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-bold text-foreground mb-2">Nenhuma venda registrada</h3>
            <p className="text-sm text-muted-foreground">
              Comece a registrar suas vendas para ver seus gráficos aqui!
            </p>
          </div>
        ) : (
          <>
            {/* Line Chart */}
            <div className="card-glow p-6 rounded-2xl mb-6">
              <h3 className="font-heading font-bold text-foreground mb-4">Evolução das Vendas</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Faturamento']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar and Pie Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-glow p-6 rounded-2xl">
                <h3 className="font-heading font-bold text-foreground mb-4">Unidades por Dia</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="quantity" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {pieData.length > 0 && (
                <div className="card-glow p-6 rounded-2xl">
                  <h3 className="font-heading font-bold text-foreground mb-4">Distribuição de Vendas</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                        />
                        <span className="text-muted-foreground">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
