import "./SearchComponent.css";

const SearchComponent = ({onSearch = (value:string) => {}}) => {
  return (
    <div className="search__container">
      <label className="search__label">
        <img src={require("../../images/search.svg").default} width={15} />
        <input placeholder={"Я ищу..."} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSearch(e.target.value);
        }} />
      </label>
      {/* <button className="burger__button">
        <img src={require("../../images/burger.svg").default} />
      </button> */}
    </div>
  );
};

export default SearchComponent;
