import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<>
			<Helmet>
				<title>Wecare | About</title>
			</Helmet>
			<Header />
			< div className="about">	
			<div className="content-wrapper " id="about">
				{/* <!-- second replaceble image --> */}
				<img
					className="img-absolute"
					src="https://raw.githubusercontent.com/Jesus-E-Rodriguez/cityscapes-landing-page/master/img/city2.png"
					alt="City 2"
				/>
				<div className="grid" style={{ marginTop: "90px" }}>
					<div
						className="grid-col-sm-12 grid-col-md-6 astonish"
					>
						<h2 className="section-title" style={{ fontSize: "3rem" }}>About Wecare</h2>
						<p>
							Compassion , expertise and experience are qualities to look for when choosing a care team for your
							child , adolescent or young adult with cancer Trust us to provide comprehensive health care check up 
							and treatment
						</p>
						<p>
							Rely on our specialists to know the difference between childhood and adult diseases. They
							understand which treatments are most successful for younger patients and will deliver follow - up care
							after treatment .
						</p>
						<p>
							When you Wecare for care , your child will get care at our Pediatric Blood &
							Center . The center focuses on treating children , teens and young adults . Your child will receive
							care at the only academic medical center in San Antonio Our doctors know the most advanced
							treatment options and can provide the best medical care possible
						</p>
					</div>
				</div>
			</div>

			<div
				id="reserve"
				className="content-wrapper-lg text-center astonish"
			>
				<h2 className="section-title" style={{ fontSize: "2.5rem" }}>Explore Our AI-BOT</h2>
				<p>
					Over the past years, smart algorithm-powered, text- or voice-based interfaces have multiplied, and they are also taking their place in healthcare. The Medical Futurist believes Molly, Ginger, Replika and the others will ease the burden on doctors in primary care and help patients learn to take care of their health responsibly
				</p>
				<Link to={"/chatbot"}>

					<a
						className="btn btn-outline-purple"
						target="_blank"
					>
						Try Now
					</a>
				</Link>
			</div>
			</div>
			<Footer />

		</>
	);
};
export default About;
