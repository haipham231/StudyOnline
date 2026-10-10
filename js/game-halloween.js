/* ===== Game "Đêm Halloween" — lớp 1 =====
   Sáu ải trong khu rừng ma. Mỗi ải xen kẽ một câu Toán và một câu Tiếng Việt.
   Trả lời đúng được một viên kẹo, đúng liền nhiều câu được thưởng thêm.
   Sai thì mất một quả bí; hết ba quả bí phải làm lại ải đó.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, T = global.ToanL1, V = global.TiengVietL1;
  var STORE = 'studyonline:game-halloween';
  // tên hai mạch đề xen kẽ; lớp trên không có Tiếng Việt nên đổi thành Tính / Đố
  var TEN_MON = ['Toán', 'Tiếng Việt'];
  var SO_BI = 3;

  function mix() {
    var ds = Array.prototype.slice.call(arguments);
    // giữ lại danh sách để MucDo bớt dạng khi chơi mức Dễ
    var f = function () { return Q.pick(ds)(); };
    f.ds = ds;
    return f;
  }

  // mỗi ải có một bộ đề Toán và một bộ đề Tiếng Việt, dùng xen kẽ
  /* Bộ mặc định của lớp 1. Dựng muộn, vì trang lớp 2–4 không nạp
     ToanL1 và TiengVietL1 — gọi sớm là cả mô-đun vỡ lúc nạp. */
  function boDeMacDinh() {
    return [
      { ten: 'Cổng Bí Ngô', hinh: 'bi-ngo', quai: 'bi-ngo', nen: 'vuon-bi-ngo', hop: 'bi-ngo', emoji: '🎃', mau: '#ff8f3c', soCau: 6,
        mota: 'Cộng trừ phạm vi 10 · chữ cái và thanh điệu',
        toan: function () { return T.congTru(10); },
        tviet: mix(V.chuHoaThuong, V.timThanh) },

      { ten: 'Lối Mòn Ma Trơi', hinh: 'ma', quai: 'ma', nen: 'rung-suong', hop: 'thung', emoji: '👻', mau: '#8b7bf7', soCau: 6,
        mota: 'Tách gộp số · ghép vần',
        toan: function () { return T.tachGop(10); },
        tviet: mix(V.ghepVan, V.timAmDau) },

      { ten: 'Rừng Dơi Đen', hinh: 'canh/doi', quai: 'doi', nen: 'nghia-dia', hop: 'bia-mo', emoji: '🦇', mau: '#4b3bb0', soCau: 6,
        mota: 'Cộng trừ phạm vi 20 · quy tắc chính tả',
        toan: function () { return T.congTru(20); },
        tviet: mix(V.quyTacChinhTa, V.timVan) },

      { ten: 'Nghĩa Địa Mèo Đen', hinh: 'meo-phu-thuy', quai: 'meo-den', nen: 'gac-mai', hop: 'ruong', emoji: '🐈‍⬛', mau: '#2b2f55', soCau: 7,
        mota: 'So sánh và dãy số · chính tả dễ lẫn',
        toan: mix(function () { return T.soSanh(20); }, function () { return T.lonNhatBeNhat(20); }),
        tviet: V.vietDung },

      { ten: 'Hang Rồng Lửa', hinh: 'rong', quai: 'than-chet', nen: 'dam-lay', hop: 'bi-ngo', emoji: '🐉', mau: '#ff7a7a', soCau: 7,
        mota: 'Toán đố · từ ngữ và câu',
        toan: mix(function () { return T.choThem(20, false); }, function () { return T.choDi(20, false); },
                  function () { return T.roiKhoi(20); }),
        tviet: mix(V.timTuLoai, V.traiNghia, V.demTieng) },

      { ten: 'Lâu Đài Phù Thuỷ', hinh: 'phu-thuy', quai: 'phu-thuy', nen: 'san-lau-dai', hop: 'thung', emoji: '🧙‍♀️', mau: '#6a58e0', soCau: 8, trum: true,
        mota: 'Ải cuối — trộn toàn bộ toán và tiếng Việt',
        toan: mix(T.congTruKhongNho, T.chucDonVi, function () { return T.dienSo(20); },
                  function () { return T.honKem(20); }),
        tviet: mix(V.sapXepCau, V.dauCau, V.docHieu, V.vietDung) }
    ];;
  }

  var AI = T && V ? boDeMacDinh() : [];

  /* ---------- lưu tiến độ ---------- */

  function doc() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || 'null') ||
             { mo: 1, sao: {}, keo: 0, thang: false };
    } catch (e) {
      return { mo: 1, sao: {}, keo: 0, thang: false };
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

  // tự suy ra thư mục ảnh từ vị trí tệp script này
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/game-halloween\.js(\?|$)/.test(src)) return src.replace(/js\/game-halloween\.js.*$/, '');
    }
    return '';
  })();

  function anh(duong, cls) {
    return '<img class="' + cls + '" src="' + GOC + 'assets/halloween/' + duong +
      '" alt="" draggable="false">';
  }

  function hinh(ten, cao) {
    return global.HoatHinh ? global.HoatHinh.ve(ten, cao, null) : '';
  }

  function confetti() {
    var mau = ['#ff8f3c', '#8b7bf7', '#ffc93c', '#2fcf90', '#ff7a7a'];
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

  var goc, tt, van;

  function thaoPhim() {
    if (van && van.oTraLoi) { van.oTraLoi.huy(); van.oTraLoi = null; }
  }

  /* ---------- Bản đồ ---------- */

  function veBanDo() {
    thaoPhim();
    tt = doc();
    goc.innerHTML = '';

    var khung = el('div', 'panel ban-do dem-halloween');
    khung.appendChild(el('div', 'cot-truyen',
      hinh('phu-thuy', 96) +
      '<p>Đêm Halloween, phù thuỷ giấu hết kẹo của cả xóm trong lâu đài! ' +
      'Hãy vượt <b>' + AI.length + ' ải</b>, mỗi ải xen kẽ một câu <b>' + TEN_MON[0] +
      '</b> và một câu <b>' + TEN_MON[1] + '</b>, để giành lại kẹo và trở thành ' +
      '<b>Vua Halloween</b>.</p>'));

    if (global.MucDo) khung.appendChild(global.MucDo.veChon(STORE, veBanDo));

    var tongSao = 0;
    Object.keys(tt.sao).forEach(function (k) { tongSao += tt.sao[k]; });
    khung.appendChild(el('p', 'lead',
      '🍬 Đã gom <b>' + (tt.keo || 0) + ' viên kẹo</b> · ⭐ <b>' + tongSao + '/' + (AI.length * 3) + '</b>' +
      (tt.thang ? ' · 👑 Bé đã là Vua Halloween!' : '')));

    var ds = el('div', 'chang-list');
    AI.forEach(function (ai, i) {
      var khoa = i >= tt.mo;
      var sao = tt.sao[i] || 0;

      var nut = el('button', 'chang' + (khoa ? ' khoa' : '') + (ai.trum ? ' boss' : ''));
      nut.type = 'button';
      nut.disabled = khoa;
      nut.style.setProperty('--mau', ai.mau);
      nut.innerHTML =
        '<span class="so">' + (khoa ? '🔒' : ai.emoji) + '</span>' +
        '<span class="chi-tiet"><b>Ải ' + (i + 1) + ' · ' + ai.ten + '</b>' +
        '<small>' + (khoa ? 'Qua ải trước để mở khoá' : ai.mota) + '</small></span>' +
        '<span class="sao">' + (khoa ? '' : '⭐'.repeat(sao) +
          '<span class="mo-sao">' + '⭐'.repeat(3 - sao) + '</span>') + '</span>';
      if (!khoa) nut.addEventListener('click', function () { vaoAi(i); });
      ds.appendChild(nut);
    });
    khung.appendChild(ds);

    if (tt.mo > 1 || tt.thang) {
      var lamLai = el('button', 'btn ghost', '↩︎ Chơi lại từ đầu');
      lamLai.type = 'button';
      lamLai.addEventListener('click', function () {
        if (confirm('Xoá hết tiến độ và chơi lại từ ải 1?')) {
          ghi({ mo: 1, sao: {}, keo: 0, thang: false });
          veBanDo();
        }
      });
      khung.appendChild(el('div', 'actions')).appendChild(lamLai);
    }

    goc.appendChild(khung);
  }

  /* ---------- Vào một ải ---------- */

  function vaoAi(i) {
    var ai = AI[i];
    var muc = global.MucDo ? global.MucDo.doc(STORE) : 'vua';
    var soCau = global.MucDo ? global.MucDo.soCau(ai.soCau, muc) : ai.soCau;
    var soBi = global.MucDo ? global.MucDo.mang(SO_BI, muc) : SO_BI;
    van = { ai: ai, chiSo: i, buoc: 0, bi: soBi, soBi: soBi, soCau: soCau,
      boToan: global.MucDo ? global.MucDo.de(ai.toan, muc) : ai.toan,
      boTviet: global.MucDo ? global.MucDo.de(ai.tviet, muc) : ai.tviet,
      keo: 0, lienTiep: 0, daRa: {} };
    moMan();
  }

  /* ---------- Cảnh mở màn một ải ---------- */

  function khungCanh(ai, trai, phai) {
    var k = el('div', 'canh-hw');
    if (ai && ai.nen) k.style.backgroundImage = 'url(' + GOC + 'assets/halloween/nen/' + ai.nen + '.jpg)';
    k.innerHTML = (trai ? '<span class="ben trai">' + trai + '</span>' : '') +
                  (phai ? '<span class="ben phai">' + phai + '</span>' : '');
    return k;
  }

  function moMan() {
    thaoPhim();
    goc.innerHTML = '';
    var ai = van.ai;
    var khung = el('div', 'panel cat-canh dem-halloween');

    khung.appendChild(khungCanh(ai, anh('canh/be-xo-rong.png', 'nv-canh'),
      anh('canh/phu-thuy-bao.png', 'nv-canh')));

    khung.appendChild(el('h2', null, ai.emoji + ' Ải ' + (van.chiSo + 1) + ' · ' + ai.ten));
    khung.appendChild(el('p', 'lead',
      'Phù thuỷ vác bao kẹo chạy qua <b>' + ai.ten + '</b>! Giải đúng <b>' + van.soCau +
      ' câu</b> để đuổi kịp và đòi lại kẹo.'));
    khung.appendChild(el('p', 'luat', '🎃 ' + ai.mota));

    var nut = el('button', 'btn go', '🍬 Đi đòi kẹo!');
    nut.type = 'button';
    nut.addEventListener('click', raCauHoi);
    khung.appendChild(el('div', 'actions')).appendChild(nut);

    goc.appendChild(khung);
  }

  // xen kẽ: câu lẻ là Toán, câu chẵn là Tiếng Việt
  function sinhCau() {
    var laToan = van.buoc % 2 === 0;
    var nguon = laToan ? van.boToan : van.boTviet;
    var q, khoa, lan = 0;
    do {
      q = nguon();
      khoa = (q.prompt || '') + (q.text || '') + (q.after || '') + q.answer;
      lan++;
    } while (van.daRa[khoa] && lan < 30);
    van.daRa[khoa] = true;
    q.mon = laToan ? TEN_MON[0] : TEN_MON[1];
    return q;
  }

  function raCauHoi() {
    thaoPhim();
    van.cau = sinhCau();
    ve();
  }

  /* ---------- Vẽ màn chơi ---------- */

  function ve(hieuUng) {
    var ai = van.ai;
    goc.innerHTML = '';

    var khung = el('div', 'panel san-choi dem-halloween');
    khung.style.setProperty('--mau', ai.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', ai.emoji + ' Ải ' + (van.chiSo + 1) + ' · ' + ai.ten));
    var bi = '';
    for (var b = 0; b < van.soBi; b++) bi += b < van.bi ? '🎃' : '<span class="mat">🖤</span>';
    tren.appendChild(el('span', 'tim', bi));
    khung.appendChild(tren);

    // dải tiến độ gọn: đi được mấy bước, còn mấy bước tới trùm
    var duong = el('div', 'duong-gon');
    for (var m = 0; m < van.soCau; m++) {
      duong.appendChild(el('i', 'moc' + (m < van.buoc ? ' qua' : '')));
    }
    duong.appendChild(el('span', 'trum', ai.emoji));
    khung.appendChild(duong);

    khung.appendChild(el('div', 'meta',
      '<span><span class="nhan-mon ' + (van.cau.mon === TEN_MON[0] ? 'toan' : 'tviet') + '">' +
      van.cau.mon + '</span> Câu ' + Math.min(van.buoc + 1, van.soCau) + ' / ' + van.soCau + '</span>' +
      '<span class="hits">🍬 ' + van.keo + '</span>'));

    van.oTraLoi = global.ManNhay.ve(khung, van.cau, {
      khoaSan: van.dangChuyen,
      quai: ai.quai,
      nen: ai.nen,
      hop: ai.hop,
      coLoa: van.cau.mon === TEN_MON[1] && TEN_MON[1] === 'Tiếng Việt',
      doc: Q.docTo,
      khiTraLoi: function (dung, _n, phanHoi) { cham(dung, van.cau, phanHoi); }
    });

    goc.appendChild(khung);
  }

  /* ---------- Chấm một câu ---------- */

  function cham(dung, q, phanHoi) {
    thaoPhim();

    if (dung) {
      van.buoc += 1;
      van.lienTiep += 1;
      var thuong = van.lienTiep >= 3 ? 2 : 1;      // đúng liền ba câu trở lên được thưởng
      van.keo += thuong;

      phanHoi.className = 'feedback pop ok';
      phanHoi.innerHTML = (van.lienTiep >= 3 ? '🔥 Chuỗi ' + van.lienTiep + ' câu! ' : '') +
        Q.pick(['💖 Đội trúng rồi!', '🍬 Được kẹo!', '🎃 Giỏi quá!', '⭐ Chính xác!']) +
        ' <small>+' + thuong + ' kẹo</small>';

      setTimeout(function () {
        if (van.buoc >= van.soCau) return thangAi();
        van.dangChuyen = true; ve(); van.dangChuyen = false;
        setTimeout(raCauHoi, 520);
      }, 760);
      return;
    }

    van.bi -= 1;
    van.lienTiep = 0;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '👻 Hụt rồi! Đáp án là <b>' + q.answer + '</b>' + (q.after ? ' ' + q.after : '');

    setTimeout(function () {
      if (van.bi <= 0) return thuaAi();
      van.dangChuyen = true; ve(); van.dangChuyen = false;
      setTimeout(raCauHoi, 300);
    }, 2100);
  }

  /* ---------- Thắng / thua một ải ---------- */

  function thangAi() {
    thaoPhim();
    var sao = van.bi === van.soBi ? 3 : van.bi >= van.soBi - 1 ? 2 : 1;
    var cuoi = van.chiSo === AI.length - 1;

    tt = doc();
    if ((tt.sao[van.chiSo] || 0) < sao) tt.sao[van.chiSo] = sao;
    if (tt.mo < van.chiSo + 2) tt.mo = Math.min(van.chiSo + 2, AI.length);
    tt.keo = (tt.keo || 0) + van.keo;
    if (cuoi) tt.thang = true;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel cat-canh dem-halloween');
    // thắng cả game thì phù thuỷ ngồi bệt, kẹo đổ ra đất; thắng một ải thì
    // con quái canh ải nằm xỉu bên cạnh
    khung.appendChild(khungCanh(van.ai,
      anh(cuoi ? 'canh/be-vuong-mien.png' : 'canh/be-xo-day.png', 'nv-canh'),
      cuoi ? anh('canh/phu-thuy-thua.png', 'nv-canh')
           : anh((van.ai.quai || 'bi-ngo') + '-xiu.png', 'nv-canh')));
    if (cuoi) khung.appendChild(el('div', 'doi-nhan-vat', hinh('cup', 96)));

    khung.appendChild(el('h2', null, cuoi
      ? '👑 Bé là Vua Halloween!'
      : '🎃 Qua ải ' + (van.chiSo + 1) + '!'));
    khung.appendChild(el('p', 'lead', cuoi
      ? 'Bé đã đòi lại toàn bộ kẹo từ phù thuỷ. Chúc mừng!'
      : 'Ải <b>' + AI[van.chiSo + 1].ten + '</b> đã mở. Gom được <b>' + van.keo + ' viên kẹo</b>.'));

    khung.appendChild(el('div', 'stars',
      '⭐'.repeat(sao) + '<span class="off">' + '⭐'.repeat(3 - sao) + '</span>'));

    var actions = el('div', 'actions');
    if (!cuoi) {
      var tiep = el('button', 'btn go', '➡️ Ải tiếp theo');
      tiep.type = 'button';
      tiep.addEventListener('click', function () { vaoAi(van.chiSo + 1); });
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

  function thuaAi() {
    thaoPhim();
    goc.innerHTML = '';

    var khung = el('div', 'panel cat-canh dem-halloween');
    khung.appendChild(khungCanh(van.ai, anh('canh/be-buon.png', 'nv-canh'),
      anh('canh/phu-thuy-bao.png', 'nv-canh')));
    khung.appendChild(el('h2', null, '🖤 Hết bí ngô rồi!'));
    khung.appendChild(el('p', 'lead',
      'Bé đã đi được <b>' + van.buoc + '/' + van.soCau + '</b> chặng của ải này. ' +
      'Mình thử lại nhé — các ải đã qua vẫn còn nguyên.'));

    var actions = el('div', 'actions');
    var thu = el('button', 'btn go', '🔁 Thử lại ải này');
    thu.type = 'button';
    thu.addEventListener('click', function () { vaoAi(van.chiSo); });
    actions.appendChild(thu);

    var veBd = el('button', 'btn ghost', '🗺️ Bản đồ');
    veBd.type = 'button';
    veBd.addEventListener('click', veBanDo);
    actions.appendChild(veBd);
    khung.appendChild(actions);

    goc.appendChild(khung);
  }

  global.GameHalloween = {
    AI: AI,
    /* Lớp 2, 3, 4 truyền bộ ải và khoá lưu riêng; để trống thì là lớp 1. */
    batDau: function (idGoc, cauHinh) {
      if (cauHinh && cauHinh.ai) { AI = cauHinh.ai; this.AI = AI; }
      if (!AI.length) { AI = boDeMacDinh(); this.AI = AI; }
      if (cauHinh && cauHinh.khoa) STORE = cauHinh.khoa;
      if (cauHinh && cauHinh.mon) { TEN_MON = cauHinh.mon; }
      goc = document.getElementById(idGoc || 'game');
      veBanDo();
    },
    _moVan: function (i) {
      van = { ai: AI[i], chiSo: i, buoc: 0, bi: SO_BI, soBi: SO_BI, soCau: AI[i].soCau,
        boToan: AI[i].toan, boTviet: AI[i].tviet, keo: 0, lienTiep: 0, daRa: {} };
    },
    _cauTiep: function () { var q = sinhCau(); van.buoc++; return q; }
  };
})(window);
