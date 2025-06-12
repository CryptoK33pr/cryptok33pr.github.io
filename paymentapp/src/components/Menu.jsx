import React, { useState } from 'react';

function Menu({ menuItems, addItemToCart }) {
  const [selectedId, setSelectedId] = useState('');
  const [milk, setMilk] = useState('whole');
  const [shots, setShots] = useState(0);

  // Find the selected menu item
  const selectedItem = menuItems.find(i => i.id === Number(selectedId));

  // Handle both boolean and string "true"/"false"
  const hasMilk = selectedItem && (selectedItem.milk_allowed === true || selectedItem.milk_allowed === "true");
  const hasShots = selectedItem && (selectedItem.shots_allowed === true || selectedItem.shots_allowed === "true");

  const handleAdd = () => {
    if (selectedItem) {
      addItemToCart(
        selectedItem,
        hasMilk ? milk : null,
        hasShots ? shots : 0
      );
    }
  };

  return (
    <div className="menu">
      <div className="menu-row">
        <label>
          <strong>Menu item:</strong>
          <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            <option value="">--Choose--</option>
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} (${item.price})
              </option>
            ))}
          </select>
        </label>
        <button
  className="button add-item"
  onClick={handleAdd}
  disabled={!selectedId}
>
  Add to Cart
</button>

      </div>

      {hasMilk && (
        <div className="menu-option">
          <label>
            Milk:
            <select value={milk} onChange={e => setMilk(e.target.value)}>
              <option value="whole">Whole</option>
              <option value="almond">Almond</option>
              <option value="oat">Oat</option>
            </select>
          </label>
        </div>
      )}

      {hasShots && (
  <div className="menu-option">
    <label>
      Extra Shots:
      <select value={shots} onChange={e => setShots(Number(e.target.value))}>
        {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </label>
  </div>
)}

    </div>
  );
}

export default Menu;
