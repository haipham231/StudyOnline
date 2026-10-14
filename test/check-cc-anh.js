/* Game công chúa chen câu từ vựng tiếng Anh: tỉ lệ phải đúng theo mức, mọi
   câu phải có đáp án nằm trong danh sách chọn, và ba lựa chọn không được
   trùng hình. */
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

function moi() {
  const g = { Math, Object, String, JSON, console, RegExp, Array, Date, isNaN, Number, parseInt, parseFloat };
  g.window = g;
  g.document = {
    getElementsByTagName: () => [], getElementById: () => null,
    createElement: () => ({ style: { setProperty() {} }, dataset: {}, className: '',
      appendChild() {}, setAttribute() {}, addEventListener() {},
      classList: { add() {}, remove() {}, contains: () => false },
      getElementsByTagName: () => [] }),
    body: { appendChild() {} }, addEventListener() {}
  };
  g.kho = {};
  g.localStorage = { getItem: k => (k in g.kho ? g.kho[k] : null), setItem(k, v) { g.kho[k] = v; } };
  g.setTimeout = () => {}; g.clearTimeout = () => {};
  vm.createContext(g);
  ['quiz.js', 'o-tra-loi.js', 'hinh-ve.js', 'tieng-viet-mam-non.js', 'tu-vung-anh.js',
   'phien-am.js', 'tieng-anh.js', 'muc-do.js', 'toan-lop-1.js', 'tieng-viet-lop-1.js',
   'game-cong-chua.js'].forEach(f => vm.runInContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), g));
  return g;
}

console.log('── Câu từ vựng tiếng Anh trong game công chúa ──');

const g = moi();
const TA = g.TiengAnh, G = g.GameCongChua;
const lot = s => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/* 1. tuChonHinh: ba lựa chọn phải khác hình nhau, đáp án phải nằm trong đó */
let trungHinh = 0, ngoai = 0, itLuaChon = 0;
for (let i = 0; i < 1500; i++) {
  const q = TA.tuChonHinh('trái cây');
  if (q.choices.indexOf(q.answer) < 0) ngoai++;
  if (new Set(q.choices).size !== q.choices.length) trungHinh++;
  if (q.choices.length < 3) itLuaChon++;
  if (!/^<span class="anh-tu">/.test(q.answer)) bao('đáp án không phải thẻ hình: ' + q.answer);
}
if (ngoai) bao('tuChonHinh: ' + ngoai + ' câu có đáp án không nằm trong lựa chọn');
if (trungHinh) bao('tuChonHinh: ' + trungHinh + ' câu có hai lựa chọn trùng hình');
if (itLuaChon) bao('tuChonHinh: ' + itLuaChon + ' câu ít hơn ba lựa chọn');

/* 2. nhinChon vẫn lành */
for (let i = 0; i < 500; i++) {
  const q = TA.nhinChon('phương tiện');
  if (q.choices.indexOf(q.answer) < 0) { bao('nhinChon: đáp án ngoài danh sách'); break; }
}

/* 3. tỉ lệ câu tiếng Anh theo từng mức — đo bằng chính đường chơi thật */
const MONG = { de: 0.25, vua: 0.33, kho: 0.33 };
['de', 'vua', 'kho'].forEach(muc => {
  const h = moi();
  h.GameCongChua.MAN = h.GameCongChua.MAN;
  const N = 4000;
  let anh = 0;
  h.GameCongChua._moVan(0, muc);
  for (let i = 0; i < N; i++) {
    // mở lại ván sau mỗi ít câu, kẻo bộ chống trùng chặn hết
    if (i % 8 === 0) h.GameCongChua._moVan(0, muc);
    const q = h.GameCongChua._cauTiep();
    if (q.tieng === 'en') anh++;
  }
  const ti = anh / N;
  if (Math.abs(ti - MONG[muc]) > 0.05)
    bao('mức ' + muc + ': tỉ lệ câu tiếng Anh là ' + ti.toFixed(3) + ', mong ' + MONG[muc]);
  else console.log('   mức ' + muc.padEnd(4) + ' → ' + (ti * 100).toFixed(1) + '% câu tiếng Anh');
});

