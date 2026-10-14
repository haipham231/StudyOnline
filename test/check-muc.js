/* Mức độ khó: ba mức phải thật sự khác nhau ở cả ba mặt — số câu, số lượt
   hụt cho phép, và số dạng đề — và mức Dễ không được bỏ sót dạng tới mức
   một màn chỉ còn một kiểu câu. */
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Math, Object, String, JSON, console, RegExp, Array, Date };
g.window = g;
g.document = { getElementsByTagName: () => [], getElementById: () => null,
  createElement: () => ({ style: { setProperty() {} }, className: '', dataset: {},
    appendChild() {}, setAttribute() {}, addEventListener() {} }),
  addEventListener() {} };
g.localStorage = { getItem: () => null, setItem() {} };
vm.createContext(g);
['quiz.js', 'muc-do.js'].forEach(f => vm.runInContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), g));
const M = g.MucDo;

console.log('── Mức độ khó ──');

if (M.DS.length !== 3) bao('phải có đúng ba mức');
['de', 'vua', 'kho'].forEach(id => { if (!M.DS.some(m => m.id === id)) bao('thiếu mức ' + id); });

// số câu: dễ ít hơn vừa, khó nhiều hơn vừa
[5, 6, 8].forEach(n => {
  const d = M.soCau(n, 'de'), v = M.soCau(n, 'vua'), k = M.soCau(n, 'kho');
  if (!(d < v && v < k)) bao('số câu không tăng dần với màn ' + n + ' câu: ' + d + '/' + v + '/' + k);
  if (d < 3) bao('mức Dễ còn ít hơn ba câu: ' + d);
});

// lượt hụt: dễ nhiều hơn, khó ít hơn
[3, 100].forEach(n => {
  const d = M.mang(n, 'de'), v = M.mang(n, 'vua'), k = M.mang(n, 'kho');
  if (!(d > v && v > k)) bao('số lượt không giảm dần với gốc ' + n + ': ' + d + '/' + v + '/' + k);
  if (k < 1) bao('mức Khó không còn lượt nào');
});

// lượt câu cá: dễ nhiều lượt hơn, khó ít hơn
if (!(M.luot(10, 'de') > M.luot(10, 'vua') && M.luot(10, 'vua') > M.luot(10, 'kho')))
  bao('số lượt câu cá không giảm dần');

// phạt: dễ nhẹ hơn
if (!(M.phat(30, 'de') < M.phat(30, 'vua') && M.phat(30, 'vua') < M.phat(30, 'kho')))
  bao('mức phạt không tăng dần');

// bớt dạng đề
const a = () => ({ answer: 1 }), b = () => ({ answer: 2 }), c = () => ({ answer: 3 });
const mang4 = [a, b, c, a];
if (M.de(mang4, 'de').length !== 2) bao('mảng đề: mức Dễ không rút còn hai dạng');
if (M.de(mang4, 'vua').length !== 4) bao('mảng đề: mức Vừa không được đụng vào');
if (M.de([a], 'de').length !== 1) bao('màn chỉ có một dạng thì phải giữ nguyên');

const tron = function () { return a(); };
tron.ds = [a, b, c];
if (typeof M.de(tron, 'de') !== 'function') bao('hàm mix: mức Dễ không trả về hàm');
const tro = function () { return a(); };
if (M.de(tro, 'de') !== tro) bao('hàm trơ không có .ds thì phải trả về nguyên');

// mọi trang game phải nạp mô-đun và mọi mix phải nhớ danh sách
let thieuNap = 0, thieuDs = 0;
['lop-1', 'lop-2', 'lop-3', 'lop-4', 'lop-5', 'lop-6'].forEach(l => {
  ['cau-ca', 'cuu-cong-chua', 'halloween', 'du-hanh-vu-tru'].forEach(ten => {
    const p = ROOT + '/' + l + '/' + ten + '.html';
    if (!fs.existsSync(p)) return bao('thiếu trang ' + l + '/' + ten);
    const s = fs.readFileSync(p, 'utf8');
    if (s.indexOf('muc-do.js') < 0) { thieuNap++; bao(l + '/' + ten + ': chưa nạp muc-do.js'); }
    if (/function mix\(\)/.test(s) && s.indexOf('f.ds = ds') < 0) {
      thieuDs++; bao(l + '/' + ten + ': mix() không nhớ danh sách dạng');
    }
  });
});

// bốn mô-đun game đều phải gọi MucDo
['cau-ca', 'cong-chua', 'halloween', 'vu-tru'].forEach(ten => {
  const s = fs.readFileSync(ROOT + '/js/game-' + ten + '.js', 'utf8');
  if (s.indexOf('MucDo.veChon') < 0) bao('game-' + ten + '.js: không có nút chọn mức');
  if (s.indexOf('MucDo.doc(') < 0) bao('game-' + ten + '.js: không đọc mức đã chọn');
  // mức phải đổi ít nhất một thứ: số câu, số lượt, mức phạt hay bộ dạng đề
  var doi = ['MucDo.soCau', 'MucDo.mang', 'MucDo.luot', 'MucDo.phat', 'MucDo.de(']
    .filter(function (x) { return s.indexOf(x) >= 0; });
  if (doi.length < 2)
    bao('game-' + ten + '.js: mức độ mới đổi được ' + doi.length + ' thứ, cần ít nhất hai');
});

console.log('   ba mức · 24 trang game · bốn mô-đun');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Mức độ: không lỗi');
process.exit(loi ? 1 : 0);
