import { useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true, rating: 4.5 },
  { id: 2, name: 'Phone', price: 699, category: 'electronics', inStock: false, rating: 4.2 },
  { id: 3, name: 'Shirt', price: 29, category: 'clothing', inStock: true, rating: 4.0 },
  { id: 4, name: 'Shoes', price: 89, category: 'clothing', inStock: true, rating: 4.7 },
  { id: 5, name: 'Headphones', price: 199, category: 'electronics', inStock: false, rating: 4.1 },
  { id: 6, name: 'Book', price: 15, category: 'books', inStock: true, rating: 4.3 },
];

function ProductCatalog() {
  const [filters, setFilters] = useState({
    category: 'all',
    inStock: false,
    minPrice: 0,
    maxPrice: 1000,
    searchTerm: '',
  });

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesStock = !filters.inStock || product.inStock;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesCategory && matchesStock && matchesPrice && matchesSearch;
    });

    filtered.sort((a, b) => {
      const comparison =
        sortBy === 'price' || sortBy === 'rating'
          ? a[sortBy] - b[sortBy]
          : a[sortBy].localeCompare(b[sortBy]);

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters, sortBy, sortOrder]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  return (
    <div className="product-catalog" style={{ padding: '20px' }}>
      <div className="filters" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <h3 style={{ width: '100%', margin: '0 0 10px' }}>Filters</h3>

        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          style={{ padding: '8px', minWidth: '180px' }}
        />

        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          style={{ padding: '8px' }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter('inStock', e.target.checked)}
          />
          In stock only
        </label>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '8px' }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
            <strong>{product.name}</strong>
            <div>Price: ${product.price}</div>
            <div>Category: {product.category}</div>
            <div>Rating: {product.rating}</div>
            <div>{product.inStock ? 'In stock' : 'Out of stock'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCatalog;
