import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashlesson = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    // Fetch levels when the component mounts
    axios.get(`http://localhost:5000/levels/getBylanguage/${localStorage.getItem('language_id')}`)
      .then(response => {
        console.log(response.data.data)
        setLevels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching levels:', error);
      });
  }, []);

  useEffect(() => {
    console.log(selectedLevel);
    if (selectedLevel) {
      // Fetch lessons when the selectedLevel changes

     axios.get(`http://localhost:5000/lessons/getByLevel/${selectedLevel}`)
        .then(response => {
          console.log(response)
          setLessons(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching lessons:', error);
        });
    }
  }, [selectedLevel]);

  //  useEffect(() => {
    
  //     // Fetch lessons when the selectedLevel changes
  //     axios.get(`http://localhost:5000/lessons/getALL`)
  //       .then(response => {
  //         console.log(response);
  //         setLessons(response.data.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching lessons:', error);
  //       });
  //   }
  // );



 const handleLevelChange = (event) => {
  // Assuming that each option in the dropdown has a 'data-id' attribute containing the level ID
  const selectedLevelId = event.target.options[event.target.selectedIndex].id;
  console.log(selectedLevelId)
  setSelectedLevel(selectedLevelId);
  setSelectedLesson(null); // Reset selectedLesson when the level changes
}
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div>
      <div className="lesson-container">
       <select name="level" id="levels" className="dropdown-level" onChange={handleLevelChange}>
  <option value="Level">Level</option>
  {console.log(levels)}
  {levels.map((level) => (
    <option key={level.level_id} value={level.level_name} id={level.level_id}>
      {level.level_name}
    </option>
  ))}
</select>
        <div className="lessons">
          {lessons.map((lesson, index) => (
            <div className="lesson-row" key={index}>
              <p
                className="list-of-lessons"
                onClick={() => handleLessonClick(lesson)}
              >
                Lesson: {lesson.lesson_name}
              </p>
              <img className="svg-teach-dash" src="./Images/sign-out-svgrepo-com.svg" alt="Sign Out" />
              <img src="./Images/bin-svgrepo-com.svg" className="svg-teach-dash" alt="Bin" />
            </div>
          ))}
        </div>
        <h4 className="profile">Lesson</h4>
        <div className="line1"></div>
        <form action="" className="lesson-form">
          <label htmlFor="Title">Title:</label><br />
          <label htmlFor="Overview">Overview:</label>
          {selectedLesson && (
            <div>
              <p>{selectedLesson.lesson_name}</p>
              <p>{selectedLesson.overview}</p>
              {/* Add fields for editing the lesson */}
            </div>
          )}
        </form>
        <div className="line1"></div>
        <label className="input-lesson" htmlFor="lesson">Lesson:</label>
      </div>
    </div>
  );
};

export default Dashlesson;