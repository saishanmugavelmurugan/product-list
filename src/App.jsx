import React, { useState } from 'react';
import './App.css'
function App() {
  const categories = ['Vegetables', 'Meat', 'Furniture', 'Electronics', 'Clothing'];

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    description: '',
    canExpire: false,
    expiryDate: '',
    category: categories[0],
    price: '',
    onSpecial: false
  });
  const [filterCategory, setFilterCategory] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      description: '',
      canExpire: false,
      expiryDate: '',
      category: categories[0],
      price: '',
      onSpecial: false
    });
  };

  const editProduct = (id) => {
    const product = products.find(p => p.id === id);
    setNewProduct(product);
    deleteProduct(id);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = filterCategory ? products.filter(p => p.category === filterCategory) : products;

  return (
    <div className="App">
      <h1>Product List</h1>
      
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <label>
          Can Expire?
          <input
            type="checkbox"
            name="canExpire"
            checked={newProduct.canExpire}
            onChange={handleInputChange}
          />
        </label>
        {newProduct.canExpire && (
          <input
            type="date"
            name="expiryDate"
            value={newProduct.expiryDate}
            onChange={handleInputChange}
          />
        )}
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <label>
          On Special?
          <input
            type="checkbox"
            name="onSpecial"
            checked={newProduct.onSpecial}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={addProduct}>Add Product</button>
      </div>

      <div>
        <h2>Filter by Category</h2>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredProducts.map(product => (
          <li
            key={product.id}
            style={{
              backgroundColor: product.onSpecial ? 'yellow' : 'white'
            }}
          >
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            {product.canExpire && <p>Expiry Date: {product.expiryDate}</p>}
            <button onClick={() => editProduct(product.id)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
