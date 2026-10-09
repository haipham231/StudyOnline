/* ===== Bài tập nâng cao =====
   Mỗi lớp một bộ đề khó hơn hẳn bài tập thường. Mỗi câu tự mang theo lời
   giải từng bước (trường `giai`) để trợ lý đọc lại khi bé làm sai.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  var TEN = ['An', 'Bình', 'Chi', 'Duy', 'Hà', 'Khoa', 'Lan', 'Minh', 'Nam', 'Thảo'];

  /* ---------------- Lớp 1 ---------------- */

  function l1_bachoc() {
    var a = r(3, 9), b = r(2, 9 - a + 3), c = r(1, 5);
    var tong = a + b;
    if (tong - c < 0) c = 1;
    return {
      prompt: 'Trên cành có <b>' + a + '</b> con chim. Thêm <b>' + b + '</b> con bay đến, ' +
              'rồi <b>' + c + '</b> con bay đi. Hỏi còn lại mấy con chim?',
      speak: 'Trên cành có ' + a + ' con chim, thêm ' + b + ' con bay đến, rồi ' + c + ' con bay đi. Còn mấy con?',
      answer: tong - c, after: 'con', soChuSo: 2, mach: 'Toán đố nhiều bước',
      giai: ['Bài này có <b>hai việc</b> nên phải tính hai lần.',
        'Bước 1 — thêm vào: ' + a + ' + ' + b + ' = ' + tong + ' con.',
        'Bước 2 — bớt đi: ' + tong + ' − ' + c + ' = ' + (tong - c) + ' con.',
        'Chỗ hay nhầm: chỉ tính một bước rồi trả lời luôn.']
    };
  }

  function l1_sosanhTong() {
    var a = r(2, 9), b = r(2, 9), c = r(2, 9), d = r(2, 9);
    while (a + b === c + d) { d = r(2, 9); }
    return {
      prompt: 'Điền dấu thích hợp:', text: a + ' + ' + b + ' … ' + c + ' + ' + d,
      answer: a + b > c + d ? '>' : '<', choices: ['>', '<', '='], cols: 3,
      mach: 'So sánh hai phép tính',
      giai: ['Phải tính <b>cả hai vế</b> trước rồi mới so sánh.',
        'Vế trái: ' + a + ' + ' + b + ' = ' + (a + b) + '.',
        'Vế phải: ' + c + ' + ' + d + ' = ' + (c + d) + '.',
        (a + b) + ' ' + (a + b > c + d ? 'lớn hơn' : 'bé hơn') + ' ' + (c + d) + '.']
    };
  }

  function l1_timSoBiAn() {
    var x = r(2, 9), b = r(1, 9), tong = x + b;
    return {
      prompt: 'Số nào cộng với <b>' + b + '</b> thì được <b>' + tong + '</b>?',
      speak: 'Số nào cộng với ' + b + ' thì được ' + tong + '?',
      answer: x, soChuSo: 2, mach: 'Tìm số chưa biết',
      giai: ['Đây là tìm <b>số hạng chưa biết</b>.',
        'Lấy tổng trừ đi số hạng đã biết: ' + tong + ' − ' + b + ' = ' + x + '.',
        'Thử lại cho chắc: ' + x + ' + ' + b + ' = ' + tong + ' ✓']
    };
  }

  /* ---------------- Lớp 2 ---------------- */

  function l2_haiBuoc() {
    var hop = r(3, 8), moiHop = r(4, 9), choDi = r(3, 15);
    var tong = hop * moiHop;
    if (choDi >= tong) choDi = tong - 1;
    return {
      prompt: 'Có <b>' + hop + '</b> hộp bút, mỗi hộp <b>' + moiHop + '</b> cái. ' +
              'Cô giáo cho các bạn <b>' + choDi + '</b> cái. Hỏi còn lại bao nhiêu cái bút?',
      speak: 'Có ' + hop + ' hộp bút, mỗi hộp ' + moiHop + ' cái, cho đi ' + choDi + ' cái. Còn bao nhiêu?',
      answer: tong - choDi, after: 'cái', soChuSo: 3, mach: 'Toán đố hai bước',
      giai: ['Bước 1 — tìm tổng số bút: ' + hop + ' × ' + moiHop + ' = ' + tong + ' cái.',
        'Bước 2 — bớt số đã cho đi: ' + tong + ' − ' + choDi + ' = ' + (tong - choDi) + ' cái.',
        'Chỗ hay nhầm: lấy ' + hop + ' trừ ' + choDi + ' ngay, quên nhân trước.']
    };
  }

  function l2_timXHaiBuoc() {
    var x = r(5, 40), b = r(5, 30), c = r(3, 20);
    return {
      prompt: 'Tìm <b>x</b>:', text: 'x + ' + b + ' = ' + (x + b + c) + ' − ' + c,
      answer: x, soChuSo: 3, mach: 'Tìm x nâng cao',
      giai: ['Tính vế phải trước: ' + (x + b + c) + ' − ' + c + ' = ' + (x + b) + '.',
        'Bài thành: x + ' + b + ' = ' + (x + b) + '.',
        'Tìm số hạng chưa biết: ' + (x + b) + ' − ' + b + ' = ' + x + '.']
    };
  }

  function l2_gapVaThem() {
    var a = r(3, 12), lan = chon([2, 5]), them = r(3, 20);
    return {
      prompt: 'Lan có <b>' + a + '</b> bông hoa. Mai có gấp <b>' + lan + '</b> lần Lan và thêm <b>' +
              them + '</b> bông nữa. Hỏi Mai có bao nhiêu bông hoa?',
      speak: 'Lan có ' + a + ' bông hoa, Mai có gấp ' + lan + ' lần và thêm ' + them + ' bông. Mai có bao nhiêu?',
      answer: a * lan + them, after: 'bông', soChuSo: 3, mach: 'Toán đố hai bước',
      giai: ['Bước 1 — gấp lên: ' + a + ' × ' + lan + ' = ' + (a * lan) + ' bông.',
        'Bước 2 — thêm vào: ' + (a * lan) + ' + ' + them + ' = ' + (a * lan + them) + ' bông.',
        'Chỗ hay nhầm: cộng trước rồi mới nhân.']
    };
  }

  /* ---------------- Lớp 3 ---------------- */

  function l3_chiaDuThucTe() {
    var moiXe = r(4, 9), tong = moiXe * r(5, 12) + r(1, moiXe - 1);
    var duXe = Math.ceil(tong / moiXe);
    return {
      prompt: 'Có <b>' + tong + '</b> bạn đi tham quan, mỗi xe chở được <b>' + moiXe +
              '</b> bạn. Hỏi cần ít nhất bao nhiêu xe để chở hết?',
      speak: 'Có ' + tong + ' bạn, mỗi xe chở ' + moiXe + ' bạn. Cần ít nhất bao nhiêu xe?',
      answer: duXe, after: 'xe', soChuSo: 3, mach: 'Chia có dư thực tế',
      giai: ['Chia trước: ' + tong + ' : ' + moiXe + ' = ' + Math.floor(tong / moiXe) +
        ' (dư ' + (tong % moiXe) + ').',
        'Còn dư ' + (tong % moiXe) + ' bạn thì vẫn phải có thêm <b>một xe nữa</b> chở các bạn đó.',
        'Vậy cần ' + Math.floor(tong / moiXe) + ' + 1 = ' + duXe + ' xe.',
        'Chỗ hay nhầm: trả lời ' + Math.floor(tong / moiXe) + ' rồi bỏ quên các bạn còn dư.']
    };
  }

  function l3_chuViNguoc() {
    var a = r(6, 20), b = r(3, a - 1), cv = (a + b) * 2;
    return {
      prompt: 'Hình chữ nhật có chu vi <b>' + cv + ' cm</b>, chiều dài <b>' + a +
              ' cm</b>. Tính chiều rộng.',
      speak: 'Hình chữ nhật chu vi ' + cv + ' xăng ti mét, dài ' + a + '. Tính chiều rộng.',
      answer: b, after: 'cm', soChuSo: 3, mach: 'Chu vi ngược',
      giai: ['Chu vi = (dài + rộng) × 2, nên <b>nửa chu vi</b> = dài + rộng.',
        'Nửa chu vi: ' + cv + ' : 2 = ' + (cv / 2) + ' cm.',
        'Chiều rộng = nửa chu vi − chiều dài = ' + (cv / 2) + ' − ' + a + ' = ' + b + ' cm.',
        'Chỗ hay nhầm: lấy thẳng ' + cv + ' − ' + a + ', quên chia đôi trước.']
    };
  }

  function l3_bieuThucKho() {
    var a = r(3, 9), b = r(3, 9), c = r(2, 6), d = r(10, 40);
    return {
      prompt: 'Tính giá trị biểu thức:', text: d + ' + ' + a + ' × ' + b + ' − ' + c,
      answer: d + a * b - c, soChuSo: 4, mach: 'Biểu thức nâng cao',
      giai: ['Nhân chia làm trước: ' + a + ' × ' + b + ' = ' + (a * b) + '.',
        'Biểu thức còn: ' + d + ' + ' + (a * b) + ' − ' + c + '.',
        'Cộng trừ từ trái sang phải: ' + (d + a * b) + ' − ' + c + ' = ' + (d + a * b - c) + '.',
        'Chỗ hay nhầm: cộng ' + d + ' với ' + a + ' trước.']
    };
  }

  /* ---------------- Lớp 4 ---------------- */

  function l4_tongTiCoDu() {
    var phan = r(5, 25), ti = r(2, 5);
    var be = phan, lon = phan * ti, tong = be + lon;
    return {
      prompt: 'Hai kho có tất cả <b>' + tong + '</b> tấn thóc. Kho lớn gấp <b>' + ti +
              '</b> lần kho bé. Hỏi <b>kho lớn</b> hơn kho bé bao nhiêu tấn?',
      speak: 'Hai kho có ' + tong + ' tấn thóc, kho lớn gấp ' + ti + ' lần kho bé. Kho lớn hơn kho bé bao nhiêu?',
      answer: lon - be, after: 'tấn', soChuSo: 4, mach: 'Tổng tỉ nâng cao',
      giai: ['Kho bé 1 phần, kho lớn ' + ti + ' phần → tất cả ' + (ti + 1) + ' phần.',
        'Một phần: ' + tong + ' : ' + (ti + 1) + ' = ' + phan + ' tấn.',
        'Kho bé ' + be + ' tấn, kho lớn ' + lon + ' tấn.',
        'Đề hỏi <b>hơn bao nhiêu</b> chứ không hỏi kho lớn: ' + lon + ' − ' + be + ' = ' + (lon - be) + ' tấn.',
        'Chỗ hay nhầm: trả lời ' + lon + ' — đó là số thóc kho lớn, không phải phần hơn.']
    };
  }

  function l4_trungBinhNguoc() {
    var n = r(3, 5), tb = r(10, 40);
    var tong = tb * n;
    var biet = [];
    var con = tong;
    for (var i = 0; i < n - 1; i++) {
      var lay = r(1, Math.max(1, con - (n - 1 - i)));
      biet.push(lay); con -= lay;
    }
    return {
      prompt: 'Trung bình cộng của <b>' + n + '</b> số là <b>' + tb + '</b>. Biết ' +
              (n - 1) + ' số đầu là <b>' + biet.join('; ') + '</b>. Tìm số còn lại.',
      speak: 'Trung bình cộng của ' + n + ' số là ' + tb + '. Tìm số còn lại.',
      answer: con, soChuSo: 4, mach: 'Trung bình cộng ngược',
      giai: ['Từ trung bình cộng tìm ra <b>tổng</b>: ' + tb + ' × ' + n + ' = ' + tong + '.',
        'Cộng các số đã biết: ' + biet.join(' + ') + ' = ' + (tong - con) + '.',
        'Số còn lại = tổng − phần đã biết = ' + tong + ' − ' + (tong - con) + ' = ' + con + '.',
        'Chỗ hay nhầm: quên bước nhân để ra tổng.']
    };
  }

  function l4_phanSoCuaSoKho() {
    var mau = r(3, 8), tu = r(1, mau - 1), phan = r(4, 20);
    var so = mau * phan, lay = tu * phan;
    return {
      prompt: 'Một cửa hàng có <b>' + so + '</b> kg gạo, đã bán <b>' + tu + '/' + mau +
              '</b> số gạo đó. Hỏi <b>còn lại</b> bao nhiêu ki-lô-gam gạo?',
      speak: 'Cửa hàng có ' + so + ' ki lô gam gạo, bán ' + tu + ' phần ' + mau + '. Còn lại bao nhiêu?',
      answer: so - lay, after: 'kg', soChuSo: 5, mach: 'Phân số nâng cao',
      giai: ['Tìm một phần ' + mau + ': ' + so + ' : ' + mau + ' = ' + phan + ' kg.',
        'Đã bán ' + tu + ' phần: ' + phan + ' × ' + tu + ' = ' + lay + ' kg.',
        'Còn lại: ' + so + ' − ' + lay + ' = ' + (so - lay) + ' kg.',
        'Chỗ hay nhầm: trả lời ' + lay + ' — đó là số đã bán, đề hỏi số <b>còn lại</b>.']
    };
  }

  /* ---------------- Lớp 5 ---------------- */

  function ucln(a, b) { return b ? ucln(b, a % b) : a; }

  function l5_phanTramNguoc() {
    var pt = chon([10, 20, 25, 50]);
    // sĩ số phải là bội của 100 chia cho ước chung lớn nhất, nếu không số học sinh giỏi ra số lẻ
    var boi = 100 / ucln(pt, 100);
    var goc = r(3, 12) * boi;
    var phan = goc * pt / 100;
    return {
      prompt: 'Một lớp có <b>' + goc + '</b> học sinh, trong đó <b>' + pt +
              '%</b> là học sinh giỏi. Hỏi lớp đó có bao nhiêu học sinh <b>không</b> phải học sinh giỏi?',
      speak: 'Lớp có ' + goc + ' học sinh, ' + pt + ' phần trăm là học sinh giỏi. Bao nhiêu bạn không phải học sinh giỏi?',
      answer: goc - phan, after: 'học sinh', soChuSo: 5, mach: 'Tỉ số phần trăm nâng cao',
      giai: ['Số học sinh giỏi: ' + goc + ' × ' + pt + ' : 100 = ' + phan + ' bạn.',
        'Số bạn còn lại: ' + goc + ' − ' + phan + ' = ' + (goc - phan) + ' bạn.',
        'Cách khác nhanh hơn: còn lại chiếm ' + (100 - pt) + '% nên ' + goc + ' × ' +
          (100 - pt) + ' : 100 = ' + (goc - phan) + '.',
        'Chỗ hay nhầm: trả lời ' + phan + ' — đó là số học sinh giỏi.']
    };
  }

  function l5_vanTocNguoc() {
    var v = r(4, 15) * 5, t = r(2, 6), s = v * t;
    return {
      prompt: 'Một ô tô đi quãng đường <b>' + s + ' km</b> hết <b>' + t +
              ' giờ</b>. Hỏi với vận tốc đó, đi <b>' + (t + 2) + ' giờ</b> thì được bao nhiêu ki-lô-mét?',
      speak: 'Ô tô đi ' + s + ' ki lô mét hết ' + t + ' giờ. Đi ' + (t + 2) + ' giờ được bao nhiêu?',
      answer: v * (t + 2), after: 'km', soChuSo: 5, mach: 'Chuyển động nâng cao',
      giai: ['Bước 1 — tìm vận tốc: ' + s + ' : ' + t + ' = ' + v + ' km/giờ.',
        'Bước 2 — tính quãng đường mới: ' + v + ' × ' + (t + 2) + ' = ' + (v * (t + 2)) + ' km.',
        'Chỗ hay nhầm: lấy ' + s + ' cộng thêm 2 giờ, quên tìm vận tốc trước.']
    };
  }

  function l5_dienTichConLai() {
    var a = r(8, 30), b = r(5, a - 1), canh = r(2, Math.min(a, b) - 1);
    return {
      prompt: 'Một mảnh vườn hình chữ nhật dài <b>' + a + ' m</b>, rộng <b>' + b +
              ' m</b>. Người ta xây một bể nước hình vuông cạnh <b>' + canh +
              ' m</b> trong vườn. Hỏi phần đất còn lại rộng bao nhiêu mét vuông?',
      speak: 'Vườn dài ' + a + ' mét rộng ' + b + ' mét, bể nước hình vuông cạnh ' + canh + ' mét. Phần còn lại bao nhiêu?',
      answer: a * b - canh * canh, after: 'm²', soChuSo: 5, mach: 'Diện tích nâng cao',
      giai: ['Diện tích cả vườn: ' + a + ' × ' + b + ' = ' + (a * b) + ' m².',
        'Diện tích bể nước: ' + canh + ' × ' + canh + ' = ' + (canh * canh) + ' m².',
        'Phần đất còn lại: ' + (a * b) + ' − ' + (canh * canh) + ' = ' + (a * b - canh * canh) + ' m².',
        'Chỗ hay nhầm: trừ cạnh với cạnh thay vì trừ diện tích với diện tích.']
    };
  }


  /* ---------------- Lớp 6 ---------------- */

  function l6_ucln_thucTe() {
    var k = r(3, 15), a = k * r(2, 7), b = k * r(2, 7);
    while (a === b) b = k * r(2, 7);
    function uc(x, y) { return y ? uc(y, x % y) : x; }
    var d = uc(a, b);
    return {
      prompt: 'Cô giáo có <b>' + a + '</b> quyển vở và <b>' + b + '</b> cây bút, muốn chia đều ' +
              'vào các phần quà sao cho <b>không thừa</b> thứ gì. Hỏi chia được <b>nhiều nhất</b> ' +
              'bao nhiêu phần quà?',
      speak: 'Có ' + a + ' quyển vở và ' + b + ' cây bút, chia đều không thừa. Nhiều nhất bao nhiêu phần quà?',
      answer: d, after: 'phần', soChuSo: 4, mach: 'Ước chung trong đời sống',
      giai: ['Chia đều cả hai thứ mà không thừa nghĩa là số phần quà phải là <b>ước chung</b> của ' +
        a + ' và ' + b + '.',
        'Hỏi <b>nhiều nhất</b> nên lấy <b>ước chung lớn nhất</b>.',
        'Ước chung lớn nhất của ' + a + ' và ' + b + ' là ' + d + '.',
        'Kiểm lại: mỗi phần có ' + (a / d) + ' quyển vở và ' + (b / d) + ' cây bút.',
        'Chỗ hay nhầm: lấy bội chung nhỏ nhất, hoặc cộng hai số lại rồi chia.']
    };
  }

  function l6_bcnn_thucTe() {
    var a = r(3, 12), b = r(3, 12);
    while (b === a) b = r(3, 12);
    function uc(x, y) { return y ? uc(y, x % y) : x; }
    var m = a / uc(a, b) * b;
    return {
      prompt: 'Hai xe buýt cùng rời bến lúc 6 giờ. Xe thứ nhất cứ <b>' + a +
              '</b> phút chạy một chuyến, xe thứ hai cứ <b>' + b + '</b> phút một chuyến. ' +
              'Hỏi sau ít nhất bao nhiêu phút thì hai xe lại cùng rời bến?',
      speak: 'Xe một cứ ' + a + ' phút, xe hai cứ ' + b + ' phút. Sau bao nhiêu phút hai xe lại cùng rời bến?',
      answer: m, after: 'phút', soChuSo: 4, mach: 'Bội chung trong đời sống',
      giai: ['Hai xe cùng rời bến khi số phút là <b>bội chung</b> của ' + a + ' và ' + b + '.',
        'Hỏi <b>ít nhất</b> nên lấy <b>bội chung nhỏ nhất</b>.',
        'Bội chung nhỏ nhất của ' + a + ' và ' + b + ' là ' + a + ' × ' + b +
          (uc(a, b) > 1 ? ' : ' + uc(a, b) : '') + ' = ' + m + ' phút.',
        'Chỗ hay nhầm: lấy ước chung lớn nhất, hoặc nhân thẳng ' + a + ' × ' + b +
          ' = ' + (a * b) + '.']
    };
  }

  function l6_phanTramHaiBuoc() {
    // giá là bội của 1000 nên mọi mức giảm 10/20/25/50% đều ra số tròn
    var goc = r(50, 400) * 1000, giam = chon([10, 20, 25, 50]);
    var sau = goc - goc * giam / 100;
    return {
      prompt: 'Một chiếc áo giá <b>' + goc.toLocaleString('vi-VN') + ' đồng</b>, được giảm <b>' +
              giam + '%</b>. Hỏi phải trả bao nhiêu tiền?' +
              '<br><small>Trả lời bằng số, không có dấu chấm.</small>',
      speak: 'Áo giá ' + goc + ' đồng, giảm ' + giam + ' phần trăm. Phải trả bao nhiêu?',
      answer: sau, after: 'đồng', soChuSo: 7, mach: 'Phần trăm nâng cao',
      giai: ['Số tiền được giảm: ' + goc + ' × ' + giam + ' : 100 = ' + (goc * giam / 100) + ' đồng.',
        'Số tiền phải trả: ' + goc + ' − ' + (goc * giam / 100) + ' = ' + sau + ' đồng.',
        'Cách nhanh hơn: còn phải trả ' + (100 - giam) + '% nên ' + goc + ' × ' + (100 - giam) +
          ' : 100 = ' + sau + ' đồng.',
        'Chỗ hay nhầm: trả lời ' + (goc * giam / 100) + ' — đó là số tiền <b>được giảm</b>.']
    };
  }

  function l6_soNguyenNhieuBuoc() {
    var a = r(5, 30), b = r(5, 30), c = r(2, 9);
    var kq = -a + b * c;
    var vs = function (x) { return x < 0 ? '(−' + Math.abs(x) + ')' : String(x); };
    // dùng dấu trừ in ấn giống hệt đáp án, để lời giải và đáp án khớp nhau
    var kqHien = String(kq).replace('-', '−');
    return {
      prompt: 'Tính giá trị biểu thức:',
      text: vs(-a) + ' + ' + b + ' · ' + c,
      speak: 'Âm ' + a + ' cộng ' + b + ' nhân ' + c,
      answer: String(kq).replace('-', '−'),
      choices: Q.shuffle([String(kq).replace('-', '−'),
        String(-a + b + c).replace('-', '−'), String((-a + b) * c).replace('-', '−')]),
      cols: 3, mach: 'Số nguyên nâng cao',
      giai: ['Làm <b>nhân trước</b>, cộng trừ sau: ' + b + ' × ' + c + ' = ' + (b * c) + '.',
        'Biểu thức còn: −' + a + ' + ' + (b * c) + '.',
        'Hai số khác dấu: lấy ' + Math.max(a, b * c) + ' − ' + Math.min(a, b * c) + ' = ' +
          Math.abs(kq) + ', mang dấu của số lớn hơn → ' + kqHien + '.',
        'Chỗ hay nhầm: cộng −' + a + ' với ' + b + ' trước rồi mới nhân.']
    };
  }

  function l6_luyThuaHaiBuoc() {
    var a = chon([2, 3, 5]), m = r(2, 3), n = r(2, 3), b = r(2, 9);
    var luy = Math.pow(a, m + n);
    var kq = luy + b * b;
    return {
      prompt: 'Tính giá trị của biểu thức <b>' + a + '<sup>' + m + '</sup> · ' + a +
              '<sup>' + n + '</sup> + ' + b + '<sup>2</sup></b>.',
      speak: a + ' mũ ' + m + ' nhân ' + a + ' mũ ' + n + ' cộng ' + b + ' mũ hai',
      answer: kq, soChuSo: 6, mach: 'Lũy thừa nâng cao',
      giai: ['Nhân hai lũy thừa <b>cùng cơ số</b> thì giữ cơ số, <b>cộng số mũ</b>: ' +
          a + '<sup>' + m + '</sup> · ' + a + '<sup>' + n + '</sup> = ' + a +
          '<sup>' + (m + n) + '</sup>.',
        a + '<sup>' + (m + n) + '</sup> = ' + luy + '.',
        'Tính tiếp ' + b + '² = ' + (b * b) + '.',
        'Cộng lại: ' + luy + ' + ' + (b * b) + ' = ' + kq + '.',
        'Chỗ hay nhầm: <b>nhân</b> hai số mũ với nhau thay vì cộng.']
    };
  }

  function l6_phanSoHaiBuoc() {
    // bể nước: ngày đầu dùng một phần, ngày sau dùng một phần của chỗ còn lại
    var mau1 = chon([2, 3, 4, 5]), mau2 = chon([2, 3, 4]);
    var tong = mau1 * mau2 * r(3, 14);
    var ngay1 = tong / mau1;
    var conLai = tong - ngay1;
    var ngay2 = conLai / mau2;
    var cuoi = conLai - ngay2;
    return {
      prompt: 'Một bể chứa <b>' + tong + ' lít</b> nước. Ngày đầu dùng hết <b>1/' + mau1 +
              '</b> số nước, ngày thứ hai dùng hết <b>1/' + mau2 +
              '</b> <b>chỗ nước còn lại</b>. Hỏi cuối cùng bể còn bao nhiêu lít?',
      speak: 'Bể có ' + tong + ' lít. Ngày đầu dùng một phần ' + mau1 +
             ', ngày sau dùng một phần ' + mau2 + ' chỗ còn lại. Bể còn bao nhiêu lít?',
      answer: cuoi, after: 'lít', soChuSo: 5, mach: 'Phân số nâng cao',
      giai: ['Ngày đầu dùng: ' + tong + ' : ' + mau1 + ' = ' + ngay1 + ' lít.',
        'Sau ngày đầu còn: ' + tong + ' − ' + ngay1 + ' = ' + conLai + ' lít.',
        'Ngày thứ hai dùng một phần ' + mau2 + ' của <b>' + conLai + '</b> lít chứ không phải của ' +
          tong + ' lít: ' + conLai + ' : ' + mau2 + ' = ' + ngay2 + ' lít.',
        'Cuối cùng còn: ' + conLai + ' − ' + ngay2 + ' = ' + cuoi + ' lít.',
        'Chỗ hay nhầm: lấy một phần ' + mau2 + ' của cả bể ban đầu.']
    };
  }

  function l6_dienTichGhepHinh() {
    var a = r(8, 25), b = r(4, 15);          // hình chữ nhật
    var day = r(4, 12), cao = r(4, 12) * 2;  // tam giác ghép thêm
    var tong = a * b + day * cao / 2;
    return {
      prompt: 'Một mảnh vườn gồm <b>một hình chữ nhật</b> dài ' + a + ' m, rộng ' + b +
              ' m, ghép thêm <b>một hình tam giác</b> có đáy ' + day + ' m và chiều cao ' +
              cao + ' m. Tính diện tích cả mảnh vườn.',
      speak: 'Vườn gồm hình chữ nhật ' + a + ' nhân ' + b + ' mét, ghép thêm tam giác đáy ' +
             day + ' cao ' + cao + ' mét. Tính diện tích cả mảnh vườn.',
      answer: tong, after: 'm²', soChuSo: 6, mach: 'Diện tích nâng cao',
      giai: ['Cắt mảnh vườn thành <b>hai hình quen thuộc</b> rồi cộng diện tích lại.',
        'Diện tích hình chữ nhật: ' + a + ' × ' + b + ' = ' + (a * b) + ' m².',
        'Diện tích tam giác: ' + day + ' × ' + cao + ' : 2 = ' + (day * cao / 2) + ' m².',
        'Cộng lại: ' + (a * b) + ' + ' + (day * cao / 2) + ' = ' + tong + ' m².',
        'Chỗ hay nhầm: quên chia đôi khi tính diện tích tam giác.']
    };
  }

  function l6_tiSoPhanTramNguoc() {
    var pt = chon([10, 20, 25, 40, 50, 60, 75]);
    var sau = r(3, 30) * 4;
    var goc = Math.round(sau * 100 / (100 + pt));
    // chọn lại cho số tròn: đi ngược từ số gốc
    goc = r(5, 50) * 4;
    sau = goc + goc * pt / 100;
    while (sau % 1 !== 0) { goc += 4; sau = goc + goc * pt / 100; }
    return {
      prompt: 'Năm ngoái trường có một số học sinh. Năm nay số học sinh <b>tăng ' + pt +
              '%</b> so với năm ngoái và đạt <b>' + sau +
              ' bạn</b>. Hỏi năm ngoái trường có bao nhiêu học sinh?',
      speak: 'Số học sinh tăng ' + pt + ' phần trăm và đạt ' + sau +
             ' bạn. Năm ngoái có bao nhiêu bạn?',
      answer: goc, after: 'bạn', soChuSo: 5, mach: 'Phần trăm nâng cao',
      giai: ['Coi số học sinh <b>năm ngoái</b> là 100%.',
        'Năm nay là 100% + ' + pt + '% = ' + (100 + pt) + '%, ứng với ' + sau + ' bạn.',
        'Vậy 1% ứng với ' + sau + ' : ' + (100 + pt) + ' = ' + (sau / (100 + pt)) + ' bạn.',
        'Năm ngoái (100%) có ' + (sau / (100 + pt)) + ' × 100 = ' + goc + ' bạn.',
        'Chỗ hay nhầm: lấy ' + sau + ' trừ đi ' + pt + '% <b>của chính ' + sau + '</b>.']
    };
  }

  function l6_ucln_bcnn_chung() {
    var d = r(2, 9), k1 = r(2, 7), k2 = r(2, 7);
    while (k2 === k1 || ucln(k1, k2) !== 1) k2 = r(2, 7);
    var a = d * k1, b = d * k2;
    var m = a / ucln(a, b) * b;
    return {
      prompt: 'Hai số <b>' + a + '</b> và <b>' + b + '</b> có ước chung lớn nhất bằng <b>' + d +
              '</b>. Hỏi <b>bội chung nhỏ nhất</b> của hai số đó bằng bao nhiêu?',
      speak: 'Hai số ' + a + ' và ' + b + ' có ước chung lớn nhất là ' + d +
             '. Bội chung nhỏ nhất bằng bao nhiêu?',
      answer: m, soChuSo: 5, mach: 'Ước chung và bội chung nâng cao',
      giai: ['Có một công thức rất gọn: <b>ước chung lớn nhất nhân bội chung nhỏ nhất ' +
          'bằng tích hai số</b>.',
        'Tích hai số: ' + a + ' × ' + b + ' = ' + (a * b) + '.',
        'Vậy bội chung nhỏ nhất bằng ' + (a * b) + ' : ' + d + ' = ' + m + '.',
        'Thử lại: ' + m + ' : ' + a + ' = ' + (m / a) + ' và ' + m + ' : ' + b + ' = ' +
          (m / b) + ', đều chia hết.',
        'Chỗ hay nhầm: nhân thẳng ' + a + ' × ' + b + ' mà quên chia cho ' + d + '.']
    };
  }

  var BO = {
    1: [l1_bachoc, l1_sosanhTong, l1_timSoBiAn],
    2: [l2_haiBuoc, l2_timXHaiBuoc, l2_gapVaThem],
    3: [l3_chiaDuThucTe, l3_chuViNguoc, l3_bieuThucKho],
    4: [l4_tongTiCoDu, l4_trungBinhNguoc, l4_phanSoCuaSoKho],
    5: [l5_phanTramNguoc, l5_vanTocNguoc, l5_dienTichConLai],
    6: [l6_ucln_thucTe, l6_bcnn_thucTe, l6_phanTramHaiBuoc, l6_soNguyenNhieuBuoc,
        l6_luyThuaHaiBuoc, l6_phanSoHaiBuoc, l6_dienTichGhepHinh,
        l6_tiSoPhanTramNguoc, l6_ucln_bcnn_chung]
  };

  global.NangCao = {
    BO: BO,
    cua: function (lop) { return BO[lop] || []; },
    tron: function (lop) {
      var ds = BO[lop] || [];
      return function () { return chon(ds)(); };
    }
  };
})(window);
