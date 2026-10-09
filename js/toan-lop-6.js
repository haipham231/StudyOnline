/* ===== Toán lớp 6 — GDPT 2018 =====
   Lũy thừa và thứ tự phép tính, dấu hiệu chia hết, số nguyên tố, ước chung lớn nhất và
   bội chung nhỏ nhất, số nguyên âm, phân số, số thập phân, tỉ số phần trăm, hình học
   trực quan, điểm – đoạn thẳng – góc, thống kê và xác suất.

   Câu nào đáp án có thể âm thì cho chọn đáp án, vì ô nhập số không gõ được
   dấu trừ.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  function ucln(a, b) { return b ? ucln(b, a % b) : Math.abs(a); }
  function bcnn(a, b) { return a / ucln(a, b) * b; }
  function ps(tu, mau) { return '<span class="ps"><i>' + tu + '</i><b>' + mau + '</b></span>'; }
  function sv(x) { return String(x).replace('.', ','); }

  // ba lựa chọn khác nhau, luôn chứa đáp án đúng
  function ba(dung, cacSai) {
    var set = [String(dung)];
    Q.shuffle(cacSai).forEach(function (v) {
      if (set.length < 3 && set.indexOf(String(v)) === -1) set.push(String(v));
    });
    // Đáp án âm viết bằng dấu trừ in (−) nên Number() không đọc được; phải
    // đổi về dấu trừ thường trước, nếu không vòng lặp này không bao giờ thoát.
    var goc = Number(String(dung).replace('−', '-'));
    var them = 1;
    while (set.length < 3) {
      var v = isFinite(goc) ? String(goc + them).replace('-', '−') : String(them);
      if (set.indexOf(v) === -1) set.push(v);
      them++;
      if (them > 50) { set.push('—' + them); }       // chốt chặn, không kẹt vòng lặp
    }
    return Q.shuffle(set);
  }

  /* ---------- Lũy thừa, thứ tự phép tính ---------- */

  function luyThua() {
    var a = r(2, 9), n = r(2, 4);
    if (Math.pow(a, n) > 10000) n = 2;
    return {
      prompt: 'Tính giá trị của lũy thừa:',
      text: a + '<sup>' + n + '</sup> =',
      speak: a + ' mũ ' + n,
      answer: Math.pow(a, n), soChuSo: 5, mach: 'Lũy thừa'
    };
  }

  function nhanLuyThua() {
    var a = r(2, 6), m = r(2, 4), n = r(2, 4);
    return {
      prompt: 'Viết gọn tích sau thành một lũy thừa rồi cho biết <b>số mũ</b>:',
      text: a + '<sup>' + m + '</sup> · ' + a + '<sup>' + n + '</sup>',
      speak: a + ' mũ ' + m + ' nhân ' + a + ' mũ ' + n + '. Số mũ của kết quả là bao nhiêu?',
      answer: m + n, soChuSo: 2, mach: 'Lũy thừa',
      giai: ['Nhân hai lũy thừa cùng cơ số thì <b>giữ cơ số, cộng số mũ</b>.',
        a + '<sup>' + m + '</sup> · ' + a + '<sup>' + n + '</sup> = ' + a + '<sup>' + (m + n) + '</sup>.',
        'Vậy số mũ là ' + m + ' + ' + n + ' = ' + (m + n) + '.']
    };
  }

  function thuTuPhepTinh() {
    var a = r(2, 9), b = r(2, 5), c = r(3, 20), d = r(2, 9);
    return {
      prompt: 'Tính giá trị biểu thức:',
      text: c + ' + ' + a + ' · ' + d + ' − ' + b + '<sup>2</sup>',
      speak: c + ' cộng ' + a + ' nhân ' + d + ' trừ ' + b + ' mũ hai',
      answer: c + a * d - b * b >= 0 ? c + a * d - b * b : 0,
      soChuSo: 4, mach: 'Thứ tự phép tính'
    };
  }

  /* ---------- Chia hết, số nguyên tố, ước chung lớn nhất, bội chung nhỏ nhất ---------- */

  function soNguyenTo() {
    var NT = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    var nt = chon(NT);
    var hs = [];
    while (hs.length < 2) {
      var x = r(10, 99);
      if (NT.indexOf(x) === -1 && x % 2 !== 0 && hs.indexOf(x) === -1 && x !== nt) hs.push(x);
    }
    return {
      prompt: 'Số nào là <b>số nguyên tố</b>?<br>' +
              '<small>Số nguyên tố chỉ chia hết cho 1 và chính nó.</small>',
      speak: 'Số nào là số nguyên tố?',
      answer: String(nt), choices: Q.shuffle([String(nt)].concat(hs.map(String))), cols: 3,
      mach: 'Số nguyên tố',
      giai: [nt + ' chỉ chia hết cho 1 và cho chính nó nên là số nguyên tố.',
        'Hai số kia chia hết cho một số khác nữa nên là hợp số.',
        'Mẹo: thử chia cho 2, 3, 5, 7 — nếu không chia hết cho số nào thì là nguyên tố (với số bé hơn 100).']
    };
  }

  function timUCLN() {
    var k = r(2, 12), a = k * r(2, 9), b = k * r(2, 9);
    while (a === b) b = k * r(2, 9);
    var d = ucln(a, b);
    return {
      prompt: 'Tìm <b>ước chung lớn nhất</b> của ' + a + ' và ' + b + '.',
      speak: 'Tìm ước chung lớn nhất của ' + a + ' và ' + b,
      answer: d, soChuSo: 4, mach: 'Ước chung và bội chung',
      giai: ['Phân tích ra thừa số nguyên tố rồi lấy <b>thừa số chung với số mũ nhỏ nhất</b>.',
        'Hoặc nhẩm: tìm số lớn nhất mà cả ' + a + ' và ' + b + ' đều chia hết.',
        'Ước chung lớn nhất của ' + a + ' và ' + b + ' là ' + d +
          '. Thử lại: ' + a + ' : ' + d + ' = ' + (a / d) +
          ', ' + b + ' : ' + d + ' = ' + (b / d) + '.']
    };
  }

  function timBCNN() {
    var a = r(2, 12), b = r(2, 12);
    while (b === a) b = r(2, 12);
    var m = bcnn(a, b);
    return {
      prompt: 'Tìm <b>bội chung nhỏ nhất</b> của ' + a + ' và ' + b + '.',
      speak: 'Tìm bội chung nhỏ nhất của ' + a + ' và ' + b,
      answer: m, soChuSo: 4, mach: 'Ước chung và bội chung',
      giai: ['Bội chung nhỏ nhất bằng tích hai số chia cho ước chung lớn nhất của chúng.',
        'Ước chung lớn nhất của ' + a + ' và ' + b + ' là ' + ucln(a, b) + '.',
        'Vậy bội chung nhỏ nhất là ' + a + ' × ' + b + ' : ' + ucln(a, b) + ' = ' + m + '.']
    };
  }

  function dauHieuChiaHet6() {
    var d = chon([2, 3, 5, 9]);
    var dung = r(20, 200) * d;
    var sai = [];
    while (sai.length < 2) {
      var x = r(100, 999);
      if (x % d !== 0 && sai.indexOf(String(x)) === -1) sai.push(String(x));
    }
    return {
      prompt: 'Số nào <b>chia hết cho ' + d + '</b>?',
      speak: 'Số nào chia hết cho ' + d + '?',
      answer: String(dung), choices: Q.shuffle([String(dung)].concat(sai)), cols: 3,
      mach: 'Dấu hiệu chia hết'
    };
  }

  /* ---------- Số nguyên ---------- */

  function congSoNguyen() {
    var a = r(-30, 30), b = r(-30, 30);
    if (a === 0) a = -5;
    if (b === 0) b = 7;
    var kq = a + b;
    var vietSo = function (x) { return x < 0 ? '(−' + Math.abs(x) + ')' : String(x); };
    return {
      prompt: 'Tính:', text: vietSo(a) + ' + ' + vietSo(b) + ' =',
      speak: 'Tính ' + a + ' cộng ' + b,
      answer: String(kq).replace('-', '−'),
      choices: ba(String(kq).replace('-', '−'),
        [String(a - b).replace('-', '−'), String(-kq).replace('-', '−'),
         String(Math.abs(a) + Math.abs(b))]),
      cols: 3, mach: 'Số nguyên',
      giai: ['Hai số <b>cùng dấu</b> thì cộng giá trị rồi giữ dấu chung.',
        'Hai số <b>khác dấu</b> thì lấy số lớn trừ số bé (bỏ dấu), rồi mang dấu của số lớn hơn.',
        'Ở đây: ' + a + ' + ' + b + ' = ' + kq + '.']
    };
  }

  function nhanSoNguyen() {
    var a = r(2, 12) * chon([1, -1]), b = r(2, 12) * chon([1, -1]);
    var kq = a * b;
    var vietSo = function (x) { return x < 0 ? '(−' + Math.abs(x) + ')' : String(x); };
    return {
      prompt: 'Tính:', text: vietSo(a) + ' · ' + vietSo(b) + ' =',
      speak: 'Tính ' + a + ' nhân ' + b,
      answer: String(kq).replace('-', '−'),
      choices: ba(String(kq).replace('-', '−'),
        [String(-kq).replace('-', '−'), String(a + b).replace('-', '−'),
         String(Math.abs(kq) + Math.abs(a))]),
      cols: 3, mach: 'Số nguyên',
      giai: ['Nhân hai số <b>cùng dấu</b> được số <b>dương</b>.',
        'Nhân hai số <b>khác dấu</b> được số <b>âm</b>.',
        Math.abs(a) + ' × ' + Math.abs(b) + ' = ' + Math.abs(kq) + ', dấu là ' +
          (kq < 0 ? 'âm' : 'dương') + ' nên kết quả là ' + kq + '.']
    };
  }

  function soSanhSoNguyen() {
    var a = r(-50, 50), b = r(-50, 50);
    while (a === b) b = r(-50, 50);
    var vs = function (x) { return x < 0 ? '−' + Math.abs(x) : String(x); };
    return {
      prompt: 'Điền dấu thích hợp:', text: vs(a) + ' … ' + vs(b),
      speak: 'So sánh ' + a + ' và ' + b,
      answer: a > b ? '>' : '<', choices: ['>', '<', '='], cols: 3, mach: 'Số nguyên',
      giai: ['Trên trục số, số nào nằm <b>bên phải</b> thì lớn hơn.',
        'Mọi số âm đều bé hơn 0, mọi số dương đều lớn hơn 0.',
        'Với hai số âm: số nào có giá trị tuyệt đối <b>lớn hơn</b> thì <b>bé hơn</b>.']
    };
  }

  /* ---------- Phân số ---------- */

  function rutGonPS6() {
    var tu = r(1, 11), mau = r(tu + 1, 15), k = r(2, 9);
    var d = ucln(tu, mau);
    return {
      prompt: 'Rút gọn phân số ' + ps(tu * k, mau * k) + ' về tối giản. <b>Mẫu số</b> bằng bao nhiêu?',
      speak: 'Rút gọn phân số ' + (tu * k) + ' phần ' + (mau * k) + '. Mẫu số bằng bao nhiêu?',
      answer: mau / d, soChuSo: 3, mach: 'Phân số',
      giai: ['Chia cả tử và mẫu cho ước chung lớn nhất của chúng.',
        'Ước chung lớn nhất của ' + (tu * k) + ' và ' + (mau * k) + ' là ' + (k * d) + '.',
        'Phân số tối giản là ' + (tu / d) + '/' + (mau / d) + ', mẫu số bằng ' + (mau / d) + '.']
    };
  }

  function congPSKhacMau() {
    var m1 = r(2, 9), m2 = r(2, 9);
    while (m2 === m1) m2 = r(2, 9);
    var t1 = r(1, m1 - 1), t2 = r(1, m2 - 1);
    var mc = bcnn(m1, m2);
    var tu = t1 * (mc / m1) + t2 * (mc / m2);
    return {
      prompt: 'Tính ' + ps(t1, m1) + ' + ' + ps(t2, m2) + '. Cho biết <b>tử số</b> khi đã quy đồng về mẫu ' +
              mc + '.',
      speak: t1 + ' phần ' + m1 + ' cộng ' + t2 + ' phần ' + m2,
      answer: tu, soChuSo: 4, mach: 'Phân số',
      giai: ['Mẫu chung nhỏ nhất là bội chung nhỏ nhất của ' + m1 + ' và ' + m2 + ', bằng ' + mc + '.',
        'Quy đồng: ' + t1 + '/' + m1 + ' = ' + (t1 * (mc / m1)) + '/' + mc +
          ' và ' + t2 + '/' + m2 + ' = ' + (t2 * (mc / m2)) + '/' + mc + '.',
        'Cộng tử số: ' + (t1 * (mc / m1)) + ' + ' + (t2 * (mc / m2)) + ' = ' + tu + '.']
    };
  }

  function nhanChiaPS6() {
    var a = r(1, 9), b = r(2, 9), c = r(1, 9), d = r(2, 9);
    var tu = a * c, mau = b * d, g = ucln(tu, mau);
    return {
      prompt: 'Tính ' + ps(a, b) + ' · ' + ps(c, d) + ' rồi rút gọn. <b>Tử số</b> bằng bao nhiêu?',
      speak: a + ' phần ' + b + ' nhân ' + c + ' phần ' + d,
      answer: tu / g, soChuSo: 3, mach: 'Phân số',
      giai: ['Nhân phân số: <b>tử nhân tử, mẫu nhân mẫu</b>.',
        a + ' × ' + c + ' = ' + tu + ' và ' + b + ' × ' + d + ' = ' + mau + '.',
        'Rút gọn ' + tu + '/' + mau + ' cho ước chung lớn nhất ' + g + ' được ' +
          (tu / g) + '/' + (mau / g) + '.']
    };
  }

  /* ---------- Số thập phân, phần trăm ---------- */

  function thapPhan6() {
    var a = r(10, 400) / 10, b = r(10, 300) / 10;
    var cong = Math.random() < 0.5;
    var kq = cong ? a + b : Math.max(a, b) - Math.min(a, b);
    return {
      prompt: 'Tính:',
      text: (cong ? sv(a) + ' + ' + sv(b) : sv(Math.max(a, b)) + ' − ' + sv(Math.min(a, b))) + ' =',
      speak: 'Tính ' + sv(a) + (cong ? ' cộng ' : ' trừ ') + sv(b),
      answer: sv(Math.round(kq * 10) / 10), thapPhan: true, soChuSo: 7, mach: 'Số thập phân'
    };
  }

  function phanTram6() {
    var pt = chon([5, 10, 20, 25, 50]);
    var boi = 100 / ucln(pt, 100);
    var so = r(2, 20) * boi;
    return {
      prompt: 'Tính <b>' + pt + '%</b> của <b>' + so + '</b>.',
      speak: 'Tính ' + pt + ' phần trăm của ' + so,
      answer: so * pt / 100, soChuSo: 5, mach: 'Tỉ số phần trăm',
      giai: [pt + '% nghĩa là ' + pt + '/100.',
        so + ' × ' + pt + ' : 100 = ' + (so * pt / 100) + '.',
        'Mẹo nhẩm: 10% là chia 10, 25% là chia 4, 50% là chia 2.']
    };
  }

  function timSoBietPhanTram() {
    var pt = chon([10, 20, 25, 50]);
    var so = r(2, 20) * (100 / ucln(pt, 100));
    var phan = so * pt / 100;
    return {
      prompt: 'Biết <b>' + pt + '%</b> của một số là <b>' + phan + '</b>. Tìm số đó.',
      speak: pt + ' phần trăm của một số là ' + phan + '. Tìm số đó.',
      answer: so, soChuSo: 5, mach: 'Tỉ số phần trăm',
      giai: ['Đây là bài toán <b>ngược</b>: biết phần, tìm cả số.',
        'Lấy phần đã biết chia cho tỉ số rồi nhân 100: ' + phan + ' : ' + pt + ' × 100 = ' + so + '.',
        'Chỗ hay nhầm: nhân thẳng ' + phan + ' với ' + pt + '%.']
    };
  }

  /* ---------- Hình học trực quan ---------- */

  var HINH = [
    { ten: 'tam giác đều', canh: 3, dd: 'ba cạnh bằng nhau, ba góc bằng 60°' },
    { ten: 'hình vuông', canh: 4, dd: 'bốn cạnh bằng nhau, bốn góc vuông' },
    { ten: 'hình chữ nhật', canh: 4, dd: 'bốn góc vuông, hai cạnh đối bằng nhau' },
    { ten: 'hình thoi', canh: 4, dd: 'bốn cạnh bằng nhau, hai đường chéo vuông góc' },
    { ten: 'hình lục giác đều', canh: 6, dd: 'sáu cạnh bằng nhau, sáu góc bằng nhau' },
    { ten: 'hình thang cân', canh: 4, dd: 'hai cạnh đáy song song, hai cạnh bên bằng nhau' }
  ];

  function nhanBietHinh6() {
    var h = chon(HINH);
    var sai = Q.shuffle(HINH.filter(function (x) { return x.ten !== h.ten; })).slice(0, 2)
      .map(function (x) { return x.ten; });
    return {
      prompt: 'Hình nào có <b>' + h.dd + '</b>?',
      speak: 'Hình nào có ' + h.dd + '?',
      answer: h.ten, choices: Q.shuffle([h.ten].concat(sai)), cols: 1, mach: 'Hình học trực quan'
    };
  }

  function chuViLucGiac() {
    var a = r(3, 20), n = chon([3, 6]);
    var ten = n === 3 ? 'tam giác đều' : 'lục giác đều';
    return {
      prompt: 'Một <b>' + ten + '</b> có cạnh <b>' + a + ' cm</b>. Tính chu vi.',
      speak: ten + ' có cạnh ' + a + ' xăng ti mét. Tính chu vi.',
      answer: a * n, after: 'cm', soChuSo: 4, mach: 'Chu vi diện tích',
      giai: [ten + ' có ' + n + ' cạnh bằng nhau.',
        'Chu vi = cạnh × số cạnh = ' + a + ' × ' + n + ' = ' + (a * n) + ' cm.']
    };
  }

  function dienTichHinhThang() {
    var a = r(5, 20), b = r(3, a - 1), h = r(3, 14);
    if (((a + b) * h) % 2 !== 0) h += 1;
    return {
      prompt: 'Hình thang có hai đáy <b>' + a + ' cm</b> và <b>' + b + ' cm</b>, chiều cao <b>' +
              h + ' cm</b>. Tính diện tích.<br><small>Diện tích = (đáy lớn + đáy bé) × chiều cao : 2</small>',
      speak: 'Hình thang hai đáy ' + a + ' và ' + b + ', cao ' + h + '. Tính diện tích.',
      answer: (a + b) * h / 2, after: 'cm²', soChuSo: 5, mach: 'Chu vi diện tích',
      giai: ['Cộng hai đáy: ' + a + ' + ' + b + ' = ' + (a + b) + '.',
        'Nhân với chiều cao: ' + (a + b) + ' × ' + h + ' = ' + ((a + b) * h) + '.',
        'Chia đôi: ' + ((a + b) * h) + ' : 2 = ' + ((a + b) * h / 2) + ' cm².']
    };
  }

  /* ---------- Điểm, đoạn thẳng, góc ---------- */

  function trungDiem() {
    var ab = r(4, 40) * 2;
    return {
      prompt: 'Điểm <b>M</b> là trung điểm của đoạn thẳng <b>AB</b> dài <b>' + ab +
              ' cm</b>. Hỏi <b>AM</b> dài bao nhiêu xăng-ti-mét?',
      speak: 'M là trung điểm của AB dài ' + ab + ' xăng ti mét. AM dài bao nhiêu?',
      answer: ab / 2, after: 'cm', soChuSo: 3, mach: 'Điểm và đoạn thẳng',
      giai: ['Trung điểm chia đoạn thẳng thành <b>hai phần bằng nhau</b>.',
        'AM = MB = AB : 2 = ' + ab + ' : 2 = ' + (ab / 2) + ' cm.']
    };
  }

  function loaiGoc() {
    var d = r(1, 179);
    var ten = d < 90 ? 'góc nhọn' : d === 90 ? 'góc vuông' : 'góc tù';
    return {
      prompt: 'Góc có số đo <b>' + d + '°</b> là góc gì?',
      speak: 'Góc ' + d + ' độ là góc gì?',
      answer: ten, choices: Q.shuffle(['góc nhọn', 'góc vuông', 'góc tù']), cols: 3,
      mach: 'Góc',
      giai: ['Góc nhọn: nhỏ hơn 90°. Góc vuông: đúng 90°. Góc tù: lớn hơn 90° và nhỏ hơn 180°.',
        d + '° nên là ' + ten + '.']
    };
  }

  function congGoc() {
    var a = r(20, 70), b = r(20, 80);
    return {
      prompt: 'Tia <b>Oy</b> nằm giữa hai tia <b>Ox</b> và <b>Oz</b>. Biết góc <b>xOy = ' + a +
              '°</b> và góc <b>yOz = ' + b + '°</b>. Tính góc <b>xOz</b>.',
      speak: 'Góc xOy bằng ' + a + ' độ, góc yOz bằng ' + b + ' độ. Tính góc xOz.',
      answer: a + b, after: '°', soChuSo: 3, mach: 'Góc',
      giai: ['Tia Oy nằm giữa nên <b>xOy + yOz = xOz</b>.',
        a + '° + ' + b + '° = ' + (a + b) + '°.']
    };
  }

  /* ---------- Thống kê và xác suất ---------- */

  function trungBinhCong6() {
    var n = r(4, 6), tb = r(5, 30);
    var ds = [], con = tb * n;
    for (var i = 0; i < n - 1; i++) {
      var lay = r(1, Math.max(1, con - (n - 1 - i)));
      ds.push(lay); con -= lay;
    }
    ds.push(con);
    return {
      prompt: 'Điểm kiểm tra của một nhóm bạn là: <b>' + ds.join('; ') + '</b>. ' +
              'Tính điểm trung bình.',
      speak: 'Tính trung bình cộng của ' + ds.join(', '),
      answer: tb, soChuSo: 4, mach: 'Thống kê',
      giai: ['Cộng tất cả: ' + ds.join(' + ') + ' = ' + (tb * n) + '.',
        'Chia cho số lượng ' + n + ': ' + (tb * n) + ' : ' + n + ' = ' + tb + '.']
    };
  }

  function xacSuatDonGian() {
    var do_ = r(2, 6), xanh = r(2, 6), vang = r(2, 6);
    var tong = do_ + xanh + vang;
    var mau = chon([['đỏ', do_], ['xanh', xanh], ['vàng', vang]]);
    return {
      prompt: 'Một hộp có <b>' + do_ + '</b> viên bi đỏ, <b>' + xanh + '</b> viên bi xanh và <b>' +
              vang + '</b> viên bi vàng. Lấy ngẫu nhiên một viên. Hỏi có bao nhiêu <b>kết quả thuận lợi</b> ' +
              'cho biến cố “lấy được bi ' + mau[0] + '”?',
      speak: 'Hộp có ' + do_ + ' bi đỏ, ' + xanh + ' bi xanh, ' + vang + ' bi vàng. Có bao nhiêu kết quả thuận lợi cho bi ' + mau[0] + '?',
      answer: mau[1], soChuSo: 3, mach: 'Xác suất',
      giai: ['Kết quả thuận lợi là số viên bi ' + mau[0] + ' trong hộp.',
        'Có ' + mau[1] + ' viên bi ' + mau[0] + ' nên có ' + mau[1] + ' kết quả thuận lợi.',
        'Tổng số kết quả có thể là ' + tong + ' (tất cả các viên bi).']
    };
  }

  /* ===== Phần bổ sung: thêm bài cho mỗi mạch kiến thức lớp 6 ===== */

  /* ---------- Tập hợp ---------- */

  function tapHopPhanTu() {
    var a = r(0, 12), b = a + r(3, 9);
    var kieu = chon(['<', '≤']);
    var tu = kieu === '<' ? a + 1 : a + 1;              // x > a nên bắt đầu từ a + 1
    var den = kieu === '<' ? b - 1 : b;
    return {
      prompt: 'Cho tập hợp <b>A = {x ∈ ℕ | ' + a + ' &lt; x ' + kieu + ' ' + b + '}</b>. ' +
              'Hỏi tập hợp A có bao nhiêu <b>phần tử</b>?',
      speak: 'Tập hợp A gồm các số tự nhiên x lớn hơn ' + a + ' và ' +
             (kieu === '<' ? 'bé hơn ' : 'bé hơn hoặc bằng ') + b + '. A có bao nhiêu phần tử?',
      answer: den - tu + 1, soChuSo: 3, mach: 'Tập hợp',
      giai: ['Số tự nhiên x phải lớn hơn ' + a + ' nên số bé nhất là ' + tu + '.',
        'Và x ' + (kieu === '<' ? 'bé hơn ' : 'bé hơn hoặc bằng ') + b + ' nên số lớn nhất là ' + den + '.',
        'Tập hợp A = {' + (function () {
          var ds = [];
          for (var i = tu; i <= den; i++) ds.push(i);
          return ds.join('; ');
        })() + '}.',
        'Đếm từ ' + tu + ' đến ' + den + ' có ' + den + ' − ' + tu + ' + 1 = ' +
          (den - tu + 1) + ' phần tử.']
    };
  }

  function phanTuThuocTapHop() {
    var ds = [];
    while (ds.length < 4) {
      var v = r(2, 40);
      if (ds.indexOf(v) === -1) ds.push(v);
    }
    var trong = chon(ds);
    var ngoai = r(41, 70);
    var dung = trong + ' ∈ B';
    return {
      prompt: 'Cho tập hợp <b>B = {' + ds.join('; ') + '}</b>. Câu nào <b>đúng</b>?',
      speak: 'Tập hợp B gồm ' + ds.join(', ') + '. Câu nào đúng?',
      answer: dung,
      choices: Q.shuffle([dung, trong + ' ∉ B', ngoai + ' ∈ B']), cols: 1,
      mach: 'Tập hợp',
      giai: ['Dấu <b>∈</b> đọc là “thuộc”, dấu <b>∉</b> đọc là “không thuộc”.',
        'Số ' + trong + ' có trong danh sách của B nên ' + trong + ' ∈ B.',
        'Số ' + ngoai + ' không có trong B nên viết ' + ngoai + ' ∈ B là sai.']
    };
  }

  /* ---------- Ước và bội ---------- */

  function demUoc() {
    var so = chon([12, 16, 18, 20, 24, 28, 30, 36, 40, 45, 48, 50, 60]);
    var ds = [];
    for (var i = 1; i <= so; i++) if (so % i === 0) ds.push(i);
    return {
      prompt: 'Số <b>' + so + '</b> có tất cả bao nhiêu <b>ước</b>?',
      speak: 'Số ' + so + ' có bao nhiêu ước?',
      answer: ds.length, soChuSo: 2, mach: 'Ước và bội',
      giai: ['Ước của ' + so + ' là những số mà ' + so + ' chia hết.',
        'Thử lần lượt từ 1: các ước là ' + ds.join('; ') + '.',
        'Đếm lại thấy có ' + ds.length + ' ước.',
        'Mẹo: ước luôn đi theo cặp, ví dụ 1 với ' + so + ', 2 với ' + (so / 2) + '.']
    };
  }

  function boiNhoNhat() {
    var d = chon([3, 4, 6, 7, 8, 9, 11, 12]);
    var moc = chon([10, 100]);
    var kq = Math.ceil(moc / d) * d;
    if (kq === moc) kq += d;                            // phải lớn hơn hẳn cái mốc
    return {
      prompt: 'Số <b>nhỏ nhất lớn hơn ' + moc + '</b> mà chia hết cho <b>' + d + '</b> là số nào?',
      speak: 'Số nhỏ nhất lớn hơn ' + moc + ' mà chia hết cho ' + d + ' là số nào?',
      answer: kq, soChuSo: 4, mach: 'Ước và bội',
      giai: ['Lấy ' + moc + ' chia cho ' + d + ' được ' + Math.floor(moc / d) + ' dư ' +
          (moc % d) + '.',
        'Bội tiếp theo của ' + d + ' là ' + d + ' × ' + (kq / d) + ' = ' + kq + '.',
        'Kiểm lại: ' + kq + ' : ' + d + ' = ' + (kq / d) + ', chia hết và lớn hơn ' + moc + '.']
    };
  }

  function thuaSoNguyenToLonNhat() {
    var a = chon([2, 3, 5]), b = chon([7, 11, 13]), c = chon([2, 3]);
    var so = a * b * c;
    var lon = Math.max(a, b, c);
    return {
      prompt: 'Phân tích <b>' + so + '</b> ra thừa số nguyên tố. ' +
              'Thừa số nguyên tố <b>lớn nhất</b> là số nào?',
      speak: 'Phân tích ' + so + ' ra thừa số nguyên tố. Thừa số nguyên tố lớn nhất là số nào?',
      answer: lon, soChuSo: 2, mach: 'Số nguyên tố',
      giai: ['Chia dần cho các số nguyên tố từ bé lên: 2, 3, 5, 7, 11, 13…',
        so + ' = ' + [a, c, b].sort(function (x, y) { return x - y; }).join(' × ') + '.',
        'Trong các thừa số đó, số lớn nhất là ' + lon + '.']
    };
  }

  /* ---------- Thứ tự phép tính, tìm x ---------- */

  function bieuThucCoNgoac() {
    var a = r(2, 9), b = r(2, 6), c = r(2, 9), d = r(2, 5);
    var kq = a * (b + c) - d * d;
    while (kq < 0) { a += 2; kq = a * (b + c) - d * d; }
    return {
      prompt: 'Tính giá trị biểu thức:',
      text: a + ' · (' + b + ' + ' + c + ') − ' + d + '<sup>2</sup>',
      speak: a + ' nhân, mở ngoặc, ' + b + ' cộng ' + c + ', đóng ngoặc, trừ ' + d + ' mũ hai',
      answer: kq, soChuSo: 4, mach: 'Thứ tự phép tính',
      giai: ['Có ngoặc thì làm <b>trong ngoặc trước</b>: ' + b + ' + ' + c + ' = ' + (b + c) + '.',
        'Rồi tính <b>lũy thừa</b>: ' + d + '² = ' + (d * d) + '.',
        'Tiếp theo là <b>nhân</b>: ' + a + ' × ' + (b + c) + ' = ' + (a * (b + c)) + '.',
        'Cuối cùng <b>trừ</b>: ' + (a * (b + c)) + ' − ' + (d * d) + ' = ' + kq + '.']
    };
  }

  function timXLop6() {
    var kieu = chon(['nhan', 'chia', 'congNhan', 'luyThua']);
    var a, b, x, de, cac;
    if (kieu === 'nhan') {
      a = r(3, 12); x = r(3, 20);
      de = a + ' · x = ' + (a * x);
      cac = ['x là <b>thừa số chưa biết</b>.',
        'Muốn tìm thừa số chưa biết, lấy <b>tích chia cho thừa số kia</b>.',
        'x = ' + (a * x) + ' : ' + a + ' = ' + x + '.'];
    } else if (kieu === 'chia') {
      a = r(3, 12); x = a * r(3, 20);
      de = 'x : ' + a + ' = ' + (x / a);
      cac = ['x là <b>số bị chia</b>.',
        'Muốn tìm số bị chia, lấy <b>thương nhân với số chia</b>.',
        'x = ' + (x / a) + ' × ' + a + ' = ' + x + '.'];
    } else if (kieu === 'congNhan') {
      a = r(2, 9); b = r(3, 30); x = r(2, 20);
      de = a + ' · x + ' + b + ' = ' + (a * x + b);
      cac = ['Chuyển về dạng quen thuộc: ' + a + ' · x = ' + (a * x + b) + ' − ' + b +
          ' = ' + (a * x) + '.',
        'Rồi x = ' + (a * x) + ' : ' + a + ' = ' + x + '.',
        'Chỗ hay nhầm: chia cho ' + a + ' ngay khi chưa trừ ' + b + '.'];
    } else {
      a = chon([2, 3, 5, 10]); x = r(2, 4);
      de = a + '<sup>x</sup> = ' + Math.pow(a, x);
      cac = ['Hỏi ' + a + ' nhân với chính nó mấy lần thì được ' + Math.pow(a, x) + '.',
        a + '<sup>' + x + '</sup> = ' + Math.pow(a, x) + '.',
        'Vậy x = ' + x + '.'];
    }
    return {
      prompt: 'Tìm <b>x</b>, biết:', text: de, small: true,
      speak: 'Tìm x biết ' + Q.locLoiDoc(de),
      answer: x, soChuSo: 4, mach: 'Tìm x',
      giai: cac
    };
  }

  /* ---------- Số nguyên: thêm phép trừ, phép chia, giá trị tuyệt đối ---------- */

  function truSoNguyen() {
    var a = r(-30, 30), b = r(-30, 30);
    var kq = a - b;
    var vs = function (x) { return x < 0 ? '(−' + Math.abs(x) + ')' : String(x); };
    var am = function (x) { return String(x).replace('-', '−'); };
    return {
      prompt: 'Tính:', text: vs(a) + ' − ' + vs(b) + ' =',
      speak: 'Tính ' + a + ' trừ ' + b,
      answer: am(kq),
      choices: ba(am(kq), [am(a + b), am(b - a), am(kq + chon([-2, 2]))]), cols: 3,
      mach: 'Số nguyên',
      giai: ['Trừ một số nghĩa là <b>cộng với số đối</b> của nó.',
        'Số đối của ' + b + ' là ' + (-b) + ', nên ' + a + ' − ' + b + ' = ' + a + ' + ' + (-b) + '.',
        'Kết quả bằng ' + kq + '.']
    };
  }

  function chiaSoNguyen() {
    var b = r(2, 9) * chon([1, -1]), thuong = r(2, 12) * chon([1, -1]);
    var a = b * thuong;
    var vs = function (x) { return x < 0 ? '(−' + Math.abs(x) + ')' : String(x); };
    var am = function (x) { return String(x).replace('-', '−'); };
    return {
      prompt: 'Tính:', text: vs(a) + ' : ' + vs(b) + ' =',
      speak: 'Tính ' + a + ' chia ' + b,
      answer: am(thuong),
      choices: ba(am(thuong), [am(-thuong), am(a - b), am(thuong + chon([-1, 1]))]), cols: 3,
      mach: 'Số nguyên',
      giai: ['Chia hai số <b>cùng dấu</b> được số <b>dương</b>, <b>khác dấu</b> được số <b>âm</b>.',
        Math.abs(a) + ' : ' + Math.abs(b) + ' = ' + Math.abs(thuong) + '.',
        'Hai số ' + (a * b > 0 ? 'cùng' : 'khác') + ' dấu nên kết quả là ' + thuong + '.']
    };
  }

  function giaTriTuyetDoi() {
    var a = r(1, 99) * chon([1, -1]);
    return {
      prompt: 'Tính giá trị tuyệt đối:',
      text: '|' + String(a).replace('-', '−') + '| =',
      speak: 'Giá trị tuyệt đối của ' + a,
      answer: Math.abs(a), soChuSo: 3, mach: 'Số nguyên',
      giai: ['Giá trị tuyệt đối là <b>khoảng cách từ số đó tới 0</b> trên trục số.',
        'Khoảng cách thì không bao giờ âm, nên kết quả luôn là số <b>không âm</b>.',
        '|' + a + '| = ' + Math.abs(a) + '.']
    };
  }

  function boDauNgoac() {
    var a = r(20, 80), b = r(5, 40), c = r(1, 20);
    while (b - c < 0 || a - (b - c) < 0) { a += 20; b += 5; }
    return {
      prompt: 'Bỏ dấu ngoặc rồi tính:',
      text: a + ' − (' + b + ' − ' + c + ') =',
      speak: a + ' trừ, mở ngoặc, ' + b + ' trừ ' + c + ', đóng ngoặc',
      answer: a - (b - c), soChuSo: 4, mach: 'Số nguyên',
      giai: ['Trước ngoặc là dấu <b>trừ</b> thì khi bỏ ngoặc phải <b>đổi dấu</b> mọi số bên trong.',
        a + ' − (' + b + ' − ' + c + ') = ' + a + ' − ' + b + ' + ' + c + '.',
        'Tính ra: ' + a + ' − ' + b + ' + ' + c + ' = ' + (a - (b - c)) + '.',
        'Chỗ hay nhầm: quên đổi dấu số ' + c + ' thành cộng.']
    };
  }

  /* ---------- Phân số: thêm so sánh, hỗn số, tìm phân số của một số ---------- */

  function soSanhPhanSo() {
    var m1 = r(2, 9), m2 = r(2, 9);
    while (m2 === m1) m2 = r(2, 9);
    var t1 = r(1, m1 - 1), t2 = r(1, m2 - 1);
    var mc = bcnn(m1, m2), x = t1 * (mc / m1), y = t2 * (mc / m2);
    return {
      prompt: 'Điền dấu thích hợp:',
      text: ps(t1, m1) + ' … ' + ps(t2, m2), small: true,
      speak: 'So sánh ' + t1 + ' phần ' + m1 + ' với ' + t2 + ' phần ' + m2,
      answer: x > y ? '>' : x < y ? '<' : '=',
      choices: ['>', '<', '='], cols: 3, mach: 'Phân số',
      giai: ['Hai phân số khác mẫu thì phải <b>quy đồng</b> rồi mới so sánh tử số.',
        'Mẫu chung là ' + mc + ': ' + t1 + '/' + m1 + ' = ' + x + '/' + mc +
          ' và ' + t2 + '/' + m2 + ' = ' + y + '/' + mc + '.',
        'So tử số: ' + x + ' ' + (x > y ? 'lớn hơn' : x < y ? 'bé hơn' : 'bằng') + ' ' + y + '.']
    };
  }

  function truPSKhacMau() {
    var m1 = r(2, 9), m2 = r(2, 9);
    while (m2 === m1) m2 = r(2, 9);
    var t1 = r(1, m1 - 1), t2 = r(1, m2 - 1);
    var mc = bcnn(m1, m2);
    var x = t1 * (mc / m1), y = t2 * (mc / m2);
    if (x < y) { var g = x; x = y; y = g; g = t1; t1 = t2; t2 = g; g = m1; m1 = m2; m2 = g; }
    return {
      prompt: 'Tính ' + ps(t1, m1) + ' − ' + ps(t2, m2) + '. Cho biết <b>tử số</b> khi đã quy đồng về mẫu ' +
              mc + '.',
      speak: t1 + ' phần ' + m1 + ' trừ ' + t2 + ' phần ' + m2,
      answer: x - y, soChuSo: 4, mach: 'Phân số',
      giai: ['Mẫu chung nhỏ nhất của ' + m1 + ' và ' + m2 + ' là ' + mc + '.',
        'Quy đồng: ' + t1 + '/' + m1 + ' = ' + x + '/' + mc + ' và ' + t2 + '/' + m2 +
          ' = ' + y + '/' + mc + '.',
        'Trừ tử số, <b>giữ nguyên mẫu</b>: ' + x + ' − ' + y + ' = ' + (x - y) + '.']
    };
  }

  function honSoThanhPhanSo() {
    var n = r(1, 6), mau = r(2, 9), tu = r(1, mau - 1);
    return {
      prompt: 'Viết hỗn số <b>' + n + '</b> ' + ps(tu, mau) + ' thành phân số. <b>Tử số</b> bằng bao nhiêu?',
      speak: 'Viết hỗn số ' + n + ' và ' + tu + ' phần ' + mau + ' thành phân số. Tử số bằng bao nhiêu?',
      answer: n * mau + tu, soChuSo: 3, mach: 'Phân số',
      giai: ['Quy tắc: <b>phần nguyên nhân mẫu, cộng tử</b>, giữ nguyên mẫu.',
        n + ' × ' + mau + ' = ' + (n * mau) + ', cộng thêm ' + tu + ' được ' + (n * mau + tu) + '.',
        'Vậy hỗn số đó bằng ' + (n * mau + tu) + '/' + mau + '.']
    };
  }

  function phanSoCuaMotSo() {
    var mau = chon([2, 3, 4, 5, 6, 8]), tu = r(1, mau - 1);
    var so = mau * r(3, 15);
    return {
      prompt: 'Tìm ' + ps(tu, mau) + ' của <b>' + so + '</b>.',
      speak: 'Tìm ' + tu + ' phần ' + mau + ' của ' + so,
      answer: so / mau * tu, soChuSo: 4, mach: 'Phân số',
      giai: ['Tìm phân số của một số thì lấy <b>số đó nhân với phân số</b>.',
        so + ' : ' + mau + ' = ' + (so / mau) + ' (đó là một phần ' + mau + ').',
        'Rồi ' + (so / mau) + ' × ' + tu + ' = ' + (so / mau * tu) + '.']
    };
  }

  function timSoBietPhanSo() {
    var mau = chon([2, 3, 4, 5, 6]), tu = r(1, mau - 1);
    var so = mau * r(3, 15);
    var phan = so / mau * tu;
    return {
      prompt: 'Biết ' + ps(tu, mau) + ' của một số là <b>' + phan + '</b>. Tìm số đó.',
      speak: tu + ' phần ' + mau + ' của một số là ' + phan + '. Tìm số đó.',
      answer: so, soChuSo: 4, mach: 'Phân số',
      giai: ['Đây là bài toán <b>ngược</b>: biết phần, đi tìm cả số.',
        'Một phần ' + mau + ' bằng ' + phan + ' : ' + tu + ' = ' + (phan / tu) + '.',
        'Cả số bằng ' + (phan / tu) + ' × ' + mau + ' = ' + so + '.',
        'Cách khác: lấy ' + phan + ' chia cho phân số ' + tu + '/' + mau + '.']
    };
  }

  /* ---------- Số thập phân: thêm nhân chia và làm tròn ---------- */

  function nhanThapPhan() {
    var a = r(11, 99) / 10, b = chon([2, 3, 4, 5, 6, 8]);
    var kq = Math.round(a * b * 10) / 10;
    return {
      prompt: 'Tính:', text: sv(a) + ' · ' + b + ' =',
      speak: 'Tính ' + sv(a) + ' nhân ' + b,
      answer: sv(kq), thapPhan: true, soChuSo: 7, mach: 'Số thập phân',
      giai: ['Nhân như số tự nhiên trước: ' + (a * 10) + ' × ' + b + ' = ' + (a * 10 * b) + '.',
        'Thừa số ' + sv(a) + ' có <b>một chữ số</b> sau dấu phẩy, nên kết quả cũng có một chữ số sau dấu phẩy.',
        'Vậy ' + sv(a) + ' × ' + b + ' = ' + sv(kq) + '.']
    };
  }

  function chiaThapPhan() {
    var b = chon([2, 4, 5, 8]), kq = r(11, 99) / 10;
    var a = Math.round(kq * b * 10) / 10;
    return {
      prompt: 'Tính:', text: sv(a) + ' : ' + b + ' =',
      speak: 'Tính ' + sv(a) + ' chia ' + b,
      answer: sv(kq), thapPhan: true, soChuSo: 7, mach: 'Số thập phân',
      giai: ['Chia như số tự nhiên, tới lúc hết phần nguyên thì <b>đặt dấu phẩy</b> rồi chia tiếp.',
        sv(a) + ' : ' + b + ' = ' + sv(kq) + '.',
        'Thử lại bằng phép nhân: ' + sv(kq) + ' × ' + b + ' = ' + sv(a) + '.']
    };
  }

  function lamTronThapPhan() {
    var a = r(1000, 9999) / 100;                 // hai chữ số sau dấu phẩy
    var kq = Math.round(a);
    var le = Math.round((a - Math.floor(a)) * 100);
    return {
      prompt: 'Làm tròn số <b>' + sv(a) + '</b> đến <b>hàng đơn vị</b>.',
      speak: 'Làm tròn ' + sv(a) + ' đến hàng đơn vị',
      answer: kq, soChuSo: 4, mach: 'Số thập phân',
      giai: ['Nhìn chữ số đầu tiên <b>sau dấu phẩy</b>: ở đây là ' + Math.floor(le / 10) + '.',
        'Nhỏ hơn 5 thì bỏ đi, từ 5 trở lên thì thêm 1 vào hàng đơn vị.',
        Math.floor(le / 10) + (Math.floor(le / 10) >= 5 ? ' ≥ 5 nên tăng ' : ' &lt; 5 nên giữ nguyên ') +
          Math.floor(a) + ', được ' + kq + '.']
    };
  }

  function tiSoPhanTram6() {
    var mau = chon([20, 25, 40, 50, 80, 200]), pt = chon([5, 10, 15, 20, 25, 40, 50, 60, 75]);
    var tu = mau * pt / 100;
    if (tu % 1 !== 0) { tu = mau / 4; pt = 25; }
    return {
      prompt: 'Tính tỉ số phần trăm của <b>' + tu + '</b> và <b>' + mau + '</b>.',
      speak: 'Tỉ số phần trăm của ' + tu + ' và ' + mau,
      answer: pt, after: '%', soChuSo: 3, mach: 'Tỉ số phần trăm',
      giai: ['Tỉ số phần trăm của a và b là <b>a chia b rồi nhân 100</b>.',
        tu + ' : ' + mau + ' = ' + (tu / mau) + '.',
        (tu / mau) + ' × 100 = ' + pt + ', nên tỉ số phần trăm là ' + pt + '%.']
    };
  }

  /* ---------- Hình học: thêm hình bình hành, hình thoi, đối xứng ---------- */

  function dienTichHinhBinhHanh() {
    var a = r(4, 25), h = r(3, 16);
    return {
      prompt: 'Hình bình hành có đáy <b>' + a + ' cm</b>, chiều cao <b>' + h +
              ' cm</b>. Tính diện tích.<br><small>Diện tích = đáy × chiều cao</small>',
      speak: 'Hình bình hành đáy ' + a + ' xăng ti mét, cao ' + h + ' xăng ti mét. Tính diện tích.',
      answer: a * h, after: 'cm²', soChuSo: 4, mach: 'Chu vi diện tích',
      giai: ['Diện tích hình bình hành = <b>đáy × chiều cao</b>.',
        a + ' × ' + h + ' = ' + (a * h) + ' cm².',
        'Chú ý: chiều cao là đoạn <b>vuông góc</b> với đáy, không phải cạnh bên.']
    };
  }

  function dienTichHinhThoi() {
    var m = r(3, 20) * 2, n = r(3, 20);
    return {
      prompt: 'Hình thoi có hai đường chéo dài <b>' + m + ' cm</b> và <b>' + n +
              ' cm</b>. Tính diện tích.<br><small>Diện tích = tích hai đường chéo chia 2</small>',
      speak: 'Hình thoi hai đường chéo ' + m + ' và ' + n + ' xăng ti mét. Tính diện tích.',
      answer: m * n / 2, after: 'cm²', soChuSo: 5, mach: 'Chu vi diện tích',
      giai: ['Diện tích hình thoi = <b>(đường chéo thứ nhất × đường chéo thứ hai) : 2</b>.',
        m + ' × ' + n + ' = ' + (m * n) + '.',
        (m * n) + ' : 2 = ' + (m * n / 2) + ' cm².']
    };
  }

  var DOI_XUNG = [
    { ten: 'hình vuông', truc: 4, tam: 'có' },
    { ten: 'hình chữ nhật', truc: 2, tam: 'có' },
    { ten: 'hình thoi', truc: 2, tam: 'có' },
    { ten: 'tam giác đều', truc: 3, tam: 'không' },
    { ten: 'hình lục giác đều', truc: 6, tam: 'có' },
    { ten: 'hình thang cân', truc: 1, tam: 'không' },
    { ten: 'hình tròn', truc: 0, tam: 'có' }               // vô số trục, hỏi riêng
  ];

  function demTrucDoiXung() {
    var h = chon(DOI_XUNG.filter(function (x) { return x.truc > 0; }));
    return {
      prompt: '<b>' + h.ten.charAt(0).toUpperCase() + h.ten.slice(1) +
              '</b> có bao nhiêu <b>trục đối xứng</b>?',
      speak: h.ten + ' có bao nhiêu trục đối xứng?',
      answer: h.truc, soChuSo: 1, mach: 'Đối xứng',
      giai: ['Trục đối xứng là đường gấp đôi hình lại thì hai nửa <b>trùng khít</b> nhau.',
        h.ten.charAt(0).toUpperCase() + h.ten.slice(1) + ' có ' + h.truc + ' trục đối xứng.',
        'Dễ nhớ: đa giác đều có bao nhiêu cạnh thì có bấy nhiêu trục đối xứng.']
    };
  }

  function coTamDoiXung() {
    var h = chon(DOI_XUNG);
    return {
      prompt: '<b>' + h.ten.charAt(0).toUpperCase() + h.ten.slice(1) +
              '</b> có <b>tâm đối xứng</b> hay không?',
      speak: h.ten + ' có tâm đối xứng hay không?',
      answer: h.tam === 'có' ? 'Có' : 'Không',
      choices: ['Có', 'Không'], cols: 2, mach: 'Đối xứng',
      giai: ['Hình có tâm đối xứng là hình <b>quay nửa vòng</b> quanh một điểm thì trùng với chính nó.',
        h.ten.charAt(0).toUpperCase() + h.ten.slice(1) + ' ' +
          (h.tam === 'có' ? 'quay nửa vòng quanh tâm thì trùng khít, nên <b>có</b> tâm đối xứng.'
                          : 'quay nửa vòng thì bị lộn ngược, nên <b>không</b> có tâm đối xứng.'),
        'Nhớ: tam giác đều và hình thang cân đều không có tâm đối xứng.']
    };
  }

  function chuViHinhChuNhat6() {
    var a = r(5, 30), b = r(3, a - 1);
    return {
      prompt: 'Hình chữ nhật có chiều dài <b>' + a + ' cm</b>, chiều rộng <b>' + b +
              ' cm</b>. Tính chu vi.',
      speak: 'Hình chữ nhật dài ' + a + ', rộng ' + b + ' xăng ti mét. Tính chu vi.',
      answer: (a + b) * 2, after: 'cm', soChuSo: 4, mach: 'Chu vi diện tích',
      giai: ['Chu vi hình chữ nhật = <b>(dài + rộng) × 2</b>.',
        a + ' + ' + b + ' = ' + (a + b) + '.',
        (a + b) + ' × 2 = ' + ((a + b) * 2) + ' cm.',
        'Chu vi đo bằng cm, <b>không</b> có mũ hai — đó là của diện tích.']
    };
  }

  /* ---------- Thống kê và xác suất ---------- */

  function docBieuDoCot() {
    var ten = ['Toán', 'Văn', 'Anh', 'Sử'];
    var so = ten.map(function () { return r(3, 12); });
    var hoi = chon(['caoNhat', 'tong', 'hieu']);
    var max = Math.max.apply(null, so), min = Math.min.apply(null, so);
    var tong = so.reduce(function (s, v) { return s + v; }, 0);

    var cot = so.map(function (v, i) {
      var x = 14 + i * 48, c = v * 11;
      return '<rect x="' + x + '" y="' + (150 - c) + '" width="34" height="' + c +
             '" rx="4" fill="' + ['#4aa8ff', '#8b7bf7', '#2fcf90', '#ffc93c'][i] + '"/>' +
             '<text x="' + (x + 17) + '" y="' + (145 - c) + '" font-size="12" text-anchor="middle" fill="#2b2f55">' +
             v + '</text>' +
             '<text x="' + (x + 17) + '" y="169" font-size="11" text-anchor="middle" fill="#7d84ab">' +
             ten[i] + '</text>';
    }).join('');

    var cauHoi, dapAn, cacBuoc;
    if (hoi === 'caoNhat') {
      cauHoi = 'Môn nào có <b>nhiều bạn chọn nhất</b>? Cho biết <b>số bạn</b> của môn đó.';
      dapAn = max;
      cacBuoc = ['So chiều cao các cột với nhau, cột nào cao nhất thì môn đó nhiều bạn chọn nhất.',
        'Cột cao nhất ứng với ' + max + ' bạn.'];
    } else if (hoi === 'tong') {
      cauHoi = 'Cả bốn môn có <b>tất cả</b> bao nhiêu bạn chọn?';
      dapAn = tong;
      cacBuoc = ['Cộng số bạn của cả bốn cột lại.',
        so.join(' + ') + ' = ' + tong + ' bạn.'];
    } else {
      cauHoi = 'Môn nhiều bạn chọn nhất <b>hơn</b> môn ít bạn chọn nhất bao nhiêu bạn?';
      dapAn = max - min;
      cacBuoc = ['Cột cao nhất là ' + max + ' bạn, cột thấp nhất là ' + min + ' bạn.',
        'Lấy hiệu: ' + max + ' − ' + min + ' = ' + (max - min) + ' bạn.'];
    }

    return {
      prompt: 'Biểu đồ dưới đây cho biết số bạn chọn môn học yêu thích. ' + cauHoi,
      speak: 'Nhìn biểu đồ cột rồi trả lời: ' + Q.locLoiDoc(cauHoi),
      art: '<svg viewBox="0 0 220 182" width="220" height="182" role="img" ' +
           'aria-label="Biểu đồ cột số bạn chọn môn học">' +
           '<line x1="6" y1="152" x2="214" y2="152" stroke="#c9cfe6" stroke-width="2"/>' +
           cot + '</svg>',
      answer: dapAn, after: 'bạn', soChuSo: 3, mach: 'Thống kê',
      giai: ['Mỗi cột cho biết số bạn chọn một môn, con số ghi ngay trên đầu cột.']
        .concat(cacBuoc)
    };
  }

  function xacSuatThucNghiem() {
    var tong = chon([10, 20, 25, 50]);
    var lan = Math.round(tong * chon([0.2, 0.4, 0.5, 0.6, 0.8]));
    var pt = Math.round(lan / tong * 100);
    return {
      prompt: 'Bạn An tung một đồng xu <b>' + tong + '</b> lần thì có <b>' + lan +
              '</b> lần mặt ngửa. Hỏi <b>xác suất thực nghiệm</b> của biến cố “mặt ngửa” là bao nhiêu <b>phần trăm</b>?',
      speak: 'Tung đồng xu ' + tong + ' lần được ' + lan +
             ' lần mặt ngửa. Xác suất thực nghiệm là bao nhiêu phần trăm?',
      answer: pt, after: '%', soChuSo: 3, mach: 'Xác suất',
      giai: ['Xác suất thực nghiệm = <b>số lần biến cố xảy ra chia cho tổng số lần làm</b>.',
        lan + ' : ' + tong + ' = ' + (lan / tong) + '.',
        'Đổi ra phần trăm: ' + (lan / tong) + ' × 100 = ' + pt + '%.',
        'Khác với xác suất lí thuyết (50%) vì đây là số liệu đếm thật.']
    };
  }

  function doiDonVi6() {
    var bang = [
      { tu: 'm', den: 'cm', he: 100 }, { tu: 'km', den: 'm', he: 1000 },
      { tu: 'kg', den: 'g', he: 1000 }, { tu: 'tấn', den: 'kg', he: 1000 },
      { tu: 'giờ', den: 'phút', he: 60 }, { tu: 'phút', den: 'giây', he: 60 },
      { tu: 'm²', den: 'dm²', he: 100 }
    ];
    var d = chon(bang), so = r(2, 25);
    return {
      prompt: 'Đổi đơn vị: <b>' + so + ' ' + d.tu + '</b> bằng bao nhiêu <b>' + d.den + '</b>?',
      speak: 'Đổi ' + so + ' ' + d.tu + ' ra ' + d.den,
      answer: so * d.he, after: d.den, soChuSo: 6, mach: 'Đo lường',
      giai: ['1 ' + d.tu + ' = ' + d.he + ' ' + d.den + '.',
        'Nên ' + so + ' ' + d.tu + ' = ' + so + ' × ' + d.he + ' = ' + (so * d.he) + ' ' + d.den + '.',
        'Đổi từ đơn vị lớn sang đơn vị bé thì <b>nhân</b>, ngược lại thì chia.']
    };
  }

  global.ToanL6 = {
    luyThua: luyThua, nhanLuyThua: nhanLuyThua, thuTuPhepTinh: thuTuPhepTinh,
    soNguyenTo: soNguyenTo, timUCLN: timUCLN, timBCNN: timBCNN,
    dauHieuChiaHet6: dauHieuChiaHet6,
    congSoNguyen: congSoNguyen, nhanSoNguyen: nhanSoNguyen, soSanhSoNguyen: soSanhSoNguyen,
    rutGonPS6: rutGonPS6, congPSKhacMau: congPSKhacMau, nhanChiaPS6: nhanChiaPS6,
    thapPhan6: thapPhan6, phanTram6: phanTram6, timSoBietPhanTram: timSoBietPhanTram,
    nhanBietHinh6: nhanBietHinh6, chuViLucGiac: chuViLucGiac, dienTichHinhThang: dienTichHinhThang,
    trungDiem: trungDiem, loaiGoc: loaiGoc, congGoc: congGoc,
    trungBinhCong6: trungBinhCong6, xacSuatDonGian: xacSuatDonGian,

    /* phần bổ sung */
    tapHopPhanTu: tapHopPhanTu, phanTuThuocTapHop: phanTuThuocTapHop,
    demUoc: demUoc, boiNhoNhat: boiNhoNhat, thuaSoNguyenToLonNhat: thuaSoNguyenToLonNhat,
    bieuThucCoNgoac: bieuThucCoNgoac, timXLop6: timXLop6,
    truSoNguyen: truSoNguyen, chiaSoNguyen: chiaSoNguyen,
    giaTriTuyetDoi: giaTriTuyetDoi, boDauNgoac: boDauNgoac,
    soSanhPhanSo: soSanhPhanSo, truPSKhacMau: truPSKhacMau,
    honSoThanhPhanSo: honSoThanhPhanSo, phanSoCuaMotSo: phanSoCuaMotSo,
    timSoBietPhanSo: timSoBietPhanSo,
    nhanThapPhan: nhanThapPhan, chiaThapPhan: chiaThapPhan,
    lamTronThapPhan: lamTronThapPhan, tiSoPhanTram6: tiSoPhanTram6,
    dienTichHinhBinhHanh: dienTichHinhBinhHanh, dienTichHinhThoi: dienTichHinhThoi,
    demTrucDoiXung: demTrucDoiXung, coTamDoiXung: coTamDoiXung,
    chuViHinhChuNhat6: chuViHinhChuNhat6,
    docBieuDoCot: docBieuDoCot, xacSuatThucNghiem: xacSuatThucNghiem,
    doiDonVi6: doiDonVi6
  };
})(window);
