import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AdminDashboard.css';

const Language = () => {
    const [language_name, setLanguageName] = useState('');
    const [language_img, setLanguageImage] = useState(null);
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [assignSuccessMessage, setAssignSuccessMessage] = useState('');
    const [assignErrorMessage, setAssignErrorMessage] = useState('');
    const url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchAvailableLanguages();
        fetchTeachers();
    }, []);

    const fetchAvailableLanguages = async () => {
        try {
            const response = await axios.get(`${url}/languages/newLanguage`);
            setAvailableLanguages(response.data);
        } catch (error) {
            console.error('Error fetching available languages:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`${url}/users/getAll/teacher`);
            if (Array.isArray(response.data.data)) {
                setTeachers(response.data.data);
            } else {
                console.error('Invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };


    const handleAddLanguage = async () => {
        try {
            const formData = new FormData();
            formData.append('language_name', language_name);
            formData.append('image', language_img);

            const response = await axios.post(`${url}/languages/add`, formData);
            console.log(response.data);
       

            setLanguageName('');
            setLanguageImage(null);
            fetchAvailableLanguages();

            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.value = '';
            }

            setSuccessMessage('The language was added successfully.');
            setErrorMessage('');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error('Error adding language:', error);

            setErrorMessage('Error adding the language. Please try again.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    const handleAssignLanguage = async () => {
        console.log(selectedLanguage);
        console.log(selectedTeacher);
        if (selectedLanguage && selectedTeacher) {
            const language_id = availableLanguages.find(language => language.language_name === selectedLanguage).language_id;

            console.log(language_id);
            try {
                const response = await axios.put(`${url}/languages/assign/${selectedTeacher}/${language_id}`);

                console.log(response.data);
                if (response.data) {
                    setAssignSuccessMessage('Language assigned to the teacher successfully.');
                    setAssignErrorMessage('');
                    setSelectedLanguage('');
                    setSelectedTeacher('');
                    fetchAvailableLanguages();

                    setTimeout(() => setAssignSuccessMessage(''), 5000);
                    setTimeout(() => setAssignErrorMessage(''), 5000);
                } else {
                    setAssignErrorMessage('Error assigning the language to the teacher. Please try again');
                    setAssignSuccessMessage('');
                }
            } catch (error) {
                console.error('Error assigning language:', error);
                setAssignErrorMessage('Error assigning the language to the teacher. Please try again');
                setAssignSuccessMessage('');
                setTimeout(() => setAssignErrorMessage(''), 5000);
            }
        } else {
            setAssignErrorMessage('Please select a language and a teacher before assigning');
            setTimeout(() => setAssignErrorMessage(''), 5000);
        }
    };

    const confirmDeleteLanguage = (languageId) => {
        setLanguageToDelete(languageId);

        if (window.confirm('Are you sure you want to delete this language?')) {
            handleRemoveLanguage(languageId);
        } else {
            setLanguageToDelete(null);
        }
    };

    const handleRemoveLanguage = async (languageId) => {
        try {
            const response = await axios.delete(`${url}/languages/delete/${languageId}`);
            console.log(response.data);
            fetchAvailableLanguages();

            setSuccessMessage('The language was removed successfully.');
            setErrorMessage('');
            setTimeout(() => setErrorMessage(''), 5000);
        } catch (error) {
            console.error('Error removing language:', error);

            setErrorMessage('Error removing the language. Please try again.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div>
            <h2 className='users-admin'>Add Language</h2>
            <div className='language-dashboard'>
                <input
                    className='language-input'
                    type="text"
                    placeholder="Language Name"
                    value={language_name}
                    onChange={(e) => setLanguageName(e.target.value)}
                />
                <input
                    className='language-input'
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={(e) => setLanguageImage(e.target.files[0])}
                    id="fileInput"
                />
                <button className='language-button' onClick={handleAddLanguage}>
                    Add Language
                </button>
            </div>

            {successMessage && <p style={{ color: 'black', textAlign: 'center', marginLeft: '120px' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'black', textAlign: 'center', marginLeft: '120px' }}>{errorMessage}</p>}

            <h2 className='users-admin'>Assign Language</h2>
            <div className='language-dashboard1'>
                <select
                    className='language-input'
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="">Select a Language</option>
                    {availableLanguages.map((language) => (
                        <option key={language.language_id} value={language.language_name}>
                            {language.language_name}
                        </option>
                    ))}
                </select>
                <select
                    className='language-input'
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                    <option value="">Select a Teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>

                <button className='language-button' onClick={handleAssignLanguage}>
                    Assign Language
                </button>
            </div>

            {assignSuccessMessage && <p style={{ color: 'black', textAlign: 'center', marginLeft: '120px' }}>{assignSuccessMessage}</p>}
            {assignErrorMessage && <p style={{ color: 'black', textAlign: 'center', marginLeft: '120px' }}>{assignErrorMessage}</p>}

            <h2 className='users-admin'>Languages</h2>
            <table className='Available-language-table'>
                <thead className="admin-thead">
                    <tr>
                        <th className='language-table'>Language Name</th>
                        <th className='language-table'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {availableLanguages.map((language) => (
                        <tr key={language.language_id}>
                            <td className='language-td'>{language.language_name}</td>
                            <td>
                                {languageToDelete === language.language_id ? (
                                    <button className='edit-delete-btn-admin' onClick={() => confirmDeleteLanguage(language.language_id)}>
                                        Confirm Delete
                                    </button>
                                ) : (
                                    <button className='edit-delete-btn-admin' onClick={() => confirmDeleteLanguage(language.language_id)}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Language;