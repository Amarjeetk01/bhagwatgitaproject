import React, { useState } from "react";
import "./style.css";
import Spinner from "../../components/Spinner";
import { PrevHandler, NextHandler } from "../../components/Handler";
import useFetchData from "../../useFetchData";


const Blog = () => {
    const [chapterLeft, setChapterLeft] = useState(false);
    const [chapterRight, setChapterRight] = useState(true);
    const [chapter, setChapter] = useState(1);
    // const [loading, setLoading] = useState(false);
    const [animate, setAnimation] = useState(false);
    const {loading, data}=useFetchData(chapter);   
    const chapterHandling = () => {
        setChapterLeft(true);
        let newChapter = chapter + 1;
        if (newChapter >=18) {
            setChapterRight(false);
            newChapter = 18;
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
                    Chapter: {data?.chapter_number}
                    {chapterRight ? (<NextHandler onClick={chapterHandling} />) : (<NextHandler disabled onClick={chapterHandling} />)}
                    <div className={`${animate ? 'fade-in' : ''}`} onAnimationEnd={onAnimationEnd}>
                        <h1>{data?.name}</h1>
                        <p className="blog-ch-p">{data?.meaning?.hi}</p>
                        <p className="blog-ch-p">{data?.meaning?.en}</p>                        
                        <div className="summaryBlog">                            
                                <p>{data?.summary?.hi}</p>
                                <div className="long-line"></div>
                                <p>{data?.summary?.hi}</p>
                            </div>
                        </div>
                    </div>                
            )}
        </div>
    );
};

export default Blog;
