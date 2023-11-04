import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashlesson = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newLessonData, setNewLessonData] = useState({
    lesson_name: '',
    overview: '',
    content: '',
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/levels/getBylanguage/${localStorage.getItem('language_id')}`)
      .then(response => {
        setLevels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching levels:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedLevel) {
      axios.get(`http://localhost:5000/lessons/getByLevel/${selectedLevel}`)
        .then(response => {
          setLessons(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching lessons:', error);
        });
    }
  }, [selectedLevel]);

  const handleLevelChange = (event) => {
    const selectedLevelId = event.target.options[event.target.selectedIndex].id;
    setSelectedLevel(selectedLevelId);
    setSelectedLesson(null);
  }

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setNewLessonData({
      lesson_name: lesson.lesson_name,
      overview: lesson.overview,
      content: lesson.content,
    });
  };

  const handleDeleteLesson = (id) => {
    axios.delete(`http://localhost:5000/lessons/delete/${id}`)
      .then(response => {
        setLessons(lessons.filter(lesson => lesson.lesson_id !== id));
      })
      .catch(error => {
        console.error('Error deleting lesson:', error);
      });
  };

  const handleAddOrUpdateLesson = () => {
    if (!selectedLevel) {
      alert('Please select a level before adding or updating a lesson.');
      return;
    }

    if (selectedLesson === null) {
      axios.post('http://localhost:5000/lessons/add', {
        ...newLessonData,
        level_id: selectedLevel,
      })
      .then(response => {
        setLessons([...lessons, response.data.data]);
        setNewLessonData({
          lesson_name: '',
          overview: '',
          content: '',
        });
        setAlertMessage('Lesson added successfully');
        setShowSuccessAlert(true);
      })
      .catch(error => {
        console.error('Error adding lesson:', error);
      });
    } else {
      // Handle updating an existing lesson here
    }
  };

  useEffect(() => {
    if (showSuccessAlert) {
      alert(alertMessage);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  }, [showSuccessAlert, alertMessage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLessonData({
      ...newLessonData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="lesson-container">
        <select name="level" id="levels" className="dropdown-level" onChange={handleLevelChange}>
          <option value="Level">Level</option>
          {levels.map((level) => (
            <option key={level.level_id} value={level.level_name} id={level.level_id}>
              {level.level_name}
            </option>
          ))}
        </select>
        <div className="lessons">
          {lessons.map((lesson, index) => (
            <div className="lesson-row" key={index}>
              <p className="list-of-lessons" onClick={() => handleLessonClick(lesson)}>
                {lesson.lesson_name}
              </p>
              <img
                className="svg-teach-dash"
                src="./Images/sign-out-svgrepo-com.svg"
                alt="Sign Out"
              />
              <img
                src="./Images/bin-svgrepo-com.svg"
                className="svg-teach-dash"
                alt="Bin"
                onClick={() => handleDeleteLesson(lesson.lesson_id)}
              />
            </div>
          ))}
        </div>
        <h4 className="profile">Lesson</h4>
        <div className="line1"></div>
        <form action="" className="lesson-form">
          <label htmlFor="lesson_name">Lesson Name:</label>
          <input
            type="text"
            name="lesson_name"
            value={newLessonData.lesson_name}
            onChange={handleInputChange}
          /><br />
          <label htmlFor="overview">Overview:</label>
          <input
            type="text"
            name="overview"
            value={newLessonData.overview}
            onChange={handleInputChange}
          /><br />
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            name="content"
            value={newLessonData.content}
            onChange={handleInputChange}
          /><br />
          <button type="button" onClick={handleAddOrUpdateLesson}>
            {selectedLesson ? 'Update Lesson' : 'Add New Lesson'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashlesson;
