import React, { useEffect, useState } from 'react';
import '../CSS/Teachers.css';
import axios from 'axios';

function Teachers() {

    const [userdata, setUserData] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    const fetchteachersData = () => {
    axios.get(`${url}/users/getAll/teacher`)
      .then((response) => {
       console.log(response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchteachersData();
  }, []);

    return (
        <div id='Teacherssection' >
            <h3 className="Teachers-heading">Teachers</h3>
            <div className="Teachers-grid">
            {userdata && userdata.map((teacher)=>(
                <div key={teacher.id}>
                    <div className='Teachers-background'>
                
                        <img className="Teachers-image" src={teacher.profile_url} />
                        <p className='Teachers-name'>{teacher.name}</p>
                    </div>
                    </div>
                    ))}
                    
                </div>
        </div>
    );
}

export default Teachers;