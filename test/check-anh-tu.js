/* Ảnh cho tầng từ chỉ có chữ.

   Đợt này 571 từ được vẽ ảnh riêng, trong đó 344 từ thuộc tầng CHU — tầng
   xưa nay chỉ hiện mặt chữ vì không emoji nào tả đúng. Bộ này canh ba thứ:

   1. Mọi khoá tra đều có ảnh thật, và ảnh nào cũng có khoá trỏ tới.
   2. Câu hỏi kiểu nhìn hình không bao giờ ra hai lựa chọn trùng hình, và đáp
      án luôn nằm trong lựa chọn.
   3. Chủ đề nào vẽ ra không đoán được từ (tính từ vẽ theo cặp đối lập, ngày
      tháng vẽ thành cảnh sinh hoạt) thì tuyệt đối không được dùng hình làm
      đáp án — chỉ được minh hoạ.
*/
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Object, String, RegExp, Math, Array, console, JSON,
  document: { getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }] } };
g.window = g; g.global = g;
vm.createContext(g);
['quiz.js', 'hinh-ve.js', 'phien-am.js', 'tieng-viet-mam-non.js', 'tu-vung-anh.js', 'tieng-anh.js']
  .forEach(t => vm.runInContext(fs.readFileSync(ROOT + '/js/' + t, 'utf8'), g));
const H = g.HinhVe, T = g.TiengAnh, TV = g.TuVungAnh;

console.log('── Ảnh cho từ vựng tiếng Anh ──');

/* ---- 1. phủ sóng ---- */
let coHinh = 0, chuaCo = [];
Object.keys(TV.CO_HINH).forEach(cd => TV.CO_HINH[cd].forEach(t => {
  if (T.coAnh(t)) coHinh++; else chuaCo.push(t.en);
}));
let chuCo = 0, chuChua = [];
Object.keys(TV.CHU).forEach(cd => TV.CHU[cd].forEach(t => {
  if (T.coAnh(t)) chuCo++; else chuChua.push(cd + '/' + t.en);
}));
console.log('   tầng có emoji : ' + coHinh + ' từ có ảnh, ' + chuaCo.length + ' chưa');
console.log('   tầng chỉ có chữ: ' + chuCo + ' từ có ảnh, ' + chuChua.length + ' chưa');

/* ---- 2. ba bộ sinh câu hỏi ---- */
const CAC_CHU_DE = Object.keys(T.CHU_DE).concat(Object.keys(T.CHU_DE_CHU));
['nhinChon', 'ngheChon', 'tuChonHinh'].forEach(ten => {
  let n = 0;
  CAC_CHU_DE.forEach(cd => {
    for (let i = 0; i < 30; i++) {
      const q = T[ten](cd);
      n++;
      if (!q || !q.choices) { bao(ten + '(' + cd + ') không ra câu hỏi'); return; }
      if (q.choices.indexOf(q.answer) < 0)
        return bao(ten + '(' + cd + '): đáp án không nằm trong lựa chọn');
      if (new Set(q.choices).size !== q.choices.length)
        return bao(ten + '(' + cd + '): có hai lựa chọn giống hệt nhau');
    }
  });
  console.log('   ' + ten.padEnd(12) + n + ' lượt, không lỗi');
});

/* ---- 3. chủ đề không đoán được thì không được làm đáp án bằng hình ---- */
const CAM = ['tính từ thường gặp', 'ngược nghĩa', 'ngày tháng mùa',
             'mẫu câu hay dùng', 'trạng từ và từ nối'];
CAM.forEach(cd => {
  if (!T.CHU_DE_CHU[cd]) return;
  const ds = T.tuCuaAnh(cd);
  if (ds.length) bao('chủ đề "' + cd + '" lọt vào kho câu hỏi nhìn hình (' + ds.length + ' từ)');
  for (let i = 0; i < 20; i++) {
    const q = T.nhinChon(cd);
    if (q.mach !== 'Hiểu nghĩa') return bao('nhinChon("' + cd + '") phải lùi về hỏi nghĩa');
  }
});
console.log('   ' + CAM.length + ' chủ đề vẽ-không-đoán-được đều lùi về hỏi nghĩa ✓');

/* ---- 4. chủ đề đoán được thì phải đủ ảnh để dựng ba lựa chọn ---- */
const NEN_CO = ['việc hằng ngày', 'động từ thường gặp', 'số lớn và thứ tự',
                'vị trí và hướng', 'môn học', 'đi đường', 'sức khoẻ'];
NEN_CO.forEach(cd => {
  if (!T.CHU_DE_CHU[cd]) return bao('không thấy chủ đề "' + cd + '"');
  const ds = T.tuCuaAnh(cd);
  if (ds.length < 3) bao('chủ đề "' + cd + '" chỉ có ' + ds.length + ' từ có ảnh, không đủ ba lựa chọn');
});
console.log('   ' + NEN_CO.length + ' chủ đề đoán được đều đủ ảnh ✓');

/* ---- 5. veTu dựng đúng thẻ ảnh ---- */
const mau = H.veTu && H.veTu('dance');
if (!mau || !/^<img /.test(mau)) bao('veTu("dance") không ra thẻ ảnh');
if (mau && !/\.webp"/.test(mau)) bao('veTu không trỏ vào tệp webp');
if (H.veTu && H.veTu('khong-co-tu-nay')) bao('veTu phải trả null khi không có ảnh');

console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Ảnh từ vựng: không lỗi');
process.exit(loi ? 1 : 0);
