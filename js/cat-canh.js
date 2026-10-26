/* ===== Cắt cảnh cho game mầm non =====

   Một màn tranh to kèm một hai câu, mở đầu và kết thúc một lượt chơi, để
   lượt chơi thành một câu chuyện nhỏ: các bạn thú bị lạc → bé đưa các bạn
   về nhà → các bạn về tới nhà rồi.

   Máy đọc lời một lần khi cảnh hiện ra. Khác với khu truyện (người lớn tự
   lật tự đọc): đây là game bé chơi một mình, mà game này vốn đã đọc to mọi
   câu hỏi, nên cắt cảnh cũng đọc cho cùng một nhịp.

   Tranh cắt cảnh có hai dạng:
   - hinh: tranh vẽ kín nền (assets/hinh/tranh/cat-canh/…), phủ trọn khung.
   - hinhTam: mảng mấy hình dán trong kho, xếp thành hàng trên nền màu. Dùng
     tạm lúc chưa có tranh, để game vẫn chạy được trọn vẹn.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var o = global.document.createElement(tag);
    if (cls) o.className = cls;
    if (html != null) o.innerHTML = html;
    return o;
  }

  function anh(duong, cls) {
    return global.HinhVe && global.HinhVe.veTen ? global.HinhVe.veTen(duong, cls) : '';
  }

  /* hien(khung, tuyChon)

     tuyChon.hinh     — tranh vẽ kín nền
     tuyChon.hinhTam  — mảng hình dán, dùng khi chưa có tranh
     tuyChon.nen      — màu nền cho dạng hình dán
     tuyChon.loi      — một hai câu, máy đọc lên
     tuyChon.them     — HTML chèn dưới lời (sao, điểm…)
     tuyChon.cacNut   — [{ chu, lop, bam }] — nút ở cuối */
  function hien(khung, tuyChon) {
    khung.innerHTML = '';
    var khoi = el('div', 'panel kids cat-canh');
    khung.appendChild(khoi);

    var tranh;
    if (tuyChon.hinh) {
      tranh = el('div', 'tranh-cat-canh', anh(tuyChon.hinh, 'anh-cat-canh'));
    } else {
      tranh = el('div', 'tranh-cat-canh tam');
      tranh.style.background = tuyChon.nen || '#eaf4ff';
      (tuyChon.hinhTam || []).forEach(function (d) { tranh.innerHTML += anh(d, 'dan-tam'); });
    }
    khoi.appendChild(tranh);

    var hang = el('div', 'loi-cat-canh');
    hang.appendChild(el('p', null, tuyChon.loi));
    var loa = el('button', 'loa-cat-canh', '🔊');
    loa.type = 'button';
    loa.setAttribute('aria-label', 'Nghe lại');
    loa.addEventListener('click', doc);
    hang.appendChild(loa);
    khoi.appendChild(hang);

    if (tuyChon.them) khoi.appendChild(el('div', 'them-cat-canh', tuyChon.them));

    var nut = el('div', 'hang-nut nut-cat-canh');
    (tuyChon.cacNut || []).forEach(function (n) {
      var b = el(n.href ? 'a' : 'button', 'btn ' + (n.lop || 'chinh'), n.chu);
      if (n.href) b.href = n.href; else b.type = 'button';
      if (n.bam) b.addEventListener('click', function () { thoi(); n.bam(); });
      nut.appendChild(b);
    });
    khoi.appendChild(nut);

    function doc() {
      if (global.Quiz && global.Quiz.docTo) global.Quiz.docTo(tuyChon.loi, 'vi', {});
    }
    function thoi() {
      if (global.speechSynthesis) { try { global.speechSynthesis.cancel(); } catch (e) {} }
    }

    // đợi trình duyệt vẽ xong cảnh rồi mới đọc, kẻo tiếng đi trước hình
    global.setTimeout(doc, 250);
  }

  global.CatCanh = { hien: hien };
})(window);
