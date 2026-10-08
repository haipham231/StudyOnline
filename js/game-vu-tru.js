/* ===== Game "Du hành vũ trụ" — lớp 5 =====
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
    return function () { return Q.pick(ds)(); };
  }

  var CHANG = [
    { ten: 'Sao Phân Số', emoji: '🪐', mau: '#ff8fd0', toi: '#c2558f', vanh: true, soCau: 6, hinh: 'troi/sao-tho',
      mota: 'Rút gọn, quy đồng, cộng trừ nhân chia phân số',
      de: mix(T.rutGon, T.quyDongMauSo, T.congTruPhanSo, T.nhanChiaPhanSo, T.soSanhPhanSo) },

    { ten: 'Sao Thập Phân', emoji: '💧', mau: '#4aa8ff', toi: '#1f5f9e', vanh: false, soCau: 6, hinh: 'troi/may',
      mota: 'Bốn phép tính với số thập phân',
      de: mix(T.congTruThapPhan, T.nhanHaiThapPhan, T.chiaThapPhanChoThapPhan, T.lamTron) },

    { ten: 'Sao Phần Trăm', emoji: '🔆', mau: '#ffc93c', toi: '#b07f00', vanh: false, soCau: 6, hinh: 'troi/ngoi-sao',
      mota: 'Ba dạng bài về tỉ số phần trăm',
      de: mix(T.giaTriPhanTram, T.timSoBanDau, T.tiSoPhanTram, T.phanTramThucTe) },

    { ten: 'Sao Hình Học', emoji: '🧊', mau: '#2fcf90', toi: '#167a52', vanh: true, soCau: 7, hinh: 'troi/cau-vong',
      mota: 'Diện tích, thể tích và hình tròn',
      de: mix(T.dienTichTamGiac, T.dienTichHinhThang, T.dienTichBinhHanh, T.hinhTron,
              T.theTich, T.dienTichXungQuanh) },

    { ten: 'Sao Đo Lường', emoji: '⏳', mau: '#8b7bf7', toi: '#4b3bb0', vanh: false, soCau: 7, hinh: 'troi/mat-trang',
      mota: 'Đổi đơn vị đo và số đo thời gian',
      de: mix(T.doiDonVi, T.thoiGian, T.timX) },

    { ten: 'Trạm Thiên Hà', emoji: '🌌', mau: '#ff7a7a', toi: '#a33', vanh: true, soCau: 8, dich: true,
      mota: 'Chặng cuối — trộn toàn bộ chương trình, có cả tính ngược',
      de: mix(T.chuyenDong, T.trungBinhCong, T.tinhNguocTamGiac, T.tinhNguocHinhThang,
              T.banKinhTuChuVi, T.dienTichPhanToMau, T.beNuoc, T.tongTi) }
  ];

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
        '<span class="so">' + (khoa ? '🔒' : chang.emoji) + '</span>' +
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
    van = { chang: CHANG[i], chiSo: i, buoc: 0, nhienLieu: NHIEN_LIEU_DAU, daRa: {} };
    raCauHoi();
  }

  function sinhCau() {
    var q, khoa, lan = 0;
    do {
      q = van.chang.de();
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

  function ve(hieuUng) {
    var chang = van.chang;
    goc.innerHTML = '';

    var khung = el('div', 'panel man-choi');
    khung.style.setProperty('--mau', chang.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', chang.emoji + ' Chặng ' + (van.chiSo + 1) + ' · ' + chang.ten));

    var mucNL = Math.max(0, van.nhienLieu);
    var oNL = el('span', 'nhien-lieu' + (mucNL <= 40 ? ' can' : ''),
      '⛽ <span class="thanh"><i style="width:' + mucNL + '%"></i></span> ' + mucNL + '%');
    tren.appendChild(oNL);
    khung.appendChild(tren);

    // bầu trời sao
    var troi = el('div', 'vu-tru');
    troi.innerHTML = '<div class="sao-nen">' + saoNen(26) + '</div>';

    var quyDao = el('div', 'quy-dao');
    for (var b = 0; b < chang.soCau; b++) {
      quyDao.appendChild(el('i', 'moc' + (b < van.buoc ? ' qua' : '')));
    }
    troi.appendChild(quyDao);

    var thuyen = el('div', 'phi-thuyen-bay' + (hieuUng === 'tien' ? ' vut' : ''), V.phiThuyen(56));
    thuyen.style.left = (van.buoc / chang.soCau * 74) + '%';
    troi.appendChild(thuyen);

    var dich = el('div', 'hanh-tinh-dich', chang.dich
      ? V.tram(90)
      : (chang.hinh && chang.hinh !== 'hanh-tinh'
          ? global.HoatHinh.ve(chang.hinh, 92, null)
          : V.hanhTinh(chang.mau, chang.toi, chang.vanh, 86)));
    troi.appendChild(dich);
    khung.appendChild(troi);

    khung.appendChild(el('div', 'meta',
      '<span>Câu ' + Math.min(van.buoc + 1, chang.soCau) + ' / ' + chang.soCau + '</span>' +
      '<span class="hits">🛰️ Đã bay ' + van.buoc + '/' + chang.soCau + '</span>'));

    van.oTraLoi = global.OTraLoi.ve(khung, van.cau, {
      nhanNop: '🚀 Phóng',
      boc: 'o-hoi',
      khoaSan: van.dangChuyen,
      khiTraLoi: function (dung, _daNhap, phanHoi) { cham(dung, van.cau, phanHoi); }
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
        if (van.buoc >= van.chang.soCau) return toiNoi();
        van.dangChuyen = true; ve('tien'); van.dangChuyen = false;
        setTimeout(raCauHoi, 520);
      }, 720);
      return;
    }

    van.nhienLieu -= PHAT;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '💥 Chưa đúng — đáp án là <b>' + q.answer + '</b>' +
                        (q.after ? ' ' + q.after : '') + '<br><small>Hụt mất ' + PHAT + '% nhiên liệu</small>';

    setTimeout(function () {
      if (van.nhienLieu <= 0) return canNhienLieu();
      van.dangChuyen = true; ve(); van.dangChuyen = false;
      setTimeout(raCauHoi, 300);
    }, 2200);
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
      : V.phiThuyen(64) + (van.chang.hinh && van.chang.hinh !== 'hanh-tinh'
          ? global.HoatHinh.ve(van.chang.hinh, 80, null)
          : V.hanhTinh(van.chang.mau, van.chang.toi, van.chang.vanh, 76))));

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
      'Phi thuyền đã bay được <b>' + van.buoc + '/' + van.chang.soCau +
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
    batDau: function (idGoc) {
      goc = document.getElementById(idGoc || 'game');
      veBanDo();
    },
    _moVan: function (i) { van = { chang: CHANG[i], chiSo: i, buoc: 0, nhienLieu: NHIEN_LIEU_DAU, daRa: {} }; },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
