import { useState } from 'react';

import './Categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose category');

  return (
    <div className="select-category">
      <select value={ selectedCategory } onChange={ (e) => setSelectedCategory(e.target.value) }>
        <option value="default">
          { selectedCategory }
        </option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>
    </div>
  )
}

export default Categories;