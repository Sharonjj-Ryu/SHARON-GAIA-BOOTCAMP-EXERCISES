import { useState } from 'react';

const initialItems = [
  { id: 1, name: 'Apple', category: 'fruit' },
  { id: 2, name: 'Carrot', category: 'vegetable' },
  { id: 3, name: 'Banana', category: 'fruit' },
];

function DynamicList() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');

  const handleListClick = (e) => {
    const listItem = e.target.closest('li');
    if (!listItem) return;

    const itemId = Number(listItem.dataset.id);
    const action = e.target.dataset.action;

    if (action === 'delete') {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } else if (action === 'edit') {
      const newName = window.prompt('Enter new name:');
      if (newName) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, name: newName } : item,
          ),
        );
      }
    }
  };

  const addItem = () => {
    const trimmedItem = newItem.trim();
    if (!trimmedItem) return;

    const item = {
      id: Date.now(),
      name: trimmedItem,
      category: 'unknown',
    };

    setItems((prevItems) => [...prevItems, item]);
    setNewItem('');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button type="button" onClick={addItem}>Add</button>
      </div>
      <ul onClick={handleListClick} style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            data-id={item.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              margin: '5px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              {item.name} - {item.category}
            </span>
            <div>
              <button type="button" data-action="edit">Edit</button>
              <button type="button" data-action="delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicList;
