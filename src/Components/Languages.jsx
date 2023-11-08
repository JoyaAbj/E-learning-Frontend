import React, { useState, useEffect } from 'react';
import '../CSS/Languages.css';
import axios from 'axios';

const Languages = () => {
    const [languagesdata, setLanguagesData] = useState([]);

    const fetchLanguagedata = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/languages/getAll`)
          .then((response) => {
            setLanguagesData(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        fetchLanguagedata();
      }, []);

  return (
    <div id='Languagessection' >
      <h1 className="language-title">Languages</h1>
    <div className="language-container">
      {languagesdata && languagesdata.map((languages) => (
        <div className="language-box" key = {languages.languages_id}> 
            <div className="language-box">
            <img src={languages.language_img} className="language-img" alt={languages.language_name} />
            <h2 className="language-name">{languages.language_name}</h2>
            </div> 
        </div>
      ))}
    </div>
    </div>
  )
}

export default Languages
