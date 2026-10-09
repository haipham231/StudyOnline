/* ===== Toán lớp 2 — theo chương trình GDPT 2018 =====
   Phạm vi 1000, nhân chia bảng 2 và 5, tên gọi thành phần phép tính,
   đơn vị đo (cm, dm, m, kg, l), xem giờ, ngày tháng, đường gấp khúc.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  var TEN = ['An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Khoa', 'Lan', 'Minh', 'Nam', 'Thảo'];
  var VAT = [
    { ten: 'quyển vở', dv: 'quyển' }, { ten: 'cái bút', dv: 'cái' },
    { ten: 'quả cam', dv: 'quả' }, { ten: 'con tem', dv: 'con' },
    { ten: 'bông hoa', dv: 'bông' }, { ten: 'viên bi', dv: 'viên' },
    { ten: 'cái kẹo', dv: 'cái' }, { ten: 'quyển truyện', dv: 'quyển' }
  ];

  /* ---------- Cộng trừ ---------- */

  // Cộng trừ trong phạm vi 100. coNho=true thì chắc chắn phải nhớ.
  function congTru100(coNho) {
    var a, b;
    if (coNho) {
      var dvA = r(5, 9), dvB = r(10 - dvA, 9);        // tổng đơn vị vượt 10
      a = r(1, 8) * 10 + dvA;
      b = r(1, Math.max(1, 8 - Math.floor(a / 10))) * 10 + dvB;
    } else {
      a = r(11, 60); b = r(10, 90 - a);
    }
    if (Math.random() < 0.5) {
      return { text: a + ' + ' + b + ' =', answer: a + b, soChuSo: 3, mach: 'Cộng trừ 100' };
    }
    var tong = a + b;
    return { text: tong + ' − ' + b + ' =', answer: a, soChuSo: 3, mach: 'Cộng trừ 100' };
  }

  // Cộng trừ trong phạm vi 1000, đặt tính rồi tính
  function congTru1000() {
    var a = r(101, 800), b = r(101, 999 - a);
    if (Math.random() < 0.5) {
      return { text: a + ' + ' + b + ' =', answer: a + b, soChuSo: 4, mach: 'Cộng trừ 1000' };
    }
    return { text: (a + b) + ' − ' + b + ' =', answer: a, soChuSo: 4, mach: 'Cộng trừ 1000' };
  }

  // Tính nhẩm: tròn chục, tròn trăm
  function nhamTron() {
    var kieu = r(1, 3);
    if (kieu === 1) {
      var a = r(2, 8) * 10, b = r(1, 9 - a / 10) * 10;
      return { text: a + ' + ' + b + ' =', answer: a + b, soChuSo: 3, mach: 'Tính nhẩm' };
    }
    if (kieu === 2) {
      var c = r(2, 8) * 100, d = r(1, 9 - c / 100) * 100;
      return { text: c + ' + ' + d + ' =', answer: c + d, soChuSo: 4, mach: 'Tính nhẩm' };
    }
    var e = r(3, 9) * 10, f = r(1, e / 10 - 1) * 10;
    return { text: e + ' − ' + f + ' =', answer: e - f, soChuSo: 3, mach: 'Tính nhẩm' };
  }

  /* ---------- Nhân chia ---------- */

  // Lớp 2 học bảng nhân chia 2 và 5
  function nhanBang(bang) {
    var b = bang || chon([2, 5]);
    var n = r(1, 10);
    return { text: b + ' × ' + n + ' =', answer: b * n, soChuSo: 2, mach: 'Bảng nhân ' + b };
  }

  function chiaBang(bang) {
    var b = bang || chon([2, 5]);
    var n = r(1, 10);
    return { text: (b * n) + ' : ' + b + ' =', answer: n, soChuSo: 2, mach: 'Bảng chia ' + b };
  }

  // Từ một phép nhân viết ra phép chia tương ứng
  function nhanRaChia() {
    var b = chon([2, 5]), n = r(2, 10), t = b * n;
    return {
      prompt: 'Từ phép nhân <b>' + b + ' × ' + n + ' = ' + t + '</b>, hãy tính:',
      speak: 'Từ phép nhân ' + b + ' nhân ' + n + ' bằng ' + t + ', hãy tính',
      text: t + ' : ' + n + ' =', answer: b, soChuSo: 2, mach: 'Nhân chia'
    };
  }

  /* ---------- Tên gọi thành phần ---------- */

  var THANH_PHAN = [
    { mau: 'a + b = c', hoi: ['số hạng', 'số hạng', 'tổng'], dau: '+' },
    { mau: 'a − b = c', hoi: ['số bị trừ', 'số trừ', 'hiệu'], dau: '−' },
    { mau: 'a × b = c', hoi: ['thừa số', 'thừa số', 'tích'], dau: '×' },
    { mau: 'a : b = c', hoi: ['số bị chia', 'số chia', 'thương'], dau: ':' }
  ];

  function tenThanhPhan() {
    var tp = chon(THANH_PHAN);
    var viTri = r(0, 2);
    var a, b, c;
    if (tp.dau === '+') { a = r(10, 40); b = r(10, 40); c = a + b; }
    else if (tp.dau === '−') { c = r(10, 40); b = r(10, 40); a = b + c; }
    else if (tp.dau === '×') { a = chon([2, 5]); b = r(2, 9); c = a * b; }
    else { b = chon([2, 5]); c = r(2, 9); a = b * c; }

    var so = [a, b, c][viTri];
    var dung = tp.hoi[viTri];
    var sai = [];
    THANH_PHAN.forEach(function (x) {
      x.hoi.forEach(function (h) { if (h !== dung && sai.indexOf(h) === -1) sai.push(h); });
    });

    return {
      prompt: 'Trong phép tính <b>' + a + ' ' + tp.dau + ' ' + b + ' = ' + c + '</b>, ' +
              'số <b>' + so + '</b> gọi là gì?',
      speak: 'Trong phép tính ' + a + ' ' + tp.dau + ' ' + b + ' bằng ' + c + ', số ' + so + ' gọi là gì?',
      answer: dung,
      choices: Q.shuffle([dung].concat(Q.shuffle(sai).slice(0, 2))),
      cols: 1, mach: 'Thành phần phép tính'
    };
  }

  /* ---------- Tìm x ---------- */

  function timX() {
    var kieu = r(1, 4);
    var a, b, x;
    if (kieu === 1) { x = r(5, 60); b = r(5, 39); a = x + b;
      return { prompt: 'Tìm <b>x</b>:', text: 'x + ' + b + ' = ' + a, answer: x, soChuSo: 3, mach: 'Tìm x' }; }
    if (kieu === 2) { x = r(5, 60); b = r(5, 39); a = b + x;
      return { prompt: 'Tìm <b>x</b>:', text: b + ' + x = ' + a, answer: x, soChuSo: 3, mach: 'Tìm x' }; }
    if (kieu === 3) { b = r(5, 40); x = b + r(5, 50);
      return { prompt: 'Tìm <b>x</b>:', text: 'x − ' + b + ' = ' + (x - b), answer: x, soChuSo: 3, mach: 'Tìm x' }; }
    a = r(30, 90); x = r(5, a - 5);
    return { prompt: 'Tìm <b>x</b>:', text: a + ' − x = ' + (a - x), answer: x, soChuSo: 3, mach: 'Tìm x' };
  }

  /* ---------- Số có ba chữ số ---------- */

  function cauTaoSo() {
    var tram = r(1, 9), chuc = r(0, 9), dv = r(0, 9);
    var so = tram * 100 + chuc * 10 + dv;
    if (Math.random() < 0.5) {
      return {
        prompt: 'Số <b>' + so + '</b> gồm mấy trăm, mấy chục, mấy đơn vị?<br>' +
                '<small>Trả lời số <b>chục</b> nhé.</small>',
        speak: 'Số ' + so + ' có mấy chục?',
        answer: chuc, soChuSo: 1, mach: 'Số có ba chữ số'
      };
    }
    return {
      prompt: 'Số nào gồm <b>' + tram + '</b> trăm, <b>' + chuc + '</b> chục và <b>' + dv + '</b> đơn vị?',
      speak: 'Số nào gồm ' + tram + ' trăm, ' + chuc + ' chục và ' + dv + ' đơn vị?',
      answer: so, soChuSo: 3, mach: 'Số có ba chữ số'
    };
  }

  function soSanh3CS() {
    var a = r(100, 999), b;
    do { b = r(100, 999); } while (b === a);
    return {
      prompt: 'Điền dấu thích hợp:',
      text: a + ' … ' + b,
      answer: a > b ? '>' : '<',
      choices: ['>', '<', '='], cols: 3, mach: 'So sánh số'
    };
  }

  function daySoLop2() {
    var buoc = chon([2, 5, 10, 100]);
    var dau = buoc === 100 ? r(1, 5) * 100 : r(1, 10) * buoc;
    var ds = [dau, dau + buoc, dau + buoc * 2, dau + buoc * 3];
    return {
      prompt: 'Số tiếp theo của dãy là số nào?',
      text: ds.join('; ') + '; …',
      answer: dau + buoc * 4, soChuSo: 4, mach: 'Dãy số'
    };
  }

  /* ---------- Đo lường ---------- */

  function doDoDai2() {
    var kieu = r(1, 3);
    if (kieu === 1) {
      var dm = r(2, 9);
      return { prompt: 'Đổi đơn vị:', text: dm + ' dm = … cm', answer: dm * 10, after: 'cm',
        soChuSo: 3, mach: 'Đơn vị đo độ dài' };
    }
    if (kieu === 2) {
      var m = r(2, 9);
      return { prompt: 'Đổi đơn vị:', text: m + ' m = … dm', answer: m * 10, after: 'dm',
        soChuSo: 3, mach: 'Đơn vị đo độ dài' };
    }
    var a = r(10, 40), b = r(10, 40);
    return { prompt: 'Tính:', text: a + ' cm + ' + b + ' cm =', answer: a + b, after: 'cm',
      soChuSo: 3, mach: 'Đơn vị đo độ dài' };
  }

  function canNang() {
    var a = r(3, 20), b = r(2, 15);
    if (Math.random() < 0.5) {
      return {
        prompt: 'Bao gạo nặng <b>' + a + ' kg</b>, bao ngô nặng <b>' + b + ' kg</b>. ' +
                'Cả hai bao nặng bao nhiêu ki-lô-gam?',
        speak: 'Bao gạo nặng ' + a + ' ki lô gam, bao ngô nặng ' + b + ' ki lô gam. Cả hai nặng bao nhiêu?',
        answer: a + b, after: 'kg', soChuSo: 3, mach: 'Khối lượng'
      };
    }
    var l1 = r(5, 20), l2 = r(2, l1 - 1);
    return {
      prompt: 'Can thứ nhất có <b>' + l1 + ' l</b> nước, can thứ hai ít hơn <b>' + l2 + ' l</b>. ' +
              'Can thứ hai có mấy lít?',
      speak: 'Can thứ nhất có ' + l1 + ' lít, can thứ hai ít hơn ' + l2 + ' lít. Can thứ hai có mấy lít?',
      answer: l1 - l2, after: 'l', soChuSo: 2, mach: 'Dung tích'
    };
  }

  /* ---------- Xem giờ, ngày tháng ---------- */

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

  function xemGio2() {
    var gio = r(1, 12), phut = chon([0, 15, 30, 45]);
    var doc = phut === 0 ? gio + ' giờ'
      : phut === 15 ? gio + ' giờ 15 phút'
      : phut === 30 ? gio + ' giờ 30 phút'
      : gio + ' giờ 45 phút';
    var sai = [];
    [0, 15, 30, 45].forEach(function (p) {
      if (p === phut) return;
      sai.push(p === 0 ? gio + ' giờ' : gio + ' giờ ' + p + ' phút');
    });
    return {
      prompt: 'Đồng hồ chỉ mấy giờ?',
      art: veDongHo(gio, phut),
      answer: doc,
      choices: Q.shuffle([doc].concat(Q.shuffle(sai).slice(0, 2))),
      cols: 1, mach: 'Xem giờ'
    };
  }

  var THANG_30 = [4, 6, 9, 11];

  function ngayThang() {
    if (Math.random() < 0.5) {
      var t = r(1, 12);
      var ngay = t === 2 ? 28 : (THANG_30.indexOf(t) !== -1 ? 30 : 31);
      return {
        prompt: 'Tháng <b>' + t + '</b> có bao nhiêu ngày?<br><small>Tính năm thường nhé.</small>',
        speak: 'Tháng ' + t + ' có bao nhiêu ngày?',
        answer: String(ngay), choices: Q.shuffle(['28', '30', '31']), cols: 3, mach: 'Ngày tháng'
      };
    }
    var thu = r(2, 7);
    var tenThu = function (n) { return n === 8 ? 'chủ nhật' : 'thứ ' + n; };
    var hom = thu === 7 ? 8 : thu + 1;
    return {
      prompt: 'Hôm nay là <b>' + tenThu(thu) + '</b>. Ngày mai là thứ mấy?',
      speak: 'Hôm nay là ' + tenThu(thu) + '. Ngày mai là thứ mấy?',
      answer: tenThu(hom),
      choices: Q.shuffle([tenThu(hom), tenThu(thu), tenThu(hom === 8 ? 2 : hom + 1 > 7 ? 8 : hom + 1)]),
      cols: 3, mach: 'Ngày tháng'
    };
  }

  /* ---------- Hình học ---------- */

  function duongGapKhuc() {
    var n = r(2, 3);
    var doan = [];
    for (var i = 0; i < n; i++) doan.push(r(2, 9));
    var tong = doan.reduce(function (a, b) { return a + b; }, 0);
    var diem = 'ABCD'.slice(0, n + 1).split('').join('');
    return {
      prompt: 'Đường gấp khúc <b>' + diem + '</b> có các đoạn dài <b>' + doan.join(' cm, ') + ' cm</b>. ' +
              'Tính độ dài đường gấp khúc.',
      speak: 'Đường gấp khúc có các đoạn dài ' + doan.join(', ') + ' xăng ti mét. Tính độ dài đường gấp khúc.',
      answer: tong, after: 'cm', soChuSo: 3, mach: 'Đường gấp khúc'
    };
  }

  var HINH_L2 = [
    { ten: 'hình tứ giác', canh: 4 }, { ten: 'hình tam giác', canh: 3 },
    { ten: 'hình chữ nhật', canh: 4 }, { ten: 'hình vuông', canh: 4 }
  ];

  function hinhHoc2() {
    if (Math.random() < 0.5) {
      var h = chon(HINH_L2);
      // lấy số cạnh khác đáp án, không lấy từ danh sách hình vì ba trong bốn
      // hình đều có 4 cạnh, sẽ ra hai lựa chọn giống nhau
      var sai = Q.shuffle([3, 4, 5, 6].filter(function (n) { return n !== h.canh; }))
        .map(String);
      return {
        prompt: 'Một <b>' + h.ten + '</b> có mấy cạnh?',
        speak: 'Một ' + h.ten + ' có mấy cạnh?',
        answer: String(h.canh),
        choices: Q.shuffle([String(h.canh)].concat(sai.slice(0, 2))), cols: 3, mach: 'Hình học'
      };
    }
    var a = r(2, 9);
    return {
      prompt: 'Hình vuông có cạnh <b>' + a + ' cm</b>. Tính chu vi hình vuông đó.' +
              '<br><small>Chu vi hình vuông = cạnh × 4</small>',
      speak: 'Hình vuông có cạnh ' + a + ' xăng ti mét. Tính chu vi.',
      answer: a * 4, after: 'cm', soChuSo: 3, mach: 'Hình học'
    };
  }

  /* ---------- Toán đố ---------- */

  function doNhieuHon() {
    var a = r(12, 60), b = r(3, 20), v = chon(VAT), t = chon(TEN);
    return {
      prompt: t + ' có <b>' + a + '</b> ' + v.ten + '. Bạn ' + chon(TEN) + ' có nhiều hơn ' +
              t + ' <b>' + b + '</b> ' + v.ten + '. Hỏi bạn đó có bao nhiêu ' + v.ten + '?',
      speak: t + ' có ' + a + ' ' + v.ten + '. Bạn kia có nhiều hơn ' + b + '. Hỏi bạn đó có bao nhiêu?',
      answer: a + b, after: v.dv, soChuSo: 3, mach: 'Toán đố'
    };
  }

  function doItHon() {
    var a = r(20, 80), b = r(3, 15), v = chon(VAT), t = chon(TEN);
    return {
      prompt: t + ' có <b>' + a + '</b> ' + v.ten + '. Bạn ' + chon(TEN) + ' có ít hơn ' +
              t + ' <b>' + b + '</b> ' + v.ten + '. Hỏi bạn đó có bao nhiêu ' + v.ten + '?',
      speak: t + ' có ' + a + ' ' + v.ten + '. Bạn kia có ít hơn ' + b + '. Hỏi bạn đó có bao nhiêu?',
      answer: a - b, after: v.dv, soChuSo: 3, mach: 'Toán đố'
    };
  }

  function doGapSoLan() {
    var a = r(3, 10), lan = chon([2, 5]), v = chon(VAT), t = chon(TEN);
    return {
      prompt: t + ' có <b>' + a + '</b> ' + v.ten + '. Chị có gấp <b>' + lan + '</b> lần ' + t +
              '. Hỏi chị có bao nhiêu ' + v.ten + '?',
      speak: t + ' có ' + a + ' ' + v.ten + '. Chị có gấp ' + lan + ' lần. Hỏi chị có bao nhiêu?',
      answer: a * lan, after: v.dv, soChuSo: 3, mach: 'Toán đố'
    };
  }

  function doChiaDeu() {
    var nhom = chon([2, 5]), moiNhom = r(2, 9), v = chon(VAT);
    return {
      prompt: 'Có <b>' + nhom * moiNhom + '</b> ' + v.ten + ' chia đều cho <b>' + nhom +
              '</b> bạn. Hỏi mỗi bạn được mấy ' + v.ten + '?',
      speak: 'Có ' + nhom * moiNhom + ' ' + v.ten + ' chia đều cho ' + nhom + ' bạn. Mỗi bạn được mấy?',
      answer: moiNhom, after: v.dv, soChuSo: 2, mach: 'Toán đố'
    };
  }

  global.ToanL2 = {
    congTru100: congTru100, congTru1000: congTru1000, nhamTron: nhamTron,
    nhanBang: nhanBang, chiaBang: chiaBang, nhanRaChia: nhanRaChia,
    tenThanhPhan: tenThanhPhan, timX: timX,
    cauTaoSo: cauTaoSo, soSanh3CS: soSanh3CS, daySoLop2: daySoLop2,
    doDoDai2: doDoDai2, canNang: canNang,
    xemGio2: xemGio2, ngayThang: ngayThang,
    duongGapKhuc: duongGapKhuc, hinhHoc2: hinhHoc2,
    doNhieuHon: doNhieuHon, doItHon: doItHon, doGapSoLan: doGapSoLan, doChiaDeu: doChiaDeu
  };
})(window);
