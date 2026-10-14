#!/usr/bin/env node
/* Chạy hết các bộ kiểm tra trong thư mục này.

   Dùng: node test/chay.js            — chạy tất cả
         node test/chay.js dao-duc    — chỉ chạy bộ nào có tên khớp

   Các bộ này trước nằm ở thư mục tạm của phiên làm việc. Thư mục đó bị hệ
   thống dọn ba lần, mỗi lần mất vài bộ: từ hai mươi sáu bộ rơi xuống còn
   mười một, trong đó mất hẳn check-l1.js mà check-game.js cần tới. Nay dời
   vào repo để không mất nữa.

   Thư mục này không phải một phần của trang web. Nó có nằm trên GitHub Pages
   nhưng chẳng trang nào trỏ tới, và toàn tệp chạy bằng Node chứ trình duyệt
   không đụng tới.
*/
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');

const loc = process.argv[2];
const ds = fs.readdirSync(__dirname)
  .filter(f => /^check-.*\.js$/.test(f))
  .filter(f => !loc || f.indexOf(loc) >= 0)
  .sort();

if (!ds.length) {
  console.log('Không thấy bộ kiểm tra nào' + (loc ? ' khớp "' + loc + '"' : ''));
  process.exit(1);
}

let do_ = 0;
const hong = [];
ds.forEach(f => {
  try {
    execFileSync(process.execPath, [path.join(__dirname, f)], { stdio: 'pipe' });
    process.stdout.write('✅ ' + f.replace(/^check-|\.js$/g, '') + '\n');
  } catch (e) {
    do_++;
    hong.push(f);
    const ra = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : '');
    process.stdout.write('❌ ' + f.replace(/^check-|\.js$/g, '') + '\n');
    ra.split('\n').slice(-14).forEach(d => { if (d.trim()) console.log('   ' + d); });
  }
});

console.log('\n' + (do_
  ? '❌ ' + do_ + ' bộ đỏ trên ' + ds.length + ': ' + hong.join(' ')
  : '✅ cả ' + ds.length + ' bộ đều xanh'));
process.exit(do_ ? 1 : 0);
