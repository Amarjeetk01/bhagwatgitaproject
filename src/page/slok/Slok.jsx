import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import Transaltion from "./slokCompoent/Transaltion";
import { PrevHandler, NextHandler } from "../../components/Handler";
import useFetchData from "../../useFetchData";
import "./style.css";
function SlokList() {



  const [chapterLeft, setChapterLeft] = useState(false);
  const [chapterRight, setChapterRight] = useState(true);
  const [slokLeft, setslokLeft] = useState(false);
  const [slokRight, setslokRight] = useState(true);
  const [chapter, setChapter] = useState(1);
  const [animate, setAnimation] = useState(false);
  const [sloka, setSloka] = useState(1);
  const { loading,data } = useFetchData(chapter, sloka);
  
  const chapterHandling = () => {
    setChapterLeft(true);
    let newChapter = chapter + 1;
    if (newChapter >= 18) {
      setChapterRight(false);
      newChapter = 18;
    }
    setAnimation(true);

    setChapter(newChapter);
    setSloka(1);
    setslokLeft(false);
    setslokRight(true);


  };

  const chapterHandlingD = () => {
    setChapterRight(true);
    let newChapter = chapter - 1;
    if (newChapter <= 1) {
      setChapterLeft(false);
      newChapter = 1;
    }
    setAnimation(true);

    setChapter(newChapter);
    setSloka(1);
    setslokLeft(false);


  }
  const slokcount = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
  const slokHandling = () => {
    setslokLeft(true);
    let newslok = sloka + 1;
    if (newslok >= slokcount[chapter - 1]) {
      setslokRight(false);
      newslok = slokcount[chapter - 1];
    }
    setAnimation(true);

    setSloka(newslok);
  };
  const slokHandlingD = () => {
    setslokRight(true);
    let newslok = sloka - 1;
    if (newslok <= 1) {
      setslokLeft(false);
      newslok = 1;
    }
    setAnimation(true);
    setSloka(newslok);

  }
  const tweetNow = () => {
    let tweet = `https://twitter.com/share?text=%7C%7C%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%AE%E0%A4%A6%E0%A5%8D%E0%A4%AD%E0%A4%97%E0%A4%B5%E0%A4%A6%E0%A5%8D%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A4%BE%20%7C%7C%20%0A%20${encodeURIComponent(data.slok)}`;

    window.open(tweet);
  };
  const onAnimationEnd = () => {
    setAnimation(false); // Disable animation after it ends
  };
  return (
    <div >
      {loading ? (
        <Spinner />
      ) : (
        <div className="blog-ch">
          <div className="buttonContainer">
          <div className="handlerCh">
            {chapterLeft ? (
              <PrevHandler onClick={chapterHandlingD} />
            ) : (
              <PrevHandler disabled />
            )}
            <span>Ch: {chapter}</span>
            {chapterRight ? (
              <NextHandler onClick={chapterHandling} />
            ) : (
              <NextHandler disabled />
            )}
            </div>
            <div className="handlerS">
            {slokLeft ? (
              <PrevHandler onClick={slokHandlingD} />
            ) : (<PrevHandler disabled onClick={slokHandlingD} />)}
            <span>Slok: {sloka}</span>
            {slokRight ? (
              <NextHandler onClick={slokHandling} />
            ) : (<NextHandler disabled onClick={slokHandling} />)}
            </div>
          </div>

          <h2 className="blog-ch-p">||श्रीमद्‍भगवद्‍-गीता {chapter}.{sloka}||</h2>
          <div className={`summaryBlog ${animate ? 'fade-in' : ''}`} onAnimationEnd={onAnimationEnd}>
            <b>।। {data.slok} ।।</b>
            <span target="_blank" data-size="large" rel="noopener noreferrer" className="twitter" onClick={tweetNow}>
              <i className="fa-brands fa-twitter fa-fade"></i>
            </span>
            <div className="long-line"></div>
          </div>
          
            <Transaltion data={data} />
          
        </div>
      )}
    </div>
  );
}
export default SlokList;