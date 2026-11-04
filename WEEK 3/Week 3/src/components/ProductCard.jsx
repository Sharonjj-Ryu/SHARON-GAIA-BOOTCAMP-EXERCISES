function ProductCard({
  id,
  name = 'Unknown Product',
  price = 0,
  image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_4ci3X7N2dawCySpQSrk2hY7dws5p3WYin9NdDhgzmNXwAC1ssokEdxU&s=10',
  isOnSale = false,
  isNew = false,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        flexShrink: 0,
        fontFamily: 'sans-serif',
        margin: '0',
      }}
    >
      <div
        style={{
          border: 'none',
          borderRadius: '20px',
          padding: '20px 16px',
          width: '100%',
          height: '230px',
          boxShadow: 'none',
          position: 'relative',
          backgroundColor: '#f8f9fa',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isNew && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: '#d3e3fd',
              color: '#041e49',
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '12px',
            }}
          >
            New
          </span>
        )}

        {isOnSale && !isNew && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}
          >
            Sale
          </span>
        )}

        <div
          style={{
            backgroundColor: 'transparent',
            borderRadius: '6px',
            padding: '0',
            marginBottom: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '160px',
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: '150px',
              objectFit: 'contain',
              borderRadius: '6px',
            }}
          />
        </div>
      </div>

      <h3
        style={{
          fontSize: '15px',
          fontWeight: '700',
          margin: '14px 0 4px 0',
          color: '#1f1f1f',
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: '1.3',
        }}
      >
        {name}
      </h3>

      {price > 0 && (
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: isOnSale ? '#dc2626' : '#444746',
            margin: '0 0 12px 0',
            textAlign: 'center',
          }}
        >
          ${price}
        </p>
      )}

      <button
        type="button"
        onClick={() => alert(`Added ${name} (ID: ${id}) to cart`)}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#0b57d0',
          color: '#ffffff',
          border: 'none',
          borderRadius: '20px',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
          marginTop: '4px',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;