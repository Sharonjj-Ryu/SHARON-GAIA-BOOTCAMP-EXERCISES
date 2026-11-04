import ProductCard from './ProductCard';

function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Pixel 11 Pro and Pro XL',
      price: 999.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZYph7R3LMBXDXDMEqqDlZBa6YoOlqZRKjTsn3DeQO8e5esV-BvEMELM&s=10',
      isOnSale: false,
      isNew: true,
    },
    {
      id: 2,
      name: 'Google Pixel 11 Pro Fold',
      price: 1799.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_4ci3X7N2dawCySpQSrk2hY7dws5p3WYin9NdDhgzmNXwAC1ssokEdxU&s=10',
      isOnSale: false,
      isNew: true,
    },
    {
      id: 3,
      name: 'Pixel 11',
      price: 799.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_4ci3X7N2dawCySpQSrk2hY7dws5p3WYin9NdDhgzmNXwAC1ssokEdxU&s=10',
      isOnSale: false,
      isNew: true,
    },
    {
      id: 4,
      name: 'Pixel 10a',
      price: 499.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEuRmMdKhhw_DYUCoHy96ZPU94pPZuVlflnQT7aKwog&s=10',
      isOnSale: false,
      isNew: false,
    },
    {
      id: 5,
      name: 'Pixel 10 Pro and Pro XL',
      price: 899.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9Y2ofJuwUgv39YjqIDb6Yqf7cqu5UdoY07wyW0TK-vjhh3prP5WI6vs&s=10',
      isOnSale: false,
      isNew: false,
    },
    {
      id: 6,
      name: 'Pixel 10',
      price: 699.0,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwafG4M8q9cOqbO-9nmuQnc-zWvKZ5ESrfUnVURpPgg-JG1_zhG5NLOOyi&s=10',
      isOnSale: false,
      isNew: false,
    },
  ];

  return (
    <div
      className="product-list"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '40px 20px',
        overflowX: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          isOnSale={product.isOnSale}
          isNew={product.isNew}
        />
      ))}
    </div>
  );
}

export default ProductList;