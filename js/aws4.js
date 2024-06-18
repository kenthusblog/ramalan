var arrAw = [
	{
		i: "01",
		ar: "زوج",
		id: "suami",
		en: "husband",
		shm: {
			12: {
				ar: "",
				id: "Tidak ada keturunan mayit",
				en: ""
			},
			14: {
				ar: "",
				id: "Ada keturunan mayit",
				en: ""
			}
		}
	},
	{
		i: "02",
		ar: "زوجة",
		id: "istri",
		en: "wife",
		banyak : [{
						ar: "زوجتان",
						id: "2 istri",
						en: "2 wifes",						
					},{
						ar: "زوجات",
						id: "banyak istri",
						en: "many wifes",						
					}],
		shm: {
			14: {
				ar: "",
				id: "Tidak ada keturunan mayit",
				en: ""
			},
			18: {
				ar: "",
				id: "Ada keturunan mayit",
				en: ""
			}
		}
	},
	{
		i: "03",
		ar: "إبن",
		id: "anak lk",
		en: "son",
		shm: {
			10: {
				ar: "",
				id: "Tanpa syarat",
				en: ""
			},
		}
	},
	{
		i: "04",
		ar: "بنت",
		id: "anak pr",
		en: "daughter",
		banyak : [{
						ar: "بنتان",
						id: "2 anak pr",
						en: "2 daughters",						
					},{
						ar: "بنات",
						id: "banyak anak pr",
						en: "many daughters",						
					}],
		shm: {
			12: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			23: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			20: {
				ar: "",
				id: "Ada anak lk",
				en: ""
			}
		}
	},
	{
		i: "05",
		ar: "إبن ابن",
		id: "cucu lk jalur anak lk",
		en: "grandson",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (anak lk)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada anak lk",
				en: ""
			}
		}
	},
	{
		i: "06",
		ar: "بنت ابن",
		id: "cucu pr jalur anak lk",
		en: "granddaughter",
		banyak : [{
						ar: "بنتا ابن",
						id: "2 cucu pr jalur anak lk",
						en: "2 granddaughters",						
					}],
		shm: {
			12: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			23: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			16: {
				ar: "",
				id: "Ada satu keturunan pr yang lebih tinggi derajatnya (بنت)",
				en: ""
			},
			20: {
				ar: "",
				id: "Ada keturunan lk yang sederajat atau di bawahnya",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk yang di atasnya",
				en: ""
			},
			"02": {
				ar: "",
				id: "Ada dua atau lebih keturunan pr yang di atasnya sementara tidak ada yang mengashobahkan (keturunan lk yang sederajat atau di bawahnya)",
				en: ""
			}
		}
	},
	{
		i: "25",
		ar: "إبن ابن ابن",
		id: "cicit lk jalur cucu lk",
		en: "great-grandson",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk yang di atasnya)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk yang di atasnya",
				en: ""
			}
		}
	},
	{
		i: "26",
		ar: "بنت ابن ابن",
		id: "cicit pr jalur cucu lk",
		en: "great-granddaughter",
		banyak : [{
						ar: "بنتا ابن ابن",
						id: "2 cicit pr jalur cucu lk",
						en: "2 great-granddaughters",						
					},{
						ar: "بنات ابن",
						id: "banyak cicit pr jalur cucu lk",
						en: "many great-granddaughters",						
					}],
		shm: {
			12: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			23: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			16: {
				ar: "",
				id: "Ada satu keturunan pr yang di atasnya",
				en: ""
			},
			20: {
				ar: "",
				id: "Ada keturunan lk yang sederajat atau di bawahnya",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk yang di atasnya",
				en: ""
			},
			"02": {
				ar: "",
				id: "Ada dua atau lebih keturunan pr yang di atasnya sementara tidak ada yang mengashobahkan (keturunan lk yang sederajat atau di bawahnya)",
				en: ""
			}
		}
	},
	{
		i: "07",
		ar: "أب",
		id: "ayah",
		en: "father",
		shm: {
			16: {
				ar: "",
				id: "Ada keturunan lk ",
				en: ""
			},
			160: {
				ar: "",
				id: "Ada keturunan pr ",
				en: ""
			},
			10: {
				ar: "",
				id: "Tidak ada keturunan mayit ",
				en: ""
			}
		}
	},
	{
		i: "08",
		ar: "أم",
		id: "ibu",
		en: "mother",
		shm: {
			13: {
				ar: "",
				id: "Tidak ada keturunan dan saudara/i yang lebih dari satu ",
				en: ""
			},
			16: {
				ar: "",
				id: "Ada keturunan mayit",
				en: ""
			},
			162: {
				ar: "",
				id: "Ada dua atau lebih saudara/i",
				en: ""
			},
			130: {
				ar: "",
				id: "Ada suami/istri dan ayah (Kasus Ghorowain) ",
				en: ""
			}
		}
	},
	{
		i: "09",
		ar: "جد",
		id: "kakek jalur ayah",
		en: "grandpa",
		shm: {
			16: {
				ar: "",
				id: "Ada keturunan lk",
				en: ""
			},
			160: {
				ar: "",
				id: "Ada keturunan pr",
				en: ""
			},
			10: {
				ar: "",
				id: "Tidak ada keturunan",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada أب",
				en: ""
			}
		}
	},
	{
		i: "10",
		ar: "جدة من الأم",
		id: "nenek jalur ibu",
		en: "maternal grandmother",
		shm: {
			16: {
				ar: "",
				id: "Tidak ada yang memahjubkan (أم)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada أم",
				en: ""
			}
		}
	},
	{
		i: "11",
		ar: "جدة من الأب",
		id: "nenek jalur ayah",
		en: "paternal grandmother",
		shm: {
			16: {
				ar: "",
				id: "Tidak ada yang memahjubkan (أم atau أب)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada أم atau أب",
				en: ""
			}
		}
	},
	{
		i: "12",
		ar: "أخ ق",
		id: "saudara kandung",
		en: "brother",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, ayah)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, ayah",
				en: ""
			}
		}
	},
	{
		i: "13",
		ar: "أخت قة",
		id: "saudari kandung",
		en: "sister",
		banyak : [{
						ar: "أختان قتان",
						id: "2 saudari kandung",
						en: "2 sisters",						
					}],
		shm: {
			12: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			23: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			20: {
				ar: "",
				id: "Ada saudara kandung, kakek",
				en: ""
			},
			30: {
				ar: "",
				id: "Ada keturunan pr",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, ayah",
				en: ""
			}
		}
	},
	{
		i: "14",
		ar: "إبن أخ ق",
		id: "keponakan lk jalur saudara kandung",
		en: "nephew from brother",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung, saudari kandung yang mendapat AMG)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung, saudari kandung yang mendapat AMG",
				en: ""
			}
		}
	},
	{
		i: "15",
		ar: "أخ لأب",
		id: "saudara seayah",
		en: "brother by father",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, ayah, saudara kandung, saudari kandung yang mendapat AMG, keponakan jalur saudara kandung)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, ayah, saudara kandung, saudari kandung yang mendapat AMG, keponakan jalur saudara kandung",
				en: ""
			}
		}
	},
	{
		i: "16",
		ar: "أخت لأب",
		id: "saudari seayah",
		en: "sister by father",
		banyak : [{
						ar: "أختان لأب",
						id: "2 saudari seayah",
						en: "2 sister by father",						
					}],
		shm: {
			12: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			23: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			16: {
				ar: "",
				id: "Ada satu saudari kandung",
				en: ""
			},
			20: {
				ar: "",
				id: "Ada saudara seayah, kakek",
				en: ""
			},
			30: {
				ar: "",
				id: "Ada keturunan pr",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, ayah, saudara kandung",
				en: ""
			},
			"02": {
				ar: "",
				id: "Ada saudari kandung yang mendapat AMG",
				en: ""
			},
			"03": {
				ar: "",
				id: "Ada dua atau lebih saudari kandung sementara tidak ada yang mengashobahkan (saudara seayah, kakek)",
				en: ""
			}
		}
	},
	{
		i: "17",
		ar: "إبن أخ لأب",
		id: "keponakan lk jalur saudara seayah",
		en: "nephew from brother by father",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung",
				en: ""
			}
		}
	},
	{
		i: "18",
		ar: "أخ/أخت لأم",
		id: "saudara/i seibu",
		en: "sibling by mother",
		shm: {
			13: {
				ar: "",
				id: "Tidak sendirian",
				en: ""
			},
			16: {
				ar: "",
				id: "Sendirian",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk/pr, leluhur lk",
				en: ""
			}
		}
	},
	{
		i: "19",
		ar: "عم ق",
		id: "paman kandung jalur ayah",
		en: "uncle",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah",
				en: ""
			}
		}
	},
	{
		i: "20",
		ar: "إبن عم ق",
		id: "sepupu lk jalur paman kandung",
		en: "cousin",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung",
				en: ""
			}
		}
	},
	{
		i: "21",
		ar: "عم لأب",
		id: "paman seayah jalur ayah",
		en: "uncle by father",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung, sepupu jalur paman kandung)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung, sepupu jalur paman kandung",
				en: ""
			}
		}
	},
	{
		i: "22",
		ar: "إبن عم لأب",
		id: "sepupu lk jalur paman seayah",
		en: "cousin from uncle by father",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung/seayah, sepupu jalur paman kandung)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung/seayah, sepupu jalur paman kandung",
				en: ""
			}
		}
	},
	{
		i: "50",
		ar: "معتق / معتقة",
		id: "mantan majikan yang memerdekakan",
		en: "former employer",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada yang memahjubkan (keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung/seayah, sepupu jalur paman kandung/seayah)",
				en: ""
			},
			0: {
				ar: "",
				id: "Ada keturunan lk, leluhur lk, saudara kandung/seayah, saudari kandung/seayah yang mendapat AMG, keponakan jalur saudara kandung/seayah, paman kandung/seayah, sepupu jalur paman kandung/seayah",
				en: ""
			}
		}
	},
	{
		i: "100",
		ar: "بيت المال / ذوي الأرحام",
		id: "",
		en: "former employer",
		shm: {
			10: {
				ar: "",
				id: "Tidak ada ahli waris yang selain suami/istri",
				en: ""
			}
		}
	},
]
function getAW(id){
	for(let c=0; c<arrAw.length; c++){
		if(parseInt(arrAw[c].i) == id) return arrAw[c];
	}
	return 0;
}
function getAWindex(id){
	for(let c=0; c<arrAw.length; c++){
		if(parseInt(arrAw[c].i) == id) return c;
	}
	return -1;
}

