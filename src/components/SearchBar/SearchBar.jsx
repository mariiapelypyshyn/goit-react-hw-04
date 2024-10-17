import { useState } from "react";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query.trim() === "") {
            toast.error("Please enter a search term!");
            return;
        }

        onSearch(query);
        setQuery("");
    };

    return (
      <header className={css.header}>
            <form className={css.searchForm } onSubmit={handleSubmit}>
          <input className={css.searchInput} type="text" value={query} onChange={(e) => setQuery(e.target.value) } placeholder="Search images and photos"/>
                <button className={css.searchBtn } type="submit">Search</button>
      </form>
            <Toaster position="top-right" reverseOrder={false} />
           </header>
  )
}

export default SearchBar;
