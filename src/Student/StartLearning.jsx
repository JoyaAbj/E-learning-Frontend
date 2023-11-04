import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../CSS/Student.css'

function StartLearning({ userId }) {
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLevelName, setSelectedLevelName] = useState('');
  const [enrolledLevels, setEnrolledLevels] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [assessmentDetails, setAssessmentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // if (userId && selectedLanguage) {
    //   console.log(userId)
      // Fetch enrolled levels for the selected language and user
      axios.get(`http://localhost:5000/enroll/get/languagebystudent/${localStorage.getItem('userId')};`)
    .then((response) => {
      console.log(response.data.data)
      setEnrolledLevels(response.data.data);
      setLanguages(response.data.data)
    })
    .catch((error) => {
      console.error('Error fetching enrolled levels:', error);
    });
  // }
}, [userId, selectedLanguage]);
console.log(languages)

const handleLanguageChange = (event) => {
  const selectedLanguageId = event.target.value;
  setSelectedLanguage(selectedLanguageId);
};

  const handleLevelChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedLevel(event.target.value);
    setSelectedLevelName(selectedOption.text);
  };

  // Fetch enrolled levels when userId changes
  useEffect(() => {
    if (userId && selectedLanguage) {
      // Fetch enrolled levels for the selected language
      axios
        .get(`http://localhost:5000/enroll/get/enrolledLevels`)
        .then((response) => {
          setEnrolledLevels(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching enrolled levels:', error);
        });
    }
  }, [userId, selectedLanguage]);


  
  const handleStartLearning = () => {
    axios
      .get(`http://localhost:5000/enroll/get/lessons?language=${selectedLanguage}&level=${selectedLevelName}`)
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  };


  const [assessmentId, setAssessmentId] = useState(null);

  const handleStartAssessment = (lessonId) => {
    // Make an API request to fetch the assessment details for the selected lesson
    axios
      .get(`http://localhost:5000/enroll/get/fetch-assessment/${userId}/${lessonId}`)
      .then((response) => {
        // Handle the response and show the assessment details to the user
        const assessmentDetails = response.data.data;
        setAssessmentDetails(assessmentDetails);
        console.log('Assessment details:', assessmentDetails);

        // Store the assessment ID in state
        setAssessmentId(assessmentDetails.assessment_id);

        // You can display the assessment details using a modal or another component
      })
      .catch((error) => {
        console.error('Error fetching assessment:', error);
      });
    setIsModalOpen(true);
  };


  const handleSubmitAssessment = () => {
    if (assessmentId && userId) {
      // Make an API request to create the user_assessment row and set submission to 'Submitted'
      axios
        .put('http://localhost:5000/students/submit-assessment', {
          assessmentId: assessmentId,
          studentId: userId,
        })
        .then((submitResponse) => {
          console.log('Assessment submitted:', submitResponse.data);

          // You can also update the submission status in the state if needed
        })
        .catch((submitError) => {
          console.error('Error submitting assessment:', submitError);
        });
    } else {
      console.error('Assessment ID or Student ID is missing. Please make sure to set both.');
    }
    document.querySelector('button[type="submit"]').disabled = true;
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [lessonIndex, setLessonIndex] = useState(0); 

  const handleNextLesson = () => {
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1);
    }
  };

  const selectedLesson = lessons[lessonIndex];

  return (
    <div className='start-learning-div'>
      <h2>My courses</h2>
      <label htmlFor="language">Select Language:</label>
      <select id="language" name="language" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Select a Language</option>
        {languages && languages.map((language) => (
          <option key={language.language_id} value={language.language_id}>
            {language.language_name}
          </option>
        ))}
      </select>

      <label htmlFor="level">Select Level:</label>
      <select id="level" name="level" value={selectedLevel} onChange={handleLevelChange}>
        <option value="">Select a Level</option>
        {enrolledLevels.map((level) => (
          <option key={level.level_id} value={level.level_name}>
            {level.level_name}
          </option>
        ))}
      </select>
      <button onClick={handleStartLearning}>Start Learning</button>
      {lessons.length > 0 && (
        <div>
          <h3>Available Lessons:</h3>
          <ul>
            {selectedLesson && (
              <li key={selectedLesson.lesson_id}>
                <h4>{selectedLesson.lesson_name}</h4>
                <p>{selectedLesson.content}</p>
                <button onClick={() => handleStartAssessment(selectedLesson.lesson_id)}>Start Assessment</button>
              </li>
            )}
          </ul>

          <div>
            <button onClick={handlePreviousLesson} disabled={lessonIndex === 0}>
              Previous Lesson
            </button>
            <button onClick={handleNextLesson} disabled={lessonIndex === lessons.length - 1}>
              Next Lesson
            </button>
          </div>
        </div>
      )}

      {isModalOpen && assessmentDetails && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3>Assessment Details:</h3>
          <p>Assessment Title: {assessmentDetails.assessment_title}</p>
          <p>Duration: {assessmentDetails.duration} minutes</p>
          <p>Question: {assessmentDetails.question}</p>
          <button type="submit" onClick={handleSubmitAssessment}>Submit Assessment</button>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}


    </div>
  );
}

export default StartLearning;