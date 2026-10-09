/* ===== Màn chơi lái phi thuyền tới ô đáp án =====
   Bé lái phi thuyền tự do bằng bốn phím lên xuống trái phải, bay chạm vào
   cổng mang đáp án đúng. Chạm trúng thì cổng mở, trái tim bay ra; chạm sai
   thì nổ một cái và hụt nhiên liệu.

   Dùng chung giao kèo với o-tra-loi.js:
     ve(khung, cau, tuyChon) → { huy, oPhanHoi }
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var V = global.VatTheVuTru;

  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/man-lai\.js(\?|$)/.test(src)) return src.replace(/js\/man-lai\.js.*$/, '');
    }
    return '';
  })();

  var RONG_TH = 52, CAO_TH = 40;      // khung va chạm của phi thuyền

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function ve(khung, cau, tuyChon) {
    tuyChon = tuyChon || {};
    var khoa = !!tuyChon.khoaSan;
    var nhanDS = global.DapAnNhieu.tao(cau, 4);

    var san = el('div', 'san-lai');

    /* --- đề bài --- */
    var oHoi = el('div', 'san-hoi');
    if (cau.prompt) {
      var dong = el('p', 'prompt', cau.prompt);
      if (tuyChon.coLoa && tuyChon.doc) {
        var loa = el('button', 'loa', '🔊');
        loa.type = 'button';
        loa.setAttribute('aria-label', 'Nghe lại câu hỏi');
        loa.addEventListener('click', function () { tuyChon.doc(cau.speak || cau.prompt); });
        dong.appendChild(loa);
      }
      oHoi.appendChild(dong);
    }
    if (cau.art) oHoi.appendChild(el('div', 'art', cau.art));
    if (cau.text) {
      oHoi.appendChild(el('div', 'question sm',
        cau.text + ' <span class="answer-box empty">?</span>' + (cau.after ? ' ' + cau.after : '')));
    } else if (cau.after) {
      oHoi.appendChild(el('div', 'don-vi', 'Đáp án tính bằng <b>' + cau.after + '</b>'));
    }
    san.appendChild(oHoi);

    /* --- bầu trời --- */
    var dau = el('div', 'san-dau san-sao');
    var sao = '';
    for (var s = 0; s < 34; s++) {
      sao += '<i style="left:' + (Math.random() * 99).toFixed(1) + '%;top:' +
        (Math.random() * 96).toFixed(1) + '%;animation-delay:' + (Math.random() * 3).toFixed(1) + 's"></i>';
    }
    dau.appendChild(el('div', 'sao-nen', sao));

    var congDS = nhanDS.map(function (nhan) {
      var c = el('div', 'cong-dap');
      c.dataset.nhan = nhan;
      c.appendChild(el('span', 'cong-nhan', nhan));
      dau.appendChild(c);
      return c;
    });

    var thuyen = el('div', 'phi-thuyen-lai', V ? V.phiThuyen(52) : '🚀');
    dau.appendChild(thuyen);
    san.appendChild(dau);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    san.appendChild(phanHoi);

    /* --- tay lái bốn hướng --- */
    var lai = el('div', 'tay-lai bon-huong');
    function nut(nhan, ten) {
      var b = el('button', 'nut-lai nut-' + ten, nhan);
      b.type = 'button';
      b.setAttribute('aria-label', { len: 'Bay lên', xuong: 'Bay xuống',
        trai: 'Bay sang trái', phai: 'Bay sang phải' }[ten]);
      lai.appendChild(b);
      return b;
    }
    var nTrai = nut('◀', 'trai'), nLen = nut('▲', 'len'),
        nXuong = nut('▼', 'xuong'), nPhai = nut('▶', 'phai');
    san.appendChild(lai);

    san.appendChild(el('p', 'meo-choi',
      'Lái phi thuyền <b>bay chạm</b> vào cổng mang đáp án đúng.'));

    khung.appendChild(san);

    /* --- bố trí --- */
    var rong = 0, cao = 0, x = 0, y = 0;
    var di = { trai: false, phai: false, len: false, xuong: false };
    var hen = null, xong = false, batDau = 0;

    function doSan() {
      var r = dau.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (r.width === rong && r.height === cao) return true;
      rong = r.width;
      cao = r.height;

      // Cổng xếp thành một cột sát mép phải, thẳng hàng nhau. Để so le thì
      // bay ngang hay quệt nhầm cổng khác, bé ức chế; thẳng hàng thì chỉ cần
      // canh đúng độ cao rồi lao sang phải — đúng cái kỹ năng mình muốn rèn.
      var n = congDS.length;
      var rongCong = Math.max(62, Math.min(96, rong * 0.26));
      var caoCong = Math.max(34, Math.min(52, (cao - 16 - (n - 1) * 16) / n));
      var khoang = n > 1 ? (cao - 16 - n * caoCong) / (n - 1) : 0;
      congDS.forEach(function (c, i) {
        c.style.width = Math.round(rongCong) + 'px';
        c.style.height = Math.round(caoCong) + 'px';
        c.style.left = Math.round(rong - rongCong - 8) + 'px';
        c.style.top = Math.round(8 + i * (caoCong + khoang)) + 'px';
      });
      x = Math.min(Math.max(x || 8, 2), rong - RONG_TH - 2);
      y = Math.min(Math.max(y || (cao / 2 - CAO_TH / 2), 2), cao - CAO_TH - 2);
      return true;
    }

    function datChoThuyen() {
      thuyen.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';
    }

    var truoc = 0;
    function vong(t) {
      if (xong) return;
      if (!truoc) truoc = t;
      if (!batDau) batDau = t;
      var dt = Math.min(0.05, (t - truoc) / 1000);
      truoc = t;

      var ok = doSan();
      if (ok && !khoa) {
        var toc = 250;
        x += ((di.phai ? toc : 0) - (di.trai ? toc : 0)) * dt;
        y += ((di.xuong ? toc : 0) - (di.len ? toc : 0)) * dt;
        x = Math.min(Math.max(x, 2), rong - RONG_TH - 2);
        y = Math.min(Math.max(y, 2), cao - CAO_TH - 2);
        thuyen.classList.toggle('vut-ga', di.trai || di.phai || di.len || di.xuong);

        // chừa nửa giây đầu, tránh ăn nhầm lúc màn hình đang xếp chỗ
        if (t - batDau > 400) {
          for (var i = 0; i < congDS.length; i++) {
            var c = congDS[i];
            if (x + RONG_TH > c.offsetLeft && x < c.offsetLeft + c.offsetWidth &&
                y + CAO_TH > c.offsetTop && y < c.offsetTop + c.offsetHeight) {
              chamCong(c);
              break;
            }
          }
        }
      }
      if (ok) datChoThuyen();
      hen = requestAnimationFrame(vong);
    }

    function chamCong(c) {
      if (khoa) return;
      khoa = true;
      var nhan = c.dataset.nhan;
      var dung = nhan === String(cau.answer);

      c.classList.add(dung ? 'mo-ra' : 'chan-lai');
      thuyen.classList.remove('vut-ga');

      if (dung) {
        var tim = el('div', 'bay-tim', '💖💖💖');
        tim.style.left = (c.offsetLeft + c.offsetWidth / 2) + 'px';
        tim.style.bottom = (cao - c.offsetTop + 14) + 'px';
        dau.appendChild(tim);
      } else {
        thuyen.classList.add('va-cham');
        var no = el('img', 'vu-no');
        no.src = GOC + 'assets/vu-tru/no.png';
        no.alt = '';
        no.style.left = (x + RONG_TH / 2) + 'px';
        no.style.top = (y + CAO_TH / 2) + 'px';
        dau.appendChild(no);
        setTimeout(function () { if (no.parentNode) no.parentNode.removeChild(no); }, 700);
        var oDung = congDS.filter(function (z) { return z.dataset.nhan === String(cau.answer); })[0];
        if (oDung) setTimeout(function () { oDung.classList.add('chi-ra'); }, 500);
      }

      thaoPhim();
      if (tuyChon.khiTraLoi) tuyChon.khiTraLoi(dung, nhan, phanHoi);
    }

    /* --- điều khiển --- */
    function giu(nut, ten) {
      nut.addEventListener('pointerdown', function (ev) { ev.preventDefault(); di[ten] = true; });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (s) {
        nut.addEventListener(s, function () { di[ten] = false; });
      });
    }
    giu(nTrai, 'trai'); giu(nPhai, 'phai'); giu(nLen, 'len'); giu(nXuong, 'xuong');

    var BAN_PHIM = {
      ArrowLeft: 'trai', a: 'trai', A: 'trai',
      ArrowRight: 'phai', d: 'phai', D: 'phai',
      ArrowUp: 'len', w: 'len', W: 'len',
      ArrowDown: 'xuong', s: 'xuong', S: 'xuong'
    };
    var nghePhim = function (ev) {
      var h = BAN_PHIM[ev.key];
      if (!h || khoa) return;
      di[h] = true;
      ev.preventDefault();
    };
    var thaPhim = function (ev) {
      var h = BAN_PHIM[ev.key];
      if (h) di[h] = false;
    };
    document.addEventListener('keydown', nghePhim);
    document.addEventListener('keyup', thaPhim);

    function thaoPhim() {
      document.removeEventListener('keydown', nghePhim);
      document.removeEventListener('keyup', thaPhim);
    }

    if (doSan()) datChoThuyen();
    hen = requestAnimationFrame(vong);

    return {
      huy: function () {
        xong = true;
        if (hen) cancelAnimationFrame(hen);
        thaoPhim();
      },
      oPhanHoi: phanHoi
    };
  }

  global.ManLai = { ve: ve };
})(window);
