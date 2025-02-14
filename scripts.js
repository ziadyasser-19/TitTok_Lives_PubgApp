const scriptURL = "http://127.0.0.1:8082/https://script.google.com/macros/s/AKfycbwIbb05uYGMTGncZ6bWYL-6G_Ager7z5obx6U2HzF1QDTxUxfo6ynwvDU30Soq84Uhg_w/exec";

let previousData = [];

async function fetchData() {
  try {
    const response = await fetch(scriptURL); // Fetch through the proxy
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderTable(data); // Render the table with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function renderTable(data) {
    const tableBody = document.getElementById("table-body");
  
    // Clear previous table rows before adding new rows
    tableBody.innerHTML = "";
  
    // Sort data by kills in descending order
    const sortedData = [...data.slice(1)].sort((a, b) => parseInt(b[3]) - parseInt(a[3]));
  
    // Create and append rows
    sortedData.forEach((row, index) => {
      const tr = document.createElement("tr");
  
      // Ranking
      const tdRanking = document.createElement("td");
      tdRanking.className = "ranking";
      tdRanking.textContent = index + 1;
      if (index === 0) tdRanking.classList.add("first");
      else if (index === 1) tdRanking.classList.add("second");
      else if (index === 2) tdRanking.classList.add("third");
      tr.appendChild(tdRanking);
  
      // Team Name
      const tdTeamName = document.createElement("td");
      tdTeamName.textContent = row[1];
      tr.appendChild(tdTeamName);
  
      // Members
      const tdMembers = document.createElement("td");
      for (let i = 0; i < parseInt(row[2]); i++) {
        const div = document.createElement("div");
        div.classList.add("stick-man");
        tdMembers.appendChild(div);
      }
      tr.appendChild(tdMembers);
  
      // Kills
      const tdKills = document.createElement("td");
      tdKills.textContent = row[3];
      tr.appendChild(tdKills);
  
      // Points
      const tdPoints = document.createElement("td");
      tdPoints.textContent = row[4];
      tr.appendChild(tdPoints);
  
      // Logo
      const tdLogo = document.createElement("td");
      const img = document.createElement("img");
      img.src = row[5];
      img.alt = `${row[1]} Logo`;
      img.classList.add("team-logo");
      tdLogo.appendChild(img);
      tr.appendChild(tdLogo);
  
      // Append the row to the table body
      tableBody.appendChild(tr);
    });
  }
  
  

// Fetch data on page load
window.onload = fetchData;

// Refresh data every 5 seconds
setInterval(fetchData, 5000);