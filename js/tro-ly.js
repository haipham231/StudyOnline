/* ===== Trợ lý giải bài =====
   Chấm xong, với mỗi câu sai trợ lý nói lại đề, chỉ ra chỗ bé nhầm rồi giải
   từng bước.

   Trợ lý chạy ngay trong máy, không gọi dịch vụ nào bên ngoài: trang này là
   web tĩnh công khai nên không thể giấu khoá API ở đây được. Lời giải lấy từ
   hai nguồn:
     1. cau.giai — bộ sinh đề tự viết sẵn lời giải từng bước (bài nâng cao
        đều có);
     2. nếu không có thì suy từ tên mạch và các con số trong đề.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // Bỏ thẻ HTML để lấy chữ trần khi cô đọc lại đề. Phần <small> là lời dặn
  // cách gõ đáp án, đọc lại nghe lủng củng nên bỏ hẳn.
  function tran(s) {
    return String(s == null ? '' : s)
      .replace(/<small>[\s\S]*?<\/small>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,;:!?%)\]])/g, '$1')      // bỏ thẻ xong hay thừa dấu cách trước dấu câu
      .replace(/([(\[])\s+/g, '$1')
      .trim();
  }

  // Lấy các số trong một chuỗi, giữ cả số thập phân kiểu Việt (3,5)
  function soTrong(s) {
    return (tran(s).match(/\d+(?:,\d+)?/g) || []).map(function (x) {
      return Number(x.replace(',', '.'));
    });
  }

  /* ---------- Lời giải theo mạch ---------- */

  var THEO_MACH = {
    'Cộng trừ 100': function (q) {
      var n = soTrong(q.text);
      if (n.length < 2) return null;
      var cong = /\+/.test(q.text);
      if (!cong) return ['Tách số trừ ra cho dễ: ' + n[1] + ' = ' + Math.floor(n[1] / 10) * 10 +
        ' + ' + (n[1] % 10) + '.', 'Trừ phần chục trước, rồi trừ nốt phần đơn vị.'];
      return ['Cộng hàng đơn vị trước: ' + (n[0] % 10) + ' + ' + (n[1] % 10) + ' = ' + (n[0] % 10 + n[1] % 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' — vượt 10 nên nhớ 1 sang hàng chục.' : '.'),
        'Rồi cộng hàng chục: ' + Math.floor(n[0] / 10) + ' + ' + Math.floor(n[1] / 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' + 1 (số nhớ)' : '') + '.'];
    },
    'Tìm x': function (q) {
      var t = tran(q.text);
      if (/x \+/.test(t) || /\+ x/.test(t)) return ['x là một số hạng chưa biết.',
        'Muốn tìm số hạng chưa biết: lấy <b>tổng trừ đi số hạng kia</b>.'];
      if (/x −/.test(t) || /x -/.test(t)) return ['x là số bị trừ.',
        'Muốn tìm số bị trừ: lấy <b>hiệu cộng với số trừ</b>.'];
      if (/− x/.test(t) || /- x/.test(t)) return ['x là số trừ.',
        'Muốn tìm số trừ: lấy <b>số bị trừ trừ đi hiệu</b>.'];
      if (/x ×/.test(t) || /× x/.test(t)) return ['x là một thừa số chưa biết.',
        'Muốn tìm thừa số chưa biết: lấy <b>tích chia cho thừa số kia</b>.'];
      if (/x :/.test(t)) return ['x là số bị chia.', 'Muốn tìm số bị chia: lấy <b>thương nhân với số chia</b>.'];
      if (/: x/.test(t)) return ['x là số chia.', 'Muốn tìm số chia: lấy <b>số bị chia chia cho thương</b>.'];
      return null;
    },
    'Chia có dư': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var thuong = Math.floor(n[0] / n[1]);
      return ['Tìm xem ' + n[1] + ' nhân với mấy thì gần ' + n[0] + ' nhất mà không vượt quá: ' +
        n[1] + ' × ' + thuong + ' = ' + n[1] * thuong + '.',
        'Phần còn thừa chính là số dư: ' + n[0] + ' − ' + n[1] * thuong + ' = ' + (n[0] - n[1] * thuong) + '.',
        'Số dư luôn <b>nhỏ hơn số chia</b> — đây là chỗ hay nhầm nhất.'];
    },
    'Chu vi': function () {
      return ['Chu vi là độ dài đường bao quanh hình.',
        'Hình chữ nhật: <b>(dài + rộng) × 2</b>. Hình vuông: <b>cạnh × 4</b>.',
        'Chu vi đo bằng cm hoặc m, <b>không</b> có mũ hai.'];
    },
    'Diện tích': function () {
      return ['Diện tích là phần mặt bên trong hình.',
        'Hình chữ nhật: <b>dài × rộng</b>. Hình vuông: <b>cạnh × cạnh</b>.',
        'Hình bình hành: <b>đáy × chiều cao</b>. Hình thoi: <b>(chéo 1 × chéo 2) : 2</b>.',
        'Diện tích đo bằng cm² hoặc m² — nhớ viết mũ hai.'];
    },
    'Trung bình cộng': function (q) {
      var n = soTrong(q.prompt);
      if (!n.length) return null;
      var tong = n.reduce(function (a, b) { return a + b; }, 0);
      return ['Cộng tất cả các số lại: ' + n.join(' + ') + ' = ' + tong + '.',
        'Rồi chia cho <b>số lượng số</b> là ' + n.length + ': ' + tong + ' : ' + n.length + '.'];
    },
    'Tổng hiệu': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      return ['Số bé = (tổng − hiệu) : 2 = (' + n[0] + ' − ' + n[1] + ') : 2 = ' + ((n[0] - n[1]) / 2) + '.',
        'Số lớn = số bé + hiệu = ' + ((n[0] - n[1]) / 2) + ' + ' + n[1] + ' = ' + ((n[0] + n[1]) / 2) + '.',
        'Đọc kĩ đề hỏi số <b>lớn</b> hay số <b>bé</b> nhé.'];
    },
    'Tổng tỉ': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var soPhan = n[1] + 1;
      return ['Coi số bé là 1 phần thì số lớn là ' + n[1] + ' phần, cả hai là ' + soPhan + ' phần.',
        'Một phần = tổng : số phần = ' + n[0] + ' : ' + soPhan + ' = ' + (n[0] / soPhan) + '.',
        'Số bé = 1 phần, số lớn = ' + n[1] + ' phần.'];
    },
    'Đổi đơn vị': function () {
      return ['Đổi từ đơn vị <b>lớn sang nhỏ</b> thì <b>nhân</b>, từ nhỏ sang lớn thì chia.',
        '1 km = 1000 m · 1 m = 100 cm · 1 kg = 1000 g · 1 tấn = 1000 kg',
        '1 giờ = 60 phút · 1 phút = 60 giây · 1 thế kỉ = 100 năm'];
    },
    'Dấu hiệu chia hết': function () {
      return ['Chia hết cho <b>2</b>: tận cùng là 0, 2, 4, 6, 8.',
        'Chia hết cho <b>5</b>: tận cùng là 0 hoặc 5.',
        'Chia hết cho <b>3</b>: tổng các chữ số chia hết cho 3.',
        'Chia hết cho <b>9</b>: tổng các chữ số chia hết cho 9.'];
    },
    'Biểu thức': function () {
      return ['Trong biểu thức, làm <b>nhân chia trước, cộng trừ sau</b>.',
        'Nếu có dấu ngoặc thì làm <b>trong ngoặc trước</b>.'];
    },
    'Từ loại': function () {
      return ['Từ chỉ <b>sự vật</b> gọi tên người, vật, cây cối, hiện tượng.',
        'Từ chỉ <b>hoạt động</b> nói việc ai đó làm.',
        'Từ chỉ <b>đặc điểm</b> tả màu sắc, hình dáng, tính nết.'];
    },
    'Chính tả': function (q) {
      return ['Đáp án đúng là <b>' + tran(q.answer) + '</b>.',
        'Mẹo: đọc to từ lên, so với từ mình vẫn gặp trong sách.'];
    },
    'Mẫu câu': function () {
      return ['<b>Ai là gì?</b> — giới thiệu, sau “là” thường là danh từ.',
        '<b>Ai làm gì?</b> — kể việc làm, có động từ.',
        '<b>Ai thế nào?</b> — tả đặc điểm, có tính từ.'];
    },
    'Đọc hiểu': function () {
      return ['Đọc lại đoạn văn rồi tìm <b>đúng câu chữ</b> nhắc tới điều đề hỏi.',
        'Câu trả lời gần như luôn nằm sẵn trong đoạn, không cần suy đoán xa.'];
    }
  };

  // tên mạch có thể là "Bảng nhân 2", "Bảng chia 5"… nên dò theo tiền tố
  function timLuat(mach) {
    if (!mach) return null;
    if (THEO_MACH[mach]) return THEO_MACH[mach];
    var khoa = Object.keys(THEO_MACH).filter(function (k) { return mach.indexOf(k) === 0; })[0];
    return khoa ? THEO_MACH[khoa] : null;
  }

  function buoc(m) {
    var q = m.cau || {};
    if (q.giai) return [].concat(q.giai);
    var luat = timLuat(m.mach || q.mach);
    if (luat) {
      var ra = luat(q);
      if (ra && ra.length) return ra;
    }
    return ['Đáp án đúng là <b>' + tran(m.answer) + '</b>, bé trả lời <b>' + tran(m.given) + '</b>.',
      'Bé đọc lại đề một lần nữa rồi thử tự làm lại câu này nhé.'];
  }

  /* ---------- Cô Nhi hiện lên giảng bài ---------- */

  var TEN_CO = 'Cô Nhi — AI';

  // Mười hai dáng cô giáo cắt sẵn. Mỗi bài giảng đổi một dáng cho đỡ chán.
  var DANG = [
    '1-thuoc-sach', '2-bang-den', '3-om-sach', '4-gio-tay',
    '5-giang-bai', '6-nghi-ngoi', '7-bang-trang', '8-chi-sach',
    '9-may-tinh', '10-co-len', '11-xoa-dau', '12-tam-biet'
  ];
  var dangTruoc = -1;

  // Trang bài tập nằm sâu một hoặc hai tầng thư mục, nên lấy gốc trang từ
  // chính đường dẫn của tệp js này thay vì đoán bằng ../
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/tro-ly\.js(\?|$)/.test(src)) return src.replace(/js\/tro-ly\.js.*$/, '');
    }
    return '';
  })();

  function dangNgauNhien() {
    var k;
    do { k = Math.floor(Math.random() * DANG.length); }
    while (DANG.length > 1 && k === dangTruoc);
    dangTruoc = k;
    return GOC + 'assets/co-giao/' + DANG[k] + '.png';
  }

  /* Bài giảng cho một câu sai: từng câu nói ngắn, cô nói lần lượt. */
  function loiGiang(m, thuTu, tong) {
    var noi = [];
    noi.push('Mình cùng xem lại <b>câu ' + thuTu + '</b> trong ' + tong +
      ' câu con làm chưa đúng nhé.');
    // Bài đọc hiểu có nguyên đoạn văn trong đề; đọc lại cả đoạn thì màn hình
    // điện thoại không chứa nổi một bài giảng, nên chỉ nhắc phần cuối.
    var de = tran(m.label);
    if (de.length > 200) de = '…' + de.slice(de.length - 190);
    noi.push('Đề bài là: <i>' + de + (m.after ? ' (' + tran(m.after) + ')' : '') + '</i>');
    noi.push('Con trả lời <b class="sai">' + tran(m.given) + '</b>, còn đáp án đúng là <b class="dung">' +
      tran(m.answer) + '</b>.');
    noi.push('Cô giảng lại từ đầu nha:');
    buoc(m).forEach(function (b, i) { noi.push('<span class="buoc">' + (i + 1) + '</span> ' + b); });
    noi.push(KHUYEN[Math.floor(Math.random() * KHUYEN.length)]);
    return noi;
  }

  var KHUYEN = [
    'Con hiểu rồi chứ? Lần sau gặp dạng này con làm được ngay thôi!',
    'Dạng bài này chỉ cần nhớ đúng một bước là xong. Con giỏi lắm!',
    'Sai một câu không sao cả, biết vì sao sai mới là điều quan trọng nhé.',
    'Con thử tự làm lại câu này một lần nữa cho nhớ lâu nhé!',
    'Cô tin lần sau con sẽ làm đúng câu này.'
  ];

  /* Cô có nói thành tiếng hay không — nhớ lại lựa chọn của lần trước. */
  var KHOA_NOI = 'studyonline:co-noi';

  function dangBatTieng() {
    try { return localStorage.getItem(KHOA_NOI) !== '0'; } catch (e) { return true; }
  }
  function datTieng(bat) {
    try { localStorage.setItem(KHOA_NOI, bat ? '1' : '0'); } catch (e) { /* chế độ riêng tư */ }
  }

  function thoiNoi() {
    if (global.speechSynthesis) { try { global.speechSynthesis.cancel(); } catch (e) {} }
  }

  /* Gõ chữ ra từ từ cho giống đang nói, và nếu bật tiếng thì cô đọc luôn
     từng câu. Câu sau chỉ bắt đầu khi câu trước vừa gõ xong vừa đọc xong.
     Trả về hàm tua nhanh tới hết. */
  // dòng có số thứ tự bước thì xếp theo cột, chữ xuống dòng vẫn thẳng hàng
  function lopDongChung(html) {
    return 'cau' + (/^<span class="buoc">/.test(html) ? ' co-buoc' : '');
  }

  function goChu(oChua, cacCau, xong, coTieng) {
    var lopDong = lopDongChung;
    var i = 0, huy = false, hen = null, dong = null, chuoi = null, vt = 0;
    var goXong = false, noiXong = false, daSang = false;

    function cauSau() {
      if (huy) return;
      if (i >= cacCau.length) { if (xong) xong(); return; }
      dong = el('p', lopDong(cacCau[i]));
      oChua.appendChild(dong);
      chuoi = cheNho(cacCau[i]);
      vt = 0;
      goXong = false;
      daSang = false;
      noiXong = true;

      if (coTieng && global.Quiz && global.Quiz.docTo) {
        noiXong = false;
        global.Quiz.docTo(cacCau[i], null, {
          giangBai: true, noiTiep: i > 0,
          xong: function () { noiXong = true; thuSang(); }
        });
      }
      i++;
      goTiep();
    }

    function thuSang() {
      if (huy || daSang || !goXong || !noiXong) return;
      daSang = true;
      hen = setTimeout(cauSau, 240);
    }

    // tách chuỗi HTML thành từng mẩu: thẻ hiện ngay, chữ hiện từng con một
    function cheNho(html) {
      var ra = [], re = /<[^>]+>|&[a-z#0-9]+;|[\s\S]/g, m;
      while ((m = re.exec(html))) ra.push(m[0]);
      return ra;
    }

    function goTiep() {
      if (huy) return;
      var den = Math.min(chuoi.length, vt + 1);
      dong.innerHTML = chuoi.slice(0, den).join('');
      lan();
      if (den >= chuoi.length) { vt = den; goXong = true; thuSang(); return; }
      var c = chuoi[den - 1];
      vt = den;
      // bật tiếng thì gõ chậm lại cho khớp nhịp cô nói
      var cho = coTieng ? 32 : 17;
      if (c === ',' || c === ';' || c === ':') cho = coTieng ? 190 : 150;
      else if (c === '.' || c === '!' || c === '?') cho = coTieng ? 300 : 240;
      hen = setTimeout(goTiep, cho);
    }

    function lan() {
      // luôn giữ dòng mới nhất trong tầm mắt
      oChua.scrollTop = oChua.scrollHeight;
    }

    cauSau();

    return {
      het: function () {
        if (huy) return;
        clearTimeout(hen);
        thoiNoi();
        if (dong && chuoi) dong.innerHTML = chuoi.join('');
        while (i < cacCau.length) {
          oChua.appendChild(el('p', lopDong(cacCau[i]), cacCau[i]));
          i++;
        }
        lan();
        if (xong) xong();
      },
      dung: function () { huy = true; clearTimeout(hen); thoiNoi(); }
    };
  }

  /* Popup cô giáo: mỗi lần một bài giảng, điện thoại hiện trọn vẹn. */
  function moHop(cacSai, batDau) {
    var k = batDau || 0, dangGo = null;

    var nen = el('div', 'nen-co');
    var hop = el('div', 'hop-co');
    hop.setAttribute('role', 'dialog');
    hop.setAttribute('aria-modal', 'true');
    hop.setAttribute('aria-label', TEN_CO + ' giảng bài');
    nen.appendChild(hop);

    var dau = el('div', 'co-dau');
    dau.appendChild(el('span', 'co-ten', '👩‍🏫 ' + TEN_CO));
    var dem = el('span', 'co-dem');
    dau.appendChild(dem);
    var nutLoa = el('button', 'co-loa', '');
    nutLoa.type = 'button';
    dau.appendChild(nutLoa);
    veLoa();

    function veLoa() {
      var bat = dangBatTieng();
      nutLoa.textContent = bat ? '🔊' : '🔇';
      nutLoa.classList.toggle('tat-tieng', !bat);
      nutLoa.title = bat ? 'Tắt tiếng cô' : 'Bật tiếng cô';
      nutLoa.setAttribute('aria-label', nutLoa.title);
      nutLoa.setAttribute('aria-pressed', bat ? 'true' : 'false');
    }
    var nutDong = el('button', 'co-dong', '✕');
    nutDong.type = 'button';
    nutDong.setAttribute('aria-label', 'Đóng');
    dau.appendChild(nutDong);
    hop.appendChild(dau);

    var than = el('div', 'co-than');
    var anh = el('img', 'co-anh');
    anh.alt = TEN_CO;
    anh.decoding = 'async';
    than.appendChild(anh);
    var bong = el('div', 'co-bong');
    var loi = el('div', 'co-loi');
    bong.appendChild(loi);
    than.appendChild(bong);
    hop.appendChild(than);

    var chan = el('div', 'co-chan');
    var nutTua = el('button', 'btn ghost co-tua', '⏩ Nói nhanh');
    nutTua.type = 'button';
    chan.appendChild(nutTua);
    var nutHieu = el('button', 'btn go co-hieu', 'Em đã hiểu');
    nutHieu.type = 'button';
    chan.appendChild(nutHieu);
    hop.appendChild(chan);

    /* Ướm thử cả bài giảng một lượt để chọn cỡ chữ vừa khung, rồi mới cho
       cô nói. Làm vậy chữ không nhảy cỡ giữa chừng, mà bài dài tới đâu
       màn hình điện thoại vẫn chứa trọn một bài. */
    function chonCoChu(cacCau) {
      var co = 16;
      loi.style.fontSize = co + 'px';
      loi.innerHTML = cacCau.map(function (c) {
        return '<p class="' + lopDongChung(c) + '">' + c + '</p>';
      }).join('');
      while (co > 12.5 && bong.scrollHeight > bong.clientHeight) {
        co -= 0.5;
        loi.style.fontSize = co + 'px';
      }
      loi.innerHTML = '';
    }

    function ve() {
      if (dangGo) dangGo.dung();
      loi.innerHTML = '';
      anh.src = dangNgauNhien();
      dem.textContent = 'Bài giảng ' + (k + 1) + ' / ' + cacSai.length;
      nutHieu.textContent = k + 1 < cacSai.length ? 'Em đã hiểu → câu sau' : 'Em đã hiểu';
      nutTua.disabled = false;
      hop.classList.add('dang-noi');
      thoiNoi();
      var cacCau = loiGiang(cacSai[k], k + 1, cacSai.length);
      chonCoChu(cacCau);
      dangGo = goChu(loi, cacCau, function () {
        nutTua.disabled = true;
        hop.classList.remove('dang-noi');
      }, dangBatTieng());
    }

    function dong() {
      if (dangGo) dangGo.dung();
      thoiNoi();
      document.removeEventListener('keydown', phim);
      document.body.classList.remove('khoa-cuon');
      nen.classList.add('tat');
      setTimeout(function () { if (nen.parentNode) nen.parentNode.removeChild(nen); }, 180);
    }

    function phim(ev) {
      if (ev.key === 'Escape') { dong(); ev.preventDefault(); }
      else if (ev.key === 'Enter' || ev.key === ' ') { nutHieu.click(); ev.preventDefault(); }
    }

    nutTua.addEventListener('click', function () { if (dangGo) dangGo.het(); });
    nutDong.addEventListener('click', dong);
    nen.addEventListener('click', function (ev) { if (ev.target === nen) dong(); });
    nutHieu.addEventListener('click', function () {
      if (k + 1 < cacSai.length) { k++; ve(); }
      else dong();
    });
    nutLoa.addEventListener('click', function () {
      var bat = !dangBatTieng();
      datTieng(bat);
      veLoa();
      // bật lên giữa chừng thì cô giảng lại bài này từ đầu cho có tiếng
      if (bat) ve(); else thoiNoi();
    });
    document.addEventListener('keydown', phim);

    document.body.appendChild(nen);
    document.body.classList.add('khoa-cuon');
    requestAnimationFrame(function () { nen.classList.add('hien'); });
    ve();
    nutHieu.focus();
  }

  /* Khối hiện dưới phiếu điểm: một nút mời cô giáo lên giảng. */
  function veBang(cacSai) {
    var khung = el('div', 'tro-ly');
    khung.appendChild(el('h3', null, '👩‍🏫 ' + TEN_CO + ' giảng lại bài'));
    khung.appendChild(el('p', 'tro-ly-dan',
      'Con làm chưa đúng ' + cacSai.length + ' câu. Bấm nút dưới đây, cô sẽ giảng ' +
      'lại từng câu một cho con nghe.'));

    var nut = el('button', 'btn go nut-giang', '🧑‍🏫 Giải thích câu sai');
    nut.type = 'button';
    nut.addEventListener('click', function () { moHop(cacSai, 0); });
    khung.appendChild(nut);
    return khung;
  }

  global.TroLy = { veBang: veBang, moHop: moHop, buoc: buoc, _soTrong: soTrong };
})(window);
