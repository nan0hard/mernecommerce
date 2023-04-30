import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
	createNewProduct,
	clearErrors,
} from "../../../redux/actions/productAction";
import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { CREATE_NEW_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import Loader from "../../layout/Loader/Loader";

import "./CreateProduct.css";

const CreateProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, success } = useSelector(
		(state) => state.createProduct
	);

	const [name, setName] = useState("");
	const [price, setPrice] = useState();
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = [
		"Electronics",
		"Footwear",
		"Clothing",
		"Jeans",
		"Smartphone",
		"Other",
	];

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success(`Product Created Successfully`);
			navigate("/admin/products");
			dispatch({ type: CREATE_NEW_PRODUCT_RESET });
		}
	}, [dispatch, error, success, navigate]);

	const createProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = { name, price, description, stock, category, images };
		dispatch(createNewProduct(myForm));
	};

	const createProductImagesChange = (e) => {
		const files = Array.from(e.target.files);
		setImages([]);
		setImagesPreview([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((old) => [...old, reader.result]);
					setImages((old) => [...old, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<MetaData title="Create a Product" />
			<div className="dashboard">
				<Sidebar />
				<div className="newProductContainer">
					<form
						className="createProductForm"
						encType="multipart/form-data"
						onSubmit={createProductSubmitHandler}
					>
						<h1>Create a Product</h1>

						<div>
							<SpellcheckIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div>
							<CurrencyRupeeIcon />
							<input
								type="number"
								placeholder="Price"
								required
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div>
							<DescriptionIcon />
							<textarea
								type="text"
								placeholder="Product Description"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								cols={30}
								rows={1}
							/>
						</div>

						<div>
							<AccountTreeIcon />
							<select onChange={(e) => setCategory(e.target.value)}>
								<option value="">Choose Category</option>
								{categories.map((cat) => (
									<option value={cat} key={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>

						<div>
							<StorageIcon />
							<input
								type="number"
								placeholder="Stock"
								required
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>

						<div id="createProductFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								multiple
								onChange={createProductImagesChange}
							/>
						</div>

						<div id="createProductFormImage">
							{imagesPreview.map((image, index) => (
								<img key={index} src={image} alt="Product Images Preview" />
							))}
						</div>

						<Button
							id="createProductBtn"
							type="submit"
							disabled={loading ? true : false}
						>
							Create
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateProduct;
