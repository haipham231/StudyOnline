/* Khu Bé ngoan: truyện đạo đức và bài tình huống cho mầm non.

   Bé mầm non chưa biết đọc, nên điều quan trọng nhất bộ này canh là:
   ô trả lời TUYỆT ĐỐI không được có chữ, và ba hình trong một câu phải khác
   nhau — trùng hình thì bé chọn đúng vẫn bị chấm sai.
*/
const fs = require('fs'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Object, String, RegExp, Math, Array, console, JSON,
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {} }),
              getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }] } };
g.window = g;
vm.createContext(g);
['hinh-ve.js', 'truyen-dao-duc.js'].forEach(t =>
  vm.runInContext(fs.readFileSync(ROOT + '/js/' + t, 'utf8'), g));
const T = g.TruyenDaoDuc;

console.log('── Khu Bé ngoan ──');

const coAnh = p => fs.existsSync(ROOT + '/assets/sinh-vat/' + p + '.webp');

/* ---- 1. mọi hình phải có thật ---- */
let soHinh = 0;
const dung = new Set();
function xetHinh(p, o) {
  soHinh++;
  dung.add(p);
  if (!coAnh(p)) bao(o + ': không thấy ảnh ' + p);
}

T.TRUYEN.forEach(t => {
  t.canh.forEach((c, i) => xetHinh(c.hinh, t.ma + ' cảnh ' + (i + 1)));
  t.hoi.forEach((h, i) => {
    xetHinh(h.dung.hinh, t.ma + ' câu ' + (i + 1) + ' đáp án');
    h.sai.forEach(s => xetHinh(s.hinh, t.ma + ' câu ' + (i + 1) + ' lựa chọn sai'));
  });
});
T.TINH_HUONG.forEach((h, i) => {
  xetHinh(h.dung.hinh, 'tình huống ' + (i + 1) + ' đáp án');
  h.sai.forEach(s => xetHinh(s.hinh, 'tình huống ' + (i + 1) + ' lựa chọn sai'));
});

/* ---- 2. ba hình trong một câu phải khác nhau ---- */
function xetCau(h, o) {
  const ds = [h.dung.hinh].concat(h.sai.map(s => s.hinh));
  if (ds.length !== 3) bao(o + ': phải đúng ba lựa chọn, đang có ' + ds.length);
  if (new Set(ds).size !== ds.length) bao(o + ': có hai lựa chọn trùng hình');
  const nhan = [h.dung.nhan].concat(h.sai.map(s => s.nhan));
  if (nhan.some(x => !x)) bao(o + ': thiếu nhãn mô tả cho người lớn đọc');
  if (new Set(nhan).size !== nhan.length) bao(o + ': có hai lựa chọn trùng nhãn');
  if (!h.de || !/[?]\s*$/.test(h.de.trim())) bao(o + ': đề bài phải là câu hỏi, kết bằng dấu hỏi');
}
T.TRUYEN.forEach(t => t.hoi.forEach((h, i) => xetCau(h, t.ma + ' câu ' + (i + 1))));
T.TINH_HUONG.forEach((h, i) => xetCau(h, 'tình huống ' + (i + 1)));

