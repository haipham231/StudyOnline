/* ===== Toán lớp 3 — theo chương trình GDPT 2018 =====
   Bảng nhân chia 2–9, nhân chia ngoài bảng, phạm vi 100 000, gấp giảm,
   chu vi và diện tích hình chữ nhật/vuông, đơn vị đo, xem giờ đến phút,
   phân số đơn giản, toán đố hai bước.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  var TEN = ['An', 'Bảo', 'Chi', 'Duy', 'Hà', 'Khánh', 'Linh', 'Mai', 'Nam', 'Phúc', 'Quân', 'Thu'];
  var VAT = [
    { ten: 'quyển vở', dv: 'quyển' }, { ten: 'cái bút', dv: 'cái' },
    { ten: 'quả trứng', dv: 'quả' }, { ten: 'cái bánh', dv: 'cái' },
    { ten: 'bông hoa', dv: 'bông' }, { ten: 'con cá', dv: 'con' },
    { ten: 'viên gạch', dv: 'viên' }, { ten: 'cái ghế', dv: 'cái' }
  ];

  /* ---------- Bảng nhân chia ---------- */

  function bangNhan(bang) {
    var b = bang || r(2, 9), n = r(2, 10);
    return { text: b + ' × ' + n + ' =', answer: b * n, soChuSo: 2, mach: 'Bảng nhân' };
  }

  function bangChia(bang) {
    var b = bang || r(2, 9), n = r(2, 10);
    return { text: (b * n) + ' : ' + b + ' =', answer: n, soChuSo: 2, mach: 'Bảng chia' };
  }

  /* ---------- Nhân chia ngoài bảng ---------- */

  // Nhân số có hai hoặc ba chữ số với số có một chữ số
  function nhanNgoaiBang(soChuSoA) {
    var n = soChuSoA === 3 ? r(101, 320) : r(12, 99);
    var b = r(2, 9);
    return { text: n + ' × ' + b + ' =', answer: n * b, soChuSo: 5, mach: 'Nhân ngoài bảng' };
  }

  // Chia hết: số bị chia dựng từ thương nên luôn chia hết
  function chiaNgoaiBang() {
    var b = r(2, 9), thuong = r(11, 99);
    return { text: (b * thuong) + ' : ' + b + ' =', answer: thuong, soChuSo: 4, mach: 'Chia ngoài bảng' };
  }

  // Chia có dư — hỏi riêng thương hoặc số dư cho rõ ràng
  function chiaCoDu() {
    var b = r(3, 9), thuong = r(6, 40), du = r(1, b - 1);
    var a = b * thuong + du;
    if (Math.random() < 0.5) {
      return {
        prompt: 'Phép chia <b>' + a + ' : ' + b + '</b> có <b>thương</b> bằng bao nhiêu?',
        speak: 'Phép chia ' + a + ' chia ' + b + ' có thương bằng bao nhiêu?',
        answer: thuong, soChuSo: 3, mach: 'Chia có dư'
      };
    }
    return {
      prompt: 'Phép chia <b>' + a + ' : ' + b + '</b> có <b>số dư</b> bằng bao nhiêu?',
      speak: 'Phép chia ' + a + ' chia ' + b + ' có số dư bằng bao nhiêu?',
      answer: du, soChuSo: 1, mach: 'Chia có dư'
    };
  }

  /* ---------- Cộng trừ số lớn ---------- */

  function congTruLon(max) {
    var tran = max || 10000;
    var a = r(Math.floor(tran / 10), Math.floor(tran * 0.7));
    var b = r(Math.floor(tran / 20), tran - a);
    var soCs = String(tran).length + 1;
    if (Math.random() < 0.5) {
      return { text: a + ' + ' + b + ' =', answer: a + b, soChuSo: soCs, mach: 'Cộng trừ số lớn' };
    }
    return { text: (a + b) + ' − ' + b + ' =', answer: a, soChuSo: soCs, mach: 'Cộng trừ số lớn' };
  }

  /* ---------- Gấp, giảm ---------- */

  function gapGiam() {
    var lan = r(2, 9);
    if (Math.random() < 0.5) {
      var a = r(4, 60);
      return {
        prompt: 'Gấp <b>' + a + '</b> lên <b>' + lan + '</b> lần được số nào?',
        speak: 'Gấp ' + a + ' lên ' + lan + ' lần được số nào?',
        answer: a * lan, soChuSo: 4, mach: 'Gấp giảm'
      };
    }
    var thuong = r(3, 30);
    return {
      prompt: 'Giảm <b>' + thuong * lan + '</b> đi <b>' + lan + '</b> lần được số nào?',
      speak: 'Giảm ' + thuong * lan + ' đi ' + lan + ' lần được số nào?',
      answer: thuong, soChuSo: 3, mach: 'Gấp giảm'
    };
  }

  // So sánh số lớn gấp mấy lần số bé
  function gapMayLan() {
    var be = r(2, 12), lan = r(2, 9);
    return {
      prompt: '<b>' + be * lan + '</b> gấp mấy lần <b>' + be + '</b>?',
      speak: be * lan + ' gấp mấy lần ' + be + '?',
      answer: lan, after: 'lần', soChuSo: 2, mach: 'Gấp giảm'
    };
  }

  /* ---------- Tìm x ---------- */

  function timXNhanChia() {
    var kieu = r(1, 4);
    var b, x;
    if (kieu === 1) { b = r(2, 9); x = r(3, 40);
      return { prompt: 'Tìm <b>x</b>:', text: 'x × ' + b + ' = ' + (x * b), answer: x, soChuSo: 3, mach: 'Tìm x' }; }
    if (kieu === 2) { b = r(2, 9); x = r(3, 40);
      return { prompt: 'Tìm <b>x</b>:', text: b + ' × x = ' + (b * x), answer: x, soChuSo: 3, mach: 'Tìm x' }; }
    if (kieu === 3) { b = r(2, 9); x = b * r(3, 40);
      return { prompt: 'Tìm <b>x</b>:', text: 'x : ' + b + ' = ' + (x / b), answer: x, soChuSo: 4, mach: 'Tìm x' }; }
    var thuong = r(2, 9); x = r(2, 9);
    return { prompt: 'Tìm <b>x</b>:', text: (x * thuong) + ' : x = ' + thuong, answer: x, soChuSo: 2, mach: 'Tìm x' };
  }

  /* ---------- Biểu thức ---------- */

  // Thứ tự thực hiện: nhân chia trước, cộng trừ sau
  function bieuThuc() {
    var a = r(2, 9), b = r(2, 9), c = r(2, 40);
    if (Math.random() < 0.5) {
      return { prompt: 'Tính giá trị biểu thức:', text: c + ' + ' + a + ' × ' + b + ' =',
        answer: c + a * b, soChuSo: 3, mach: 'Biểu thức' };
    }
    var tich = a * b;
    var d = r(1, tich - 1);
    return { prompt: 'Tính giá trị biểu thức:', text: a + ' × ' + b + ' − ' + d + ' =',
      answer: tich - d, soChuSo: 3, mach: 'Biểu thức' };
  }

  function bieuThucNgoac() {
    var a = r(10, 40), b = r(2, 9), c = r(2, 6);
    return {
      prompt: 'Tính giá trị biểu thức:',
      text: '(' + a + ' + ' + b + ') × ' + c + ' =',
      answer: (a + b) * c, soChuSo: 4, mach: 'Biểu thức'
    };
  }

  /* ---------- Số và dãy số ---------- */

  function soSanhLon() {
    var a = r(1000, 99999), b;
    do { b = r(1000, 99999); } while (b === a);
    return { prompt: 'Điền dấu thích hợp:', text: a + ' … ' + b,
      answer: a > b ? '>' : '<', choices: ['>', '<', '='], cols: 3, mach: 'So sánh số' };
  }

  function lamTronL3() {
    var so = r(112, 9987);
    var tron = Math.round(so / 10) * 10;
    return {
      prompt: 'Làm tròn số <b>' + so + '</b> đến hàng chục.',
      speak: 'Làm tròn số ' + so + ' đến hàng chục.',
      answer: tron, soChuSo: 5, mach: 'Làm tròn'
    };
  }

  /* ---------- Chu vi, diện tích ---------- */

  function veChuNhat(a, b, hoi) {
    var w = 170, h = Math.max(70, Math.round(w * b / a));
    if (h > 120) { h = 120; }
    return '<svg viewBox="0 0 240 ' + (h + 54) + '" width="226" style="max-width:100%">' +
      '<rect x="40" y="12" width="' + w + '" height="' + h + '" fill="#e3f1ff" stroke="#4aa8ff" stroke-width="3"/>' +
      '<text x="' + (40 + w / 2) + '" y="' + (h + 34) + '" text-anchor="middle" font-family="Nunito" ' +
      'font-size="15" font-weight="800" fill="#2b7fd4">' + (hoi === 'a' ? '? cm' : a + ' cm') + '</text>' +
      // nhãn chiều rộng đặt ở x=20 chứ không phải 14: số có hai chữ số thò ra
      // khỏi viewBox và bị cắt mất
      '<text x="20" y="' + (12 + h / 2 + 5) + '" text-anchor="middle" font-family="Nunito" ' +
      'font-size="15" font-weight="800" fill="#2b7fd4">' + (hoi === 'b' ? '?' : b) + '</text>' +
      '</svg>';
  }

  function chuViChuNhat() {
    var a = r(4, 20), b = r(2, a - 1);
    return {
      prompt: 'Tính chu vi hình chữ nhật.<br><small>Chu vi = (dài + rộng) × 2</small>',
      speak: 'Tính chu vi hình chữ nhật dài ' + a + ' rộng ' + b + ' xăng ti mét.',
      art: veChuNhat(a, b), answer: (a + b) * 2, after: 'cm', soChuSo: 3, mach: 'Chu vi'
    };
  }

  function dienTichChuNhat() {
    var a = r(4, 20), b = r(2, a - 1);
    return {
      prompt: 'Tính diện tích hình chữ nhật.<br><small>Diện tích = dài × rộng</small>',
      speak: 'Tính diện tích hình chữ nhật dài ' + a + ' rộng ' + b + ' xăng ti mét.',
      art: veChuNhat(a, b), answer: a * b, after: 'cm²', soChuSo: 4, mach: 'Diện tích'
    };
  }

  function hinhVuongL3() {
    var a = r(3, 15);
    if (Math.random() < 0.5) {
      return {
        prompt: 'Hình vuông cạnh <b>' + a + ' cm</b>. Tính <b>chu vi</b>.',
        speak: 'Hình vuông cạnh ' + a + ' xăng ti mét. Tính chu vi.',
        answer: a * 4, after: 'cm', soChuSo: 3, mach: 'Chu vi'
      };
    }
    return {
      prompt: 'Hình vuông cạnh <b>' + a + ' cm</b>. Tính <b>diện tích</b>.',
      speak: 'Hình vuông cạnh ' + a + ' xăng ti mét. Tính diện tích.',
      answer: a * a, after: 'cm²', soChuSo: 3, mach: 'Diện tích'
    };
  }

  /* ---------- Đơn vị đo ---------- */

  function doiDonViL3() {
    var bang = [
      { tu: 'km', sang: 'm', he: 1000, max: 9 },
      { tu: 'm', sang: 'cm', he: 100, max: 9 },
      { tu: 'm', sang: 'dm', he: 10, max: 9 },
      { tu: 'cm', sang: 'mm', he: 10, max: 9 },
      { tu: 'kg', sang: 'g', he: 1000, max: 8 },
      { tu: 'l', sang: 'ml', he: 1000, max: 8 }
    ];
    var d = chon(bang), n = r(2, d.max);
    return {
      prompt: 'Đổi đơn vị:', text: n + ' ' + d.tu + ' = … ' + d.sang,
      answer: n * d.he, after: d.sang, soChuSo: 5, mach: 'Đổi đơn vị'
    };
  }

  function tienViet() {
    var gia = r(3, 20) * 1000, soLuong = r(2, 5);
    var dinh = function (n) { return n.toLocaleString('vi-VN'); };
    return {
      prompt: 'Một quyển vở giá <b>' + dinh(gia) + ' đồng</b>. Mua <b>' + soLuong +
              '</b> quyển hết bao nhiêu tiền?<br><small>Trả lời bằng số, không có dấu chấm.</small>',
      speak: 'Một quyển vở giá ' + gia + ' đồng. Mua ' + soLuong + ' quyển hết bao nhiêu tiền?',
      answer: gia * soLuong, after: 'đồng', soChuSo: 6, mach: 'Tiền Việt Nam'
    };
  }

  /* ---------- Xem giờ đến phút ---------- */

  function veDongHo(gio, phut) {
    var gocG = (gio % 12) * 30 + phut * 0.5, gocP = phut * 6;
    var kim = function (g, dai, rong, mau) {
      var rad = (g - 90) * Math.PI / 180;
      return '<line x1="100" y1="100" x2="' + (100 + dai * Math.cos(rad)).toFixed(1) +
        '" y2="' + (100 + dai * Math.sin(rad)).toFixed(1) + '" stroke="' + mau +
        '" stroke-width="' + rong + '" stroke-linecap="round"/>';
    };
    var so = '';
    for (var i = 1; i <= 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180;
      so += '<text x="' + (100 + 65 * Math.cos(a)).toFixed(1) + '" y="' +
        (100 + 65 * Math.sin(a) + 6).toFixed(1) + '" text-anchor="middle" font-family="Nunito" ' +
        'font-size="17" font-weight="800" fill="#2b2f55">' + i + '</text>';
    }
    return '<svg viewBox="0 0 200 200" width="186" style="max-width:100%" role="img" aria-label="đồng hồ">' +
      '<circle cx="100" cy="100" r="92" fill="#fff" stroke="#8b7bf7" stroke-width="5"/>' + so +
      kim(gocG, 38, 7, '#2b2f55') + kim(gocP, 55, 5, '#ff7a7a') +
      '<circle cx="100" cy="100" r="6" fill="#2b2f55"/></svg>';
  }

  function xemGioPhut() {
    var gio = r(1, 12), phut = r(1, 11) * 5;
    var doc = gio + ' giờ ' + phut + ' phút';
    var sai = [];
    while (sai.length < 2) {
      var p = r(1, 11) * 5;
      var t = gio + ' giờ ' + p + ' phút';
      if (p !== phut && sai.indexOf(t) === -1) sai.push(t);
    }
    return {
      prompt: 'Đồng hồ chỉ mấy giờ?', art: veDongHo(gio, phut),
      answer: doc, choices: Q.shuffle([doc].concat(sai)), cols: 1, mach: 'Xem giờ'
    };
  }

  /* ---------- Phân số đơn giản ---------- */

  function phanSoCuaSo() {
    var mau = chon([2, 3, 4, 5]), phan = r(2, 12);
    var so = mau * phan;
    return {
      prompt: 'Tìm <b>1/' + mau + '</b> của <b>' + so + '</b>.',
      speak: 'Tìm một phần ' + mau + ' của ' + so + '.',
      answer: phan, soChuSo: 3, mach: 'Phân số'
    };
  }

  /* ---------- Toán đố ---------- */

  function doHaiBuoc() {
    var nhom = r(3, 9), moiNhom = r(4, 12), v = chon(VAT);
    // lấy ra ít hơn tổng, nếu không đáp án ra số âm
    var them = r(2, nhom * moiNhom - 1);
    return {
      prompt: 'Có <b>' + nhom + '</b> rổ, mỗi rổ <b>' + moiNhom + '</b> ' + v.ten +
              '. Người ta lấy ra <b>' + them + '</b> ' + v.ten + '. Hỏi còn lại bao nhiêu ' + v.ten + '?',
      speak: 'Có ' + nhom + ' rổ, mỗi rổ ' + moiNhom + ' ' + v.ten + '. Lấy ra ' + them + '. Còn lại bao nhiêu?',
      answer: nhom * moiNhom - them, after: v.dv, soChuSo: 4, mach: 'Toán đố'
    };
  }

  function doChiaDeuL3() {
    var nhom = r(3, 9), moiNhom = r(3, 12), v = chon(VAT), t = chon(TEN);
    return {
      prompt: t + ' có <b>' + nhom * moiNhom + '</b> ' + v.ten + ', xếp đều vào <b>' + nhom +
              '</b> hộp. Hỏi mỗi hộp có bao nhiêu ' + v.ten + '?',
      speak: t + ' có ' + nhom * moiNhom + ' ' + v.ten + ', xếp đều vào ' + nhom + ' hộp. Mỗi hộp bao nhiêu?',
      answer: moiNhom, after: v.dv, soChuSo: 3, mach: 'Toán đố'
    };
  }

  function doGapLan() {
    var a = r(4, 25), lan = r(2, 6), v = chon(VAT), t = chon(TEN), t2 = chon(TEN);
    return {
      prompt: t + ' có <b>' + a + '</b> ' + v.ten + '. ' + t2 + ' có gấp <b>' + lan +
              '</b> lần ' + t + '. Hỏi cả hai bạn có bao nhiêu ' + v.ten + '?',
      speak: t + ' có ' + a + '. ' + t2 + ' có gấp ' + lan + ' lần. Cả hai có bao nhiêu?',
      answer: a + a * lan, after: v.dv, soChuSo: 4, mach: 'Toán đố'
    };
  }

  function doTimPhan() {
    var mau = chon([2, 3, 4, 5]), phan = r(3, 15), so = mau * phan, v = chon(VAT);
    return {
      prompt: 'Một cửa hàng có <b>' + so + '</b> ' + v.ten + ', đã bán <b>1/' + mau +
              '</b> số đó. Hỏi đã bán bao nhiêu ' + v.ten + '?',
      speak: 'Cửa hàng có ' + so + ' ' + v.ten + ', đã bán một phần ' + mau + ' số đó. Bán bao nhiêu?',
      answer: phan, after: v.dv, soChuSo: 3, mach: 'Toán đố'
    };
  }

  global.ToanL3 = {
    bangNhan: bangNhan, bangChia: bangChia,
    nhanNgoaiBang: nhanNgoaiBang, chiaNgoaiBang: chiaNgoaiBang, chiaCoDu: chiaCoDu,
    congTruLon: congTruLon, gapGiam: gapGiam, gapMayLan: gapMayLan,
    timXNhanChia: timXNhanChia, bieuThuc: bieuThuc, bieuThucNgoac: bieuThucNgoac,
    soSanhLon: soSanhLon, lamTronL3: lamTronL3,
    chuViChuNhat: chuViChuNhat, dienTichChuNhat: dienTichChuNhat, hinhVuongL3: hinhVuongL3,
    doiDonViL3: doiDonViL3, tienViet: tienViet, xemGioPhut: xemGioPhut,
    phanSoCuaSo: phanSoCuaSo,
    doHaiBuoc: doHaiBuoc, doChiaDeuL3: doChiaDeuL3, doGapLan: doGapLan, doTimPhan: doTimPhan
  };
})(window);
