/* ===== Trợ lý giải bài =====
   Chấm xong, với mỗi câu sai trợ lý nói lại đề, chỉ ra chỗ bé nhầm rồi giải
   từng bước.

   Trợ lý chạy ngay trong máy, không gọi dịch vụ nào bên ngoài: trang này là
   web tĩnh công khai nên không thể giấu khoá API ở đây được. Lời giải lấy từ
   hai nguồn:
     1. cau.giai — bộ sinh đề tự viết sẵn lời giải từng bước (bài nâng cao
        đều có);
     2. nếu không có thì suy từ tên mạch và các con số trong đề.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // bỏ thẻ HTML để lấy chữ trần khi cần đọc lại đề
  function tran(s) {
    return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Lấy các số trong một chuỗi, giữ cả số thập phân kiểu Việt (3,5)
  function soTrong(s) {
    return (tran(s).match(/\d+(?:,\d+)?/g) || []).map(function (x) {
      return Number(x.replace(',', '.'));
    });
  }

  /* ---------- Lời giải theo mạch ---------- */

  var THEO_MACH = {
    'Cộng trừ 100': function (q) {
      var n = soTrong(q.text);
      if (n.length < 2) return null;
      var cong = /\+/.test(q.text);
      if (!cong) return ['Tách số trừ ra cho dễ: ' + n[1] + ' = ' + Math.floor(n[1] / 10) * 10 +
        ' + ' + (n[1] % 10) + '.', 'Trừ phần chục trước, rồi trừ nốt phần đơn vị.'];
      return ['Cộng hàng đơn vị trước: ' + (n[0] % 10) + ' + ' + (n[1] % 10) + ' = ' + (n[0] % 10 + n[1] % 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' — vượt 10 nên nhớ 1 sang hàng chục.' : '.'),
        'Rồi cộng hàng chục: ' + Math.floor(n[0] / 10) + ' + ' + Math.floor(n[1] / 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' + 1 (số nhớ)' : '') + '.'];
    },
    'Tìm x': function (q) {
      var t = tran(q.text);
      if (/x \+/.test(t) || /\+ x/.test(t)) return ['x là một số hạng chưa biết.',
        'Muốn tìm số hạng chưa biết: lấy <b>tổng trừ đi số hạng kia</b>.'];
      if (/x −/.test(t) || /x -/.test(t)) return ['x là số bị trừ.',
        'Muốn tìm số bị trừ: lấy <b>hiệu cộng với số trừ</b>.'];
      if (/− x/.test(t) || /- x/.test(t)) return ['x là số trừ.',
        'Muốn tìm số trừ: lấy <b>số bị trừ trừ đi hiệu</b>.'];
      if (/x ×/.test(t) || /× x/.test(t)) return ['x là một thừa số chưa biết.',
        'Muốn tìm thừa số chưa biết: lấy <b>tích chia cho thừa số kia</b>.'];
      if (/x :/.test(t)) return ['x là số bị chia.', 'Muốn tìm số bị chia: lấy <b>thương nhân với số chia</b>.'];
      if (/: x/.test(t)) return ['x là số chia.', 'Muốn tìm số chia: lấy <b>số bị chia chia cho thương</b>.'];
      return null;
    },
    'Chia có dư': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var thuong = Math.floor(n[0] / n[1]);
      return ['Tìm xem ' + n[1] + ' nhân với mấy thì gần ' + n[0] + ' nhất mà không vượt quá: ' +
        n[1] + ' × ' + thuong + ' = ' + n[1] * thuong + '.',
        'Phần còn thừa chính là số dư: ' + n[0] + ' − ' + n[1] * thuong + ' = ' + (n[0] - n[1] * thuong) + '.',
        'Số dư luôn <b>nhỏ hơn số chia</b> — đây là chỗ hay nhầm nhất.'];
    },
    'Chu vi': function () {
      return ['Chu vi là độ dài đường bao quanh hình.',
        'Hình chữ nhật: <b>(dài + rộng) × 2</b>. Hình vuông: <b>cạnh × 4</b>.',
        'Chu vi đo bằng cm hoặc m, <b>không</b> có mũ hai.'];
    },
    'Diện tích': function () {
      return ['Diện tích là phần mặt bên trong hình.',
        'Hình chữ nhật: <b>dài × rộng</b>. Hình vuông: <b>cạnh × cạnh</b>.',
        'Hình bình hành: <b>đáy × chiều cao</b>. Hình thoi: <b>(chéo 1 × chéo 2) : 2</b>.',
        'Diện tích đo bằng cm² hoặc m² — nhớ viết mũ hai.'];
    },
    'Trung bình cộng': function (q) {
      var n = soTrong(q.prompt);
      if (!n.length) return null;
      var tong = n.reduce(function (a, b) { return a + b; }, 0);
      return ['Cộng tất cả các số lại: ' + n.join(' + ') + ' = ' + tong + '.',
        'Rồi chia cho <b>số lượng số</b> là ' + n.length + ': ' + tong + ' : ' + n.length + '.'];
    },
    'Tổng hiệu': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      return ['Số bé = (tổng − hiệu) : 2 = (' + n[0] + ' − ' + n[1] + ') : 2 = ' + ((n[0] - n[1]) / 2) + '.',
        'Số lớn = số bé + hiệu = ' + ((n[0] - n[1]) / 2) + ' + ' + n[1] + ' = ' + ((n[0] + n[1]) / 2) + '.',
        'Đọc kĩ đề hỏi số <b>lớn</b> hay số <b>bé</b> nhé.'];
    },
    'Tổng tỉ': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var soPhan = n[1] + 1;
      return ['Coi số bé là 1 phần thì số lớn là ' + n[1] + ' phần, cả hai là ' + soPhan + ' phần.',
        'Một phần = tổng : số phần = ' + n[0] + ' : ' + soPhan + ' = ' + (n[0] / soPhan) + '.',
        'Số bé = 1 phần, số lớn = ' + n[1] + ' phần.'];
    },
    'Đổi đơn vị': function () {
      return ['Đổi từ đơn vị <b>lớn sang nhỏ</b> thì <b>nhân</b>, từ nhỏ sang lớn thì chia.',
        '1 km = 1000 m · 1 m = 100 cm · 1 kg = 1000 g · 1 tấn = 1000 kg',
        '1 giờ = 60 phút · 1 phút = 60 giây · 1 thế kỉ = 100 năm'];
    },
    'Dấu hiệu chia hết': function () {
      return ['Chia hết cho <b>2</b>: tận cùng là 0, 2, 4, 6, 8.',
        'Chia hết cho <b>5</b>: tận cùng là 0 hoặc 5.',
        'Chia hết cho <b>3</b>: tổng các chữ số chia hết cho 3.',
        'Chia hết cho <b>9</b>: tổng các chữ số chia hết cho 9.'];
    },
    'Biểu thức': function () {
      return ['Trong biểu thức, làm <b>nhân chia trước, cộng trừ sau</b>.',
        'Nếu có dấu ngoặc thì làm <b>trong ngoặc trước</b>.'];
    },
    'Từ loại': function () {
      return ['Từ chỉ <b>sự vật</b> gọi tên người, vật, cây cối, hiện tượng.',
        'Từ chỉ <b>hoạt động</b> nói việc ai đó làm.',
        'Từ chỉ <b>đặc điểm</b> tả màu sắc, hình dáng, tính nết.'];
    },
    'Chính tả': function (q) {
      return ['Đáp án đúng là <b>' + tran(q.answer) + '</b>.',
        'Mẹo: đọc to từ lên, so với từ mình vẫn gặp trong sách.'];
    },
    'Mẫu câu': function () {
      return ['<b>Ai là gì?</b> — giới thiệu, sau “là” thường là danh từ.',
        '<b>Ai làm gì?</b> — kể việc làm, có động từ.',
        '<b>Ai thế nào?</b> — tả đặc điểm, có tính từ.'];
    },
    'Đọc hiểu': function () {
      return ['Đọc lại đoạn văn rồi tìm <b>đúng câu chữ</b> nhắc tới điều đề hỏi.',
        'Câu trả lời gần như luôn nằm sẵn trong đoạn, không cần suy đoán xa.'];
    }
  };

  // tên mạch có thể là "Bảng nhân 2", "Bảng chia 5"… nên dò theo tiền tố
  function timLuat(mach) {
    if (!mach) return null;
    if (THEO_MACH[mach]) return THEO_MACH[mach];
    var khoa = Object.keys(THEO_MACH).filter(function (k) { return mach.indexOf(k) === 0; })[0];
    return khoa ? THEO_MACH[khoa] : null;
  }

  function buoc(m) {
    var q = m.cau || {};
    if (q.giai) return [].concat(q.giai);
    var luat = timLuat(m.mach || q.mach);
    if (luat) {
      var ra = luat(q);
      if (ra && ra.length) return ra;
    }
    return ['Đáp án đúng là <b>' + tran(m.answer) + '</b>, bé trả lời <b>' + tran(m.given) + '</b>.',
      'Bé đọc lại đề một lần nữa rồi thử tự làm lại câu này nhé.'];
  }

  function veBang(cacSai) {
    var khung = el('div', 'tro-ly');
    khung.appendChild(el('h3', null, '🧑‍🏫 Trợ lý giải từng bài sai'));
    khung.appendChild(el('p', 'tro-ly-dan',
      'Trợ lý xem lại ' + cacSai.length + ' câu bé làm chưa đúng và giải từng bước.'));

    cacSai.forEach(function (m, i) {
      var o = el('details', 'bai-sai');
      if (i === 0) o.open = true;
      var dau = el('summary', null,
        '<span class="so">Câu ' + (i + 1) + '</span>' +
        '<span class="tomtat">' + tran(m.label).slice(0, 60) + '</span>');
      o.appendChild(dau);

      o.appendChild(el('div', 'de-lai', '<b>Đề:</b> ' + (m.label || '') +
        (m.after ? ' <i>(' + m.after + ')</i>' : '')));
      o.appendChild(el('div', 'so-sanh-dap',
        '<span class="sai">Bé trả lời: <b>' + tran(m.given) + '</b></span>' +
        '<span class="dung">Đáp án đúng: <b>' + tran(m.answer) + '</b></span>'));

      var ds = el('ol', 'cac-buoc');
      buoc(m).forEach(function (b) { ds.appendChild(el('li', null, b)); });
      o.appendChild(el('div', 'loi-giai', '<b>Giải thích:</b>'));
      o.appendChild(ds);
      khung.appendChild(o);
    });
    return khung;
  }

  global.TroLy = { veBang: veBang, buoc: buoc, _soTrong: soTrong };
})(window);
