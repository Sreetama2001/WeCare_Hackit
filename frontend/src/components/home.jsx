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
					<h1>Feeling ill..?</h1>
					<h1> Get your Health & Mood check up </h1>
					<div>
						<Link to="/chatbot">
							<button className="btn" style={{ margin: "20px" }}>
								Health 
							</button>
						</Link>
						<Link to="/funbot">
							<button className="btn" style={{ margin: "20px" }}>
								Mood
							</button>
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Home;
