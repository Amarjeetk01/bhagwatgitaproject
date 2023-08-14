import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import './App.css';



const Slok = () => {
    const [chapter, setChapter] = useState(1);
    const [loading, setLoading] = useState(false);
    const [chapterData, setChapterData] = useState({
        slok: "",
        translationtej: "",
        translationsiva: "",
    });
    const [sloka,setSloka]=useState(1);
    const fetchData = useCallback(async () => {
        setLoading(true);
        const url = 'https://bhagavadgitaapi.in/slok/';
        const newUrl = `${url}${chapter}/${sloka}`;
        try {
            const response = await fetch(newUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setChapterData({
                slok: data.slok,
                translationtej: data.tej.ht,
                translationsiva: data.siva.et,               
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [chapter,sloka]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const chapterHandling = () => {
        let newChapter = chapter + 1;
        if (newChapter > 18) {
            alert("Chapter not found!");
            newChapter = 1;
        }
        setChapter(newChapter);
    };

    const chapterHandlingD = () => {
        let newChapter = chapter - 1;
        if (newChapter < 1) {
            alert("Chapter cannot be negative");
            newChapter = 1;
        }
        setChapter(newChapter);
    }
    const slokHandling = () => {
        let newslok = sloka + 1;
            
        setSloka(newslok);
    };

    const slokHandlingD = () => {
        let newslok = sloka - 1;
        if (newslok < 1) {
            alert("Slok no. cannot be negative");
            newslok = 1;
        }
        setSloka(newslok);
    }

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="blog-ch">
                    <div className="ch-n-p">
                    <span clas onClick={chapterHandlingD}> <i class="fa-solid fa-angles-left fa-beat-fade"></i>&#160; </span>
                    Chapter: {chapter}
                    <span onClick={chapterHandling} >&#160;<i class="fa-solid fa-angles-right fa-beat-fade"></i></span>
                    <span onClick={slokHandlingD} > <i class="fa-solid fa-angles-left fa-beat-fade"></i>&#160;</span>
                    Slok: {sloka}
                    <span onClick={slokHandling} >&#160;<i class="fa-solid fa-angles-right fa-beat-fade"></i></span>
                    </div>
                    <h2 className="blog-ch-p">||श्रीमद्‍भगवद्‍-गीता {chapter}.{sloka}||</h2>
                    
                    <div className="summaryBlog">
                        <b>।। {chapterData.slok} ।।</b>
                        <div className="long-line"></div>
                        <p className="summaryBlog">{chapterData.translationtej}</p>
                        <p className="summaryBlog">{chapterData.translationsiva}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slok;
