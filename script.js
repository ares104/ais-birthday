const firebaseConfig = {
  apiKey: "AIzaSyBJskSSOqeEwa4a-CwOvxtZjt6QEaiNQl0",
  authDomain: "ais-birthday.firebaseapp.com",
  databaseURL: "https://ais-birthday-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ais-birthday",
  storageBucket: "ais-birthday.firebasestorage.app",
  messagingSenderId: "281017047582",
  appId: "1:281017047582:web:e3ee1675f7806c3014ec0f"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

window.onload = () => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 3 + 2,
      drift: (Math.random() - 0.5) * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.fillRect(c.x, c.y, c.size, c.size);
      ctx.fill();
      c.y += c.speed;
      c.x += c.drift;

      if (c.y > canvas.height + 10) confetti.splice(i, 1);
    });

    if (confetti.length > 0) {
      requestAnimationFrame(draw);
    } else {
      canvas.parentNode.removeChild(canvas);
    }
  }

  draw();
};

function ikutMerayakan() {
  const nama = document.getElementById("namaInput").value.trim();
  if (nama === "") return alert("Nama tidak boleh kosong!");

  db.ref("ucapan").push(nama);
  document.getElementById("namaInput").value = "";

  window.location.href = "abouther.html";
}

const total = document.getElementById("totalUcapan");


// Ambil dan tampilkan total ucapan saja
db.ref("ucapan").on("value", (snapshot) => {
  const data = snapshot.val() || {};
  let count = Object.keys(data).length;
  total.textContent = `${count} orang sudah ikut merayakan!`;
});
