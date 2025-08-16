import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

// Mapeamento de imagens locais por categoria/nome
const imageMap: { [key: string]: string } = {
  'burger': '/src/assets/burger-hero.jpg',
  'fries': '/src/assets/fries.jpg', 
  'juice': '/src/assets/juice.jpg',
  'dessert': '/src/assets/dessert.jpg'
};

const getImageForProduct = (name: string, category: string): string => {
  const normalizedName = name.toLowerCase();
  
  // Mapear por palavra-chave no nome
  if (normalizedName.includes('burger') || normalizedName.includes('hambúrguer')) {
    return imageMap.burger;
  }
  if (normalizedName.includes('batata') || normalizedName.includes('frit')) {
    return imageMap.fries;
  }
  if (normalizedName.includes('suco') || normalizedName.includes('refrigerante')) {
    return imageMap.juice;
  }
  if (normalizedName.includes('brownie') || normalizedName.includes('torta') || normalizedName.includes('sobremesa')) {
    return imageMap.dessert;
  }
  
  // Mapear por categoria
  if (category === 'populares') return imageMap.burger;
  if (category === 'acompanhamentos') return imageMap.fries;
  if (category === 'bebidas') return imageMap.juice;
  if (category === 'sobremesas') return imageMap.dessert;
  
  // Fallback
  return imageMap.burger;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('popular', { ascending: false });

        if (error) throw error;

        // Mapear produtos do Supabase para o formato local
        const mappedProducts: Product[] = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: Number(product.price),
          image: getImageForProduct(product.name, product.category),
          category: product.category,
          popular: product.popular || false
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Falha ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === 'populares') {
      return products.filter(product => product.popular);
    }
    return products.filter(product => product.category === categoryId);
  };

  return {
    products,
    loading,
    error,
    getProductsByCategory
  };
};