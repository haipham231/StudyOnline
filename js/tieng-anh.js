/* ===== Tiếng Anh cho bé =====
   Vốn từ dùng chung với khu Việt kiều (TiengVietMN.CHU_DE) để một hình chỉ ứng
   với một từ trên cả site; phần dưới thêm vài chủ đề chỉ khu này mới cần.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var chon = Q.pick;

  /* Vốn từ ghép từ ba nguồn, xem js/tu-vung-anh.js.

     Kho gốc tách rất nhỏ: "trái cây" tám từ rồi "trái cây thêm" mười từ nữa,
     nên danh sách chủ đề dài lê thê mà mỗi mục lại ít từ. Ở khu tiếng Anh thì
     gộp lại cho mỗi chủ đề dày dặn. Chỉ gộp ở đây, kho gốc giữ nguyên vì khu
     Mầm non tiếng Việt vẫn dùng đúng những mục nhỏ đó. */
  var GOP_VAO = {
    'con vật': 'thú nuôi và vật nuôi', 'thú nuôi': 'thú nuôi và vật nuôi',
    'chim chóc': 'chim và côn trùng', 'côn trùng': 'chim và côn trùng',
    'trái cây thêm': 'trái cây',
    'rau củ thêm': 'rau củ',
    'đồ ăn': 'đồ ăn và đồ uống', 'đồ ăn thêm': 'đồ ăn và đồ uống',
    'đồ uống': 'đồ ăn và đồ uống',
    'màu sắc': 'màu sắc và hình khối', 'màu sắc thêm': 'màu sắc và hình khối',
    'hình khối': 'màu sắc và hình khối',
    'cơ thể thêm': 'cơ thể',
    'gia đình thêm': 'gia đình',
    'quần áo thêm': 'quần áo',
    'trong nhà thêm': 'đồ dùng trong nhà', 'nhà bếp': 'đồ dùng trong nhà',
    'phương tiện thêm': 'phương tiện',
    'thời tiết': 'thiên nhiên và thời tiết',
    'thời tiết thêm': 'thiên nhiên và thời tiết',
    'thiên nhiên thêm': 'thiên nhiên và thời tiết',
    'đồ vật': 'ở trường', 'đồ dùng học tập': 'ở trường',
    'thể thao': 'thể thao và nhạc cụ', 'nhạc cụ': 'thể thao và nhạc cụ'
  };

  function gop() {
    var ds = {};
    var goc = (global.TiengVietMN && global.TiengVietMN.CHU_DE) || {};
    var kho = global.TuVungAnh || { CO_HINH: {}, CHU: {} };

    function them(ten, tu) {
      var dich = GOP_VAO[ten] || ten;
      if (!ds[dich]) ds[dich] = [];
      // một từ tiếng Anh chỉ vào chủ đề một lần, kẻo gộp xong bị lặp
      tu.forEach(function (t) {
        for (var i = 0; i < ds[dich].length; i++) {
          if (ds[dich][i].en === t.en) return;
        }
        ds[dich].push(t);
      });
    }

    Object.keys(goc).forEach(function (k) { them(k, goc[k]); });
    Object.keys(kho.CO_HINH).forEach(function (k) { them(k, kho.CO_HINH[k]); });
    return ds;
  }

  var CHU_DE = gop();                                   // từ có hình
  var CHU_DE_CHU = (global.TuVungAnh || {}).CHU || {};   // từ chỉ có chữ

  // Từ tiếng Anh nào ứng với hai nghĩa Việt khác nhau (như "orange" vừa là quả
  // cam vừa là màu cam) thì không hỏi nghĩa, vì cả hai đáp án đều đúng.
  var NHAP_NHANG = (function () {
    var dem = {}, tap = {};
    [CHU_DE, CHU_DE_CHU].forEach(function (o) {
      Object.keys(o).forEach(function (k) {
        o[k].forEach(function (t) { dem[t.en] = (dem[t.en] || 0) + 1; });
      });
    });
    Object.keys(dem).forEach(function (k) { if (dem[k] > 1) tap[k] = true; });
    return tap;
  })();

  // tuCua('con vật') → đúng chủ đề đó; tuCua() → trộn hết từ có hình
  function tuCua(ten) {
    if (ten && CHU_DE[ten]) return CHU_DE[ten];
    if (ten && CHU_DE_CHU[ten]) return CHU_DE_CHU[ten];
    var het = [];
    Object.keys(CHU_DE).forEach(function (k) { het = het.concat(CHU_DE[k]); });
    return het;
  }

  // Gồm cả từ chỉ có chữ — dùng cho câu hỏi nghĩa và thẻ từ kiểu chữ
  function tuCuaCaChu(ten) {
    if (ten && CHU_DE_CHU[ten]) return CHU_DE_CHU[ten];
    if (ten && CHU_DE[ten]) return CHU_DE[ten];
    var het = [];
    Object.keys(CHU_DE).forEach(function (k) { het = het.concat(CHU_DE[k]); });
    Object.keys(CHU_DE_CHU).forEach(function (k) { het = het.concat(CHU_DE_CHU[k]); });
    return het;
  }

  // n từ khác với "loaiTru". Loại cả theo từ tiếng Anh lẫn theo hình: hai từ
  // trùng hình thì bé nhìn hình không phân biệt nổi, chọn đúng vẫn bị chấm sai.
  function khac(ds, n, loaiTru) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && x.en !== loaiTru.en && x.e !== loaiTru.e) ket.push(x);
    });
    return ket;
  }

  // Nhãn một từ tiếng Anh: chữ ở trên, phiên âm ở dưới. Dùng chung cho cả
  // nút chọn lẫn đáp án nên so khớp vẫn là so hai chuỗi y hệt nhau.
  function tuVaPhienAm(en) {
    var pa = global.PhienAm ? global.PhienAm.cua(en) : null;
    return pa ? en + '<i class="phien-am">' + pa + '</i>' : en;
  }

  function the(t) {
    return '<span class="anh-tu">' + t.e + '</span><span class="nhan">' +
      tuVaPhienAm(t.en) + '</span>';
  }

  /* --- nhìn hình, chọn từ tiếng Anh --- */

  function nhinChon(ten) {
    var ds = tuCua(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: 'Cái này tiếng Anh gọi là gì?',
      art: '<span class="anh-to">' + dung.e + '</span>',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean)
        .map(function (x) { return tuVaPhienAm(x.en); })),
      answer: tuVaPhienAm(dung.en),
      // một cột: từ tiếng Anh như "watermelon" xếp ba cột là tràn khỏi màn
      cols: 1,
      speak: dung.en,
      tieng: 'en',
      mach: 'Nhìn hình chọn từ'
    };
  }

  /* --- nghe từ, chọn hình --- */

  function ngheChon(ten) {
    var ds = tuCua(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: 'Nghe rồi chọn đúng hình nhé!',
      speak: dung.en,
      tieng: 'en',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(the)),
      answer: the(dung),
      cols: 3,
      mach: 'Nghe chọn hình'
    };
  }

  /* --- từ tiếng Anh này nghĩa là gì --- */

  function nghiaViet(ten) {
    var ds = tuCuaCaChu(ten).filter(function (t) { return !NHAP_NHANG[t.en]; });
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: '<b class="tu-anh">' + dung.en + '</b> nghĩa là gì?',
      speak: dung.en,
      tieng: 'en',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(function (x) { return x.vi; })),
      answer: dung.vi,
      cols: 1,
      mach: 'Hiểu nghĩa'
    };
  }

  function tron(ten) {
    return function () {
      var x = Math.random();
      if (x < 0.4) return nhinChon(ten);
      if (x < 0.8) return ngheChon(ten);
      return nghiaViet(ten);
    };
  }

  global.TiengAnh = {
    CHU_DE: CHU_DE,
    CHU_DE_CHU: CHU_DE_CHU,
    tuCua: tuCua,
    tuCuaCaChu: tuCuaCaChu,
    nhinChon: nhinChon,
    ngheChon: ngheChon,
    nghiaViet: nghiaViet,
    tron: tron
  };
})(window);
