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

  /* Ảnh minh hoạ một từ.

     Hai tầng từ vựng tra ảnh hai kiểu. Tầng CO_HINH vốn có emoji làm khoá nên
     trả về chính emoji, để o-tra-loi.js đổi sang thẻ ảnh như mọi chỗ khác.
     Tầng CHU không emoji nào tả đúng (dance, big, Monday…) nên tra thẳng theo
     từ tiếng Anh. Từ nào chưa có ảnh thì trả null, nơi gọi tự lo. */
  function anhCua(t) {
    if (t.e) return t.e;
    if (global.HinhVe && global.HinhVe.coTu && global.HinhVe.coTu(t.en))
      return global.HinhVe.veTu(t.en);
    return null;
  }
  function coAnh(t) { return !!anhCua(t); }

  /* Khoá để biết hai từ có chung một hình hay không. Trước đây so thẳng bằng
     t.e — nay tầng chữ không từ nào có e, so kiểu đó thì mọi từ đều hoá ra
     "trùng hình" và khac() loại sạch đáp án sai. */
  function khoaAnh(t) { return t.e || ('tu:' + t.en); }

  // n từ khác với "loaiTru". Loại cả theo từ tiếng Anh lẫn theo hình: hai từ
  // trùng hình thì bé nhìn hình không phân biệt nổi, chọn đúng vẫn bị chấm sai.
  function khac(ds, n, loaiTru) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && x.en !== loaiTru.en && khoaAnh(x) !== khoaAnh(loaiTru)) ket.push(x);
    });
    return ket;
  }

  /* Chủ đề tầng chữ nào dùng được cho câu hỏi kiểu nhìn hình.

     Điều kiện là nhìn hình phải đoán ra ĐÚNG từ đó. Động từ, số lượng, vị
     trí, môn học đều đạt — vẽ bé đang bơi thì chỉ có thể là "swim".

     Tính từ và từ ngược nghĩa thì không đạt: hình của "clean" là cái áo sạch
     đặt cạnh cái áo bẩn, mà hình của "dirty" cũng là một cặp y như vậy, bé
     không có cách nào chọn đúng. Ngày tháng cũng thế — "Tuesday" vẽ thành
     cảnh bé ngồi làm bài thì đoán sao ra. Mấy chủ đề đó vẫn có hình ở thẻ từ
     và ở đề bài, chỉ là không dùng hình làm đáp án. */
  var CHU_DOAN_DUOC = {
    'việc hằng ngày': 1, 'động từ thường gặp': 1, 'số lớn và thứ tự': 1,
    'vị trí và hướng': 1, 'môn học': 1, 'đi đường': 1,
    'thiên nhiên và con vật (chữ)': 1, 'sức khoẻ': 1
  };

  // Kho từ cho câu hỏi kiểu nhìn hình: phải có ảnh, và nếu là từ tầng chữ thì
  // chủ đề phải nằm trong danh sách đoán được ở trên.
  function tuCuaAnh(ten) {
    if (ten && CHU_DE[ten]) return CHU_DE[ten].filter(coAnh);
    if (ten && CHU_DE_CHU[ten])
      return CHU_DOAN_DUOC[ten] ? CHU_DE_CHU[ten].filter(coAnh) : [];
    var het = [];
    Object.keys(CHU_DE).forEach(function (k) { het = het.concat(CHU_DE[k]); });
    Object.keys(CHU_DE_CHU).forEach(function (k) {
      if (CHU_DOAN_DUOC[k]) het = het.concat(CHU_DE_CHU[k]);
    });
    return het.filter(coAnh);
  }

  // Nhãn một từ tiếng Anh: chữ ở trên, phiên âm ở dưới. Dùng chung cho cả
  // nút chọn lẫn đáp án nên so khớp vẫn là so hai chuỗi y hệt nhau.
  function tuVaPhienAm(en) {
    var pa = global.PhienAm ? global.PhienAm.cua(en) : null;
    return pa ? en + '<i class="phien-am">' + pa + '</i>' : en;
  }

  function the(t) {
    return '<span class="anh-tu">' + anhCua(t) + '</span><span class="nhan">' +
      tuVaPhienAm(t.en) + '</span>';
  }

  /* --- nhìn hình, chọn từ tiếng Anh --- */

  function nhinChon(ten) {
    var ds = tuCuaAnh(ten);
    if (ds.length < 3) return nghiaViet(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: 'Cái này tiếng Anh gọi là gì?',
      art: '<span class="anh-to">' + anhCua(dung) + '</span>',
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
    var ds = tuCuaAnh(ten);
    if (ds.length < 3) return nghiaViet(ten);
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

  /* --- hiện từ tiếng Anh, chọn hình đúng ---
     Khác ngheChon ở chỗ hiện hẳn mặt chữ chứ không chỉ đọc lên, nên dùng được
     cả ở nơi không có nút loa. Nút chọn chỉ có hình, không chữ — bé nhìn hình
     mà đoán nghĩa của từ. */

  function tuChonHinh(ten) {
    var ds = tuCuaAnh(ten);
    if (ds.length < 3) return nghiaViet(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    function oHinh(x) { return '<span class="anh-tu">' + anhCua(x) + '</span>'; }
    return {
      prompt: 'Từ này là hình nào?',
      art: '<span class="tu-to">' + tuVaPhienAm(dung.en) + '</span>',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(oHinh)),
      answer: oHinh(dung),
      cols: 3,
      speak: dung.en,
      tieng: 'en',
      mach: 'Từ chọn hình'
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
    tuCuaAnh: tuCuaAnh,
    anhCua: anhCua,
    coAnh: coAnh,
    nhinChon: nhinChon,
    ngheChon: ngheChon,
    tuChonHinh: tuChonHinh,
    nghiaViet: nghiaViet,
    tron: tron
  };
})(window);
