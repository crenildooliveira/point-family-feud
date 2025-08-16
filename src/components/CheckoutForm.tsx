import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useOrders } from '@/hooks/useOrders';
import { Cart } from '@/types';
import { Loader2, MapPin, Phone, FileText } from 'lucide-react';

interface CheckoutFormProps {
  cart: Cart;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm = ({ cart, isOpen, onClose, onSuccess }: CheckoutFormProps) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const { createOrder, loading } = useOrders();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim() || !phone.trim()) {
      toast({
        title: 'Dados incompletos',
        description: 'Por favor, preencha endereço e telefone.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await createOrder(cart, {
        address: address.trim(),
        phone: phone.trim(),
        notes: notes.trim() || undefined
      });

      toast({
        title: 'Pedido realizado!',
        description: 'Seu pedido foi confirmado com sucesso.',
      });

      onSuccess();
      onClose();
      navigate(`/order-success?orderId=${result.orderId}`);
    } catch (error) {
      toast({
        title: 'Erro no pedido',
        description: 'Não foi possível processar seu pedido. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo do pedido */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span className="text-primary">{formatPrice(cart.totalPrice)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de entrega */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço de entrega *
              </Label>
              <Textarea
                id="address"
                placeholder="Rua, número, bairro, cidade..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone para contato *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Observações (opcional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Instruções especiais, ponto de referência..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Confirmar Pedido
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            * Este é um projeto de estudo. Nenhum pedido real será processado.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;