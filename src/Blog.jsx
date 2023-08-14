import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import './App.css';
import Button from '@mui/material/Button';

const Blog = () => {
    const [chapter, setChapter] = useState(1);
    const [loading, setLoading] = useState(false);
    const [chapterData, setChapterData] = useState({
        name: "",
        meaningHi: "",
        meaningEn: "",
        summaryHi: "",
        summaryEn: ""
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        const url = 'https://bhagavadgitaapi.in/chapter/';
        const newUrl = `${url}${chapter}`;
        try {
            const response = await fetch(newUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            

            setChapterData({
                name: data.name,
                meaningHi: data.meaning.hi,
                meaningEn: data.meaning.en,
                summaryHi: data.summary.hi,
                summaryEn: data.summary.en
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [chapter]);

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

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="blog-ch">
                    <Button variant="text" onClick={chapterHandlingD}>
                        <i className="fa-solid fa-chevron-left fa-beat-fade"></i>
                    </Button>
                    Chapter: {chapter}
                    <Button variant="text" onClick={chapterHandling}>
                        <i className="fa-solid fa-chevron-right fa-beat-fade"></i>
                    </Button>
                    <h1>{chapterData.name}</h1>
                    <p className="blog-ch-p">{chapterData.meaningHi}</p>
                    <p className="blog-ch-p">{chapterData.meaningEn}</p>
                    <div className="summaryBlog">
                        <p>{chapterData.summaryHi}</p>
                        <div className="long-line"></div>
                        <p>{chapterData.summaryEn}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
