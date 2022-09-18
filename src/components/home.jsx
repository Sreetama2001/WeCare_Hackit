import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";


const Home = () => {
	return (
		<>
		    <Helmet>
				<title>Wecare | Home</title>
			</Helmet>
			<Header />

			{/* <!-- Main Navigation --> */}
			{/* <Header /> */}
			{/* <!-- Main header --> */}

			<section className="hero-section">
				<div className="hero-content">
					<h1>Felling ill..!</h1>
					<h1> No worries, Chat with our MedBot </h1>
					<Link to="/chatbot">
						<button className='btn'>Chat Now</button>
					</Link>
				</div>
			</section>
			<Footer />

		</>
	);
};

export default Home;
