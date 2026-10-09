/* ===== Toán lớp 6 — GDPT 2018 =====
   Lũy thừa và thứ tự phép tính, dấu hiệu chia hết, số nguyên tố, ƯCLN và
   BCNN, số nguyên âm, phân số, số thập phân, tỉ số phần trăm, hình học
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
    var them = 1;
    while (set.length < 3) {
      var v = String(Number(dung) + them);
      if (set.indexOf(v) === -1) set.push(v);
      them++;
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

  /* ---------- Chia hết, số nguyên tố, ƯCLN, BCNN ---------- */

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
      prompt: 'Tìm <b>ƯCLN(' + a + ', ' + b + ')</b>.',
      speak: 'Tìm ước chung lớn nhất của ' + a + ' và ' + b,
      answer: d, soChuSo: 4, mach: 'ƯCLN và BCNN',
      giai: ['Phân tích ra thừa số nguyên tố rồi lấy <b>thừa số chung với số mũ nhỏ nhất</b>.',
        'Hoặc nhẩm: tìm số lớn nhất mà cả ' + a + ' và ' + b + ' đều chia hết.',
        'ƯCLN(' + a + ', ' + b + ') = ' + d + '. Thử lại: ' + a + ' : ' + d + ' = ' + (a / d) +
          ', ' + b + ' : ' + d + ' = ' + (b / d) + '.']
    };
  }

  function timBCNN() {
    var a = r(2, 12), b = r(2, 12);
    while (b === a) b = r(2, 12);
    var m = bcnn(a, b);
    return {
      prompt: 'Tìm <b>BCNN(' + a + ', ' + b + ')</b>.',
      speak: 'Tìm bội chung nhỏ nhất của ' + a + ' và ' + b,
      answer: m, soChuSo: 4, mach: 'ƯCLN và BCNN',
      giai: ['BCNN = tích hai số chia cho ƯCLN của chúng.',
        'ƯCLN(' + a + ', ' + b + ') = ' + ucln(a, b) + '.',
        'BCNN = ' + a + ' × ' + b + ' : ' + ucln(a, b) + ' = ' + m + '.']
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
      giai: ['Chia cả tử và mẫu cho ƯCLN của chúng.',
        'ƯCLN(' + (tu * k) + ', ' + (mau * k) + ') = ' + (k * d) + '.',
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
      giai: ['Mẫu chung nhỏ nhất là BCNN(' + m1 + ', ' + m2 + ') = ' + mc + '.',
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
        'Rút gọn ' + tu + '/' + mau + ' cho ƯCLN ' + g + ' được ' + (tu / g) + '/' + (mau / g) + '.']
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

  global.ToanL6 = {
    luyThua: luyThua, nhanLuyThua: nhanLuyThua, thuTuPhepTinh: thuTuPhepTinh,
    soNguyenTo: soNguyenTo, timUCLN: timUCLN, timBCNN: timBCNN,
    dauHieuChiaHet6: dauHieuChiaHet6,
    congSoNguyen: congSoNguyen, nhanSoNguyen: nhanSoNguyen, soSanhSoNguyen: soSanhSoNguyen,
    rutGonPS6: rutGonPS6, congPSKhacMau: congPSKhacMau, nhanChiaPS6: nhanChiaPS6,
    thapPhan6: thapPhan6, phanTram6: phanTram6, timSoBietPhanTram: timSoBietPhanTram,
    nhanBietHinh6: nhanBietHinh6, chuViLucGiac: chuViLucGiac, dienTichHinhThang: dienTichHinhThang,
    trungDiem: trungDiem, loaiGoc: loaiGoc, congGoc: congGoc,
    trungBinhCong6: trungBinhCong6, xacSuatDonGian: xacSuatDonGian
  };
})(window);
