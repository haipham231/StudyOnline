/* Mê cung: điều phải giữ bằng mọi giá là KHÔNG BAO GIỜ BỊ BÍ — từ ô xuất phát
   phải tới được cả ba cửa và tới được mọi ô. Thêm vào đó: tường phải đối xứng,
   rắn không được xuyên tường, và bảng thông số phải khó dần. */
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Math, Object, String, JSON, console, RegExp, Array, Date, Infinity };
g.window = g;
g.document = {
  getElementsByTagName: () => [], getElementById: () => null,
  createElement: () => ({ style: { setProperty() {} }, dataset: {}, className: '',
    appendChild() {}, setAttribute() {}, addEventListener() {}, remove() {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    getBoundingClientRect: () => ({ width: 0, height: 0 }) }),
  addEventListener() {}
};
g.localStorage = { getItem: () => null, setItem() {} };
g.requestAnimationFrame = () => 0;
vm.createContext(g);
['quiz.js', 'dap-an-nhieu.js', 'muc-do.js', 'man-me-cung.js']
  .forEach(f => vm.runInContext(fs.readFileSync(ROOT + '/js/' + f, 'utf8'), g));
const M = g.ManMeCung;
const HUONG = M._HUONG;

console.log('── Mê cung ngoài hành tinh ──');

/* ---- 1. bảng thông số phải khó dần ---- */
const TS = M.THONG_SO;
['de', 'vua', 'kho'].forEach(k => { if (!TS[k]) bao('thiếu mức ' + k); });
if (!(TS.de.cot < TS.vua.cot && TS.vua.cot < TS.kho.cot)) bao('lưới không to dần');
if (!(TS.de.ran < TS.vua.ran && TS.vua.ran < TS.kho.ran)) bao('rắn không đông dần');
if (!(TS.de.tocDo > TS.vua.tocDo && TS.vua.tocDo > TS.kho.tocDo)) bao('rắn không nhanh dần');
if (!(TS.de.boNgoCut > TS.vua.boNgoCut && TS.vua.boNgoCut >= TS.kho.boNgoCut))
  bao('mức Dễ không bớt ngõ cụt nhiều hơn');
if (TS.de.duoi) bao('mức Dễ không nên có rắn biết đuổi');
if (!TS.kho.duoi) bao('mức Khó phải có rắn biết đuổi');

/* ---- 2. sinh thật nhiều mê cung rồi soi ---- */
function lamCua(o, COT) {
  const cot = [Math.floor(COT / 6), Math.floor(COT / 2), COT - 1 - Math.floor(COT / 6)];
  for (let k = 1; k < 3; k++) if (cot[k] <= cot[k - 1]) cot[k] = cot[k - 1] + 1;
  cot.forEach(cc => { if (o[0][cc]) o[0][cc].len = false; });
  return cot;
}

let tong = 0, biBi = 0, oCoLap = 0, lechTuong = 0, cuaTrung = 0, cuaNgoai = 0;
['de', 'vua', 'kho'].forEach(muc => {
  const t = TS[muc];
  for (let n = 0; n < 700; n++) {
    tong++;
    const o = M._sinhMe(t.cot, t.hang, t.boNgoCut);
    const cot = lamCua(o, t.cot);

    // cửa phải khác cột nhau và nằm trong lưới
    if (new Set(cot).size !== 3) cuaTrung++;
    cot.forEach(c => { if (c < 0 || c >= t.cot) cuaNgoai++; });

    // tường đối xứng: A thủng sang B thì B cũng phải thủng sang A
    for (let r = 0; r < t.hang; r++) {
      for (let c = 0; c < t.cot; c++) {
        HUONG.forEach(h => {
          const nr = r + h.dr, nc = c + h.dc;
          if (nr < 0 || nr >= t.hang || nc < 0 || nc >= t.cot) return;
          if (o[r][c][h.ten] !== o[nr][nc][h.nguoc]) lechTuong++;
        });
      }
    }

    // từ ô xuất phát phải tới được MỌI ô, nên cả ba cửa đều tới được
    const rDau = t.hang - 1, cDau = Math.floor(t.cot / 2);
    const xa = M._doXa(o, t.hang, t.cot, rDau, cDau);
    let coLap = 0;
    for (let r = 0; r < t.hang; r++) {
      for (let c = 0; c < t.cot; c++) if (xa[r][c] < 0) coLap++;
    }
    if (coLap) oCoLap++;
    if (cot.some(c => xa[0][c] < 0)) biBi++;
  }
});
if (biBi) bao(biBi + '/' + tong + ' mê cung có cửa không tới được');
if (oCoLap) bao(oCoLap + '/' + tong + ' mê cung có ô bị cô lập');
if (lechTuong) bao(lechTuong + ' chỗ tường không đối xứng');
if (cuaTrung) bao(cuaTrung + ' mê cung có hai cửa trùng cột');
if (cuaNgoai) bao(cuaNgoai + ' cửa nằm ngoài lưới');
console.log('   ' + tong + ' mê cung · ba cửa luôn tới được · không ô nào bị cô lập');

/* ---- 3. chỗ đẻ rắn phải đủ xa ô xuất phát ---- */
let quaGan = 0;
['de', 'vua', 'kho'].forEach(muc => {
  const t = TS[muc];
  for (let n = 0; n < 300; n++) {
    const o = M._sinhMe(t.cot, t.hang, t.boNgoCut);
    lamCua(o, t.cot);
    const rDau = t.hang - 1, cDau = Math.floor(t.cot / 2);
    const xa = M._doXa(o, t.hang, t.cot, rDau, cDau);
    let cho = 0;
    for (let r = 0; r < t.hang; r++) {
      for (let c = 0; c < t.cot; c++) if (xa[r][c] >= Math.floor(t.cot / 2)) cho++;
    }
    if (!cho) quaGan++;
  }
});
if (quaGan) bao(quaGan + ' mê cung không có chỗ nào đủ xa để đẻ rắn');

/* ---- 4. rắn đi 20.000 nhịp: không xuyên tường, không ra ngoài lưới ---- */
function huongTen(ten) { return HUONG.filter(h => h.ten === ten)[0]; }
let xuyen = 0, raNgoai = 0;
['de', 'vua', 'kho'].forEach(muc => {
  const t = TS[muc];
  const o = M._sinhMe(t.cot, t.hang, t.boNgoCut);
  lamCua(o, t.cot);
  const ran = { r: Math.floor(t.hang / 2), c: Math.floor(t.cot / 2), huong: 'len' };
  for (let n = 0; n < 7000; n++) {
    // chép đúng luật chọn hướng của mô-đun
    const duoc = HUONG.filter(h => {
      if (o[ran.r][ran.c][h.ten]) return false;
      const nr = ran.r + h.dr, nc = ran.c + h.dc;
      return nr >= 0 && nr < t.hang && nc >= 0 && nc < t.cot;
    });
    if (!duoc.length) break;
    let chon = null;
    const thang = huongTen(ran.huong);
    if (thang && duoc.indexOf(thang) >= 0 && Math.random() < 0.7) chon = thang;
    else {
      const khac = duoc.filter(h => h.ten !== huongTen(ran.huong).nguoc);
      const bo = khac.length ? khac : duoc;
      chon = bo[Math.floor(Math.random() * bo.length)];
    }
    if (o[ran.r][ran.c][chon.ten]) xuyen++;
    ran.r += chon.dr; ran.c += chon.dc; ran.huong = chon.ten;
    if (ran.r < 0 || ran.r >= t.hang || ran.c < 0 || ran.c >= t.cot) { raNgoai++; break; }
  }
});
if (xuyen) bao(xuyen + ' nhịp rắn xuyên tường');
if (raNgoai) bao(raNgoai + ' lần rắn ra ngoài lưới');
console.log('   21.000 nhịp rắn · không xuyên tường, không ra ngoài lưới');

/* ---- 5. nối vào game vũ trụ ---- */
const gv = fs.readFileSync(ROOT + '/js/game-vu-tru.js', 'utf8');
if (!/ManMeCung/.test(gv)) bao('game-vu-tru.js chưa gọi ManMeCung');
if (!/KIEU\.length/.test(gv) || !/'me-cung'/.test(gv)) bao('kieuMan chưa xoay vòng ba kiểu màn');
[1, 2, 3, 4, 5, 6].forEach(l => {
  const p = ROOT + '/lop-' + l + '/du-hanh-vu-tru.html';
  if (!fs.existsSync(p)) return bao('thiếu trang lop-' + l);
  const s = fs.readFileSync(p, 'utf8');
  if (s.indexOf('js/man-me-cung.js') < 0) bao('lop-' + l + ': chưa nạp man-me-cung.js');
});

/* ---- 6. ảnh dùng trong mê cung phải có thật ---- */
['assets/sinh-vat/rung/ran.webp', 'assets/vu-tru/phi-hanh-gia.png',
 'assets/vu-tru/phg-trung.png', 'assets/vu-tru/phg-nga.png',
 'assets/vu-tru/thuyen/den-hieu.png', 'assets/vu-tru/thuyen/cong-thuong.png',
 'assets/vu-tru/thuyen/cong-mo.png', 'assets/vu-tru/thuyen/cong-chan.png']
  .forEach(p => { if (!fs.existsSync(ROOT + '/' + p)) bao('thiếu ảnh ' + p); });

console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Mê cung: không lỗi');
process.exit(loi ? 1 : 0);
