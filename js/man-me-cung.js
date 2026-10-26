/* ===== Màn chơi mê cung ngoài hành tinh =====
   Phi hành gia rơi xuống mê cung. Bé đọc đề, tính ra đáp án, rồi đi tới đúng
   cánh cửa mang số đó. Trong mê cung có rắn bò; bị cắn thì về ô xuất phát
   nhưng KHÔNG tính là trả lời sai — chỉ mất thời gian. Vào cửa sai mới tính
   là sai một câu.

   Dùng chung giao kèo với o-tra-loi.js:
     ve(khung, cau, tuyChon) → { huy, oPhanHoi }
   tuyChon: { khoaSan, nen, vat, muc, khiTraLoi(dung, daChon, oPhanHoi) }
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var V = global.VatTheVuTru;

  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/man-me-cung\.js(\?|$)/.test(src)) return src.replace(/js\/man-me-cung\.js.*$/, '');
    }
    return '';
  })();

  /* Thông số riêng của mê cung theo mức độ. Số câu, số lượt hụt và mức phạt
     thì để MucDo lo, ở đây chỉ lo chuyện mê cung to nhỏ và rắn đông thưa. */
  var THONG_SO = {
    // Lưới rộng hơn cao: khung mê cung trên điện thoại nằm ngang, để lưới
    // vuông thì thừa hai bên mà ô lại bé.
    de:  { cot: 9,  hang: 5, ran: 1, tocDo: 900, duoi: false, boNgoCut: 0.30 },
    vua: { cot: 11, hang: 7, ran: 2, tocDo: 650, duoi: false, boNgoCut: 0.15 },
    kho: { cot: 13, hang: 9, ran: 3, tocDo: 450, duoi: true,  boNgoCut: 0 }
  };

  var MS_MOT_O = 140;          // đi trọn một ô mất bấy nhiêu mili-giây
  var HUONG = [
    { ten: 'len',   dr: -1, dc: 0, nguoc: 'xuong' },
    { ten: 'xuong', dr: 1,  dc: 0, nguoc: 'len' },
    { ten: 'trai',  dr: 0,  dc: -1, nguoc: 'phai' },
    { ten: 'phai',  dr: 0,  dc: 1,  nguoc: 'trai' }
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function cuaHuong(ten) {
    for (var i = 0; i < HUONG.length; i++) if (HUONG[i].ten === ten) return HUONG[i];
    return null;
  }

  /* ---------- Sinh mê cung ---------- */

  /* Đào sâu có quay lui, viết bằng vòng lặp với ngăn xếp.
     Ra mê cung hoàn hảo: giữa hai ô bất kì có đúng một đường đi, nên mọi ô
     đều tới được — ba cửa chắc chắn không bị bí, khỏi phải kiểm lại. */
  function sinhMe(cot, hang, boNgoCut) {
    var o = [];
    var r, c;
    for (r = 0; r < hang; r++) {
      o[r] = [];
      for (c = 0; c < cot; c++) o[r][c] = { len: true, xuong: true, trai: true, phai: true, tham: false };
    }

    function duc(r1, c1, h) {
      o[r1][c1][h.ten] = false;
      o[r1 + h.dr][c1 + h.dc][h.nguoc] = false;
    }

    var nganXep = [[Math.floor(Math.random() * hang), Math.floor(Math.random() * cot)]];
    o[nganXep[0][0]][nganXep[0][1]].tham = true;
    while (nganXep.length) {
      var dinh = nganXep[nganXep.length - 1];
      var chuaTham = [];
      HUONG.forEach(function (h) {
        var nr = dinh[0] + h.dr, nc = dinh[1] + h.dc;
        if (nr < 0 || nr >= hang || nc < 0 || nc >= cot) return;
        if (!o[nr][nc].tham) chuaTham.push(h);
      });
      if (!chuaTham.length) { nganXep.pop(); continue; }
      var h2 = chuaTham[Math.floor(Math.random() * chuaTham.length)];
      duc(dinh[0], dinh[1], h2);
      var nr2 = dinh[0] + h2.dr, nc2 = dinh[1] + h2.dc;
      o[nr2][nc2].tham = true;
      nganXep.push([nr2, nc2]);
    }

    /* Bớt ngõ cụt: ô nào chỉ có một lối thì đục thêm một tường cho thành vòng.
       Mê cung đầy ngõ cụt thì bé nhỏ đi lạc mãi, chán. */
    if (boNgoCut > 0) {
      for (r = 0; r < hang; r++) {
        for (c = 0; c < cot; c++) {
          if (Math.random() >= boNgoCut) continue;
          var loi = HUONG.filter(function (h) { return !o[r][c][h.ten]; });
          if (loi.length !== 1) continue;
          var kin = HUONG.filter(function (h) {
            var nr = r + h.dr, nc = c + h.dc;
            return o[r][c][h.ten] && nr >= 0 && nr < hang && nc >= 0 && nc < cot;
          });
          if (!kin.length) continue;
          duc(r, c, kin[Math.floor(Math.random() * kin.length)]);
        }
      }
    }

    return o;
  }

  // khoảng cách theo đường đi thật (BFS) từ một ô tới mọi ô khác
  function doXa(o, hang, cot, r0, c0) {
    var d = [];
    for (var r = 0; r < hang; r++) { d[r] = []; for (var c = 0; c < cot; c++) d[r][c] = -1; }
    d[r0][c0] = 0;
    var hang_doi = [[r0, c0]];
    while (hang_doi.length) {
      var p = hang_doi.shift();
      HUONG.forEach(function (h) {
        if (o[p[0]][p[1]][h.ten]) return;
        var nr = p[0] + h.dr, nc = p[1] + h.dc;
        if (nr < 0 || nr >= hang || nc < 0 || nc >= cot || d[nr][nc] >= 0) return;
        d[nr][nc] = d[p[0]][p[1]] + 1;
        hang_doi.push([nr, nc]);
      });
    }
    return d;
  }

  /* ---------- Màn chơi ---------- */

  function ve(khung, cau, tuyChon) {
    tuyChon = tuyChon || {};
    var khoa = !!tuyChon.khoaSan;
    var ts = THONG_SO[tuyChon.muc] || THONG_SO.vua;
    var COT = ts.cot, HANG = ts.hang;

    var nhanDS = global.DapAnNhieu.tao(cau, 3);
    while (nhanDS.length < 3) nhanDS.push(nhanDS[0]);   // phòng khi nặn thiếu

    var san = el('div', 'san-me-cung');

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

    /* --- ba cánh cửa, nằm TRÊN mê cung ---
       Nhãn đáp án có khi là cả cụm HTML (phân số lớp 5), nhét vào một ô lưới
       ba chục pixel thì không đọc nổi — nên cửa vẽ thành dải ngang phía trên,
       mỗi cửa rộng một phần ba bề ngang. */
    var daiCua = el('div', 'dai-cua');
    if (V) {
      ['thuong', 'mo', 'chan'].forEach(function (k) {
        daiCua.style.setProperty('--cua-' + k,
          'url(' + V.GOC + 'assets/vu-tru/thuyen/cong-' + k + '.png)');
      });
    }
    var cuaDS = nhanDS.map(function (nhan) {
      var c = el('div', 'mot-cua');
      c.dataset.nhan = nhan;
      // Khung cửa vẽ đứng; ép vào một ô ngang thì hai trụ bên phình ra che
      // mất chữ số. Nên để khung ở trên, số nằm trên một dải riêng bên dưới.
      c.appendChild(el('i', 'cua-khung'));
      c.appendChild(el('span', 'cua-nhan', nhan));
      daiCua.appendChild(c);
      return c;
    });
    // Nhãn có khi là chữ dài ("hình chữ nhật", "chục nghìn") chứ không chỉ là
    // số; dài thì thu chữ lại và cho xuống dòng, không thì tràn khỏi cánh cửa.
    var daiNhat = nhanDS.reduce(function (m, n) {
      return Math.max(m, String(n).replace(/<[^>]+>/g, '').length);
    }, 0);
    if (daiNhat >= 7) daiCua.classList.add('nhan-dai');
    if (daiNhat >= 12) daiCua.classList.add('nhan-rat-dai');

    san.appendChild(daiCua);

    /* --- sân mê cung --- */
    var dau = el('div', 'san-dau san-sao luoi-me');
    if (V && tuyChon.nen) {
      dau.classList.add('co-anh-nen');
      dau.style.backgroundImage = 'url(' + V.duongNen(tuyChon.nen) + ')';
    }
    var lop = el('div', 'lop-me');
    dau.appendChild(lop);
    san.appendChild(dau);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    san.appendChild(phanHoi);

    /* --- nút mở khoá: bắt bé tính xong rồi mới cho đi --- */
    var nutMo = el('button', 'btn go nut-mo-me', '🔓 Mình tính ra rồi!');
    nutMo.type = 'button';
    san.appendChild(nutMo);

    /* --- tay lái bốn hướng --- */
    var lai = el('div', 'tay-lai bon-huong');
    function nut(nhan, ten) {
      var b = el('button', 'nut-lai nut-' + ten, nhan);
      b.type = 'button';
      b.setAttribute('aria-label', { len: 'Đi lên', xuong: 'Đi xuống',
        trai: 'Đi sang trái', phai: 'Đi sang phải' }[ten]);
      lai.appendChild(b);
      return b;
    }
    var nTrai = nut('◀', 'trai'), nLen = nut('▲', 'len'),
        nXuong = nut('▼', 'xuong'), nPhai = nut('▶', 'phai');
    san.appendChild(lai);

    san.appendChild(el('p', 'meo-choi',
      'Tính ra đáp án rồi đi tới <b>cánh cửa mang số đó</b>. Coi chừng rắn!'));

    khung.appendChild(san);

    /* ---------- dựng một lượt ---------- */

    var o, cotCua, rDau, cDau;
    var be = { r: 0, c: 0 };
    var ranDS = [];
    var oRong = 0, le = 0;
    var daMo = false, xong = false, hen = null;
    var di = { trai: false, phai: false, len: false, xuong: false };
    var choDi = 0;               // còn bao lâu nữa mới được bước tiếp
    var beTruoc = { r: 0, c: 0 };

    function dungLuot() {
      o = sinhMe(COT, HANG, ts.boNgoCut);
      rDau = HANG - 1;
      cDau = Math.floor(COT / 2);
      be.r = rDau; be.c = cDau;

      // ba lối thủng trên tường trên cùng, chia đều bề ngang
      cotCua = [Math.floor(COT / 6), Math.floor(COT / 2), COT - 1 - Math.floor(COT / 6)];
      // phòng khi lưới hẹp làm hai cửa trùng cột
      for (var k = 1; k < 3; k++) if (cotCua[k] <= cotCua[k - 1]) cotCua[k] = cotCua[k - 1] + 1;
      cotCua.forEach(function (cc) { if (o[0][cc]) o[0][cc].len = false; });

      // rắn đẻ ở chỗ cách ô xuất phát ít nhất nửa bề ngang, kẻo bé vừa vào đã bị cắn
      var xa = doXa(o, HANG, COT, rDau, cDau);
      var cho = [];
      for (var r = 0; r < HANG; r++) {
        for (var c = 0; c < COT; c++) if (xa[r][c] >= Math.floor(COT / 2)) cho.push([r, c]);
      }
      if (!cho.length) cho.push([0, 0]);
      ranDS = [];
      for (var i = 0; i < ts.ran; i++) {
        var p = cho[Math.floor(Math.random() * cho.length)];
        ranDS.push({
          r: p[0], c: p[1],
          huong: HUONG[Math.floor(Math.random() * 4)].ten,
          nhip: 0,
          duoi: ts.duoi && i === 0,     // mức Khó: con đầu biết đuổi
          nut: null
        });
      }
    }

    /* ---------- vẽ ---------- */

    var DANG = ['ngam', 'trung', 'nga'];
    var phg = el('div', 'phg-me dang-ngam', DANG.map(function (d) {
      var tep = d === 'ngam' ? 'phi-hanh-gia.png' : d === 'trung' ? 'phg-trung.png' : 'phg-nga.png';
      return '<img class="phg-hinh hinh-' + d + '" src="' + GOC + 'assets/vu-tru/' + tep +
        '" alt="" draggable="false">';
    }).join(''));
    var dangPhg = 'ngam';
    function doiDang(d) {
      if (d === dangPhg) return;
      phg.classList.remove('dang-' + dangPhg);
      phg.classList.add('dang-' + d);
      dangPhg = d;
    }

    function veLuoi() {
      var r = dau.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      oRong = Math.floor(Math.min((r.width - 12) / COT, (r.height - 12) / HANG));
      if (oRong < 8) return false;
      le = Math.round((r.width - oRong * COT) / 2);
      var leTren = Math.round((r.height - oRong * HANG) / 2);

      var W = oRong * COT, H = oRong * HANG;
      var duong = [];
      // tường ngoài
      duong.push('M0 0 H' + W + ' M0 ' + H + ' H' + W);
      duong.push('M0 0 V' + H + ' M' + W + ' 0 V' + H);
      for (var rr = 0; rr < HANG; rr++) {
        for (var cc = 0; cc < COT; cc++) {
          var x = cc * oRong, y = rr * oRong;
          if (o[rr][cc].xuong && rr < HANG - 1) duong.push('M' + x + ' ' + (y + oRong) + ' h' + oRong);
          if (o[rr][cc].phai && cc < COT - 1) duong.push('M' + (x + oRong) + ' ' + y + ' v' + oRong);
        }
      }
      // ba lối thủng trên tường trên cùng
      var tren = 'M0 0';
      var moc = [];
      cotCua.forEach(function (cc) { moc.push([cc * oRong, (cc + 1) * oRong]); });
      moc.sort(function (a, b) { return a[0] - b[0]; });
      var x0 = 0;
      tren = '';
      moc.forEach(function (m) {
        if (m[0] > x0) tren += 'M' + x0 + ' 0 H' + m[0] + ' ';
        x0 = m[1];
      });
      if (x0 < W) tren += 'M' + x0 + ' 0 H' + W;
      duong[0] = tren + ' M0 ' + H + ' H' + W;

      lop.style.width = W + 'px';
      lop.style.height = H + 'px';
      lop.style.left = le + 'px';
      lop.style.top = leTren + 'px';
      lop.innerHTML =
        '<svg class="tuong" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">' +
        '<path d="' + duong.join(' ') + '"/></svg>';

      // đèn hiệu ở ô xuất phát
      var den = el('img', 'o-dau');
      den.src = GOC + 'assets/vu-tru/thuyen/den-hieu.png';
      den.alt = '';
      den.style.width = Math.round(oRong * 0.62) + 'px';
      datChoO(den, rDau, cDau);
      lop.appendChild(den);

      // phi hành gia
      lop.appendChild(phg);
      phg.style.width = Math.round(oRong * 0.78) + 'px';
      datChoO(phg, be.r, be.c);

      // rắn
      ranDS.forEach(function (ran) {
        if (!ran.nut) {
          ran.nut = el('img', 'con-ran' + (ran.duoi ? ' ran-duoi' : ''));
          ran.nut.src = GOC + 'assets/hinh/dan/con-vat/ran.webp';
          ran.nut.alt = '';
        }
        ran.nut.style.width = Math.round(oRong * 0.72) + 'px';
        lop.appendChild(ran.nut);
        datChoO(ran.nut, ran.r, ran.c);
      });

      // cửa xếp thẳng hàng với lối thủng
      cuaDS.forEach(function (c, i) {
        var giua = le + (cotCua[i] + 0.5) * oRong;
        c.style.left = Math.round(giua) + 'px';
      });
      return true;
    }

    function datChoO(nut, r, c) {
      var w = nut.offsetWidth || oRong * 0.7;
      var h = nut.offsetHeight || oRong * 0.7;
      nut.style.transform = 'translate3d(' +
        Math.round(c * oRong + (oRong - w) / 2) + 'px,' +
        Math.round(r * oRong + (oRong - h) / 2) + 'px,0)';
    }

    /* ---------- đi lại ---------- */

    function diDuoc(r, c, h) {
      if (o[r][c][h.ten]) return false;
      var nr = r + h.dr, nc = c + h.dc;
      return nr >= 0 && nr < HANG && nc >= 0 && nc < COT;
    }

    function thuBuoc() {
      var ten = di.len ? 'len' : di.xuong ? 'xuong' : di.trai ? 'trai' : di.phai ? 'phai' : null;
      if (!ten) return;
      var h = cuaHuong(ten);

      // đi lên ở hàng trên cùng, ngay dưới một cánh cửa → ra khỏi mê cung
      if (ten === 'len' && be.r === 0) {
        var i = cotCua.indexOf(be.c);
        if (i >= 0 && !o[0][be.c].len) return vaoCua(i);
        return;
      }
      if (!diDuoc(be.r, be.c, h)) return;
      be.r += h.dr; be.c += h.dc;
      datChoO(phg, be.r, be.c);
      choDi = MS_MOT_O;
      kiemRan();
    }

    /* ---------- rắn ---------- */

    function ranBuoc(ran) {
      var duoc = HUONG.filter(function (h) { return diDuoc(ran.r, ran.c, h); });
      if (!duoc.length) return;

      var chon = null;
      if (ran.duoi && Math.random() < 0.34) {
        // con biết đuổi: thỉnh thoảng dò đường ngắn nhất tới chỗ phi hành gia
        var xa = doXa(o, HANG, COT, be.r, be.c);
        var tot = Infinity;
        duoc.forEach(function (h) {
          var d = xa[ran.r + h.dr][ran.c + h.dc];
          if (d >= 0 && d < tot) { tot = d; chon = h; }
        });
      }
      if (!chon) {
        var thang = cuaHuong(ran.huong);
        if (thang && diDuoc(ran.r, ran.c, thang) && Math.random() < 0.7) {
          chon = thang;
        } else {
          // tránh quay đầu, trừ khi cụt đường
          var khac = duoc.filter(function (h) { return h.ten !== cuaHuong(ran.huong).nguoc; });
          var bo = khac.length ? khac : duoc;
          chon = bo[Math.floor(Math.random() * bo.length)];
        }
      }

      var cuR = ran.r, cuC = ran.c;
      ran.r += chon.dr; ran.c += chon.dc;
      ran.huong = chon.ten;
      ran.nut.classList.toggle('quay', chon.ten === 'trai');
      datChoO(ran.nut, ran.r, ran.c);

      // cắn cả khi hai bên đổi chỗ cho nhau trong cùng một nhịp
      if ((ran.r === be.r && ran.c === be.c) ||
          (cuR === be.r && cuC === be.c && ran.r === beTruoc.r && ran.c === beTruoc.c)) {
        biCan();
      }
    }

    function kiemRan() {
      for (var i = 0; i < ranDS.length; i++) {
        if (ranDS[i].r === be.r && ranDS[i].c === be.c) return biCan();
      }
    }

    function biCan() {
      if (khoa || !daMo) return;
      khoa = true;
      doiDang('trung');
      phg.classList.add('bi-can');
      phanHoi.className = 'feedback pop bad';
      phanHoi.innerHTML = '🐍 Bị rắn cắn! Về lại chỗ xuất phát nhé.';
      setTimeout(function () {
        if (xong) return;
        be.r = rDau; be.c = cDau;
        datChoO(phg, be.r, be.c);
        phg.classList.remove('bi-can');
        doiDang('ngam');
        phanHoi.className = 'feedback';
        phanHoi.innerHTML = '&nbsp;';
        khoa = false;
      }, 760);
    }

    /* ---------- vào cửa ---------- */

    function vaoCua(i) {
      if (khoa) return;
      khoa = true;
      var nhan = cuaDS[i].dataset.nhan;
      var dung = nhan === String(cau.answer);

      cuaDS[i].classList.add(dung ? 'mo-ra' : 'chan-lai');
      doiDang(dung ? 'ngam' : 'nga');
      if (!dung) {
        var oDung = cuaDS.filter(function (z) { return z.dataset.nhan === String(cau.answer); })[0];
        if (oDung) setTimeout(function () { oDung.classList.add('chi-ra'); }, 420);
      }

      thaoPhim();
      if (tuyChon.khiTraLoi) tuyChon.khiTraLoi(dung, nhan, phanHoi);
    }

    /* ---------- vòng lặp ---------- */

    var truoc = 0;
    function vong(t) {
      if (xong) return;
      if (!truoc) truoc = t;
      var dt = t - truoc;
      truoc = t;

      if (veLuoiNeuCan()) {
        if (daMo && !khoa) {
          choDi -= dt;
          if (choDi <= 0) {
            beTruoc.r = be.r; beTruoc.c = be.c;
            thuBuoc();
          }
          ranDS.forEach(function (ran) {
            ran.nhip += dt;
            if (ran.nhip >= ts.tocDo) { ran.nhip = 0; ranBuoc(ran); }
          });
        }
      }
      hen = requestAnimationFrame(vong);
    }

    // Game gắn khung vào trang SAU khi gọi ve(), nên lần đo đầu luôn ra 0;
    // phải đo lại tới khi sân có kích thước thật.
    var daVe = false, rongCu = 0, caoCu = 0;
    function veLuoiNeuCan() {
      var r = dau.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (daVe && r.width === rongCu && r.height === caoCu) return true;
      rongCu = r.width; caoCu = r.height;
      if (!veLuoi()) return false;
      daVe = true;
      return true;
    }

    /* ---------- điều khiển ---------- */

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
      if (!h || khoa || !daMo) return;
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

    nutMo.addEventListener('click', function () {
      if (daMo) return;
      daMo = true;
      san.classList.add('da-mo');
      nutMo.remove();
    });

    dungLuot();
    hen = requestAnimationFrame(vong);

    // móc cho kiểm thử: soi trạng thái ván đang chạy và ép vài tình huống
    global.ManMeCung._hien = {
      o: function () { return o; },
      be: be,
      ran: ranDS,
      cot: COT, hang: HANG,
      cotCua: function () { return cotCua; },
      dapAn: String(cau.answer),
      nhan: function () { return cuaDS.map(function (c) { return c.dataset.nhan; }); },
      dauO: function () { return { r: rDau, c: cDau }; },
      mo: function () { daMo = true; san.classList.add('da-mo'); },
      datBe: function (r, c) { be.r = r; be.c = c; datChoO(phg, r, c); },
      canThu: function () { biCan(); },
      vaoCuaThu: function (i) { vaoCua(i); }
    };

    return {
      huy: function () {
        xong = true;
        if (hen) cancelAnimationFrame(hen);
        thaoPhim();
        // thả móc kiểm thử ra, kẻo giữ sống cả ván vừa xong
        if (global.ManMeCung._hien && global.ManMeCung._hien.be === be) global.ManMeCung._hien = null;
      },
      oPhanHoi: phanHoi
    };
  }

  global.ManMeCung = {
    ve: ve,
    THONG_SO: THONG_SO,
    // dành cho kiểm thử tự động
    _sinhMe: sinhMe,
    _doXa: doXa,
    _HUONG: HUONG
  };
})(window);
