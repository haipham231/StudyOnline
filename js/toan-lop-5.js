/* ===== Bộ sinh đề Toán lớp 5 — dùng chung cho bài tập, kiểm tra và game =====
   Bám mạch kiến thức Toán 5 (Chương trình GDPT 2018).
   Quy ước: số thập phân viết theo kiểu Việt Nam (dấu phẩy), đáp án trả về dạng chuỗi.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  /* ---------- tiện ích ---------- */

  function ucln(a, b) { return b ? ucln(b, a % b) : a; }

  // số -> chuỗi kiểu Việt Nam: 0.75 -> "0,75"
  function sv(n) {
    return String(Math.round(n * 1e6) / 1e6).replace('.', ',');
  }

  // phân số hiển thị hai tầng
  function ps(tu, mau) {
    return '<span class="ps"><i>' + tu + '</i><b>' + mau + '</b></span>';
  }

  // Giá trị thật của một lựa chọn, để không bao giờ có hai phương án bằng nhau.
  // Nhận cả phân số, hỗn số và cặp phân số của bài quy đồng.
  function giaTriCua(html) {
    var s = String(html);

    var hon = s.match(/<span class="hs">(\d+)<span class="ps"><i>(\d+)<\/i><b>(\d+)<\/b>/);
    if (hon) return 'v' + (Number(hon[1]) + Number(hon[2]) / Number(hon[3]));

    var ps_ = s.match(/<i>(-?\d+)<\/i><b>(\d+)<\/b>/g);
    if (ps_ && ps_.length) {
      return 'v' + ps_.map(function (x) {
        var m = x.match(/<i>(-?\d+)<\/i><b>(\d+)<\/b>/);
        return Number(m[1]) / Number(m[2]);
      }).join('|');
    }
    return s;
  }

  // tạo n lựa chọn: đáp án đúng cộng các phương án nhiễu, không phương án nào
  // được bằng giá trị của phương án khác (ví dụ 1/10 và 4/40 là một)
  function tron(dung, cacSai, n) {
    var set = [dung];
    var daCo = [giaTriCua(dung)];

    Q.shuffle(cacSai).forEach(function (v) {
      if (set.length >= n) return;
      var g = giaTriCua(v);
      if (daCo.indexOf(g) !== -1) return;
      daCo.push(g);
      set.push(v);
    });
    return Q.shuffle(set);
  }

  /* ================= PHÂN SỐ ================= */

  function rutGon() {
    var mau = r(2, 12);
    var tu = r(1, mau - 1);
    var k = r(2, 5);
    var g = ucln(tu, mau);
    var tuGon = tu / g, mauGon = mau / g;

    var sai = [ps(tu, mau * k), ps(tuGon + 1, mauGon), ps(tuGon, mauGon + 1),
               ps(mauGon, tuGon), ps(tuGon * 2, mauGon)];

    return {
      prompt: 'Rút gọn phân số ' + ps(tu * k, mau * k),
      speak: 'Rút gọn phân số ' + (tu * k) + ' phần ' + (mau * k),
      answer: ps(tuGon, mauGon),
      choices: tron(ps(tuGon, mauGon), sai, 4),
      cols: 4, mach: 'Phân số', kq: tuGon / mauGon
    };
  }

  function congTruPhanSo() {
    var mau1 = r(2, 9), mau2 = Math.random() < 0.5 ? mau1 : r(2, 9);
    var tu1 = r(1, mau1 - 1), tu2 = r(1, mau2 - 1);
    var cong = Math.random() < 0.6;

    var tu = cong ? tu1 * mau2 + tu2 * mau1 : tu1 * mau2 - tu2 * mau1;
    var mau = mau1 * mau2;
    if (tu <= 0) { tu = Math.abs(tu) || 1; }
    var g = ucln(tu, mau);
    var a = tu / g, b = mau / g;

    var sai = [ps(a + 1, b), ps(a, b + 1), ps(tu1 + tu2, mau1 + mau2), ps(b, a), ps(a * 2, b)];

    return {
      prompt: 'Tính: ' + ps(tu1, mau1) + (cong ? ' + ' : ' − ') + ps(tu2, mau2),
      speak: 'Tính ' + tu1 + ' phần ' + mau1 + (cong ? ' cộng ' : ' trừ ') + tu2 + ' phần ' + mau2,
      answer: ps(a, b),
      choices: tron(ps(a, b), sai, 4),
      cols: 4, mach: 'Phân số', kq: a / b
    };
  }

  function nhanChiaPhanSo() {
    var m1 = r(2, 8), t1 = r(1, m1 - 1);
    var m2 = r(2, 8), t2 = r(1, m2 - 1);
    var nhan = Math.random() < 0.5;

    var tu = nhan ? t1 * t2 : t1 * m2;
    var mau = nhan ? m1 * m2 : m1 * t2;
    var g = ucln(tu, mau);
    var a = tu / g, b = mau / g;

    var sai = [ps(t1 * t2, m1 * m2), ps(t1 + t2, m1 + m2), ps(b, a), ps(a + 1, b), ps(a, b + 2)];

    return {
      prompt: 'Tính: ' + ps(t1, m1) + (nhan ? ' × ' : ' : ') + ps(t2, m2),
      speak: 'Tính ' + t1 + ' phần ' + m1 + (nhan ? ' nhân ' : ' chia ') + t2 + ' phần ' + m2,
      answer: ps(a, b),
      choices: tron(ps(a, b), sai, 4),
      cols: 4, mach: 'Phân số', kq: a / b
    };
  }

  function soSanhPhanSo() {
    var m1 = r(2, 9), t1 = r(1, m1 - 1);
    var m2 = r(2, 9), t2 = r(1, m2 - 1);
    if (Math.random() < 0.2) { t2 = t1 * 2; m2 = m1 * 2; }   // chừa chỗ cho đáp án "="
    var x = t1 / m1, y = t2 / m2;

    return {
      prompt: 'Điền dấu thích hợp',
      text: ps(t1, m1), after: ps(t2, m2),
      answer: x > y ? '>' : x < y ? '<' : '=',
      choices: ['>', '<', '='], mach: 'Phân số', kq: x - y
    };
  }

  /* ================= SỐ THẬP PHÂN ================= */

  function congTruThapPhan() {
    var a = r(10, 999) / 10, b = r(10, 500) / 10;
    if (Math.random() < 0.5) { a = r(100, 9999) / 100; b = r(100, 5000) / 100; }
    var cong = Math.random() < 0.5;
    var kq = cong ? a + b : Math.max(a, b) - Math.min(a, b);
    var x = cong ? a : Math.max(a, b), y = cong ? b : Math.min(a, b);

    return {
      text: sv(x) + (cong ? ' + ' : ' − ') + sv(y) + ' =',
      answer: sv(kq), thapPhan: true, small: true,
      mach: 'Số thập phân', kq: kq
    };
  }

  function nhanThapPhan() {
    if (Math.random() < 0.4) {
      var a = r(10, 999) / 100;
      var k = chon([10, 100, 1000]);
      return {
        text: sv(a) + ' × ' + k + ' =', answer: sv(a * k),
        thapPhan: true, small: true, mach: 'Số thập phân', kq: a * k
      };
    }
    var x = r(10, 199) / 10, n = r(2, 9);
    return {
      text: sv(x) + ' × ' + n + ' =', answer: sv(x * n),
      thapPhan: true, small: true, mach: 'Số thập phân', kq: x * n
    };
  }

  function chiaThapPhan() {
    if (Math.random() < 0.4) {
      var k = chon([10, 100]);
      var a = r(100, 9999);                 // số nguyên, chia 10 hoặc 100 vẫn ra số đẹp
      return {
        text: sv(a) + ' : ' + k + ' =', answer: sv(a / k),
        thapPhan: true, small: true, mach: 'Số thập phân', kq: a / k
      };
    }
    var n = r(2, 9), thuong = r(10, 199) / 10;
    return {
      text: sv(thuong * n) + ' : ' + n + ' =', answer: sv(thuong),
      thapPhan: true, small: true, mach: 'Số thập phân', kq: thuong
    };
  }

  function soSanhThapPhan() {
    var a = r(100, 9999) / 100;
    var b = Math.random() < 0.2 ? a : r(100, 9999) / 100;
    return {
      prompt: 'Điền dấu thích hợp',
      text: sv(a), after: sv(b),
      answer: a > b ? '>' : a < b ? '<' : '=',
      choices: ['>', '<', '='], small: true, mach: 'Số thập phân', kq: a - b
    };
  }

  function phanSoSangThapPhan() {
    var cap = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
               [1, 8], [3, 8], [5, 8], [1, 10], [7, 10], [1, 20], [9, 20], [1, 25]];
    var c = chon(cap);
    return {
      prompt: 'Viết phân số ' + ps(c[0], c[1]) + ' dưới dạng số thập phân',
      speak: 'Viết phân số ' + c[0] + ' phần ' + c[1] + ' dưới dạng số thập phân',
      answer: sv(c[0] / c[1]), thapPhan: true,
      mach: 'Số thập phân', kq: c[0] / c[1]
    };
  }

  /* ================= TỈ SỐ PHẦN TRĂM ================= */

  var PT = [5, 10, 20, 25, 40, 50, 60, 75, 80];

  function giaTriPhanTram() {
    var p = chon(PT), so = r(2, 40) * 10;
    return {
      prompt: 'Tìm <b>' + p + '%</b> của <b>' + so + '</b>',
      speak: 'Tìm ' + p + ' phần trăm của ' + so,
      answer: sv(so * p / 100), thapPhan: true,
      mach: 'Tỉ số phần trăm', kq: so * p / 100
    };
  }

  function timSoBanDau() {
    var p = chon(PT), so = r(2, 40) * 10;
    var phan = so * p / 100;
    return {
      prompt: '<b>' + sv(phan) + '</b> là <b>' + p + '%</b> của số nào?',
      speak: sv(phan) + ' là ' + p + ' phần trăm của số nào?',
      answer: sv(so), thapPhan: true,
      mach: 'Tỉ số phần trăm', kq: so
    };
  }

  function tiSoPhanTram() {
    var p = chon(PT), so = r(2, 40) * 10;
    var phan = so * p / 100;
    return {
      prompt: '<b>' + sv(phan) + '</b> chiếm bao nhiêu phần trăm của <b>' + so + '</b>?',
      speak: sv(phan) + ' chiếm bao nhiêu phần trăm của ' + so,
      after: '%', answer: sv(p), thapPhan: true,
      mach: 'Tỉ số phần trăm', kq: p
    };
  }

  /* ================= HÌNH HỌC ================= */

  // an: tên số đo cần tìm — hình chỉ ghi dấu hỏi, không ghi sẵn đáp án
  function veTamGiac(a, h, an) {
    var nhan = function (ten, gt) { return an === ten ? ten + ' = ?' : ten + ' = ' + sv(gt) + ' cm'; };
    return '<svg viewBox="0 0 200 130" width="230" style="max-width:100%">' +
      '<polygon points="30,105 170,105 108,20" fill="#cfe6ff" stroke="#4aa8ff" stroke-width="3"/>' +
      '<line x1="108" y1="20" x2="108" y2="105" stroke="#ff7a7a" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<rect x="98" y="95" width="10" height="10" fill="none" stroke="#ff7a7a" stroke-width="2"/>' +
      '<text x="100" y="124" text-anchor="middle" font-family="Nunito" font-size="15" font-weight="800" fill="#2b2f55">' +
        (an === 'a' ? 'a = ?' : sv(a) + ' cm') + '</text>' +
      '<text x="120" y="66" font-family="Nunito" font-size="15" font-weight="800" fill="#e05454">' + nhan('h', h) + '</text>' +
      '</svg>';
  }

  function dienTichTamGiac() {
    var a = r(4, 30), h = r(2, 20) * 2;      // tích luôn chia hết cho 2
    return {
      prompt: 'Tính diện tích hình tam giác có đáy <b>' + a + ' cm</b> và chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính diện tích hình tam giác có đáy ' + a + ' xăng ti mét và chiều cao ' + h + ' xăng ti mét',
      art: veTamGiac(a, h),
      after: 'cm²', answer: sv(a * h / 2), thapPhan: true,
      mach: 'Diện tích', kq: a * h / 2
    };
  }

  function veHinhThang(a, b, h, an) {
    var nhan = function (ten, gt) { return an === ten ? ten + ' = ?' : ten + ' = ' + sv(gt) + ' cm'; };
    return '<svg viewBox="0 0 220 130" width="240" style="max-width:100%">' +
      '<polygon points="60,25 160,25 190,105 30,105" fill="#dff7ec" stroke="#2fcf90" stroke-width="3"/>' +
      '<line x1="110" y1="25" x2="110" y2="105" stroke="#ff7a7a" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<text x="110" y="18" text-anchor="middle" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">' + nhan('a', a) + '</text>' +
      '<text x="110" y="124" text-anchor="middle" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">' + nhan('b', b) + '</text>' +
      '<text x="118" y="70" font-family="Nunito" font-size="14" font-weight="800" fill="#e05454">' + nhan('h', h) + '</text>' +
      '</svg>';
  }

  function dienTichHinhThang() {
    var a = r(3, 20), b = a + r(2, 15), h = r(2, 12) * 2;
    return {
      prompt: 'Tính diện tích hình thang có đáy bé <b>' + a + ' cm</b>, đáy lớn <b>' + b +
              ' cm</b>, chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính diện tích hình thang có đáy bé ' + a + ', đáy lớn ' + b + ', chiều cao ' + h + ' xăng ti mét',
      art: veHinhThang(a, b, h),
      after: 'cm²', answer: sv((a + b) * h / 2), thapPhan: true,
      mach: 'Diện tích', kq: (a + b) * h / 2
    };
  }

  // viewBox rộng 190 chứ không phải 160: nhãn "r = 20 cm" đặt ở x=126 dài gần
  // 80 đơn vị, khung 160 là chữ bị cắt mất đuôi
  function veHinhTron(nhan, gt, an) {
    return '<svg viewBox="0 0 190 170" width="200" style="max-width:100%">' +
      '<circle cx="95" cy="88" r="62" fill="#efeaff" stroke="#8b7bf7" stroke-width="3"/>' +
      '<circle cx="95" cy="88" r="4" fill="#8b7bf7"/>' +
      (nhan === 'r'
        ? '<line x1="95" y1="88" x2="157" y2="88" stroke="#ff7a7a" stroke-width="3"/>'
        : '<line x1="33" y1="88" x2="157" y2="88" stroke="#ff7a7a" stroke-width="3"/>') +
      '<text x="' + (nhan === 'r' ? 126 : 95) + '" y="80" text-anchor="middle" font-family="Nunito" ' +
      'font-size="15" font-weight="800" fill="#e05454">' + nhan + ' = ' + (an ? '?' : sv(gt) + ' cm') + '</text>' +
      '</svg>';
  }

  function hinhTron() {
    var r_ = r(1, 20);
    var tinhChuVi = Math.random() < 0.5;
    var dungBanKinh = Math.random() < 0.5;
    var d = r_ * 2;

    if (tinhChuVi) {
      return {
        prompt: 'Tính chu vi hình tròn có ' + (dungBanKinh ? 'bán kính <b>r = ' + r_ : 'đường kính <b>d = ' + d) +
                ' cm</b><br><small>Lấy số pi bằng 3,14</small>',
        speak: 'Tính chu vi hình tròn có ' + (dungBanKinh ? 'bán kính ' + r_ : 'đường kính ' + d) + ' xăng ti mét',
        art: veHinhTron(dungBanKinh ? 'r' : 'd', dungBanKinh ? r_ : d),
        after: 'cm', answer: sv(d * 3.14), thapPhan: true,
        mach: 'Hình tròn', kq: d * 3.14
      };
    }
    return {
      prompt: 'Tính diện tích hình tròn có bán kính <b>r = ' + r_ + ' cm</b>' +
              '<br><small>Lấy số pi bằng 3,14</small>',
      speak: 'Tính diện tích hình tròn có bán kính ' + r_ + ' xăng ti mét',
      art: veHinhTron('r', r_),
      after: 'cm²', answer: sv(r_ * r_ * 3.14), thapPhan: true,
      mach: 'Hình tròn', kq: r_ * r_ * 3.14
    };
  }

  function veHop(a, b, c) {
    return '<svg viewBox="0 0 200 150" width="220" style="max-width:100%">' +
      '<polygon points="30,50 110,20 180,45 100,78" fill="#ffe0b8" stroke="#e0a800" stroke-width="2.5"/>' +
      '<polygon points="30,50 100,78 100,128 30,100" fill="#ffd088" stroke="#e0a800" stroke-width="2.5"/>' +
      '<polygon points="180,45 100,78 100,128 180,95" fill="#f0b451" stroke="#e0a800" stroke-width="2.5"/>' +
      '<text x="60" y="118" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">' + sv(a) + '</text>' +
      '<text x="142" y="118" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">' + sv(b) + '</text>' +
      '<text x="10" y="80" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">' + sv(c) + '</text>' +
      '</svg>';
  }

  function theTich() {
    if (Math.random() < 0.4) {
      var c = r(2, 12);
      return {
        prompt: 'Tính thể tích hình lập phương có cạnh <b>' + c + ' cm</b>',
        speak: 'Tính thể tích hình lập phương có cạnh ' + c + ' xăng ti mét',
        art: veHop(c, c, c),
        after: 'cm³', answer: sv(c * c * c), thapPhan: true, soChuSo: 5,
        mach: 'Thể tích', kq: c * c * c
      };
    }
    var a = r(2, 15), b = r(2, 15), h = r(2, 12);
    return {
      prompt: 'Tính thể tích hình hộp chữ nhật có chiều dài <b>' + a + ' cm</b>, chiều rộng <b>' +
              b + ' cm</b>, chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính thể tích hình hộp chữ nhật dài ' + a + ', rộng ' + b + ', cao ' + h + ' xăng ti mét',
      art: veHop(a, b, h),
      after: 'cm³', answer: sv(a * b * h), thapPhan: true, soChuSo: 5,
      mach: 'Thể tích', kq: a * b * h
    };
  }

  function dienTichXungQuanh() {
    var a = r(3, 15), b = r(3, 15), h = r(2, 12);
    return {
      prompt: 'Tính diện tích xung quanh hình hộp chữ nhật có chiều dài <b>' + a +
              ' cm</b>, chiều rộng <b>' + b + ' cm</b>, chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính diện tích xung quanh hình hộp chữ nhật dài ' + a + ', rộng ' + b + ', cao ' + h,
      art: veHop(a, b, h),
      after: 'cm²', answer: sv((a + b) * 2 * h), thapPhan: true, soChuSo: 5,
      mach: 'Thể tích', kq: (a + b) * 2 * h
    };
  }

  /* ================= ĐỔI ĐƠN VỊ ================= */

  var BANG_DON_VI = [
    { ten: 'độ dài', dv: [['km', 1000], ['m', 1], ['dm', 0.1], ['cm', 0.01]] },
    { ten: 'khối lượng', dv: [['tấn', 1000], ['tạ', 100], ['yến', 10], ['kg', 1]] },
    { ten: 'diện tích', dv: [['km²', 1000000], ['ha', 10000], ['m²', 1], ['dm²', 0.01]] },
    { ten: 'thể tích', dv: [['m³', 1000], ['dm³', 1], ['cm³', 0.001]] }
  ];

  function doiDonVi() {
    var bang = chon(BANG_DON_VI);
    var i = r(0, bang.dv.length - 2);
    var tu = bang.dv[i], den = bang.dv[r(i + 1, Math.min(i + 2, bang.dv.length - 1))];
    var heSo = tu[1] / den[1];
    var so = chon([1, 2, 3, 5, 2.5, 0.5, 1.5, 4, 7]);

    // số quá lớn thì bé không gõ nổi — lùi về đơn vị liền kề
    if (so * heSo > 999999) {
      den = bang.dv[i + 1];
      heSo = tu[1] / den[1];
    }

    return {
      prompt: 'Đổi đơn vị đo ' + bang.ten,
      text: sv(so) + ' ' + tu[0] + ' =', after: den[0],
      answer: sv(so * heSo), thapPhan: true, soChuSo: 8, small: true,
      mach: 'Đổi đơn vị', kq: so * heSo
    };
  }

  /* ================= SỐ ĐO THỜI GIAN ================= */

  function thoiGian() {
    var g1 = r(1, 5), p1 = chon([0, 15, 20, 30, 40, 45]);
    var g2 = r(1, 4), p2 = chon([0, 10, 15, 25, 30, 45]);
    var cong = Math.random() < 0.6;

    var tong1 = g1 * 60 + p1, tong2 = g2 * 60 + p2;
    if (!cong && tong1 < tong2) { var t = tong1; tong1 = tong2; tong2 = t; }
    var kq = cong ? tong1 + tong2 : tong1 - tong2;

    var viet = function (p) {
      var g = Math.floor(p / 60), ph = p % 60;
      return g ? (g + ' giờ' + (ph ? ' ' + ph + ' phút' : '')) : ph + ' phút';
    };

    var sai = [viet(kq + 60), viet(kq - 60), viet(kq + 15), viet(kq - 10), viet(kq + 40)]
      .filter(function (v) { return v !== viet(kq) && !/-/.test(v); });

    return {
      prompt: 'Tính: <b>' + viet(tong1) + (cong ? ' + ' : ' − ') + viet(tong2) + '</b>',
      speak: 'Tính ' + viet(tong1) + (cong ? ' cộng ' : ' trừ ') + viet(tong2),
      answer: viet(kq), choices: tron(viet(kq), sai, 4), cols: 2,
      mach: 'Số đo thời gian', kq: kq
    };
  }

  /* ================= CHUYỂN ĐỘNG ĐỀU ================= */

  var PHUONG_TIEN = [
    { ten: 'Ô tô', e: '🚗' }, { ten: 'Xe máy', e: '🏍️' }, { ten: 'Xe đạp', e: '🚲' },
    { ten: 'Tàu hoả', e: '🚂' }, { ten: 'Ca nô', e: '🚤' }
  ];

  function chuyenDong() {
    var pt = chon(PHUONG_TIEN);
    var v = r(2, 12) * 5;              // 10 … 60 km/giờ
    var t = chon([1, 2, 3, 4, 1.5, 2.5, 0.5]);
    var s = v * t;
    var kieu = r(1, 3);

    if (kieu === 1) {
      return {
        prompt: pt.e + ' ' + pt.ten + ' đi với vận tốc <b>' + v + ' km/giờ</b> trong <b>' +
                sv(t) + ' giờ</b>. Tính quãng đường đi được.',
        speak: pt.ten + ' đi với vận tốc ' + v + ' ki lô mét giờ trong ' + sv(t) + ' giờ. Tính quãng đường.',
        after: 'km', answer: sv(s), thapPhan: true, soChuSo: 6,
        mach: 'Chuyển động đều', kq: s
      };
    }
    if (kieu === 2) {
      return {
        prompt: pt.e + ' ' + pt.ten + ' đi <b>' + sv(s) + ' km</b> hết <b>' + sv(t) +
                ' giờ</b>. Tính vận tốc.',
        speak: pt.ten + ' đi ' + sv(s) + ' ki lô mét hết ' + sv(t) + ' giờ. Tính vận tốc.',
        after: 'km/giờ', answer: sv(v), thapPhan: true, soChuSo: 6,
        mach: 'Chuyển động đều', kq: v
      };
    }
    return {
      prompt: pt.e + ' ' + pt.ten + ' đi <b>' + sv(s) + ' km</b> với vận tốc <b>' + v +
              ' km/giờ</b>. Tính thời gian đi.',
      speak: pt.ten + ' đi ' + sv(s) + ' ki lô mét với vận tốc ' + v + ' ki lô mét giờ. Tính thời gian.',
      after: 'giờ', answer: sv(t), thapPhan: true, soChuSo: 6,
      mach: 'Chuyển động đều', kq: t
    };
  }

  /* ================= GIẢI TOÁN CÓ LỜI VĂN ================= */

  var TEN = ['Lan', 'Nam', 'Mai', 'Bình', 'Hà', 'An', 'Tú', 'Linh', 'Minh', 'Hoa'];

  function trungBinhCong() {
    var n = r(3, 4);
    var ds = [];
    var tong = 0;
    for (var i = 0; i < n; i++) { var v = r(2, 40) * 5; ds.push(v); tong += v; }
    // chỉnh số cuối để trung bình cộng ra số đẹp
    var du = tong % n;
    if (du) { ds[n - 1] += (n - du); tong += (n - du); }

    return {
      prompt: 'Trung bình cộng của các số <b>' + ds.join(', ') + '</b> là bao nhiêu?',
      speak: 'Trung bình cộng của các số ' + ds.join(', '),
      answer: sv(tong / n), thapPhan: true, soChuSo: 6,
      mach: 'Giải toán', kq: tong / n
    };
  }

  function tiLeThuan() {
    var donGia = r(2, 30) * 1000;
    var soCu = r(2, 8), soMoi = r(2, 12);
    var vat = chon([['quyển vở', '📒'], ['cái bút', '✏️'], ['hộp sữa', '🥛'], ['quả trứng', '🥚']]);

    return {
      prompt: 'Mua <b>' + soCu + ' ' + vat[0] + '</b> hết <b>' + (donGia * soCu).toLocaleString('vi-VN') +
              ' đồng</b>. Hỏi mua <b>' + soMoi + ' ' + vat[0] + '</b> cùng loại thì hết bao nhiêu nghìn đồng?',
      speak: 'Mua ' + soCu + ' ' + vat[0] + ' hết ' + (donGia * soCu / 1000) + ' nghìn đồng. Mua ' +
             soMoi + ' ' + vat[0] + ' thì hết bao nhiêu nghìn đồng?',
      art: vat[1],
      after: 'nghìn đồng', answer: sv(donGia * soMoi / 1000), thapPhan: true, soChuSo: 6,
      mach: 'Giải toán', kq: donGia * soMoi / 1000
    };
  }

  function tongTi() {
    var ti = r(2, 5);                   // số lớn gấp ti lần số bé
    var be = r(2, 30);
    var lon = be * ti;
    var hoiLon = Math.random() < 0.5;
    var t = chon(TEN), t2 = chon(TEN.filter(function (x) { return x !== t; }));

    return {
      prompt: t + ' và ' + t2 + ' có tất cả <b>' + (be + lon) + ' quyển sách</b>. Số sách của ' + t2 +
              ' gấp <b>' + ti + ' lần</b> số sách của ' + t + '. Hỏi ' + (hoiLon ? t2 : t) +
              ' có bao nhiêu quyển sách?',
      speak: t + ' và ' + t2 + ' có tất cả ' + (be + lon) + ' quyển sách, số sách của ' + t2 +
             ' gấp ' + ti + ' lần của ' + t,
      after: 'quyển', answer: sv(hoiLon ? lon : be), thapPhan: true, soChuSo: 5,
      mach: 'Giải toán', kq: hoiLon ? lon : be
    };
  }

  function phanTramThucTe() {
    var gia = r(2, 40) * 50000;
    var p = chon([10, 20, 25, 50]);
    var giam = Math.random() < 0.5;

    return {
      prompt: 'Một món hàng giá <b>' + gia.toLocaleString('vi-VN') + ' đồng</b>' +
              (giam ? ', được giảm giá <b>' + p + '%</b>. Hỏi giá sau khi giảm là bao nhiêu nghìn đồng?'
                    : ', nay tăng giá <b>' + p + '%</b>. Hỏi giá sau khi tăng là bao nhiêu nghìn đồng?'),
      speak: 'Món hàng giá ' + (gia / 1000) + ' nghìn đồng, ' + (giam ? 'giảm ' : 'tăng ') + p + ' phần trăm',
      after: 'nghìn đồng',
      answer: sv(gia * (giam ? 100 - p : 100 + p) / 100 / 1000), thapPhan: true, soChuSo: 7,
      mach: 'Giải toán', kq: gia * (giam ? 100 - p : 100 + p) / 100 / 1000
    };
  }


  /* ================= PHÂN SỐ — NÂNG CAO ================= */

  function bcnn(a, b) { return a * b / ucln(a, b); }

  function quyDongMauSo() {
    var m1 = r(2, 9), m2 = r(2, 9);
    while (m2 === m1) m2 = r(2, 9);
    var t1 = r(1, m1 - 1), t2 = r(1, m2 - 1);
    var msc = bcnn(m1, m2);
    var dung = ps(t1 * (msc / m1), msc) + ' và ' + ps(t2 * (msc / m2), msc);

    var sai = [
      ps(t1, m1 * m2) + ' và ' + ps(t2, m1 * m2),
      ps(t1 * m2, msc) + ' và ' + ps(t2 * m1, msc),
      ps(t1 + 1, msc) + ' và ' + ps(t2 + 1, msc),
      ps(t1 * (msc / m1), m1) + ' và ' + ps(t2 * (msc / m2), m2)
    ];

    return {
      prompt: 'Quy đồng mẫu số hai phân số ' + ps(t1, m1) + ' và ' + ps(t2, m2),
      speak: 'Quy đồng mẫu số ' + t1 + ' phần ' + m1 + ' và ' + t2 + ' phần ' + m2,
      answer: dung, choices: tron(dung, sai, 4), cols: 2,
      mach: 'Phân số', kq: msc
    };
  }

  function hs(nguyen, tu, mau) {
    return '<span class="hs">' + nguyen + ps(tu, mau) + '</span>';
  }

  function honSo() {
    var mau = r(2, 9), nguyen = r(1, 5), tu = r(1, mau - 1);
    var tuGop = nguyen * mau + tu;

    if (Math.random() < 0.5) {
      var sai1 = [ps(nguyen + tu, mau), ps(tuGop + mau, mau), ps(tuGop - 1, mau), ps(nguyen * tu, mau)];
      return {
        prompt: 'Viết hỗn số ' + hs(nguyen, tu, mau) + ' dưới dạng phân số',
        speak: 'Viết hỗn số ' + nguyen + ' và ' + tu + ' phần ' + mau + ' dưới dạng phân số',
        answer: ps(tuGop, mau), choices: tron(ps(tuGop, mau), sai1, 4), cols: 4,
        mach: 'Phân số', kq: tuGop / mau
      };
    }
    var sai2 = [hs(nguyen + 1, tu, mau), hs(nguyen, tu + 1, mau), hs(tu, nguyen, mau), hs(nguyen - 1, tu, mau)];
    return {
      prompt: 'Viết phân số ' + ps(tuGop, mau) + ' dưới dạng hỗn số',
      speak: 'Viết phân số ' + tuGop + ' phần ' + mau + ' dưới dạng hỗn số',
      answer: hs(nguyen, tu, mau), choices: tron(hs(nguyen, tu, mau), sai2, 4), cols: 4,
      mach: 'Phân số', kq: tuGop / mau
    };
  }

  function phanSoCuaMotSo() {
    var mau = chon([2, 3, 4, 5, 6, 8, 10]);
    var tu = r(1, mau - 1);
    var so = mau * r(2, 15);
    return {
      prompt: 'Tìm ' + ps(tu, mau) + ' của <b>' + so + '</b>',
      speak: 'Tìm ' + tu + ' phần ' + mau + ' của ' + so,
      answer: sv(so * tu / mau), thapPhan: true, soChuSo: 5,
      mach: 'Phân số', kq: so * tu / mau
    };
  }

  function tinhHonHopPhanSo() {
    var m1 = r(2, 6), t1 = r(1, m1 - 1);
    var m2 = r(2, 5), t2 = r(1, m2 - 1);
    var m3 = r(2, 5), t3 = r(1, m3 - 1);

    // quy ước: nhân chia trước, cộng trừ sau
    var tuN = t2 * t3, mauN = m2 * m3;
    var tu = t1 * mauN + tuN * m1, mau = m1 * mauN;
    var g = ucln(tu, mau);
    var a = tu / g, b = mau / g;

    var sai = [
      ps((t1 + t2) * t3, (m1 + m2) * m3),
      ps(a + 1, b), ps(a, b + 1), ps(b, a), ps(a * 2, b)
    ];

    return {
      prompt: 'Tính (nhân chia trước, cộng trừ sau):<br>' +
              ps(t1, m1) + ' + ' + ps(t2, m2) + ' × ' + ps(t3, m3),
      speak: 'Tính ' + t1 + ' phần ' + m1 + ' cộng ' + t2 + ' phần ' + m2 + ' nhân ' + t3 + ' phần ' + m3,
      answer: ps(a, b), choices: tron(ps(a, b), sai, 4), cols: 4,
      mach: 'Phân số', kq: a / b
    };
  }

  function sapXepPhanSo() {
    var ds = [], gt = [];
    while (ds.length < 3) {
      var m = r(2, 12), t = r(1, m - 1);
      var v = t / m;
      if (gt.some(function (x) { return Math.abs(x - v) < 1e-9; })) continue;
      ds.push(ps(t, m)); gt.push(v);
    }
    var lon = Math.random() < 0.5;
    var dich = lon ? Math.max.apply(null, gt) : Math.min.apply(null, gt);

    return {
      prompt: 'Phân số nào <b>' + (lon ? 'lớn nhất' : 'bé nhất') + '</b>?',
      speak: 'Phân số nào ' + (lon ? 'lớn nhất' : 'bé nhất'),
      answer: ds[gt.indexOf(dich)], choices: Q.shuffle(ds.slice()), cols: 3,
      mach: 'Phân số', kq: dich
    };
  }

  /* ================= SỐ THẬP PHÂN — NÂNG CAO ================= */

  function nhanHaiThapPhan() {
    var a = r(11, 99) / 10, b = r(11, 99) / 10;
    return {
      text: sv(a) + ' × ' + sv(b) + ' =', answer: sv(Math.round(a * b * 100) / 100),
      thapPhan: true, small: true, mach: 'Số thập phân', kq: a * b
    };
  }

  function chiaThapPhanChoThapPhan() {
    var thuong = r(2, 20), chia = r(11, 95) / 10;
    var biChia = Math.round(thuong * chia * 10) / 10;
    return {
      text: sv(biChia) + ' : ' + sv(chia) + ' =', answer: sv(thuong),
      thapPhan: true, small: true, mach: 'Số thập phân', kq: thuong
    };
  }

  function lamTron() {
    var so = r(1000, 99999) / 1000;
    var denHang = Math.random() < 0.5
      ? { ten: 'hàng phần mười', k: 10 } : { ten: 'hàng phần trăm', k: 100 };
    return {
      prompt: 'Làm tròn số <b>' + sv(so) + '</b> đến <b>' + denHang.ten + '</b>',
      speak: 'Làm tròn số ' + sv(so) + ' đến ' + denHang.ten,
      answer: sv(Math.round(so * denHang.k) / denHang.k), thapPhan: true,
      mach: 'Số thập phân', kq: Math.round(so * denHang.k) / denHang.k
    };
  }

  function giaTriChuSo() {
    var nguyen = r(1, 99), le = r(10, 99);
    var so = nguyen + le / 100;
    var viTri = Math.random() < 0.5 ? 1 : 2;       // phần mười hay phần trăm
    var chuSo = viTri === 1 ? Math.floor(le / 10) : le % 10;
    if (chuSo === 0) chuSo = 5;                     // tránh chữ số 0 cho rõ ràng
    so = nguyen + (viTri === 1 ? chuSo * 10 + (le % 10) : Math.floor(le / 10) * 10 + chuSo) / 100;
    var giaTri = viTri === 1 ? chuSo / 10 : chuSo / 100;

    return {
      prompt: 'Trong số <b>' + sv(so) + '</b>, chữ số <b>' + chuSo + '</b> ở ' +
              (viTri === 1 ? 'hàng phần mười' : 'hàng phần trăm') + ' có giá trị là bao nhiêu?',
      speak: 'Trong số ' + sv(so) + ', chữ số ' + chuSo + ' có giá trị bao nhiêu?',
      answer: sv(giaTri), thapPhan: true,
      mach: 'Số thập phân', kq: giaTri
    };
  }

  function timX() {
    var x = r(10, 199) / 10;
    var a = r(11, 99) / 10;
    switch (r(1, 4)) {
      case 1: return { text: 'x + ' + sv(a) + ' =', after: sv(Math.round((x + a) * 10) / 10),
                       answer: sv(x), thapPhan: true, small: true, prompt: 'Tìm <b>x</b>',
                       mach: 'Tìm x', kq: x };
      case 2: return { text: 'x − ' + sv(a) + ' =', after: sv(Math.round((x) * 10) / 10),
                       answer: sv(Math.round((x + a) * 10) / 10), thapPhan: true, small: true,
                       prompt: 'Tìm <b>x</b>', mach: 'Tìm x', kq: x + a };
      case 3: var n = r(2, 9);
              return { text: 'x × ' + n + ' =', after: sv(Math.round(x * n * 10) / 10),
                       answer: sv(x), thapPhan: true, small: true, prompt: 'Tìm <b>x</b>',
                       mach: 'Tìm x', kq: x };
      default: var m = r(2, 9);
              return { text: 'x : ' + m + ' =', after: sv(x),
                       answer: sv(Math.round(x * m * 10) / 10), thapPhan: true, small: true,
                       prompt: 'Tìm <b>x</b>', mach: 'Tìm x', kq: x * m };
    }
  }

  function tinhThuanTien() {
    var a = r(11, 89) / 10;
    var b = Math.round((10 - a % 10 === 10 ? 5 : (Math.ceil(a) - a + r(1, 8))) * 10) / 10 || 1.5;
    var c = r(11, 59) / 10;
    var kq = Math.round((a + b + c) * 10) / 10;
    return {
      prompt: 'Tính bằng cách thuận tiện nhất',
      text: sv(a) + ' + ' + sv(b) + ' + ' + sv(c) + ' =',
      answer: sv(kq), thapPhan: true, small: true,
      mach: 'Số thập phân', kq: kq
    };
  }

  /* ================= HÌNH HỌC — NÂNG CAO ================= */

  function veBinhHanh(a, h) {
    return '<svg viewBox="0 0 220 130" width="235" style="max-width:100%">' +
      '<polygon points="55,25 195,25 165,105 25,105" fill="#ffeaf6" stroke="#ff8fd0" stroke-width="3"/>' +
      '<line x1="95" y1="25" x2="95" y2="105" stroke="#e05454" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<text x="95" y="124" text-anchor="middle" font-family="Nunito" font-size="14" font-weight="800" fill="#2b2f55">a = ' + sv(a) + ' cm</text>' +
      '<text x="103" y="70" font-family="Nunito" font-size="14" font-weight="800" fill="#e05454">h = ' + sv(h) + ' cm</text>' +
      '</svg>';
  }

  function dienTichBinhHanh() {
    var a = r(4, 25), h = r(3, 18);
    return {
      prompt: 'Tính diện tích hình bình hành có độ dài đáy <b>' + a + ' cm</b> và chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính diện tích hình bình hành có đáy ' + a + ' và chiều cao ' + h + ' xăng ti mét',
      art: veBinhHanh(a, h),
      after: 'cm²', answer: sv(a * h), thapPhan: true, soChuSo: 5,
      mach: 'Diện tích', kq: a * h
    };
  }

  function tinhNguocTamGiac() {
    var a = r(3, 20), h = r(2, 15) * 2;
    var S = a * h / 2;
    return {
      prompt: 'Hình tam giác có diện tích <b>' + sv(S) + ' cm²</b> và độ dài đáy <b>' + a +
              ' cm</b>. Tính chiều cao.',
      speak: 'Hình tam giác có diện tích ' + sv(S) + ' xăng ti mét vuông, đáy ' + a + '. Tính chiều cao.',
      art: veTamGiac(a, h, 'h'),
      after: 'cm', answer: sv(h), thapPhan: true, soChuSo: 5,
      mach: 'Tính ngược hình học', kq: h
    };
  }

  function tinhNguocHinhThang() {
    var a = r(3, 15), b = a + r(2, 12), h = r(2, 10) * 2;
    var S = (a + b) * h / 2;
    return {
      prompt: 'Hình thang có diện tích <b>' + sv(S) + ' cm²</b>, chiều cao <b>' + h +
              ' cm</b>, đáy bé <b>' + a + ' cm</b>. Tính đáy lớn.',
      speak: 'Hình thang có diện tích ' + sv(S) + ', chiều cao ' + h + ', đáy bé ' + a + '. Tính đáy lớn.',
      art: veHinhThang(a, b, h, 'b'),
      after: 'cm', answer: sv(b), thapPhan: true, soChuSo: 5,
      mach: 'Tính ngược hình học', kq: b
    };
  }

  function banKinhTuChuVi() {
    var r_ = r(1, 25);
    var C = Math.round(r_ * 2 * 3.14 * 100) / 100;
    return {
      prompt: 'Hình tròn có chu vi <b>' + sv(C) + ' cm</b>. Tính bán kính.' +
              '<br><small>Lấy số pi bằng 3,14</small>',
      speak: 'Hình tròn có chu vi ' + sv(C) + ' xăng ti mét. Tính bán kính.',
      art: veHinhTron('r', r_, true),
      after: 'cm', answer: sv(r_), thapPhan: true, soChuSo: 5,
      mach: 'Tính ngược hình học', kq: r_
    };
  }

  function dienTichToanPhan() {
    if (Math.random() < 0.45) {
      var c = r(2, 12);
      return {
        prompt: 'Tính diện tích toàn phần hình lập phương có cạnh <b>' + c + ' cm</b>',
        speak: 'Tính diện tích toàn phần hình lập phương cạnh ' + c + ' xăng ti mét',
        art: veHop(c, c, c),
        after: 'cm²', answer: sv(6 * c * c), thapPhan: true, soChuSo: 5,
        mach: 'Thể tích', kq: 6 * c * c
      };
    }
    var a = r(3, 15), b = r(3, 15), h = r(2, 10);
    return {
      prompt: 'Tính diện tích toàn phần hình hộp chữ nhật có chiều dài <b>' + a +
              ' cm</b>, chiều rộng <b>' + b + ' cm</b>, chiều cao <b>' + h + ' cm</b>',
      speak: 'Tính diện tích toàn phần hình hộp chữ nhật dài ' + a + ', rộng ' + b + ', cao ' + h,
      art: veHop(a, b, h),
      after: 'cm²', answer: sv((a + b) * 2 * h + 2 * a * b), thapPhan: true, soChuSo: 5,
      mach: 'Thể tích', kq: (a + b) * 2 * h + 2 * a * b
    };
  }

  function dienTichPhanToMau() {
    var a = r(3, 15) * 2;                 // cạnh hình vuông, chẵn để bán kính đẹp
    var S = a * a - (a / 2) * (a / 2) * 3.14;

    var art = '<svg viewBox="0 0 160 160" width="190" style="max-width:100%">' +
      '<rect x="15" y="15" width="130" height="130" fill="#ffd9ea" stroke="#ff8fd0" stroke-width="3"/>' +
      '<circle cx="80" cy="80" r="65" fill="#fff" stroke="#8b7bf7" stroke-width="3"/>' +
      '<text x="80" y="156" text-anchor="middle" font-family="Nunito" font-size="14" ' +
      'font-weight="800" fill="#2b2f55">cạnh ' + a + ' cm</text></svg>';

    return {
      prompt: 'Hình vuông cạnh <b>' + a + ' cm</b> có một hình tròn nội tiếp bên trong. ' +
              'Tính diện tích phần tô màu (phần ngoài hình tròn).' +
              '<br><small>Lấy số pi bằng 3,14</small>',
      speak: 'Hình vuông cạnh ' + a + ' xăng ti mét có hình tròn bên trong. Tính diện tích phần tô màu.',
      art: art,
      after: 'cm²', answer: sv(Math.round(S * 100) / 100), thapPhan: true, soChuSo: 7,
      mach: 'Tính ngược hình học', kq: S
    };
  }

  function beNuoc() {
    var a = chon([1, 1.5, 2, 2.5, 3]);
    var b = chon([1, 1.2, 1.5, 2]);
    var cao = chon([0.5, 0.6, 0.8, 1, 1.2]);
    var mucNuoc = Math.round(cao * chon([0.5, 0.6, 0.75]) * 100) / 100;
    var V = Math.round(a * b * mucNuoc * 1000) / 1000;

    return {
      prompt: '🛁 Một bể nước hình hộp chữ nhật dài <b>' + sv(a) + ' m</b>, rộng <b>' + sv(b) +
              ' m</b>, cao <b>' + sv(cao) + ' m</b>. Trong bể có nước cao <b>' + sv(mucNuoc) +
              ' m</b>. Tính thể tích nước trong bể.',
      speak: 'Bể nước dài ' + sv(a) + ' mét, rộng ' + sv(b) + ' mét, nước cao ' + sv(mucNuoc) +
             ' mét. Tính thể tích nước.',
      after: 'm³', answer: sv(V), thapPhan: true, soChuSo: 7,
      mach: 'Thể tích', kq: V
    };
  }

  global.ToanL5 = {
    sv: sv, ps: ps,
    rutGon: rutGon, congTruPhanSo: congTruPhanSo, nhanChiaPhanSo: nhanChiaPhanSo, soSanhPhanSo: soSanhPhanSo,
    congTruThapPhan: congTruThapPhan, nhanThapPhan: nhanThapPhan, chiaThapPhan: chiaThapPhan,
    soSanhThapPhan: soSanhThapPhan, phanSoSangThapPhan: phanSoSangThapPhan,
    giaTriPhanTram: giaTriPhanTram, timSoBanDau: timSoBanDau, tiSoPhanTram: tiSoPhanTram,
    dienTichTamGiac: dienTichTamGiac, dienTichHinhThang: dienTichHinhThang,
    hinhTron: hinhTron, theTich: theTich, dienTichXungQuanh: dienTichXungQuanh,
    doiDonVi: doiDonVi, thoiGian: thoiGian, chuyenDong: chuyenDong,
    trungBinhCong: trungBinhCong, tiLeThuan: tiLeThuan, tongTi: tongTi, phanTramThucTe: phanTramThucTe,

    quyDongMauSo: quyDongMauSo, honSo: honSo, phanSoCuaMotSo: phanSoCuaMotSo,
    tinhHonHopPhanSo: tinhHonHopPhanSo, sapXepPhanSo: sapXepPhanSo,
    nhanHaiThapPhan: nhanHaiThapPhan, chiaThapPhanChoThapPhan: chiaThapPhanChoThapPhan,
    lamTron: lamTron, giaTriChuSo: giaTriChuSo, timX: timX, tinhThuanTien: tinhThuanTien,
    dienTichBinhHanh: dienTichBinhHanh, tinhNguocTamGiac: tinhNguocTamGiac,
    tinhNguocHinhThang: tinhNguocHinhThang, banKinhTuChuVi: banKinhTuChuVi,
    dienTichToanPhan: dienTichToanPhan, dienTichPhanToMau: dienTichPhanToMau, beNuoc: beNuoc
  };
})(window);
