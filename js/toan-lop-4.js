/* ===== Toán lớp 4 — theo chương trình GDPT 2018 =====
   Số tự nhiên lớn, hàng và lớp, bốn phép tính với số lớn, dấu hiệu chia hết,
   phân số, trung bình cộng, tìm hai số khi biết tổng–hiệu và tổng–tỉ,
   đơn vị đo lớn, góc, hình bình hành và hình thoi.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  var TEN = ['An', 'Bách', 'Chi', 'Duy', 'Giang', 'Hà', 'Khoa', 'Linh', 'Mai', 'Ngọc', 'Phúc', 'Trang'];
  var VAT = [
    { ten: 'quyển sách', dv: 'quyển' }, { ten: 'cái ghế', dv: 'cái' },
    { ten: 'cây bút', dv: 'cây' }, { ten: 'quả trứng', dv: 'quả' },
    { ten: 'kg gạo', dv: 'kg' }, { ten: 'mét vải', dv: 'm' }
  ];

  function ps(tu, mau) {
    return '<span class="ps"><i>' + tu + '</i><b>' + mau + '</b></span>';
  }
  function ucln(a, b) { return b ? ucln(b, a % b) : a; }

  /* ---------- Số tự nhiên ---------- */

  var HANG = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn'];

  function hangCuaChuSo() {
    var n = r(100000, 999999);
    var vt = r(0, 5);
    var cs = Math.floor(n / Math.pow(10, vt)) % 10;
    var dung = HANG[vt];
    var sai = Q.shuffle(HANG.filter(function (h) { return h !== dung; })).slice(0, 2);
    return {
      prompt: 'Trong số <b>' + n + '</b>, chữ số <b>' + cs + '</b> ở hàng nào?' +
              '<br><small>Đếm từ phải sang trái nhé.</small>',
      speak: 'Trong số ' + n + ', chữ số ' + cs + ' ở hàng nào?',
      answer: dung, choices: Q.shuffle([dung].concat(sai)), cols: 1, mach: 'Hàng và lớp'
    };
  }

  function giaTriChuSo() {
    var n = r(10000, 999999);
    var vt = r(1, String(n).length - 1);
    var cs = Math.floor(n / Math.pow(10, vt)) % 10;
    if (cs === 0) cs = 1;
    return {
      prompt: 'Trong số <b>' + n + '</b>, chữ số hàng <b>' + HANG[vt] + '</b> có giá trị bằng bao nhiêu?',
      speak: 'Trong số ' + n + ', chữ số hàng ' + HANG[vt] + ' có giá trị bằng bao nhiêu?',
      answer: (Math.floor(n / Math.pow(10, vt)) % 10) * Math.pow(10, vt),
      soChuSo: 6, mach: 'Hàng và lớp'
    };
  }

  function lamTronL4() {
    var hang = chon([100, 1000, 10000]);
    var n = r(hang, hang * 90) + r(1, hang - 1);
    var ten = hang === 100 ? 'trăm' : hang === 1000 ? 'nghìn' : 'chục nghìn';
    return {
      prompt: 'Làm tròn số <b>' + n + '</b> đến hàng <b>' + ten + '</b>.',
      speak: 'Làm tròn số ' + n + ' đến hàng ' + ten + '.',
      answer: Math.round(n / hang) * hang, soChuSo: 7, mach: 'Làm tròn'
    };
  }

  /* ---------- Bốn phép tính ---------- */

  function nhanHaiChuSo() {
    var a = r(12, 99), b = r(12, 99);
    return { text: a + ' × ' + b + ' =', answer: a * b, soChuSo: 5, mach: 'Nhân số lớn' };
  }

  function chiaHaiChuSo() {
    var b = r(12, 40), thuong = r(11, 90);
    return { text: (b * thuong) + ' : ' + b + ' =', answer: thuong, soChuSo: 4, mach: 'Chia số lớn' };
  }

  function congTruLonL4() {
    var a = r(10000, 400000), b = r(10000, 400000);
    if (Math.random() < 0.5) {
      return { text: a + ' + ' + b + ' =', answer: a + b, soChuSo: 7, mach: 'Cộng trừ số lớn' };
    }
    return { text: (a + b) + ' − ' + b + ' =', answer: a, soChuSo: 7, mach: 'Cộng trừ số lớn' };
  }

  function tinhNhanhL4() {
    var a = r(2, 9), b = r(11, 40), c = r(11, 40);
    return {
      prompt: 'Tính bằng cách thuận tiện nhất:',
      text: a + ' × ' + b + ' + ' + a + ' × ' + c + ' =',
      answer: a * (b + c), soChuSo: 5, mach: 'Tính nhanh'
    };
  }

  /* ---------- Dấu hiệu chia hết ---------- */

  function dauHieuChiaHet() {
    var d = chon([2, 3, 5, 9]);
    var dung = r(10, 60) * d;
    var sai = [];
    while (sai.length < 2) {
      var x = r(100, 900);
      if (x % d !== 0 && sai.indexOf(String(x)) === -1) sai.push(String(x));
    }
    return {
      prompt: 'Số nào <b>chia hết cho ' + d + '</b>?',
      speak: 'Số nào chia hết cho ' + d + '?',
      answer: String(dung), choices: Q.shuffle([String(dung)].concat(sai)), cols: 3,
      mach: 'Dấu hiệu chia hết'
    };
  }

  /* ---------- Phân số ---------- */

  function rutGonPS() {
    var tu = r(1, 9), mau = r(tu + 1, 12), k = r(2, 7);
    return {
      prompt: 'Rút gọn phân số ' + ps(tu * k, mau * k) + ' rồi cho biết <b>tử số</b> sau khi rút gọn.',
      speak: 'Rút gọn phân số ' + (tu * k) + ' phần ' + (mau * k) + '. Tử số bằng bao nhiêu?',
      answer: tu / ucln(tu, mau), soChuSo: 3, mach: 'Rút gọn phân số'
    };
  }

  function soSanhPS() {
    var mau = r(3, 12), a = r(1, mau - 1), b;
    do { b = r(1, mau - 1); } while (b === a);
    return {
      prompt: 'So sánh hai phân số ' + ps(a, mau) + ' và ' + ps(b, mau) + ':',
      speak: 'So sánh ' + a + ' phần ' + mau + ' và ' + b + ' phần ' + mau,
      answer: a > b ? '>' : '<', choices: ['>', '<', '='], cols: 3, mach: 'So sánh phân số'
    };
  }

  function congPSCungMau() {
    var mau = r(4, 12), a = r(1, mau - 2), b = r(1, mau - a - 1);
    return {
      prompt: 'Tính ' + ps(a, mau) + ' + ' + ps(b, mau) + ' rồi cho biết <b>tử số</b> của kết quả.' +
              '<br><small>Chưa cần rút gọn.</small>',
      speak: a + ' phần ' + mau + ' cộng ' + b + ' phần ' + mau + '. Tử số bằng bao nhiêu?',
      answer: a + b, soChuSo: 3, mach: 'Cộng trừ phân số'
    };
  }

  function phanSoCuaSoL4() {
    var mau = r(2, 9), tu = r(1, mau - 1), phan = r(3, 20);
    var so = mau * phan;
    return {
      prompt: 'Tìm ' + ps(tu, mau) + ' của <b>' + so + '</b>.',
      speak: 'Tìm ' + tu + ' phần ' + mau + ' của ' + so,
      answer: phan * tu, soChuSo: 4, mach: 'Phân số của một số'
    };
  }

  /* ---------- Trung bình cộng ---------- */

  function trungBinhCong() {
    var n = r(2, 4);
    var tb = r(5, 40);
    var ds = [];
    var con = tb * n;
    for (var i = 0; i < n - 1; i++) {
      var lay = r(1, Math.max(1, con - (n - 1 - i)));
      ds.push(lay); con -= lay;
    }
    ds.push(con);
    return {
      prompt: 'Tìm trung bình cộng của các số: <b>' + ds.join('; ') + '</b>.',
      speak: 'Tìm trung bình cộng của ' + ds.join(', '),
      answer: tb, soChuSo: 4, mach: 'Trung bình cộng'
    };
  }

  /* ---------- Tổng hiệu, tổng tỉ ---------- */

  function tongHieu() {
    var be = r(5, 60), hieu = r(2, 40);
    var lon = be + hieu, tong = be + lon;
    var hoiLon = Math.random() < 0.5;
    return {
      prompt: 'Tổng hai số là <b>' + tong + '</b>, hiệu hai số là <b>' + hieu + '</b>. ' +
              'Tìm <b>số ' + (hoiLon ? 'lớn' : 'bé') + '</b>.' +
              '<br><small>Số bé = (tổng − hiệu) : 2</small>',
      speak: 'Tổng hai số là ' + tong + ', hiệu là ' + hieu + '. Tìm số ' + (hoiLon ? 'lớn' : 'bé'),
      answer: hoiLon ? lon : be, soChuSo: 4, mach: 'Tổng hiệu'
    };
  }

  function tongTi() {
    var ti = r(2, 5), phan = r(4, 30);
    var be = phan, lon = phan * ti, tong = be + lon;
    var hoiLon = Math.random() < 0.5;
    return {
      prompt: 'Tổng hai số là <b>' + tong + '</b>. Số lớn gấp <b>' + ti + '</b> lần số bé. ' +
              'Tìm <b>số ' + (hoiLon ? 'lớn' : 'bé') + '</b>.',
      speak: 'Tổng hai số là ' + tong + '. Số lớn gấp ' + ti + ' lần số bé. Tìm số ' + (hoiLon ? 'lớn' : 'bé'),
      answer: hoiLon ? lon : be, soChuSo: 4, mach: 'Tổng tỉ'
    };
  }

  /* ---------- Đơn vị đo ---------- */

  function doiDonViL4() {
    var bang = [
      { tu: 'tấn', sang: 'kg', he: 1000, max: 9 },
      { tu: 'tạ', sang: 'kg', he: 100, max: 9 },
      { tu: 'yến', sang: 'kg', he: 10, max: 9 },
      { tu: 'km', sang: 'm', he: 1000, max: 9 },
      { tu: 'm²', sang: 'dm²', he: 100, max: 9 },
      { tu: 'dm²', sang: 'cm²', he: 100, max: 9 },
      { tu: 'giờ', sang: 'phút', he: 60, max: 9 },
      { tu: 'phút', sang: 'giây', he: 60, max: 9 },
      { tu: 'thế kỉ', sang: 'năm', he: 100, max: 9 }
    ];
    var d = chon(bang), n = r(2, d.max);
    return {
      prompt: 'Đổi đơn vị:', text: n + ' ' + d.tu + ' = … ' + d.sang,
      answer: n * d.he, after: d.sang, soChuSo: 5, mach: 'Đổi đơn vị'
    };
  }

  /* ---------- Hình học ---------- */

  var GOC = [
    { ten: 'góc nhọn', mo: 'nhỏ hơn góc vuông' },
    { ten: 'góc vuông', mo: 'bằng 90 độ' },
    { ten: 'góc tù', mo: 'lớn hơn góc vuông nhưng nhỏ hơn góc bẹt' },
    { ten: 'góc bẹt', mo: 'bằng 180 độ' }
  ];

  function nhanBietGoc() {
    var g = chon(GOC);
    var sai = Q.shuffle(GOC.filter(function (x) { return x.ten !== g.ten; })).slice(0, 2)
      .map(function (x) { return x.ten; });
    return {
      prompt: 'Góc <b>' + g.mo + '</b> gọi là góc gì?',
      speak: 'Góc ' + g.mo + ' gọi là góc gì?',
      answer: g.ten, choices: Q.shuffle([g.ten].concat(sai)), cols: 1, mach: 'Góc'
    };
  }

  function veHinhBinhHanh(a, h) {
    return '<svg viewBox="0 0 230 150" width="220" style="max-width:100%">' +
      '<polygon points="50,20 200,20 180,110 30,110" fill="#efeaff" stroke="#8b7bf7" stroke-width="3"/>' +
      '<line x1="105" y1="20" x2="105" y2="110" stroke="#ff7a7a" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<text x="105" y="132" text-anchor="middle" font-family="Nunito" font-size="15" ' +
      'font-weight="800" fill="#6a58e0">a = ' + a + ' cm</text>' +
      '<text x="118" y="70" font-family="Nunito" font-size="15" font-weight="800" fill="#e05454">h = ' + h + '</text>' +
      '</svg>';
  }

  function dienTichBinhHanh() {
    var a = r(4, 20), h = r(3, 15);
    return {
      prompt: 'Tính diện tích hình bình hành.<br><small>Diện tích = đáy × chiều cao</small>',
      speak: 'Tính diện tích hình bình hành đáy ' + a + ' chiều cao ' + h,
      art: veHinhBinhHanh(a, h), answer: a * h, after: 'cm²', soChuSo: 4, mach: 'Diện tích'
    };
  }

  function dienTichHinhThoi() {
    var m = r(4, 20), n = r(4, 20);
    if ((m * n) % 2 !== 0) n += 1;
    return {
      prompt: 'Hình thoi có hai đường chéo dài <b>' + m + ' cm</b> và <b>' + n + ' cm</b>. ' +
              'Tính diện tích.<br><small>Diện tích = (đường chéo 1 × đường chéo 2) : 2</small>',
      speak: 'Hình thoi có hai đường chéo ' + m + ' và ' + n + ' xăng ti mét. Tính diện tích.',
      answer: m * n / 2, after: 'cm²', soChuSo: 4, mach: 'Diện tích'
    };
  }

  function chuViDienTichL4() {
    var a = r(5, 40), b = r(3, a - 1);
    if (Math.random() < 0.5) {
      return {
        prompt: 'Hình chữ nhật dài <b>' + a + ' m</b>, rộng <b>' + b + ' m</b>. Tính <b>chu vi</b>.',
        speak: 'Hình chữ nhật dài ' + a + ' mét rộng ' + b + ' mét. Tính chu vi.',
        answer: (a + b) * 2, after: 'm', soChuSo: 4, mach: 'Chu vi'
      };
    }
    return {
      prompt: 'Hình chữ nhật dài <b>' + a + ' m</b>, rộng <b>' + b + ' m</b>. Tính <b>diện tích</b>.',
      speak: 'Hình chữ nhật dài ' + a + ' mét rộng ' + b + ' mét. Tính diện tích.',
      answer: a * b, after: 'm²', soChuSo: 4, mach: 'Diện tích'
    };
  }

  /* ---------- Toán đố ---------- */

  function doTrungBinh() {
    var n = r(3, 5), tb = r(10, 40), v = chon(VAT);
    return {
      prompt: 'Có <b>' + n + '</b> thùng, trung bình mỗi thùng có <b>' + tb + '</b> ' + v.ten +
              '. Hỏi cả <b>' + n + '</b> thùng có bao nhiêu ' + v.ten + '?',
      speak: 'Có ' + n + ' thùng, trung bình mỗi thùng ' + tb + '. Cả ' + n + ' thùng có bao nhiêu?',
      answer: n * tb, after: v.dv, soChuSo: 4, mach: 'Toán đố'
    };
  }

  function doTongHieu() {
    var be = r(10, 80), hieu = r(4, 40), v = chon(VAT), t = chon(TEN), t2 = chon(TEN);
    return {
      prompt: t + ' và ' + t2 + ' có tất cả <b>' + (be * 2 + hieu) + '</b> ' + v.ten + '. ' +
              t2 + ' có nhiều hơn ' + t + ' <b>' + hieu + '</b> ' + v.ten +
              '. Hỏi ' + t + ' có bao nhiêu ' + v.ten + '?',
      speak: 'Hai bạn có tất cả ' + (be * 2 + hieu) + '. Bạn kia nhiều hơn ' + hieu + '. Bạn đầu có bao nhiêu?',
      answer: be, after: v.dv, soChuSo: 4, mach: 'Toán đố'
    };
  }

  function doMuaHang() {
    var gia = r(5, 40) * 1000, sl = r(3, 12);
    return {
      prompt: 'Mua <b>' + sl + '</b> quyển vở, mỗi quyển <b>' + gia.toLocaleString('vi-VN') +
              ' đồng</b>. Hỏi hết bao nhiêu tiền?<br><small>Trả lời bằng số, không có dấu chấm.</small>',
      speak: 'Mua ' + sl + ' quyển vở, mỗi quyển ' + gia + ' đồng. Hết bao nhiêu tiền?',
      answer: gia * sl, after: 'đồng', soChuSo: 7, mach: 'Toán đố'
    };
  }

  function doDienTichDat() {
    var a = r(10, 50), b = r(5, a - 1);
    return {
      prompt: 'Một mảnh đất hình chữ nhật dài <b>' + a + ' m</b>, rộng <b>' + b + ' m</b>. ' +
              'Người ta rào xung quanh mảnh đất. Hỏi cần bao nhiêu mét rào?',
      speak: 'Mảnh đất dài ' + a + ' mét rộng ' + b + ' mét. Rào xung quanh cần bao nhiêu mét?',
      answer: (a + b) * 2, after: 'm', soChuSo: 4, mach: 'Toán đố'
    };
  }

  global.ToanL4 = {
    hangCuaChuSo: hangCuaChuSo, giaTriChuSo: giaTriChuSo, lamTronL4: lamTronL4,
    nhanHaiChuSo: nhanHaiChuSo, chiaHaiChuSo: chiaHaiChuSo, congTruLonL4: congTruLonL4,
    tinhNhanhL4: tinhNhanhL4, dauHieuChiaHet: dauHieuChiaHet,
    rutGonPS: rutGonPS, soSanhPS: soSanhPS, congPSCungMau: congPSCungMau,
    phanSoCuaSoL4: phanSoCuaSoL4, trungBinhCong: trungBinhCong,
    tongHieu: tongHieu, tongTi: tongTi, doiDonViL4: doiDonViL4,
    nhanBietGoc: nhanBietGoc, dienTichBinhHanh: dienTichBinhHanh,
    dienTichHinhThoi: dienTichHinhThoi, chuViDienTichL4: chuViDienTichL4,
    doTrungBinh: doTrungBinh, doTongHieu: doTongHieu, doMuaHang: doMuaHang,
    doDienTichDat: doDienTichDat
  };
})(window);
