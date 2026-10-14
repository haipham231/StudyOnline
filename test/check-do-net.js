/* Độ nét của ảnh: ảnh phải đủ pixel cho chỗ hiển thị to nhất của nó.
   Màn hình điện thoại thường có DPR 2 hoặc 3, nên một ảnh hiện 190px bề
   ngang cần tới 380-570 pixel thật. Thu ảnh xuống quá là nhìn bị bể.

   Bộ này canh để không lặp lại lần tôi thu mọi ảnh xuống 200px rồi sau đó
   phóng to chỗ hiển thị mà quên kiểm lại. */
const fs = require('fs'), path = require('path');
const ROOT = require('path').join(__dirname, '..');
let loi = 0;
const bao = m => { loi++; console.log('   ✗ ' + m); };

// đọc bề ngang/cao thẳng từ phần đầu tệp, khỏi phải giải nén cả ảnh
function coPNG(p) {
  const b = fs.readFileSync(p, { start: 0, end: 32 });
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

/* WebP có ba kiểu khối, mỗi kiểu ghi kích thước một chỗ khác nhau:
   VP8X (bản mở rộng, cwebp dùng khi ảnh có kênh trong suốt), VP8L (nén
   không mất dữ liệu) và VP8 (nén thường). */
function coWEBP(p) {
  const b = fs.readFileSync(p, { start: 0, end: 32 });
  const loai = b.toString('ascii', 12, 16);
  if (loai === 'VP8X') {
    return { w: (b[24] | (b[25] << 8) | (b[26] << 16)) + 1,
             h: (b[27] | (b[28] << 8) | (b[29] << 16)) + 1 };
  }
  if (loai === 'VP8L') {
    const v = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
    return { w: (v & 0x3fff) + 1, h: ((v >> 14) & 0x3fff) + 1 };
  }
  return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
}

function coAnh(p) { return /\.webp$/i.test(p) ? coWEBP(p) : coPNG(p); }

/* Chỗ hiển thị to nhất của từng kho ảnh, tính bằng pixel CSS.
   Lấy từ css/style.css — sửa cỡ hiển thị thì sửa cả bảng này. */
/* Chỗ hiển thị to nhất của từng thư mục ảnh, tính bằng pixel CSS.
   Lấy từ css/style.css — sửa cỡ hiển thị thì sửa cả bảng này.
   Thư mục nào vẽ nhỏ thì ngưỡng nhỏ, không bắt ảnh phải to vô ích. */
const DUNG_O = {
  'sinh-vat/canh': 320,         // tranh cảnh truyện, vẽ gần trọn bề ngang thẻ
  'sinh-vat': 200,              // trần cứng .hinh-ve trong css/style.css
  'halloween/canh': 140,        // nhân vật trong cảnh cắt
  'halloween/do': 95,           // khung hộp đáp án
  'halloween': 80,              // quái canh ải
  'cong-chua/quai': 136,        // quái chặng đường
  'cong-chua': 110,             // hiệp sĩ, công chúa
  'vu-tru/hanh-tinh': 100,
  'vu-tru/thuyen': 84,          // khung cổng
  'vu-tru/quai': 60,
  'vu-tru/vat': 34,             // đá, sao chổi trôi nổi
  'vu-tru': 60                  // phi hành gia, tên lửa
};

// vài tệp lẻ vẽ nhỏ hơn hẳn phần còn lại của thư mục
var RIENG = {
  'da.png': 24, 'da-vun.png': 24, 'lua-sung.png': 22, 'ten-lua.png': 34

};

// thư mục khớp dài nhất thì thắng
function nguong(duong) {
  let tot = null;
  Object.keys(DUNG_O).forEach(k => {
    if (duong.indexOf('/assets/' + k + '/') >= 0 &&
        (!tot || k.length > tot.length)) tot = k;
  });
  return tot ? { khoa: tot, to: DUNG_O[tot] } : null;
}

console.log('── Độ nét ảnh ──');

function quet(thu) {
  const ra = [];
  fs.readdirSync(thu, { withFileTypes: true }).forEach(d => {
    const p = path.join(thu, d.name);
    if (d.isDirectory()) ra.push.apply(ra, quet(p));
    else if (d.name.endsWith('.webp')) ra.push(p);
    // .png nào đã có bản .webp bên cạnh chỉ là bản lưu, không phải ảnh đang dùng
    else if (d.name.endsWith('.png') && !fs.existsSync(p.replace(/\.png$/, '.webp'))) ra.push(p);
  });
  return ra;
}

const theoKho = {};
quet(ROOT + '/assets').forEach(p => {
  const n = nguong(p);
  if (!n) return;
  const c = coAnh(p);
  const d = Math.max(c.w, c.h);
  const k = theoKho[n.khoa] || (theoKho[n.khoa] = { to: n.to, so: 0, thieu: 0, beNhat: Infinity, ten: '' });
  k.so++;
  if (d < k.beNhat) { k.beNhat = d; k.ten = path.basename(p); }
  var to = RIENG[path.basename(p)] || n.to;
  if (d < to * 2 * 0.75) k.thieu++;
});

Object.keys(theoKho).sort().forEach(kho => {
  const k = theoKho[kho];
  const can = k.to * 2;
  const dong = '   ' + kho.padEnd(18) + String(k.so).padStart(3) + ' ảnh · nhỏ nhất ' +
    String(k.beNhat).padStart(3) + 'px · cần ' + can + 'px (hiện ' + k.to + 'px ở DPR 2)';
  if (k.thieu) bao(dong + '\n       → ' + k.thieu + '/' + k.so + ' ảnh thiếu pixel, nhỏ nhất ' + k.ten);
  else console.log(dong + ' ✓');
});

console.log(loi ? '\n❌ ' + loi + ' kho ảnh chưa đủ nét' : '\n✅ Độ nét: không lỗi');
process.exit(loi ? 1 : 0);
