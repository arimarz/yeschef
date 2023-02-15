function Search({setSearchText, searchText}){

    function handleChange(e){
        setSearchText(e.target.value)
    }

    return(
        <div className="search">
            <form>
                <input type="text" className="searchbar" placeholder="Search Recipes" onChange={handleChange} value={searchText} />
            </form>
        </div>
    )
}

export default Search