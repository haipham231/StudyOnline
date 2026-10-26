/* ===== Game "Đưa bạn thú về nhà" — bài Con vật sống ở đâu =====

   Bản cũ là một câu hỏi trắc nghiệm: "Con chim sống ở đâu?" rồi bấm một
   trong ba ô dưới nước / trên cạn / trên trời. Chủ dự án muốn bé CẦM con vật
   đặt vào đúng nhà, và nhà phải là nơi cụ thể đẹp đẽ — xứ băng giá, rừng nhiệt
   đới, sa mạc — chứ không phải ba ô chung chung.

   Luồng một lượt:
     cắt cảnh mở đầu (các bạn thú bị lạc đường)
       → tám vòng: bé kéo con vật thả vào một trong ba nơi
     cắt cảnh kết thúc (các bạn về tới nhà rồi) kèm sao

   Thả sai thì con vật trôi về chỗ cũ, bé thử lại tới khi đúng — bé ba tuổi
   bị "sai rồi, sang câu khác" là nản. Điểm chỉ tính những con đặt đúng ngay
   lần đầu, sai hai lần thì nơi đúng sáng lên gợi ý.

   Tiến độ lưu đúng khuôn của Quiz ({score, correct, total}) để huy hiệu và
   số sao ở trang chủ mầm non vẫn đọc được như mọi bài khác.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz, CV = global.ConVat;
  var SO_CAU = 8;
  var goc = null, cauHinh = null, van = null;

  function el(tag, cls, html) {
    var o = global.document.createElement(tag);
    if (cls) o.className = cls;
    if (html != null) o.innerHTML = html;
    return o;
  }

  function doc(t) { if (Q && Q.docTo) Q.docTo(t, 'vi', {}); }

  // bảng CON_VAT viết không đều: "con sư tử" có chữ con, "gấu trúc" thì không
  function tenDu(c) { return /^con /.test(c.ten) ? c.ten : 'con ' + c.ten; }

  /* Hình con vật. ConVat.anhCon trả về thẳng emoji cho con nào không có tệp
     riêng, mà trang bài tập cũ nhờ o-tra-loi.js đổi emoji ra hình vẽ. Game
     này không đi qua o-tra-loi.js nên phải tự đổi, không thì con bướm hiện
     thành emoji hệ thống bé tí. */
  function hinhCon(c) {
    var h = CV.anhCon(c);
    return global.HinhVe && global.HinhVe.doi ? global.HinhVe.doi(h) : h;
  }

  /* Tranh nơi sống: tranh vẽ kín nền (nằm dưới tranh/) thì phủ trọn ô; còn
     hình dán nền trong suốt (dưới dan/) thì đặt giữa nền màu. */
  function laTranh(duong) { return /^tranh\//.test(duong); }

  function veNoi(k) {
    var n = CV.NOI[k];
    var o = el('div', 'o-noi' + (laTranh(n.hinh) ? ' co-tranh' : ''));
    o.dataset.k = k;
    o.style.setProperty('--nen', n.nen);
    o.innerHTML = global.HinhVe.veTen(n.hinh, laTranh(n.hinh) ? 'tranh-noi' : 'dan-noi');
    o.appendChild(el('div', 'cho-dat'));
    return o;
  }

  /* ---------- chọn đề ---------- */

  /* Chọn con theo NƠI trước rồi mới chọn con trong nơi đó. Bốc thẳng từ bảng
     bảy mươi mốt con thì biển chiếm mười bảy con, một lượt tám câu dễ ra năm
     câu toàn cá — bé không được gặp đủ các nơi. */
  function boDe() {
    var theoNoi = {};
    CV.DS.forEach(function (c) { (theoNoi[c.noi] = theoNoi[c.noi] || []).push(c); });
    var cacNoi = Q.shuffle(Object.keys(theoNoi));
    var ra = [], da = {};
    for (var i = 0; ra.length < SO_CAU && i < SO_CAU * 6; i++) {
      var k = cacNoi[i % cacNoi.length];
      var con = Q.shuffle(theoNoi[k].filter(function (c) { return !da[c.ten]; }))[0];
      if (!con) continue;
      da[con.ten] = 1;
      ra.push(con);
    }
    return ra;
  }

  /* Hai nơi sai. Không lấy nơi dễ nhầm với nơi đúng, cũng không lấy hai nơi
     dễ nhầm với nhau — rừng với rừng nhiệt đới đứng cạnh nhau thì chính
     người lớn cũng ngập ngừng. */
  function haiNoiSai(dung) {
    var tranh = [dung].concat(CV.NOI[dung].gan || []);
    var ra = [];
    Q.shuffle(Object.keys(CV.NOI)).forEach(function (k) {
      if (ra.length >= 2 || tranh.indexOf(k) >= 0) return;
      ra.push(k);
      tranh = tranh.concat(CV.NOI[k].gan || []);
    });
    return ra;
  }

  /* ---------- cắt cảnh ---------- */

  var CANH = {
    moDau: {
      hinh: 'tranh/cat-canh/noi-song-mo-dau',
      loi: 'Ôi, các bạn thú bị lạc đường rồi! Bé giúp các bạn về đúng nhà nhé.'
    },
    ketThuc: { hinh: 'tranh/cat-canh/noi-song-ket-thuc' }
  };

  function moDau() {
    global.CatCanh.hien(goc, {
      hinh: CANH.moDau.hinh,
      loi: CANH.moDau.loi,
      cacNut: [{ chu: 'Giúp các bạn ▶', bam: batDauLuot }]
    });
  }

  function ketThuc() {
    var tong = van.de.length, dung = van.dungNgay;
    var diem = Math.round(dung / tong * 100);
    var sao = dung / tong >= 0.9 ? 3 : dung / tong >= 0.7 ? 2 : dung / tong >= 0.5 ? 1 : 0;

    // lưu đúng khuôn của Quiz để huy hiệu và trang chủ đọc được
    var cu = Q.readBest ? Q.readBest(cauHinh.id) : null;
    if (Q.writeBest && (!cu || diem > (cu.score || 0))) {
      Q.writeBest(cauHinh.id, {
        score: diem, correct: dung, total: tong,
        seconds: Math.round((Date.now() - van.batDau) / 1000),
        date: new Date().toISOString().slice(0, 10)
      });
    }

    global.CatCanh.hien(goc, {
      hinh: CANH.ketThuc.hinh,
      loi: 'Các bạn thú về tới nhà rồi! Cảm ơn bé nhiều lắm.',
      them: '<div class="stars">' + '⭐'.repeat(sao) +
            '<span class="off">' + '⭐'.repeat(3 - sao) + '</span></div>' +
            '<p class="lead">Bé đưa đúng <b>' + dung + ' / ' + tong + '</b> bạn ngay lần đầu</p>',
      cacNut: [
        { chu: '🔁 Chơi lại', lop: 'chinh', bam: batDauLuot },
        { chu: '← Bài khác', lop: 'phu', href: cauHinh.quayLai || '../index.html' }
      ]
    });
  }

  /* ---------- một vòng ---------- */

  function batDauLuot() {
    van = { de: boDe(), i: 0, dungNgay: 0, batDau: Date.now() };
    vongMoi();
  }

  function vongMoi() {
    if (van.i >= van.de.length) return ketThuc();
    var con = van.de[van.i];
    var cacNoi = Q.shuffle([con.noi].concat(haiNoiSai(con.noi)));
    var saiLan = 0, xong = false;

    goc.innerHTML = '';
    var khung = el('div', 'panel kids san-noi-song');
    goc.appendChild(khung);

    khung.appendChild(el('div', 'dem-the', 'Bạn thứ ' + (van.i + 1) + ' / ' + van.de.length));

    var de = 'Bé đưa ' + tenDu(con) + ' về nhà nhé!';
    var dong = el('p', 'prompt', de + ' ');
    var loa = el('button', 'loa', '🔊');
    loa.type = 'button';
    loa.addEventListener('click', function () { doc(de); });
    dong.appendChild(loa);
    khung.appendChild(dong);

    var cho = el('div', 'cho-con');
    var vat = el('div', 'con-keo', hinhCon(con));
    cho.appendChild(vat);
    cho.appendChild(el('div', 'goi-y-keo', '☝️ Kéo bạn ấy vào đúng nhà'));
    khung.appendChild(cho);

    var ba = el('div', 'ba-noi');
    var oNoi = cacNoi.map(veNoi);
    oNoi.forEach(function (o) { ba.appendChild(o); });
    khung.appendChild(ba);

    var phanHoi = el('div', 'feedback');
    khung.appendChild(phanHoi);

    var keo = global.KeoTha.gan(vat, oNoi, {
      khiDiQua: function (d) {
        oNoi.forEach(function (o) { o.classList.toggle('dang-tro', o === d); });
      },
      khiTha: function (d) {
        if (xong) return;
        if (d.dataset.k === con.noi) dung(d); else sai(d);
      }
    });

    function dung(d) {
      xong = true;
      keo.khoa(true);
      if (saiLan === 0) van.dungNgay++;
      // con vật "về nhà": hiện trong ô nơi đúng, chỗ cầm phía trên để trống
      d.querySelector('.cho-dat').innerHTML = hinhCon(con);
      d.classList.add('dung');
      vat.style.visibility = 'hidden';
      var loi = 'Đúng rồi! ' + tenDu(con).replace(/^c/, 'C') + ' sống ' + CV.NOI[con.noi].ten + '.';
      phanHoi.innerHTML = '🎉 ' + loi;
      phanHoi.className = 'feedback ok';
      doc(loi);
      // chờ bấm Tiếp, kẻo câu sau đọc đè lên câu khen đang đọc dở
      Q.nutTiep(phanHoi, function () { keo.go(); van.i++; vongMoi(); },
        van.i + 1 < van.de.length ? 'Bạn tiếp theo ▶' : 'Xong rồi ▶');
    }

    function sai(d) {
      saiLan++;
      keo.veCho();
      d.classList.remove('lac');
      void d.offsetWidth;
      d.classList.add('lac');
      phanHoi.innerHTML = 'Chưa đúng rồi, bé thử lại nhé!';
      phanHoi.className = 'feedback bad';
      doc('Chưa đúng rồi, bé thử lại nhé!');
      // sai hai lần thì nơi đúng sáng lên, kẻo bé loay hoay mãi rồi bỏ cuộc
      if (saiLan >= 2) {
        oNoi.forEach(function (o) { if (o.dataset.k === con.noi) o.classList.add('goi-y'); });
      }
    }

    global.setTimeout(function () { doc(de); }, 250);
  }

  global.GameNoiSong = {
    batDau: function (idGoc, ch) {
      goc = global.document.getElementById(idGoc || 'quiz');
      cauHinh = ch || {};
      moDau();
    },
    // cho bộ test
    _boDe: boDe,
    _haiNoiSai: haiNoiSai,
    CANH: CANH
  };
})(window);
