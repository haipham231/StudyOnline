const fs = require('fs');
const vm = require('vm');
const ROOT = require('path').join(__dirname, '..');

const win = {};
const docGia = { currentScript: { src: 'https://x/StudyOnline/js/hoat-hinh.js' },
  getElementById: () => null, getElementsByTagName: () => [] };
const nen = { window: win, document: docGia, localStorage: null, speechSynthesis: undefined,
  customElements: undefined, Math, Number, String, Array, Object, Date, JSON, console,
  setTimeout, setInterval, clearInterval };
['quiz.js', 'o-tra-loi.js', 'hoat-hinh.js', 'toan-lop-1.js', 'tieng-viet-lop-1.js', 'game-halloween.js']
  .forEach(f => vm.runInNewContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), nen));
const { GameHalloween: G } = win;

let fails = 0;
const fail = m => { fails++; console.log('   ✗ ' + m); };
const chu = s => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

console.log('── Game Đêm Halloween ──');
if (G.AI.length !== 6) fail('phải có 6 ải');
if (!G.AI[5].trum) fail('ải cuối phải là ải trùm');
G.AI.forEach((ai, i) => {
  if (!fs.existsSync(ROOT + '/assets/lottie/' + ai.hinh + '.lottie'))
    fail(`ải ${i + 1}: thiếu hoạt hình ${ai.hinh}.lottie`);
});
const hinhAi = G.AI.map(a => a.hinh);
if (new Set(hinhAi).size !== hinhAi.length)
  fail('hai ải dùng chung một hình: ' + hinhAi.join(', '));

G.AI.forEach((ai, i) => {
  const truoc = fails;
  const monTheoLuot = [];
  const machToan = new Set(), machTV = new Set();

  for (let lan = 0; lan < 500; lan++) {
    G._moVan(i);
    const mon = [];
    const khoa = new Set();
    for (let c = 0; c < ai.soCau; c++) {
      const q = G._cauTiep();
      mon.push(q.mon);

      // kiểm tra chung
      if (!q.mon) fail(`ải ${i + 1}: câu không ghi môn`);
      if (!q.mach) fail(`ải ${i + 1}: câu thiếu nhãn mạch`);
      const all = chu(q.prompt) + chu(q.text) + chu(q.after);
      if (/undefined|NaN/.test(all)) fail(`ải ${i + 1}: đề chứa undefined/NaN`);
      if (q.choices) {
        if (!q.choices.map(String).includes(String(q.answer))) fail(`ải ${i + 1}: đáp án ngoài lựa chọn`);
        if (new Set(q.choices.map(String)).size !== q.choices.length) fail(`ải ${i + 1}: lựa chọn trùng`);
      } else if (!Number.isInteger(q.answer) || q.answer < 0) {
        fail(`ải ${i + 1}: đáp án số không hợp lệ (${q.answer})`);
      }

      // câu tiếng Việt phải là dạng bấm chọn, vì bé lớp 1 chưa gõ chữ
      if (q.mon === 'Tiếng Việt' && !q.choices)
        fail(`ải ${i + 1}: câu Tiếng Việt lại bắt gõ số`);

      (q.mon === 'Toán' ? machToan : machTV).add(q.mach);

      const k = chu(q.prompt) + chu(q.text) + chu(q.after) + q.answer;
      if (khoa.has(k)) fail(`ải ${i + 1}: câu lặp trong cùng một lượt`);
      khoa.add(k);
    }
    monTheoLuot.push(mon.join(','));
  }

  // phải xen kẽ Toán · Tiếng Việt · Toán · …
  const mongDoi = Array.from({ length: ai.soCau }, (_, k) => k % 2 === 0 ? 'Toán' : 'Tiếng Việt').join(',');
  const lech = monTheoLuot.filter(m => m !== mongDoi).length;
  if (lech) fail(`ải ${i + 1}: ${lech}/500 lượt không xen kẽ đúng Toán — Tiếng Việt`);

  console.log(`   ${(i + 1)}. ${ai.ten.padEnd(20)} ${ai.soCau} câu · Toán [${[...machToan].join(', ')}] · TV [${[...machTV].join(', ')}] ${fails === truoc ? '✓' : '✗'}`);
});

console.log(fails ? `\n❌ ${fails} lỗi` : '\n✅ Halloween: không lỗi');
process.exit(fails ? 1 : 0);
