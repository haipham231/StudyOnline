/* Kho hình assets/hinh — soát toàn bộ, theo cả hai chiều.

   Kho xếp làm hai nhánh:
     dan/<chủ đề>/   hình dán nền trong suốt (con vật, đồ ăn, động từ…)
     tranh/<loại>/   tranh vẽ kín nền (cảnh truyện, nơi sống, cắt cảnh)

   Trong mã, mọi đường dẫn tới kho đều viết dạng chuỗi 'dan/…' hoặc 'tranh/…'
   tương đối với assets/hinh. Bộ này dựa vào đúng quy ước đó để soát:

   1. Chuỗi nào trong mã trỏ tới tệp không có → LỖI. Đây là ô ảnh vỡ trước
      mắt bé.
   2. Tệp nào trong kho không chuỗi nào trỏ tới → báo để xem lại, không tính
      lỗi (có thể là hình để dành).
   3. Kho phải sạch: chỉ có webp, tên tệp và thư mục toàn chữ thường không
      dấu nối bằng gạch ngang, không còn thư mục cũ "sinh-vat".

   Bộ này ra đời lúc xếp lại cả kho: dời 793 tệp và sửa 1593 chỗ gọi tới. Nó
   là thứ bảo đảm không sót chỗ nào.
*/
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const KHO = path.join(ROOT, 'assets/hinh');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

console.log('── Kho hình ──');

function quet(thu, goc) {
  return fs.readdirSync(thu, { withFileTypes: true }).flatMap(e => {
    const p = path.join(thu, e.name);
    if (e.isDirectory()) return quet(p, goc);
    return [path.relative(goc, p)];
  });
}

/* ---- 3. kho sạch ---- */
if (fs.existsSync(path.join(ROOT, 'assets/sinh-vat'))) bao('thư mục cũ assets/sinh-vat vẫn còn');
const tatCa = quet(KHO, KHO).filter(f => !/(^|\/)\.DS_Store$/.test(f));
fs.readdirSync(KHO).forEach(n => {
  if (n !== 'dan' && n !== 'tranh' && n !== '.DS_Store') bao('assets/hinh chỉ được có dan/ và tranh/, thấy thêm: ' + n);
});
tatCa.forEach(f => {
  if (!/\.webp$/.test(f)) bao('tệp không phải webp: ' + f);
  if (!/^[a-z0-9\-\/]+\.webp$/.test(f)) bao('tên chưa sạch (chữ hoa, dấu, khoảng trắng…): ' + f);
});
const coTep = new Set(tatCa.filter(f => f.endsWith('.webp')).map(f => f.replace(/\.webp$/, '')));

/* ---- 1. mọi chuỗi đường dẫn trong mã phải có tệp ---- */
const maNguon = require('child_process')
  .execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: ROOT }).toString()
  .split('\n').filter(f => /\.(js|html)$/.test(f) && !/^test\//.test(f));

const duocGoi = new Set();
let soChuoi = 0;
maNguon.forEach(f => {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const re = /(['"])((?:dan|tranh)\/[a-z0-9\-]+\/[a-z0-9\-]+)\1/g;
  let m;
  while ((m = re.exec(s))) {
    soChuoi++;
    duocGoi.add(m[2]);
    if (!coTep.has(m[2])) bao(f + ' trỏ tới hình không có: ' + m[2]);
  }
  // đường dẫn đầy đủ viết cứng, như con rắn trong mê cung
  const re2 = /assets\/hinh\/([a-z0-9\-\/]+)\.webp/g;
  while ((m = re2.exec(s))) {
    soChuoi++;
    duocGoi.add(m[1]);
    if (!coTep.has(m[1])) bao(f + ' trỏ tới hình không có: ' + m[1]);
  }
});

/* ---- 2. tệp không ai dùng ---- */
const thua = [...coTep].filter(f => !duocGoi.has(f)).sort();
if (thua.length) {
  console.log('   ! ' + thua.length + ' hình chưa chỗ nào dùng:');
  thua.forEach(f => console.log('       ' + f));
}

/* ---- bảng tra emoji / mặt chữ ---- */
const g = { window: null, Object, String, RegExp, console,
  document: { getElementsByTagName: () => [{ src: 'http://x/js/hinh-ve.js' }] } };
g.window = g;
vm.createContext(g);
vm.runInContext(fs.readFileSync(ROOT + '/js/hinh-ve.js', 'utf8'), g);
const H = g.HinhVe;

[['emoji', H.KHO], ['từ', H.KHO_TU || {}]].forEach(([nhan, bang]) => {
  Object.keys(bang).forEach(k => {
    if (!/^dan\//.test(bang[k])) bao(nhan + ' ' + k + ' phải trỏ vào nhánh dan/: ' + bang[k]);
  });
});
// một ảnh không được vừa gắn emoji vừa gắn mặt chữ, kẻo sửa một nơi quên nơi kia
const theoE = new Set(Object.values(H.KHO));
Object.values(H.KHO_TU || {}).forEach(d => {
  if (theoE.has(d)) bao('ảnh ' + d + ' bị gắn ở cả hai bảng tra');
});

// đổi chuỗi: không được phá thẻ HTML
const thu = H.doi('<img src="a/🐰.png" class="x">🐰 xong');
if (/src="a\/<img/.test(thu)) bao('doi() chui vào cả thuộc tính của thẻ');
if (!/alt=""/.test(thu)) bao('doi() không đổi được emoji nằm ngoài thẻ');
if (!/assets\/hinh\/dan\//.test(H.ve('🐰') || '')) bao('ve() không dựng đường dẫn assets/hinh/dan/…');

const theoNhanh = {};
coTep.forEach(f => { const k = f.split('/').slice(0, 2).join('/'); theoNhanh[k] = (theoNhanh[k] || 0) + 1; });
console.log('   ' + coTep.size + ' hình · ' + Object.keys(theoNhanh).length + ' thư mục · ' +
  soChuoi + ' chỗ gọi tới trong mã · ' + duocGoi.size + ' hình được dùng');
console.log(loi ? '\n❌ ' + loi + ' lỗi' : '\n✅ Kho hình: không lỗi');
process.exit(loi ? 1 : 0);
