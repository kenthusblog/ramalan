// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('waris', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url:'/', cache: false,
      templateUrl: 'page/home.html',
      controller: 'HomeCtrl'
    })
    .state('materi', {
      url:'/materi',
      templateUrl: 'page/materi.html',
      controller: 'MateriCtrl'
    })
    .state('materiread', {
      url:'/materi/:readId',
      templateUrl: 'page/materiread.html',
      controller: 'MateriReadCtrl'
    })
    .state('kalkulator', {
      url:'/kalkulator/:stepId',
      templateUrl: 'page/kalkulator.html',
      controller: 'KalkulatorCtrl'
    })
    .state('hasil', {
      url:'/hasil',
      templateUrl: 'page/hasil.html',
      controller: 'HasilCtrl'
    })
    .state('tentang', {
      url:'/tentang',
      templateUrl: 'page/tentang.html',
      controller: 'TentangCtrl'
    });

    $urlRouterProvider.otherwise('/');
})

.controller('HomeCtrl', function ($scope, $rootScope, $state) {
  $rootScope.inp = {
    harta: 0, hak1: 0, hak2: 0, hak3:0, hak4:0, putra:0, putri:0, cucuLk:0, cucuPr:0,
    bapak:0, ibu:0, suami:0, istri:0, kakek:0, nenekB:0, nenekI:0, nenekK:0,
    saudaraK:0, saudariK:0, saudaraB:0, saudariB:0, saudaraI:0, saudariI:0, putraSK:0, putraSB:0,
    pamanK:0, pamanB:0, putraPK:0, putraPB:0, pria:0, wanita:0
  }

  $scope.goto = function(dest, param){
    $state.go(dest, param);
  }
})
.controller('MateriCtrl', function ($scope) {})
.controller('MateriReadCtrl', function ($scope, $stateParams) {
  $scope.readId = ($stateParams.readId==undefined)?1:$stateParams.readId;
})
.controller('TentangCtrl', function ($scope) {})

.controller('KalkulatorCtrl', function ($scope, $rootScope, $stateParams, $state, $ionicPopup) {
  $scope.showAlert = function(message) {
   $ionicPopup.alert({ title: 'Perhatian!', template: message, 
    buttons:[{
      text: 'OK',
      type:'button-balanced'
    }] 
   });
  };

  $scope.stepId = ($stateParams.stepId==undefined)?1:$stateParams.stepId;
  $scope.lanjut = function(step){
    switch(parseInt(step)){
      case 1:
        if ($rootScope.inp.harta == 0) {
          $scope.showAlert("Harta Waris (Tarikah) Harus Diisi");
          return false;
        }
        break;

      case 2:
        if($rootScope.inp.hak4 > $rootScope.inp.harta/3){
          $scope.showAlert("Wasiat Tidak Boleh lebih dari 1/3 Tarikah. Isi form wasiat lagi");
          return false;
        }
        if(($rootScope.inp.harta - $rootScope.inp.hak1 - $rootScope.inp.hak2 - $rootScope.inp.hak3 - $rootScope.inp.hak4) <= 0){
          $scope.showAlert("Harta Waris <= 0, Penghitungan Waris tidak bisa dilanjutkan. Ulangi dari awal");
          return false;
        }
        break;

      case 4:
        if (($rootScope.inp.suami == 1) && ($rootScope.inp.istri > 0)) {
          $scope.showAlert("Siapa yang meninggal? Suami atau Istri?");
          return false;
        }
        break;
    }

    $state.go('kalkulator', {stepId:(parseInt(step)+1)});
  }
  $scope.hitung = function(){
    if (
      $rootScope.inp.bapak == 0 && $rootScope.inp.ibu == 0 && $rootScope.inp.putra == 0 && $rootScope.inp.putri == 0 && 
      $rootScope.inp.suami == 0 && $rootScope.inp.istri == 0 && $rootScope.inp.cucuLk == 0 && $rootScope.inp.cucuPr == 0 && 
      $rootScope.inp.kakek == 0 && $rootScope.inp.nenekB == 0 && $rootScope.inp.nenekI == 0 && $rootScope.inp.nenekK == 0 && 
      $rootScope.inp.saudaraK == 0 && $rootScope.inp.saudariK == 0 && $rootScope.inp.saudaraB == 0 && $rootScope.inp.saudariB == 0 && 
      $rootScope.inp.saudaraI == 0 && $rootScope.inp.saudariI == 0 && $rootScope.inp.putraSK == 0 && $rootScope.inp.putraSB == 0 && 
      $rootScope.inp.pamanK == 0 && $rootScope.inp.pamanB == 0 && $rootScope.inp.putraPK == 0 && $rootScope.inp.putraPB == 0 && 
      $rootScope.inp.pria == 0 && $rootScope.inp.wanita == 0) {
      $scope.showAlert("Ahli waris masih kosong, Silahkan diisi");
      return false;
    }
    $state.go('hasil');
  }
})

