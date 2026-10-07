/* ===== Học Toán Online — engine bài tập dùng chung ===== */
(function (global) {
  'use strict';

  var STORE = 'studyonline:';

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

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
      /* chế độ riêng tư: bỏ qua, không lưu được cũng không sao */
    }
  }

  function starsFor(correct, total) {
    var ratio = correct / total;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.5) return 1;
    return 0;
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + (s < 10 ? '0' + s : s);
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /**
   * config = {
   *   id:     'cong-tru',              // khoá lưu localStorage
   *   total:  10,                      // số câu mỗi lượt
   *   levels: [{ name, hint, gen }]    // gen() -> { text, answer, choices? }
   * }
   */
  function init(config) {
    var root = document.getElementById('quiz');
    var total = config.total || 10;
    var state = null;
    var onKeyDown = null;

    /* --- Màn hình chọn độ khó --- */

    function showStart() {
      detachKeyboard();
      root.innerHTML = '';

      var panel = el('div', 'panel');
      panel.appendChild(el('h2', null, 'Chọn mức độ'));
      panel.appendChild(el('p', 'lead', 'Mỗi lượt gồm ' + total + ' câu hỏi.'));

      var chosen = 0;
      var list = el('div', 'levels');

      config.levels.forEach(function (level, i) {
        var btn = el('button', 'level');
        btn.type = 'button';
        btn.innerHTML = '<b>' + level.name + '</b>' +
          (level.hint ? '<br><small>' + level.hint + '</small>' : '');
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
          'Kỷ lục của bé: <b>' + best.score + ' điểm</b> ' +
          '(' + best.correct + '/' + best.total + ' câu đúng)'));
      }

      var go = el('button', 'btn', '🚀 Bắt đầu');
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

      var panel = el('div', 'panel');

      var meta = el('div', 'meta');
      meta.appendChild(el('span', null, 'Câu ' + state.index + ' / ' + total));
      meta.appendChild(el('span', null, '✅ ' + state.correct));
      panel.appendChild(meta);

      var bar = el('div', 'bar');
      var fill = el('span');
      fill.style.width = ((state.index - 1) / total * 100) + '%';
      bar.appendChild(fill);
      panel.appendChild(bar);

      var q = state.question;
      var question = el('div', 'question');
      question.innerHTML = q.text + ' ';

      var box = el('span', 'answer-box empty', '?');
      question.appendChild(box);
      if (q.after) question.appendChild(document.createTextNode(' ' + q.after));
      panel.appendChild(question);

      var feedback = el('div', 'feedback', '&nbsp;');
      panel.appendChild(feedback);

      if (q.choices) {
        panel.appendChild(buildChoices(q, box, feedback));
      } else {
        panel.appendChild(buildPad(q, box, feedback));
      }

      root.appendChild(panel);
    }

    /* --- Dạng chọn đáp án (>, <, =) --- */

    function buildChoices(q, box, feedback) {
      var wrap = el('div', 'choices');

      q.choices.forEach(function (value) {
        var btn = el('button', 'choice', String(value));
        btn.type = 'button';
        btn.addEventListener('click', function () {
          if (state.locked) return;
          state.locked = true;
          box.textContent = String(value);
          box.classList.remove('empty');
          btn.classList.add(String(value) === String(q.answer) ? 'is-ok' : 'is-bad');
          judge(String(value) === String(q.answer), q, value, feedback);
        });
        wrap.appendChild(btn);
      });

      return wrap;
    }

    /* --- Dạng nhập số --- */

    function buildPad(q, box, feedback) {
      var pad = el('div', 'pad');

      function redraw() {
        box.textContent = state.typed === '' ? '?' : state.typed;
        box.classList.toggle('empty', state.typed === '');
      }

      function type(digit) {
        if (state.locked || state.typed.length >= 4) return;
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

      var del = el('button', 'key', '⌫');
      del.type = 'button';
      del.addEventListener('click', erase);
      pad.appendChild(del);

      var zero = el('button', 'key', '0');
      zero.type = 'button';
      zero.addEventListener('click', function () { type('0'); });
      pad.appendChild(zero);

      var clear = el('button', 'key', 'C');
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

      /* Bàn phím máy tính cũng dùng được */
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
      if (isCorrect) {
        state.correct += 1;
        feedback.className = 'feedback ok';
        feedback.textContent = pick(['🎉 Giỏi lắm!', '👏 Chính xác!', '⭐ Tuyệt vời!', '✅ Đúng rồi!']);
      } else {
        state.misses.push({ text: q.text, given: given, answer: q.answer });
        feedback.className = 'feedback bad';
        feedback.textContent = '❌ Chưa đúng — đáp án là ' + q.answer;
      }
      setTimeout(nextQuestion, isCorrect ? 650 : 1500);
    }

    /* --- Kết quả --- */

    function showResult() {
      detachKeyboard();
      root.innerHTML = '';

      var seconds = Math.round((Date.now() - state.startedAt) / 1000);
      var score = Math.round(state.correct / total * 100);
      var stars = starsFor(state.correct, total);

      var panel = el('div', 'panel');
      panel.appendChild(el('div', 'stars',
        '⭐'.repeat(stars) + '<span style="opacity:.25">' + '⭐'.repeat(3 - stars) + '</span>'));
      panel.appendChild(el('h2', null,
        stars === 3 ? 'Xuất sắc!' : stars === 2 ? 'Làm tốt lắm!' : stars === 1 ? 'Cố thêm chút nữa nhé!' : 'Mình thử lại nào!'));
      panel.appendChild(el('div', 'score', score + ' điểm'));

      var summary = el('div', 'summary');
      summary.appendChild(el('div', null, '<b>' + state.correct + '/' + total + '</b> câu đúng'));
      summary.appendChild(el('div', null, '<b>' + formatTime(seconds) + '</b> thời gian'));

      var best = readBest(config.id);
      if (!best || score > best.score) {
        writeBest(config.id, {
          score: score, correct: state.correct, total: total,
          seconds: seconds, date: new Date().toISOString().slice(0, 10)
        });
        summary.appendChild(el('div', null, '<b>🏆 Mới</b> kỷ lục'));
      } else {
        summary.appendChild(el('div', null, '<b>' + best.score + '</b> kỷ lục'));
      }
      panel.appendChild(summary);

      var actions = el('div', 'actions');
      var again = el('button', 'btn', '🔁 Làm lại');
      again.type = 'button';
      again.addEventListener('click', showStart);
      actions.appendChild(again);

      var home = el('a', 'btn ghost', '🏠 Trang chủ');
      home.href = '../index.html';
      actions.appendChild(home);
      panel.appendChild(actions);

      if (state.misses.length) {
        var review = el('div', 'review');
        review.appendChild(el('h3', null, 'Xem lại các câu sai'));
        var ul = el('ul');
        state.misses.forEach(function (m) {
          ul.appendChild(el('li', null,
            m.text + ' <span class="yours">' + m.given + '</span>' +
            '<span class="right">' + m.answer + '</span>'));
        });
        review.appendChild(ul);
        panel.appendChild(review);
      }

      root.appendChild(panel);
    }

    showStart();
  }

  global.Quiz = {
    init: init,
    randInt: randInt,
    pick: pick,
    readBest: readBest,
    starsFor: starsFor
  };
})(window);
