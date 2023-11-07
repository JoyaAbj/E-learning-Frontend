import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Student.css';
import SignOut from '../DashboardAdmin/Signout';

function EnrollmentForm({ userId }) {

  


  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  // const [levelId, setLevelId] = useState('');

  useEffect(() => {
   // Fetch available languages and populate the language dropdown
axios.get('http://localhost:5000/enroll/get/languages')
.then((response) => {
  setLanguages(response.data.languages);
})
.catch((error) => {
  console.error(error);
});
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguageId = event.target.value;
    setSelectedLanguage(selectedLanguageId);

// Fetch available levels for the selected language and populate the level dropdown
axios.get(`http://localhost:5000/enroll/get/levels?language_id=${selectedLanguageId}`)
  .then((response) => {
    setLevels(response.data.levels);
    // setLevelId(response.data.levels[0].level_id)
  })
  .catch((error) => {
    console.error(error);
  });
}
console.log(selectedLevel)
  const handleEnroll = () => {
      const studentId = localStorage.getItem("userId")
      console.log(studentId)
      const req = {
        student_id : studentId ,
        level_id : selectedLevel
      }
      console.log(req)
      // Send a POST request to the backend API to enroll the student
      fetch('http://localhost:5000/enroll/add/enroll', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
      body: JSON.stringify(req),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Handle success or error messages as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='enrollment-div'>
        {/* <h1 className='enroll-title'>What do you wanna learn</h1> */}
      {/* <label className='select-language' htmlFor="language">Select Language:</label> */}
      <select className='dropdown-language' id="language" name="language" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Select a Language</option>
        {languages && languages.map((language) => (
          <option key={language.language_id} value={language.language_id}>
            {language.language_name}
          </option>
        ))}
      </select>

      {/* <label className='select-level' htmlFor="level">Select Level:</label> */}
      <select className='dropdown-levels' id="level" name="level" value={selectedLevel} onChange={(e) => {
        // setLevelId(e.target.value)
        setSelectedLevel(e.target.value)
      }
      }>
        <option value="">Select a Level</option>
        {levels.map((level) => (
          <option key={level.level_id} value={level.level_id}>
            {level.level_name}
          </option>
        ))}
      </select>

      <button className='enroll-btn-student' type="button" onClick={handleEnroll} disabled={!selectedLanguage || !selectedLevel}>
        Enroll
      </button>
      
      <div className="elements">
  <SignOut/>
  </div>
    </div>
  );
}

export default EnrollmentForm;