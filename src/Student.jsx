import React from 'react';
import EnrollmentForm from './Student/EnrollmentForm ';
import StartLearning from './Student/StartLearning';


const StudentDashboard = ({userId}) => {
  return (
    <div>
     <EnrollmentForm userId={userId}/>
     <StartLearning userId={userId}/>
    </div>
  );
};

export default StudentDashboard;