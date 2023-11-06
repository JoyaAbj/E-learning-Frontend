import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashlesson = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lesson_name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [content, setContent] = useState('');
  const [editLesson, setEditLesson] = useState(null);
  const [lessonAddedMessage, setLessonAddedMessage] = useState('');
  const [lessonUpdatedMessage, setLessonUpdatedMessage] = useState('');

  useEffect(() => {
    // Fetch levels when the component mounts
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
      // Fetch lessons when the selectedLevel changes
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
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setEditLesson(lesson);
  };

  const handleAddLesson = () => {
    const newLesson = {
      lesson_name: lesson_name,
      overview: overview,
      content: content,
      level_id: selectedLevel,
    };

    axios.post('http://localhost:5000/lessons/add', newLesson)
      .then(response => {
        console.log('Lesson added successfully');
        setLessonAddedMessage('Lesson added successfully');
        setName('');
        setOverview('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding lesson:', error);
      });
  };

  const handleDeleteLesson = (lessonId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lesson?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/lessons/delete/${lessonId}`)
        .then(response => {
          console.log('Lesson deleted successfully');
          setLessons(lessons.filter(lesson => lesson.lesson_id !== lessonId));
        })
        .catch(error => {
          console.error('Error deleting lesson:', error);
        });
    }
  };

  const handleSaveLesson = () => {
    axios.put(`http://localhost:5000/lessons/update/${editLesson.lesson_id}`, editLesson)
      .then(response => {
        console.log('Lesson updated successfully');
        setLessonUpdatedMessage('Lesson updated successfully');
        setEditLesson(null);
      })
      .catch(error => {
        console.error('Error updating lesson:', error);
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
                Lesson: {lesson.lesson_name}
              </p>
              <img
                className="svg-teach-dash"
                src="./Images/sign-out-svgrepo-com.svg"
                alt="Sign Out"
                onClick={() => handleLessonClick(lesson)}
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
        <h4 className="lesson-top">Lesson</h4>
        <div className="line1"></div>
        {lessonAddedMessage && (
          <div className="confirmation-message">
            {lessonAddedMessage}
          </div>
        )}
        {lessonUpdatedMessage && (
          <div className="confirmation-message">
            {lessonUpdatedMessage}
          </div>
        )}
        {editLesson ? (
          <div className="lesson-form">
            <label className='form-title-dashTeacher' htmlFor="Title">Title:</label><br />
            <input
              className="lesson-title"
              type="text"
              placeholder="Title"
              value={editLesson.lesson_name}
              onChange={(e) => setEditLesson({ ...editLesson, lesson_name: e.target.value })}
            />
            <label className='form-title-dashTeacher' htmlFor="Overview">Overview:</label><br />
            <textarea
              className="lesson-overview"
              placeholder="Overview"
              value={editLesson.overview}
              onChange={(e) => setEditLesson({ ...editLesson, overview: e.target.value })}
            />
            <label className='form-title-dashTeacher' htmlFor="Content">Content:</label><br />
            <textarea
              className="lesson-content"
              placeholder="Content"
              value={editLesson.content}
              onChange={(e) => setEditLesson({ ...editLesson, content: e.target.value })}
            />
            <button className='add-lesson-button' type="button" onClick={handleSaveLesson}>Save</button>
          </div>
        ) : (
          <form action="" className="lesson-form">
            <label className='form-title-dashTeacher' htmlFor="Title">Title:</label><br />
            <input
              className="lesson-title"
              type="text"
              placeholder="Title"
              value={lesson_name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className='form-title-dashTeacher' htmlFor="Overview">Overview:</label><br />
            <textarea
              className="lesson-overview"
              placeholder="Overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
            <label className='form-title-dashTeacher' htmlFor="Content">Content:</label><br />
            <textarea
              className="lesson-content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className='add-lesson-button' type="button" onClick={handleAddLesson}>Add Lesson</button>
          </form>
        )}
        <div className="line1"></div>
      </div>
    </div>
  );
};

export default Dashlesson;
