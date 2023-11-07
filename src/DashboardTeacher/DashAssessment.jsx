import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/DashboardTeacher.css';

const Dashassessment = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [lessons, setLessons] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [AssessmentAddedMessage, setAssessmentAddedMessage] = useState('');
  const [assessment_title, setAssessmentTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [question, setQuestion] = useState('');
  const [editAssessment, setEditAssessment] = useState(null);
  const [assessmentUpdatedMessage, setAssessmentUpdatedMessage] = useState('');

  const handleAssessmentClick = (assessment) => {
    setSelectedLesson(assessment);
    setEditAssessment(assessment);
    setAssessmentTitle(assessment.assessment_title);
    setDuration(assessment.duration);
    setQuestion(assessment.question);
  };

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

  const handleAddAssessment = () => {
    const newAssessment = {
      assessment_title: assessment_title,
      duration: duration,
      question: question,
      lesson_id: selectedLesson,
    };

    axios.post('http://localhost:5000/assessment/add', newAssessment)
      .then(response => {
        console.log('Assessment added successfully');
        setAssessmentAddedMessage('Assessment added successfully');
        setAssessmentTitle('');
        setDuration('');
        setQuestion('');
      })
      .catch(error => {
        console.error('Error adding Assessment:', error);
      });
  };

  const handleSaveAssessment = () => {
    axios.put(`http://localhost:5000/assessment/update/${editAssessment.assessment_id}`, editAssessment)
      .then(response => {
        console.log('Assessment updated successfully');
        setAssessmentUpdatedMessage('Assessment updated successfully');
        setEditAssessment(null);
      })
      .catch(error => {
        console.error('Error updating Assessment:', error);
      });
  };
  


  return (
    <div>
      <h1>Assessments</h1>
      <div className="select-level-lesson-teacher">
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
       </div>
      <div className="lessons">
        {assessments.map(assessment => (
          <div className="lesson-row" key={assessment.id}>
            <p className="list-of-lessons">{assessment.assessment_title}</p>
            <img
              className="svg-teach-dash"
              src="./Images/sign-out-svgrepo-com.svg"
              alt="Sign Out"
              onClick={() => handleAssessmentClick(assessment)}
            />
           <img
              src="./Images/bin-svgrepo-com.svg"
              className="svg-teach-dash"
              alt="Delete"
              onClick={() => handleDelete(assessment.assessment_id)} 
            />
          </div>
        ))}
      </div>
      <div className="line1"></div>
      {editAssessment ? (
          <div className="lesson-form">
            
           <label className='form-title-dashTeacher' htmlFor="Title">Title:</label><br />
            <input
              className="lesson-title"
              type="text"
              placeholder="Title"
              value={editAssessment.assessment_title}
              onChange={(e) => setEditAssessment({ ...editAssessment, assessment_title: e.target.value })}
            />
            <label className='form-title-dashTeacher' htmlFor="Duration">Duration:</label><br />
            <input
              className="lesson-overview"
              type='text'
              placeholder="Duration"
              value={editAssessment.duration} min
              onChange={(e) => setEditAssessment({ ...editAssessment, duration: e.target.value })}
            />
            <label className='form-title-dashTeacher' htmlFor="Question">Question:</label><br />
            <textarea
              className="lesson-content"
              placeholder="question"
              value={editAssessment.question}
              onChange={(e) => setEditAssessment({ ...editAssessment, question: e.target.value })}
            />
            <button className='add-lesson-button' type="button" onClick={handleSaveAssessment}>Save Assessment</button>
          </div>
        ) : (
      <form action="" className="lesson-form">
      <label className='form-title-dashTeacher' htmlFor="Title">Title:</label><br />
            <input
              className="lesson-title"
              type="text"
              placeholder="Title"
              value={assessment_title}
              onChange={(e) => setAssessmentTitle(e.target.value)}
            />
            <label className='form-title-dashTeacher' htmlFor="Duration">Duration:</label><br />
            <input
              className="lesson-overview"
              type='text'
              placeholder="Duration"
              value={duration} min
              onChange={(e) => setDuration(e.target.value)}
            />
            <label className='form-title-dashTeacher' htmlFor="Question">Question:</label><br />
            <textarea
              className="lesson-content"
              placeholder="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className='add-lesson-button' type="button" onClick={handleAddAssessment}>Add Assessment</button>
          </form>)}
      
      
    </div>
  );
}

export default Dashassessment;
