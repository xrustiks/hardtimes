import './SearchField.css';

const SearchField = () => {
  return (
    <div className="search-field">
        <form action="/search" method="GET">
          <input type="search" name="query" placeholder="Введите ключевые слова..." required />
          <button type="submit">Поиск</button>
        </form>
    </div>
  )
}

export default SearchField;