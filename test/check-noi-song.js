/* Game "Đưa bạn thú về nhà" và bảng nơi sống của bảy mươi mốt con vật. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Object, String, RegExp, Math, Array, console, JSON, Set, Date,
  localStorage: { getItem: () => null, setItem: () => {} },
  document: { getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }], getElementById: () => null } };
g.window = g; g.global = g;
vm.createContext(g);
['quiz.js', 'hinh-ve.js', 'con-vat.js', 'game-noi-song.js']
  .forEach(t => vm.runInContext(fs.readFileSync(ROOT + '/js/' + t, 'utf8'), g));
const CV = g.ConVat, G = g.GameNoiSong;

console.log('── Đưa bạn thú về nhà ──');

const coAnh = d => fs.existsSync(ROOT + '/assets/hinh/' + d + '.webp');

/* ---- 1. con nào cũng có nhà, nơi nào cũng có con ----
   Bảng CON_VAT viết không đều tay ("con sư tử" có chữ con, "gấu trúc" thì
   không). Lần đầu chỉ khớp một kiểu là sót ba mươi hai con, nên luật này
   phải canh cả bảng chứ không chỉ vài con. */
const khongNha = CV.DS.filter(c => !c.noi).map(c => c.ten);
if (khongNha.length) bao(khongNha.length + ' con chưa có nhà: ' + khongNha.join(', '));
CV.DS.forEach(c => { if (c.noi && !CV.NOI[c.noi]) bao(c.ten + ' trỏ tới nơi không có: ' + c.noi); });
Object.keys(CV.NOI).forEach(k => {
  if (!CV.DS.some(c => c.noi === k)) bao('nơi "' + k + '" không có con nào sống');
});

/* ---- 2. đúng sự thật ----
   Chim cánh cụt sống ở Nam Cực, không phải Bắc Cực. Nơi đó cố ý gọi là "xứ
   băng giá" để đúng cho cả chim cánh cụt lẫn gấu trắng. */
const canhCut = CV.DS.find(c => /cánh cụt/.test(c.ten));
if (!canhCut || canhCut.noi !== 'bang') bao('chim cánh cụt phải ở xứ băng giá');
if (/bắc cực/i.test(CV.NOI.bang.ten)) bao('không được gọi xứ băng giá là Bắc Cực — chim cánh cụt ở Nam Cực');
const gauTrang = CV.DS.find(c => /bắc cực/.test(c.ten));
if (gauTrang && gauTrang.noi !== 'bang') bao('gấu bắc cực phải ở xứ băng giá');

/* ---- 3. quan hệ "dễ nhầm" phải hai chiều ---- */
Object.keys(CV.NOI).forEach(k => {
  (CV.NOI[k].gan || []).forEach(j => {
    if (!CV.NOI[j]) return bao(k + ' khai dễ nhầm với nơi không có: ' + j);
    if ((CV.NOI[j].gan || []).indexOf(k) < 0) bao(k + ' nhầm với ' + j + ' mà ' + j + ' không nhầm lại với ' + k);
  });
});

/* ---- 4. lựa chọn sai không bao giờ gây nhầm ---- */
let soLan = 0;
Object.keys(CV.NOI).forEach(dung => {
  for (let i = 0; i < 300; i++) {
    const sai = G._haiNoiSai(dung);
    soLan++;
    if (sai.length !== 2) return bao(dung + ': ra ' + sai.length + ' nơi sai, cần đúng 2');
    if (sai.indexOf(dung) >= 0) return bao(dung + ': nơi đúng lọt vào lựa chọn sai');
    const tranh = [dung].concat(CV.NOI[dung].gan || []);
    if (sai.some(k => tranh.indexOf(k) >= 0)) return bao(dung + ': lựa chọn sai dễ nhầm với nơi đúng');
    if ((CV.NOI[sai[0]].gan || []).indexOf(sai[1]) >= 0)
      return bao(dung + ': hai lựa chọn sai dễ nhầm với nhau (' + sai.join(', ') + ')');
  }
});
console.log('   ' + soLan + ' lượt chọn nơi sai ✓');

/* ---- 5. một lượt gặp đủ các nơi, không lặp con ---- */
let it = 99;
for (let i = 0; i < 300; i++) {
  const de = G._boDe();
  if (de.length !== 8) { bao('một lượt ra ' + de.length + ' con, cần 8'); break; }
  if (new Set(de.map(c => c.ten)).size !== de.length) { bao('một lượt có con lặp lại'); break; }
  it = Math.min(it, new Set(de.map(c => c.noi)).size);
}
if (it < 6) bao('có lượt chỉ gặp ' + it + ' nơi — bốc lệch về biển như hồi chưa chia theo nơi');
console.log('   một lượt tám con gặp ít nhất ' + it + ' nơi khác nhau ✓');

/* ---- 6. hình phải có thật ---- */
Object.keys(CV.NOI).forEach(k => {
  if (!coAnh(CV.NOI[k].hinh)) bao('nơi "' + k + '" thiếu hình: ' + CV.NOI[k].hinh);
});
['moDau', 'ketThuc'].forEach(c => {
  const canh = G.CANH[c];
  if (canh.hinh && !coAnh(canh.hinh)) bao('cắt cảnh ' + c + ' thiếu tranh: ' + canh.hinh);
  (canh.hinhTam || []).forEach(d => { if (!coAnh(d)) bao('cắt cảnh ' + c + ' thiếu hình tạm: ' + d); });
});

/* ---- 7. trang nạp đủ script ---- */
const CAN = {
  'mam-non/bai-tap/con-vat-o-dau.html': ['hinh-ve.js', 'quiz.js', 'con-vat.js', 'keo-tha.js', 'cat-canh.js', 'game-noi-song.js'],
  'mam-non/bai-tap/con-vat-an-gi.html': ['cat-canh.js', 'quiz.js', 'con-vat.js']
};
Object.keys(CAN).forEach(f => {
  const s = fs.readFileSync(ROOT + '/' + f, 'utf8');
  CAN[f].forEach(j => { if (s.indexOf(j) < 0) bao(f + ': chưa nạp ' + j); });
});
const anGi = fs.readFileSync(ROOT + '/mam-non/bai-tap/con-vat-an-gi.html', 'utf8');
if (!/moDau:/.test(anGi) || !/ketThuc:/.test(anGi)) bao('bài ăn gì thiếu cắt cảnh mở đầu hoặc kết thúc');

/* ---- 8. giữ mã bài cũ, kẻo sao và huy hiệu bé đã có biến mất ---- */
const oDau = fs.readFileSync(ROOT + '/mam-non/bai-tap/con-vat-o-dau.html', 'utf8');
if (!/id: 'mn-con-vat-o-dau'/.test(oDau)) bao('đổi mất mã bài mn-con-vat-o-dau — tiến độ cũ của bé sẽ mất');

console.log('   ' + Object.keys(CV.NOI).length + ' nơi · ' + CV.DS.length + ' con vật');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Nơi sống: không lỗi');
process.exit(loi ? 1 : 0);
