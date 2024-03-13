import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Demo = () => {
  const [file, setFile] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorPics, setDoctorPics] = useState({});

  useEffect(() => {
    // Fetch list of doctors from the backend when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/doctors');
        setDoctors(response.data);
        // Extract doctor pics
        const pics = {};
        response.data.forEach(doctor => {
          pics[doctor._id] = doctor.pic ? `data:image/jpeg;base64,${doctor.pic}` : null;
        });
        setDoctorPics(pics);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!selectedDoctor) {
      alert('Please select a doctor');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const endpoint = `http://localhost:5007/api/doctors/upload-pic/${selectedDoctor}`;
      console.log('Uploading to:', endpoint);

      // Make a POST request to save the image for the selected doctor
      await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update doctor pics after successful upload
      const updatedDoctorPics = { ...doctorPics };
      updatedDoctorPics[selectedDoctor] = `data:image/jpeg;base64,${file}`;
      setDoctorPics(updatedDoctorPics);

      // Optionally, you can do something after successful upload
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
          ))}
        </select>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <table border="1" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Profile Picture</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>
                  {doctorPics[doctor._id] ? (
                    <img src={doctorPics[doctor._id]} alt={doctor.name} style={{ width: '100px', height: '100px' }} />
                  ) : (
                    <p>No picture available</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demo;
