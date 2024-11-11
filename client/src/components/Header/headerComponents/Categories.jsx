import { useState, useEffect } from 'react';

import makeTitle from "../../../utils/makeTitle.js";
import './Categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose category');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    makeTitle("Избранное");

    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getCategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (!response.ok) {
          setMessage(result.message);
        } else {
          console.log('Categories fetched:', result.categories);
          setCategories(result.categories);
        }
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="select-category">
      <select 
        value={ selectedCategory } 
        onChange={ (e) => setSelectedCategory(e.target.value) }>
        <option value="default">
          { selectedCategory }
        </option>
        {/* List of categories */}
        { categories.map((category, index) => (
          <option key={ index } value={ category.category }>
            { category.category }
          </option>
        )) }
      </select>
    </div>
  );
};

export default Categories;