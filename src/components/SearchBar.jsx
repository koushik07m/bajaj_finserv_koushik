import React from "react";

const SearchBar = ({ search, setSearch, doctors, suggestions, setSuggestions }) => {
  return (
    <>
      <input
        data-testid="autocomplete-input"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value.length > 0) {
            const matches = doctors
              .filter((d) =>
                d.name.toLowerCase().includes(e.target.value.toLowerCase())
              )
              .slice(0, 3);
            setSuggestions(matches);
          } else {
            setSuggestions([]);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSuggestions([]);
        }}
      />
      <div>
        {suggestions.map((s) => (
          <div
            key={s.id}
            data-testid="suggestion-item"
            onClick={() => {
              setSearch(s.name);
              setSuggestions([]);
            }}
          >
            {s.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
