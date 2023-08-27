import React, { useEffect, useState, useCallback } from "react";
import "./style.css";
import Spinner from "../../components/Spinner";
import jsonData from "../../Data/chapters/index.json"
import { PrevHandler, NextHandler } from "../../components/Handler";

const Blog = () => {
    const [chapterLeft, setChapterLeft] = useState(false);
    const [chapterRight, setChapterRight] = useState(true);
    const [chapter, setChapter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [animate, setAnimation] = useState(false);
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
            
            const data = jsonData[chapter];
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
        if (newChapter >= jsonData.length - 1) {
            setChapterRight(false);
            newChapter = jsonData.length - 1;
        }
        setAnimation(true);
        setChapter(newChapter);
    };

    const chapterHandlingD = () => {
        setChapterRight(true);
        let newChapter = chapter - 1;
        if (newChapter <= 0) {
            setChapterLeft(false);
            newChapter = 0;
        }
        setAnimation(true);
        setChapter(newChapter);
    }

    const onAnimationEnd = () => {
        setAnimation(false); // Disable animation after it ends
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                
                <div className="blog-ch">

                    {chapterLeft ? (<PrevHandler onClick={chapterHandlingD} />) : (<PrevHandler disabled onClick={chapterHandlingD} />)}
                    Chapter: {jsonData[chapter].chapter_number}

                    {chapterRight ? (<NextHandler onClick={chapterHandling} />) : (<NextHandler disabled onClick={chapterHandling} />)}
                    <div className={`${animate ? 'fade-in' : ''}`} onAnimationEnd={onAnimationEnd}>
                        <h1>{chapterData.name}</h1>
                        <p className="blog-ch-p">{chapterData.meaningHi}</p>
                        <p className="blog-ch-p">{chapterData.meaningEn}</p>

                        
                        <div className="summaryBlog">
                            
                                <p>{chapterData.summaryHi}</p>
                                <div className="long-line"></div>
                                <p>{chapterData.summaryEn}</p>
                            </div>
                        </div>
                    </div>
                
            )}
        </div>
    );
};

export default Blog;
