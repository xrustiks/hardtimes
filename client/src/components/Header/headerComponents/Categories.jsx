import { useState, useEffect } from 'react';

import './Categories.css';

const Categories = ({ setSelectedCategory }) => {
  const [selectedCategory, setCategory] = useState('Choose category');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (!response.ok) {
          setMessage(result.message);
        } else {
          setCategories(result.categories);
        }
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    // Transfer the selected category to Home
    setSelectedCategory(category);
  };

  return (
    <div className="select-category">
      <select
        value={ selectedCategory } 
        onChange={ (e) => handleCategoryChange(e) }>
        <option
          value="default">
          { selectedCategory }
        </option>
        {/* Getting the list of categories */}
        { categories.map((category, index) => (
          <option
            key={ index }
            value={ category.category }>
            { category.category }
          </option>
        )) }
      </select>
    </div>
  );
};

export default Categories;