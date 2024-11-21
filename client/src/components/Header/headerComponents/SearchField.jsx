import './SearchField.css';

const SearchField = () => {
  return (
    <div className="search-field">
        <form action="/search" method="GET">
          <input type="search" name="query" placeholder="Поиск цитаты" required />
        </form>
    </div>
  )
}

export default SearchField;