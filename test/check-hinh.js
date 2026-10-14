/* Mọi khoá khai trong HinhVe phải có ảnh thật trên đĩa, và mọi ảnh trong
   assets/sinh-vat phải có ít nhất một khoá trỏ tới (kẻo cắt thừa mà quên nối).

   Hai bảng tra: KHO khoá bằng emoji, KHO_TU khoá bằng mặt chữ tiếng Anh cho
   tầng từ không emoji nào tả đúng. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

const g = { window: null, Object, String, RegExp, console,
  document: { getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }] } };
g.window = g;
vm.createContext(g);
vm.runInContext(fs.readFileSync(ROOT + '/js/hinh-ve.js', 'utf8'), g);
const H = g.HinhVe;

console.log('── Kho hình thay emoji ──');

const dung = new Set();
[['emoji', H.KHO], ['từ', H.KHO_TU || {}]].forEach(([nhan, bang]) => {
  Object.keys(bang).forEach(k => {
    const p = ROOT + '/assets/sinh-vat/' + bang[k] + '.webp';
    if (!fs.existsSync(p)) bao(nhan + ' ' + k + ' trỏ tới ảnh không có: ' + bang[k]);
    else dung.add(bang[k]);
  });
});

// một ảnh không được vừa gắn emoji vừa gắn mặt chữ, kẻo sửa một nơi quên nơi kia
(function () {
  const theoE = new Set(Object.values(H.KHO));
  Object.values(H.KHO_TU || {}).forEach(d => {
    if (theoE.has(d)) bao('ảnh ' + d + ' bị gắn ở cả hai bảng tra');
  });
})();

let tong = 0;
fs.readdirSync(ROOT + '/assets/sinh-vat').forEach(thu => {
  fs.readdirSync(ROOT + '/assets/sinh-vat/' + thu)
    .filter(f => f.endsWith('.webp'))
    .forEach(f => {
      tong++;
      const ten = thu + '/' + f.replace(/\.webp$/, '');
      if (!dung.has(ten)) console.log('   ! ảnh chưa nối với từ nào: ' + ten);
    });
});

// đổi chuỗi: không được phá thẻ HTML
const thu = H.doi('<img src="a/🐰.png" class="x">🐰 xong');
if (/src="a\/<img/.test(thu)) bao('doi() chui vào cả thuộc tính của thẻ');
if (!/alt=""/.test(thu)) bao('doi() không đổi được emoji nằm ngoài thẻ');

// ảnh của hai khu game không được lẫn vào đây
if (fs.existsSync(ROOT + '/assets/sinh-vat/quai')) bao('assets/sinh-vat lẫn thư mục quái');

console.log('   ' + Object.keys(H.KHO).length + ' emoji + ' +
  Object.keys(H.KHO_TU || {}).length + ' từ → ' + dung.size + '/' + tong + ' ảnh được dùng');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Kho hình: không lỗi');
process.exit(loi ? 1 : 0);
