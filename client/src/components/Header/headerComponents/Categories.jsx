import { useState, useEffect, useContext } from 'react';

import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';

const Categories = () => {
  const [chosenCategory, setChosenCategory] = useContext(CategoriesContext);
  const [selectedCategory, setSelectedCategory] = useState('Выберите категорию');
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
    setSelectedCategory(e.target.value);
    // Transfer the selected category to Home
    setChosenCategory(e.target.value);
  };

  return (
    <div className="select-category">
      <select
        value={ selectedCategory } 
        onChange={ (e) => handleCategoryChange(e) }>
        {/* The very first option */}
        <option
          value="">
          Выберите категорию
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