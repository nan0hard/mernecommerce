import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
	const searchQuery = useSearchParams()[0];

	const referenceNum = searchQuery.get("reference");
	return (
		<div>
			<h2>{`Reference id: ${referenceNum}`}</h2>
		</div>
	);
};

export default PaymentSuccess;
