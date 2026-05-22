1. Login & Authentication
Entry:User opens the app at `login.html`.
Action:  Enters credentials and clicks **Login**.
Feedback: The button changes to an interactive **"Authenticating..."** state before redirecting.

2. Main Dashboard (Overview)
User lands on `dashboard.html`.
Metrics:Instantly view high-level cards (*Total Jobs, Candidates, Interviews*).
Analytics: View visual charts showing *Hiring Statistics* (bar chart) and the *Pipeline Breakdown* (doughnut chart).
Recent Activity: A quick table shows the latest incoming applicants at a glance.

3. Job Board & Filtering
User clicks "Jobs" in the sidebar to navigate to `job.html`.
Grid View: Browse active job openings styled as individual cards showing location and experience needs.
Filter: Use the dynamic status dropdown to quickly sort jobs by **Open**, **Closed**, or **Draft** states.

4. Job Details & Applying
Clicking "View Details"** on any job opens `job-details.html`.
Details: Read through the specific role description and requirements.
Form Submission: Use the **"Apply Manually"** form to input a new applicant's details.
Redirection: On submission, a success alert pops up, and the user is automatically routed back to the main job board.

 5. Candidate Management
User shifts to `candidates.html` via the sidebar.
Roster: View a complete applicant table featuring names, roles, status badges, and calculated **ATS Match Scores**.
Profile Deep-Dive: Clicking **"View"** opens `candidate-details.html` to review a candidate's contact info, experience metrics, cover letter, and access a resume download link.
