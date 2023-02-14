function Search({setSearchText, searchText}){

    function handleChange(e){
        setSearchText(e.target.value)
    }

    return(
        <div className="search">
            <form className="searchbar">
                <input type="text" placeholder="Search Recipes" onChange={handleChange} value={searchText} />
            </form>
        </div>
    )
}

export default Search