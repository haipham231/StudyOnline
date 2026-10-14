/* Phiên âm: mọi từ tiếng Anh đơn lẻ phải có phiên âm, và phiên âm phải đúng
   dạng — nằm giữa hai gạch chéo, chỉ gồm ký hiệu IPA, dấu trọng âm không
   được đứng cuối hay đứng sát nhau. */
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

function nap(f, them) {
  const g = { Math, Object, String, JSON, console, RegExp, Array, Date };
  g.window = g;
  g.document = { getElementsByTagName: () => [], getElementById: () => null,
    createElement: () => ({ style: {}, appendChild() {}, addEventListener() {} }),
    addEventListener() {} };
  g.localStorage = { getItem: () => null, setItem() {} };
  vm.createContext(g);
  (them || []).forEach(x => vm.runInContext(fs.readFileSync(ROOT + '/js/' + x, 'utf8'), g));
  vm.runInContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), g);
  return g;
}

console.log('── Phiên âm tiếng Anh ──');

const P = nap('phien-am.js').PhienAm;
const A = nap('tu-vung-anh.js').TuVungAnh;
const V = nap('tieng-viet-mam-non.js', ['quiz.js']).TiengVietMN;

const tu = new Set();
[A.CO_HINH, A.CHU].forEach(kho =>
  Object.keys(kho).forEach(k => kho[k].forEach(w => { if (w.en) tu.add(w.en); })));
Object.keys(V.CHU_DE || {}).forEach(k =>
  (V.CHU_DE[k] || []).forEach(w => { if (w.en) tu.add(w.en); }));

// câu dài cố ý không ghi phiên âm
const laCau = w => /[?!.]/.test(w) || w.split(/\s+/).length > 2;

let thieu = 0, cau = 0;
tu.forEach(w => {
  if (laCau(w)) { cau++; return; }
  if (!P.cua(w)) { thieu++; bao('chưa có phiên âm: ' + w); }
});

// dạng phiên âm
const HOP_LE = /^\/[a-zæɑɐɒeɛɜəɪiɔoʊuʌyθðʃʒŋɡʤʧɹrjwhlmnpbtdkfvsz ˈˌːɑ̃.()̩-]+\/$/;
let xau = 0;
Object.keys(P.KHO).forEach(w => {
  const p = P.KHO[w];
  if (!HOP_LE.test(p)) { xau++; if (xau <= 6) bao('phiên âm lạ: ' + w + ' → ' + p); }
  if (/[ˈˌ]\//.test(p) || /[ˈˌ][ˈˌ]/.test(p)) bao('dấu trọng âm đặt sai: ' + w + ' → ' + p);
  if (/ɹ/.test(p)) bao('còn ký hiệu ɹ chưa nắn: ' + w);
  if (/ɛ/.test(p)) bao('còn ký hiệu ɛ chưa nắn: ' + w);
});
if (xau > 6) console.log('   … và ' + (xau - 6) + ' từ nữa');

// vài từ quen phải đúng hẳn
const CHUAN = { rabbit: '/ˈræbɪt/', elephant: '/ˈelɪfənt/', computer: '/kəmˈpjuːtə/',
  water: '/ˈwɔːtə/', banana: '/bəˈnɑːnə/', Monday: '/ˈmʌndeɪ/', teacher: '/ˈtiːtʃə/' };
Object.keys(CHUAN).forEach(w => {
  if (P.cua(w) !== CHUAN[w]) bao('sai mẫu: ' + w + ' → ' + P.cua(w) + ' (mong ' + CHUAN[w] + ')');
});

console.log('   ' + (tu.size - cau - thieu) + '/' + (tu.size - cau) +
  ' từ có phiên âm · ' + cau + ' câu dài cố ý để trống');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Phiên âm: không lỗi');
process.exit(loi ? 1 : 0);