/* ---- 3. khuôn một truyện ---- */
const ma = new Set();
T.TRUYEN.forEach(t => {
  if (ma.has(t.ma)) bao('mã truyện trùng: ' + t.ma);
  ma.add(t.ma);
  if (!t.ten || !t.duc) bao(t.ma + ': thiếu tên hoặc đức tính');
  if (!t.baiHoc || t.baiHoc.length < 10) bao(t.ma + ': bài học rỗng hoặc quá ngắn');
  if (!/[.!]$/.test(t.baiHoc)) bao(t.ma + ': bài học phải là một câu trọn vẹn');
  if (t.hoi.length < 2) bao(t.ma + ': phải có ít nhất hai câu hỏi');
  if (!t.tuoi || !t.tuoi.length) bao(t.ma + ': chưa gắn tuổi');

  /* Ba cảnh, không hơn không kém.

     Lúc đầu tôi viết truyện tám mười cảnh, dùng lại ảnh có sẵn trong kho.
     Chủ dự án đọc rồi nói hình không khớp cảnh — đúng, vì ảnh trong kho là
     vật đơn lẻ (con thỏ, quả táo, mặt buồn) chứ không phải cảnh có người
     đang làm gì với ai. Rút xuống ba cảnh thì mỗi cảnh vẽ riêng được một
     hình đúng nội dung, và ba cảnh cũng vừa đủ kể một câu chuyện có đạo lý:
     gặp chuyện → do dự → chọn làm đúng. */
  if (t.canh.length !== 3) bao(t.ma + ': phải đúng ba cảnh, đang có ' + t.canh.length);
  if (t.doDu !== 1) bao(t.ma + ': cảnh do dự phải là cảnh giữa');

  /* Không cần giới hạn riêng cho cả truyện nữa: ba cảnh nhân trần chín mươi
     lăm chữ một cảnh là đã chặn ở chừng hai mươi hai giây nghe, vừa sức cả
     bé hai tuổi. Đặt thêm một con số cho cả truyện chỉ là số liệu thừa. */
  t.canh.forEach((c, i) => {
    if (!c.loi || c.loi.length < 30) bao(t.ma + ' cảnh ' + (i + 1) + ': lời kể quá ngắn');
    // hai câu một cảnh: một câu tả cảnh, một câu đẩy truyện đi
    const soCau = (c.loi.match(/[.!?…]/g) || []).length;
    if (soCau > 3) bao(t.ma + ' cảnh ' + (i + 1) + ': ' + soCau + ' câu trong một cảnh, nhiều quá');
    if (c.loi.length > 95) bao(t.ma + ' cảnh ' + (i + 1) + ': lời kể dài ' + c.loi.length + ' chữ');
  });

  if (typeof t.doDu !== 'number')
    bao(t.ma + ': chưa khai cảnh do dự (trường doDu)');
});

/* ---- 4. không chữ nào lọt vào ô trả lời ---- */
['mam-non/be-ngoan/truyen.html', 'mam-non/be-ngoan/tinh-huong.html'].forEach(f => {
  const s = fs.readFileSync(ROOT + '/' + f, 'utf8');
  if (!/khongChu|khong-chu/.test(s)) bao(f + ': chưa bật chế độ không chữ cho bé mầm non');
  if (/\.nhan\b/.test(s.replace(/\/\*[\s\S]*?\*\//g, ''))) bao(f + ': có vẻ đang đưa nhãn chữ ra màn hình');
});

/* ---- 5. trang phải nạp đủ script ---- */
const CAN = {
  'mam-non/be-ngoan/truyen.html': ['o-tra-loi.js', 'hinh-ve.js', 'quiz.js', 'truyen-dao-duc.js', 'ke-chuyen.js'],
  'mam-non/be-ngoan/tinh-huong.html': ['o-tra-loi.js', 'hinh-ve.js', 'quiz.js', 'truyen-dao-duc.js'],
  'mam-non/be-ngoan/index.html': ['hinh-ve.js', 'truyen-dao-duc.js']
};
Object.keys(CAN).forEach(f => {
  const s = fs.readFileSync(ROOT + '/' + f, 'utf8');
  CAN[f].forEach(j => { if (s.indexOf(j) < 0) bao(f + ': chưa nạp ' + j); });
});

/* ---- 6. trang chủ mầm non phải trỏ tới khu mới ---- */
const mn = fs.readFileSync(ROOT + '/mam-non/index.html', 'utf8');
['be-ngoan/index.html', 'be-ngoan/tinh-huong.html'].forEach(h => {
  if (mn.indexOf(h) < 0) bao('mam-non/index.html: chưa có liên kết ' + h);
});

console.log('   ' + T.TRUYEN.length + ' truyện · ' +
  T.TRUYEN.reduce((s, t) => s + t.canh.length, 0) + ' cảnh · ' +
  T.TRUYEN.reduce((s, t) => s + t.hoi.length, 0) + ' câu hỏi truyện · ' +
  T.TINH_HUONG.length + ' tình huống');
console.log('   ' + soHinh + ' lượt dùng ảnh, ' + dung.size + ' ảnh khác nhau');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Bé ngoan: không lỗi');
process.exit(loi ? 1 : 0);
