import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart as CartType, CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Trash2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import CheckoutForm from './CheckoutForm';

interface CartProps {
  cart: CartType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

/**
 * Componente Cart - Carrinho de compras lateral
 * Exibe itens do carrinho, permite editar quantidades e finalizar pedido
 */
const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleFinalizarPedido = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    onClearCart();
    setShowCheckout(false);
  };

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-card-foreground line-clamp-1">
          {item.product.name}
        </h4>
        <p className="text-primary font-semibold text-sm">
          {formatPrice(item.product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Controles de quantidade */}
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 p-0"
          >
            <Minus className="w-3 h-3" />
          </Button>
          
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        {/* Botão remover */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemoveItem(item.id)}
          className="w-8 h-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-primary shadow-floating hover:scale-110 transition-all duration-200 z-50"
          size="lg"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.totalItems > 0 && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {cart.totalItems}
              </Badge>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Seu Pedido</span>
            {cart.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Carrinho vazio
              </h3>
              <p className="text-sm text-muted-foreground">
                Adicione produtos para começar seu pedido
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Resumo e finalização */}
        {cart.items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cart.totalItems} itens)</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(cart.totalPrice)}</span>
              </div>
            </div>

            <Button
              onClick={handleFinalizarPedido}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              {user ? (
                'Finalizar Pedido'
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Entrar para finalizar
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              * Este é um projeto de estudo. Nenhum pedido real será processado.
            </p>
          </div>
        )}
      </SheetContent>

      <CheckoutForm
        cart={cart}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </Sheet>
  );
};

export default Cart;