/* Kho con vật của khu Mầm non: mỗi con một emoji riêng, một emoji một tên,
   nơi sống hợp lý, và càng nhiều con có hình vẽ càng tốt. */
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Math, Object, String, JSON, console, RegExp, Array, Date };
g.window = g;
g.document = { getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }],
  getElementById: () => null,
  createElement: () => ({ style: {}, appendChild() {}, classList: { add() {} } }),
  addEventListener() {} };
g.localStorage = { getItem: () => null, setItem() {} };
vm.createContext(g);
['quiz.js', 'hinh-ve.js', 'con-vat.js'].forEach(f =>
  vm.runInContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), g));
const C = g.ConVat, H = g.HinhVe;

console.log('── Kho con vật mầm non ──');

if (C.DS.length < 50) bao('mới có ' + C.DS.length + ' con, ít quá');

/* mỗi con một khoá riêng — khoá là emoji, hoặc đường dẫn ảnh với con nào
   không có emoji nào tả đúng (sao biển, cá đuối, mấy loại cá voi…) */
const theoE = {}, theoTen = {};
C.DS.forEach(c => {
  const k = C.khoaCon(c);
  if (!k) bao(c.ten + ': không có cả emoji lẫn đường dẫn hình');
  if (theoE[k]) bao('khoá ' + k + ' dùng cho cả "' + theoE[k] + '" lẫn "' + c.ten + '"');
  theoE[k] = c.ten;
  if (theoTen[c.ten]) bao('tên "' + c.ten + '" lặp lại');
  theoTen[c.ten] = 1;
});

/* một emoji món ăn chỉ được một tên, kẻo cùng hình mà hai nhãn khác nhau */
const anTheoE = {};
C.DS.forEach(c => {
  if (anTheoE[c.an.e] && anTheoE[c.an.e] !== c.an.ten)
    bao('món ' + c.an.e + ' lúc gọi "' + anTheoE[c.an.e] + '" lúc gọi "' + c.an.ten + '"');
  anTheoE[c.an.e] = c.an.ten;
});

/* con nào trỏ thẳng vào tệp ảnh thì tệp đó phải có thật */
C.DS.filter(c => c.hinh).forEach(c => {
  if (!fs.existsSync(ROOT + '/assets/hinh/' + c.hinh + '.webp'))
    bao(c.ten + ': không thấy ảnh ' + c.hinh);
  if (!/^<img /.test(C.anhCon(c))) bao(c.ten + ': anhCon không ra thẻ ảnh');
});

/* nơi sống phải nằm trong ba chỗ đã khai */
C.DS.forEach(c => {
  if (!C.NOI_SONG[c.o]) bao(c.ten + ': nơi sống lạ "' + c.o + '"');
  if (!c.an || !c.an.e || !c.an.ten) bao(c.ten + ': thiếu món ăn');
});

/* mỗi nơi sống phải đủ con để bài "sống ở đâu" không lộ đáp án */
['nuoc', 'can', 'troi'].forEach(o => {
  const n = C.DS.filter(c => c.o === o).length;
  if (n < 5) bao('nơi "' + o + '" mới có ' + n + ' con');
});

/* con vật không được trùng emoji với món ăn của chính nó */
C.DS.forEach(c => { if (c.e && c.e === c.an.e) bao(c.ten + ' ăn chính mình'); });

/* bài "con gì kêu" cần đủ con có tiếng kêu */
if (C.coTiengKeu.length < 8) bao('mới có ' + C.coTiengKeu.length + ' con có tiếng kêu');
const keuTheo = {};
C.coTiengKeu.forEach(c => {
  if (keuTheo[c.keu]) bao('tiếng "' + c.keu + '" của cả ' + keuTheo[c.keu] + ' lẫn ' + c.ten);
  keuTheo[c.keu] = c.ten;
});

/* bao nhiêu con, bao nhiêu món đã có hình vẽ */
const conCoHinh = C.DS.filter(c => c.hinh || H.co(c.e)).length;
const monThieu = [...new Set(C.DS.filter(c => !H.co(c.an.e)).map(c => c.an.e + ' ' + c.an.ten))];
if (conCoHinh < C.DS.length - 2)
  bao((C.DS.length - conCoHinh) + ' con chưa có hình vẽ');
console.log('   ' + C.DS.length + ' con · ' + conCoHinh + ' con đã có hình · ' +
  C.coTiengKeu.length + ' con có tiếng kêu');
console.log('   ' + ['nuoc', 'can', 'troi'].map(o =>
  C.NOI_SONG[o].ten + ' ' + C.DS.filter(c => c.o === o).length).join(' · '));
if (monThieu.length) console.log('   ! ' + monThieu.length + ' món ăn chưa có hình: ' + monThieu.join(' · '));

console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Kho con vật: không lỗi');
process.exit(loi ? 1 : 0);
