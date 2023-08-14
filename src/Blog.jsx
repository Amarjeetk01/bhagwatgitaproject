import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import './App.css';
import Button from '@mui/material/Button';
import jsonData from "./Data/chapters/index.json"

const Blog = () => {
    const [chapter, setChapter] = useState(0);
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
        try {
            const data=jsonData[chapter];
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
        if (newChapter >= jsonData.length) {
            alert("Chapter not found!");
            newChapter = jsonData.length-1;
        }
        setChapter(newChapter);
    };

    const chapterHandlingD = () => {
        let newChapter = chapter - 1;
        if (newChapter < 0) {
            alert("Chapter cannot be negative");
            newChapter = 0;
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
                    Chapter: {jsonData[chapter].chapter_number}
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
