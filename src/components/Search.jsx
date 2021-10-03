const Search = ({ setInputSearch }) => {
    return (
        <div style={{fontSize: "25px"}}>
            <label><b>Product search:</b> </label>
            <input type="search" placeholder="type product name" onChange={(e) => {
                setInputSearch(e.target.value);
            }} />
        </div>
    );
}

export default Search;