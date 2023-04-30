import React from "react";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./About.css";

const About = () => {
	const visitLinkedIn = () => {
		window.location = "https://www.linkedin.com/in/nanohard/";
	};
	return (
		<div className="aboutSection">
			<div></div>
			<div className="aboutSectionGradient"></div>
			<div className="aboutSectionContainer">
				<Typography component="h1">About Us</Typography>

				<div>
					<div>
						<Avatar
							style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
							src="https://res.cloudinary.com/dqxxkqbkf/image/upload/v1676399159/tb7lkeoztha0ifgdihw5.jpg"
							alt="Founder"
						/>
						<Typography>Nitish Singh</Typography>
						<Button onClick={visitLinkedIn} color="primary">
							Visit LinkedIn
						</Button>
						<span>
							This website is designed by @nan0hard using MERN stack and has all
							the functionalites of an ecommerce app. Wanna connect?
						</span>
					</div>
					<div className="aboutSectionContainer2">
						<Typography component="h2">Find me On</Typography>
						<a href="https://github.com/nan0hard" target="blank">
							<GitHubIcon className="githubSvgIcon" />
						</a>

						<a href="https://www.linkedin.com/in/nanohard/" target="blank">
							<LinkedInIcon className="linkedInSvgIcon" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
