import React from "react";
import './App.css';
import Blog from "./Blog";
import Slok from "./Slok";
const Home = () => {
    return (
        <>
            <div className="main">
                <div className="header">Bhagwat Gita</div>
                <div className="main-body">
                    <div className="content">
                    <img src="/shreekrishna.png" alt="Krishna"></img>
                    <Blog></Blog>
                    </div>
                    <div className="aside"> <Slok></Slok></div>
                </div>
                <div className="footer">This project is created using the BhagavadGitaApi.</div>
            </div>
        </>
    )
}
export default Home;