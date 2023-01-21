import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc, onSnapshot, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
	const [users, setuser] = useState([{}]);
	const [photo, setphot] = useState("");
	const [usersConsult, setuserConsult] = useState([]);
	const [doctor, setdoctor] = useState({
		Name: users.displayName,
		Uid: users.uid,
		Email: users.email,
		Phone: 0,
		Specialization: "",
		Gender: ""
	});
	const [getdatadoctor, setdatadoctor] = useState({});

	async function DoctorRegistration(e) {
		e.preventDefault();
		await setDoc(doc(db, "Doctor", doctor.Uid), doctor).then(() => {
			toast.success(' Profile Updated !!', {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}).catch((err) => {
			console.log(err);
		})
	}

	async function doctorgetdatafromfirestore() {
		const docRef = doc(db, "Doctor", users.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setdatadoctor(docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		// onSnapshot(doc(db, "Doctor", users.uid), (doc) => {
		// 	console.log(doc.data());
		// 	setdatadoctor(doc.data());
		// });
	}

	async function userDetails() {
		const querySnapshot = await getDocs(collection(db, "Patient"));
		querySnapshot.forEach((doc) => {

			setuserConsult([...usersConsult, usersConsult.push(doc.data())]);
		});
		console.log(usersConsult);
	}

	async function UserAuthdetails() {
		onAuthStateChanged(auth, (user) => {
			doctorgetdatafromfirestore();
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				setphot(user.photoURL);
				setdoctor({ ...doctor, Name: user.displayName, Email: user.email, Uid: user.uid });
				console.log(user);
				setuser(user);
				// ...
			} else {
				// User is signed out
				window.location.href = "/";
				// ...
			}
		});
	}

	useEffect(() => {
		userDetails();
	}, []);

	useEffect(() => {
		doctorgetdatafromfirestore();
		UserAuthdetails();
	}, [users]);
	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="main-dashboard">
				<div class="app">
					<header class="app-header">
						<div class="app-header-logo">
							<div class="logo">
								<span class="logo-icon">
									<img src={photo != null ? photo : "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} alt="profile" style={{ borderRadius: "100%" }} />
								</span>
								<h1 class="logo-title">
									<span>{users.displayName}</span>
								</h1>
							</div>
						</div>
					</header>
					<div class="app-body">
						<div class="app-body-navigation">
							<nav class="navigation">
								<a href="#">
									<i class="ph-browsers"></i>
									<span>Dashboard</span>
								</a>
								{/* <a href="#">
									<i class="ph-check-square"></i>
									<span>Event Scheduled</span>
								</a>
								<a href="#">
									<i class="ph-swap"></i>
									<span>Profile</span>
								</a> */}
								<a href="#" onClick={() => auth.signOut()}>
									<i class="ph-swap"></i>
									<span>Log Out</span>
								</a>
							</nav>
							<footer class="footer">
								<h1>
									Wecare<small>©</small>
								</h1>
								<div>
									Hackit ©<br />
									All Rights Reserved 2022
								</div>
							</footer>
						</div>
						<div class="app-body-main-content">
							<section class="service-section">
								<h2>Overview</h2>
								<div class="tiles">
									<article class="tile">
										<div class="tile-header">
											<i class="ph-lightning-light"></i>
											<h3>
												<span>Patient Alloted</span>
												<span style={{ textAlign: "center", fontSize: "40px", fontWeight: "700" }}>7</span>
											</h3>
										</div>
										<a href="#">
											<span>Go To Cases</span>
											<span class="icon-button">
												<i class="ph-caret-right-bold"></i>
											</span>
										</a>
									</article>
									<article class="tile">
										<div class="tile-header">
											<i class="ph-fire-simple-light"></i>
											<h3>
												<span>Patient Cured</span>
												<span style={{ textAlign: "center", fontSize: "40px", fontWeight: "700" }}>17</span>
											</h3>
										</div>
										<a href="#">
											<span>File Reports</span>
											<span class="icon-button">
												<i class="ph-caret-right-bold"></i>
											</span>
										</a>
									</article>
									<article class="tile">
										<div class="tile-header">
											<i class="ph-file-light"></i>
											<h3>
												<span>Reward Points</span>
												<span style={{ textAlign: "center", fontSize: "40px", fontWeight: "700" }}>63 ⭐</span>
											</h3>
										</div>
										<a href="#">
											<span>Claim Rewards</span>
											<span class="icon-button">
												<i class="ph-caret-right-bold"></i>
											</span>
										</a>
									</article>
								</div>
								<div class="service-section-footer">
									<p>
										Services are paid according to the current state
										of the currency and tariff.
									</p>
								</div>
							</section>
							<section class="transfer-section">
								<div class="transfer-section-header">
									<h2>Users Waiting</h2>
								</div>
								<div class="transfers">
									{usersConsult.map((item, i) => {
										if (i != usersConsult.length - 1) {
											return (
												<div class="transfer">
													<div class="">
														<img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" width={50} height={50} />
													</div>
													<dl class="transfer-details">
														<div>
															<dt>{item.Name}</dt>
															<dd>Name</dd>
														</div>
														<div>
															<dt>{item.Disease}</dt>
															<dd>Disease</dd>
														</div>
														<div>
															<dt>{item.Date}</dt>
															<dd>{usersConsult[i].Time}</dd>
														</div>
														<div>
															<dt>{item.Email}</dt>
															<dd>Email</dd>
														</div>
													</dl>
												</div>
											);
										}
									})}
									{/* <div class="transfer">
										<div class="">
											<img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" width={50} height={50} />
										</div>
										<dl class="transfer-details">
											<div>
												<dt>Warner Bros.</dt>
												<dd>Cinema</dd>
											</div>
											<div>
												<dt>2228</dt>
												<dd>Last four digits</dd>
											</div>
											<div>
												<dt>22 Oct. 21</dt>
												<dd>Date payment</dd>
											</div>
											<div>
												<dt>22 Oct. 21</dt>
												<dd>Time Requested</dd>
											</div>
										</dl>
									</div> */}
								</div>
							</section>
						</div>
						<div class="app-body-sidebar">
							<section class="payment-section">
								<h2>Profile</h2>
								<div class="payment-section-header">
									<p>details of your specializations</p>
									<div></div>
								</div>
								<div class="payments">
									<form action="#" onSubmit={DoctorRegistration}>
										<div class="user__details">
											<div class="input__box">
												<span class="details">Full Name</span>
												<input
													style={{ color: "white" }}
													type="text"
													value={users.displayName}
													disabled
												/>
											</div>
											<div class="input__box">
												<span class="details">Unique ID</span>
												<input
													style={{ width: "20rem", color: "white" }}

													type="text"
													value={users.uid}
													disabled
												/>
											</div>
											<div class="input__box">
												<span class="details">Email</span>
												<input
													type="email"
													style={{ width: "15rem", color: "white" }}
													value={users.email}
													disabled
												/>
											</div>
											<div class="input__box">
												<span class="details">Phone Number</span>
												<input
													type="tel"
													value={getdatadoctor.Phone != null ? getdatadoctor.Phone : null}
													placeholder="012-345-6789"
													onChange={(e) => { setdoctor({ ...doctor, Phone: e.target.value }) }}
													required
												/>
											</div>
											<div class="input__box">
												<span class="details">Specialization</span>
												<input
													type="text"
													placeholder="Specialization"
													value={getdatadoctor.Specialization != null ? getdatadoctor.Specialization : null}
													onChange={(e) => { setdoctor({ ...doctor, Specialization: e.target.value }) }}
													required
												/>
											</div>
											{/* <div class="input__box">
												<span class="details">
													Confirm Password
												</span>
												<input
													type="password"
													placeholder="********"
													required
												/>
											</div> */}
										</div>
										<div class="gender__details">
											<input type="radio" name="gender" id="dot-1" />
											<input type="radio" name="gender" id="dot-2" />
											<input type="radio" name="gender" id="dot-3" />
											<span class="gender__title">Gender</span>
											<div class="category">
												<label for="dot-1">
													<span class="dot one" onClick={() => { setdoctor({ ...doctor, Gender: "Male" }) }} ></span>
													<span>Male</span>
												</label>
												<label for="dot-2">
													<span class="dot two" onClick={() => { setdoctor({ ...doctor, Gender: "Female" }) }}></span>
													<span>Female</span>
												</label>
												<label for="dot-3">
													<span class="dot three" onClick={() => { setdoctor({ ...doctor, Gender: "Prefer not to say" }) }}></span>
													<span>Prefer not to say</span>
												</label>
											</div>
										</div>
										<div class="button">
											<input type="submit" value="Register" />
										</div>
									</form>
								</div>
								<div class="faq">
									<p>Please Fill above details carefully</p>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
