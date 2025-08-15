import { Store } from 'lucide-react';

interface HeaderProps {
  storeName: string;
  isOpen: boolean;
  openTime?: string;
  cartItemsCount: number;
}

/**
 * Componente Header - Cabeçalho da aplicação
 * Exibe informações da loja e status de funcionamento
 */
const Header = ({ storeName, isOpen, openTime, cartItemsCount }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary text-primary-foreground sticky top-0 z-50 shadow-floating">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e informações da loja */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">{storeName}</h1>
              <div className="flex items-center gap-2 text-sm opacity-90">
                {isOpen ? (
                  <span className="text-success-foreground">● Aberto</span>
                ) : (
                  <span className="text-yellow-200">
                    ● Fechado • {openTime && `Abre ${openTime}`}
                  </span>
                )}
                <span>• Sem pedido mínimo</span>
              </div>
            </div>
          </div>

          {/* Status da loja */}
          <div className="text-right">
            <div className="text-sm opacity-90">
              {cartItemsCount > 0 && (
                <span className="bg-primary-foreground/20 px-2 py-1 rounded-lg">
                  {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Banner de status quando fechado */}
        {!isOpen && (
          <div className="mt-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3 text-center">
            <p className="text-sm">
              🔒 Loja fechada, {openTime && `abre ${openTime}`}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;