let buku = JSON.parse(localStorage.getItem("buku")) || [];

// ================= LOGIN =================
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "123") {
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
        <td>${index + 1}</td>
        <td>${item.judul}</td>
        <td>${item.penulis}</td>
        <td>${item.tahun}</td>
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
  let judul = document.getElementById("judul").value;
  let penulis = document.getElementById("penulis").value;
  let tahun = document.getElementById("tahun").value;

  if (!judul || !penulis || !tahun) {
    alert("Isi semua data!");
    return;
  }

  buku.push({ judul, penulis, tahun });
  tampilkanBuku();
}

function hapusBuku(index) {
  buku.splice(index, 1);
  tampilkanBuku();
}

function editBuku(index) {
  let data = buku[index];

  document.getElementById("judul").value = data.judul;
  document.getElementById("penulis").value = data.penulis;
  document.getElementById("tahun").value = data.tahun;

  buku.splice(index, 1);
}

// ================= SEARCH =================
function cariBuku() {
  let keyword = document.getElementById("search").value.toLowerCase();

  let hasil = buku.filter(item =>
    item.judul.toLowerCase().includes(keyword) ||
    item.penulis.toLowerCase().includes(keyword) ||
    item.tahun.toString().includes(keyword)
  );

  tampilkanBuku(hasil);
}

// pertama tampil
tampilkanBuku();