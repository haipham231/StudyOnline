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
    // giữ lại danh sách để MucDo bớt dạng khi chơi mức Dễ
    var f = function () { return Q.pick(ds)(); };
    f.ds = ds;
    return f;
  }

  /* Bộ mặc định của lớp 1. Dựng muộn, vì trang lớp 2–4 không nạp
     ToanL1 và TiengVietL1 — gọi sớm là cả mô-đun vỡ lúc nạp. */
  function boDeMacDinh() {
    return [
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
    ];;
  }

  var HO = T && V ? boDeMacDinh() : [];

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

    if (global.MucDo) khung.appendChild(global.MucDo.veChon(STORE, chonHo));

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

  /* ---------- Rút đề, tránh ra trùng ---------- */

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

  // mỗi lần một con Lottie khác nhau cho đàn cá bơi nền
  function conTiepTheo() {
    var dan = van.ho.dan;
    if (dan.length === 1) return dan[0];
    var khac = dan.filter(function (c) { return c !== van.conCa; });
    return Q.pick(khac.length ? khac : dan);
  }

  /* ---------- Nghệ thuật theo cấp độ ---------- */

  var SO_NAC = 6;                 // sáu nấc: quăng → kéo → gần → lên → giật → bắt được

  // Cấp độ lấy theo thứ tự hồ, nên trang nào tự truyền bộ hồ riêng vẫn chạy
  function cap(i) { return Math.min(i, 2); }
  function tenCa(i) { return ['ca-vang', 'ca-chep', 'ca-map'][cap(i)]; }
  function tenQuai(i) { return ['cua', 'luon', 'bach-tuoc'][cap(i)]; }
  function tenTranh(i) { return ['canh-ao', 'canh-song', 'canh-bien'][cap(i)]; }
  function tenOm(i) { return ['om-ca-vang', 'om-ca-chep', 'om-ca-map'][cap(i)]; }
  function loaiCa(i) { return ['cá vàng', 'cá chép', 'cá mập con'][cap(i)]; }

  var GOC_ANH = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/game-cau-ca\.js(\?|$)/.test(src)) return src.replace(/js\/game-cau-ca\.js.*$/, '');
    }
    return '';
  })();

  function anhCauCa(ten, cls, duoi) {
    return '<img class="' + cls + '" src="' + GOC_ANH + 'assets/cau-ca/' + ten +
      '.' + (duoi || 'png') + '" alt="" draggable="false">';
  }

  /* ---------- Vào một hồ ---------- */

  function batDauCau(i) {
    var ho = HO[i];
    var muc = global.MucDo ? global.MucDo.doc(STORE) : 'vua';
    // Dễ thì cho nhiều lượt hơn để đủ sáu nấc, và cá không tuột lại khi sai.
    van = { ho: ho, chiSo: i, cau: 0, nac: 0, truot: 0, daRa: {}, conCa: null,
      muc: muc,
      soCau: global.MucDo ? global.MucDo.luot(SO_CAU, muc) : SO_CAU,
      deBo: global.MucDo ? global.MucDo.de(ho.de, muc) : ho.de };
    moMan();
  }

  // Cắt cảnh mở màn: khoe phong cảnh hồ rồi mới thả cần
  function moMan() {
    thaoPhim();
    goc.innerHTML = '';
    var ho = van.ho;
    var khung = el('div', 'panel cat-canh');
    khung.style.setProperty('--mau', ho.mau);
    khung.innerHTML =
      anhCauCa(tenTranh(van.chiSo), 'tranh-canh', 'jpg') +
      '<h2>' + ho.emoji + ' ' + ho.ten + '</h2>' +
      '<p class="lead">' + ho.mota + '<br><small>Hồ <b>' + ho.mucDo + '</b> · hôm nay mình rình con <b>' +
      loaiCa(van.chiSo) + '</b></small></p>' +
      '<p class="luat">Trả lời đúng thì kéo cá gần thêm một nấc. Đủ <b>' + SO_NAC +
      ' nấc</b> là bắt được trong <b>' + van.soCau + ' câu</b>. ' +
      (van.muc === 'de'
        ? 'Sai thì cá chưa cắn câu thôi, không tuột lại nấc nào.'
        : 'Sai thì thuỷ quái quậy, cá tuột lại một nấc.') + '</p>';
    var nut = el('button', 'btn go', '🎣 Thả cần!');
    nut.type = 'button';
    nut.addEventListener('click', raCauHoi);
    var hang = el('div', 'actions');
    hang.appendChild(nut);
    khung.appendChild(hang);
    goc.appendChild(khung);
  }

  function raCauHoi() {
    thaoPhim();
    van.loiNhan = null;
    van.cau += 1;
    if (van.cau > van.soCau) return xong();
    van.deBai = sinhCau();
    ve();
  }

  /* ---------- Vẽ màn chơi ---------- */

  function ve(hieuUng) {
    var ho = van.ho, nac = van.nac;
    goc.innerHTML = '';

    var khung = el('div', 'panel man-choi man-cau');
    khung.style.setProperty('--mau', ho.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', ho.emoji + ' ' + ho.ten + ' · ' + ho.mucDo));
    var chuoi = '';
    for (var k = 0; k < SO_NAC; k++) chuoi += k < nac ? '🐟' : '<span class="mat">·</span>';
    tren.appendChild(el('span', 'tim', chuoi));
    khung.appendChild(tren);

    /* --- cảnh hồ --- */
    var canh = el('div', 'ho-ca-canh canh-moi');
    canh.style.setProperty('--nen', ho.nen);
    canh.innerHTML = anhCauCa(tenTranh(van.chiSo), 'tranh-nen', 'jpg');

    // cá Lottie cũ bơi lởn vởn làm nền cho sinh động
    var dan = el('div', 'dan-boi');
    ho.dan.slice(0, 3).forEach(function (c, j) {
      var o = el('span', 'ca-nen ca-nen-' + j, hinh(c, 34 + j * 6));
      dan.appendChild(o);
    });
    canh.appendChild(dan);
    canh.appendChild(el('div', 'mat-nuoc'));

    // bé câu: khung nào tuỳ nấc đang tới đâu
    var khungBe = Math.min(nac + 1, SO_NAC);
    var TEN_KHUNG = ['cau-1-quang', 'cau-2-keo', 'cau-3-gan', 'cau-4-len', 'cau-5-giat', 'cau-6-duoc'];
    canh.appendChild(el('div', 'be-cau' + (hieuUng === 'keo' ? ' gang' : ''),
      anhCauCa(TEN_KHUNG[khungBe - 1], 'be-hinh')));

    // con cá: càng nhiều nấc càng gần bờ, càng nổi cao, càng to
    var tren4 = nac >= 4;
    var ca = el('div', 'ca-dang-cau' + (hieuUng === 'keo' ? ' giut' : '') + (tren4 ? ' khoi-nuoc' : ''),
      anhCauCa(tenCa(van.chiSo) + (tren4 ? '-giay' : '-boi'), 'ca-hinh'));
    ca.style.setProperty('--gan', nac);
    canh.appendChild(ca);

    // thuỷ quái ló lên khi vừa trả lời sai
    if (hieuUng === 'quai') {
      canh.appendChild(el('div', 'quai-nuoc',
        anhCauCa(tenQuai(van.chiSo) + '-hu', 'quai-hinh')));
    } else if (hieuUng === 'quai-chay') {
      canh.appendChild(el('div', 'quai-nuoc di-mat',
        anhCauCa(tenQuai(van.chiSo) + '-chay', 'quai-hinh')));
    }

    canh.appendChild(el('div', 'cai-xo', hinh('cau-ca/xo', 58)));
    khung.appendChild(canh);

    khung.appendChild(el('div', 'meta',
      '<span>Câu ' + van.cau + ' / ' + van.soCau + '</span>' +
      '<span class="hits">🎣 Nấc ' + nac + '/' + SO_NAC + '</span>'));

    van.oTraLoi = global.OTraLoi.ve(khung, van.deBai, {
      nhanNop: '🎣 Giật cần',
      boc: 'o-hoi',
      khoaSan: van.dangChuyen,
      khiTraLoi: function (dung, _n, phanHoi) { cham(dung, van.deBai, phanHoi); }
    });

    // Vẽ lại cảnh là dựng lại cả ô trả lời, lời nhắn vừa hiện bị xoá sạch —
    // mà đó là chỗ báo đáp án đúng, bé cần đọc. Chép lại vào ô mới.
    if (van.loiNhan && van.oTraLoi.oPhanHoi) {
      van.oTraLoi.oPhanHoi.className = van.loiNhan.lop;
      van.oTraLoi.oPhanHoi.innerHTML = van.loiNhan.chu;
    }

    goc.appendChild(khung);
  }

  /* ---------- Chấm một câu ---------- */

  var LOI_NAC = [
    '🎣 Cắn câu rồi! Giữ chặt nhé.',
    '💪 Bắt đầu kéo nào!',
    '🌊 Cá đang lại gần hơn!',
    '🐟 Thấy cá rồi, kéo nữa!',
    '🙌 Cá sắp lên bờ rồi!'
  ];

  function cham(dung, q, phanHoi) {
    thaoPhim();

    if (dung) {
      van.nac += 1;
      phanHoi.className = 'feedback pop ok';
      phanHoi.innerHTML = van.nac >= SO_NAC ? '🎉 Bắt được rồi!' : LOI_NAC[van.nac - 1];
      van.loiNhan = { lop: phanHoi.className, chu: phanHoi.innerHTML };
      setTimeout(function () {
        if (van.nac >= SO_NAC) return batDuoc();
        van.dangChuyen = true; ve('keo'); van.dangChuyen = false;
        setTimeout(raCauHoi, 640);
      }, 820);
      return;
    }

    van.truot += 1;
    var tut = van.nac > 0 && van.muc !== 'de';
    if (tut) van.nac -= 1;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '🫧 Chưa đúng — đáp án là <b>' +
      String(q.answer).replace(/<[^>]+>/g, ' ').trim() + '</b>' + (q.after ? ' ' + q.after : '') +
      '<br><small>' + (tut ? 'Thuỷ quái quậy, cá tuột lại một nấc!' : 'Thuỷ quái quậy, may mà cá chưa cắn câu.') + '</small>';
    van.loiNhan = { lop: phanHoi.className, chu: phanHoi.innerHTML };

    setTimeout(function () { van.dangChuyen = true; ve('quai'); van.dangChuyen = false; }, 120);
    setTimeout(function () { van.dangChuyen = true; ve('quai-chay'); van.dangChuyen = false; }, 1200);
    setTimeout(raCauHoi, 2300);
  }

  /* ---------- Bắt được cá: cắt cảnh kết ---------- */

  function batDuoc() {
    thaoPhim();
    var sao = van.truot === 0 ? 3 : van.truot <= 2 ? 2 : 1;

    tt = doc();
    if ((tt.totNhat[van.ho.id] || 0) < sao) tt.totNhat[van.ho.id] = sao;
    tt.tongCa = (tt.tongCa || 0) + 1;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel cat-canh ket-man');
    khung.style.setProperty('--mau', van.ho.mau);
    khung.innerHTML =
      anhCauCa(tenTranh(van.chiSo), 'tranh-canh', 'jpg') +
      '<div class="om-ca">' + anhCauCa(tenOm(van.chiSo), 'om-hinh') + '</div>' +
      '<h2>🎉 Bắt được ' + loaiCa(van.chiSo) + ' rồi!</h2>' +
      '<div class="sao-to">' + '⭐'.repeat(sao) + '<span class="mo-sao">' + '⭐'.repeat(3 - sao) + '</span></div>' +
      '<p class="lead">' + (van.truot === 0
        ? 'Không trượt câu nào — tay câu cừ khôi!'
        : 'Trượt ' + van.truot + ' câu thôi. Lần sau chắc tay hơn nhé!') + '</p>';

    var actions = el('div', 'actions');
    var lai = el('button', 'btn go', '🎣 Câu con nữa');
    lai.type = 'button';
    lai.addEventListener('click', function () { batDauCau(van.chiSo); });
    actions.appendChild(lai);

    if (van.chiSo + 1 < HO.length) {
      var tiep = el('button', 'btn ghost', '➡️ Sang hồ sâu hơn');
      tiep.type = 'button';
      tiep.addEventListener('click', function () { batDauCau(van.chiSo + 1); });
      actions.appendChild(tiep);
    }

    var doi = el('button', 'btn ghost', '🏞️ Chọn hồ');
    doi.type = 'button';
    doi.addEventListener('click', chonHo);
    actions.appendChild(doi);
    khung.appendChild(actions);

    goc.appendChild(khung);
    confetti();
    if (global.DanhHieu) global.DanhHieu.baoMoiDat();
  }

  /* ---------- Hết câu mà chưa kéo được: cá sổng ---------- */

  function xong() {
    thaoPhim();
    goc.innerHTML = '';
    var khung = el('div', 'panel cat-canh');
    khung.style.setProperty('--mau', van.ho.mau);
    khung.innerHTML =
      anhCauCa(tenTranh(van.chiSo), 'tranh-canh', 'jpg') +
      '<div class="om-ca">' + anhCauCa(tenQuai(van.chiSo) + '-hu', 'om-hinh') + '</div>' +
      '<h2>🫧 Cá sổng mất rồi!</h2>' +
      '<p class="lead">Mới kéo được <b>' + van.nac + '/' + SO_NAC + ' nấc</b> thì hết lượt. ' +
      'Thuỷ quái cười khoái chí lắm — mình câu lại cho nó biết tay nhé!</p>';

    var actions = el('div', 'actions');
    var lai = el('button', 'btn go', '🎣 Câu lại');
    lai.type = 'button';
    lai.addEventListener('click', function () { batDauCau(van.chiSo); });
    actions.appendChild(lai);
    var doi = el('button', 'btn ghost', '🏞️ Đổi hồ dễ hơn');
    doi.type = 'button';
    doi.addEventListener('click', chonHo);
    actions.appendChild(doi);
    var ve_ = el('a', 'btn ghost', '🏠 Trang chủ');
    ve_.href = 'index.html';
    actions.appendChild(ve_);
    khung.appendChild(actions);
    goc.appendChild(khung);
  }

  global.GameCauCa = {
    HO: HO, SO_CAU: SO_CAU, SO_NAC: SO_NAC,
    /* Lớp 2, 3, 4 dùng chung bộ máy game này, chỉ thay bộ hồ và khoá lưu.
       Không truyền gì thì vẫn là bộ hồ của lớp 1. */
    _conTiepTheo: function () { van.conCa = conTiepTheo(); return van.conCa; },
    batDau: function (idGoc, cauHinh) {
      if (cauHinh && cauHinh.ho) { HO = cauHinh.ho; this.HO = HO; }
      if (!HO.length) { HO = boDeMacDinh(); this.HO = HO; }
      if (cauHinh && cauHinh.khoa) STORE = cauHinh.khoa;
      goc = document.getElementById(idGoc || 'game');
      chonHo();
    },
    _moVan: function (i) {
      van = { ho: HO[i], chiSo: i, cau: 0, nac: 0, truot: 0, daRa: {},
        muc: 'vua', soCau: SO_CAU, deBo: HO[i].de };
    },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