.controller('HasilCtrl', function ($scope, $rootScope, $ionicPopup) {
    $scope.showAlert = function(message) {
     $ionicPopup.alert({ title: 'Perhatian!', template: message, 
      buttons:[{
        text: 'OK',
        type:'button-balanced'
      }] 
     });
    };

    var iTarikah=$rootScope.inp.harta;
    var iHak1=$rootScope.inp.hak1;
    var iHak2=$rootScope.inp.hak2;
    var iHak3=$rootScope.inp.hak3;
    var iHak4=$rootScope.inp.hak4;
    var iHarta = iTarikah - iHak1 - iHak2 - iHak3 - iHak4;
    
    var iJumlahBapak=$rootScope.inp.bapak;
    var iJumlahIbu=$rootScope.inp.ibu;
    var iJumlahSuami=$rootScope.inp.suami;
    var iJumlahIstri=$rootScope.inp.istri;
    var iJumlahAnakLaki=$rootScope.inp.putra;
    var iJumlahAnakPerempuan=$rootScope.inp.putri;
    var iJumlahCucuLaki=$rootScope.inp.cucuLk;
    var iJumlahCucuPerempuan=$rootScope.inp.cucuPr;
    var iJumlahKakek=$rootScope.inp.kakek;
    var iJumlahNenekBapak=$rootScope.inp.nenekB;
    var iJumlahNenekIbu=$rootScope.inp.nenekI;
    var iJumlahNenekKakek=$rootScope.inp.nenekK;
    var iJumlahSaudaraKandung=$rootScope.inp.saudaraK;
    var iJumlahSaudariKandung=$rootScope.inp.saudariK;
    var iJumlahSaudaraSebapak=$rootScope.inp.saudaraB;
    var iJumlahSaudaraSeibu=$rootScope.inp.saudaraI;
    var iJumlahSaudariSebapak=$rootScope.inp.saudariB;
    var iJumlahSaudariSeibu=$rootScope.inp.saudariI;
    var iJumlahPutraSaudaraKandung=$rootScope.inp.putraSK;
    var iJumlahPutraSaudaraSebapak=$rootScope.inp.putraSB;
    var iJumlahPamanKandung=$rootScope.inp.pamanK;
    var iJumlahPamanSebapak=$rootScope.inp.pamanB;
    var iJumlahPutraPamanKandung=$rootScope.inp.putraPK;
    var iJumlahPutraPamanSebapak=$rootScope.inp.putraPB;
    var iJumlahPriaMerdekakan=$rootScope.inp.pria;
    var iJumlahWanitaMerdekakan=$rootScope.inp.wanita;
    var result = [];

    var iJthAnakLaki       = 0;
    var iJthAnakPerempuan  = 0;
    var iJthSuami          = 0;  
    var iJthIstri          = 0;
    var iJthBapak          = 0;  
    var iJthIbu            = 0;
    var iJthKakek          = 0;
    var iJthNenekBapak     = 0;
    var iJthNenekIbu       = 0;
    var iJthNenekKakek     = 0;
    var iJthSaudaraKandung = 0;
    var iJthSaudariKandung = 0;
    var iJthSaudaraSebapak = 0;
    var iJthSaudariSebapak = 0;
    var iJthSaudaraSeibu   = 0;
    var iJthSaudariSeibu   = 0;

    if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0) {

      if(iJumlahCucuLaki == 0 && iJumlahCucuPerempuan == 0){
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta/2);
          
          if(iJumlahIbu == 1){
            iJthIbu   = Math.round(iHarta/6)*iJumlahIbu;
          } // ibu = 1

          if(iJumlahIbu == 0){
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
              iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
              iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
              iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
              iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
            }
          } // ibu = 0

          if(iJumlahBapak > 0){
            iJthBapak = Math.round(iHarta/3);
            iSisa   = iHarta - (iJthSuami+iJthIbu+iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            iJthBapak   = iJthBapak + iSisa*iJumlahBapak;
            iSisa   = iHarta - (iJthSuami + iJthIbu + iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu>0) 
              result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraKandung>0) 
              result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariKandung>0) 
              result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSeibu>0) 
              result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraSebapak>0) 
              result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSebapak>0) 
              result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraKandung>0) 
              result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraSebapak>0) 
              result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanKandung>0) 
              result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanSebapak>0) 
              result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanKandung>0) 
              result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanSebapak>0) 
              result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPriaMerdekakan>0) 
              result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
            if (iJumlahWanitaMerdekakan>0) 
              result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
          } // bapak > 0

          if(iJumlahBapak == 0){
            if(iJumlahKakek == 1){
              iJthKakek = Math.round(iHarta/3)*iJumlahKakek;
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              iJthKakek   = iJthKakek + iSisa*iJumlahKakek;
              iSisa   = iHarta - (iJthSuami + iJthIbu + iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu>0) 
                result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraKandung>0) 
                result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariKandung>0) 
                result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSeibu>0) 
                result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraSebapak>0) 
                result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSebapak>0) 
                result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraKandung>0) 
                result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraSebapak>0) 
                result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanKandung>0) 
                result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanSebapak>0) 
                result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanKandung>0) 
                result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanSebapak>0) 
                result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPriaMerdekakan>0) 
                result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
              if (iJumlahWanitaMerdekakan>0) 
                result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
            } // kakek = 1

            if(iJumlahKakek == 0){
              if(iJumlahSaudaraSeibu == 1){
                iJthSaudaraSeibu = Math.round(iHarta/6);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/6): " + iJthSaudaraSeibu);
              }
              if(iJumlahSaudaraSeibu > 1){
                iJthSaudaraSeibu = Math.round(iHarta/3);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/3): " + iJthSaudaraSeibu/iJumlahSaudaraSeibu);
              }
              if(iJumlahSaudaraKandung > 0){
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                if(iJumlahSaudariKandung == 0){
                  iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
                }
                if(iJumlahSaudariKandung > 0){
                  iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                }
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              }
              if(iJumlahSaudaraKandung == 0){
                if(iJumlahSaudariKandung > 1){
                  iJthSaudariKandung = Math.round((2*iHarta/3)/iJumlahSaudariKandung);
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                  result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung);
                  if(iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                }
                if(iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0){
                  iJthSaudariKandung = Math.round(iHarta/2);
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1){
                    iJthSaudariSebapak = Math.round(iHarta/2);
                    result.push("Jatah tiap Saudari Sebapak (1/2): " + iJthSaudariSebapak/iJumlahSaudariSebapak);
                  }
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1){
                    iJthSaudariSebapak = Math.round((2*iHarta/3)/iJumlahSaudariSebapak);
                    result.push("Jatah tiap Saudari Sebapak (2/3): " + iJthSaudariSebapak);
                  }
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahSaudariKandung == 1) result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                }
                if(iJumlahSaudaraSebapak > 0){
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa/(iJumlahSaudaraSebapak+iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
                  if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak (Sisa): " + iJthSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                }
                if(iJumlahSaudaraSebapak == 0){
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0){
                    iJthPutraSaudaraKandung = Math.round(iSisa/iJumlahPutraSaudaraKandung);
                    iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraKandung*iJumlahPutraSaudaraKandung);
                    result.push("Jatah tiap Putra dari Saudara Sekandung (Sisa): " + iJthPutraSaudaraKandung);
                    if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                  }
                  if(iJumlahPutraSaudaraKandung == 0){
                    iJthPutraSaudaraSebapak = Math.round(iSisa/iJumlahPutraSaudaraSebapak);
                    if(iJumlahPutraSaudaraSebapak > 0){
                      iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraSebapak*iJumlahPutraSaudaraSebapak);
                      result.push("Jatah tiap Putra dari Saudara Sebapak (Sisa): " + iJthPutraSaudaraSebapak);
                      if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                    }
                    if(iJumlahPutraSaudaraSebapak == 0){
                      iJthPamanKandung = Math.round(iSisa/iJumlahPamanKandung);
                      if(iJumlahPamanKandung > 0){
                        iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanKandung*iJumlahPamanKandung);
                        result.push("Jatah tiap Paman Sekandung (Sisa): " + iJthPamanKandung);
                        if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                      }
                      if(iJumlahPamanKandung == 0){
                        iJthPamanSebapak = Math.round(iSisa/iJumlahPamanSebapak);
                        if(iJumlahPamanSebapak > 0){
                          iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanSebapak*iJumlahPamanSebapak);
                          result.push("Jatah tiap Paman Sebapak (Sisa): " + iJthPamanSebapak);
                          if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                        }
                        if(iJumlahPamanSebapak == 0){
                          iJthPutraPamanKandung = Math.round(iSisa/iJumlahPutraPamanKandung);
                          if(iJumlahPutraPamanKandung > 0){
                            iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanKandung*iJumlahPutraPamanKandung);
                            result.push("Jatah tiap Putra dari Paman Sekandung (Sisa): " + iJthPutraPamanKandung);
                            if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                          }
                          if(iJumlahPutraPamanKandung == 0){
                            iJthPutraPamanSebapak = Math.round(iSisa/iJumlahPutraPamanSebapak);
                            if(iJumlahPutraPamanSebapak > 0){
                              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanSebapak*iJumlahPutraPamanSebapak);
                              result.push("Jatah tiap Putra dari Paman Sebapak (Sisa): " + iJthPutraPamanSebapak);
                              if(iJumlahPriaMerdekakan > 0) result.push("Jatah Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                            }
                            if(iJumlahPutraPamanSebapak == 0){
                              iJthPriaMerdekakan = Math.round(iSisa/(iJumlahPriaMerdekakan+iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if(iJumlahPriaMerdekakan > 0){
                                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPriaMerdekakan*iJumlahPriaMerdekakan);
                                result.push("Jatah Pria yang Memerdekakan Budak (Sisa): " + iJthPriaMerdekakan);
                              }
                              if(iJumlahWanitaMerdekakan > 0){
                                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthWanitaMerdekakan*iJumlahWanitaMerdekakan);
                                result.push("Jatah Wanita yang Memerdekakan Budak (Sisa): " + iJthWanitaMerdekakan);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if(iJumlahSaudariSeibu == 1){
                  iJthSaudariSeibu = Math.round(iHarta/6);
                  result.push("Jatah tiap Saudari Seibu (1/6) :" + iJthSaudariSeibu);
                }
                if(iJumlahSaudariSeibu > 1){
                  iJthSaudariSeibu = Math.round(iHarta/3);
                  result.push("Jatah tiap Saudari Seibu (1/3) :" + iJthSaudariSeibu/iJumlahSaudariSeibu);
                }
              }
            } // kakek = 0
          } // bapak = 1

        } // suami = 0

        if (iJumlahSuami == 0 && iJumlahIstri == 0) {
          if(iJumlahIbu == 1){
            iJthIbu   = Math.round(iHarta/3)*iJumlahIbu;
          }
          if(iJumlahIbu == 0){
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
              iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
              iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
              iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
              iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
            }
          }
          if(iJumlahBapak > 0){
            iJthBapak = Math.round(iHarta/3);
            iSisa   = iHarta - (iJthIbu+iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            iJthBapak   = iJthBapak + iSisa*iJumlahBapak;
            iSisa   = iHarta - (iJthIbu + iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu>0) 
              result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraKandung>0) 
              result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariKandung>0) 
              result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSeibu>0) 
              result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraSebapak>0) 
              result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSebapak>0) 
              result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraKandung>0) 
              result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraSebapak>0) 
              result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanKandung>0) 
              result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanSebapak>0) 
              result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanKandung>0) 
              result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanSebapak>0) 
              result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPriaMerdekakan>0) 
              result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
            if (iJumlahWanitaMerdekakan>0) 
              result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
          }
          if(iJumlahBapak == 0){
            if(iJumlahKakek == 1){
              iJthKakek = Math.round(iHarta/3)*iJumlahKakek;
              iSisa   = iHarta - (iJthIbu+iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              iJthKakek   = iJthKakek + iSisa*iJumlahKakek;
              iSisa   = iHarta - (iJthIbu + iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu>0) 
                result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraKandung>0) 
                result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariKandung>0) 
                result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSeibu>0) 
                result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraSebapak>0) 
                result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSebapak>0) 
                result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraKandung>0) 
                result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraSebapak>0) 
                result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanKandung>0) 
                result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanSebapak>0) 
                result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanKandung>0) 
                result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanSebapak>0) 
                result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPriaMerdekakan>0) 
                result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
              if (iJumlahWanitaMerdekakan>0) 
                result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
            } // kakek = 1

            if(iJumlahKakek == 0){
              if(iJumlahSaudaraSeibu == 1){
                iJthSaudaraSeibu = Math.round(iHarta/6);
                iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/6): " + iJthSaudaraSeibu);
              }
              if(iJumlahSaudaraSeibu > 1){
                iJthSaudaraSeibu = Math.round(iHarta/3);
                iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/3): " + iJthSaudaraSeibu/iJumlahSaudaraSeibu);
              }
              if(iJumlahSaudaraKandung > 0){
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                if(iJumlahSaudariKandung == 0){
                  iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
                }
                if(iJumlahSaudariKandung > 0){
                  iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                }
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              }
              if(iJumlahSaudaraKandung == 0){
                if(iJumlahSaudariKandung > 1){
                  iJthSaudariKandung = Math.round((2*iHarta/3)/iJumlahSaudariKandung);
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                  result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung);
                  if(iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                }
                if(iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0){
                  iJthSaudariKandung = Math.round(iHarta/2);
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1){
                    iJthSaudariSebapak = Math.round(iHarta/2);
                    result.push("Jatah tiap Saudari Sebapak (1/2): " + iJthSaudariSebapak/iJumlahSaudariSebapak);
                  }
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1){
                    iJthSaudariSebapak = Math.round((2*iHarta/3)/iJumlahSaudariSebapak);
                    result.push("Jatah tiap Saudari Sebapak (2/3): " + iJthSaudariSebapak);
                  }
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahSaudariKandung == 1) result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                }
                if(iJumlahSaudaraSebapak > 0){
                  iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa/(iJumlahSaudaraSebapak+iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
                  if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: " + iJthSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                }
                if(iJumlahSaudaraSebapak == 0){
                  iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0){
                    iJthPutraSaudaraKandung = Math.round(iSisa/iJumlahPutraSaudaraKandung);
                    iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraKandung*iJumlahPutraSaudaraKandung);
                    result.push("Jatah tiap Putra dari Saudara Sekandung (Sisa): " + iJthPutraSaudaraKandung);
                    if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                  }
                  if(iJumlahPutraSaudaraKandung == 0){
                    iJthPutraSaudaraSebapak = Math.round(iSisa/iJumlahPutraSaudaraSebapak);
                    if(iJumlahPutraSaudaraSebapak > 0){
                      iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraSebapak*iJumlahPutraSaudaraSebapak);
                      result.push("Jatah tiap Putra dari Saudara Sebapak (Sisa): " + iJthPutraSaudaraSebapak);
                      if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                    }
                    if(iJumlahPutraSaudaraSebapak == 0){
                      iJthPamanKandung = Math.round(iSisa/iJumlahPamanKandung);
                      if(iJumlahPamanKandung > 0){
                        iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanKandung*iJumlahPamanKandung);
                        result.push("Jatah tiap Paman Sekandung (Sisa): " + iJthPamanKandung);
                        if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                      }
                      if(iJumlahPamanKandung == 0){
                        iJthPamanSebapak = Math.round(iSisa/iJumlahPamanSebapak);
                        if(iJumlahPamanSebapak > 0){
                          iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanSebapak*iJumlahPamanSebapak);
                          result.push("Jatah tiap Paman Sebapak (Sisa): " + iJthPamanSebapak);
                          if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                        }
                        if(iJumlahPamanSebapak == 0){
                          iJthPutraPamanKandung = Math.round(iSisa/iJumlahPutraPamanKandung);
                          if(iJumlahPutraPamanKandung > 0){
                            iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanKandung*iJumlahPutraPamanKandung);
                            result.push("Jatah tiap Putra dari Paman Sekandung (Sisa): " + iJthPutraPamanKandung);
                            if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                          }
                          if(iJumlahPutraPamanKandung == 0){
                            iJthPutraPamanSebapak = Math.round(iSisa/iJumlahPutraPamanSebapak);
                            if(iJumlahPutraPamanSebapak > 0){
                              iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanSebapak*iJumlahPutraPamanSebapak);
                              result.push("Jatah tiap Putra dari Paman Sebapak (Sisa): " + iJthPutraPamanSebapak);
                              if(iJumlahPriaMerdekakan > 0) result.push("Jatah Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                            }
                            if(iJumlahPutraPamanSebapak == 0){
                              iJthPriaMerdekakan = Math.round(iSisa/(iJumlahPriaMerdekakan+iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if(iJumlahPriaMerdekakan > 0){
                                iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPriaMerdekakan*iJumlahPriaMerdekakan);
                                result.push("Jatah Pria yang Memerdekakan Budak (Sisa): " + iJthPriaMerdekakan);
                              }
                              if(iJumlahWanitaMerdekakan > 0){
                                iSisa   = iHarta - (iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthWanitaMerdekakan*iJumlahWanitaMerdekakan);
                                result.push("Jatah Wanita yang Memerdekakan Budak (Sisa): " + iJthWanitaMerdekakan);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if(iJumlahSaudariSeibu == 1){
                  iJthSaudariSeibu = Math.round(iHarta/6);
                  result.push("Jatah tiap Saudari Seibu (1/6) :" + iJthSaudariSeibu);
                }
                if(iJumlahSaudariSeibu > 1){
                  iJthSaudariSeibu = Math.round(iHarta/3);
                  result.push("Jatah tiap Saudari Seibu (1/3) :" + iJthSaudariSeibu/iJumlahSaudariSeibu);
                }
              }
            } // kakek = 0
          } // bapak = 0
        } // suami =0 & istri = 0

        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta/4)/iJumlahIstri);
          if(iJumlahIbu == 1){
            iJthIbu   = Math.round(iHarta/4)*iJumlahIbu;
          }
          if(iJumlahIbu == 0){
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
              iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
              iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
              iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
              iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
            }
            if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
              iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
            }
          }
          if(iJumlahBapak > 0){
            iJthBapak = Math.round(iHarta/2);
            iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            iJthBapak   = iJthBapak + iSisa*iJumlahBapak;
            iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthBapak+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
            if (iJumlahSaudaraSeibu>0) 
              result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraKandung>0) 
              result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariKandung>0) 
              result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSeibu>0) 
              result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudaraSebapak>0) 
              result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahSaudariSebapak>0) 
              result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraKandung>0) 
              result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraSaudaraSebapak>0) 
              result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanKandung>0) 
              result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPamanSebapak>0) 
              result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanKandung>0) 
              result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Bapak)");
            if (iJumlahPutraPamanSebapak>0) 
              result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Bapak)");
            if (iJumlahPriaMerdekakan>0) 
              result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
            if (iJumlahWanitaMerdekakan>0) 
              result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
          }
          if(iJumlahBapak == 0){
            if(iJumlahKakek == 1){
              iJthKakek = Math.round(iHarta/2)*iJumlahKakek;
              iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              iJthKakek   = iJthKakek + iSisa*iJumlahKakek;
              iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
              if (iJumlahSaudaraSeibu>0) 
                result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraKandung>0) 
                result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariKandung>0) 
                result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSeibu>0) 
                result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudaraSebapak>0) 
                result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahSaudariSebapak>0) 
                result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraKandung>0) 
                result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraSaudaraSebapak>0) 
                result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanKandung>0) 
                result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPamanSebapak>0) 
                result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanKandung>0) 
                result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Kakek)");
              if (iJumlahPutraPamanSebapak>0) 
                result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Kakek)");
              if (iJumlahPriaMerdekakan>0) 
                result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
              if (iJumlahWanitaMerdekakan>0) 
                result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
            }
            if(iJumlahKakek == 0){
              if(iJumlahSaudaraSeibu == 1){
                iJthSaudaraSeibu = Math.round(iHarta/6);
                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/6): " + iJthSaudaraSeibu);
              }
              if(iJumlahSaudaraSeibu > 1){
                iJthSaudaraSeibu = Math.round(iHarta/3);
                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                result.push("Jatah tiap Saudara Seibu (1/3): " + iJthSaudaraSeibu/iJumlahSaudaraSeibu);
              }
              if(iJumlahSaudaraKandung > 0){
                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                if(iJumlahSaudariKandung == 0){
                  iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
                }
                if(iJumlahSaudariKandung > 0){
                  iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                }
                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudara Kandung: " + iJthSaudaraKandung);
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              }
              if(iJumlahSaudaraKandung == 0){
                if(iJumlahSaudariKandung > 1){
                  iJthSaudariKandung = Math.round((2*iHarta/3)/iJumlahSaudariKandung);
                  iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                  result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung);
                  if(iJumlahSaudariSebapak > 0 && iJumlahSaudaraSebapak == 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                }
                if(iJumlahSaudariKandung == 1 || iJumlahSaudariKandung == 0){
                  iJthSaudariKandung = Math.round(iHarta/2);
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak == 1){
                    iJthSaudariSebapak = Math.round(iHarta/2);
                    result.push("Jatah tiap Saudari Sebapak (1/2): " + iJthSaudariSebapak/iJumlahSaudariSebapak);
                  }
                  if(iJumlahSaudaraSebapak == 0 && iJumlahSaudariSebapak > 1){
                    iJthSaudariSebapak = Math.round((2*iHarta/3)/iJumlahSaudariSebapak);
                    result.push("Jatah tiap Saudari Sebapak (2/3): " + iJthSaudariSebapak);
                  }
                  iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahSaudariKandung == 1) result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                }
                if(iJumlahSaudaraSebapak > 0){
                  iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa/(iJumlahSaudaraSebapak+iJumlahSaudariSebapak));
                  iJthSaudariSebapak = iJthSaudaraSebapak;
                  iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
                  if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak (Sisa): " + iJthSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                }
                if(iJumlahSaudaraSebapak == 0){
                  iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0){
                    iJthPutraSaudaraKandung = Math.round(iSisa/iJumlahPutraSaudaraKandung);
                    iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraKandung*iJumlahPutraSaudaraKandung);
                    result.push("Jatah tiap Putra dari Saudara Sekandung (Sisa): " + iJthPutraSaudaraKandung);
                    if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                    if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sekandung)");
                  }
                  if(iJumlahPutraSaudaraKandung == 0){
                    iJthPutraSaudaraSebapak = Math.round(iSisa/iJumlahPutraSaudaraSebapak);
                    if(iJumlahPutraSaudaraSebapak > 0){
                      iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraSaudaraSebapak*iJumlahPutraSaudaraSebapak);
                      result.push("Jatah tiap Putra dari Saudara Sebapak (Sisa): " + iJthPutraSaudaraSebapak);
                      if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                      if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Saudara Sebapak)");
                    }
                    if(iJumlahPutraSaudaraSebapak == 0){
                      iJthPamanKandung = Math.round(iSisa/iJumlahPamanKandung);
                      if(iJumlahPamanKandung > 0){
                        iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanKandung*iJumlahPamanKandung);
                        result.push("Jatah tiap Paman Sekandung (Sisa): " + iJthPamanKandung);
                        if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                        if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sekandung)");
                      }
                      if(iJumlahPamanKandung == 0){
                        iJthPamanSebapak = Math.round(iSisa/iJumlahPamanSebapak);
                        if(iJumlahPamanSebapak > 0){
                          iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPamanSebapak*iJumlahPamanSebapak);
                          result.push("Jatah tiap Paman Sebapak (Sisa): " + iJthPamanSebapak);
                          if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                          if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Paman Sebapak)");
                        }
                        if(iJumlahPamanSebapak == 0){
                          iJthPutraPamanKandung = Math.round(iSisa/iJumlahPutraPamanKandung);
                          if(iJumlahPutraPamanKandung > 0){
                            iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanKandung*iJumlahPutraPamanKandung);
                            result.push("Jatah tiap Putra dari Paman Sekandung (Sisa): " + iJthPutraPamanKandung);
                            if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                            if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sekandung)");
                          }
                          if(iJumlahPutraPamanKandung == 0){
                            iJthPutraPamanSebapak = Math.round(iSisa/iJumlahPutraPamanSebapak);
                            if(iJumlahPutraPamanSebapak > 0){
                              iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPutraPamanSebapak*iJumlahPutraPamanSebapak);
                              result.push("Jatah tiap Putra dari Paman Sebapak (Sisa): " + iJthPutraPamanSebapak);
                              if(iJumlahPriaMerdekakan > 0) result.push("Jatah Pria yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Putra dari Paman Sebapak)");
                            }
                            if(iJumlahPutraPamanSebapak == 0){
                              iJthPriaMerdekakan = Math.round(iSisa/(iJumlahPriaMerdekakan+iJumlahWanitaMerdekakan));
                              iJthWanitaMerdekakan = iJthPriaMerdekakan;
                              if(iJumlahPriaMerdekakan > 0){
                                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthPriaMerdekakan*iJumlahPriaMerdekakan);
                                result.push("Jatah Pria yang Memerdekakan Budak (Sisa): " + iJthPriaMerdekakan);
                              }
                              if(iJumlahWanitaMerdekakan > 0){
                                iSisa   = iHarta - (iJthIstri*iJumlahIstri+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu*iJumlahSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudariSebapak*iJumlahSaudariSebapak+iJthWanitaMerdekakan*iJumlahWanitaMerdekakan);
                                result.push("Jatah Wanita yang Memerdekakan Budak (Sisa): " + iJthWanitaMerdekakan);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if(iJumlahSaudariSeibu == 1){
                  iJthSaudariSeibu = Math.round(iHarta/6);
                  result.push("Jatah tiap Saudari Seibu (1/6) :" + iJthSaudariSeibu);
                }
                if(iJumlahSaudariSeibu > 1){
                  iJthSaudariSeibu = Math.round(iHarta/3);
                  result.push("Jatah tiap Saudari Seibu (1/3) :" + iJthSaudariSeibu/iJumlahSaudariSeibu);
                }
              }
            } // kakek = 0
          } // bapak = 0          
        } // istri > 0
      
      } // tdk punya cucu
      
      if(iJumlahCucuLaki > 0 && iJumlahCucuPerempuan > 0){
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta/4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round(iHarta/8);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta/6);
        }
        if(iJumlahIbu == 0){
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
            iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
            iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
            iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
            iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta/6);
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
        }
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
        iJthCucuLaki = Math.round((2 * iSisa)/(2*iJumlahCucuLaki+iJumlahCucuPerempuan));
        iJthCucuPerempuan = Math.round((iSisa)/(2*iJumlahCucuLaki+iJumlahCucuPerempuan));
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthCucuLaki*iJumlahCucuLaki + iJthCucuPerempuan*iJumlahCucuPerempuan);
        result.push("Jatah tiap Cucu Laki-laki (Sisa): " + iJthCucuLaki);
        result.push("Jatah tiap Cucu Perempuan (Sisa): " + iJthCucuPerempuan);
        if (iJumlahSaudaraKandung>0) 
          result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariKandung>0) 
          result.push("Jatah tiap Saudari kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudaraSebapak>0) 
          result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudaraSeibu>0) 
          result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariSebapak>0) 
          result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariSeibu>0) 
          result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraSaudaraKandung>0) 
          result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraSaudaraSebapak>0) 
          result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPamanKandung>0) 
          result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPamanSebapak>0) 
          result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraPamanKandung>0) 
          result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraPamanSebapak>0) 
          result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPriaMerdekakan>0) 
          result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahWanitaMerdekakan>0) 
          result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Cucu Laki-Laki)");
      }
      if (iJumlahCucuLaki > 0 && iJumlahCucuPerempuan == 0){
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta/4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta/8)/iJumlahIstri);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta/6);
        }
        if(iJumlahIbu == 0){
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
            iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
            iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
            iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
            iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta/6);
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
        }
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
        iJthCucuLaki = iSisa/iJumlahCucuLaki;
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthCucuLaki*iJumlahCucuLaki);
        result.push("Jatah tiap Cucu Laki-laki (Sisa): " + iJthCucuLaki);
        if (iJumlahSaudaraKandung>0) 
          result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariKandung>0) 
          result.push("Jatah tiap Saudari kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudaraSebapak>0) 
          result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudaraSeibu>0) 
          result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariSebapak>0) 
          result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahSaudariSeibu>0) 
          result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraSaudaraKandung>0) 
          result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraSaudaraSebapak>0) 
          result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPamanKandung>0) 
          result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPamanSebapak>0) 
          result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraPamanKandung>0) 
          result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPutraPamanSebapak>0) 
          result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahPriaMerdekakan>0) 
          result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Cucu Laki-Laki)");
        if (iJumlahWanitaMerdekakan>0) 
          result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Cucu Laki-Laki)");
      }
      if (iJumlahCucuLaki == 0 && iJumlahCucuPerempuan > 0){
        if (iJumlahSuami == 1) {
          iJthSuami = Math.round(iHarta/4);
        }
        if (iJumlahIstri > 0) {
          iJthIstri = Math.round((iHarta/8)/iJumlahIstri);
        }
        if (iJumlahIbu == 1) {
          iJthIbu = Math.round(iHarta/6);
        }
        if(iJumlahIbu == 0){
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
            iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
            iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
            iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
            iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
          }
          if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
            iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
          }
        }
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta/6);
          if (iJumlahSaudaraSeibu>0) 
            result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Bapak)");
          if (iJumlahSaudaraKandung>0) 
            result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Bapak)");
          if (iJumlahSaudariKandung>0) 
            result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Bapak)");
          if (iJumlahSaudariSeibu>0) 
            result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Bapak)");
          if (iJumlahSaudaraSebapak>0) 
            result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Bapak)");
          if (iJumlahSaudariSebapak>0) 
            result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Bapak)");
          if (iJumlahPutraSaudaraKandung>0) 
            result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Bapak)");
          if (iJumlahPutraSaudaraSebapak>0) 
            result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Bapak)");
          if (iJumlahPamanKandung>0) 
            result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Bapak)");
          if (iJumlahPamanSebapak>0) 
            result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Bapak)");
          if (iJumlahPutraPamanKandung>0) 
            result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Bapak)");
          if (iJumlahPutraPamanSebapak>0) 
            result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Bapak)");
          if (iJumlahPriaMerdekakan>0) 
            result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
          if (iJumlahWanitaMerdekakan>0) 
            result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
        }
        if (iJumlahBapak == 0) {
          iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
        }
        if (iJumlahCucuPerempuan == 1){
          iJthCucuPerempuan = Math.round(iHarta/2);
          result.push("Jatah tiap Cucu Perempuan (1/2): " + iJthCucuPerempuan);;
        }
        else{
          iJthCucuPerempuan = Math.round((2 * iHarta)/(3 * iJumlahCucuPerempuan));
          result.push("Jatah tiap Cucu Perempuan (2/3): " + iJthCucuPerempuan);;
        }
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + (iJthCucuPerempuan * iJumlahCucuPerempuan));
        if (iJumlahBapak == 1) {
          iJthBapak = Math.round(iHarta/6);
          iJthBapak = iJthBapak + iSisa*iJumlahBapak;
        }
        if (iJumlahBapak == 0) {
          if(iJumlahKakek == 1){
            iJthKakek = Math.round(iHarta/6);
            iJthKakek = iJthKakek + iSisa*iJumlahKakek;
            if (iJumlahSaudaraSeibu>0) 
              result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Kakek)");
            if (iJumlahSaudaraKandung>0) 
              result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Kakek)");
            if (iJumlahSaudariKandung>0) 
              result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Kakek)");
            if (iJumlahSaudariSeibu>0) 
              result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Kakek)");
            if (iJumlahSaudaraSebapak>0) 
              result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Kakek)");
            if (iJumlahSaudariSebapak>0) 
              result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Kakek)");
            if (iJumlahPutraSaudaraKandung>0) 
              result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Kakek)");
            if (iJumlahPutraSaudaraSebapak>0) 
              result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Kakek)");
            if (iJumlahPamanKandung>0) 
              result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Kakek)");
            if (iJumlahPamanSebapak>0) 
              result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Kakek)");
            if (iJumlahPutraPamanKandung>0) 
              result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Kakek)");
            if (iJumlahPutraPamanSebapak>0) 
              result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Kakek)");
            if (iJumlahPriaMerdekakan>0) 
              result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
            if (iJumlahWanitaMerdekakan>0) 
              result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
          }
          if(iJumlahKakek == 0){
              if(iJumlahSaudaraKandung > 0){
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                if(iJumlahSaudariKandung == 0){
                  iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
                }
                if(iJumlahSaudariKandung > 0){
                  iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                  iJthSaudariKandung = iJthSaudaraKandung;
                  result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                }
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
                if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
                if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              }
              if(iJumlahSaudaraKandung == 0){
                if(iJumlahSaudariKandung > 0 && iJumlahCucuPerempuan > 0){
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                  iJthSaudariKandung = Math.round(iSisa/iJumlahSaudariKandung);
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                  result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung/iJumlahSaudariKandung);
                  if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                }
                if(iJumlahSaudaraSebapak > 0){
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                  iJthSaudaraSebapak = Math.round(iSisa/iJumlahSaudaraSebapak);
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
                  result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                }
                if(iJumlahSaudariSebapak > 0  && iJumlahSaudariKandung == 0){
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
                  iJthSaudariSebapak = Math.round(iSisa/iJumlahSaudariSebapak);
                  iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudaraSebapak*iJumlahSaudaraSebapak+iJthSaudariSebapak*iJumlahSaudariSebapak);
                  result.push("Jatah tiap Saudari Sebapak (Sisa): " + iJthSaudariSebapak/iJumlahSaudariSebapak);
                  if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sebapak)");
                  if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sebapak)");
                }
              }
            }
          }
          iSisa   = iHarta - (iJthSuami+iJthIbu+iJthBapak+iJthKakek+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
        if (iJumlahSaudaraSeibu>0) 
          result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Cucu Perempuan)");
        if (iJumlahSaudariSeibu>0) 
        result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Cucu Perempuan)");
      }
    } // tdk punya anak
    
    else if (iJumlahAnakLaki > 0 && iJumlahAnakPerempuan > 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta/4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round(iHarta/8);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta/6);
      }
      if(iJumlahIbu == 0){
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
          iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
          iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
          iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
          iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta/6);
      }
      if (iJumlahBapak == 0) {
        iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
      }
      iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
      iJthAnakLaki = Math.round((2*iSisa)/(2*iJumlahAnakLaki + 1*iJumlahAnakPerempuan));
      iJthAnakPerempuan = Math.round((iSisa)/(2*iJumlahAnakLaki + 1*iJumlahAnakPerempuan));
      iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakLaki*iJumlahAnakLaki + iJthAnakPerempuan*iJumlahAnakPerempuan);
      if (iJumlahCucuLaki>0) 
        result.push("Jatah tiap Cucu Laki-laki: 0 (terhalang oleh Anak Laki-Laki)");
      if(iJumlahCucuPerempuan>0 && iJumlahAnakPerempuan < 2)
        result.push("Jatah tiap Cucu Perempuan: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahCucuPerempuan>0 && iJumlahAnakPerempuan >= 2) 
        result.push("Jatah tiap Cucu Perempuan: 0 (terhalang oleh Anak Laki-Laki dan 2 Anak Perempuan atau lebih)");
      if (iJumlahSaudaraKandung>0) 
        result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariKandung>0) 
        result.push("Jatah tiap Saudari kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudaraSebapak>0) 
        result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudaraSeibu>0) 
        result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariSebapak>0) 
        result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariSeibu>0) 
        result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraSaudaraKandung>0) 
        result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraSaudaraSebapak>0) 
        result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPamanKandung>0) 
        result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPamanSebapak>0) 
        result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraPamanKandung>0) 
        result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraPamanSebapak>0) 
        result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPriaMerdekakan>0) 
        result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahWanitaMerdekakan>0) 
        result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Anak Laki-Laki)");
    } // punya anak lk dan pr
    
    else if (iJumlahAnakLaki > 0 && iJumlahAnakPerempuan == 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta/4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round((iHarta/8)/iJumlahIstri);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta/6);
      }
      if(iJumlahIbu == 0){
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
          iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
          iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
          iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
          iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta/6);
      }
      if (iJumlahBapak == 0) {
        iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
      }
      iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek);
      iJthAnakLaki = iSisa/iJumlahAnakLaki;
      iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakLaki*iJumlahAnakLaki);
      if (iJumlahCucuLaki>0) 
        result.push("Jatah tiap Cucu Laki-laki: 0 (terhalang oleh Anak Laki-Laki)");
      if(iJumlahCucuPerempuan>0)
        result.push("Jatah tiap Cucu Perempuan: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudaraKandung>0) 
        result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariKandung>0) 
        result.push("Jatah tiap Saudari kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudaraSebapak>0) 
        result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudaraSeibu>0) 
        result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariSebapak>0) 
        result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahSaudariSeibu>0) 
        result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraSaudaraKandung>0) 
        result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraSaudaraSebapak>0) 
        result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPamanKandung>0) 
        result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPamanSebapak>0) 
        result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraPamanKandung>0) 
        result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPutraPamanSebapak>0) 
        result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahPriaMerdekakan>0) 
        result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Anak Laki-Laki)");
      if (iJumlahWanitaMerdekakan>0) 
        result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Anak Laki-Laki)");
    } // punya anak lk saja
    
    else if (iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0) {
      if (iJumlahSuami == 1) {
        iJthSuami = Math.round(iHarta/4);
      }
      if (iJumlahIstri > 0) {
        iJthIstri = Math.round((iHarta/8)/iJumlahIstri);
      }
      if (iJumlahIbu == 1) {
        iJthIbu = Math.round(iHarta/6);
      }
      if(iJumlahIbu == 0){
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 0){
          iJthNenekBapak = Math.round(iHarta/6)*iJumlahNenekBapak;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 1){
          iJthNenekIbu = Math.round(iHarta/6)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 1 && iJumlahNenekIbu == 1){
          iJthNenekBapak = Math.round(iHarta/12)*iJumlahNenekBapak;
          iJthNenekIbu = Math.round(iHarta/12)*iJumlahNenekIbu;
        }
        if(iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
          iJthNenekKakek = Math.round(iHarta/6)*iJumlahNenekKakek;
        }
      }
      if (iJumlahBapak == 1) {
        iJthBapak = Math.round(iHarta/6);
        if (iJumlahSaudaraKandung>0) 
          result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Bapak)");
        if (iJumlahSaudariKandung>0) 
          result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Bapak)");
        if (iJumlahSaudaraSebapak>0) 
          result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Bapak)");
        if (iJumlahSaudariSebapak>0) 
          result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Bapak)");
        if (iJumlahPutraSaudaraKandung>0) 
          result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Bapak)");
        if (iJumlahPutraSaudaraSebapak>0) 
          result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Bapak)");
        if (iJumlahPamanKandung>0) 
          result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Bapak)");
        if (iJumlahPamanSebapak>0) 
          result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Bapak)");
        if (iJumlahPutraPamanKandung>0) 
          result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Bapak)");
        if (iJumlahPutraPamanSebapak>0) 
          result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Bapak)");
        if (iJumlahPriaMerdekakan>0) 
          result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
        if (iJumlahWanitaMerdekakan>0) 
          result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Bapak)");
      }
      if (iJumlahBapak == 0) {
        if(iJumlahKakek == 1){
          iJthKakek = Math.round(iHarta/6)*iJumlahKakek;
          if (iJumlahSaudaraKandung>0) 
            result.push("Jatah tiap Saudara Kandung: 0 (terhalang oleh Kakek)");
          if (iJumlahSaudariKandung>0) 
            result.push("Jatah tiap Saudari Kandung: 0 (terhalang oleh Kakek)");
          if (iJumlahSaudaraSebapak>0) 
            result.push("Jatah tiap Saudara Sebapak: 0 (terhalang oleh Kakek)");
          if (iJumlahSaudariSebapak>0) 
            result.push("Jatah tiap Saudari Sebapak: 0 (terhalang oleh Kakek)");
          if (iJumlahPutraSaudaraKandung>0) 
            result.push("Jatah tiap Putra Saudara Kandung: 0 (terhalang oleh Kakek)");
          if (iJumlahPutraSaudaraSebapak>0) 
            result.push("Jatah tiap Putra Saudara Sebapak: 0 (terhalang oleh Kakek)");
          if (iJumlahPamanKandung>0) 
            result.push("Jatah tiap Paman Kandung: 0 (terhalang oleh Kakek)");
          if (iJumlahPamanSebapak>0) 
            result.push("Jatah tiap Paman Sebapak: 0 (terhalang oleh Kakek)");
          if (iJumlahPutraPamanKandung>0) 
            result.push("Jatah tiap Putra Paman Kandung: 0 (terhalang oleh Kakek)");
          if (iJumlahPutraPamanSebapak>0) 
            result.push("Jatah tiap Putra Paman Sebapak: 0 (terhalang oleh Kakek)");
          if (iJumlahPriaMerdekakan>0) 
            result.push("Jatah Pria yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
          if (iJumlahWanitaMerdekakan>0) 
            result.push("Jatah Wanita yang Memerdekakan Budak: 0 (terhalang oleh Kakek)");
        }
      }
      if (iJumlahAnakPerempuan == 1){
        iJthAnakPerempuan = Math.round(iHarta/2);
        if(iJumlahCucuPerempuan > 0 && iJumlahCucuLaki == 0){
          iJthCucuPerempuan = Math.round(iHarta/(6*iJumlahCucuPerempuan));
          result.push("Jatah tiap Cucu Perempuan: " + iJthCucuPerempuan);
          iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan);
          iJthBapak = iJthBapak + iSisa*iJumlahBapak;
          iJthKakek = iJthKakek + iSisa*iJumlahKakek;
          if(iJumlahBapak == 0 && iJumlahKakek == 0){
            if(iJumlahSaudaraKandung > 0){
              iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki);
              if(iJumlahSaudariKandung == 0){
                iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
              }
              if(iJumlahSaudariKandung > 0){
                iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                iJthSaudariKandung = iJthSaudaraKandung;
                result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
              result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
            }
            if(iJumlahSaudaraKandung == 0){
              if(iJumlahSaudariKandung > 1){
                iJthSaudariKandung = Math.round(2*iHarta/3);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudariKandung == 1){
                iJthSaudariKandung = Math.round(iHarta/2);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi Saudari Kandung)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudaraSebapak > 0){
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
                iJthSaudaraSebapak = Math.round(iSisa/iJumlahSaudaraSebapak);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
                result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sebapak)");
              }
            }
          }
        }
        if(iJumlahCucuPerempuan > 0 && iJumlahCucuLaki > 0){
          iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan);
          iJthCucuPerempuan = Math.round(iSisa/(2*iJumlahCucuLaki+iJumlahCucuPerempuan));
          iJthCucuLaki = Math.round(2*iSisa/(2*iJumlahCucuLaki+iJumlahCucuPerempuan));
          result.push("Jatah tiap Cucu Perempuan (Sisa): " + iJthCucuPerempuan);
          result.push("Jatah tiap Cucu Laki-Laki (Sisa): " + iJthCucuLaki);
        }
        if (iJumlahCucuLaki>0 && iJumlahCucuPerempuan == 0) {
          iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan);
          iJthCucuLaki = iSisa/iJumlahCucuLaki;
          result.push("Jatah tiap Cucu Laki-laki (Sisa): " + iJthCucuLaki);
        }
        if (iJumlahCucuLaki == 0 && iJumlahCucuPerempuan == 0) {
          iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan);
          iJthBapak = iJthBapak + iSisa*iJumlahBapak;
          iJthKakek = iJthKakek + iSisa*iJumlahKakek;
          if(iJumlahBapak == 0 && iJumlahKakek == 0){
            if(iJumlahSaudaraKandung > 0){
              iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki);
              if(iJumlahSaudariKandung == 0){
                iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
              }
              if(iJumlahSaudariKandung > 0){
                iJthSaudaraKandung = Math.round(iSisa/(iJumlahSaudaraKandung + iJumlahSaudariKandung));
                iJthSaudariKandung = iJthSaudaraKandung;
                result.push("Jatah tiap Saudari Kandung (Sisa): " + iJthSaudariKandung);
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraKandung*iJumlahSaudaraKandung+iJthSaudariKandung*iJumlahSaudariKandung);
              result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
            }
            if(iJumlahSaudaraKandung == 0){
              if(iJumlahSaudariKandung > 1){
                iJthSaudariKandung = Math.round(2*iHarta/3);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudariKandung == 1){
                iJthSaudariKandung = Math.round(iHarta/2);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi Saudari Kandung)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudaraSebapak > 0){
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
              iJthSaudaraSebapak = Math.round(iSisa/iJumlahSaudaraSebapak);
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
              result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
              }
            }
          }
        }
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki + iJthSaudaraKandung*iJumlahSaudaraKandung);
      }
      if(iJumlahAnakPerempuan >= 2){
        iJthAnakPerempuan = Math.round((2 * iHarta)/(3 * iJumlahAnakPerempuan));
        iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan);
        if(iJumlahCucuPerempuan>0)
          result.push("Jatah tiap Cucu Perempuan: 0 (terhalang oleh >= 2 Anak Perempuan)");
        if (iJumlahCucuLaki>0){
          iJthCucuLaki = iSisa/iJumlahCucuLaki;
          result.push("Jatah tiap Cucu Laki-Laki (Sisa): " + iJthCucuLaki);
        }
        iJthBapak = iJthBapak + iSisa*iJumlahBapak;
        if(iJumlahBapak == 0){
          if(iJumlahKakek > 0){
            iJthKakek = iJthKakek + iSisa*iJumlahKakek;
          }
          if(iJumlahKakek == 0){
            if(iJumlahSaudaraKandung > 0){
              iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki);
              iJthSaudaraKandung = Math.round(iSisa/iJumlahSaudaraKandung);
              iSisa = iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak + iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki + iJthSaudaraKandung*iJumlahSaudaraKandung);
              result.push("Jatah tiap Saudara Kandung (Sisa): " + iJthSaudaraKandung);
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudaraSebapak > 0) result.push("Jatah tiap Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudara Sekandung)");
              if(iJumlahSaudariSebapak > 0) result.push("Jatah tiap Saudari Sebapak: 0 (Karena dihalangi Saudara Sekandung)");
            }
            if(iJumlahSaudaraKandung == 0){
              if(iJumlahSaudariKandung > 1){
                iJthSaudariKandung = Math.round(2*iHarta/3);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (2/3): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi 2 Saudari Kandung atau lebih)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudariKandung == 1){
                iJthSaudariKandung = Math.round(iHarta/2);
                iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung);
                result.push("Jatah tiap Saudari Kandung (1/2): " + iJthSaudariKandung/iJumlahSaudariKandung);
                if(iJumlahSaudariSebapak > 0){result.push("Jatah tiap Saudari Sebapak: 0(Karena dihalangi Saudari Kandung)");}
                if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
                if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sekandung)");
              }
              if(iJumlahSaudaraSebapak > 0){
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu);
              iJthSaudaraSebapak = Math.round(iSisa/iJumlahSaudaraSebapak);
              iSisa   = iHarta - (iJthSuami+iJthIbu+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
              result.push("Jatah tiap Saudara Sebapak (Sisa): " + iJthSaudaraSebapak);
              }
            }
          }
        }
      }
      if (iJumlahSaudaraSeibu>0) 
        result.push("Jatah tiap Saudara Seibu: 0 (terhalang oleh Anak Perempuan)");
      if (iJumlahSaudariSeibu>0){
        result.push("Jatah tiap Saudari Seibu: 0 (terhalang oleh Anak Perempuan)");
      }
      if(iJumlahSaudariSebapak > 0  && iJumlahSaudariKandung == 0){
        iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudaraSebapak*iJumlahSaudaraSebapak);
        iJthSaudariSebapak = Math.round(iSisa/iJumlahSaudariSebapak);
        iSisa   = iHarta - (iJthSuami+iJthIbu+iJthCucuPerempuan+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek+iJthSaudaraSeibu+iJthSaudariKandung*iJumlahSaudariKandung+iJthSaudaraSebapak*iJumlahSaudaraSebapak+iJthSaudariSebapak*iJumlahSaudariSebapak);
        result.push("Jatah tiap Saudari Sebapak (Sisa): " + iJthSaudariSebapak/iJumlahSaudariSebapak);
        if(iJumlahPutraSaudaraKandung > 0) result.push("Jatah tiap Putra dari Saudara Kandung: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPutraSaudaraSebapak > 0) result.push("Jatah tiap Putra dari Saudara Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPamanKandung > 0) result.push("Jatah tiap Paman Sekandung: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPamanSebapak > 0) result.push("Jatah tiap Paman Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPutraPamanKandung > 0) result.push("Jatah tiap Putra dari Paman Kandung: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPutraPamanSebapak > 0) result.push("Jatah tiap Putra dari Paman Sebapak: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahPriaMerdekakan > 0) result.push("Jatah tiap Pria yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sebapak)");
        if(iJumlahWanitaMerdekakan > 0) result.push("Jatah tiap Wanita yang Memerdekakan Budak: 0 (Karena dihalangi Saudari Sebapak)");
      }
      iSisa=iHarta - (iJthSuami*iJumlahSuami + iJthIstri*iJumlahIstri + iJthIbu*iJumlahIbu + iJthBapak*iJumlahBapak+ iJthKakek*iJumlahKakek+iJthNenekBapak*iJumlahNenekBapak+iJthNenekIbu*iJumlahNenekIbu+iJthNenekKakek*iJumlahNenekKakek + iJthAnakLaki*iJumlahAnakLaki + iJthAnakPerempuan*iJumlahAnakPerempuan + iJthCucuPerempuan*iJumlahCucuPerempuan + iJthCucuLaki*iJumlahCucuLaki + iJthSaudaraKandung*iJumlahSaudaraKandung);
    } // punya anak pr saja

    if (iJumlahBapak == 0){
      if (iJumlahKakek>0) {
        if(iJumlahAnakLaki > 0){
          result.push("Jatah Kakek (1" + "/" + Math.round(iHarta/iJthKakek) + "): " + iJthKakek);
        }
        if(iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0){
          result.push("Jatah Kakek (1/6+Sisa): " + iJthKakek);
        }
        if(iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0){
          result.push("Jatah Kakek (Sisa): " + iJthKakek);
        }
      }
    }
    if (iJumlahSuami>0) 
      result.push("Jatah Suami (1" + "/" + Math.round(iHarta/iJthSuami) + "): " + iJthSuami);
    if (iJumlahIstri>0) 
      result.push("Jatah tiap Istri (1" + "/" + Math.round((iHarta)/(iJthIstri*iJumlahIstri)) + "): " + iJthIstri);
    if (iJumlahAnakLaki>0) 
      result.push("Jatah tiap Anak Laki-laki (Sisa): " + iJthAnakLaki);
    if (iJumlahAnakPerempuan > 0 && iJumlahAnakLaki > 0) 
      result.push("Jatah tiap Anak Perempuan (Sisa): " + iJthAnakPerempuan);
    if (iJumlahAnakPerempuan == 1 && iJumlahAnakLaki == 0) 
      result.push("Jatah tiap Anak Perempuan (1/2): " + iJthAnakPerempuan);
    if (iJumlahAnakPerempuan > 1 && iJumlahAnakLaki == 0) 
      result.push("Jatah tiap Anak Perempuan (2/3): " + iJthAnakPerempuan);
    if (iJumlahBapak>0){
      if(iJumlahAnakLaki > 0){
        result.push("Jatah Bapak (1" + "/" + Math.round(iHarta/iJthBapak) + "): " + iJthBapak);
      }
      if(iJumlahAnakLaki == 0 && iJumlahAnakPerempuan > 0){
        result.push("Jatah Bapak (1/6+Sisa): " + iJthBapak);
      }
      if(iJumlahAnakLaki == 0 && iJumlahAnakPerempuan == 0){
        result.push("Jatah Bapak (Sisa): " + iJthBapak);
      }
      if (iJumlahKakek>0) 
        result.push("Jatah Kakek: 0 (terhalang oleh Bapak)");
    }
    if (iJumlahIbu>0){
      result.push("Jatah Ibu (1" + "/" + Math.round(iHarta/iJthIbu) + "): " + iJthIbu);
      if (iJumlahNenekBapak>0)
        result.push("Jatah Nenek (Ibunya Bapak): 0 (terhalang oleh Ibu)");
      if (iJumlahNenekIbu>0)
        result.push("Jatah Nenek (Ibunya Ibu): 0 (terhalang oleh Ibu)");
      if (iJumlahNenekKakek>0) 
        result.push("Jatah Nenek (Ibunya Kakek): 0 (terhalang oleh Ibu)");
    }
    if (iJumlahIbu == 0){
      if (iJumlahNenekIbu>0 && iJumlahNenekBapak > 0){
        result.push("Jatah Nenek (Ibunya Bapak) (1/6): " + iJthNenekBapak);
        result.push("Jatah Nenek (Ibunya Ibu) (1/6): " + iJthNenekIbu);
        if (iJumlahNenekKakek>0) 
          result.push("Jatah Nenek (Ibunya Kakek): 0 (terhalang oleh Ibunya Bapak dan Ibunya Ibu)");
      }
      if (iJumlahNenekBapak>0 && iJumlahNenekIbu == 0){
        result.push("Jatah Nenek (Ibunya Bapak) (1/6): " + iJthNenekBapak);
        if (iJumlahNenekKakek>0) 
          result.push("Jatah Nenek (Ibunya Kakek): 0 (terhalang oleh Nenek (Ibunya Bapak))");
      }
      if (iJumlahNenekIbu>0 && iJumlahNenekBapak == 0){
        result.push("Jatah Nenek (Ibunya Ibu) (1/6): " + iJthNenekIbu);
        if (iJumlahNenekKakek>0) 
          result.push("Jatah Nenek (Ibunya Kakek): 0 (terhalang oleh Nenek (Ibunya Ibu))");
      }
      if (iJumlahNenekBapak == 0 && iJumlahNenekIbu == 0){
        if (iJumlahNenekKakek>0)
          result.push("Jatah Nenek (Ibunya Kakek) (1/6): " + iJthNenekKakek);
      }
    }
    if (iSisa>0)
      result.push("Sisa untuk kerabat terdekat: " + iSisa);
    if((iHarta+1) < (iJthSuami+iJthSaudariKandung+iJthSaudariSebapak-1)){
      $scope.showAlert("Hasil perhitungan berikut termasuk masalah 'Aul (jumlah keseluruhan bagian ditambah hingga penyebutnya sama dengan pembilangnya). Contoh: suami =1/2 dan 2 org saudari kandung 2/3. Jika dijumlahkan hasilnya menjadi 7/6. Maka penyebutnya menjadi 7. suami dapat 3/7 dan 2 saudari kandung 4/7.");
    }

    $scope.result = result;

})