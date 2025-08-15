import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

/**
 * Componente ProductCard - Card individual de produto
 * Exibe informações do produto e botão para adicionar ao carrinho
 */
const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simula um pequeno delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 300));
    onAddToCart(product);
    setIsAdding(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-card rounded-lg shadow-product hover:shadow-floating transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Imagem do produto */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.popular && (
          <div className="absolute top-2 left-2 bg-gradient-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            ⭐ Popular
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-card-foreground text-lg mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Preço e botão de adicionar */}
        <div className="flex items-center justify-between">
          <div className="text-primary font-bold text-xl">
            {formatPrice(product.price)}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            size="sm"
            className="bg-success hover:bg-success/90 text-success-foreground shadow-card hover:shadow-product transition-all duration-200 hover:scale-105"
          >
            {isAdding ? (
              <span className="animate-spin">⚪</span>
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {isAdding ? 'Adicionando...' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;