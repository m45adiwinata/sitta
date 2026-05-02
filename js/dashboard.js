// Sapaan sesuai jam
function setSapaan() {
    var user = JSON.parse(localStorage.getItem("sesiUser"));
    var jam = new Date().getHours();
    var sapaan;

    if (jam >= 5 && jam < 12) {
        sapaan = 'Selamat pagi';
    } else if (jam >= 12 && jam < 15) {
        sapaan = 'Selamat siang';
    } else if (jam >= 15 && jam < 19) {
        sapaan = 'Selamat sore';
    } else {
        sapaan = 'Selamat malam';
    }

    document.getElementById('greetingText').textContent = sapaan + ", " + user.nama;
}

setSapaan();

function tampilHalaman(id, navId) {
    // sembunyikan semua page
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    // tampilkan page yang dipilih
    var target = document.getElementById('page-' + id);
    if (target) {
        target.classList.add('active');
    }

    // reset semua nav active
    var navItems = document.querySelectorAll('.nav-item');
    for (var j = 0; j < navItems.length; j++) {
        navItems[j].classList.remove('active');
    }

    // aktifkan nav yang sesuai
    var activeNav = document.getElementById(navId);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

function lacakPaket() {
    var noDO = document.getElementById('noDO').value.trim();
    var errorEl = document.getElementById('errorNoDO');

    if (noDO == '') {
        errorEl.style.display = 'block';
        document.getElementById('paketInfo').classList.remove('show');
        document.getElementById('timelineSection').classList.remove('show');
        return;
    }

    errorEl.style.display = 'none';

    var paket = dataTracking[noDO];

    if (!paket) {
        alert('Nomor DO/Billing tidak ditemukan. Coba: 2023001234 atau 2023001235');
        document.getElementById('paketInfo').classList.remove('show');
        document.getElementById('timelineSection').classList.remove('show');
        return;
    }
    // isi info paket
    document.getElementById('infNama').textContent = paket.nama;
    document.getElementById('infNo').textContent = paket.nomorDO;
    document.getElementById('infTgl').innerHTML = paket.tanggalKirim.replace('\n', '<br>');
    document.getElementById('infRute').textContent = paket.asal + " → " + paket.tujuan;
    document.getElementById('infAlamat').textContent = paket.alamat;
    document.getElementById('paketInfo').classList.add('show');

    // isi timeline
    var html = '';
    for (var i = 0; i < paket.perjalanan.length; i++) {
        var item = paket.perjalanan[i];
        html += '<div class="timeline-item ' + i + '">';
        html += '<div class="timeline-dot"></div>';
        html += '<div class="timeline-keterangan">';
        html += '<div class="status">' + item.keterangan + '</div>';
        if (item.sub) {
            html += '<div class="sub">' + item.sub + '</div>';
        }
        html += '</div>';
        html += '<div class="timeline-waktu">' + item.waktu + '</div>';
        html += '</div>';
    }

    document.getElementById('timelineList').innerHTML = html;
    document.getElementById('timelineSection').classList.add('show');
}

// Enter key pada input lacak
document.getElementById('noDO').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { lacakPaket(); }
});

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Render tabel
function renderTabelBahanAjar(dataBahanAjar) {
    var tbody = document.getElementById('tabelBahanAjar');
    var html = '';
    for (var i = 0; i < dataBahanAjar.length; i++) {
        var b = dataBahanAjar[i];
        html += '<tr style="border-bottom:1px solid #f0f0f0;">';
        html += '<td style="padding:10px 14px; color:#555;">' + b.kodeBarang + '</td>';
        html += '<td style="padding:10px 14px; color:#333;">' + b.namaBarang + '</td>';
        html += '<td style="padding:10px 14px; color:#555;">' + b.jenisBarang + '</td>';
        html += '<td style="padding:10px 14px; color:#333;">' + b.stok + '</td>';
        html += '<td style="padding:10px 14px;">';
        html += '<a href="#" onclick="lihatDetail(' + i + ');return false;" style="color:#4a90e2; font-size:13px; text-decoration:none;">Lihat</a>';
        html += '</td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

renderTabelBahanAjar(dataBahanAjar);

// Ketik minimal 3 huruf untuk start pencarian
document.getElementById('namaBarang').addEventListener('keyup', function (e) {
    var valuePencarian = document.querySelector('#namaBarang').value;
    if (valuePencarian.length >= 3) {
        var filteredDataBahanAjar = dataBahanAjar.filter(function (barang) {
            return barang.namaBarang.toLowerCase().includes(valuePencarian.toLowerCase());
        });
        document.querySelector('#errorNamaBarang').style.display = 'none';
        renderTabelBahanAjar(filteredDataBahanAjar);
        return;
    } else if (valuePencarian.length > 0) {
        document.querySelector('#errorNamaBarang').style.display = 'block';
        renderTabelBahanAjar([]);
        return;
    }
    document.querySelector('#errorNamaBarang').style.display = 'none';
    renderTabelBahanAjar(dataBahanAjar);
});

function lihatDetail(index) {
    document.querySelector('.bahan-ajar-form').style.display = 'none';
    var b = dataBahanAjar[index];

    var coverEl = document.getElementById('detailCover');
    var fallbackEl = document.getElementById('coverFallback');
    coverEl.style.display = 'block';
    fallbackEl.style.display = 'none';
    coverEl.src = b.cover;

    var fields = [
        { label: 'Kode Lokasi', nilai: b.kodeLokasi },
        { label: 'Kode Barang', nilai: b.kodeBarang },
        { label: 'Nama Barang', nilai: b.namaBarang },
        { label: 'Jenis Barang', nilai: b.jenisBarang },
        { label: 'Edisi', nilai: b.edisi },
        { label: 'Stok', nilai: b.stok }
    ];

    var html = '';
    for (var i = 0; i < fields.length; i++) {
        html += '<div class="detail-field-item">';
        html += '<label>' + fields[i].label + '</label>';
        html += '<div class="field-val">' + fields[i].nilai + '</div>';
        html += '</div>';
    }

    document.getElementById('detailFields').innerHTML = html;
    document.getElementById('view-list').style.display = 'none';
    document.getElementById('view-detail').style.display = 'block';
}

function kembaliKeList() {
    document.querySelector('.bahan-ajar-form').style.display = 'block';
    document.getElementById('view-detail').style.display = 'none';
    document.getElementById('view-list').style.display = 'block';
}