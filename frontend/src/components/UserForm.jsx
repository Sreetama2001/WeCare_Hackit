import React, { useEffect, useState } from 'react'
// import "../assets/scss/components/userform.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase';
import Header from './header';
import Footer from './footer';
const UserForm = () => {
    const [user, setuser] = useState({
        Name: "",
        Email: "",
        Disease: "",
        Date: "",
        Time: "",
    });

    const handleUserDoc = (e) => {
        e.preventDefault();
        addDoc(collection(db, "Patient"), user).then(() => {
            toast.success('Appoinment Booked !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((err) => {
            console.log(err);
        });

        setuser({
            Name: "",
            Email: "",
            Disease: "",
            Date: "",
            Time: "",
        });
        setTimeout(() => {
            window.location.href = "/";
        }, 3000)
    }


    return (
        <>
            <Header />
            <div className='main-user' style={{paddingTop: "200px" , paddingBottom: "100px"}}>
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
                <div class="container" style={{ background: "#c4ac8c" }}>
                    <div class="card">
                        <div class="card-image">
                            <h2 class="card-heading">
                                Get started
                                <small>Let's Book your Appointment</small>
                            </h2>
                        </div>
                        <form class="card-form" onSubmit={handleUserDoc}>
                            <div class="input">
                                <input type="text" class="input-field" onChange={(e) => { setuser({ ...user, Name: e.target.value }) }} required />
                                <label class="input-label">Full name</label>
                            </div>
                            <div class="input">
                                <input type="email" onChange={(e) => { setuser({ ...user, Email: e.target.value }) }} class="input-field" required />
                                <label class="input-label"  >Email</label>
                            </div>
                            <div class="input">
                                <input type="text" onChange={(e) => { setuser({ ...user, Disease: e.target.value }) }} class="input-field" required />
                                <label class="input-label">Disease</label>
                            </div>
                            <div class="input">
                                <input type="date" onChange={(e) => { setuser({ ...user, Date: e.target.value }) }} class="input-field" required />
                                <label class="input-label">Date</label>
                            </div>
                            <div class="input">
                                <input type="time" onChange={(e) => { setuser({ ...user, Time: e.target.value }) }} class="input-field" required />
                                <label class="input-label">Time</label>
                            </div>
                            <div class="action">
                                <button class="action-button" type='submit'>Book Your Slot</button>
                            </div>
                        </form>
                        <div class="card-info">
                            <p>By signing up you are agreeing to our <a href="#">Terms and Conditions</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserForm