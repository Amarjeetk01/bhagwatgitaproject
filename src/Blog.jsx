import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import "./App.css"

import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import jsonData from "./Data/chapters/index.json"

const Blog = () => {
    const [chapterLeft,setChapterLeft]=useState(false);
    const [chapterRight,setChapterRight]=useState(true);
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
        setChapterLeft(true);
        let newChapter = chapter + 1;
        if (newChapter >= jsonData.length) {
            setChapterRight(false);
            newChapter = jsonData.length-1;
        }
        setChapter(newChapter);
    };

    const chapterHandlingD = () => {
        setChapterRight(true);
        let newChapter = chapter - 1;
        if (newChapter <= 0) {
            setChapterLeft(false);
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
                {chapterLeft ? (<IconButton onClick={chapterHandlingD}><ArrowLeftIcon /></IconButton>): (<></>)}
                Chapter: {jsonData[chapter].chapter_number}
                    {chapterRight ? (<IconButton onClick={chapterHandling}><ArrowRightIcon /></IconButton>):(<></>)}
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
