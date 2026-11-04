import { useState } from 'react';

function CategoryNav() {
  const [activeTab, setActiveTab] = useState('Phones');
  const categories = ['Phones', 'Watches', 'Earbuds', 'Accessories', 'Support'];

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '32px',
        padding: '20px 20px 10px 20px',
        borderBottom: '1px solid #e2e8f0',
        fontFamily: 'sans-serif',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}
    >
      {categories.map((category) => {
        const isActive = activeTab === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => setActiveTab(category)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              fontSize: '16px',
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#0b57d0' : '#444746',
              borderBottom: isActive ? '3px solid #0b57d0' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryNav;