function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    var valid = true;

    if (email == '') {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (password == '') {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }
    var data = dataPengguna.find(function (user) {
        return user.email === email && user.password === password;
    });
    if (data === undefined) {
        valid = false;
    }
    if (valid) {
        alert('Login berhasil!');
        var sesi = JSON.stringify(data);
        localStorage.setItem("sesiUser", sesi);
        window.location.href = "dashboard.html";
    } else {
        alert('Username atau password tidak tepat!');
    }
}
function daftar() {
    var nama = document.getElementById('reg-nama').value;
    var email = document.getElementById('reg-email').value;
    var password = document.getElementById('reg-password').value;
    var role = document.getElementById('reg-role').value;
    var lokasi = document.getElementById('reg-lokasi').value;

    var valid = true;

    if (nama == '') {
        document.getElementById('errorNama').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('errorNama').style.display = 'none';
    }

    if (email == '') {
        document.getElementById('errorEmail').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('errorEmail').style.display = 'none';
    }

    if (password == '') {
        document.getElementById('errorPassword').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('errorPassword').style.display = 'none';
    }

    if (role == '') {
        document.getElementById('errorRole').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('errorRole').style.display = 'none';
    }

    if (lokasi == '') {
        document.getElementById('errorLokasi').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('errorLokasi').style.display = 'none';
    }
    var idTerakhir = dataPengguna.reduce(function (previous, current, id) {
        if (current.id > id) {
            id = current.id;
        }
        return id;
    }, 0);
    dataPengguna.push({
        id: idTerakhir + 1,
        nama: nama,
        email: email,
        password: password,
        role: role,
        lokasi: lokasi
    });
    if (valid) {
        alert('Pendaftaran berhasil! Silakan login.');
        tutupModalDaftar();
    }
}
function lupaPassword() {
    var email = document.getElementById('forget-email').value;
    var data = dataPengguna.find(function (user) {
        return user.email === email;
    });
    if (data === undefined) {
        alert('Email anda tidak terdaftar. Silahkan mendaftar!');
        return;
    }
    alert('Password anda adalah: ' + data.password);
    tutupModalLupaPassword();
}