import React, { useState } from 'react'
import Button from '@mui/material/Button';
const excludedKeys = ["_id", "chapter", "verse", "slok", "transliteration"];

const Transaltion = (props) => {
  const [visibleSections, setVisibleSections] = useState([]);

  const toggleSection = (sectionName) => {
    if (visibleSections.includes(sectionName)) {
      setVisibleSections(visibleSections.filter((name) => name !== sectionName));
    } else {
      setVisibleSections([...visibleSections, sectionName]);
    }
  };

  const toggleSectionWithDelay = (sectionName) => {
    const delay = 200; // Change this to your desired delay time in milliseconds
    setTimeout(() => {
      toggleSection(sectionName);
    }, delay);
  };
  return (
    <>
      <h3>Translation By Different Author</h3>
      <div className="sideImg">
        {Object.entries(props.data).map(([sectionName, section]) => (
          !excludedKeys.includes(sectionName) && (

            <div key={sectionName}>

              <Button size="small" onClick={() => toggleSectionWithDelay(sectionName)}>
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
    </>
  )
}

export default Transaltion;