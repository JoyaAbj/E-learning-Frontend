import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Language = () => {
    const [language_name, setLanguageName] = useState('');
    const [language_img, setLanguageImage] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [assignSuccessMessage, setAssignSuccessMessage] = useState('');
    const [assignErrorMessage, setAssignErrorMessage] = useState('');

    useEffect(() => {
        fetchLanguages();
        fetchTeachers();
    }, []);

    const fetchLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/languages/getALL');
            if (Array.isArray(response.data.data)) {
                setLanguages(response.data.data);
            } else {
                console.error('Invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/getAll/teacher');
            if (Array.isArray(response.data.data)) {
                setTeachers(response.data.data);
                console.log(response.data.data);
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

            const response = await axios.post('http://localhost:5000/languages/add', formData);
            console.log(response.data);

            setLanguageName('');
            setLanguageImage(null);
            fetchLanguages();

            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.value = '';
            }

            setSuccessMessage('The language was added successfully.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding language:', error);

            setErrorMessage('Error adding the language. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleAssignLanguage = async () => {
        if (selectedLanguage && selectedTeacher) {
            try {
                const response = await axios.post('http://localhost:5000/languages/assign', {
                    language_id: selectedLanguage,
                    teacher_id: selectedTeacher,
                });

                console.log(response.data.data);

                if (response.data.success) {
                    setAssignSuccessMessage('Language assigned to the teacher successfully');
                    setAssignErrorMessage('');
                    setSelectedLanguage('');
                    setSelectedTeacher('');
                } else {
                    setAssignErrorMessage('Error assigning the language to the teacher. Please try again');
                    setAssignSuccessMessage('');
                }
            } catch (error) {
                console.error('Error assigning language:', error);
                setAssignErrorMessage('Error assigning the language to the teacher. Please try again');
                setAssignSuccessMessage('');
            }
        } else {
            setAssignErrorMessage('Please select a language and a teacher before assigning');
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
            const response = await axios.delete(`http://localhost:5000/languages/delete/${languageId}`);
            console.log(response.data);
            fetchLanguages();

            setSuccessMessage('The language was removed successfully.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error removing language:', error);

            setErrorMessage('Error removing the language. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2 className='users-admin'>Add Language</h2>
            <div className='language-dashboard'>
                <input className='language-input'
                    type="text"
                    placeholder="Language Name"
                    value={language_name}
                    onChange={(e) => setLanguageName(e.target.value)}
                />
                <input className='language-input'
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={(e) => setLanguageImage(e.target.files[0])}
                    id="fileInput"
                />
                <button className='language-button' onClick={handleAddLanguage}>Add Language</button>
            </div>

            {successMessage && <p style={{ color: 'black' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}

            <h2 className='users-admin'>Assign Language</h2>
            <div className='language-dashboard1'>
                <select className='language-input' value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                    <option value="">Select a Language</option>
                    {languages.map((language) => (
                        <option key={language.language_id} value={language.language_id}>
                            {language.language_name}
                        </option>
                    ))}
                </select>
                <select className='language-input' value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option value="">Select a Teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>

                <button className='language-button' onClick={handleAssignLanguage}>Assign Language</button>
            </div>

            {assignSuccessMessage && <p style={{ color: 'black' }}>{assignSuccessMessage}</p>}
            {assignErrorMessage && <p style={{ color: 'black' }}>{assignErrorMessage}</p>}

            <h2 className='users-admin'>Languages</h2>
            <table className='admin-table'>
                <thead className="admin-thead">
                    <tr>
                        <th className='language-table'>Language Name</th>
                        <th className='language-table'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {languages.map((language) => (
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
        </div >
    );
};

export default Language;