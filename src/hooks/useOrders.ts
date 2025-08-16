import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Cart } from '@/types';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createOrder = async (cart: Cart, deliveryData: { address: string; phone: string; notes?: string }) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    setLoading(true);
    try {
      // Criar pedido
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: cart.totalPrice,
          status: 'pending',
          delivery_address: deliveryData.address,
          phone: deliveryData.phone,
          notes: deliveryData.notes || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Criar itens do pedido
      const orderItems = cart.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.totalPrice
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { success: true, orderId: order.id };
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserOrders = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  };

  return {
    createOrder,
    getUserOrders,
    loading
  };
};