import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";

const Contact = () => {
	return (
		<>
			<Helmet>
				<title>Wecare | Contact</title>
			</Helmet>
			<Header />
			<div className="contact">
				<div className="content-wrapper" id="contact">
					{/* <!-- Third replaceble image --> */}
					<img
						className="img-absolute"
						src="https://raw.githubusercontent.com/Jesus-E-Rodriguez/cityscapes-landing-page/master/img/city3.png"
						alt="City 3"
					/>

					{/* <!-- Custom form, important note: you will need additional code in order to make this form work --> */}
					<form
						className="contact-form astonish"
						style={{ marginTop: "90px" }}
						action="#"
						method="post"
					>
						<h2 className="section-title" style={{ fontSize: "3rem" }}>
							Contact Us
						</h2>
						<div className="grid">
							<div className="grid-col-sm-12 grid-col-md-6">
								<div className="form-group">
									<input type="text" name="firstName" required />
									<label htmlFor="firstName">First Name:</label>
								</div>
							</div>
							<div className="grid-col-sm-12 grid-col-md-6">
								<div className="form-group">
									<input type="text" name="lastName" required />
									<label htmlFor="lasttName">Last Name:</label>
								</div>
							</div>
							<div className="grid-col-sm-12">
								<div className="form-group">
									<input type="text" name="email" required />
									<label htmlFor="email">Email:</label>
								</div>
							</div>
							<div className="grid-col-sm-12">
								<div className="form-group">
									<textarea name="message" required></textarea>
									<label htmlFor="message">Message:</label>
								</div>
							</div>
						</div>
						<input
							className="btn btn-outline-teal"
							type="submit"
							value="Send"
						/>
					</form>
				</div>

				{/* <!-- This is an embedded Google map, this is easily customizable especially if you get a Google API key, this will allow for more customizable features. --> */}
				{/* eslint-disable-next-line */}
				<div className="mapouter">
					<div className="gmap_canvas">
						{/* eslint-disable-next-line */}
						<iframe
							className="gmap_iframe"
							width="100%"
							frameBorder="0"
							scrolling="no"
							marginHeight="0"
							marginWidth="0"
							src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Manav Rachna International Institute Of Research And Studies&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
						></iframe>
						<a href="https://mcpenation.com/">https://mcpenation.com</a>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
export default Contact;
