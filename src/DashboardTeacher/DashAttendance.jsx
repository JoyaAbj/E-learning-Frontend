
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashAttendance() {
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLesson, setSelectedLesson] = useState('');
  const [attendance, setAttendance] = useState([]);
  const teacherId = localStorage.getItem('userId');
  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Fetch languages taught by the teacher
    
    axios.get(`${url}/attendance/languages?teacherId=${teacherId}`)
      .then((response) => {
        
        setLanguages(response.data.languages[0]);
      })
      .catch((error) => {
        console.error('Error fetching languages:', error);
      });
  }, [teacherId]);

  useEffect(() => {
    // Fetch levels based on the selected language
    if (selectedLanguage) {
      axios.get(`${url}/attendance/levels?languageId=${selectedLanguage}`)
        .then((response) => {
          setLevels(response.data.levels[0]);
        })
        .catch((error) => {
          console.error('Error fetching levels:', error);
        });
    }
  }, [selectedLanguage]);

  useEffect(() => {
    // Fetch lessons based on the selected level
    if (selectedLevel) {
      axios.get(`${url}/attendance/lessons?levelId=${selectedLevel}`)
        .then((response) => {
          setLessons(response.data.lessons[0]);
        })
        .catch((error) => {
          console.error('Error fetching lessons:', error);
        });
    }
  }, [selectedLevel]);

  useEffect(() => {
    // Fetch attendance records based on the selected lesson
    if (selectedLesson) {
      axios.get(`${url}/attendance/attendance?lessonId=${selectedLesson}`)
        .then((response) => {
          setAttendance(response.data.attendance[0]);
        })
        .catch((error) => {
          console.error('Error fetching attendance:', error);
        });
    }
  }, [selectedLesson]);
  return (
    <div>
      <h1 className='attendance-teacher'>Attendance</h1>
<div className="select-attendance">
      {/* Language Selector */}
      <select className='dropdown-level' value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">Select Language</option>
        { languages.map((language) => (
          <option key={language.language_id} value={language.language_id}>
            {language.language_name}
          </option>
        ))}
      </select>

      {/* Level Selector */}
      {selectedLanguage && (  // Conditionally render the Level Selector
        <select className='dropdown-level' value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="">Select Level</option>
          {levels.map((level) => (
            <option key={level.level_id} value={level.level_id}>
              {level.level_name}
            </option>
          ))}
        </select>
      )}

      {/* Lesson Selector */}
      {selectedLevel && (  // Conditionally render the Lesson Selector
        <select className='dropdown-level' value={selectedLesson} onChange={(e) => setSelectedLesson(e.target.value)}>
          <option value="">Select Lesson</option>
          {lessons.map((lesson) => (
            <option key={lesson.lesson_id} value={lesson.lesson_id}>
              {lesson.lesson_name}
            </option>
          ))}
        </select>
      )}
      </div>

      {/* Attendance List */}
      {selectedLesson && (  // Conditionally render the Attendance List
        <ul>
          {attendance.map((record) => (
            <li className='list-attendance' key={record.user_id}>
              {record.student_name} - {record.attendance_day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashAttendance;