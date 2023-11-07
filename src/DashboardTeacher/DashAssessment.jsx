import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/DashboardTeacher.css';

const Dashassessment = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [lessons, setLessons] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

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
  const handleLessonChange = (event) => {
    const selectedLesson = event.target.options[event.target.selectedIndex].id;
    setSelectedLesson(selectedLesson);
    
  }

  useEffect(() => {
    if (selectedLevel&&selectedLesson) {
      // Fetch lessons when the selectedLevel changes
      axios.get(`http://localhost:5000/assessment/getbylesson/${selectedLesson}`)
        .then(response => {
          setAssessments(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching lessons:', error);
        });
    }
  }, [selectedLevel, selectedLesson]);

  const handleDelete = (assessmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assessment?");
    if (confirmDelete)
    axios
      .delete(`http://localhost:5000/assessment/delete/${assessmentId}`)
      .then((response) => {
        if (response.status === 204) {
          // Handle successful deletion, e.g., updating the UI
          setAssessments((prevAssessments) =>
            prevAssessments.filter((assessment) => assessment.assessment_id !== assessmentId)
          );
        }
      })
      .catch((error) => {
        console.error('Error deleting assessment:', error);
      });
  };
  


  return (
    <div>
      <h1>Assessments</h1>
      <select name="level" id="levels" className="dropdown-level" onChange={handleLevelChange}>
          <option value="Level">Level</option>
          {levels.map((level) => (
            <option key={level.level_id} value={level.level_name} id={level.level_id}>
              {level.level_name}
            </option>
          ))}
        </select>
        <select name="lesson" id="lessons" className='dropdown-level' onChange={handleLessonChange}>
          <option value="Lesson">Lesson</option>
          {lessons.map((lesson) => (
            <option key={lesson.lesson_id} value={lesson.lesson_name} id={lesson.lesson_id}>
              {lesson.lesson_name}
            </option>
          ))}
        </select>
      <div className="assessments">
        {assessments.map(assessment => (
          <div className="assessment-row" key={assessment.id}>
            <p className="list-of-assessments">{assessment.assessment_title}</p>
            <img
              className="svg-teach-dash"
              src="./Images/sign-out-svgrepo-com.svg"
              alt="Sign Out"
            />
           <img
              src="./Images/bin-svgrepo-com.svg"
              className="svg-teach-dash"
              alt="Delete"
              onClick={() => handleDelete(assessment.assessment_id)} // Pass the assessment ID here
            />
          </div>
        ))}
      </div>
      <div className="line1"></div>
      
    </div>
  );
}

export default Dashassessment;
