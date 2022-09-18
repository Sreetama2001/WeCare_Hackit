import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="mainfooter">
                <div className="content-wrapper-sm display-flex-between">
                    {/* <!-- Easily replaceble copyright information --> */}
                    <small>© {new Date().getFullYear()} , WeCare Copyright , All rights reserved </small>

                    {/* <!-- Make sure to edit the links so that they go to your social media. --> */}
                    <div className="social-links">
                        <h4>Made With ♥ By Team Hackit</h4>
                        <ul>
                            {/* eslint-disable-next-line */}
                            <li><a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                            {/* eslint-disable-next-line */}
                            <li><a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                            {/* eslint-disable-next-line */}
                            <li><a href="/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;