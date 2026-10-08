/* ===== Game "Câu cá cùng bé" — lớp 1 =====
   Chọn một trong ba hồ theo độ khó, mỗi lượt câu mười câu hỏi trộn Toán và
   Tiếng Việt. Đúng thì câu được cá bỏ vào xô, sai thì cá bơi mất.
   Không có màn thua: bé luôn đi hết mười câu, cuối cùng đếm số cá trong xô.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, T = global.ToanL1, V = global.TiengVietL1;
  var STORE = 'studyonline:game-cau-ca';
  var SO_CAU = 10;

  function mix() {
    var ds = Array.prototype.slice.call(arguments);
    return function () { return Q.pick(ds)(); };
  }

  var HO = [
    { id: 'ao', ten: 'Ao Nhỏ', mucDo: 'Dễ', emoji: '🪣', mau: '#2fcf90', nen: '#e4f9f0',
      dan: ['cau-ca/ca-nho', 'cau-ca/cua'], coCa: 48,
      mota: 'Cá nhỏ hiền lành · cộng trừ trong 10, đếm, chữ cái',
      de: mix(
        function () { return T.congTru(10); },
        function () { return T.demHinh(10); },
        function () { return T.soSanh(10); },
        T.nhanBietHinh,
        V.chuHoaThuong,
        V.timThanh
      ) },

    { id: 'song', ten: 'Sông Lớn', mucDo: 'Vừa', emoji: '🏞️', mau: '#4aa8ff', nen: '#e3f1ff',
      dan: ['cau-ca/ca-vua', 'cau-ca/bach-tuoc', 'cau-ca/cua'], coCa: 66,
      mota: 'Cá to hơn · phạm vi 20, tách gộp, xem giờ, ghép vần',
      de: mix(
        function () { return T.congTru(20); },
        function () { return T.tachGop(10); },
        function () { return T.dienSo(20); },
        function () { return T.xemGio(false); },
        V.ghepVan,
        V.quyTacChinhTa,
        V.timTuLoai
      ) },

    { id: 'bien', ten: 'Biển Sâu', mucDo: 'Khó', emoji: '🌊', mau: '#6a58e0', nen: '#ece8ff',
      dan: ['cau-ca/ca-map', 'cau-ca/ca-voi', 'cau-ca/sua', 'cau-ca/bach-tuoc'], coCa: 80,
      mota: 'Cá mập cỡ lớn · phạm vi 100, toán đố, đo độ dài, đọc hiểu',
      de: mix(
        T.congTruKhongNho,
        T.chucDonVi,
        function () { return T.tinhDay(20); },
        T.doDoDai,
        function () { return Q.pick([T.choThem, T.choDi, T.nhieuHon, T.itHon])(20, false); },
        function () { return T.honKem(20); },
        V.sapXepCau,
        V.docHieu,
        V.vietDung
      ) }
  ];

  /* ---------- lưu kết quả ---------- */

  function doc() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || 'null') || { totNhat: {}, tongCa: 0 };
    } catch (e) {
      return { totNhat: {}, tongCa: 0 };
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

  function hinh(ten, cao) {
    return global.HoatHinh ? global.HoatHinh.ve(ten, cao, null) : '';
  }

  function confetti() {
    var mau = ['#4aa8ff', '#2fcf90', '#ffc93c', '#ff8fd0', '#8b7bf7'];
    var lop = el('div', 'confetti');
    for (var i = 0; i < 70; i++) {
      var b = document.createElement('i');
      b.style.left = Math.random() * 100 + '%';
      b.style.background = mau[i % mau.length];
      b.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
      b.style.animationDelay = (Math.random() * 0.6) + 's';
      lop.appendChild(b);
    }
    document.body.appendChild(lop);
    setTimeout(function () { lop.remove(); }, 4200);
  }

  var goc, tt, van;

  function thaoPhim() {
    if (van && van.oTraLoi) { van.oTraLoi.huy(); van.oTraLoi = null; }
  }

  /* ---------- Màn chọn hồ ---------- */

  function chonHo() {
    thaoPhim();
    tt = doc();
    goc.innerHTML = '';

    var khung = el('div', 'panel ban-do');
    khung.appendChild(el('div', 'cot-truyen',
      hinh('cau-ca/nguoi-cau', 104) +
      '<p>Bé xách cần đi câu nào! Chọn một hồ rồi trả lời <b>' + SO_CAU + ' câu hỏi</b>. ' +
      'Mỗi câu đúng câu được một con cá bỏ vào xô, trả lời sai thì cá bơi mất. ' +
      '<b>Hồ càng khó thì thuỷ quái càng to</b>.</p>'));

    khung.appendChild(el('p', 'lead', '🐟 Tổng cộng đã câu được <b>' + (tt.tongCa || 0) + ' con cá</b>'));

    var ds = el('div', 'chang-list');
    HO.forEach(function (ho, i) {
      var tot = tt.totNhat[ho.id] || 0;
      var nut = el('button', 'chang ho-ca');
      nut.type = 'button';
      nut.style.setProperty('--mau', ho.mau);
      nut.innerHTML =
        '<span class="so">' + ho.emoji + '</span>' +
        '<span class="chi-tiet"><b>' + ho.ten + ' · ' + ho.mucDo + '</b><small>' + ho.mota + '</small>' +
          '<span class="dan-ca">' + ho.dan.map(function (c, k) {
            return '<i style="animation-delay:' + (k * 0.5).toFixed(1) + 's">' + hinh(c, 40) + '</i>';
          }).join('') + '</span></span>' +
        '<span class="sao">' + (tot ? '🐟 ' + tot + '/' + SO_CAU : '') + '</span>';
      nut.addEventListener('click', function () { batDauCau(i); });
      ds.appendChild(nut);
    });
    khung.appendChild(ds);
    goc.appendChild(khung);
  }

  /* ---------- Câu cá ---------- */

  function batDauCau(i) {
    van = { ho: HO[i], chiSo: i, cau: 0, duoc: 0, daRa: {}, conCa: null };
    raCauHoi();
  }

  function sinhCau() {
    var q, khoa, lan = 0;
    do {
      q = van.ho.de();
      khoa = (q.prompt || '') + (q.text || '') + (q.after || '') + q.answer;
      lan++;
    } while (van.daRa[khoa] && lan < 30);
    van.daRa[khoa] = true;
    return q;
  }

  function raCauHoi() {
    thaoPhim();
    van.cau += 1;
    if (van.cau > SO_CAU) return xong();
    van.deBai = sinhCau();
    van.conCa = conTiepTheo();
    ve();
  }

  // mỗi câu một con khác nhau: rút từ đàn đã bỏ con vừa hiện ra
  function conTiepTheo() {
    var dan = van.ho.dan;
    if (dan.length === 1) return dan[0];
    var khac = dan.filter(function (c) { return c !== van.conCa; });
    return Q.pick(khac.length ? khac : dan);
  }

  function ve(hieuUng) {
    var ho = van.ho;
    goc.innerHTML = '';

    var khung = el('div', 'panel man-choi');
    khung.style.setProperty('--mau', ho.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', ho.emoji + ' ' + ho.ten + ' · ' + ho.mucDo));
    tren.appendChild(el('span', 'tim', '🐟 ' + van.duoc + '/' + SO_CAU));
    khung.appendChild(tren);

    // cảnh hồ: bé câu bên trái, cá bơi dưới nước, xô bên phải
    var canh = el('div', 'ho-ca-canh');
    canh.style.setProperty('--nen', ho.nen);
    canh.appendChild(el('div', 'nguoi-cau', hinh('cau-ca/nguoi-cau', 92)));
    canh.appendChild(el('div', 'mat-nuoc'));

    var conCa = el('div', 'con-ca' + (hieuUng === 'cau-duoc' ? ' nhay-len' : hieuUng === 'mat' ? ' boi-mat' : ''),
      hinh(van.conCa || ho.dan[0], ho.coCa));
    canh.appendChild(conCa);

    var xo = el('div', 'cai-xo', hinh('cau-ca/xo', 66) +
      (van.duoc ? '<span class="dem-ca">' + van.duoc + '</span>' : ''));
    canh.appendChild(xo);
    khung.appendChild(canh);

    khung.appendChild(el('div', 'meta',
      '<span>Câu ' + van.cau + ' / ' + SO_CAU + '</span>' +
      '<span class="hits">🪣 Trong xô: ' + van.duoc + '</span>'));

    van.oTraLoi = global.OTraLoi.ve(khung, van.deBai, {
      nhanNop: '🎣 Giật cần',
      boc: 'o-hoi',
      khoaSan: van.dangChuyen,
      khiTraLoi: function (dung, _n, phanHoi) { cham(dung, van.deBai, phanHoi); }
    });

    goc.appendChild(khung);
  }

  function cham(dung, q, phanHoi) {
    thaoPhim();

    if (dung) {
      van.duoc += 1;
      phanHoi.className = 'feedback pop ok';
      phanHoi.innerHTML = Q.pick(['🎣 Câu được rồi!', '🐟 Cá vào xô!', '⭐ Giỏi quá!', '🙌 Trúng mánh!']);
      setTimeout(function () { van.dangChuyen = true; ve('cau-duoc'); van.dangChuyen = false; setTimeout(raCauHoi, 620); }, 740);
      return;
    }

    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '🫧 Cá bơi mất rồi — đáp án là <b>' +
      String(q.answer).replace(/<[^>]+>/g, ' ').trim() + '</b>' + (q.after ? ' ' + q.after : '');
    setTimeout(function () { van.dangChuyen = true; ve('mat'); van.dangChuyen = false; setTimeout(raCauHoi, 620); }, 2000);
  }

  /* ---------- Khoe xô cá ---------- */

  function xong() {
    thaoPhim();
    tt = doc();
    if ((tt.totNhat[van.ho.id] || 0) < van.duoc) tt.totNhat[van.ho.id] = van.duoc;
    tt.tongCa = (tt.tongCa || 0) + van.duoc;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel');

    // bé cầm xô, trong xô là đúng số cá câu được
    var khoe = el('div', 'khoe-xo');
    khoe.innerHTML = hinh('cau-ca/nguoi-cau', 104) +
      '<div class="xo-to">' + hinh('cau-ca/xo', 112) +
      '<div class="ca-trong-xo">' + new Array(van.duoc + 1).join('🐟') + '</div></div>';
    khung.appendChild(khoe);

    var loi = van.duoc === SO_CAU ? 'Tuyệt vời, bé câu được hết cả hồ!'
            : van.duoc >= SO_CAU * 0.7 ? 'Giỏi lắm, xô cá đầy rồi!'
            : van.duoc >= SO_CAU * 0.4 ? 'Khá lắm, lần sau câu được nhiều hơn nhé!'
            : 'Cá hồ này khó câu đấy — mình thử lại nhé!';

    khung.appendChild(el('h2', null, '🪣 Đã hoàn thành!'));
    khung.appendChild(el('div', 'so-ca', van.duoc + '<span class="tren">/' + SO_CAU + ' con cá</span>'));
    khung.appendChild(el('p', 'lead', loi + '<br><small>' + van.ho.emoji + ' ' + van.ho.ten +
      ' · mức ' + van.ho.mucDo + '</small>'));

    var actions = el('div', 'actions');
    var lai = el('button', 'btn go', '🎣 Câu lại hồ này');
    lai.type = 'button';
    lai.addEventListener('click', function () { batDauCau(van.chiSo); });
    actions.appendChild(lai);

    var doi = el('button', 'btn ghost', '🏞️ Đổi hồ khác');
    doi.type = 'button';
    doi.addEventListener('click', chonHo);
    actions.appendChild(doi);

    var ve_ = el('a', 'btn ghost', '🏠 Trang chủ');
    ve_.href = 'index.html';
    actions.appendChild(ve_);
    khung.appendChild(actions);

    goc.appendChild(khung);
    if (van.duoc >= SO_CAU * 0.7) confetti();
    if (global.DanhHieu) global.DanhHieu.baoMoiDat();
  }

  global.GameCauCa = {
    HO: HO, SO_CAU: SO_CAU,
    _conTiepTheo: function () { van.conCa = conTiepTheo(); return van.conCa; },
    batDau: function (idGoc) {
      goc = document.getElementById(idGoc || 'game');
      chonHo();
    },
    _moVan: function (i) { van = { ho: HO[i], chiSo: i, cau: 0, duoc: 0, daRa: {} }; },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
