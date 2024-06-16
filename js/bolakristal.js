function cobaJawab(){
	var pertanyaan = document.formPertanyaan.pertanyaan.value;
	var angka_acak = Math.round(Math.random()*20);
	var hasil = jawaban(angka_acak);

	// Untuk memastikan input pertanyaan terisi
    if (pertanyaan.length <= 0) {
        alert("Bagaimana bola kristal mau menjawab kalau kamu belum memasukan pertanyaannya. Masukan pertanyaan kamu!");
        document.formPertanyaan.pertanyaan.focus();
		return false;
    }
	else if (pertanyaan.length <= 10) {
        alert("Pertanyaan kamu terlalu singkat. Coba masukan pertanyaan kamu yang jelas agar bola kristal bisa menjawabnya!");
        document.formPertanyaan.pertanyaan.focus();
		return false;
    }
	
	var result = "<p><b>Pertanyaan kamu</b> :<br />"+pertanyaan+"<br /><br /><b>Jawabannya</b> :<br />"+hasil+"</p>";
	
	document.getElementById("app").style.display = "none";
	document.getElementById("button").style.display = "";
	document.getElementById("result").innerHTML = result;
}

function ramalLagi(){
	document.getElementById("app").style.display = "";
	document.getElementById("button").style.display = "none";
	document.getElementById("result").innerHTML = "";
	document.formPertanyaan.pertanyaan.value = "";
}

function jawaban(no){
	switch(no){
	case 0:
		var jawabannya = "Yang bener aja, gak mungkinlah...";
		return jawabannya;
		break;
	case 1:
		var jawabannya = "Ya mungkin aja sih.";
		return jawabannya;
		break;
	case 2:
		var jawabannya = "Hahaha... mimpi kali ya..";
		return jawabannya;
		break;
	case 3:
		var jawabannya = "Sepertinya gak akan terjadi deh..";
		return jawabannya;
		break;
	case 4:
		var jawabannya = "Sudahlah lupakan aja..";
		return jawabannya;
		break;
	case 5:
		var jawabannya = "Tentu aja jawabannya adalah ya";
		return jawabannya;
		break;
	case 6:
		var jawabannya = "Tentu aja jawabannya adalah tidak";
		return jawabannya;
		break;
	case 7:
		var jawabannya = "Jangan lebay dong..";
		return jawabannya;
		break;
	case 8:
		var jawabannya = "Bisa aja sih..";
		return jawabannya;
		break;
	case 9:
		var jawabannya = "Ya, tentu saja..";
		return jawabannya;
		break;
	case 10:
		var jawabannya = "Kamu gak percaya dengan bola kristal? Coba aja tanya lagi..";
		return jawabannya;
		break;
	case 11:
		var jawabannya = "Hmmm... mungkin iya";
		return jawabannya;
		break;
	case 12:
		var jawabannya = "Hmmm... mungkin tidak";
		return jawabannya;
		break;
	case 13:
		var jawabannya = "Kalau kamu pikir iya, bisa jadi benar";
		return jawabannya;
		break;
	case 14:
		var jawabannya = "Ya bisa saja terjadi";
		return jawabannya;
		break;
	case 15:
		var jawabannya = "Tidak, gak mungkin terjadi";
		return jawabannya;
		break;
	case 16:
		var jawabannya = "Kenapa kamu nanya? kalau kamu gak percaya bola kristal..";
		return jawabannya;
		break;
	case 17:
		var jawabannya = "Ya iyalah..";
		return jawabannya;
		break;
	case 18:
		var jawabannya = "Ah gak mungkinlah..";
		return jawabannya;
		break;
	case 19:
		var jawabannya = "Ya bisa aja sih..";
		return jawabannya;
		break;
	case 20:
		var jawabannya = "Kenapa kamu nanya terus sih? coba tanya lagi nanti ya..";
		return jawabannya;
		break;
	default:
		var jawabannya = "Bola kristal gak ngerti pertanyaan kamu. Coba deh tanya lagi...";
		return jawabannya;
	}
}