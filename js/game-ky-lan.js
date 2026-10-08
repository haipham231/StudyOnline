/* ===== Game "Bay cùng kỳ lân" — mầm non =====
   Năm chặng bay lên trời. Mỗi câu đúng bay cao thêm một nấc và được một ngôi sao.
   Cố ý KHÔNG có mạng và không có màn thua: bé nhỏ trả lời sai thì chỉ được xem
   đáp án đúng rồi làm câu khác, cứ thế cho tới khi đủ số câu.
   Không dùng nhân vật phù thuỷ để bé nhỏ khỏi sợ.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, M = global.TiengVietMN;
  var STORE = 'studyonline:game-ky-lan';

  function mix() {
    var ds = Array.prototype.slice.call(arguments);
    return function () { return Q.pick(ds)(); };
  }

  var CHANG = [
    { ten: 'Tầng Mây', hinh: 'troi/may', emoji: '☁️', mau: '#4aa8ff', soCau: 4,
      mota: 'Nhận biết con vật',
      de: function () { return M.ngheVaChon('con vật', 3); } },

    { ten: 'Cầu Vồng', hinh: 'troi/cau-vong', emoji: '🌈', mau: '#ff8fd0', soCau: 4,
      mota: 'Nhận biết màu sắc',
      de: function () { return M.ngheVaChon('màu sắc', 3); } },

    { ten: 'Vườn Sao', hinh: 'troi/ngoi-sao', emoji: '⭐', mau: '#ffc93c', soCau: 5,
      mota: 'Đếm số',
      de: function () { return M.demBangChu(5); } },

    { ten: 'Cung Trăng', hinh: 'troi/mat-trang', emoji: '🌙', mau: '#8b7bf7', soCau: 5,
      mota: 'Nhận biết chữ cái',
      de: mix(M.nhanBietChu, M.chuDauTu) },

    { ten: 'Lâu Đài Mây', hinh: 'troi/co-tien', emoji: '🧚', mau: '#6a58e0', soCau: 6, dinh: true,
      mota: 'Chặng cuối — trộn tất cả',
      de: mix(function () { return M.ngheVaChon(null, 3); }, M.nhanBietChu,
              function () { return M.demBangChu(5); }, M.hoatDong) }
  ];

  /* ---------- lưu tiến độ ---------- */

  function doc() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || 'null') || { mo: 1, sao: {}, ngoiSao: 0, len: false };
    } catch (e) {
      return { mo: 1, sao: {}, ngoiSao: 0, len: false };
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
    var mau = ['#4aa8ff', '#8b7bf7', '#2fcf90', '#ffc93c', '#ff7a7a', '#ff8fd0'];
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

  /* ---------- Bản đồ bầu trời ---------- */

  function veBanDo() {
    thaoPhim();
    tt = doc();
    goc.innerHTML = '';

    var khung = el('div', 'panel ban-do');
    khung.appendChild(el('div', 'cot-truyen',
      hinh('troi/ky-lan', 110) +
      '<p>Bạn kỳ lân rủ bé bay lên trời chơi! ' +
      'Mỗi câu trả lời đúng bé bay cao thêm một nấc và nhặt được một ngôi sao. ' +
      '<b>Trả lời sai cũng không sao cả</b> — bé cứ thử tiếp nhé.</p>'));

    var tongSao = 0;
    Object.keys(tt.sao).forEach(function (k) { tongSao += tt.sao[k]; });
    khung.appendChild(el('p', 'lead',
      '⭐ Đã nhặt <b>' + (tt.ngoiSao || 0) + ' ngôi sao</b> · 🏆 <b>' + tongSao + '/' + (CHANG.length * 3) + '</b>' +
      (tt.len ? ' · 🦄 Bé đã bay tới Lâu Đài Mây!' : '')));

    var ds = el('div', 'chang-list');
    CHANG.forEach(function (chang, i) {
      var khoa = i >= tt.mo;
      var sao = tt.sao[i] || 0;

      var nut = el('button', 'chang' + (khoa ? ' khoa' : '') + (chang.dinh ? ' boss' : ''));
      nut.type = 'button';
      nut.disabled = khoa;
      nut.style.setProperty('--mau', chang.mau);
      nut.innerHTML =
        '<span class="so">' + (khoa ? '🔒' : chang.emoji) + '</span>' +
        '<span class="chi-tiet"><b>' + (i + 1) + '. ' + chang.ten + '</b>' +
        '<small>' + (khoa ? 'Qua chặng trước để mở' : chang.mota) + '</small></span>' +
        '<span class="sao">' + (khoa ? '' : '⭐'.repeat(sao) +
          '<span class="mo-sao">' + '⭐'.repeat(3 - sao) + '</span>') + '</span>';
      if (!khoa) nut.addEventListener('click', function () { bayLen(i); });
      ds.appendChild(nut);
    });
    khung.appendChild(ds);

    if (tt.mo > 1 || tt.len) {
      var lamLai = el('button', 'btn ghost', '↩︎ Bay lại từ đầu');
      lamLai.type = 'button';
      lamLai.addEventListener('click', function () {
        if (confirm('Xoá hết và bay lại từ chặng đầu?')) {
          ghi({ mo: 1, sao: {}, ngoiSao: 0, len: false });
          veBanDo();
        }
      });
      khung.appendChild(el('div', 'actions')).appendChild(lamLai);
    }

    goc.appendChild(khung);
  }

  /* ---------- Bay một chặng ---------- */

  function bayLen(i) {
    van = { chang: CHANG[i], chiSo: i, buoc: 0, sai: 0, daRa: {} };
    raCauHoi();
  }

  function sinhCau() {
    var q, khoa, lan = 0;
    do {
      q = van.chang.de();
      khoa = (q.prompt || '') + (q.art || '') + q.answer;
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

    var khung = el('div', 'panel man-choi kids');
    khung.style.setProperty('--mau', chang.mau);

    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', chang.emoji + ' ' + chang.ten));
    tren.appendChild(el('span', 'tim', '⭐ ' + van.buoc + '/' + chang.soCau));
    khung.appendChild(tren);

    // bầu trời: bé bay càng cao khi càng đúng nhiều
    var troi = el('div', 'bau-troi');
    troi.appendChild(el('div', 'dich-tren', hinh(chang.hinh, chang.dinh ? 86 : 74)));

    var bay = el('div', 'nguoi-bay' + (hieuUng === 'len' ? ' vut-len' : ''), hinh('troi/ky-lan', 82));
    bay.style.bottom = (6 + van.buoc / chang.soCau * 56) + '%';
    troi.appendChild(bay);

    var nac = el('div', 'nac-thang');
    for (var b = 0; b < chang.soCau; b++) {
      nac.appendChild(el('i', 'nac' + (b < van.buoc ? ' qua' : '')));
    }
    troi.appendChild(nac);
    khung.appendChild(troi);

    van.oTraLoi = global.OTraLoi.ve(khung, van.cau, {
      khoaSan: van.dangChuyen,
      coLoa: true,
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
      phanHoi.className = 'feedback pop ok';
      phanHoi.innerHTML = Q.pick(['⭐ Giỏi quá!', '🦄 Bay cao hơn rồi!', '🎉 Đúng rồi!', '✨ Tuyệt vời!']);
      if (Q.docTo) Q.docTo('Giỏi quá');

      setTimeout(function () {
        if (van.buoc >= van.chang.soCau) return len();
        van.dangChuyen = true; ve('len'); van.dangChuyen = false;
        setTimeout(raCauHoi, 520);
      }, 760);
      return;
    }

    // sai thì không mất gì, chỉ xem đáp án rồi làm câu khác
    van.sai += 1;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '✨ Đáp án đúng là <b>' + String(q.answer).replace(/<[^>]+>/g, ' ').trim() + '</b>' +
                        '<br><small>Không sao đâu, mình thử câu khác nhé!</small>';

    setTimeout(raCauHoi, 2400);
  }

  /* ---------- Lên tới nơi ---------- */

  function len() {
    thaoPhim();
    var sao = van.sai === 0 ? 3 : van.sai <= 2 ? 2 : 1;
    var cuoi = van.chiSo === CHANG.length - 1;

    tt = doc();
    if ((tt.sao[van.chiSo] || 0) < sao) tt.sao[van.chiSo] = sao;
    if (tt.mo < van.chiSo + 2) tt.mo = Math.min(van.chiSo + 2, CHANG.length);
    tt.ngoiSao = (tt.ngoiSao || 0) + van.chang.soCau;
    if (cuoi) tt.len = true;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel');
    khung.appendChild(el('div', 'doi-nhan-vat',
      cuoi ? hinh('cup', 104) + hinh('troi/ky-lan', 80) : hinh('troi/ky-lan', 86) + hinh(van.chang.hinh, 70)));

    khung.appendChild(el('h2', null, cuoi ? '🦄 Bé đã bay tới Lâu Đài Mây!' : '✨ Lên tới ' + van.chang.ten + '!'));
    khung.appendChild(el('p', 'lead', cuoi
      ? 'Bạn kỳ lân và cô tiên khen bé giỏi lắm!'
      : 'Bé nhặt được <b>' + van.chang.soCau + ' ngôi sao</b>. Chặng <b>' +
        CHANG[van.chiSo + 1].ten + '</b> đã mở!'));

    khung.appendChild(el('div', 'stars',
      '⭐'.repeat(sao) + '<span class="off">' + '⭐'.repeat(3 - sao) + '</span>'));

    var actions = el('div', 'actions');
    if (!cuoi) {
      var tiep = el('button', 'btn go', '🦄 Bay tiếp');
      tiep.type = 'button';
      tiep.addEventListener('click', function () { bayLen(van.chiSo + 1); });
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

  global.GameKyLan = {
    CHANG: CHANG,
    batDau: function (idGoc) {
      goc = document.getElementById(idGoc || 'game');
      veBanDo();
    },
    _moVan: function (i) { van = { chang: CHANG[i], chiSo: i, buoc: 0, sai: 0, daRa: {} }; },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
