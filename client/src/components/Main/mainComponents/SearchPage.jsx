import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import makeTitle from "../../../utils/makeTitle.js";

const SearchPage = () => {
  // Making title for the component
  useEffect(() => {
    makeTitle("Поиск");
  }, [])

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div className="search-page">
      <h1>Найденные цитаты:</h1>
    </div>
  )
}

export default SearchPage;