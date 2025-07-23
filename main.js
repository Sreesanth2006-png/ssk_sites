// main.js

// AOS Init
AOS.init();

// Swiper Init
new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 2500 },
  slidesPerView: 1,
  spaceBetween: 20,
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Countdown Timer
const matchDate = new Date("March 23, 2025 19:30:00").getTime();
const timerElement = document.getElementById("timer");
setInterval(() => {
  const now = new Date().getTime();
  const diff = matchDate - now;
  if (diff <= 0) {
    timerElement.textContent = "Match is Live!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  timerElement.textContent = `Next Match in ${days}d ${hours}h ${minutes}m`;
}, 1000);

// Updated 2025 Squad Data
const players = [
  { name: "MS Dhoni", role: "Wicketkeeper", image: "images/players/dhoni.jpg" },
  { name: "Ruturaj Gaikwad", role: "Batter", image: "images/players/gaikwad.jpg" },
  { name: "Devon Conway", role: "Batter", image: "images/players/conway.jpg" },
  { name: "Dewald Brevis", role: "Batter", image: "images/players/brevis.jpg" },
  { name: "Rahul Tripathi", role: "Batter", image: "images/players/tripathi.jpg" },
  { name: "Shaik Rasheed", role: "Batter", image: "images/players/rasheed.jpg" },
  { name: "Vansh Bedi", role: "Wicketkeeper", image: "images/players/bedi.jpg" },
  { name: "Andre Siddarth", role: "Batter", image: "images/players/siddarth.jpg" },
  { name: "Ayush Mhatre", role: "Batter", image: "images/players/mhatre.jpg" },
  { name: "Ravindra Jadeja", role: "All-Rounder", image: "images/players/jadeja.jpg" },
  { name: "Rachin Ravindra", role: "All-Rounder", image: "images/players/rachin.jpg" },
  { name: "Ravichandran Ashwin", role: "All-Rounder", image: "images/players/ashwin.jpg" },
  { name: "Vijay Shankar", role: "All-Rounder", image: "images/players/vijay.jpg" },
  { name: "Sam Curran", role: "All-Rounder", image: "images/players/curran.jpg" },
  { name: "Anshul Kamboj", role: "All-Rounder", image: "images/players/kamboj.jpg" },
  { name: "Deepak Hooda", role: "All-Rounder", image: "images/players/hooda.jpg" },
  { name: "Jamie Overton", role: "All-Rounder", image: "images/players/overton.jpg" },
  { name: "Kamlesh Nagarkoti", role: "All-Rounder", image: "images/players/nagarkoti.jpg" },
  { name: "Ramakrishna Ghosh", role: "All-Rounder", image: "images/players/ghosh.jpg" },
  { name: "Shivam Dube", role: "All-Rounder", image: "images/players/dube.jpg" },
  { name: "Khaleel Ahmed", role: "Bowler", image: "images/players/khaleel.jpg" },
  { name: "Noor Ahmed", role: "Bowler", image: "images/players/noor.jpg" },
  { name: "Mukesh Choudhary", role: "Bowler", image: "images/players/mukesh.jpg" },
  { name: "Gurjapneet Singh", role: "Bowler", image: "images/players/gurjapneet.jpg" },
  { name: "Nathan Ellis", role: "Bowler", image: "images/players/ellis.jpg" },
  { name: "Shreyas Gopal", role: "Bowler", image: "images/players/gopal.jpg" },
  { name: "Matheesha Pathirana", role: "Bowler", image: "images/players/pathirana.jpg" }
];

function displayPlayers(role = "All") {
  const container = document.getElementById("playerGrid");
  container.innerHTML = "";
  const filtered = role === "All" ? players : players.filter(p => p.role === role);
  filtered.forEach(player => {
    container.innerHTML += `
      <div class="player-card">
        <img src="${player.image}" alt="${player.name}" />
        <h3>${player.name}</h3>
        <p>${player.role}</p>
      </div>
    `;
  });
}
displayPlayers();

function filterPlayers(role) {
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  displayPlayers(role);
}

// Poll
function submitVote() {
  const selected = document.querySelector('input[name="vote"]:checked');
  if (!selected) return alert("Please select a player to vote.");
  const result = {
    "MS Dhoni": 45,
    "Devon Conway": 30,
    "Ravindra Jadeja": 25
  };
  drawPollChart(result);
  document.getElementById("vote-result").textContent = `Thanks for voting for ${selected.value}!`;
}

function drawPollChart(data) {
  new Chart(document.getElementById("pollChart"), {
    type: "bar",
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: "Votes",
        data: Object.values(data),
        backgroundColor: ["#fedd00", "#003b6f", "#999"]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Stats Chart
new Chart(document.getElementById("cskChart"), {
  type: "doughnut",
  data: {
    labels: ["Wins", "Losses", "Trophies"],
    datasets: [{
      data: [112, 72, 5],
      backgroundColor: ["#28a745", "#dc3545", "#fedd00"]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
