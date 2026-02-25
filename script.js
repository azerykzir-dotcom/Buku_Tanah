let buku = JSON.parse(localStorage.getItem("buku")) || [];

// ================= LOGIN =================
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "reza@29" && pass === "12arsip") {
    localStorage.setItem("login", "true");
    tampilkanApp();
  } else {
    alert("Username atau password salah!");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.reload();
}

function tampilkanApp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

// cek login saat pertama buka
if (localStorage.getItem("login") === "true") {
  tampilkanApp();
}

// ================= CRUD =================
function tampilkanBuku(data = buku) {
  let tabel = document.getElementById("dataBuku");
  tabel.innerHTML = "";

  data.forEach((item, index) => {
    tabel.innerHTML += `
      <tr>
        <td>${item.noGerbong}</td>
        <td>${item.Kelurahan}</td>
        <td>${item.jenisHak}</td>
        <td>${item.noHak}</td>
        <td>${item.tahun || ''}</td> <!-- include tahun column -->
        <td>
          <button onclick="editBuku(${index})">Edit</button>
          <button class="hapus" onclick="hapusBuku(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("buku", JSON.stringify(buku));
}

function tambahBuku() {
  let noGerbong = document.getElementById("noGerbong").value;
  let Kelurahan = document.getElementById("Kelurahan").value;
  let jenisHak = document.getElementById("jenisHak").value;    // corrected id
  let noHak = document.getElementById("noHak").value;          // corrected id
  let tahun = document.getElementById("tahun").value;         // capture tahun

  if (!noGerbong || !Kelurahan || !jenisHak || !noHak || !tahun) {
    alert("Isi semua data!");
    return;
  }

  buku.push({ noGerbong, Kelurahan, jenisHak, noHak, tahun });
  tampilkanBuku();
}

function hapusBuku(index) {
  buku.splice(index, 1);
  tampilkanBuku();
}

function editBuku(index) {
  let data = buku[index];

  document.getElementById("noGerbong").value = data.noGerbong;
  document.getElementById("Kelurahan").value = data.Kelurahan;
  document.getElementById("jenisHak").value = data.jenisHak; // corrected id
  document.getElementById("noHak").value = data.noHak;       // corrected id
  document.getElementById("tahun").value = data.tahun || ''; // set tahun if exists

  buku.splice(index, 1);
}

// ================= SEARCH =================
function cariBuku() {
  let keyword = document.getElementById("search").value.toLowerCase();

  let hasil = buku.filter(item =>
    item.noGerbong.toLowerCase().includes(keyword) ||
    item.Kelurahan.toLowerCase().includes(keyword) ||
    item.jenisHak.toLowerCase().includes(keyword) ||
    item.noHak.toLowerCase().includes(keyword)
  );

  tampilkanBuku(hasil);
}

// pertama tampil
tampilkanBuku();
