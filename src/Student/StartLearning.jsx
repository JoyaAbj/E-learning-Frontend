import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../CSS/Student.css';


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
  const [assessmentInput, setAssessmentInput] = useState('');
  const [joinedLessons, setJoinedLessons] = useState([]);
  
  
  useEffect(() => {
    // if (userId && selectedLanguage) {
    //   console.log(userId)
      // Fetch enrolled levels for the selected language and user
      axios.get(`${process.env.REACT_APP_API_URL}/enroll/get/languagebystudent/${localStorage.getItem('userId')};`)
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

  // // Fetch enrolled levels when userId changes
  // useEffect(() => {
  //   if (userId && selectedLanguage) {
  //     // Fetch enrolled levels for the selected language
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/enroll/get/enrolledLevels`)
  //       .then((response) => {
  //         setEnrolledLevels(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching enrolled levels:', error);
  //       });
  //   }
  // }, [userId, selectedLanguage]);


  
  const handleStartLearning = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/enroll/get/lessons?language=${selectedLanguage}&level=${selectedLevelName}`)
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
      .get(`${process.env.REACT_APP_API_URL}/userAssessment/get/lessonIDAssessment/${localStorage.getItem('userId')}/${lessonId}`)
      .then((response) => {
        console.log(response.data.data)
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

  const handleAssessmentInputChange = (event) => {
    setAssessmentInput(event.target.value);
  };


  const handleSubmitAssessment = () => {

  
    const userId = localStorage.getItem('userId')
    if (assessmentId && userId && assessmentInput) {
      // Make an API request to create the user_assessment row and set submission to 'Submitted'
      axios
        .post(`${process.env.REACT_APP_API_URL}/userAssessment/post/submitUserAssessment`, {
          assessmentId: assessmentId,
          studentId: userId,
          assessmentInput: assessmentInput,
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
  console.log(assessmentInput)
  
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
  // const handleJoinLesson = (lessonId) => {
  //   const userId = localStorage.getItem('userId')
  //   axios
  //     .post('http://localhost:5000/attendance/markattendance', {
  //       lessonId: lessonId,
  //       userId: userId, 
  //     })
  //     .then((response) => {
        
  //       console.log('Attendance marked:', response.data.message);
  //     })
  //     .catch((error) => {
  //       console.error('Error marking attendance:', error);
  //     });
  // };
  const handleJoinLesson = (lessonId) => {
    // Check if the student has already joined the lesson
    if (joinedLessons.includes(lessonId)) {
      alert('You have already joined this lesson.');
      return;
    }
    const userId = localStorage.getItem('userId')
    // Make an API request to mark attendance for the selected lesson
    axios
    .post('http://localhost:5000/attendance/markattendance', {
        lessonId: lessonId,
        userId: userId, // Assuming you have the user ID
      })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log('Attendance marked:', response.data.message);
        // Update the joinedLessons state to indicate that the student has joined this lesson
        setJoinedLessons([...joinedLessons, lessonId]);
      })
      .catch((error) => {
        console.error('Error marking attendance:', error);
      });
  };
  return (
    <div className='start-learning-div'>
      <div className="chooselanguage">
      < h2 className='courstud'>My courses</h2>
      <div className='choose-lesson'>
      <label htmlFor="language" className='langstud'>Select Language:</label>
      <select id="language" name="language" className='selectlangstud' value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="" >Select a Language</option>
        {languages && languages.map((language) => (
          <option key={language.language_id} value={language.language_id}>
            {language.language_name}
          </option>
        ))}
      </select>

      <label htmlFor="level" className='langstud'>Select Level:</label>
      <select id="level" name="level" value={selectedLevel} className='levelstud' onChange={handleLevelChange}>
        <option value="">Select a Level</option>
        {enrolledLevels.map((level) => level.language_id==selectedLanguage&& (
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
            <ul>
              {selectedLesson.content.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
            <button onClick={() => handleStartAssessment(selectedLesson.lesson_id)}>Start Assessment</button>
            {/* <button onClick={() => handleJoinLesson(selectedLesson.lesson_id)}>Join</button> */}
            <button
               onClick={() => handleJoinLesson(selectedLesson.lesson_id)}
                 disabled={joinedLessons.includes(selectedLesson.lesson_id)}
                 >
                          Join
               </button>
          </li>
        )}
      </ul>

          <div>
            <button onClick={handlePreviousLesson} disabled={lessonIndex === 0} className='previstud'>
              Previous Lesson
            </button>
            <button onClick={handleNextLesson} disabled={lessonIndex === lessons.length - 1}  className='previstudd'>
              Next Lesson
            </button>
          </div>
        </div>
      )}

      {isModalOpen && assessmentDetails && (
        <Modal  isOpen={isModalOpen} onClose={closeModal}>
          <h3 className='assessment-details'>Assessment Details:</h3>
          <p className='assessment-title'>Assessment Title:</p>
          <p className='the-title'> {assessmentDetails.assessment_title}</p>
          <p className='assessment-title'>Duration: </p>
          <p className='the-title'>{assessmentDetails.duration} minutes</p>
          <p className='assessment-title'>Question:</p>
          <p className='the-title'> {assessmentDetails.question}</p>
          <textarea className='answer'
          name="answer"  
          cols="30" 
          rows="10"></textarea>
          <button className='assessment-submit' type="submit" onClick={handleSubmitAssessment}>Submit Assessment</button>
          <button className='assessment-submit' onClick={closeModal}>Close</button>
        </Modal>
      )}
      </div>

</div>
    </div>
  );
}

export default StartLearning;