/* 3b. mọi câu sinh ra đều phải chấm được */
{
  const h = moi();
  h.GameCongChua._moVan(0, 'vua');
  let hong = 0;
  for (let i = 0; i < 3000; i++) {
    if (i % 8 === 0) h.GameCongChua._moVan(0, 'vua');
    const q = h.GameCongChua._cauTiep();
    if (q.answer == null) { hong++; continue; }
    if (q.choices && q.choices.indexOf(q.answer) < 0) hong++;
  }
  if (hong) bao(hong + ' câu có đáp án không chấm được');
}
/* 4. mọi chủ đề trong CHU_DE_ANH phải có thật và đủ ba từ */
const src = fs.readFileSync(ROOT + '/js/game-cong-chua.js', 'utf8');
const kb = src.match(/CHU_DE_ANH = \[([\s\S]*?)\];/);
if (!kb) bao('không đọc được CHU_DE_ANH');
else {
  const ds = kb[1].match(/'([^']+)'/g).map(x => x.slice(1, -1));
  ds.forEach(k => {
    if (!TA.CHU_DE[k]) bao('chủ đề lạ: ' + k);
    else if (TA.CHU_DE[k].length < 3) bao('chủ đề ' + k + ' chỉ có ' + TA.CHU_DE[k].length + ' từ');
  });
  console.log('   ' + ds.length + ' chủ đề tiếng Anh, chủ đề ít từ nhất: ' +
    Math.min.apply(null, ds.filter(k => TA.CHU_DE[k]).map(k => TA.CHU_DE[k].length)) + ' từ');
}

/* 5. sáu trang phải nạp đủ năm mô-đun mới */
const CAN = ['hinh-ve.js', 'tieng-viet-mam-non.js', 'tu-vung-anh.js', 'phien-am.js', 'tieng-anh.js'];
[1, 2, 3, 4, 5, 6].forEach(l => {
  const p = ROOT + '/lop-' + l + '/cuu-cong-chua.html';
  const s = fs.readFileSync(p, 'utf8');
  CAN.forEach(x => { if (s.indexOf('js/' + x) < 0) bao('lop-' + l + ': chưa nạp ' + x); });
  // tieng-viet-mam-non.js đọc Quiz ngay lúc nạp nên phải đứng sau quiz.js
  if (s.indexOf('js/tieng-viet-mam-non.js') < s.indexOf('js/quiz.js'))
    bao('lop-' + l + ': tieng-viet-mam-non.js nạp trước quiz.js');
});

/* 6. veCauHoi phải có loa cho câu tiếng Anh, cham phải lột thẻ HTML */
if (!/coLoa: q\.tieng === 'en'/.test(src)) bao('veCauHoi chưa bật loa cho câu tiếng Anh');
if (!/replace\(\/<\[\^>\]\+>\/g, ' '\)/.test(src)) bao('cham chưa lột thẻ HTML của đáp án');

/* 7. con quái phải to gấp đôi hiệp sĩ */
const css = fs.readFileSync(ROOT + '/css/style.css', 'utf8');
const hs = css.match(/\.nguoi-choi \.nv-hinh \{ height: (\d+)px/);
const qu = css.match(/\.dich \.nv-hinh \{ height: (\d+)px/);
if (!hs || !qu) bao('không đọc được cỡ nhân vật trong CSS');
else {
  const ti = +qu[1] / +hs[1];
  if (ti < 1.9 || ti > 2.1) bao('quái cao ' + qu[1] + 'px so với hiệp sĩ ' + hs[1] + 'px — tỉ lệ ' + ti.toFixed(2) + ', cần ≈ 2');
  else console.log('   quái ' + qu[1] + 'px / hiệp sĩ ' + hs[1] + 'px = gấp ' + ti.toFixed(1) + ' lần');
}

console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Từ vựng tiếng Anh trong game công chúa: không lỗi');
process.exit(loi ? 1 : 0);
