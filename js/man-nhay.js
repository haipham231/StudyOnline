/* ===== Màn chơi nhảy đập hộp đáp án =====
   Bé tự di chuyển nhân vật bằng nút trái/phải, nhảy lên lấy đầu đội trúng hộp
   mang đáp án mình chọn. Đúng thì trái tim bay ra, sai thì con ma nhảy ra hù.

   Dùng chung giao kèo với OTraLoi.ve nên game chỉ việc đổi lời gọi:
     ve(khung, cau, tuyChon) → { huy, oPhanHoi }
     tuyChon.khiTraLoi(dung, daChon, oPhanHoi)
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;

  // tự suy ra thư mục ảnh từ vị trí của chính tệp script này
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/man-nhay\.js(\?|$)/.test(src)) return src.replace(/js\/man-nhay\.js.*$/, '');
    }
    return '';
  })();

  var DANG_BE = ['di', 'nhay', 'dung-dau', 'te'];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---------- Dựng bốn đáp án ---------- */

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

  // Đáp án sai phải trông "có lý": cùng độ lớn, cùng số chữ số thập phân.
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

    // Đáp án sai dài ngắn khác hẳn đáp án đúng là bé đoán ra ngay, nên xếp
    // số cùng số chữ số lên trước.
    var daiDung = vietSo(n, le).length;
    ra.sort(function (a, b) {
      return Math.abs(a.length - daiDung) - Math.abs(b.length - daiDung);
    });
    return ra;
  }

  /**
   * Từ hai đến bốn nhãn cho các hộp, luôn có đáp án đúng, không trùng nhau.
   * Câu nào sẵn lựa chọn thì lấy lựa chọn đó, thiếu thì bù bằng số gần đúng.
   * Không bù được nữa thì bày ít hộp thôi — thà ba hộp thật còn hơn một hộp
   * ghi dấu hỏi cho đủ bốn.
   */
  function bonDapAn(cau) {
    var dung = String(cau.answer);
    var ds = [dung];

    (cau.choices || []).forEach(function (c) {
      if (ds.length < 4 && ds.indexOf(String(c)) === -1) ds.push(String(c));
    });

    Q.shuffle(nhieuGan(dung)).forEach(function (c) {
      if (ds.length < 4 && ds.indexOf(c) === -1) ds.push(c);
    });

    return Q.shuffle(ds);
  }

  /* ---------- Màn chơi ---------- */

  var CAO_BE = 74;            // chiều cao khung va chạm của nhân vật, px
  var RONG_BE = 48;

  function ve(khung, cau, tuyChon) {
    tuyChon = tuyChon || {};
    var khoa = !!tuyChon.khoaSan;
    var nhanDS = bonDapAn(cau);

    var san = el('div', 'san-nhay');

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

    /* --- sân đấu --- */
    var dau = el('div', 'san-dau');
    dau.innerHTML = '<div class="nen-ma">' +
      ['🦇', '🕸️', '🌙', '🕷️'].map(function (e, k) {
        return '<span style="left:' + (8 + k * 26) + '%">' + e + '</span>';
      }).join('') + '</div>';

    var hopDS = nhanDS.map(function (nhan) {
      var h = el('div', 'hop-dap');
      h.appendChild(el('span', 'nhan-dap', nhan));
      h.dataset.nhan = nhan;
      dau.appendChild(h);
      return h;
    });

    // Nhãn là chữ dài (tên hình, tên thành phần phép tính…) thì cho hộp cao
    // lên và chữ xuống dòng — ép nhỏ một dòng thì bé không đọc nổi.
    var daiNhat = nhanDS.reduce(function (m, n) { return Math.max(m, String(n).length); }, 0);
    if (daiNhat >= 8) dau.classList.add('nhan-dai');

    var be = el('div', 'be-choi dang-di', DANG_BE.map(function (d) {
      return '<img class="anh-be anh-' + d + '" src="' + GOC + 'assets/ma-ca-rong/' + d +
        '.png" alt="" draggable="false">';
    }).join(''));
    dau.appendChild(be);
    dau.appendChild(el('div', 'mat-dat'));
    san.appendChild(dau);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    san.appendChild(phanHoi);

    /* --- tay lái --- */
    var lai = el('div', 'tay-lai');
    var nutTrai = el('button', 'nut-lai', '◀');
    var nutPhai = el('button', 'nut-lai', '▶');
    var nutNhay = el('button', 'nut-lai nut-nhay', '⬆ NHẢY');
    [nutTrai, nutPhai, nutNhay].forEach(function (b) { b.type = 'button'; });
    nutTrai.setAttribute('aria-label', 'Đi sang trái');
    nutPhai.setAttribute('aria-label', 'Đi sang phải');
    nutNhay.setAttribute('aria-label', 'Nhảy lên');
    lai.appendChild(nutTrai);
    lai.appendChild(nutNhay);
    lai.appendChild(nutPhai);
    san.appendChild(lai);

    san.appendChild(el('p', 'meo-choi',
      'Tính ra đáp án rồi đi tới dưới hộp đó và <b>nhảy đội đầu</b> vào nó.'));

    khung.appendChild(san);

    /* --- vật lý --- */
    var rong = 0, cao = 0, yHop = 0;
    var x = 0, y = 0, vx = 0, vy = 0, duoiDat = true;
    var g = 0, vNhay = 0;
    var sangTrai = false, sangPhai = false;
    var hen = null, xong = false;

    // Game gắn khung vào trang SAU khi gọi ve(), nên lần đo đầu luôn ra 0.
    // Vì vậy mỗi khung hình đều kiểm lại, hễ kích thước đổi là xếp lại sân.
    function doSan() {
      var r = dau.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (r.width === rong && r.height === cao) return true;
      rong = r.width;
      cao = r.height;
      // hộp treo ở lưng chừng, nhảy tới được nhưng phải nhảy
      // Đặt hộp bằng px đo thật chứ không dùng translateX: va chạm đọc
      // offsetLeft, mà offsetLeft không tính phần transform.
      var soHop = hopDS.length;
      var rongHop = Math.max(54, Math.min(104, (rong - 14) / soHop - 9));
      var caoHop = dau.classList.contains('nhan-dai') ? 60 : 46;

      // Treo hộp vừa tầm nhảy: sân cao mấy cũng không để hộp lên quá cao,
      // nếu không cú nhảy dài lê thê, bé chờ chán.
      yHop = Math.max(CAO_BE + 38, Math.min(cao * 0.46, CAO_BE + 112));
      yHop = Math.min(yHop, cao - caoHop - 10);

      hopDS.forEach(function (h, i) {
        h.style.width = Math.round(rongHop) + 'px';
        h.style.left = Math.round((i + 0.5) / soHop * rong - rongHop / 2) + 'px';
        h.style.bottom = Math.round(yHop) + 'px';

        // Nhãn dài đã được cho xuống dòng; còn thừa chỗ nào nữa mới thu chữ.
        var nh = h.firstChild;
        nh.style.transform = '';
        var tiLe = 1;
        var choNgang = rongHop - 10, choDoc = caoHop - 8;
        if (nh.scrollWidth > choNgang) tiLe = Math.min(tiLe, choNgang / nh.scrollWidth);
        if (nh.scrollHeight > choDoc) tiLe = Math.min(tiLe, choDoc / nh.scrollHeight);
        if (tiLe < 1) nh.style.transform = 'scale(' + Math.max(0.5, tiLe).toFixed(3) + ')';
      });
      // nhảy cao hơn mép dưới hộp một quãng cho dễ trúng
      var dinh = (yHop - CAO_BE) + Math.max(26, cao * 0.12);
      var tLen = 0.42;                       // giây để lên tới đỉnh
      vNhay = 2 * dinh / tLen;
      g = vNhay / tLen;
      x = Math.min(Math.max(x || (rong / 2 - RONG_BE / 2), 2), rong - RONG_BE - 2);
      return true;
    }

    var dangHienTai = 'di';
    function doiDang(d) {
      if (d === dangHienTai) return;
      be.classList.remove('dang-' + dangHienTai);
      be.classList.add('dang-' + d);
      dangHienTai = d;
    }

    function datChoBe() {
      be.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(-y) + 'px,0)';
      if (dangHienTai !== 'dung-dau' && dangHienTai !== 'te') doiDang(duoiDat ? 'di' : 'nhay');
      be.classList.toggle('buoc', duoiDat && (sangTrai || sangPhai));
    }

    var truoc = 0, batDau = 0;
    function vong(t) {
      if (xong) return;
      if (!truoc) truoc = t;
      if (!batDau) batDau = t;
      var dt = Math.min(0.05, (t - truoc) / 1000);
      truoc = t;

      var sanOk = doSan();
      // chưa đo được sân, hoặc vừa dựng xong chưa tới 0,3 giây thì chưa tính
      // va chạm — tránh ăn nhầm một câu ngay lúc màn hình đang xếp chỗ
      if (sanOk && !khoa && t - batDau > 300) {
        var toc = 300;
        vx = (sangPhai ? toc : 0) - (sangTrai ? toc : 0);
        x += vx * dt;
        if (x < 2) x = 2;
        if (x > rong - RONG_BE - 2) x = rong - RONG_BE - 2;

        var yTruoc = y;
        vy -= g * dt;
        y += vy * dt;
        if (y <= 0) { y = 0; vy = 0; duoiDat = true; }
        else duoiDat = false;

        // đầu chạm mép dưới hộp đúng lúc đang bay lên
        if (vy > 0 && yTruoc + CAO_BE < yHop && y + CAO_BE >= yHop) {
          var tam = x + RONG_BE / 2;
          for (var i = 0; i < hopDS.length; i++) {
            var h = hopDS[i];
            var tr = h.offsetLeft, ph = tr + h.offsetWidth;
            if (tam >= tr && tam <= ph) { doiTrung(h); break; }
          }
        }
      }
      if (sanOk) datChoBe();
      hen = requestAnimationFrame(vong);
    }

    /* --- đội trúng một hộp --- */
    function doiTrung(h) {
      if (khoa) return;
      khoa = true;
      var nhan = h.dataset.nhan;
      var dung = nhan === String(cau.answer);

      vy = -Math.abs(vy) * 0.35;            // nảy ngược xuống cho ra chất
      h.classList.add('bi-doi', dung ? 'trung' : 'truot');

      var bay = el('div', dung ? 'bay-tim' : 'bay-ma',
        dung ? '💖💖💖' : global.HoatHinh ? global.HoatHinh.ve('ma', 64) : '👻');
      bay.style.left = h.offsetLeft + h.offsetWidth / 2 + 'px';
      bay.style.bottom = (yHop + h.offsetHeight) + 'px';
      dau.appendChild(bay);

      if (dung) {
        doiDang('nhay');
      } else {
        // Đụng đầu một nhịp rồi rơi xuống nằm, sao bay quanh đầu.
        // Không gác bằng cờ xong: game dọn màn chơi ngay trong khiTraLoi,
        // gác vậy thì cú té không bao giờ diễn ra. Gác bằng "ảnh còn trên
        // trang hay không" mới đúng.
        doiDang('dung-dau');
        setTimeout(function () {
          if (!be.isConnected) return;
          doiDang('te');
          be.classList.add('roi');
          y = 0; vy = 0; duoiDat = true;
          // ảnh nằm ngang rộng hơn khung va chạm nhiều, đứng sát mép là lòi
          // ra ngoài sân — kéo vào trong một chút cho gọn
          var loi = 26;
          x = Math.min(Math.max(x, loi), Math.max(loi, rong - RONG_BE - loi));
          datChoBe();
        }, 420);
      }

      var oDung = hopDS.filter(function (z) { return z.dataset.nhan === String(cau.answer); })[0];
      if (!dung && oDung) setTimeout(function () { oDung.classList.add('chi-ra'); }, 700);

      thaoPhim();
      if (tuyChon.khiTraLoi) tuyChon.khiTraLoi(dung, nhan, phanHoi);
    }

    /* --- điều khiển --- */
    function giu(nut, bat, tat) {
      nut.addEventListener('pointerdown', function (ev) { ev.preventDefault(); bat(); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (s) {
        nut.addEventListener(s, function () { tat(); });
      });
    }
    // ảnh vẽ cậu bé nhìn sang trái, nên đi sang phải mới phải lật
    giu(nutTrai, function () { sangTrai = true; be.classList.remove('quay'); },
                 function () { sangTrai = false; });
    giu(nutPhai, function () { sangPhai = true; be.classList.add('quay'); },
                 function () { sangPhai = false; });
    nutNhay.addEventListener('pointerdown', function (ev) { ev.preventDefault(); nhay(); });

    function nhay() {
      if (khoa || !duoiDat) return;
      vy = vNhay;
      duoiDat = false;
    }

    var nghePhim = function (ev) {
      if (khoa) return;
      var k = ev.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { sangTrai = true; be.classList.remove('quay'); ev.preventDefault(); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { sangPhai = true; be.classList.add('quay'); ev.preventDefault(); }
      else if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'Enter') { nhay(); ev.preventDefault(); }
    };
    var thaPhim = function (ev) {
      var k = ev.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') sangTrai = false;
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') sangPhai = false;
    };
    document.addEventListener('keydown', nghePhim);
    document.addEventListener('keyup', thaPhim);

    function doLai() { doSan(); }
    global.addEventListener('resize', doLai);

    function thaoPhim() {
      document.removeEventListener('keydown', nghePhim);
      document.removeEventListener('keyup', thaPhim);
      global.removeEventListener('resize', doLai);
    }

    if (doSan()) datChoBe();
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

  global.ManNhay = { ve: ve, bonDapAn: bonDapAn, _nhieuGan: nhieuGan };
})(window);
