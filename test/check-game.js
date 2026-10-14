const fs = require('fs');
const vm = require('vm');
const ROOT = require('path').join(__dirname, '..');

const win = {};
const docGia = {
  currentScript: { src: 'https://x/StudyOnline/js/hoat-hinh.js' },
  getElementById: () => null,
  getElementsByTagName: () => []
};
const nen = { window: win, document: docGia, localStorage: null, speechSynthesis: undefined,
  customElements: undefined,
  Math, Number, String, Array, Object, Date, JSON, console, setTimeout, setInterval, clearInterval };
vm.runInNewContext(fs.readFileSync(ROOT + '/js/quiz.js', 'utf8'), nen);
vm.runInNewContext(fs.readFileSync(ROOT + '/js/hoat-hinh.js', 'utf8'), nen);
vm.runInNewContext(fs.readFileSync(ROOT + '/js/toan-lop-1.js', 'utf8'), nen);
vm.runInNewContext(fs.readFileSync(ROOT + '/js/nhan-vat.js', 'utf8'), nen);
vm.runInNewContext(fs.readFileSync(ROOT + '/js/game-cong-chua.js', 'utf8'), nen);
const { Quiz, GameCongChua: G, NhanVat: NV } = win;

let fails = 0;
const fail = m => { fails++; console.log('   ✗ ' + m); };
const chu = s => String(s == null ? '' : s).replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/[−–]/g, '-').trim();

/* Phần soi đáp án theo mạch dùng lại bộ luật trong check-l1.js.

   Bộ đó từng nằm ở thư mục tạm của phiên làm việc và ĐÃ MẤT khi thư mục bị
   dọn — đó cũng là lý do cả thư mục test này được chuyển hẳn vào repo. Chưa
   viết lại được nên phần soi này đang không chạy; để nguyên nhánh bỏ qua và
   báo rõ ra màn hình chứ không im lặng, kẻo tưởng là đã kiểm. */
const DUONG_L1 = require('path').join(__dirname, 'check-l1.js');
let LUAT = null;
if (fs.existsSync(DUONG_L1)) {
  const kiemTraL1 = fs.readFileSync(DUONG_L1, 'utf8');
  const phanLuat = kiemTraL1.slice(kiemTraL1.indexOf('const LUAT = {'),
                                   kiemTraL1.indexOf('function kiemTraCau'));
  LUAT = vm.runInNewContext(phanLuat + '\n({LUAT, phepTinh})',
    { fail, chu, Math, Number, String, Array, Object, eval, console }).LUAT;
} else {
  console.log('   ! thiếu check-l1.js (đã mất) — phần soi đáp án theo mạch KHÔNG chạy');
}

/* ---- 1. Nhân vật phải vẽ ra SVG hợp lệ ---- */
console.log('── Nhân vật ──');

function laSVGHopLe(s, ten) {
  if (!/^<svg[\s\S]*<\/svg>$/.test(s)) return fail(ten + ': không phải SVG hợp lệ');
  const mo = (s.match(/<(svg|g|path|rect|circle|ellipse|polygon)\b/g) || []).length;
  const dong = (s.match(/<\/(svg|g)>|\/>/g) || []).length;
  if (mo !== dong) fail(`${ten}: thẻ mở (${mo}) và đóng (${dong}) không khớp`);
  if (!s.includes('width="80"')) fail(ten + ': không nhận tham số bề rộng');
}

// tự vẽ hoàn toàn
['long'].forEach(ten => laSVGHopLe(NV[ten](80), ten));

// lồng giam phải thấy được công chúa bên trong, không được rỗng
if (NV.long(80).length < 700) fail('long: lồng giam trông rỗng, thiếu công chúa bên trong');

