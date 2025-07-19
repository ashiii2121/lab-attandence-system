import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance');
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      }
    };

    fetchAttendance();
  }, []);

  const styles = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 40px;
      color: black;
    }

    .table-container {
      max-width: 700px;
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #2c3e50;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    td {
      font-size: 14px;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Token.No</th>
              <th>Name</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.token}>
                <td>{record.token}</td>
                <td>{record.name}</td>
                <td>{new Date(record.Entry).toLocaleString()}</td>
                <td>{record.Exit ? new Date(record.Exit).toLocaleString() : 'N/A'}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;