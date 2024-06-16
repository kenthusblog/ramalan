function descJodoh(prosentase){
	if(prosentase <= 10) var desc = "Kamu kurang perhatian dengan pasangan kamu. Dia ingin kamu lebih memperhatikannya. Perhatian sekecil apapun sangat berguna untuk kalian. Misalnya, kalau dia sedang sakit, coba tanya ke dia, apa dia sudah makan atau belum.";
	else if(prosentase > 10 && prosentase <= 20) var desc = "Kamu harus lebih terbuka dan jujur dengannya. Bila ada yang tidak kamu sukai dari dia, lebih baik jujur. Kalau perlu obrolin saat kamu dan dia sedang berduaan saja.";
	else if(prosentase > 20 && prosentase <= 30) var desc = "Kalau kamu mencintai dia, kamu harus tulus mencintai dia. Kamu jangan mengharapkan dia akan membalasnya dengan jumlah yang sama. Misalnya, kamu sudah mentraktir dia makan, jangan kamu perhitungkan lagi.";
	else if(prosentase > 30 && prosentase <= 40) var desc = "Jadilah diri kamu sendiri. Kalau dia memiliki idola, kamu tidak perlu menjadi atau bergaya seperti orang yang diidolakannya.";
	else if(prosentase > 40 && prosentase <= 50) var desc = "Janganlah menjadi seorang yang terlalu posesif. Memang tidak enak melihat dia akrab dengan banyak orang. Tapi kamu tidak perlu untuk selalu memantau dia ada dimana, bersama siapa, dan sedang apa.";
	else if(prosentase > 50 && prosentase <= 60) var desc = "Meskipun kalian saling terbuka, tidak semua hal bisa dibicarakan berdua. Hargai juga privacy dia. Kamu harus tahu apa yang perlu diketahui dan apa yang sebaiknya jangan kamu campuri.";
	else if(prosentase > 60 && prosentase <= 70) var desc = "Kamu harus bisa memberikan surprise atau kejutan untuk dia. Misalnya, kamu bawakan sekotak coklat. Pasti dia akan lebih mencintai kamu.";
	else if(prosentase > 70 && prosentase <= 80) var desc = "Hubungan kamu dan dia sudah dekat. Kalian harus lebih bisa saling menghargai dan percaya.";
	else if(prosentase > 80 && prosentase <= 90) var desc = "Hubungan kamu dengan dia sudah sangat dekat. Namun, kamu juga wajib dekat dengan keluarganya. Minimal, kamu kenal dengan mereka. Sehingga kamu pun bisa mendapat dukungan dari mereka.";
	else if(prosentase > 90) var desc = "Kalian adalah pasangan sejati. Hubungan kalian mungkin akan berlanjut ke jenjang pernikahan.";
	else var desc = "empty";
	
	return desc;
}

function hitungJodoh(){

	var nama1 = document.form.nama1.value.toUpperCase();
	var nama2 = document.form.nama2.value.toUpperCase();
	var split_nama1 = nama1.split("");
	var split_nama2 = nama2.split("");
	var ukurancinta = 0;
	var ukuranjodoh = 0;
	
	// Tipe data alpabet (a-z, A-Z, dan spasi)
	var alpabet = /^[a-z A-Z]+$/;
	
	// Untuk memastikan input nama1 terisi dan benar
    if (nama1.length <= 0) {
        alert("Masukan nama kamu!");
        document.form.nama1.focus();
		return false;
    }
	else if (!alpabet.test(nama1)) {
        alert("Sepertinya kamu salah memasukan nama kamu sendiri. Silahkan masukan nama kamu yang benar!");
        document.form.nama1.focus();
		return false;
    }
	
	// Untuk memastikan input nama1 terisi dan benar
    if (nama2.length <= 0) {
        alert("Masukan nama pasangan kamu!");
        document.form.nama2.focus();
		return false;
    }
	else if (!alpabet.test(nama2)) {
        alert("Sepertinya kamu salah memasukan nama pasangan kamu. Silahkan masukan nama pasangan kamu yang benar!");
        document.form.nama2.focus();
		return false;
    }
	
	// Hitung ukuran cinta dari nama1
	for(i = 0; i < split_nama1.length; i++){
		if(split_nama1[i]=="C") ukurancinta = ukurancinta + 2;
		if(split_nama1[i]=="I") ukurancinta = ukurancinta + 1;
		if(split_nama1[i]=="N") ukurancinta = ukurancinta + 2;
		if(split_nama1[i]=="T") ukurancinta = ukurancinta + 2;
		if(split_nama1[i]=="A") ukurancinta = ukurancinta + 1;
	}
	
	// Hitung ukuran cinta dari nama2
	for(i = 0; i < split_nama2.length; i++){
		if(split_nama2[i]=="C") ukurancinta = ukurancinta + 2;
		if(split_nama2[i]=="I") ukurancinta = ukurancinta + 1;
		if(split_nama2[i]=="N") ukurancinta = ukurancinta + 2;
		if(split_nama2[i]=="T") ukurancinta = ukurancinta + 2;
		if(split_nama2[i]=="A") ukurancinta = ukurancinta + 1;
	}
	
	// Hitung ukuran jodoh
	if(ukurancinta >= 0) ukuranjodoh = 10 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 2) ukuranjodoh = 20 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 4) ukuranjodoh = 30 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 6) ukuranjodoh = 40 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 8) ukuranjodoh = 50 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 10) ukuranjodoh = 60 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 12) ukuranjodoh = 70 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 14) ukuranjodoh = 80 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 16) ukuranjodoh = 90 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 18) ukuranjodoh = 100 - ((nama1.length+nama2.length)/2);
	if(ukurancinta >= 20) ukuranjodoh = 110 - ((nama1.length+nama2.length)/2);
	
	// fix ukuran jodoh, tidak boleh lebih dari 99% dan kurang dari 0%
	if(ukuranjodoh < 0) ukuranjodoh = 0;
	if(ukuranjodoh > 99) ukuranjodoh = 99;
	
	var deskripsi = descJodoh(ukuranjodoh);
	
	// Cetak hasil hasil ramal jodoh
	if(deskripsi == "empty"){
		var s_result = "<p>Maaf, sistem aplikasi kami tidak bisa melanjutkan untuk meramal karena menemui kesalahan. Ini mungkin terjadi karena kamu telah memasukan nama yang salah. Silahkan ulangi lagi!</p>";
	}
	else{
		var s_result = "<p>"+nama1+" dan "+nama2+" memiliki Persentase Kecocokan sebesar "+ukuranjodoh+"%.<br /><br />"+deskripsi;
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