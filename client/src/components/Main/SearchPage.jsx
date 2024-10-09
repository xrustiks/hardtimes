import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div className="search-page">
      <h1>Найденные цитаты:</h1>
    </div>
  )
}

export default SearchPage;