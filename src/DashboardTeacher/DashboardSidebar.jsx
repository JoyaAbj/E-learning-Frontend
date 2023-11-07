import React, { useState } from 'react';
import '../CSS/DashboardTeacher.css' 
import DashProfile from './DashProfile';
import DashLessons from './DashLessons';
import DashAssessment from './DashAssessment';
import DashAttendance from './DashAttendance';


function DashboardSidebar() {
  const [visibleProfile, setProfileVisible] = useState(true);
  const [visibleLessons, setLessonsVisible] = useState(false);
  const [visibleAssessment, setAssessmentVisible] = useState(false);
  const [visibleAttendence, setAttendenceVisible] = useState(false);

  const handleSidebarClick = (section) => {
    setProfileVisible(section === 'profile');
    setLessonsVisible(section === 'lessons');
    setAssessmentVisible(section === 'assessment');
    setAttendenceVisible(section === 'attendance');
  };

  return (
    <div>
       
          <div className="sidebar">
            <a href="#" className="active">
              Dashboard
            </a>
            <div className="elements">
            <img className="svg-teach-dash" src="../Images/house-wifi-svgrepo-com.svg"/>
            <a href="#" onClick={() => handleSidebarClick('profile')}>
              Profile
            </a>
            </div>
            
           <div className="elements">
           <img class="svg-teach-dash" src="../Images/open-book-svgrepo-com.svg"/>
            <a href="#" onClick={() => handleSidebarClick('lessons')}>
              Lessons
            </a>
            </div>
            
            <div class="elements">
            <img class="svg-teach-dash" src="../Images/pdf-fill.svg"/>
            <a href="#" onClick={() => handleSidebarClick('assessment')}>
              Assessment
            </a>
            </div>
            
              <div class="elements">
             <img class="svg-teach-dash" src="../Images/user-check-alt-1-svgrepo-com.svg"/>
            <a href="#" onClick={() => handleSidebarClick('attendance')}>
              Attendance
            </a>
            </div>
            
            
          </div>
          <div className="Content">
            {visibleProfile && <DashProfile />}
            {visibleLessons && <DashLessons />}
            {visibleAssessment && <DashAssessment />}
            {visibleAttendence && <DashAttendance />}
          </div>
    </div>
  );
  
}

export default DashboardSidebar;