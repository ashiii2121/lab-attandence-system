import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/attendance');
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance data', error);
      setError(error.response?.data?.message || 'Failed to load attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAttendance, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter attendance based on search term
  const filteredAttendance = attendance.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.token.toString().includes(searchTerm) ||
    (record.notes && record.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const stats = {
    total: attendance.length,
    active: attendance.filter(r => !r.Exit).length,
    completed: attendance.filter(r => r.Exit).length
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Token', 'Name', 'Entry Time', 'Exit Time', 'Duration (min)', 'Status', 'Notes'];
    const rows = attendance.map(record => {
      const entry = new Date(record.Entry);
      const exit = record.Exit ? new Date(record.Exit) : null;
      const duration = exit ? Math.round((exit - entry) / 1000 / 60) : 'Active';
      const status = exit ? 'Completed' : 'Active';

      return [
        record.token,
        record.name,
        entry.toLocaleString(),
        exit ? exit.toLocaleString() : 'N/A',
        duration,
        status,
        record.notes || ''
      ];
    });

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-container">
          <h2>⚠️ Error</h2>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={fetchAttendance}>
            🔄 Retry
          </button>
          <br />
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Lab Attendance Management System</p>
      </div>

      <div className="admin-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name, token, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="refresh-btn" onClick={fetchAttendance} title="Refresh data">
          🔄 Refresh
        </button>
        <button className="export-btn" onClick={exportToCSV} title="Export to CSV">
          📥 Export CSV
        </button>
      </div>

      <div className="table-container">
        <div className="stats-row">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Sessions</p>
          </div>
          <div className="stat-card">
            <h3>{stats.active}</h3>
            <p>Active Now</p>
          </div>
          <div className="stat-card">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        {filteredAttendance.length === 0 ? (
          <div className="empty-container">
            <h3>📭 No Records Found</h3>
            <p>{searchTerm ? 'No results match your search.' : 'No attendance records yet.'}</p>
            <Link to="/" className="back-btn">← Back to Home</Link>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Name</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record) => {
                  const entry = new Date(record.Entry);
                  const exit = record.Exit ? new Date(record.Exit) : null;
                  const durationMinutes = exit
                    ? Math.round((exit - entry) / 1000 / 60)
                    : null;

                  const duration = durationMinutes !== null
                    ? durationMinutes >= 60
                      ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
                      : `${durationMinutes}m`
                    : 'Active';

                  const isActive = !record.Exit;

                  return (
                    <tr key={record._id || record.token}>
                      <td><strong>#{record.token}</strong></td>
                      <td>{record.name}</td>
                      <td>{entry.toLocaleString()}</td>
                      <td>{exit ? exit.toLocaleString() : '-'}</td>
                      <td>{duration}</td>
                      <td className={isActive ? 'status-active' : 'status-completed'}>
                        {isActive ? '🟢 Active' : '✅ Completed'}
                      </td>
                      <td>{record.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="table-footer">
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Showing {filteredAttendance.length} of {attendance.length} records
                {searchTerm && ` (filtered by "${searchTerm}")`}
              </p>
              <Link to="/" className="back-btn">← Back to Home</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;