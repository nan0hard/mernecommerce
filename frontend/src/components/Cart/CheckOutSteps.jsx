import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeStep }) => {
	const steps = [
		{
			label: <Typography>Shipping Details</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confirm Your Order</Typography>,
			icon: <LibraryAddCheckIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <AccountBalanceIcon />,
		},
	];

	const stepStyles = {
		boxSizing: "border-box",
	};

	return (
		<>
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				style={stepStyles}
				className="stepper"
			>
				{steps.map((step, index) => (
					<Step
						key={index}
						active={activeStep === index ? true : false}
						completed={activeStep >= index ? true : false}
					>
						<StepLabel
							icon={step.icon}
							style={{
								color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.65)",
							}}
						>
							{step.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</>
	);
};

export default CheckOutSteps;
