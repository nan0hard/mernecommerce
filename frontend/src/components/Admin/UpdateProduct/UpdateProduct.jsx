import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
	updateProduct,
	getProductDetails,
	clearErrors,
} from "../../../redux/actions/productAction";
import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import Loader from "../../layout/Loader/Loader";

const UpdateProduct = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.product);

	const { error, product } = useSelector((state) => state.productDetails);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
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
		if (product && product._id !== id) {
			dispatch(getProductDetails(id));
		} else {
			setName(product.name);
			setDescription(product.description);
			setPrice(product.price);
			setCategory(product.category);
			setStock(product.stock);
			setOldImages(product.images);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			toast.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			toast.success(`Product Updated Successfully`);
			navigate("/admin/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [dispatch, error, isUpdated, id, navigate, product, updateError]);

	const updateProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = { name, price, description, stock, category, images };

		// const myForm = new FormData();
		// myForm.set("name", name);
		// myForm.set("price", price);
		// myForm.set("description", description);
		// myForm.set("category", category);
		// myForm.set("stock", stock);
		// let img = [];

		// images.forEach((image) => {
		// 	myForm.append("images", image);
		// });

		// console.log(myForm);

		dispatch(updateProduct(id, myForm));
	};

	const updateProductImagesChange = (e) => {
		const files = Array.from(e.target.files);
		setImages([]);
		setImagesPreview([]);
		setOldImages([]);

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
			<MetaData title="Update Product" />
			<div className="dashboard">
				<Sidebar />
				<div className="newProductContainer">
					<form
						className="createProductForm"
						encType="multipart/form-data"
						onSubmit={updateProductSubmitHandler}
					>
						<h1>Update Product</h1>

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
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
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
								value={stock}
							/>
						</div>

						<div id="createProductFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								multiple
								onChange={updateProductImagesChange}
							/>
						</div>

						<div id="createProductFormImage">
							{oldImages &&
								oldImages.map((image, index) => (
									<img key={index} src={image.url} alt="Old Product Preview" />
								))}
						</div>

						<div id="createProductFormImage">
							{imagesPreview.map((image, index) => (
								<img key={index} src={image} alt="Product Preview" />
							))}
						</div>

						<Button
							id="createProductBtn"
							type="submit"
							disabled={loading ? true : false}
						>
							Update
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateProduct;
