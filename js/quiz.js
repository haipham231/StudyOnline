/* ===== Học Toán Lớp 1 — engine bài tập dùng chung ===== */
(function (global) {
  'use strict';

  var STORE = 'studyonline:';

  /* ---------- tiện ích sinh đề ---------- */

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randInt(0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /** Tạo n lựa chọn gồm đáp án đúng và các số gần đó, đã xáo trộn. */
  function choicesAround(answer, n, min, max) {
    var set = [answer];
    var step = 1;
    while (set.length < n && step < 12) {
      [answer - step, answer + step].forEach(function (v) {
        if (set.length < n && v >= min && v <= max && set.indexOf(v) === -1) set.push(v);
      });
      step++;
    }
    return shuffle(set);
  }

  function repeatArt(emoji, count) {
    return new Array(count + 1).join(emoji);
  }

  /* ---------- lưu kỷ lục ---------- */

  function readBest(id) {
    try {
      return JSON.parse(localStorage.getItem(STORE + id) || 'null');
    } catch (e) {
      return null;
    }
  }

  function writeBest(id, data) {
    try {
      localStorage.setItem(STORE + id, JSON.stringify(data));
    } catch (e) {
      /* chế độ riêng tư không lưu được — vẫn chơi bình thường */
    }
  }

  function readLichSu(id) {
    try {
      return JSON.parse(localStorage.getItem(STORE + 'lichsu:' + id) || '[]');
    } catch (e) {
      return [];
    }
  }

  function ghiLichSu(id, ban) {
    try {
      var ds = readLichSu(id);
      ds.unshift(ban);
      localStorage.setItem(STORE + 'lichsu:' + id, JSON.stringify(ds.slice(0, 5)));
    } catch (e) { /* không lưu được cũng không sao */ }
  }

  // Đánh giá theo Thông tư 27 về đánh giá học sinh tiểu học
  function xepLoai(diem) {
    if (diem >= 9) return { ten: 'Hoàn thành tốt', mascot: '🏆', mau: 'tot' };
    if (diem >= 6.5) return { ten: 'Hoàn thành', mascot: '🥳', mau: 'dat' };
    if (diem >= 5) return { ten: 'Hoàn thành', mascot: '🙂', mau: 'dat' };
    return { ten: 'Chưa hoàn thành', mascot: '🐣', mau: 'chua' };
  }

  function starsFor(correct, total) {
    var ratio = correct / total;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.5) return 1;
    return 0;
  }

  /* ---------- tiện ích DOM ---------- */

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + (s < 10 ? '0' + s : s);
  }

  /* ---------- đọc to ---------- */

  var TIENG = {
    vi: { ma: 'vi-VN', tim: /^vi/i, nhanh: 0.88 },
    // tiếng Anh đọc chậm hơn nữa: bé Việt mới làm quen, nghe tốc độ thường
    // là trôi mất cả từ
    en: { ma: 'en-US', tim: /^en/i, nhanh: 0.78 }
  };

  // Tên giọng mỗi hệ điều hành một kiểu, Web Speech API lại không cho biết
  // giọng nào nam giọng nào nữ, nên phải dò bằng danh sách tên. Cô Nhi là cô
  // giáo nên ưu tiên giọng nữ — may là giọng tiếng Việt sẵn có hầu hết là nữ.
  var TEN_NU = /\b(linh|mai|lan|ng[oọ]c|thu|hoai|my|female|woman|samantha|victoria|karen|moira|tessa|zira|hazel|aria|jenny|flo|sandy|shelley|grandma)\b/i;

  var giong = { vi: null, en: null };

  function timGiong() {
    if (!global.speechSynthesis) return;
    var ds = global.speechSynthesis.getVoices() || [];
    Object.keys(TIENG).forEach(function (k) {
      var hop = ds.filter(function (v) { return TIENG[k].tim.test(v.lang); });
      giong[k] =
        hop.filter(function (v) { return TEN_NU.test(v.name); })[0] ||
        // giọng cài sẵn trong máy nghe mượt hơn giọng tải về qua mạng
        hop.filter(function (v) { return v.localService; })[0] ||
        hop[0] || null;
    });
  }

  if (global.speechSynthesis) {
    timGiong();
    global.speechSynthesis.onvoiceschanged = timGiong;
  }

  /* Chuyển chữ trên màn hình thành câu đọc được: bỏ thẻ HTML và đổi ký hiệu
     toán sang lời nói, nếu không máy đọc "3 × 4" thành "ba bốn". */
  var KY_HIEU = [
    // số thứ tự của bước giảng là để nhìn, đọc lên thành "một, hai, ba" nghe kỳ
    [/<span class="buoc">[^<]*<\/span>/g, ' '],
    [/<sup>([^<]*)<\/sup>/g, ' mũ $1 '],
    [/<span class="ps"><i>([^<]*)<\/i><b>([^<]*)<\/b><\/span>/g, ' $1 phần $2 '],
    [/<[^>]+>/g, ' '],
    [/&nbsp;/g, ' '], [/&lt;/g, ' bé hơn '], [/&gt;/g, ' lớn hơn '], [/&amp;/g, ' và '],
    [/(\d)\s*\/\s*(\d)/g, '$1 phần $2'],
    [/²/g, ' bình phương '], [/³/g, ' lập phương '],
    [/[×·]/g, ' nhân '], [/÷/g, ' chia '],
    [/(\d)\s*:\s*(\d)/g, '$1 chia $2'],
    [/[−–—]/g, ' trừ '], [/(\d)\s*-\s*(\d)/g, '$1 trừ $2'],
    [/\+/g, ' cộng '], [/=/g, ' bằng '],
    [/</g, ' bé hơn '], [/>/g, ' lớn hơn '],
    [/%/g, ' phần trăm '], [/°/g, ' độ '],
    [/[“”"]/g, ' '], [/\s+/g, ' '],
    [/\s+([.,;!?])/g, '$1']          // bỏ thẻ xong hay thừa dấu cách trước dấu câu
  ];

  function locLoiDoc(html) {
    var t = String(html == null ? '' : html);
    KY_HIEU.forEach(function (c) { t = t.replace(c[0], c[1]); });
    return t.trim();
  }

  // Câu toàn chữ không dấu, không có ký tự riêng của tiếng Việt thì coi là
  // câu tiếng Anh — đọc bằng giọng Anh nghe mới ra tiếng.
  function doanTieng(cau) {
    return /[ăâđêôơưàáạảãèéẹẻẽìíịỉĩòóọỏõùúụủũỳýỵỷỹ]/i.test(cau) ? 'vi' : 'en';
  }

  /**
   * docTo(text, ma, tuyChon)
   *   ma      : 'vi' | 'en' — bỏ trống thì đoán theo chữ
   *   tuyChon : { giangBai, cao, nhanh, noiTiep, xong }
   *     giangBai — cô giảng bài thì nói nhanh hơn lúc đọc đề cho bé
   *     noiTiep  — không cắt câu đang đọc dở, nối vào sau
   */
  function docTo(text, ma, tuyChon) {
    tuyChon = tuyChon || {};
    var loiDoc = locLoiDoc(text);
    if (!global.speechSynthesis || !loiDoc) { if (tuyChon.xong) tuyChon.xong(); return; }
    var khoa = ma === 'en' || ma === 'vi' ? ma : doanTieng(loiDoc);
    var t = TIENG[khoa];
    try {
      if (!tuyChon.noiTiep) global.speechSynthesis.cancel();
      var loi = new global.SpeechSynthesisUtterance(loiDoc);
      loi.lang = t.ma;
      // cô giảng bài thì nói nhanh hơn chút so với lúc đọc đề cho bé
      loi.rate = tuyChon.nhanh || (tuyChon.giangBai ? Math.min(1, t.nhanh + 0.07) : t.nhanh);
      if (!giong[khoa]) timGiong();
      if (giong[khoa]) loi.voice = giong[khoa];
      if (tuyChon.cao) loi.pitch = tuyChon.cao;
      if (tuyChon.xong) {
        var daGoi = false;
        var goi = function () { if (!daGoi) { daGoi = true; tuyChon.xong(); } };
        loi.onend = goi;
        loi.onerror = goi;
        // vài trình duyệt nuốt mất onend, nên chốt thêm hẹn giờ phòng hờ
        setTimeout(goi, 1200 + loiDoc.length * 95);
      }
      global.speechSynthesis.speak(loi);
    } catch (e) {
      /* máy không đọc được thì bé vẫn nhìn hình để chơi */
      if (tuyChon.xong) tuyChon.xong();
    }
  }

  function confetti() {
    var colors = ['#4aa8ff', '#8b7bf7', '#2fcf90', '#ffc93c', '#ff7a7a', '#ff8fd0'];
    var layer = el('div', 'confetti');
    for (var i = 0; i < 70; i++) {
      var bit = document.createElement('i');
      bit.style.left = Math.random() * 100 + '%';
      bit.style.background = colors[i % colors.length];
      bit.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
      bit.style.animationDelay = (Math.random() * 0.6) + 's';
      layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 4200);
  }

  /* ---------- engine ---------- */

  var KHEN = ['🎉 Giỏi quá!', '👏 Chính xác!', '⭐ Tuyệt vời!', '✅ Đúng rồi!', '🥳 Siêu ghê!', '💪 Quá đỉnh!'];

  /**
   * config = {
   *   id, total,
   *   levels: [{ name, hint, gen }]
   * }
   * gen() trả về:
   *   { prompt?, art?, text?, after?, answer, choices?, cols?, unit? }
   */
  function init(config) {
    var root = document.getElementById('quiz');
    var total = config.total || 10;
    var state = null;

    /* --- Chọn mức độ --- */

    function showStart() {
      detachKeyboard();
      root.innerHTML = '';

      var panel = el('div', 'panel');
      panel.appendChild(el('h2', null, config.exam ? 'Chọn đề kiểm tra' : 'Chọn mức độ'));
      panel.appendChild(el('p', 'lead', config.exam
        ? 'Bé làm hết các câu rồi máy chấm điểm nhé — trong lúc làm sẽ không báo đúng sai.'
        : 'Mỗi lượt chơi gồm ' + total + ' câu.'));

      var chosen = 0;
      var list = el('div', 'levels');

      config.levels.forEach(function (level, i) {
        var btn = el('button', 'level');
        btn.type = 'button';
        btn.innerHTML =
          '<span class="dot">' + (i + 1) + '</span>' +
          '<span><b>' + level.name + '</b>' +
          (level.hint ? '<small>' + level.hint + '</small>' : '') + '</span>';
        btn.setAttribute('aria-pressed', String(i === 0));
        btn.addEventListener('click', function () {
          chosen = i;
          Array.prototype.forEach.call(list.children, function (other, j) {
            other.setAttribute('aria-pressed', String(j === i));
          });
        });
        list.appendChild(btn);
      });
      panel.appendChild(list);

      if (config.exam) {
        var ds = readLichSu(config.id);
        if (ds.length) {
          var ls = el('div', 'lich-su');
          ls.appendChild(el('h3', null, '🗓️ Những lần làm gần đây'));
          ds.forEach(function (ban) {
            ls.appendChild(el('div', 'lan', 
              '<b>' + ban.diem.toFixed(1).replace('.0', '') + '</b>' +
              '<span>' + ban.de + '</span>' +
              '<i>' + ban.ngay + '</i>'));
          });
          panel.appendChild(ls);
        }
      } else {
        var best = readBest(config.id);
        if (best) {
          panel.appendChild(el('p', 'lead',
            '🏆 Kỷ lục của bé: <b>' + best.score + ' điểm</b> — ' +
            best.correct + '/' + best.total + ' câu đúng'));
        }
      }

      var go = el('button', 'btn go', config.exam ? '📝 Bắt đầu làm bài' : '🚀 Bắt đầu');
      go.type = 'button';
      go.addEventListener('click', function () { startRound(chosen); });
      panel.appendChild(go);

      root.appendChild(panel);
    }

    /* --- Làm bài --- */

    function startRound(levelIndex) {
      var level = config.levels[levelIndex];
      var deBai = level.taoDe ? level.taoDe() : null;   // đề kiểm tra dựng sẵn theo ma trận

      state = {
        level: level,
        deBai: deBai,
        total: deBai ? deBai.length : total,
        index: 0,
        correct: 0,
        startedAt: Date.now(),
        typed: '',
        locked: false,
        misses: [],
        theoMach: {}
      };
      nextQuestion();
    }

    function nextQuestion() {
      state.index += 1;
      if (state.index > state.total) return showResult();
      state.question = state.deBai ? state.deBai[state.index - 1] : state.level.gen();
      state.typed = '';
      state.locked = false;
      renderQuestion();
    }

    function renderQuestion() {
      detachKeyboard();
      root.innerHTML = '';

      var q = state.question;
      // khongChu: bé mầm non chưa biết đọc, nút trả lời chỉ còn hình.
      // Nhãn chữ vẫn nằm trong DOM cho trình đọc màn hình, chỉ ẩn khỏi mắt.
      var panel = el('div', 'panel' + (config.kids ? ' kids' : '') +
        (config.khongChu ? ' khong-chu' : ''));

      var meta = el('div', 'meta');
      meta.appendChild(el('span', null, 'Câu ' + state.index + ' / ' + state.total));
      state.scoreEl = el('span', config.exam ? 'dong-ho' : 'hits',
        config.exam ? '⏱ ' + formatTime(Math.round((Date.now() - state.startedAt) / 1000))
                    : '✅ ' + state.correct);
      meta.appendChild(state.scoreEl);
      panel.appendChild(meta);

      if (config.exam) chayDongHo();

      var bar = el('div', 'bar');
      var fill = el('span');
      fill.style.width = ((state.index - 1) / state.total * 100) + '%';
      bar.appendChild(fill);
      panel.appendChild(bar);

      // q.tieng: câu nào cần đọc bằng tiếng Anh thì tự khai, mặc định tiếng Việt
      if (config.speak) docTo(q.speak || q.prompt, q.tieng);

      state.oTraLoi = global.OTraLoi.ve(panel, q, {
        coLoa: config.speak,
        doc: function (t) { docTo(t, q.tieng); },
        khiTraLoi: function (dung, daNhap, phanHoi) { judge(dung, q, daNhap, phanHoi); }
      });

      root.appendChild(panel);
    }

    function chayDongHo() {
      clearInterval(state.nhip);
      state.nhip = setInterval(function () {
        if (!state.scoreEl || !state.scoreEl.isConnected) return clearInterval(state.nhip);
        state.scoreEl.textContent = '⏱ ' + formatTime(Math.round((Date.now() - state.startedAt) / 1000));
      }, 1000);
    }

    function detachKeyboard() {
      if (state && state.oTraLoi) { state.oTraLoi.huy(); state.oTraLoi = null; }
    }

    /* --- Chấm một câu --- */

    function judge(isCorrect, q, given, feedback) {
      var mach = q.mach || 'Khác';
      if (!state.theoMach[mach]) state.theoMach[mach] = { dung: 0, tong: 0 };
      state.theoMach[mach].tong += 1;
      if (isCorrect) state.theoMach[mach].dung += 1;

      if (config.exam) {
        // bài kiểm tra: không tiết lộ đúng sai, chấm hết ở cuối
        if (isCorrect) state.correct += 1;
        // giữ cả câu hỏi để trợ lý giải thích được từng bài sai
        else state.misses.push({
          label: (q.prompt ? q.prompt + ' ' : '') + (q.text || ''),
          after: q.after, given: given, answer: q.answer, mach: mach, cau: q
        });
        feedback.className = 'feedback';
        feedback.innerHTML = '✔️ Đã ghi câu trả lời';
        return setTimeout(nextQuestion, 320);
      }

      feedback.className = 'feedback pop ' + (isCorrect ? 'ok' : 'bad');

      if (isCorrect) {
        state.correct += 1;
        if (state.scoreEl) state.scoreEl.textContent = '✅ ' + state.correct;
        feedback.textContent = pick(KHEN);
        if (config.speak) docTo(feedback.textContent.replace(/[^\p{L}\s]/gu, '').trim());
      } else {
        state.misses.push({
          label: (q.prompt ? q.prompt + ' ' : '') + (q.text || '') ,
          after: q.after,
          given: given,
          answer: q.answer
        });
        feedback.innerHTML = '❌ Chưa đúng — đáp án là <b>' + q.answer + '</b>';
      }

      setTimeout(nextQuestion, isCorrect ? 700 : 1900);
    }

    /* --- Kết quả --- */

    function showResult() {
      detachKeyboard();
      clearInterval(state.nhip);
      root.innerHTML = '';

      var seconds = Math.round((Date.now() - state.startedAt) / 1000);
      var total = state.total;
      var score = Math.round(state.correct / total * 100);
      var stars = starsFor(state.correct, total);

      if (config.exam) return showExamResult(seconds, total);

      var panel = el('div', 'panel');
      panel.appendChild(el('div', 'result-mascot',
        stars === 3 ? '🏆' : stars === 2 ? '🥳' : stars === 1 ? '🙂' : '🐣'));
      panel.appendChild(el('div', 'stars',
        '⭐'.repeat(stars) + '<span class="off">' + '⭐'.repeat(3 - stars) + '</span>'));
      panel.appendChild(el('h2', null,
        stars === 3 ? 'Xuất sắc!' :
        stars === 2 ? 'Làm tốt lắm!' :
        stars === 1 ? 'Cố thêm chút nữa nhé!' : 'Mình thử lại nào!'));
      panel.appendChild(el('div', 'score', score + ' điểm'));

      var summary = el('div', 'summary');
      summary.appendChild(el('div', null, '<b>' + state.correct + '/' + total + '</b>câu đúng'));
      summary.appendChild(el('div', null, '<b>' + formatTime(seconds) + '</b>thời gian'));

      var best = readBest(config.id);
      if (!best || score > best.score) {
        writeBest(config.id, {
          score: score, correct: state.correct, total: total,
          seconds: seconds, date: new Date().toISOString().slice(0, 10)
        });
        summary.appendChild(el('div', null, '<b>🏆 Mới</b>kỷ lục'));
      } else {
        summary.appendChild(el('div', null, '<b>' + best.score + '</b>kỷ lục cũ'));
      }
      panel.appendChild(summary);

      var actions = el('div', 'actions');
      var again = el('button', 'btn go', '🔁 Chơi lại');
      again.type = 'button';
      again.addEventListener('click', showStart);
      actions.appendChild(again);

      var home = el('a', 'btn ghost', '🏠 Trang chủ');
      home.href = '../index.html';
      actions.appendChild(home);
      panel.appendChild(actions);

      if (state.misses.length) {
        var review = el('div', 'review');
        review.appendChild(el('h3', null, '📝 Xem lại các câu chưa đúng'));
        var ul = el('ul');
        state.misses.forEach(function (m) {
          ul.appendChild(el('li', null,
            m.label + ' <span class="yours">' + m.given + '</span>' +
            '<span class="right">' + m.answer + '</span>' +
            (m.after ? ' ' + m.after : '')));
        });
        review.appendChild(ul);
        panel.appendChild(review);
      }

      root.appendChild(panel);
      if (stars >= 2) confetti();
    }

    function showExamResult(seconds, total) {
      var diem = Math.round(state.correct / total * 100) / 10;   // thang 10, một chữ số thập phân
      var loai = xepLoai(diem);

      var panel = el('div', 'panel phieu');
      panel.appendChild(el('div', 'result-mascot', loai.mascot));
      panel.appendChild(el('h2', null, 'Phiếu kết quả'));
      panel.appendChild(el('div', 'diem', diem.toFixed(1).replace('.0', '') +
        '<span class="thang"> / 10</span>'));
      panel.appendChild(el('div', 'xep-loai ' + loai.mau, loai.ten));

      var summary = el('div', 'summary');
      summary.appendChild(el('div', null, '<b>' + state.correct + '/' + total + '</b>câu đúng'));
      summary.appendChild(el('div', null, '<b>' + formatTime(seconds) + '</b>thời gian làm bài'));
      panel.appendChild(summary);

      // Bảng kết quả theo từng mạch kiến thức
      var bang = el('div', 'bang-mach');
      bang.appendChild(el('h3', null, '📊 Kết quả theo từng phần'));
      Object.keys(state.theoMach).forEach(function (mach) {
        var o = state.theoMach[mach];
        var pct = Math.round(o.dung / o.tong * 100);
        var hang = el('div', 'hang-mach');
        hang.innerHTML =
          '<span class="ten">' + mach + '</span>' +
          '<span class="thanh"><i style="width:' + pct + '%;background:' +
            (pct >= 80 ? 'var(--mint)' : pct >= 50 ? 'var(--sun)' : 'var(--coral)') + '"></i></span>' +
          '<span class="ty-le">' + o.dung + '/' + o.tong + '</span>';
        bang.appendChild(hang);
      });
      panel.appendChild(bang);

      var actions = el('div', 'actions');
      var again = el('button', 'btn go', '📝 Làm đề khác');
      again.type = 'button';
      again.addEventListener('click', showStart);
      actions.appendChild(again);
      var home = el('a', 'btn ghost', '🏠 Trang chủ');
      home.href = '../index.html';
      actions.appendChild(home);
      panel.appendChild(actions);

      if (state.misses.length) {
        var review = el('div', 'review');
        review.appendChild(el('h3', null, '📝 Các câu cần xem lại (' + state.misses.length + ' câu)'));
        var ul = el('ul');
        state.misses.forEach(function (m) {
          ul.appendChild(el('li', null,
            '<span class="mach">' + m.mach + '</span>' + m.label +
            ' <span class="yours">' + m.given + '</span>' +
            '<span class="right">' + m.answer + '</span>' + (m.after ? ' ' + m.after : '')));
        });
        review.appendChild(ul);
        panel.appendChild(review);

        // Bài nâng cao bật trợ lý: giải thích cặn kẽ từng câu sai
        if (config.troLy && global.TroLy) {
          panel.appendChild(global.TroLy.veBang(state.misses));
        }
      }

      ghiLichSu(config.id, {
        diem: diem, dung: state.correct, tong: total, giay: seconds,
        de: state.level.name, ngay: new Date().toISOString().slice(0, 10)
      });

      var best = readBest(config.id);
      var score = Math.round(state.correct / total * 100);
      if (!best || score > best.score) {
        writeBest(config.id, {
          score: score, correct: state.correct, total: total,
          seconds: seconds, date: new Date().toISOString().slice(0, 10)
        });
      }

      root.appendChild(panel);
      if (diem >= 8) confetti();
    }

    showStart();
  }

  global.Quiz = {
    init: init,
    randInt: randInt,
    pick: pick,
    shuffle: shuffle,
    choicesAround: choicesAround,
    repeatArt: repeatArt,
    readBest: readBest,
    starsFor: starsFor,
    docTo: docTo,
    locLoiDoc: locLoiDoc,
    readLichSu: readLichSu,
    xepLoai: xepLoai
  };
})(window);
