import React from 'react';
import '../CSS/About.css'; 

function About() {
  return (
    <div>
      <h1 className="about">About us</h1>
      <div className="about_container">
        <div className="about_section">
          <div className="language-diversity">
            <img className="about_img" src="./Images/Learning-bro.png" alt="language-diversity" />
            <h3 className="title-about-divs">Language Diversity</h3>
            <p className="about-description">
              Ridge Polyglot Language Institute offers diverse language courses for all levels, from beginners to advanced.
            </p>
          </div>
          <div className="language-diversity">
            <img className="about_img" src="./Images/Product_quality-pana.png" alt="Qualified Instructors" />
            <h3 className="title-about-divs">Qualified Instructors</h3>
            <p className="about-description">
              The institute boasts a team of highly qualified language instructors who are proficient in the target language.
            </p>
          </div>
        </div>
        <div className="about_section">
          <div className="language-diversity">
            <img className="about_img" src="./Images/Advanced_customization-amico.png" alt="Customized Learning Programs" />
            <h3 className="title-about-divs">Customized Learning Programs</h3>
            <p className="about-description">
              Ridge Polyglot tailors its language programs to meet the specific needs of individual learners.
            </p>
          </div>
          <div className="language-diversity">
            <img className="about_img" src="./Images/In_progress-rafiki_1.png" alt="Progress Tracking and Assessment" />
            <h3 className="title-about-divs">Progress Tracking and Assessment</h3>
            <p className="about-description">
              The institute provides regular progress assessments to help you make necessary improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
