import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

// Componentes principais da aplicação
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import BottomNavigation from '@/components/BottomNavigation';

// Dados e tipos
import { categories, products, getProductsByCategory } from '@/data/mockData';
import { Product } from '@/types';

// Hook personalizado para carrinho
import { useCart } from '@/hooks/useCart';

/**
 * Componente principal da aplicação de delivery
 * Inspirado no design do anota.ai para fins educacionais
 */
const Index = () => {
  // Estados locais
  const [activeCategory, setActiveCategory] = useState('populares');
  const [activeTab, setActiveTab] = useState('home');
  
  // Hook do carrinho
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  // Dados da loja (simulados)
  const storeData = {
    name: 'Food Express',
    logo: '',
    isOpen: false,
    openTime: 'amanhã às 18h30'
  };

  // Busca produtos da categoria ativa
  const currentProducts = getProductsByCategory(activeCategory);
  const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name || '';

  // Handler para adicionar produto ao carrinho
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao seu carrinho.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header fixo com informações da loja */}
      <Header
        storeName={storeData.name}
        isOpen={storeData.isOpen}
        openTime={storeData.openTime}
        cartItemsCount={cart.totalItems}
      />

      {/* Lista de categorias fixas */}
      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Grid de produtos da categoria selecionada */}
      <main className="min-h-[calc(100vh-200px)]">
        <ProductGrid
          products={currentProducts}
          onAddToCart={handleAddToCart}
          categoryName={currentCategoryName}
        />
      </main>

      {/* Carrinho lateral (sheet) */}
      <Cart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Navegação inferior */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
