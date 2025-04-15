
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

function ikutMerayakan() {
  const nama = document.getElementById("namaInput").value.trim();
  if (nama === "") return alert("Nama tidak boleh kosong!");

  db.ref("ucapan").push(nama);
  document.getElementById("namaInput").value = "";
}

const daftar = document.getElementById("daftarUcapan");
const total = document.getElementById("totalUcapan");

db.ref("ucapan").on("value", (snapshot) => {
  const data = snapshot.val();
  let count = 0;

  for (let key in data) {
    count++;
  }

  total.textContent = `${count} orang sudah ikut merayakan!`;
});
