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

  /* ---------- đọc to bằng tiếng Việt ---------- */

  var giongViet = null;

  function timGiong() {
    if (!global.speechSynthesis) return null;
    var ds = global.speechSynthesis.getVoices() || [];
    giongViet = ds.filter(function (v) { return /^vi/i.test(v.lang); })[0] || null;
    return giongViet;
  }

  if (global.speechSynthesis) {
    timGiong();
    global.speechSynthesis.onvoiceschanged = timGiong;
  }

  function docTo(text) {
    if (!global.speechSynthesis || !text) return;
    try {
      global.speechSynthesis.cancel();
      var loi = new global.SpeechSynthesisUtterance(String(text));
      loi.lang = 'vi-VN';
      loi.rate = 0.88;          // chậm lại cho bé nghe kịp
      if (giongViet || timGiong()) loi.voice = giongViet;
      global.speechSynthesis.speak(loi);
    } catch (e) {
      /* máy không đọc được thì bé vẫn nhìn hình để chơi */
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
    var onKeyDown = null;

    /* --- Chọn mức độ --- */

    function showStart() {
      detachKeyboard();
      root.innerHTML = '';

      var panel = el('div', 'panel');
      panel.appendChild(el('h2', null, 'Chọn mức độ'));
      panel.appendChild(el('p', 'lead', 'Mỗi lượt chơi gồm ' + total + ' câu.'));

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

      var best = readBest(config.id);
      if (best) {
        panel.appendChild(el('p', 'lead',
          '🏆 Kỷ lục của bé: <b>' + best.score + ' điểm</b> — ' +
          best.correct + '/' + best.total + ' câu đúng'));
      }

      var go = el('button', 'btn go', '🚀 Bắt đầu');
      go.type = 'button';
      go.addEventListener('click', function () { startRound(chosen); });
      panel.appendChild(go);

      root.appendChild(panel);
    }

    /* --- Làm bài --- */

    function startRound(levelIndex) {
      state = {
        level: config.levels[levelIndex],
        index: 0,
        correct: 0,
        startedAt: Date.now(),
        typed: '',
        locked: false,
        misses: []
      };
      nextQuestion();
    }

    function nextQuestion() {
      state.index += 1;
      if (state.index > total) return showResult();
      state.question = state.level.gen();
      state.typed = '';
      state.locked = false;
      renderQuestion();
    }

    function renderQuestion() {
      detachKeyboard();
      root.innerHTML = '';

      var q = state.question;
      var panel = el('div', 'panel' + (config.kids ? ' kids' : ''));

      var meta = el('div', 'meta');
      meta.appendChild(el('span', null, 'Câu ' + state.index + ' / ' + total));
      state.scoreEl = el('span', 'hits', '✅ ' + state.correct);
      meta.appendChild(state.scoreEl);
      panel.appendChild(meta);

      var bar = el('div', 'bar');
      var fill = el('span');
      fill.style.width = ((state.index - 1) / total * 100) + '%';
      bar.appendChild(fill);
      panel.appendChild(bar);

      if (q.prompt) {
        var dong = el('p', 'prompt', q.prompt);
        if (config.speak) {
          var loa = el('button', 'loa', '🔊');
          loa.type = 'button';
          loa.title = 'Nghe lại';
          loa.setAttribute('aria-label', 'Nghe lại câu hỏi');
          loa.addEventListener('click', function () { docTo(q.speak || q.prompt); });
          dong.appendChild(loa);
        }
        panel.appendChild(dong);
      }
      if (q.art) panel.appendChild(el('div', 'art', q.art));
      if (config.speak) docTo(q.speak || q.prompt);

      var box = el('span', 'answer-box empty', '?');
      var line = el('div', 'question');
      if (q.text) line.innerHTML = q.text + ' ';
      line.appendChild(box);
      if (q.after) line.appendChild(el('span', null, ' ' + q.after));

      // đề dài thì thu nhỏ cho vừa màn hình điện thoại
      var doDai = ((q.text || '') + (q.after || '')).replace(/&nbsp;/g, ' ').length;
      if (q.small || doDai > 12) line.classList.add('sm');
      panel.appendChild(line);

      var feedback = el('div', 'feedback', '&nbsp;');
      panel.appendChild(feedback);

      panel.appendChild(q.choices ? buildChoices(q, box, feedback) : buildPad(q, box, feedback));
      root.appendChild(panel);
    }

    /* --- Dạng bấm chọn --- */

    function buildChoices(q, box, feedback) {
      var wrap = el('div', 'choices');
      wrap.style.setProperty('--cols', q.cols || q.choices.length);

      q.choices.forEach(function (value) {
        var btn = el('button', 'choice', String(value));
        btn.type = 'button';
        btn.addEventListener('click', function () {
          if (state.locked) return;
          state.locked = true;
          box.innerHTML = String(value);
          box.classList.remove('empty');
          var ok = String(value) === String(q.answer);
          btn.classList.add(ok ? 'is-ok' : 'is-bad');
          judge(ok, q, value, feedback);
        });
        wrap.appendChild(btn);
      });

      return wrap;
    }

    /* --- Dạng gõ số --- */

    function buildPad(q, box, feedback) {
      var pad = el('div', 'pad');

      function redraw() {
        box.textContent = state.typed === '' ? '?' : state.typed;
        box.classList.toggle('empty', state.typed === '');
      }

      function type(digit) {
        if (state.locked || state.typed.length >= 3) return;
        if (state.typed === '0') state.typed = '';
        state.typed += digit;
        redraw();
      }

      function erase() {
        if (state.locked) return;
        state.typed = state.typed.slice(0, -1);
        redraw();
      }

      function submit() {
        if (state.locked || state.typed === '') return;
        state.locked = true;
        judge(Number(state.typed) === Number(q.answer), q, state.typed, feedback);
      }

      ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function (d) {
        var key = el('button', 'key', d);
        key.type = 'button';
        key.addEventListener('click', function () { type(d); });
        pad.appendChild(key);
      });

      var del = el('button', 'key fn', '⌫');
      del.type = 'button';
      del.addEventListener('click', erase);
      pad.appendChild(del);

      var zero = el('button', 'key', '0');
      zero.type = 'button';
      zero.addEventListener('click', function () { type('0'); });
      pad.appendChild(zero);

      var clear = el('button', 'key fn', 'Xoá');
      clear.type = 'button';
      clear.addEventListener('click', function () {
        if (state.locked) return;
        state.typed = '';
        redraw();
      });
      pad.appendChild(clear);

      var ok = el('button', 'key wide', 'Trả lời');
      ok.type = 'button';
      ok.addEventListener('click', submit);
      pad.appendChild(ok);

      onKeyDown = function (ev) {
        if (ev.key >= '0' && ev.key <= '9') { type(ev.key); ev.preventDefault(); }
        else if (ev.key === 'Backspace') { erase(); ev.preventDefault(); }
        else if (ev.key === 'Enter') { submit(); ev.preventDefault(); }
      };
      document.addEventListener('keydown', onKeyDown);

      return pad;
    }

    function detachKeyboard() {
      if (onKeyDown) {
        document.removeEventListener('keydown', onKeyDown);
        onKeyDown = null;
      }
    }

    /* --- Chấm một câu --- */

    function judge(isCorrect, q, given, feedback) {
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
      root.innerHTML = '';

      var seconds = Math.round((Date.now() - state.startedAt) / 1000);
      var score = Math.round(state.correct / total * 100);
      var stars = starsFor(state.correct, total);

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
    docTo: docTo
  };
})(window);
