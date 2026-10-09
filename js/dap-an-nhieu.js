/* ===== Dựng danh sách đáp án cho các màn chơi =====
   Phần lớn câu trong game là gõ số, không sẵn lựa chọn, nên phải tự nặn ra
   đáp án nhiễu. Nhiễu phải "có lý": cùng độ lớn, cùng số chữ số thập phân,
   ưu tiên cùng số chữ số — khác hẳn đáp án đúng là bé loại ra ngay khỏi cần
   tính.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;

  // "3,5" → { so: 3.5, le: 1 }; "12" → { so: 12, le: 0 }; không phải số → null
  function docSo(s) {
    var t = String(s).trim().replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(t)) return null;
    var cham = t.indexOf('.');
    return { so: Number(t), le: cham === -1 ? 0 : t.length - cham - 1 };
  }

  function vietSo(n, le) {
    return n.toFixed(le).replace('.', ',');
  }

  function nhieuGan(dung) {
    var o = docSo(dung);
    if (!o) return [];
    var n = o.so, le = o.le, don = Math.pow(10, -le);
    var buoc;
    if (le > 0) buoc = [don, -don, 2 * don, -2 * don, 1, -1];
    else if (n >= 1000) buoc = [1, -1, 10, -10, 100, -100, 1000];
    else if (n >= 100) buoc = [1, -1, 10, -10, 100, -100];
    else if (n >= 20) buoc = [1, -1, 2, -2, 10, -10];
    else buoc = [1, -1, 2, -2, 3, -3];

    var ra = [];
    buoc.forEach(function (b) {
      var v = Math.round((n + b) * Math.pow(10, le)) / Math.pow(10, le);
      if (v >= 0 && v !== n) ra.push(vietSo(v, le));
    });
    if (n >= 4) ra.push(vietSo(n * 2, le));
    if (le === 0 && n >= 6 && n % 2 === 0) ra.push(vietSo(n / 2, le));

    var daiDung = vietSo(n, le).length;
    ra.sort(function (a, b) {
      return Math.abs(a.length - daiDung) - Math.abs(b.length - daiDung);
    });
    return ra;
  }

  /**
   * tao(cau, toiDa) → mảng từ 2 tới toiDa nhãn, luôn có đáp án đúng, không
   * trùng nhau, đã xáo trộn. Nặn không đủ thì trả về ít hơn — thà ba ô thật
   * còn hơn một ô ghi dấu hỏi cho đủ số.
   */
  function tao(cau, toiDa) {
    toiDa = toiDa || 4;
    var dung = String(cau.answer);
    var ds = [dung];

    (cau.choices || []).forEach(function (c) {
      if (ds.length < toiDa && ds.indexOf(String(c)) === -1) ds.push(String(c));
    });

    Q.shuffle(nhieuGan(dung)).forEach(function (c) {
      if (ds.length < toiDa && ds.indexOf(c) === -1) ds.push(c);
    });

    return Q.shuffle(ds);
  }

  global.DapAnNhieu = { tao: tao, nhieuGan: nhieuGan };
})(window);
