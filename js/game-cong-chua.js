/* ===== Game "Giải cứu công chúa" — vượt màn bằng cách giải toán ===== */
(function (global) {
  'use strict';

  var Q = global.Quiz, T = global.ToanL1, NV = global.NhanVat;
  var STORE = 'studyonline:game-cong-chua';
  var SO_TIM = 3;

  /* ---------- Các màn chơi ---------- */

  var MAN = [
    { ten: 'Rừng Xanh', emoji: '🌳', mau: '#2fcf90', nen: '#e4f9f0',
      mota: 'Cộng trừ trong phạm vi 10', soCau: 5,
      de: [function () { return T.congTru(10, true); }] },

    { ten: 'Dòng Sông', emoji: '🏞️', mau: '#4aa8ff', nen: '#e3f1ff',
      mota: 'Tách gộp số và điền số còn thiếu', soCau: 5,
      de: [function () { return T.tachGop(10); }, function () { return T.dienSo(10); }] },

    { ten: 'Núi Đá', emoji: '⛰️', mau: '#8b7bf7', nen: '#efeaff',
      mota: 'Cộng trừ trong phạm vi 20', soCau: 6,
      de: [function () { return T.congTru(20, false); }, function () { return T.tinhDay(10); }] },

    { ten: 'Sa Mạc', emoji: '🏜️', mau: '#ffc93c', nen: '#fff6dd',
      mota: 'So sánh số và dãy số', soCau: 6,
      de: [function () { return T.soSanh(20); }, function () { return T.lonNhatBeNhat(20); },
           function () { return T.daySo(Q.pick([2, 5]), 50); }] },

    { ten: 'Hang Lửa', emoji: '🌋', mau: '#ff7a7a', nen: '#ffe9e9',
      mota: 'Toán đố — đọc kĩ đề nhé!', soCau: 6,
      de: [function () { return T.choThem(20, false); }, function () { return T.choDi(20, false); },
           function () { return T.nhieuHon(20); }, function () { return T.itHon(20); },
           function () { return T.roiKhoi(20); }] },

    { ten: 'Lâu Đài Rồng', emoji: '🏰', mau: '#6a58e0', nen: '#ece8ff',
      mota: 'Trận cuối — đánh bại rồng để cứu công chúa!', soCau: 8, boss: true,
      de: [function () { return T.congTruKhongNho(); }, function () { return T.chucDonVi(); },
           function () { return T.tachGop(20); }, function () { return T.dienSo(20); },
           function () { return T.honKem(20); }, function () { return T.lucDau(20); }] }
  ];

  /* ---------- Lưu tiến độ ---------- */

  function doc() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || 'null') || { mo: 1, sao: {}, daCuu: false };
    } catch (e) {
      return { mo: 1, sao: {}, daCuu: false };
    }
  }

  function ghi(tt) {
    try { localStorage.setItem(STORE, JSON.stringify(tt)); } catch (e) { /* bỏ qua */ }
  }

  /* ---------- Tiện ích ---------- */

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

  var goc, tt, van, phimTat;

  function thaoPhim() {
    if (phimTat) { document.removeEventListener('keydown', phimTat); phimTat = null; }
  }

  /* ---------- Màn hình bản đồ ---------- */

  function veBanDo() {
    thaoPhim();
    tt = doc();
    goc.innerHTML = '';

    var khung = el('div', 'panel ban-do');
    khung.appendChild(el('div', 'cot-truyen',
      NV.rong(78) +
      '<p>Rồng đã bắt công chúa nhốt trong lâu đài! Hiệp sĩ nhỏ ơi, hãy vượt qua ' +
      MAN.length + ' chặng đường và giải hết các bài toán để cứu công chúa nhé.</p>'));

    var tongSao = 0;
    Object.keys(tt.sao).forEach(function (k) { tongSao += tt.sao[k]; });
    khung.appendChild(el('p', 'lead',
      '⭐ Đã có <b>' + tongSao + '/' + (MAN.length * 3) + ' sao</b>' +
      (tt.daCuu ? ' · 👑 Bé đã cứu được công chúa rồi!' : '')));

    var ds = el('div', 'chang-list');
    MAN.forEach(function (man, i) {
      var khoa = i >= tt.mo;
      var sao = tt.sao[i] || 0;

      var nut = el('button', 'chang' + (khoa ? ' khoa' : '') + (man.boss ? ' boss' : ''));
      nut.type = 'button';
      nut.disabled = khoa;
      nut.style.setProperty('--mau', man.mau);
      nut.innerHTML =
        '<span class="so">' + (khoa ? '🔒' : man.emoji) + '</span>' +
        '<span class="chi-tiet"><b>Chặng ' + (i + 1) + ' · ' + man.ten + '</b>' +
        '<small>' + (khoa ? 'Qua chặng trước để mở khoá' : man.mota) + '</small></span>' +
        '<span class="sao">' + (khoa ? '' : '⭐'.repeat(sao) +
          '<span class="mo-sao">' + '⭐'.repeat(3 - sao) + '</span>') + '</span>';
      if (!khoa) nut.addEventListener('click', function () { vaoMan(i); });
      ds.appendChild(nut);
    });
    khung.appendChild(ds);

    if (tt.mo > 1 || tt.daCuu) {
      var lamLai = el('button', 'btn ghost', '↩︎ Chơi lại từ đầu');
      lamLai.type = 'button';
      lamLai.addEventListener('click', function () {
        if (confirm('Xoá hết tiến độ và chơi lại từ chặng 1?')) {
          ghi({ mo: 1, sao: {}, daCuu: false });
          veBanDo();
        }
      });
      khung.appendChild(el('div', 'actions')).appendChild(lamLai);
    }

    goc.appendChild(khung);
  }

  /* ---------- Vào một màn ---------- */

  function vaoMan(i) {
    var man = MAN[i];
    van = { man: man, chiSo: i, buoc: 0, tim: SO_TIM, daRa: {}, batDau: Date.now() };
    raCauHoi();
  }

  function sinhCau() {
    var q, khoa, lan = 0;
    do {
      q = Q.pick(van.man.de)();
      khoa = (q.prompt || '') + (q.text || '') + (q.after || '') + q.answer;
      lan++;
    } while (van.daRa[khoa] && lan < 30);
    van.daRa[khoa] = true;
    return q;
  }

  function raCauHoi() {
    thaoPhim();
    van.cau = sinhCau();
    van.khoa = false;
    van.goTiep = '';
    ve();
  }

  /* ---------- Vẽ màn chơi ---------- */

  function ve(hieuUng) {
    var man = van.man;
    goc.innerHTML = '';

    var khung = el('div', 'panel man-choi');
    khung.style.setProperty('--mau', man.mau);

    // thanh trạng thái
    var tren = el('div', 'thanh-tren');
    tren.appendChild(el('span', 'ten-man', man.emoji + ' Chặng ' + (van.chiSo + 1) + ' · ' + man.ten));
    var tim = '';
    for (var t = 0; t < SO_TIM; t++) tim += t < van.tim ? '❤️' : '<span class="mat">🤍</span>';
    tren.appendChild(el('span', 'tim', tim));
    khung.appendChild(tren);

    // cảnh đường đi
    var canh = el('div', 'canh');
    canh.style.setProperty('--nen', man.nen);

    // vài chi tiết nền cho cảnh đỡ trống
    var trangTri = el('div', 'trang-tri');
    trangTri.innerHTML = new Array(5).join().split(',')
      .map(function (_, k) { return '<span style="left:' + (6 + k * 23) + '%">' + man.emoji + '</span>'; })
      .join('');
    canh.appendChild(trangTri);

    var duong = el('div', 'duong');
    for (var b = 0; b < man.soCau; b++) {
      duong.appendChild(el('i', 'moc' + (b < van.buoc ? ' qua' : '')));
    }
    canh.appendChild(duong);

    var nguoi = el('div', 'nguoi-choi' + (hieuUng === 'tien' ? ' nhay' : ''), NV.hiepSi(64));
    nguoi.style.left = (van.buoc / man.soCau * 78) + '%';
    canh.appendChild(nguoi);

    var dich = el('div', 'dich' + (hieuUng === 'danh' ? ' rung' : ''),
      man.boss ? NV.rong(80) : NV.long(68));
    canh.appendChild(dich);

    if (man.boss) {
      var mau = el('div', 'thanh-mau');
      mau.innerHTML = '<i style="width:' + Math.round((1 - van.buoc / man.soCau) * 100) + '%"></i>';
      canh.appendChild(mau);
    }
    khung.appendChild(canh);

    khung.appendChild(el('div', 'meta',
      '<span>Câu ' + Math.min(van.buoc + 1, man.soCau) + ' / ' + man.soCau + '</span>' +
      '<span class="hits">' + (man.boss ? '🐉 Đánh trúng ' : '👣 Đã đi ') + van.buoc + '</span>'));

    veCauHoi(khung, van.cau);
    goc.appendChild(khung);
  }

  /* ---------- Vẽ câu hỏi + ô trả lời ---------- */

  function veCauHoi(khung, q) {
    if (q.prompt) khung.appendChild(el('p', 'prompt', q.prompt));
    if (q.art) khung.appendChild(el('div', 'art', q.art));

    var o = el('span', 'answer-box empty', '?');
    var dong = el('div', 'question');
    if (q.text) dong.innerHTML = q.text + ' ';
    dong.appendChild(o);
    if (q.after) dong.appendChild(el('span', null, ' ' + q.after));
    if (q.small || ((q.text || '') + (q.after || '')).replace(/&nbsp;/g, ' ').length > 12) {
      dong.classList.add('sm');
    }
    khung.appendChild(dong);

    var phanHoi = el('div', 'feedback', '&nbsp;');
    khung.appendChild(phanHoi);

    khung.appendChild(q.choices ? nutChon(q, o, phanHoi) : banPhim(q, o, phanHoi));
  }

  function nutChon(q, o, phanHoi) {
    var boc = el('div', 'choices');
    boc.style.setProperty('--cols', q.cols || q.choices.length);

    q.choices.forEach(function (gt) {
      var nut = el('button', 'choice', String(gt));
      nut.type = 'button';
      nut.addEventListener('click', function () {
        if (van.khoa) return;
        van.khoa = true;
        o.innerHTML = String(gt);
        o.classList.remove('empty');
        var dung = String(gt) === String(q.answer);
        nut.classList.add(dung ? 'is-ok' : 'is-bad');
        cham(dung, q, phanHoi);
      });
      boc.appendChild(nut);
    });
    return boc;
  }

  function banPhim(q, o, phanHoi) {
    var pad = el('div', 'pad');

    function veLai() {
      o.textContent = van.goTiep === '' ? '?' : van.goTiep;
      o.classList.toggle('empty', van.goTiep === '');
    }

    function go(d) {
      if (van.khoa || van.goTiep.length >= 3) return;
      if (van.goTiep === '0') van.goTiep = '';
      van.goTiep += d;
      veLai();
    }

    function xoa() {
      if (van.khoa) return;
      van.goTiep = van.goTiep.slice(0, -1);
      veLai();
    }

    function nop() {
      if (van.khoa || van.goTiep === '') return;
      van.khoa = true;
      cham(Number(van.goTiep) === Number(q.answer), q, phanHoi);
    }

    ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function (d) {
      var k = el('button', 'key', d);
      k.type = 'button';
      k.addEventListener('click', function () { go(d); });
      pad.appendChild(k);
    });

    var xl = el('button', 'key fn', '⌫');
    xl.type = 'button';
    xl.addEventListener('click', xoa);
    pad.appendChild(xl);

    var k0 = el('button', 'key', '0');
    k0.type = 'button';
    k0.addEventListener('click', function () { go('0'); });
    pad.appendChild(k0);

    var xoaHet = el('button', 'key fn', 'Xoá');
    xoaHet.type = 'button';
    xoaHet.addEventListener('click', function () {
      if (van.khoa) return;
      van.goTiep = '';
      veLai();
    });
    pad.appendChild(xoaHet);

    var ok = el('button', 'key wide', '⚔️ Tấn công');
    ok.type = 'button';
    ok.addEventListener('click', nop);
    pad.appendChild(ok);

    phimTat = function (ev) {
      if (ev.key >= '0' && ev.key <= '9') { go(ev.key); ev.preventDefault(); }
      else if (ev.key === 'Backspace') { xoa(); ev.preventDefault(); }
      else if (ev.key === 'Enter') { nop(); ev.preventDefault(); }
    };
    document.addEventListener('keydown', phimTat);

    veLai();
    return pad;
  }

  /* ---------- Chấm một câu ---------- */

  function cham(dung, q, phanHoi) {
    thaoPhim();

    if (dung) {
      van.buoc += 1;
      phanHoi.className = 'feedback pop ok';
      phanHoi.textContent = van.man.boss
        ? Q.pick(['⚔️ Trúng rồi!', '💥 Đánh mạnh lắm!', '🔥 Rồng yếu đi rồi!'])
        : Q.pick(['🎉 Giỏi quá!', '👏 Đi tiếp nào!', '⭐ Tuyệt vời!', '💪 Qua được rồi!']);

      setTimeout(function () {
        if (van.buoc >= van.man.soCau) return thangMan();
        ve(van.man.boss ? 'danh' : 'tien');
        setTimeout(raCauHoi, 520);
      }, 700);
      return;
    }

    van.tim -= 1;
    phanHoi.className = 'feedback pop bad';
    phanHoi.innerHTML = '💔 Chưa đúng — đáp án là <b>' + q.answer + '</b>';

    setTimeout(function () {
      if (van.tim <= 0) return thuaMan();
      raCauHoi();
    }, 1900);
  }

  /* ---------- Thắng / thua một màn ---------- */

  function thangMan() {
    thaoPhim();
    var sao = van.tim === SO_TIM ? 3 : van.tim === SO_TIM - 1 ? 2 : 1;
    var cuoiCung = van.chiSo === MAN.length - 1;

    tt = doc();
    if ((tt.sao[van.chiSo] || 0) < sao) tt.sao[van.chiSo] = sao;
    if (tt.mo < van.chiSo + 2) tt.mo = Math.min(van.chiSo + 2, MAN.length);
    if (cuoiCung) tt.daCuu = true;
    ghi(tt);

    goc.innerHTML = '';
    var khung = el('div', 'panel');

    if (cuoiCung) {
      khung.appendChild(el('div', 'doi-nhan-vat', NV.hiepSi(96) + NV.congChua(96)));
      khung.appendChild(el('h2', null, '👑 Bé đã cứu được công chúa!'));
      khung.appendChild(el('p', 'lead',
        'Hiệp sĩ nhỏ đã đánh bại rồng và đưa công chúa về nhà. Giỏi quá!'));
    } else {
      khung.appendChild(el('div', 'doi-nhan-vat', NV.hiepSi(90)));
      khung.appendChild(el('h2', null, '🎉 Qua chặng ' + (van.chiSo + 1) + '!'));
      khung.appendChild(el('p', 'lead', 'Chặng <b>' + MAN[van.chiSo + 1].ten + '</b> đã mở khoá.'));
    }

    khung.appendChild(el('div', 'stars',
      '⭐'.repeat(sao) + '<span class="off">' + '⭐'.repeat(3 - sao) + '</span>'));

    var actions = el('div', 'actions');
    if (!cuoiCung) {
      var tiep = el('button', 'btn go', '➡️ Chặng tiếp theo');
      tiep.type = 'button';
      tiep.addEventListener('click', function () { vaoMan(van.chiSo + 1); });
      actions.appendChild(tiep);
    }
    var veBd = el('button', 'btn ' + (cuoiCung ? 'go' : 'ghost'), '🗺️ Bản đồ');
    veBd.type = 'button';
    veBd.addEventListener('click', veBanDo);
    actions.appendChild(veBd);
    khung.appendChild(actions);

    goc.appendChild(khung);
    confetti();
  }

  function thuaMan() {
    thaoPhim();
    goc.innerHTML = '';

    var khung = el('div', 'panel');
    khung.appendChild(el('div', 'doi-nhan-vat', NV.rong(96)));
    khung.appendChild(el('h2', null, 'Hết mất rồi!'));
    khung.appendChild(el('p', 'lead',
      'Hiệp sĩ đã đi được <b>' + van.buoc + '/' + van.man.soCau + '</b> bước. ' +
      'Mình thử lại chặng này nhé — tiến độ các chặng trước vẫn còn nguyên.'));

    var actions = el('div', 'actions');
    var thu = el('button', 'btn go', '🔁 Thử lại chặng này');
    thu.type = 'button';
    thu.addEventListener('click', function () { vaoMan(van.chiSo); });
    actions.appendChild(thu);

    var veBd = el('button', 'btn ghost', '🗺️ Bản đồ');
    veBd.type = 'button';
    veBd.addEventListener('click', veBanDo);
    actions.appendChild(veBd);
    khung.appendChild(actions);

    goc.appendChild(khung);
  }

  /* ---------- Khởi động ---------- */

  global.GameCongChua = {
    MAN: MAN,
    batDau: function (idGoc) {
      goc = document.getElementById(idGoc || 'game');
      veBanDo();
    },
    // dành cho kiểm thử tự động
    _moVan: function (i) { van = { man: MAN[i], chiSo: i, buoc: 0, tim: SO_TIM, daRa: {} }; },
    _cauTiep: function () { return sinhCau(); }
  };
})(window);
