'use client';
import { useState } from 'react';

const dummyCandidates = [
  { id: 1, name: "Rahul Sharma", role: "Frontend Developer", score: "85%", status: "hired" },
  { id: 2, name: "Priya Patel", role: "UI Designer", score: "72%", status: "pending" },
  { id: 3, name: "Amit Verma", role: "React Developer", score: "55%", status: "rejected" },
  { id: 4, name: "Sneha Rao", role: "Backend Developer", score: "91%", status: "hired" }
];

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = dummyCandidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h1>Candidate Management</h1>
      </div>

      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search by name or role..." 
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.role}</td>
                <td>{candidate.score}</td>
                <td>
                  <span className={`status ${candidate.status}`}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </span>
                </td>
                <td><button>View Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCandidates.length === 0 && (
          <p style={{textAlign: 'center', marginTop: '20px'}}>No candidates found.</p>
        )}
      </div>
    </div>
  );
}
