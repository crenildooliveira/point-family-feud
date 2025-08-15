import { useState, useCallback } from 'react';
import { Product, CartItem, Cart } from '@/types';

/**
 * Hook personalizado para gerenciar o carrinho de compras
 * Permite adicionar, remover e atualizar quantidades de produtos
 */
export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  // Calcula os totais do carrinho
  const calculateTotals = useCallback((items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return { totalItems, totalPrice };
  }, []);

  // Adiciona produto ao carrinho
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Se o produto já existe, atualiza a quantidade
        newItems = prevCart.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + quantity;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: product.price * newQuantity
            };
          }
          return item;
        });
      } else {
        // Se é um produto novo, adiciona ao carrinho
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          totalPrice: product.price * quantity
        };
        newItems = [...prevCart.items, newItem];
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems,
        totalPrice
      };
    });
  }, [calculateTotals]);

  // Remove produto do carrinho
  const removeFromCart = useCallback((itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems,
        totalPrice
      };
    });
  }, [calculateTotals]);

  // Atualiza quantidade de um item no carrinho
  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.product.price * newQuantity
          };
        }
        return item;
      });

      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        items: newItems,
        totalItems,
        totalPrice
      };
    });
  }, [calculateTotals, removeFromCart]);

  // Limpa o carrinho
  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};