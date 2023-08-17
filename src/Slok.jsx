import React, { useEffect, useState, useCallback } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Spinner from "./Spinner";


const excludedKeys = ["_id", "chapter", "verse", "slok", "transliteration"];

function SlokList ()  {

  const [chapterLeft, setChapterLeft] = useState(false);
  const [chapterRight, setChapterRight] = useState(true);
  const [slokLeft, setslokLeft] = useState(false);
  const [slokRight, setslokRight] = useState(true);
  const [chapter, setChapter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chapterData, setChapterData] = useState({
    slok: "",
    translation: "",
    object: '',
  });
  const [sloka, setSloka] = useState(1);
  const [visibleSections, setVisibleSections] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const url = `./Data/sloka/${chapter}/${sloka}`;
    try {
      const jsonData = await require(`${url}/index.json`);
      setChapterData({
        object: jsonData,
        slok: jsonData.slok,
        translation: jsonData.transliteration,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }

  }, [chapter, sloka]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chapterHandling = () => {
    setChapterLeft(true);
    let newChapter = chapter + 1;
    if (newChapter >= 18) {
      setChapterRight(false);
      newChapter = 18;
    }
    setChapter(newChapter);

  };

  const chapterHandlingD = () => {
    setChapterRight(true);
    let newChapter = chapter - 1;
    if (newChapter <= 1) {
      setChapterLeft(false);
      newChapter = 1;
    }
    setChapter(newChapter);

  }

  const slokcount = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

  const slokHandling = () => {
    setslokLeft(true);
    let newslok = sloka + 1;
    if(newslok>=slokcount[chapter-1]){
      setslokRight(false);
      newslok=slokcount[chapter-1];
    }
    setSloka(newslok);
  };




  const slokHandlingD = () => {
    setslokRight(true);
    let newslok = sloka - 1;
    if (newslok <= 1) {
      setslokLeft(false);
      newslok = 1;
    }
    setSloka(newslok);

  }

  const toggleSection = (sectionName) => {
    if (visibleSections.includes(sectionName)) {
      setVisibleSections(visibleSections.filter((name) => name !== sectionName));
    } else {
      setVisibleSections([...visibleSections, sectionName]);
    }
  };




  return (
    <div >
      {loading ? (
        <Spinner />
      ) : (
        <div className="blog-ch">
          <div className="buttonContainer">
            {chapterLeft && <IconButton onClick={chapterHandlingD}><ArrowLeftIcon /></IconButton>}
            Ch: {chapter}
            {chapterRight && <IconButton onClick={chapterHandling}><ArrowRightIcon /></IconButton>}
            {slokLeft && (
              <IconButton onClick={slokHandlingD}>
                <ArrowLeftIcon />
              </IconButton>
            )}
            Slok: {sloka}
            {slokRight && (
              <IconButton onClick={slokHandling}><ArrowRightIcon /></IconButton>
            )}
            
          </div>

          <h2 className="blog-ch-p">||श्रीमद्‍भगवद्‍-गीता {chapter}.{sloka}||</h2>
          <div className="summaryBlog">
            <b>।। {chapterData.slok} ।।</b>
            <div className="long-line"></div>
          </div>

          <h3>Translation By Different Author</h3>
          {Object.entries(chapterData.object).map(([sectionName, section]) => (
            !excludedKeys.includes(sectionName) && (

              <div key={sectionName}>

                <Button size="small" onClick={() => toggleSection(sectionName)}>
                  {visibleSections.includes(sectionName) ? 'Hide' : 'Show'} {sectionName}
                </Button>
                {visibleSections.includes(sectionName) && (
                  <div className="authorContent">
                    {/* <h2>{sectionName}</h2> */}
                    <ul>
                      {Object.entries(section).map(([contentName, content]) => (
                        <li key={contentName}>{content}
                          <div className="long-line"></div>
                        </li>

                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default SlokList;
