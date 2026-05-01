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
    console.log(paket);
    // isi info paket
    document.getElementById('infNama').textContent = paket.nama;
    document.getElementById('infNo').textContent = paket.nomorDO;
    document.getElementById('infTgl').innerHTML = paket.tanggalKirim.replace('\n', '<br>');
    document.getElementById('infRute').textContent = paket.rute;
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