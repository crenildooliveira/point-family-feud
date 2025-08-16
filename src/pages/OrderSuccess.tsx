import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Clock, Utensils } from 'lucide-react';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [estimatedTime] = useState(Math.floor(Math.random() * 30) + 20);

  useEffect(() => {
    // Simular notificação de sucesso
    document.title = 'Pedido Confirmado - Food Express';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-bold text-success">
              Pedido Confirmado!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {orderId && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Número do pedido</p>
                <p className="font-mono font-bold text-lg">{orderId.slice(0, 8).toUpperCase()}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Pedido em preparo</p>
                  <p className="text-sm text-muted-foreground">Sua comida está sendo preparada</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Tempo estimado</p>
                  <p className="text-sm text-muted-foreground">{estimatedTime} - {estimatedTime + 10} minutos</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Entrega</p>
                  <p className="text-sm text-muted-foreground">Você receberá uma notificação quando estiver pronto</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <Button asChild className="w-full bg-gradient-primary">
                <Link to="/">Fazer novo pedido</Link>
              </Button>
              
              <p className="text-xs text-muted-foreground">
                * Este é um projeto de estudo. Nenhum pedido real foi processado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;