import {BsSearch} from "react-icons/bs"
import {useState} from "react"


function Search({setSearchText, searchText}) {
    const [isSearchOpen, setIsSearchOpen] = useState(true);

    function toggleSearch() {
      setIsSearchOpen(prevState => !prevState);
    }
    function handleChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <div className="search-bar-container">
      <div
          className="search-bar" >
          <input
            type="text"
            className="search-bar__input"
            style={{ width: isSearchOpen ? "200px" : "0", 
            visibility: isSearchOpen ? "visible" : "hidden" }}
            placeholder="Search Recipes"
            onChange={handleChange}
            value={searchText}/>
            <button className="search-bar__submit" onClick={toggleSearch}>
              <i className="fas fa-search"><BsSearch /></i>
            </button>
      </div>
    </div>
  );
}

export default Search;