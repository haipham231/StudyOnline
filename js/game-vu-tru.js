/* ===== Game "Du hành vũ trụ" =====
   Bay qua sáu hành tinh. Giải đúng được tiếp nhiên liệu và tiến một chặng,
   sai thì hụt nhiên liệu; hết nhiên liệu là phải bay lại hành tinh đó.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, T = global.ToanL5, V = global.VatTheVuTru;
  var STORE = 'studyonline:game-vu-tru';

  var NHIEN_LIEU_DAU = 100;
  var THUONG = 8;     // mỗi câu đúng được tiếp thêm
  var PHAT = 30;      // mỗi câu sai hụt đi

  function mix() {
    var ds = Array.prototype.slice.call(arguments);
    // giữ lại danh sách để MucDo bớt dạng khi chơi mức Dễ
    var f = function () { return Q.pick(ds)(); };
    f.ds = ds;
    return f;
  }

  /* Bộ chặng mặc định của lớp 5. Dựng muộn, vì trang lớp khác không nạp
     ToanL5 — gọi sớm là cả mô-đun vỡ lúc nạp. */
  function boDeMacDinh() {
    var T = global.ToanL5;
    return [
    { ten: 'Sao Phân Số', emoji: '🪐', mau: '#ff8fd0', hanhTinh: 'vanh-bang', nen: 'thien-ha', soCau: 6, hinh: 'troi/sao-tho',
      mota: 'Rút gọn, quy đồng, cộng trừ nhân chia phân số',
      de: mix(T.rutGon, T.quyDongMauSo, T.congTruPhanSo, T.nhanChiaPhanSo, T.soSanhPhanSo) },

    { ten: 'Sao Thập Phân', emoji: '💧', mau: '#4aa8ff', hanhTinh: 'may', nen: 'vung-sau', soCau: 6, hinh: 'troi/may',
      mota: 'Bốn phép tính với số thập phân',
      de: mix(T.congTruThapPhan, T.nhanHaiThapPhan, T.chiaThapPhanChoThapPhan, T.lamTron) },

    { ten: 'Sao Phần Trăm', emoji: '🔆', mau: '#ffc93c', hanhTinh: 'nam', nen: 'tinh-van', soCau: 6, hinh: 'troi/ngoi-sao',
      mota: 'Ba dạng bài về tỉ số phần trăm',
      de: mix(T.giaTriPhanTram, T.timSoBanDau, T.tiSoPhanTram, T.phanTramThucTe) },

    { ten: 'Sao Hình Học', emoji: '🧊', mau: '#2fcf90', hanhTinh: 'bang-gia', nen: 'vanh-da', soCau: 7, hinh: 'troi/cau-vong',
      mota: 'Diện tích, thể tích và hình tròn',
      de: mix(T.dienTichTamGiac, T.dienTichHinhThang, T.dienTichBinhHanh, T.hinhTron,
              T.theTich, T.dienTichXungQuanh) },

    { ten: 'Sao Đo Lường', emoji: '⏳', mau: '#8b7bf7', hanhTinh: 'pha-le', nen: 'hanh-tinh-khi', soCau: 7, hinh: 'troi/mat-trang',
      mota: 'Đổi đơn vị đo và số đo thời gian',
      de: mix(T.doiDonVi, T.thoiGian, T.timX) },

    { ten: 'Trạm Thiên Hà', emoji: '🌌', mau: '#ff7a7a', hanhTinh: 'dung-nham', nen: 'dung-nham', soCau: 8, dich: true,
      mota: 'Chặng cuối — trộn toàn bộ chương trình, có cả tính ngược',
      de: mix(T.chuyenDong, T.trungBinhCong, T.tinhNguocTamGiac, T.tinhNguocHinhThang,
              T.banKinhTuChuVi, T.dienTichPhanToMau, T.beNuoc, T.tongTi) }
    ];
  }

  var CHANG = T ? boDeMacDinh() : [];

  /* ---------- lưu tiến độ ---------- */

  function doc() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || 'null') || { mo: 1, sao: {}, veDich: false };
    } catch (e) {
      return { mo: 1, sao: {}, veDich: false };
    }
  }

  function ghi(tt) {
    try { localStorage.setItem(STORE, JSON.stringify(tt)); } catch (e) { /* bỏ qua */ }
  }

  /* ---------- tiện ích ---------- */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function confetti() {
    var mau = ['#4aa8ff', '#8b7bf7', '#2fcf90', '#ffc93c', '#ff7a7a', '#ff8fd0'];
    var lop = el('div', 'confetti');
    for (var i = 0; i < 80; i++) {
      var b = document.createElement('i');
      b.style.left = Math.random() * 100 + '%';
      b.style.background = mau[i % mau.length];
      b.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
      b.style.animationDelay = (Math.random() * 0.7) + 's';
      lop.appendChild(b);
    }
    document.body.appendChild(lop);
    setTimeout(function () { lop.remove(); }, 4500);
  }

  function saoNen(soLuong) {
    var s = '';
    for (var i = 0; i < soLuong; i++) {
      s += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' +
           (Math.random() * 86).toFixed(1) + '%;animation-delay:' +
           (Math.random() * 3).toFixed(1) + 's;opacity:' + (0.3 + Math.random() * 0.6).toFixed(2) + '"></i>';
    }
    return s;
  }

  var goc, tt, van;

  function thaoPhim() {
    if (van && van.oTraLoi) { van.oTraLoi.huy(); van.oTraLoi = null; }
  }

  /* ---------- Bản đồ hành trình ---------- */

  function veBanDo() {
    thaoPhim();
    tt = doc();
    goc.innerHTML = '';

    var khung = el('div', 'panel ban-do');
    khung.appendChild(el('div', 'cot-truyen',
      V.phiThuyen(70) +
      '<p>Phi hành gia ơi! Hãy bay qua <b>' + CHANG.length + ' hành tinh</b> để tới Trạm Thiên Hà. ' +
      'Mỗi lời giải đúng cho ta thêm nhiên liệu, giải sai thì hụt mất — cạn nhiên liệu là phải quay lại.</p>'));

    if (global.MucDo) khung.appendChild(global.MucDo.veChon(STORE, veBanDo));

    var tongSao = 0;
    Object.keys(tt.sao).forEach(function (k) { tongSao += tt.sao[k]; });
    khung.appendChild(el('p', 'lead',
      '⭐ Đã có <b>' + tongSao + '/' + (CHANG.length * 3) + ' sao</b>' +
      (tt.veDich ? ' · 🏅 Đã tới được Trạm Thiên Hà!' : '')));

    var ds = el('div', 'chang-list');
    CHANG.forEach(function (chang, i) {
      var khoa = i >= tt.mo;
      var sao = tt.sao[i] || 0;

      var nut = el('button', 'chang' + (khoa ? ' khoa' : '') + (chang.dich ? ' boss' : ''));
      nut.type = 'button';
      nut.disabled = khoa;
      nut.style.setProperty('--mau', chang.mau);
      nut.innerHTML =
        '<span class="so">' + (khoa ? '🔒' : V.hanhTinh(chang.hanhTinh, 46)) + '</span>' +
        '<span class="chi-tiet"><b>Chặng ' + (i + 1) + ' · ' + chang.ten + '</b>' +
        '<small>' + (khoa ? 'Qua chặng trước để mở khoá' : chang.mota) + '</small></span>' +
        '<span class="sao">' + (khoa ? '' : '⭐'.repeat(sao) +
          '<span class="mo-sao">' + '⭐'.repeat(3 - sao) + '</span>') + '</span>';
      if (!khoa) nut.addEventListener('click', function () { bayToi(i); });
      ds.appendChild(nut);
    });
    khung.appendChild(ds);

    if (tt.mo > 1 || tt.veDich) {
      var lamLai = el('button', 'btn ghost', '↩︎ Bay lại từ đầu');
      lamLai.type = 'button';
      lamLai.addEventListener('click', function () {
        if (confirm('Xoá hết tiến độ và bay lại từ hành tinh đầu tiên?')) {
          ghi({ mo: 1, sao: {}, veDich: false });
          veBanDo();
        }
      });
      khung.appendChild(el('div', 'actions')).appendChild(lamLai);
    }

    goc.appendChild(khung);
  }

  /* ---------- Bay một chặng ---------- */

  function bayToi(i) {
    var chang = CHANG[i];
    var muc = global.MucDo ? global.MucDo.doc(STORE) : 'vua';
    van = { chang: chang, chiSo: i, buoc: 0, nhienLieu: NHIEN_LIEU_DAU, daRa: {},
      soCau: global.MucDo ? global.MucDo.soCau(chang.soCau, muc) : chang.soCau,
      phat: global.MucDo ? global.MucDo.phat(PHAT, muc) : PHAT,
      deBo: global.MucDo ? global.MucDo.de(chang.de, muc) : chang.de };
    raCauHoi();
  }

  function sinhCau() {
    var q, khoa, lan = 0;
    do {
      q = typeof van.deBo === 'function' ? van.deBo() : Q.pick(van.deBo)();
      khoa = (q.prompt || '') + (q.text || '') + (q.after || '') + q.answer;
      lan++;
    } while (van.daRa[khoa] && lan < 30);
    van.daRa[khoa] = true;
    return q;
  }

  function raCauHoi() {
    thaoPhim();
    van.cau = sinhCau();
    ve();
  }

  /* ---------- Vẽ màn chơi ---------- */

  // Chặng lẻ bắn tên lửa, chặng chẵn lái phi thuyền — xen kẽ cho đỡ chán.
  function kieuMan(i) { return i % 2 === 0 ? 'ban' : 'lai'; }

  function ve(hieuUng) {
    var chang = van.chang;
    goc.innerHTML = '';

    var khung = el('div', 'panel san-vu-tru');
    khung.style.setProperty('--mau', chang.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', chang.emoji + ' Chặng ' + (van.chiSo + 1) + ' · ' + chang.ten));

    var mucNL = Math.max(0, van.nhienLieu);
    tren.appendChild(el('span', 'nhien-lieu' + (mucNL <= 40 ? ' can' : ''),
      '⛽ <span class="thanh"><i style="width:' + mucNL + '%"></i></span> ' + mucNL + '%'));
    khung.appendChild(tren);

    var quyDao = el('div', 'duong-gon');
    for (var b = 0; b < van.soCau; b++) {
      quyDao.appendChild(el('i', 'moc' + (b < van.buoc ? ' qua' : '')));
    }
    quyDao.appendChild(el('span', 'trum', chang.emoji));
    khung.appendChild(quyDao);

    var kieu = kieuMan(van.chiSo);
    khung.appendChild(el('div', 'meta',
      '<span>' + (kieu === 'ban' ? '🚀 Bắn quái' : '🛸 Lái phi thuyền') +
      ' · Câu ' + Math.min(van.buoc + 1, van.soCau) + ' / ' + van.soCau + '</span>' +
      '<span class="hits">🛰️ ' + van.buoc + '/' + van.soCau + '</span>'));

    var man = kieu === 'ban' ? global.ManBan : global.ManLai;
    van.oTraLoi = man.ve(khung, van.cau, {
      khoaSan: van.dangChuyen,
      nen: chang.nen,
      vat: chang.vat || V.vatTheoNen(chang.nen),
      khiTraLoi: function (dung, _daChon, phanHoi) { cham(dung, van.cau, phanHoi); }
    });

    goc.appendChild(khung);
  }

  /* ---------- Chấm một câu ---------- */

  function cham(dung, q, phanHoi) {
    thaoPhim();

    if (dung) {
      van.buoc += 1;
      van.nhienLieu = Math.min(NHIEN_LIEU_DAU, van.nhienLieu + THUONG);
      phanHoi.className = 'feedback pop ok';
      phanHoi.textContent = Q.pick(['🚀 Chuẩn xác!', '⛽ Tiếp nhiên liệu thành công!',
                                    '🌟 Bay tiếp nào!', '👏 Giỏi lắm!']);

      setTimeout(function () {
        if (van.buoc >= van.soCau) return toiNoi();
        van.dangChuyen = true; ve(); van.dangChuyen = false;
        setTimeout(raCauHoi, 520);
      }, 720);
      return;
    }

    van.nhienLieu -= van.phat;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '💥 Chưa đúng — đáp án là <b>' + q.answer + '</b>' +
                        (q.after ? ' ' + q.after : '') + '<br><small>Hụt mất ' + van.phat + '% nhiên liệu</small>';

    setTimeout(function () {
      if (van.nhienLieu <= 0) return canNhienLieu();
      van.dangChuyen = true; ve(); van.dangChuyen = false;
      setTimeout(raCauHoi, 300);
      // chờ lâu hơn chút: còn phải xem con quái chọi đá và phi hành gia ngã
    }, 2800);
  }

  /* ---------- Tới nơi / cạn nhiên liệu ---------- */

  function toiNoi() {
    thaoPhim();
    var sao = van.nhienLieu >= 90 ? 3 : van.nhienLieu >= 60 ? 2 : 1;
    var cuoi = van.chiSo === CHANG.length - 1;

    tt = doc();
    if ((tt.sao[van.chiSo] || 0) < sao) tt.sao[van.chiSo] = sao;
    if (tt.mo < van.chiSo + 2) tt.mo = Math.min(van.chiSo + 2, CHANG.length);
    if (cuoi) tt.veDich = true;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel');
    khung.appendChild(el('div', 'doi-nhan-vat', cuoi
      ? global.HoatHinh.ve('cup', 110, null) + V.tram(90)
      : V.phiThuyen(64) + V.hanhTinh(van.chang.hanhTinh, 100) +
        (van.chang.hinh ? global.HoatHinh.ve(van.chang.hinh, 56, null) : '')));

    khung.appendChild(el('h2', null, cuoi
      ? '🏅 Đã tới Trạm Thiên Hà!'
      : '🛬 Hạ cánh xuống ' + van.chang.ten + '!'));
    khung.appendChild(el('p', 'lead', cuoi
      ? 'Chuyến du hành hoàn tất. Giỏi quá!'
      : 'Chặng <b>' + CHANG[van.chiSo + 1].ten + '</b> đã mở khoá. Nhiên liệu còn <b>' +
        van.nhienLieu + '%</b>.'));

    khung.appendChild(el('div', 'stars',
      '⭐'.repeat(sao) + '<span class="off">' + '⭐'.repeat(3 - sao) + '</span>'));

    var actions = el('div', 'actions');
    if (!cuoi) {
      var tiep = el('button', 'btn go', '➡️ Bay tiếp');
      tiep.type = 'button';
      tiep.addEventListener('click', function () { bayToi(van.chiSo + 1); });
      actions.appendChild(tiep);
    }
    var veBd = el('button', 'btn ' + (cuoi ? 'go' : 'ghost'), '🗺️ Bản đồ');
    veBd.type = 'button';
    veBd.addEventListener('click', veBanDo);
    actions.appendChild(veBd);
    khung.appendChild(actions);

    goc.appendChild(khung);
    confetti();
    if (global.DanhHieu) global.DanhHieu.baoMoiDat();
  }

  function canNhienLieu() {
    thaoPhim();
    goc.innerHTML = '';

    var khung = el('div', 'panel');
    khung.appendChild(el('div', 'doi-nhan-vat', V.phiThuyen(80)));
    khung.appendChild(el('h2', null, '⛽ Cạn nhiên liệu rồi!'));
    khung.appendChild(el('p', 'lead',
      'Phi thuyền đã bay được <b>' + van.buoc + '/' + van.soCau +
      '</b> chặng. Mình bay lại hành tinh này nhé — các hành tinh đã qua vẫn còn nguyên.'));

    var actions = el('div', 'actions');
    var thu = el('button', 'btn go', '🔁 Bay lại chặng này');
    thu.type = 'button';
    thu.addEventListener('click', function () { bayToi(van.chiSo); });
    actions.appendChild(thu);

    var veBd = el('button', 'btn ghost', '🗺️ Bản đồ');
    veBd.type = 'button';
    veBd.addEventListener('click', veBanDo);
    actions.appendChild(veBd);
    khung.appendChild(actions);

    goc.appendChild(khung);
  }

  global.GameVuTru = {
    CHANG: CHANG,
    /* Mỗi lớp truyền bộ chặng và khoá lưu riêng; để trống thì là lớp 5. */
    batDau: function (idGoc, cauHinh) {
      if (cauHinh && cauHinh.chang) { CHANG = cauHinh.chang; this.CHANG = CHANG; }
      if (!CHANG.length) { CHANG = boDeMacDinh(); this.CHANG = CHANG; }
      if (cauHinh && cauHinh.khoa) STORE = cauHinh.khoa;
      goc = document.getElementById(idGoc || 'game');
      veBanDo();
    },
    _moVan: function (i) {
      van = { chang: CHANG[i], chiSo: i, buoc: 0, nhienLieu: NHIEN_LIEU_DAU,
        soCau: CHANG[i].soCau, phat: PHAT, deBo: CHANG[i].de, daRa: {} };
    },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
