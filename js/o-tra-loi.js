/* ===== Ô trả lời dùng chung — trang bài tập, bài kiểm tra và các game =====
   Hỗ trợ ba kiểu: gõ số nguyên, gõ số thập phân (dấu phẩy), và bấm chọn đáp án.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // "3,5" và "3.5" là một; so khớp số có sai số rất nhỏ để tránh lỗi dấu phẩy động
  function bangNhau(nhap, dapAn) {
    var a = String(nhap).replace(',', '.');
    var b = String(dapAn).replace(',', '.');
    if (a === b) return true;
    var x = Number(a), y = Number(b);
    if (isNaN(x) || isNaN(y)) return false;
    return Math.abs(x - y) < 1e-9;
  }

  /**
   * ve(khung, cau, tuyChon) → { huy: fn }
   *   cau     : { prompt, speak, art, text, after, answer, choices, cols, small,
   *               thapPhan, soChuSo }
   *   tuyChon : { nhanNop, coLoa, doc, khiTraLoi(dung, daNhap, oPhanHoi) }
   */
  function ve(khung, cau, tuyChon) {
    tuyChon = tuyChon || {};
    // khoaSan: vẽ sẵn ở trạng thái đã khoá, dùng khi màn đang chạy hoạt ảnh
    // chuyển cảnh — nếu không, bé bấm thêm được và câu bị tính hai lần
    var khoa = !!tuyChon.khoaSan, daGo = '', nghePhim = null;

    // boc: gói đề bài và phím vào một ô riêng, để màn chơi đè được cả cụm lên
    // hình nền. Trang bài tập không truyền boc nên vẫn gắn thẳng vào khung.
    var noi = khung;
    if (tuyChon.boc) { noi = el('div', tuyChon.boc); khung.appendChild(noi); }

    // Màn chơi đè ô này lên hình nền, nên cảnh cần biết nó cao bao nhiêu thì
    // mới đặt nhân vật đứng trên mép nó được. Câu có hình vẽ cao hơn câu
    // thường cả trăm px nên không đặt sẵn một con số được.
    function baoChieuCao() {
      if (noi === khung) return;
      var mep = 120;   // đoạn trên cùng của ô còn trong suốt, xem .o-hoi
      var toiDa = 0.5; // câu đố dài có thể chiếm hơn nửa khung; quá mức này thì
                       // thà để nhân vật chìm một chút vào đoạn trong suốt còn
                       // hơn dồn hết lên sát thanh trạng thái
      khung.style.setProperty('--day', Math.round(Math.min(
        Math.max(0, noi.offsetHeight - mep),
        khung.offsetHeight * toiDa
      )) + 'px');
    }

    /* --- đề bài --- */

    if (cau.prompt) {
      var dong = el('p', 'prompt', cau.prompt);
      if (tuyChon.coLoa && tuyChon.doc) {
        var loa = el('button', 'loa', '🔊');
        loa.type = 'button';
        loa.title = 'Nghe lại';
        loa.setAttribute('aria-label', 'Nghe lại câu hỏi');
        loa.addEventListener('click', function () { tuyChon.doc(cau.speak || cau.prompt); });
        dong.appendChild(loa);
      }
      noi.appendChild(dong);
    }
    if (cau.art) noi.appendChild(el('div', 'art', cau.art));

    var o = el('span', 'answer-box empty', '?');
    var hang = el('div', 'question');
    if (cau.text) hang.innerHTML = cau.text + ' ';
    hang.appendChild(o);
    if (cau.after) hang.appendChild(el('span', null, ' ' + cau.after));

    var doDai = ((cau.text || '') + (cau.after || '')).replace(/&nbsp;/g, ' ').length;
    if (cau.small || doDai > 12) hang.classList.add('sm');
    noi.appendChild(hang);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    noi.appendChild(phanHoi);

    function traLoi(dung, daNhap) {
      khoa = true;
      thaoPhim();
      if (tuyChon.khiTraLoi) tuyChon.khiTraLoi(dung, daNhap, phanHoi);
    }

    function thaoPhim() {
      if (nghePhim) { document.removeEventListener('keydown', nghePhim); nghePhim = null; }
    }

    /* --- bấm chọn --- */

    if (cau.choices) {
      var boc = el('div', 'choices');
      boc.style.setProperty('--cols', cau.cols || cau.choices.length);

      cau.choices.forEach(function (gt) {
        var nut = el('button', 'choice', String(gt));
        nut.type = 'button';
        nut.addEventListener('click', function () {
          if (khoa) return;
          o.innerHTML = String(gt);
          o.classList.remove('empty');
          var dung = String(gt) === String(cau.answer);
          nut.classList.add(dung ? 'is-ok' : 'is-bad');
          traLoi(dung, gt);
        });
        boc.appendChild(nut);
      });

      noi.appendChild(boc);
      requestAnimationFrame(baoChieuCao);
      return { huy: thaoPhim, oPhanHoi: phanHoi };
    }

    /* --- gõ số --- */

    var toiDa = cau.soChuSo || (cau.thapPhan ? 7 : 3);

    function veLai() {
      o.textContent = daGo === '' ? '?' : daGo;
      o.classList.toggle('empty', daGo === '');
    }

    function go(ch) {
      if (khoa || daGo.length >= toiDa) return;
      if (ch === ',') {
        if (daGo.indexOf(',') !== -1) return;          // chỉ một dấu phẩy
        if (daGo === '') daGo = '0';
      } else if (daGo === '0') {
        daGo = '';
      }
      daGo += ch;
      veLai();
    }

    function xoa() {
      if (khoa) return;
      daGo = daGo.slice(0, -1);
      veLai();
    }

    function nop() {
      if (khoa || daGo === '' || daGo.slice(-1) === ',') return;
      traLoi(bangNhau(daGo, cau.answer), daGo);
    }

    var pad = el('div', 'pad');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function (d) {
      var k = el('button', 'key', d);
      k.type = 'button';
      k.addEventListener('click', function () { go(d); });
      pad.appendChild(k);
    });

    var xl = el('button', 'key fn', '⌫');
    xl.type = 'button';
    xl.addEventListener('click', xoa);
    pad.appendChild(xl);

    var k0 = el('button', 'key', '0');
    k0.type = 'button';
    k0.addEventListener('click', function () { go('0'); });
    pad.appendChild(k0);

    if (cau.thapPhan) {
      // hàng 4: ⌫ 0 ,   —   hàng 5: Xoá | nút nộp
      var phay = el('button', 'key', ',');
      phay.type = 'button';
      phay.addEventListener('click', function () { go(','); });
      pad.appendChild(phay);

      var xoaHet = el('button', 'key fn', 'Xoá');
      xoaHet.type = 'button';
      xoaHet.addEventListener('click', function () {
        if (khoa) return;
        daGo = '';
        veLai();
      });
      pad.appendChild(xoaHet);

      var nop2 = el('button', 'key wide hai-cot', tuyChon.nhanNop || 'Trả lời');
      nop2.type = 'button';
      nop2.addEventListener('click', nop);
      pad.appendChild(nop2);
    } else {
      var xoaHet1 = el('button', 'key fn', 'Xoá');
      xoaHet1.type = 'button';
      xoaHet1.addEventListener('click', function () {
        if (khoa) return;
        daGo = '';
        veLai();
      });
      pad.appendChild(xoaHet1);

      var nop1 = el('button', 'key wide', tuyChon.nhanNop || 'Trả lời');
      nop1.type = 'button';
      nop1.addEventListener('click', nop);
      pad.appendChild(nop1);
    }

    nghePhim = function (ev) {
      if (ev.key >= '0' && ev.key <= '9') { go(ev.key); ev.preventDefault(); }
      else if ((ev.key === ',' || ev.key === '.') && cau.thapPhan) { go(','); ev.preventDefault(); }
      else if (ev.key === 'Backspace') { xoa(); ev.preventDefault(); }
      else if (ev.key === 'Enter') { nop(); ev.preventDefault(); }
    };
    document.addEventListener('keydown', nghePhim);

    veLai();
    noi.appendChild(pad);
    requestAnimationFrame(baoChieuCao);
    return { huy: thaoPhim, oPhanHoi: phanHoi };
  }

  global.OTraLoi = { ve: ve, bangNhau: bangNhau };
})(window);
