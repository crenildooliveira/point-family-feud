import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryListProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * Componente CategoryList - Lista horizontal de categorias
 * Permite navegação entre diferentes seções de produtos
 */
const CategoryList = ({ categories, activeCategory, onCategoryChange }: CategoryListProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-sm sticky top-[120px] z-40 border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105",
                activeCategory === category.id
                  ? "bg-gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <span className="text-base">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;