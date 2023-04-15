import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = () => {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate(); // TODO: Instead of using history had to use navigate hook

	const searchSubmitHandler = (e) => {
		e.preventDefault();

		if (keyword.trim()) {
			navigate(`/products/${keyword}`); //Look into this
		} else {
			navigate("/products");
		}
	};

	return (
		<>
			<MetaData title={`Search -- ECOMMERCE.`} />
			<form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="I'm just one search away..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
		</>
	);
};

export default Search;
