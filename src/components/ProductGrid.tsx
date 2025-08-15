import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  categoryName: string;
}

/**
 * Componente ProductGrid - Grid responsivo de produtos
 * Organiza os produtos em uma grade responsiva por categoria
 */
const ProductGrid = ({ products, onAddToCart, categoryName }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">😔</div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-sm text-muted-foreground">
          Não há produtos disponíveis nesta categoria no momento
        </p>
      </div>
    );
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {categoryName}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;