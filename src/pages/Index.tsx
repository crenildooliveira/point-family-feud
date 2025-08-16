import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Componentes principais da aplicação
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import BottomNavigation from '@/components/BottomNavigation';

// Dados e tipos
import { categories } from '@/data/mockData';
import { Product } from '@/types';

// Hooks personalizados
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { UserIcon, LogOut } from 'lucide-react';

/**
 * Componente principal da aplicação de delivery
 * Inspirado no design do anota.ai para fins educacionais
 */
const Index = () => {
  // Estados locais
  const [activeCategory, setActiveCategory] = useState('populares');
  const [activeTab, setActiveTab] = useState('home');
  
  // Hooks
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { getProductsByCategory, loading: productsLoading, error: productsError } = useProducts();
  const { user, signOut, loading: authLoading } = useAuth();

  // Auto-abrir loja quando há produtos carregados
  const [storeData, setStoreData] = useState({
    name: 'Food Express',
    logo: '',
    isOpen: false,
    openTime: 'carregando...'
  });

  useEffect(() => {
    if (!productsLoading && !productsError) {
      setStoreData(prev => ({
        ...prev,
        isOpen: true,
        openTime: undefined
      }));
    }
  }, [productsLoading, productsError]);

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

  if (authLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Erro ao carregar produtos</p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header fixo com informações da loja */}
      <Header
        storeName={storeData.name}
        isOpen={storeData.isOpen}
        openTime={storeData.openTime}
        cartItemsCount={cart.totalItems}
      />

      {/* Barra de usuário */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Entrar / Cadastrar
                </Button>
              </Link>
            )}
          </div>
          
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          )}
        </div>
      </div>

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
