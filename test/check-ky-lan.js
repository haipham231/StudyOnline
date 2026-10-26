/* Game Bay cùng kỳ lân — dành riêng cho bé hai tới năm tuổi.

   Điều bộ này canh, và là lý do nó ra đời: BÉ MẦM NON CHƯA ĐỌC ĐƯỢC CHỮ.
   Lúc đầu game lấy thẳng bộ sinh đề dùng chung với trang bài tập, nên ô trả
   lời có nhãn chữ bên dưới mỗi hình — nhãn vừa vô dụng vừa ép hình nhỏ lại
   để chừa chỗ cho mấy chữ bé không đọc nổi.

   Ba thứ được miễn, vì chúng chính là bài học chứ không phải chữ để đọc:
   chữ cái đơn (Đâu là chữ A), chữ số (Có mấy quả cam), và đề bài — đề luôn
   được đọc thành tiếng.
*/
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { Object, String, RegExp, Math, Array, console, JSON, Set,
  localStorage: { getItem: () => null, setItem: () => {} },
  document: { getElementsByTagName: () => [], getElementById: () => null } };
g.window = g; g.global = g;
vm.createContext(g);
['quiz.js', 'tieng-viet-mam-non.js'].forEach(t =>
  vm.runInContext(fs.readFileSync(ROOT + '/js/' + t, 'utf8'), g));
const M = g.TiengVietMN;

console.log('── Game Bay cùng kỳ lân ──');

/* Lọc ra phần CHỮ ĐỌC HIỂU của một ô trả lời.

   Bỏ thẻ HTML, bỏ emoji và mấy ký tự đi kèm nó. Emoji không phải chữ: lúc
   hiện lên thì HinhVe đổi nó thành thẻ ảnh, còn trong dữ liệu nó vẫn là một
   ký tự. Quên lọc emoji là bộ test báo nhầm con gà với ô màu xanh thành
   "chữ còn sót". */
const chu = s => String(s == null ? '' : s)
  .replace(/<[^>]*>/g, '')
  // dải 2B00-2BFF là chỗ của ⬛ ô màu đen, không nằm cùng chỗ với 🟥 🟨 🟩
  .replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
  .trim();

/* ---- 1. Trang game phải bật chế độ không chữ ---- */
const mg = fs.readFileSync(ROOT + '/js/game-ky-lan.js', 'utf8');
if (!/datKhongChu\(true\)/.test(mg))
  bao('game-ky-lan.js không bật chế độ không chữ');
if (!/'panel man-choi kids khong-chu'/.test(mg))
  bao('khung game thiếu lớp khong-chu, ô trả lời sẽ không được vẽ to');

/* ---- 2. Không ô trả lời nào được chứa chữ đọc hiểu ---- */
M.datKhongChu(true);

const BO = [
  ['Tầng Mây', () => M.ngheVaChon('con vật', 3), 'hinh'],
  ['Cầu Vồng', () => M.ngheVaChon('màu sắc', 3), 'hinh'],
  ['Vườn Sao', () => M.demBangChu(5), 'so'],
  ['Cung Trăng — nhận biết chữ', () => M.nhanBietChu(), 'chu'],
  ['Cung Trăng — chữ đầu từ', () => M.chuDauTu(), 'chu'],
  ['Lâu Đài Mây — hoạt động', () => M.hoatDong(), 'hinh']
];

BO.forEach(([ten, sinh, kieu]) => {
  for (let i = 0; i < 300; i++) {
    const q = sinh();

    if (q.choices.indexOf(q.answer) < 0)
      return bao(ten + ': đáp án không nằm trong lựa chọn');
    if (new Set(q.choices).size !== q.choices.length)
      return bao(ten + ': có hai ô giống hệt nhau, bé chọn đúng vẫn bị chấm sai');
    if (q.choices.length !== 3)
      return bao(ten + ': ' + q.choices.length + ' ô — bé mầm non chỉ nên chọn trong ba');
    if (q.cols !== 3)
      return bao(ten + ': cols = ' + q.cols + ', phải là 3 cho khớp số ô');

    for (const o of q.choices) {
      const t = chu(o);
      if (kieu === 'hinh' && t)
        return bao(ten + ': ô trả lời còn chữ "' + t + '"');
      if (kieu === 'so' && !/^\d+$/.test(t))
        return bao(ten + ': ô phải là chữ số, đang là "' + t + '"');
      if (kieu === 'chu' && t.length > 1)
        return bao(ten + ': ô phải là một chữ cái, đang là "' + t + '"');
    }
  }
  console.log('   ' + ten.padEnd(28) + '300 lượt ✓');
});

/* ---- 3. Hoạt động phải ĐẢO CHIỀU, không được hỏi kiểu cũ ----
   Giữ kiểu cũ mà bỏ chữ đi là hỏng: đề đã hiện sẵn hình việc đang làm, ba ô
   cũng là hình, ô đúng trùng khít với đề nên bé chỉ việc so hình. */
for (let i = 0; i < 200; i++) {
  const q = M.hoatDong();
  if (q.art) { bao('hoatDong: còn hiện hình ở đề, bé so hình là ra ngay'); break; }
  if (q.choices.indexOf(q.art) >= 0) { bao('hoatDong: đề trùng với một ô trả lời'); break; }
}

/* ---- 4. Tắt chế độ thì nhãn chữ phải quay lại ----
   Mấy bộ sinh đề này còn dùng ở trang bài tập có kèm chữ cho bé lớn hơn. */
M.datKhongChu(false);
const thu = M.ngheVaChon('con vật', 3);
if (!/class="nhan"/.test(thu.choices[0]))
  bao('tắt chế độ không chữ mà nhãn không quay lại — hỏng các trang khác');
const demThu = M.demBangChu(5);
if (/^\d+$/.test(chu(demThu.answer)))
  bao('tắt chế độ không chữ mà đếm số vẫn ra chữ số thay vì chữ viết');

console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Kỳ lân: không lỗi');
process.exit(loi ? 1 : 0);
