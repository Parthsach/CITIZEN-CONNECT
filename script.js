// Handle Complaint Submission
document.addEventListener("DOMContentLoaded", () => {
  const complaintForm = document.getElementById("complaintForm");
  const result = document.getElementById("result");
  if (complaintForm) {
    complaintForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = "PWD" + Math.floor(Math.random() * 10000);

      const complaint = {
        id,
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        type: document.getElementById("type").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        status: "Pending"
      };

      localStorage.setItem(id, JSON.stringify(complaint));

      result.innerHTML = `<p>Your complaint has been registered. Complaint ID: 
        <b>${id}</b></p>`;
      complaintForm.reset();
    });
  }

  // Track Complaint
  const trackForm = document.getElementById("trackForm");
  const statusResult = document.getElementById("statusResult");
  if (trackForm) {
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("trackId").value;
      const complaint = JSON.parse(localStorage.getItem(id));
      if (complaint) {
        statusResult.innerHTML = `<p>Status of Complaint <b>${id}</b>: ${complaint.status}</p>`;
      } else {
        statusResult.innerHTML = `<p>No record found for ID ${id}</p>`;
      }
    });
  }

  // Staff Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      if (username === "admin" && password === "admin123") {
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  // Staff Dashboard
  const complaintList = document.getElementById("complaintList");
  if (complaintList) {
    complaintList.innerHTML = "";
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("PWD")) {
        const complaint = JSON.parse(localStorage.getItem(key));
        complaintList.innerHTML += `
          <tr>
            <td>${complaint.id}</td>
            <td>${complaint.name}</td>
            <td>${complaint.type}</td>
            <td>${complaint.location}</td>
            <td>${complaint.status}</td>
            <td><button class="btn" onclick="updateStatus('${complaint.id}')">Mark Resolved</button></td>
          </tr>`;
      }
    });
  }
});

// Update Status
function updateStatus(id) {
  const complaint = JSON.parse(localStorage.getItem(id));
  complaint.status = "Resolved";
  localStorage.setItem(id, JSON.stringify(complaint));
  alert(`Complaint ${id} marked as Resolved`);
  location.reload();
}
