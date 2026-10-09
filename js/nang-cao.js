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
    // sĩ số phải là bội của 100/ƯCLN, nếu không số học sinh giỏi ra số lẻ
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

  var BO = {
    1: [l1_bachoc, l1_sosanhTong, l1_timSoBiAn],
    2: [l2_haiBuoc, l2_timXHaiBuoc, l2_gapVaThem],
    3: [l3_chiaDuThucTe, l3_chuViNguoc, l3_bieuThucKho],
    4: [l4_tongTiCoDu, l4_trungBinhNguoc, l4_phanSoCuaSoKho],
    5: [l5_phanTramNguoc, l5_vanTocNguoc, l5_dienTichConLai]
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
