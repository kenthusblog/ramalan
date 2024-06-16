function mulaiRamal(){

	var s_nama = document.formRamalan.nama.value;
	var s_jenis = document.formRamalan.jenis.value;
	var s_tanggal = document.formRamalan.tanggal.value;
	var s_bulan = document.formRamalan.bulan.value;
	var s_tahun = document.formRamalan.tahun.value;
	var s_tgllahir = s_tanggal+s_bulan;

	// Tipe data
	var numeric = /^[0-9]+$/;
	
	// Kondisi untuk menentukan panggilan
	if(s_jenis == "Pria"){
		var s_sebut = "Saudara";
	}
	else if(s_jenis == "Wanita"){
		var s_sebut = "Saudari";
	}

	// Untuk memastikan input nama terisi
    if (s_nama.length <= 0) {
        alert("Kamu belum memasukan nama. Silahkan masukan nama kamu!");
        document.formRamalan.nama.focus();
		return false;
    }
	
	// Untuk memastikan input tanggal terisi dan benar
    if (s_tanggal.length <= 0) {
        alert("Masukan tanggal lahir!");
        document.formRamalan.tanggal.focus();
		return false;
    }
	else if (!numeric.test(s_tanggal)) {
        alert("Sepertinya kamu salah memasukan tanggal lahir. Silahkan masukan tanggal lahir yang benar!");
        document.formRamalan.tanggal.focus();
		return false;
    }
	
	// Untuk memastikan input tahun terisi dan benar
    if (s_tahun.length <= 0) {
        alert("Masukan tahun lahir!");
        document.formRamalan.tahun.focus();
		return false;
    }
	else if (!numeric.test(s_tahun)) {
        alert("Sepertinya kamu salah memasukan tahun lahir. Silahkan masukan tahun lahir yang benar!");
        document.formRamalan.tahun.focus();
		return false;
    }

	// panggil fungsi ramal tanggal
	var s_ramalan = ramalTanggal(s_tgllahir);
	
	// Cetak hasil ramalan
	if(s_ramalan == "empty"){
		var s_result = "<p>Maaf, sistem aplikasi kami tidak bisa melanjutkan untuk meramal karena menemui kesalahan. Ini mungkin terjadi karena kamu telah memasukan tanggal lahir yang salah. Silahkan ulangi lagi!</p>";
	}
	else{
		var s_result = "<p>"+s_sebut+" "+s_nama+" yang lahir pada "+s_tanggal+" "+s_bulan+" "+s_tahun+" memiliki karakterisik sebagai berikut : <br />"+s_ramalan+"</p>";
	}
	
	document.getElementById("app").style.display = "none";
	document.getElementById("button").style.display = "";
	document.getElementById("result").innerHTML = s_result;
}

function ramalLagi(){
	document.getElementById("app").style.display = "";
	document.getElementById("button").style.display = "none";
	document.getElementById("result").innerHTML = "";
}