// dùng hoạt hình Lottie — phải trỏ tới tệp có thật và có đường lui SVG
[['hiepSi', 'hiepSiSVG'], ['rong', 'rongSVG'], ['congChua', 'congChuaSVG']].forEach(([ten, duPhong]) => {
  const s = NV[ten](80);
  if (!/<dotlottie-wc /.test(s)) fail(ten + ': thiếu thẻ dotlottie-wc');
  const tep = (s.match(/src="[^"]*assets\/lottie\/([^"]+\.lottie)"/) || [])[1];
  if (!tep) return fail(ten + ': src không trỏ vào assets/lottie');
  if (!fs.existsSync(ROOT + '/assets/lottie/' + tep)) fail(ten + `: thiếu tệp ${tep} trong repo`);
  if (typeof NV[duPhong] !== 'function') return fail(ten + ': thiếu hàm dự phòng ' + duPhong);
  laSVGHopLe(NV[duPhong](80), duPhong);
});

Object.keys(NV.ANH || {}).forEach(k => {
  const a = NV.ANH[k];
  if (!a || !a.tep) return fail('ANH.' + k + ': thiếu tên tệp');
  if (!fs.existsSync(ROOT + '/assets/lottie/' + a.tep + '.lottie')) fail('ANH.' + k + ': tệp không có trong repo');
  if (!(a.heSo > 0)) fail('ANH.' + k + ': thiếu hệ số kích thước');
  if (!a.tacGia) fail('ANH.' + k + ': thiếu tên tác giả để ghi công');
});

// mọi tệp .lottie trong repo phải là tệp nén hợp lệ và không rỗng
fs.readdirSync(ROOT + '/assets/lottie').filter(f => f.endsWith('.lottie')).forEach(f => {
  const b = fs.readFileSync(ROOT + '/assets/lottie/' + f);
  if (b.length < 500) fail(f + ': tệp quá nhỏ, có thể tải lỗi');
  if (b[0] !== 0x50 || b[1] !== 0x4b) fail(f + ': không phải tệp .lottie hợp lệ');
});

if (!fails) console.log('   lồng giam tự vẽ + 3 hoạt hình Lottie (đều có đường lui SVG) ✓');

/* ---- 2. Mỗi chặng phải sinh đề đúng ---- */
console.log('\n── Các chặng ──');
if (G.MAN.length !== 6) fail('phải có 6 chặng, đang có ' + G.MAN.length);

G.MAN.forEach((man, i) => {
  const mach = {};
  const truoc = fails;
  for (let n = 0; n < 4000; n++) {
    if (n % 20 === 0) G._moVan(i);
    const q = G._cauTiep();
    if (!q.mach) { fail(`chặng ${i + 1}: câu thiếu nhãn mạch`); break; }
    mach[q.mach] = true;
    if (!q.choices) {
      if (!Number.isInteger(q.answer) || q.answer < 0) fail(`chặng ${i + 1}: đáp án xấu ${q.answer}`);
      if (String(q.answer).length > 3) fail(`chặng ${i + 1}: đáp án quá 3 chữ số`);
    }
    const luat = LUAT && LUAT[q.mach];
    // không có bảng luật (check-l1.js bị dọn mất) thì bỏ qua phần soi đáp án
    if (!LUAT) continue;
    if (!luat) { fail(`chặng ${i + 1}: chưa có luật cho mạch "${q.mach}"`); break; }
    luat(q);
  }
  const trangThai = fails === truoc ? '✓' : (fails - truoc) + ' lỗi';
  console.log(`   ${(i + 1)}. ${man.ten.padEnd(14)} ${man.soCau} câu · ${Object.keys(mach).join(', ')} ${trangThai}`);
  if (man.soCau < 5) fail(`chặng ${i + 1} quá ngắn`);
});

/* ---- mỗi chặng một cảnh riêng, tệp phải có thật ---- */
const hinhChang = G.MAN.map(m => m.hinh);
if (hinhChang.some(h => !h)) fail('có chặng chưa khai báo hình');
if (new Set(hinhChang).size !== hinhChang.length)
  fail('hai chặng dùng chung một hình: ' + hinhChang.join(', '));
hinhChang.forEach(h => {
  if (h && !fs.existsSync(ROOT + '/assets/lottie/' + h + '.lottie')) fail(`thiếu tệp ${h}.lottie`);
});

/* ---- 3. Chặng cuối phải là trận boss ---- */
if (!G.MAN[G.MAN.length - 1].boss) fail('chặng cuối phải đánh dấu boss');
if (G.MAN.slice(0, -1).some(m => m.boss)) fail('chỉ chặng cuối mới được là boss');

/* ---- 4. Trong một chặng, các câu không được lặp lại ---- */
console.log('\n── Chống lặp câu trong một chặng ──');
G.MAN.forEach((man, i) => {
  let lapLai = 0;
  for (let lan = 0; lan < 600; lan++) {
    G._moVan(i);                       // một lượt chơi chặng này
    const khoa = new Set();
    for (let c = 0; c < man.soCau; c++) {
      const q = G._cauTiep();
      const k = chu(q.prompt) + chu(q.text) + chu(q.after) + q.answer;
      if (khoa.has(k)) { lapLai++; break; }
      khoa.add(k);
    }
  }
  if (lapLai) fail(`chặng ${i + 1}: ${lapLai}/600 lượt có câu lặp lại`);
  console.log(`   ${(i + 1)}. ${man.ten.padEnd(14)} 600 lượt × ${man.soCau} câu — ${lapLai ? lapLai + ' lượt lặp' : 'không lặp ✓'}`);
});

console.log(fails ? `\n❌ ${fails} lỗi` : '\n✅ Game: không lỗi');
process.exit(fails ? 1 : 0);
