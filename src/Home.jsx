import React from "react";
import "./App.css"

import Blog from "./page/chapter/Blog";
import SlokList from "./page/slok/Slok";


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
                    <div className="aside">
                     <SlokList></SlokList>                  
                     </div>
                </div>
                <div className="footer"><span className="footer-p">This project is created using the BhagavadGitaApi.</span></div>
            </div>
        </>
    )
}
export default Home;
