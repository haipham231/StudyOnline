/* ===== Bộ sinh đề Toán lớp 1 — dùng chung cho trang bài tập và trang kiểm tra =====
   Bám mạch kiến thức Toán 1 (Chương trình GDPT 2018):
   số và phép tính · hình học và đo lường · giải toán có lời văn
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  /* ================= SỐ VÀ PHÉP TÍNH ================= */

  // Cộng hoặc trừ trong phạm vi max, kết quả không âm.
  // Trước đây câu cộng phạm vi 10 có kèm một hàng hình để bé đếm; bỏ rồi, vì
  // nó cao cả trăm px mà bé lớp 1 đã tính nhẩm được trong phạm vi đó.
  function congTru(max) {
    var a = r(1, max - 1);
    var b = r(1, max - a);

    if (Math.random() < 0.5) return { text: (a + b) + ' − ' + b + ' =', answer: a, mach: 'Cộng trừ' };
    return { text: a + ' + ' + b + ' =', answer: a + b, mach: 'Cộng trừ' };
  }

  // Số có hai chữ số, cộng trừ không nhớ trong phạm vi 100
  function congTruKhongNho() {
    var chucA = r(1, 8), donViA = r(0, 8);
    var chucB = r(1, 9 - chucA), donViB = r(0, 9 - donViA);
    var a = chucA * 10 + donViA;
    var b = chucB * 10 + donViB;

    return Math.random() < 0.5
      ? { text: a + ' + ' + b + ' =', answer: a + b, mach: 'Cộng trừ' }
      : { text: (a + b) + ' − ' + b + ' =', answer: a, mach: 'Cộng trừ' };
  }

  // Dãy hai phép tính, tính từ trái sang phải
  function tinhDay(max) {
    var a = r(1, max - 2);
    var b = r(1, max - a);
    var giua = a + b;
    var c = r(1, Math.min(giua, max - giua) || 1);

    var cong = Math.random() < 0.5;
    return cong
      ? { text: a + ' + ' + b + ' + ' + c + ' =', answer: giua + c, mach: 'Tính dãy', small: true }
      : { text: giua + ' − ' + b + ' + ' + c + ' =', answer: a + c, mach: 'Tính dãy', small: true };
  }

  // Điền số còn thiếu vào phép tính
  function dienSo(max) {
    var a = r(1, max - 1);
    var b = r(1, max - a);
    var tong = a + b;

    switch (r(1, 4)) {
      case 1:  return { text: a + ' +', after: '= ' + tong, answer: b, mach: 'Điền số' };
      case 2:  return { after: '+ ' + b + ' = ' + tong, answer: a, mach: 'Điền số' };
      case 3:  return { text: tong + ' −', after: '= ' + a, answer: b, mach: 'Điền số' };
      default: return { after: '− ' + b + ' = ' + a, answer: tong, mach: 'Điền số' };
    }
  }

  function dienSoTronChuc() {
    var a = r(1, 8) * 10;
    var b = r(1, 9 - a / 10) * 10;
    return Math.random() < 0.5
      ? { text: a + ' +', after: '= ' + (a + b), answer: b, mach: 'Điền số' }
      : { text: (a + b) + ' −', after: '= ' + a, answer: b, mach: 'Điền số' };
  }

  // Tách — gộp số: "7 gồm 3 và mấy?"
  function tachGop(max) {
    var tong = r(3, max);
    var a = r(1, tong - 1);
    var b = tong - a;

    if (Math.random() < 0.5) {
      return {
        prompt: 'Số <b>' + tong + '</b> gồm <b>' + a + '</b> và mấy?',
        speak: 'Số ' + tong + ' gồm ' + a + ' và mấy?',
        art: Q.repeatArt('🟦', a) + ' ' + Q.repeatArt('🟨', b),
        answer: b, mach: 'Tách gộp số'
      };
    }
    return {
      prompt: '<b>' + a + '</b> và <b>' + b + '</b> gộp lại được mấy?',
      speak: a + ' và ' + b + ' gộp lại được mấy?',
      art: Q.repeatArt('🟦', a) + ' ' + Q.repeatArt('🟨', b),
      answer: tong, mach: 'Tách gộp số'
    };
  }

  // Cấu tạo số có hai chữ số: chục và đơn vị
  function chucDonVi() {
    var chuc = r(1, 9), donVi = r(0, 9);
    var so = chuc * 10 + donVi;
    var hinh = Q.repeatArt('🟩', chuc) + (donVi ? ' ' + Q.repeatArt('🟡', donVi) : '');

    switch (r(1, 3)) {
      case 1:
        return {
          prompt: 'Số <b>' + so + '</b> gồm <b>' + chuc + '</b> chục và mấy đơn vị?',
          speak: 'Số ' + so + ' gồm ' + chuc + ' chục và mấy đơn vị?',
          art: hinh, answer: donVi, mach: 'Chục và đơn vị'
        };
      case 2:
        return {
          prompt: 'Số <b>' + so + '</b> gồm mấy chục và <b>' + donVi + '</b> đơn vị?',
          speak: 'Số ' + so + ' gồm mấy chục và ' + donVi + ' đơn vị?',
          art: hinh, answer: chuc, mach: 'Chục và đơn vị'
        };
      default:
        return {
          prompt: '<b>' + chuc + '</b> chục và <b>' + donVi + '</b> đơn vị là số nào?',
          speak: chuc + ' chục và ' + donVi + ' đơn vị là số nào?',
          art: hinh, answer: so, mach: 'Chục và đơn vị'
        };
    }
  }

  /* ---- So sánh, thứ tự ---- */

  var DAU = ['>', '<', '='];
  function dau(x, y) { return x > y ? '>' : x < y ? '<' : '='; }

  function soSanh(max) {
    var a = r(1, max);
    var b = Math.random() < 0.25 ? a : r(1, max);
    return { text: String(a), after: String(b), answer: dau(a, b), choices: DAU, mach: 'So sánh' };
  }

  function soSanhPhepTinh() {
    var a = r(1, 9), b = r(1, 10 - a);
    var c = r(1, 9), d = r(1, 10 - c);
    if (Math.random() < 0.25) { c = a; d = b; }
    return {
      prompt: 'Tính hai vế rồi điền dấu thích hợp nhé!',
      text: a + ' + ' + b, after: c + ' + ' + d,
      answer: dau(a + b, c + d), choices: DAU, small: true, mach: 'So sánh'
    };
  }

  // Số lớn nhất / bé nhất trong ba số
  function lonNhatBeNhat(max) {
    var ds = [];
    while (ds.length < 3) {
      var v = r(1, max);
      if (ds.indexOf(v) === -1) ds.push(v);
    }
    var lon = Math.random() < 0.5;
    var dapAn = lon ? Math.max.apply(null, ds) : Math.min.apply(null, ds);

    return {
      prompt: 'Số nào <b>' + (lon ? 'lớn nhất' : 'bé nhất') + '</b>?',
      speak: 'Số nào ' + (lon ? 'lớn nhất' : 'bé nhất') + '?',
      answer: String(dapAn), choices: ds.map(String), cols: 3, mach: 'So sánh'
    };
  }

  /* ---- Đếm, dãy số ---- */

  var VAT_DEM = [
    { ten: 'quả táo', e: '🍎' }, { ten: 'bông hoa', e: '🌸' }, { ten: 'con cá', e: '🐟' },
    { ten: 'cái kẹo', e: '🍬' }, { ten: 'quả bóng', e: '⚽' }, { ten: 'con bướm', e: '🦋' },
    { ten: 'ngôi sao', e: '⭐' }, { ten: 'chiếc lá', e: '🍀' }
  ];

  function demHinh(max) {
    var v = chon(VAT_DEM), n = r(2, max);
    return { prompt: 'Có bao nhiêu ' + v.ten + '?', art: Q.repeatArt(v.e, n), answer: n, mach: 'Đếm' };
  }

  function lienKe(max) {
    var n = r(1, max - 1);
    return Math.random() < 0.5
      ? { prompt: 'Số liền sau của ' + n + ' là số nào?', answer: n + 1, mach: 'Thứ tự số' }
      : { prompt: 'Số liền trước của ' + (n + 1) + ' là số nào?', answer: n, mach: 'Thứ tự số' };
  }

  function daySo(buoc, max) {
    var batDau = r(1, Math.max(1, max - buoc * 5));
    var day = [0, 1, 2, 3, 4].map(function (i) { return batDau + i * buoc; });
    var an = r(1, 3);
    return {
      prompt: 'Điền số còn thiếu vào dãy số (đếm thêm ' + buoc + ')',
      text: day.slice(0, an).join('&nbsp; '),
      after: day.slice(an + 1).join('&nbsp; '),
      answer: day[an], small: true, mach: 'Dãy số'
    };
  }

  /* ================= GIẢI TOÁN CÓ LỜI VĂN ================= */

  var TEN = ['Lan', 'Nam', 'Mai', 'Bình', 'Hà', 'An', 'Tú', 'Linh', 'Minh', 'Hoa', 'Khoa', 'Ngọc'];

  var VAT = [
    { ten: 'quả táo', dv: 'quả', e: '🍎' }, { ten: 'quả cam', dv: 'quả', e: '🍊' },
    { ten: 'cái kẹo', dv: 'cái', e: '🍬' }, { ten: 'bông hoa', dv: 'bông', e: '🌸' },
    { ten: 'quyển vở', dv: 'quyển', e: '📒' }, { ten: 'cái bút', dv: 'cái', e: '✏️' },
    { ten: 'viên bi', dv: 'viên', e: '🔵' }, { ten: 'quả bóng', dv: 'quả', e: '⚽' },
    { ten: 'con cá', dv: 'con', e: '🐟' }, { ten: 'quả trứng', dv: 'quả', e: '🥚' }
  ];

  var CAP_VAT = [
    { a: { ten: 'quả cam', e: '🍊' }, b: { ten: 'quả quýt', e: '🍋' }, chung: 'quả', noi: 'Trong rổ' },
    { a: { ten: 'con gà', e: '🐔' }, b: { ten: 'con vịt', e: '🦆' }, chung: 'con', noi: 'Trong sân' },
    { a: { ten: 'bông hoa đỏ', e: '🌹' }, b: { ten: 'bông hoa vàng', e: '🌻' }, chung: 'bông', noi: 'Trong vườn' },
    { a: { ten: 'cái bút chì', e: '✏️' }, b: { ten: 'cái bút màu', e: '🖍️' }, chung: 'cái', noi: 'Trong hộp' }
  ];

  function haiTen() {
    var x = chon(TEN), y;
    do { y = chon(TEN); } while (y === x);
    return [x, y];
  }

  function choThem(max, veHinh) {
    var a = r(2, max - 2), b = r(1, max - a), v = chon(VAT), ten = chon(TEN);
    return {
      prompt: ten + ' có ' + a + ' ' + v.ten + '. Mẹ cho ' + ten + ' thêm ' + b + ' ' + v.ten +
              '. Hỏi ' + ten + ' có tất cả bao nhiêu ' + v.ten + '?',
      art: veHinh ? Q.repeatArt(v.e, a) + ' &nbsp;+&nbsp; ' + Q.repeatArt(v.e, b) : null,
      after: v.dv, answer: a + b, mach: 'Toán đố'
    };
  }

  function choDi(max, veHinh) {
    var tong = r(3, max), b = r(1, tong - 1), v = chon(VAT), ten = chon(TEN);
    return {
      prompt: ten + ' có ' + tong + ' ' + v.ten + '. ' + ten + ' cho bạn ' + b + ' ' + v.ten +
              '. Hỏi ' + ten + ' còn lại bao nhiêu ' + v.ten + '?',
      art: veHinh ? Q.repeatArt(v.e, tong) : null,
      after: v.dv, answer: tong - b, mach: 'Toán đố'
    };
  }

  function gopNhom(max, veHinh) {
    var a = r(2, max - 2), b = r(1, max - a), c = chon(CAP_VAT);
    return {
      prompt: c.noi + ' có ' + a + ' ' + c.a.ten + ' và ' + b + ' ' + c.b.ten +
              '. Hỏi có tất cả bao nhiêu ' + c.chung + '?',
      art: veHinh ? Q.repeatArt(c.a.e, a) + ' ' + Q.repeatArt(c.b.e, b) : null,
      after: c.chung, answer: a + b, mach: 'Toán đố'
    };
  }

  function nhieuHon(max) {
    var a = r(2, max - 2), b = r(1, max - a), v = chon(VAT), t = haiTen();
    return {
      prompt: t[0] + ' có ' + a + ' ' + v.ten + '. ' + t[1] + ' có nhiều hơn ' + t[0] + ' ' +
              b + ' ' + v.ten + '. Hỏi ' + t[1] + ' có bao nhiêu ' + v.ten + '?',
      after: v.dv, answer: a + b, mach: 'Toán đố'
    };
  }

  function itHon(max) {
    var tong = r(3, max), b = r(1, tong - 1), v = chon(VAT), t = haiTen();
    return {
      prompt: t[0] + ' có ' + tong + ' ' + v.ten + '. ' + t[1] + ' có ít hơn ' + t[0] + ' ' +
              b + ' ' + v.ten + '. Hỏi ' + t[1] + ' có bao nhiêu ' + v.ten + '?',
      after: v.dv, answer: tong - b, mach: 'Toán đố'
    };
  }

  function roiKhoi(max) {
    var canh = [
      { noi: 'Trên cây có', vat: 'con chim', dv: 'con', di: 'bay đi' },
      { noi: 'Trong ao có', vat: 'con vịt', dv: 'con', di: 'lên bờ' },
      { noi: 'Trên bàn có', vat: 'cái bánh', dv: 'cái', di: 'được ăn hết' },
      { noi: 'Trong bến có', vat: 'chiếc xe', dv: 'chiếc', di: 'chạy đi' }
    ];
    var c = chon(canh), tong = r(3, max), b = r(1, tong - 1);
    return {
      prompt: c.noi + ' ' + tong + ' ' + c.vat + '. Có ' + b + ' ' + c.vat + ' ' + c.di +
              '. Hỏi còn lại bao nhiêu ' + c.vat + '?',
      after: c.dv, answer: tong - b, mach: 'Toán đố'
    };
  }

  function lucDau(max) {
    var a = r(1, max - 2), b = r(1, max - a), v = chon(VAT), ten = chon(TEN);
    return {
      prompt: ten + ' cho em ' + b + ' ' + v.ten + ' thì còn lại ' + a + ' ' + v.ten +
              '. Hỏi lúc đầu ' + ten + ' có bao nhiêu ' + v.ten + '?',
      after: v.dv, answer: a + b, mach: 'Toán đố'
    };
  }

  function honKem(max) {
    var x = r(3, max), y = r(1, x - 1), v = chon(VAT), t = haiTen();
    return {
      prompt: t[0] + ' có ' + x + ' ' + v.ten + ', ' + t[1] + ' có ' + y + ' ' + v.ten +
              '. Hỏi ' + t[0] + ' có nhiều hơn ' + t[1] + ' bao nhiêu ' + v.ten + '?',
      after: v.dv, answer: x - y, mach: 'Toán đố'
    };
  }

  /* ================= HÌNH HỌC VÀ ĐO LƯỜNG ================= */

  var MAU_HINH = ['#4aa8ff', '#8b7bf7', '#2fcf90', '#ffc93c', '#ff7a7a', '#ff8fd0'];
  var LOAI_HINH = ['hình vuông', 'hình tròn', 'hình tam giác', 'hình chữ nhật'];

  function veHinhPhang(loai, canh, mau) {
    var o = '<svg viewBox="0 0 100 100" width="' + canh + '" height="' + canh + '">';
    if (loai === 'hình vuông') o += '<rect x="14" y="14" width="72" height="72" rx="6" fill="' + mau + '"/>';
    else if (loai === 'hình tròn') o += '<circle cx="50" cy="50" r="38" fill="' + mau + '"/>';
    else if (loai === 'hình tam giác') o += '<polygon points="50,12 88,86 12,86" fill="' + mau + '"/>';
    else o += '<rect x="6" y="28" width="88" height="44" rx="6" fill="' + mau + '"/>';
    return o + '</svg>';
  }

  function nhanBietHinh() {
    var loai = chon(LOAI_HINH);
    return {
      prompt: 'Đây là hình gì?',
      art: veHinhPhang(loai, 120, chon(MAU_HINH)),
      answer: loai, choices: Q.shuffle(LOAI_HINH.slice()), cols: 2, mach: 'Hình phẳng'
    };
  }

  function demHinhHoc() {
    var hoi = chon(LOAI_HINH);
    var soCanDem = r(2, 5);
    var ds = [];
    for (var i = 0; i < soCanDem; i++) ds.push(hoi);
    var conLai = LOAI_HINH.filter(function (l) { return l !== hoi; });
    var themVao = r(3, 6);
    for (var j = 0; j < themVao; j++) ds.push(chon(conLai));

    var art = Q.shuffle(ds).map(function (l) {
      return '<span style="display:inline-block;margin:5px">' + veHinhPhang(l, 52, chon(MAU_HINH)) + '</span>';
    }).join('');

    return { prompt: 'Có bao nhiêu ' + hoi + '?', art: art, answer: soCanDem, mach: 'Hình phẳng' };
  }

  /* ---- Hình khối ---- */

  var LOAI_KHOI = ['khối lập phương', 'khối hộp chữ nhật', 'khối trụ', 'khối cầu'];

  // Trộn màu với trắng (ti > 0) hoặc đen (ti < 0) để các mặt của khối phân biệt được
  function pha(hex, ti) {
    var n = parseInt(hex.slice(1), 16);
    var rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      return Math.round(ti > 0 ? v + (255 - v) * ti : v * (1 + ti));
    });
    return 'rgb(' + rgb.join(',') + ')';
  }

  function veKhoi(loai, mau) {
    var sang = pha(mau, 0.3), toi = pha(mau, -0.32);
    var s = '<svg viewBox="0 0 120 110" width="130" height="120">';

    if (loai === 'khối lập phương') {
      s += '<polygon points="20,40 60,20 100,40 60,60" fill="' + sang + '"/>' +
           '<polygon points="20,40 60,60 60,100 20,80" fill="' + mau + '"/>' +
           '<polygon points="100,40 60,60 60,100 100,80" fill="' + toi + '"/>';
    } else if (loai === 'khối hộp chữ nhật') {
      s += '<polygon points="12,46 52,26 108,40 68,60" fill="' + sang + '"/>' +
           '<polygon points="12,46 68,60 68,96 12,82" fill="' + mau + '"/>' +
           '<polygon points="108,40 68,60 68,96 108,76" fill="' + toi + '"/>';
    } else if (loai === 'khối trụ') {
      s += '<rect x="34" y="34" width="52" height="54" fill="' + mau + '"/>' +
           '<path d="M34,88 a26,11 0 0 0 52,0" fill="' + toi + '"/>' +
           '<ellipse cx="60" cy="34" rx="26" ry="11" fill="' + sang + '"/>';
    } else {
      s += '<circle cx="60" cy="60" r="38" fill="' + mau + '"/>' +
           '<path d="M30,86 a38,38 0 0 0 60,-8 a38,38 0 0 1 -60,8" fill="' + toi + '" opacity=".55"/>' +
           '<ellipse cx="47" cy="45" rx="13" ry="9" fill="#fff" opacity=".5" transform="rotate(-28 47 45)"/>';
    }
    return s + '</svg>';
  }

  function hinhKhoi() {
    var loai = chon(LOAI_KHOI);
    var mau = chon(MAU_HINH);
    return {
      prompt: 'Đây là hình khối gì?',
      art: veKhoi(loai, mau),
      answer: loai, choices: Q.shuffle(LOAI_KHOI.slice()), cols: 2, mach: 'Hình khối'
    };
  }

  /* ---- Đo độ dài bằng xăng-ti-mét ---- */

  var VAT_DO = [
    { ten: 'bút chì', mau: '#ffc93c' }, { ten: 'cái thước', mau: '#4aa8ff' },
    { ten: 'cục tẩy', mau: '#ff8fd0' }, { ten: 'que kem', mau: '#2fcf90' },
    { ten: 'sợi dây', mau: '#ff7a7a' }
  ];

  function doDoDai() {
    var v = chon(VAT_DO);
    var n = r(2, 10);
    var don = 26;                      // bề rộng 1cm trên hình
    var x0 = 16, y = 30;

    var vach = '';
    for (var i = 0; i <= 10; i++) {
      var x = x0 + i * don;
      vach += '<line x1="' + x + '" y1="74" x2="' + x + '" y2="' + (i % 5 === 0 ? 92 : 85) +
              '" stroke="#9aa3c7" stroke-width="2"/>' +
              '<text x="' + x + '" y="108" text-anchor="middle" font-family="Nunito, sans-serif" ' +
              'font-size="13" font-weight="700" fill="#7d84ab">' + i + '</text>';
    }

    return {
      prompt: '<b>' + v.ten.charAt(0).toUpperCase() + v.ten.slice(1) + '</b> dài mấy xăng-ti-mét?',
      speak: v.ten + ' dài mấy xăng-ti-mét?',
      art: '<svg viewBox="0 0 300 120" width="300" height="120" style="max-width:100%">' +
           '<rect x="' + x0 + '" y="' + y + '" width="' + (n * don) + '" height="22" rx="7" fill="' + v.mau + '"/>' +
           '<rect x="' + (x0 - 2) + '" y="70" width="' + (10 * don + 4) + '" height="8" rx="3" fill="#e2e7fb"/>' +
           vach + '</svg>',
      after: 'cm', answer: n, mach: 'Đo độ dài'
    };
  }

  /* ---- Xem giờ ---- */

  function dauKim(gocDo, daiKim) {
    var rad = (gocDo - 90) * Math.PI / 180;
    return [100 + daiKim * Math.cos(rad), 100 + daiKim * Math.sin(rad)];
  }

  function veDongHo(gio, phut) {
    var vach = '';
    for (var i = 0; i < 12; i++) {
      var ngoai = dauKim(i * 30, 87);
      var trong = dauKim(i * 30, i % 3 === 0 ? 77 : 81);
      vach += '<line x1="' + trong[0].toFixed(1) + '" y1="' + trong[1].toFixed(1) +
              '" x2="' + ngoai[0].toFixed(1) + '" y2="' + ngoai[1].toFixed(1) +
              '" stroke="#c3cbec" stroke-width="' + (i % 3 === 0 ? 6 : 3) + '" stroke-linecap="round"/>';
    }

    var so = '';
    [[12, 0], [3, 90], [6, 180], [9, 270]].forEach(function (p) {
      var v = dauKim(p[1], 65);
      so += '<text x="' + v[0].toFixed(1) + '" y="' + (v[1] + 8).toFixed(1) +
            '" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="22" ' +
            'font-weight="700" fill="#7d84ab">' + p[0] + '</text>';
    });

    var kimGio = dauKim((gio % 12) * 30 + phut * 0.5, 38);
    var kimPhut = dauKim(phut * 6, 55);

    return '<svg viewBox="0 0 200 200" width="190" height="190" role="img" aria-label="đồng hồ">' +
      '<circle cx="100" cy="100" r="94" fill="#fff" stroke="#e2e7fb" stroke-width="7"/>' + vach + so +
      '<line x1="100" y1="100" x2="' + kimGio[0].toFixed(1) + '" y2="' + kimGio[1].toFixed(1) +
        '" stroke="#2b2f55" stroke-width="10" stroke-linecap="round"/>' +
      '<line x1="100" y1="100" x2="' + kimPhut[0].toFixed(1) + '" y2="' + kimPhut[1].toFixed(1) +
        '" stroke="#4aa8ff" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="100" cy="100" r="8" fill="#8b7bf7"/></svg>';
  }

  function docGio(gio, phut) { return phut === 0 ? gio + ' giờ' : gio + ' giờ rưỡi'; }

  function xemGio(coRuoi) {
    var gio = r(1, 12);
    var phut = coRuoi && Math.random() < 0.5 ? 30 : 0;
    var dung = docGio(gio, phut);

    var set = [dung];
    var them = function (g, p) {
      var s = docGio(((g - 1 + 12) % 12) + 1, p);
      if (set.indexOf(s) === -1) set.push(s);
    };
    them(gio, phut === 0 ? 30 : 0);
    them(gio + 1, phut);
    them(gio - 1, phut);
    them(gio + 2, phut);

    return {
      prompt: 'Đồng hồ chỉ mấy giờ?',
      art: veDongHo(gio, phut),
      answer: dung, choices: Q.shuffle(set.slice(0, 4)), cols: 2, mach: 'Xem giờ'
    };
  }


  /* ================= DẠNG TRỰC QUAN — KHÔNG HIỆN PHÉP TÍNH ================= */

  // Cân thăng bằng: bé đếm khối trên hai đĩa rồi điền dấu, không thấy chữ số nào
  function veCan(trai, phai) {
    var khoi = function (n, x0) {
      var o = '';
      for (var i = 0; i < n; i++) {
        var cot = i % 4, hang = Math.floor(i / 4);
        o += '<rect x="' + (x0 + cot * 15) + '" y="' + (74 - hang * 15) + '" width="13" height="13" ' +
             'rx="3" fill="#4aa8ff" stroke="#2b7fd4" stroke-width="1.5"/>';
      }
      return o;
    };

    return '<svg viewBox="0 0 300 150" width="300" style="max-width:100%">' +
      '<rect x="146" y="40" width="8" height="90" fill="#9aa3c7"/>' +
      '<path d="M120 134 h60 l-10 -6 h-40z" fill="#7d84ab"/>' +
      '<line x1="40" y1="46" x2="260" y2="46" stroke="#7d84ab" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="150" cy="46" r="9" fill="#8b7bf7"/>' +
      '<path d="M22 46 v34 M78 46 v34" stroke="#c3cbec" stroke-width="2.5"/>' +
      '<path d="M222 46 v34 M278 46 v34" stroke="#c3cbec" stroke-width="2.5"/>' +
      '<path d="M16 80 h68 l-8 10 h-52z" fill="#ffd9b8" stroke="#e0a800" stroke-width="2"/>' +
      '<path d="M216 80 h68 l-8 10 h-52z" fill="#ffd9b8" stroke="#e0a800" stroke-width="2"/>' +
      khoi(trai, 20) + khoi(phai, 220) +
      '</svg>';
  }

  function canThangBang(max) {
    var a = r(1, max);
    var b = Math.random() < 0.25 ? a : r(1, max);
    return {
      prompt: 'Bên nào nặng hơn? Đếm số khối rồi điền dấu nhé!',
      speak: 'Bên nào nặng hơn? Đếm số khối rồi điền dấu.',
      art: veCan(a, b),
      answer: dau(a, b), choices: DAU,
      mach: 'So sánh'
    };
  }

  // Thanh khối tách gộp: thấy tổng ô, phần đã tô và phần còn trống
  function veThanhKhoi(tong, daTo) {
    var rong = Math.min(34, Math.floor(280 / tong));
    var o = '';
    for (var i = 0; i < tong; i++) {
      var daTo_ = i < daTo;
      o += '<rect x="' + (6 + i * (rong + 3)) + '" y="8" width="' + rong + '" height="40" rx="6" ' +
           'fill="' + (daTo_ ? '#4aa8ff' : '#f1f4ff') + '" stroke="' + (daTo_ ? '#2b7fd4' : '#c3cbec') +
           '" stroke-width="2.5"' + (daTo_ ? '' : ' stroke-dasharray="5 4"') + '/>';
    }
    var w = 12 + tong * (rong + 3);
    return '<svg viewBox="0 0 ' + w + ' 56" width="' + Math.min(w, 320) + '" style="max-width:100%">' + o + '</svg>';
  }

  function tachGopTrucQuan(max) {
    var tong = r(3, max);
    var a = r(1, tong - 1);
    return {
      prompt: 'Thanh có <b>' + tong + '</b> ô, đã tô <b>' + a + '</b> ô. Còn mấy ô chưa tô?',
      speak: 'Thanh có ' + tong + ' ô, đã tô ' + a + ' ô. Còn mấy ô chưa tô?',
      art: veThanhKhoi(tong, a),
      after: 'ô', answer: tong - a, mach: 'Tách gộp số'
    };
  }

  global.ToanL1 = {
    congTru: congTru, congTruKhongNho: congTruKhongNho, tinhDay: tinhDay,
    dienSo: dienSo, dienSoTronChuc: dienSoTronChuc,
    tachGop: tachGop, chucDonVi: chucDonVi,
    soSanh: soSanh, soSanhPhepTinh: soSanhPhepTinh, lonNhatBeNhat: lonNhatBeNhat,
    demHinh: demHinh, lienKe: lienKe, daySo: daySo,
    choThem: choThem, choDi: choDi, gopNhom: gopNhom, nhieuHon: nhieuHon,
    itHon: itHon, roiKhoi: roiKhoi, lucDau: lucDau, honKem: honKem,
    nhanBietHinh: nhanBietHinh, demHinhHoc: demHinhHoc, hinhKhoi: hinhKhoi,
    doDoDai: doDoDai, xemGio: xemGio,
    canThangBang: canThangBang, tachGopTrucQuan: tachGopTrucQuan
  };
})(window);
