import axios from "axios";
import {
	FETCH_PAYMENT_REQUEST,
	FETCH_PAYMENT_SUCCESS,
	FETCH_PAYMENT_FAILURE,
} from "../constants/paymentConstants";

export const processPayment =
	(amount, name, email, contact) => async (dispatch) => {
		try {
			dispatch({ type: FETCH_PAYMENT_REQUEST });

			const {
				data: { key },
			} = await axios.get("/api/v1/getRazorKey");

			const { data } = await axios.post("/api/v1/payment/process", { amount });

			const options = {
				key, // Enter the Key ID generated from the Dashboard
				amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
				currency: "INR",
				name: "Nanohard Corp",
				description: "Demo",
				image:
					"https://raw.githubusercontent.com/nan0hard/mernecommerce/master/frontend/src/images/logo.png",
				order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
				callback_url: "/api/v1/payment/verification",
				prefill: {
					name,
					email,
					contact,
				},
				notes: {
					address: "Nanohard Corporation Office",
				},
				theme: {
					color: "#FF6347",
				},
			};

			const razor = new window.Razorpay(options);
			razor.open();

			dispatch({
				type: FETCH_PAYMENT_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_PAYMENT_FAILURE,
				payload: error.response?.data?.error || "Something went wrong",
			});
		}
	};
