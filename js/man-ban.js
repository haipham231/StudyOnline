/* ===== Màn chơi bắn tên lửa vào quái vật =====
   Bé tính ra đáp án, dùng nút trái/phải đẩy phi hành gia tới dưới con quái
   đang ôm đáp án đó rồi bấm BẮN. Tên lửa bay tới, nổ tung:
     - trúng con mang đáp án đúng → quái lăn quay, trái tim bay ra
     - trúng con sai              → quái nhe răng cười, hụt mất nhiên liệu

   Dùng chung giao kèo với o-tra-loi.js:
     ve(khung, cau, tuyChon) → { huy, oPhanHoi }
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, V = global.VatTheVuTru;

  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/man-ban\.js(\?|$)/.test(src)) return src.replace(/js\/man-ban\.js.*$/, '');
    }
    return '';
  })();

  var QUAI = ['nhot-xanh', 'bach-tuoc-tim', 'quy-sung-do', 'gai-xanh', 'long-hong',
    'dia-bay', 'ba-mat-vang', 'bong-ma-den', 'canh-doi-cam', 'xuc-tu-xanh',
    'rong-bot', 'doi-hong', 'sua-bien', 'long-cam', 'xuong-rong'];

  var RONG_PHG = 56;          // bề ngang phi hành gia, px
  var CAO_PHG = 72;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function anh(duong, cls) {
    var i = el('img', cls);
    i.src = GOC + 'assets/vu-tru/' + duong;
    i.alt = '';
    i.draggable = false;
    return i;
  }

  function ve(khung, cau, tuyChon) {
    tuyChon = tuyChon || {};
    var khoa = !!tuyChon.khoaSan;
    var nhanDS = global.DapAnNhieu.tao(cau, 3);
    var tenQuai = Q.shuffle(QUAI.slice()).slice(0, nhanDS.length);

    var san = el('div', 'san-ban');

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
    for (var s = 0; s < 30; s++) {
      sao += '<i style="left:' + (Math.random() * 99).toFixed(1) + '%;top:' +
        (Math.random() * 86).toFixed(1) + '%;animation-delay:' + (Math.random() * 3).toFixed(1) + 's"></i>';
    }
    dau.appendChild(el('div', 'sao-nen', sao));

    // Nền trời và mấy thứ trôi nổi do chặng quyết định, nên chặng nào cũng
    // một bầu trời khác. Sao chấm trắng vẫn giữ cho có cái lấp lánh.
    if (V && tuyChon.nen) {
      dau.classList.add('co-anh-nen');
      dau.style.backgroundImage = 'url(' + V.duongNen(tuyChon.nen) + ')';
    }
    if (V && tuyChon.vat && tuyChon.vat.length) {
      var troi = el('div', 'vat-troi');
      tuyChon.vat.forEach(function (tv, k) {
        var v = el('img', 'mot-vat');
        v.src = V.duongVat(tv);
        v.alt = '';
        v.style.left = (6 + k * 23) + '%';
        v.style.top = (10 + (k % 3) * 26) + '%';
        v.style.animationDelay = (k * 1.7).toFixed(1) + 's';
        v.style.animationDuration = (9 + k * 2.5).toFixed(1) + 's';
        troi.appendChild(v);
      });
      dau.appendChild(troi);
    }

    var quaiDS = nhanDS.map(function (nhan, i) {
      var o = el('div', 'con-quai');
      o.dataset.nhan = nhan;
      o.appendChild(anh('quai/' + tenQuai[i] + '-song.png', 'quai-hinh hinh-song'));
      o.appendChild(anh('quai/' + tenQuai[i] + '-nem.png', 'quai-hinh hinh-nem'));
      o.appendChild(anh('quai/' + tenQuai[i] + '-chet.png', 'quai-hinh hinh-chet'));
      o.appendChild(el('span', 'quai-nhan', nhan));
      dau.appendChild(o);
      return o;
    });

    var phg = el('div', 'phi-hanh-gia dang-ngam');
    phg.appendChild(anh('phi-hanh-gia.png', 'phg-hinh hinh-ngam'));
    phg.appendChild(anh('phg-trung.png', 'phg-hinh hinh-trung'));
    phg.appendChild(anh('phg-nga.png', 'phg-hinh hinh-nga'));
    phg.appendChild(anh('lua-sung.png', 'phg-lua'));
    dau.appendChild(phg);
    san.appendChild(dau);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    san.appendChild(phanHoi);

    /* --- tay lái --- */
    var lai = el('div', 'tay-lai');
    var nutTrai = el('button', 'nut-lai', '◀');
    var nutBan = el('button', 'nut-lai nut-ban', '🚀 BẮN');
    var nutPhai = el('button', 'nut-lai', '▶');
    [nutTrai, nutBan, nutPhai].forEach(function (b) { b.type = 'button'; });
    nutTrai.setAttribute('aria-label', 'Dịch sang trái');
    nutPhai.setAttribute('aria-label', 'Dịch sang phải');
    nutBan.setAttribute('aria-label', 'Bắn tên lửa');
    lai.appendChild(nutTrai);
    lai.appendChild(nutBan);
    lai.appendChild(nutPhai);
    san.appendChild(lai);

    san.appendChild(el('p', 'meo-choi',
      'Tính ra đáp án rồi ngắm con quái ôm số đó mà <b>bắn</b>.'));

    khung.appendChild(san);

    /* --- bố trí và điều khiển --- */
    var rong = 0, cao = 0, x = 0, dich = null;
    var sangTrai = false, sangPhai = false, hen = null, xong = false;

    function doSan() {
      var r = dau.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (r.width === rong && r.height === cao) return true;
      rong = r.width;
      cao = r.height;

      var n = quaiDS.length;
      var rongQuai = Math.max(68, Math.min(104, (rong - 12) / n - 10));
      quaiDS.forEach(function (o, i) {
        o.style.width = Math.round(rongQuai) + 'px';
        o.style.left = Math.round((i + 0.5) / n * rong - rongQuai / 2) + 'px';
        o.style.top = Math.round(Math.max(8, cao * 0.05)) + 'px';
        o.style.height = '116px';
      });
      x = Math.min(Math.max(x || (rong / 2 - RONG_PHG / 2), 4), rong - RONG_PHG - 4);
      return true;
    }

    function ngam() {
      var tam = x + RONG_PHG / 2, gan = null, d = 1e9;
      quaiDS.forEach(function (o) {
        var c = o.offsetLeft + o.offsetWidth / 2;
        if (Math.abs(c - tam) < d) { d = Math.abs(c - tam); gan = o; }
      });
      if (gan !== dich) {
        quaiDS.forEach(function (o) { o.classList.remove('bi-ngam'); });
        if (gan) gan.classList.add('bi-ngam');
        dich = gan;
      }
    }

    function datChoPhg() {
      phg.style.transform = 'translate3d(' + Math.round(x) + 'px,0,0)';
    }

    var truoc = 0;
    function vong(t) {
      if (xong) return;
      if (!truoc) truoc = t;
      var dt = Math.min(0.05, (t - truoc) / 1000);
      truoc = t;
      if (doSan()) {
        if (!khoa) {
          var toc = 300;
          x += ((sangPhai ? toc : 0) - (sangTrai ? toc : 0)) * dt;
          x = Math.min(Math.max(x, 4), rong - RONG_PHG - 4);
        }
        datChoPhg();
        ngam();
      }
      hen = requestAnimationFrame(vong);
    }

    /* --- bắn --- */
    function ban() {
      if (khoa || !dich) return;
      khoa = true;
      var muc = dich;
      phg.classList.add('dang-ban');
      setTimeout(function () { phg.classList.remove('dang-ban'); }, 260);

      var tuX = x + RONG_PHG - 6, tuY = cao - 14 - CAO_PHG * 0.58;
      var toiX = muc.offsetLeft + muc.offsetWidth / 2;
      var toiY = muc.offsetTop + muc.offsetHeight * 0.55;

      var tl = anh('ten-lua.png', 'ten-lua-bay');
      // ảnh tên lửa chúc mũi lên chếch phải 45°, xoay thêm cho đúng hướng bay
      var goc = Math.atan2(toiY - tuY, toiX - tuX) * 180 / Math.PI + 45;
      tl.style.left = tuX + 'px';
      tl.style.top = tuY + 'px';
      tl.style.transform = 'translate(-50%,-50%) rotate(' + goc.toFixed(1) + 'deg)';
      dau.appendChild(tl);

      requestAnimationFrame(function () {
        tl.style.transition = 'transform 0.42s cubic-bezier(0.3, 0, 0.8, 1)';
        tl.style.transform = 'translate(-50%,-50%) translate(' + (toiX - tuX) + 'px,' +
          (toiY - tuY) + 'px) rotate(' + goc.toFixed(1) + 'deg)';
      });

      setTimeout(function () { if (!xong || tl.isConnected) trungDich(muc, tl, toiX, toiY); }, 440);
    }

    function trungDich(muc, tl, toiX, toiY) {
      if (tl && tl.parentNode) tl.parentNode.removeChild(tl);
      var nhan = muc.dataset.nhan;
      var dung = nhan === String(cau.answer);

      var no = anh('no.png', 'vu-no');
      no.style.left = toiX + 'px';
      no.style.top = toiY + 'px';
      dau.appendChild(no);
      setTimeout(function () { if (no.parentNode) no.parentNode.removeChild(no); }, 700);

      if (dung) {
        muc.classList.add('da-chet');
        var tim = el('div', 'bay-tim', '💖💖💖');
        tim.style.left = toiX + 'px';
        tim.style.bottom = (cao - toiY + 20) + 'px';
        dau.appendChild(tim);
      } else {
        muc.classList.add('nhon-nhao');
        choiDaLai(muc);
        var oDung = quaiDS.filter(function (o) { return o.dataset.nhan === String(cau.answer); })[0];
        if (oDung) setTimeout(function () { oDung.classList.add('chi-ra'); }, 900);
      }

      thaoPhim();
      if (tuyChon.khiTraLoi) tuyChon.khiTraLoi(dung, nhan, phanHoi);
    }

    /* --- bắn trật thì con quái chọi đá lại, phi hành gia ngã --- */
    function choiDaLai(muc) {
      setTimeout(function () {
        if (!dau.isConnected) return;
        muc.classList.remove('nhon-nhao');
        muc.classList.add('dang-nem');

        var tuX = muc.offsetLeft + muc.offsetWidth * 0.78;
        var tuY = muc.offsetTop + muc.offsetHeight * 0.5;
        var toiX = x + RONG_PHG * 0.5;
        var toiY = cao - 10 - CAO_PHG * 0.62;

        var da = anh('da.png', 'hon-da');
        da.style.left = tuX + 'px';
        da.style.top = tuY + 'px';
        dau.appendChild(da);

        requestAnimationFrame(function () {
          da.style.transition = 'transform 0.42s cubic-bezier(0.35, 0, 0.9, 1)';
          da.style.transform = 'translate(-50%,-50%) translate(' + (toiX - tuX) + 'px,' +
            (toiY - tuY) + 'px) rotate(540deg)';
        });

        setTimeout(function () {
          if (da.parentNode) da.parentNode.removeChild(da);
          if (!dau.isConnected) return;
          // trúng đá: bật ngửa ra rồi nằm luôn
          doiDangPhg('trung');
          var vun = anh('da-vun.png', 'da-vun-bay');
          vun.style.left = toiX + 'px';
          vun.style.top = toiY + 'px';
          dau.appendChild(vun);
          setTimeout(function () { if (vun.parentNode) vun.parentNode.removeChild(vun); }, 620);
          setTimeout(function () {
            if (dau.isConnected) doiDangPhg('nga');
          }, 360);
        }, 440);
      }, 240);
    }

    var dangPhg = 'ngam';
    function doiDangPhg(d) {
      if (d === dangPhg) return;
      phg.classList.remove('dang-' + dangPhg);
      phg.classList.add('dang-' + d);
      dangPhg = d;
    }

    /* --- nút bấm và bàn phím --- */
    function giu(nut, bat, tat) {
      nut.addEventListener('pointerdown', function (ev) { ev.preventDefault(); bat(); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (s) {
        nut.addEventListener(s, function () { tat(); });
      });
    }
    giu(nutTrai, function () { sangTrai = true; }, function () { sangTrai = false; });
    giu(nutPhai, function () { sangPhai = true; }, function () { sangPhai = false; });
    nutBan.addEventListener('pointerdown', function (ev) { ev.preventDefault(); ban(); });

    // bấm thẳng vào con quái cũng chọn được, khỏi phải rê
    quaiDS.forEach(function (o) {
      o.addEventListener('pointerdown', function (ev) {
        if (khoa) return;
        ev.preventDefault();
        x = Math.min(Math.max(o.offsetLeft + o.offsetWidth / 2 - RONG_PHG / 2, 4), rong - RONG_PHG - 4);
        datChoPhg();
        ngam();
      });
    });

    var nghePhim = function (ev) {
      if (khoa) return;
      var k = ev.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { sangTrai = true; ev.preventDefault(); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { sangPhai = true; ev.preventDefault(); }
      else if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'Enter') { ban(); ev.preventDefault(); }
    };
    var thaPhim = function (ev) {
      var k = ev.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') sangTrai = false;
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') sangPhai = false;
    };
    document.addEventListener('keydown', nghePhim);
    document.addEventListener('keyup', thaPhim);

    function thaoPhim() {
      document.removeEventListener('keydown', nghePhim);
      document.removeEventListener('keyup', thaPhim);
    }

    // Ảnh đang ẩn thì trình duyệt hay để tới lúc cần mới tải, đổi dáng xong
    // lại trống một nhịp. Nạp trước hết cho chắc.
    tenQuai.forEach(function (t) {
      ['song', 'nem', 'chet'].forEach(function (d) {
        var i = new Image();
        i.src = GOC + 'assets/vu-tru/quai/' + t + '-' + d + '.png';
      });
    });
    ['phg-trung', 'phg-nga', 'da', 'da-vun', 'ten-lua', 'no'].forEach(function (t) {
      var i = new Image();
      i.src = GOC + 'assets/vu-tru/' + t + '.png';
    });

    if (doSan()) { datChoPhg(); ngam(); }
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

  global.ManBan = { ve: ve, QUAI: QUAI };
})(window);
