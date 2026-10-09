/* ===== Trợ lý giải bài =====
   Chấm xong, với mỗi câu sai trợ lý nói lại đề, chỉ ra chỗ bé nhầm rồi giải
   từng bước.

   Trợ lý chạy ngay trong máy, không gọi dịch vụ nào bên ngoài: trang này là
   web tĩnh công khai nên không thể giấu khoá API ở đây được. Lời giải lấy từ
   hai nguồn:
     1. cau.giai — bộ sinh đề tự viết sẵn lời giải từng bước (bài nâng cao
        đều có);
     2. nếu không có thì suy từ tên mạch và các con số trong đề.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // Bỏ thẻ HTML để lấy chữ trần khi cô đọc lại đề. Phần <small> là lời dặn
  // cách gõ đáp án, đọc lại nghe lủng củng nên bỏ hẳn.
  function tran(s) {
    return String(s == null ? '' : s)
      .replace(/<small>[\s\S]*?<\/small>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,;:!?%)\]])/g, '$1')      // bỏ thẻ xong hay thừa dấu cách trước dấu câu
      .replace(/([(\[])\s+/g, '$1')
      .trim();
  }

  // Lấy các số trong một chuỗi, giữ cả số thập phân kiểu Việt (3,5)
  function soTrong(s) {
    return (tran(s).match(/\d+(?:,\d+)?/g) || []).map(function (x) {
      return Number(x.replace(',', '.'));
    });
  }

  /* ---------- Lời giải theo mạch ---------- */

  var THEO_MACH = {
    'Cộng trừ 100': function (q) {
      var n = soTrong(q.text);
      if (n.length < 2) return null;
      var cong = /\+/.test(q.text);
      if (!cong) return ['Tách số trừ ra cho dễ: ' + n[1] + ' = ' + Math.floor(n[1] / 10) * 10 +
        ' + ' + (n[1] % 10) + '.', 'Trừ phần chục trước, rồi trừ nốt phần đơn vị.'];
      return ['Cộng hàng đơn vị trước: ' + (n[0] % 10) + ' + ' + (n[1] % 10) + ' = ' + (n[0] % 10 + n[1] % 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' — vượt 10 nên nhớ 1 sang hàng chục.' : '.'),
        'Rồi cộng hàng chục: ' + Math.floor(n[0] / 10) + ' + ' + Math.floor(n[1] / 10) +
        ((n[0] % 10 + n[1] % 10) >= 10 ? ' + 1 (số nhớ)' : '') + '.'];
    },
    'Tìm x': function (q) {
      // dò bằng \s* chứ không phải dấu cách cứng: tran() có dọn bớt dấu cách
      // quanh dấu hai chấm nên "x : 9" thành "x: 9"
      var t = tran(q.text) + ' ' + tran(q.prompt);
      var ra = null;
      if (/x\s*\+/.test(t) || /\+\s*x/.test(t)) ra = ['x là một <b>số hạng</b> chưa biết.',
        'Muốn tìm số hạng chưa biết: lấy <b>tổng trừ đi số hạng kia</b>.'];
      else if (/x\s*[−-]/.test(t)) ra = ['x là <b>số bị trừ</b>.',
        'Muốn tìm số bị trừ: lấy <b>hiệu cộng với số trừ</b>.'];
      else if (/[−-]\s*x/.test(t)) ra = ['x là <b>số trừ</b>.',
        'Muốn tìm số trừ: lấy <b>số bị trừ trừ đi hiệu</b>.'];
      else if (/x\s*[×·]/.test(t) || /[×·]\s*x/.test(t)) ra = ['x là một <b>thừa số</b> chưa biết.',
        'Muốn tìm thừa số chưa biết: lấy <b>tích chia cho thừa số kia</b>.'];
      else if (/x\s*:/.test(t)) ra = ['x là <b>số bị chia</b>.',
        'Muốn tìm số bị chia: lấy <b>thương nhân với số chia</b>.'];
      else if (/:\s*x/.test(t)) ra = ['x là <b>số chia</b>.',
        'Muốn tìm số chia: lấy <b>số bị chia chia cho thương</b>.'];
      else ra = ['Nhìn xem x đứng ở vị trí nào trong phép tính rồi dùng đúng quy tắc.',
        'Số hạng chưa biết = tổng − số hạng kia. Số bị trừ = hiệu + số trừ.',
        'Thừa số chưa biết = tích : thừa số kia. Số bị chia = thương × số chia.'];
      return ra.concat(['x = <b>' + tran(q.answer) + '</b>. Thay ngược vào đề để thử lại cho chắc.']);
    },
    'Chia có dư': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var thuong = Math.floor(n[0] / n[1]);
      return ['Tìm xem ' + n[1] + ' nhân với mấy thì gần ' + n[0] + ' nhất mà không vượt quá: ' +
        n[1] + ' × ' + thuong + ' = ' + n[1] * thuong + '.',
        'Phần còn thừa chính là số dư: ' + n[0] + ' − ' + n[1] * thuong + ' = ' + (n[0] - n[1] * thuong) + '.',
        'Số dư luôn <b>nhỏ hơn số chia</b> — đây là chỗ hay nhầm nhất.'];
    },
    'Chu vi': function () {
      return ['Chu vi là độ dài đường bao quanh hình.',
        'Hình chữ nhật: <b>(dài + rộng) × 2</b>. Hình vuông: <b>cạnh × 4</b>.',
        'Chu vi đo bằng cm hoặc m, <b>không</b> có mũ hai.'];
    },
    'Diện tích': function () {
      return ['Diện tích là phần mặt bên trong hình.',
        'Hình chữ nhật: <b>dài × rộng</b>. Hình vuông: <b>cạnh × cạnh</b>.',
        'Hình bình hành: <b>đáy × chiều cao</b>. Hình thoi: <b>(chéo 1 × chéo 2) : 2</b>.',
        'Diện tích đo bằng cm² hoặc m² — nhớ viết mũ hai.'];
    },
    'Trung bình cộng': function (q) {
      var n = soTrong(q.prompt);
      if (!n.length) return null;
      var tong = n.reduce(function (a, b) { return a + b; }, 0);
      return ['Cộng tất cả các số lại: ' + n.join(' + ') + ' = ' + tong + '.',
        'Rồi chia cho <b>số lượng số</b> là ' + n.length + ': ' + tong + ' : ' + n.length + '.'];
    },
    'Tổng hiệu': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      return ['Số bé = (tổng − hiệu) : 2 = (' + n[0] + ' − ' + n[1] + ') : 2 = ' + ((n[0] - n[1]) / 2) + '.',
        'Số lớn = số bé + hiệu = ' + ((n[0] - n[1]) / 2) + ' + ' + n[1] + ' = ' + ((n[0] + n[1]) / 2) + '.',
        'Đọc kĩ đề hỏi số <b>lớn</b> hay số <b>bé</b> nhé.'];
    },
    'Tổng tỉ': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      var soPhan = n[1] + 1;
      return ['Coi số bé là 1 phần thì số lớn là ' + n[1] + ' phần, cả hai là ' + soPhan + ' phần.',
        'Một phần = tổng : số phần = ' + n[0] + ' : ' + soPhan + ' = ' + (n[0] / soPhan) + '.',
        'Số bé = 1 phần, số lớn = ' + n[1] + ' phần.'];
    },
    'Đổi đơn vị': function () {
      return ['Đổi từ đơn vị <b>lớn sang nhỏ</b> thì <b>nhân</b>, từ nhỏ sang lớn thì chia.',
        '1 km = 1000 m · 1 m = 100 cm · 1 kg = 1000 g · 1 tấn = 1000 kg',
        '1 giờ = 60 phút · 1 phút = 60 giây · 1 thế kỉ = 100 năm'];
    },
    'Dấu hiệu chia hết': function () {
      return ['Chia hết cho <b>2</b>: tận cùng là 0, 2, 4, 6, 8.',
        'Chia hết cho <b>5</b>: tận cùng là 0 hoặc 5.',
        'Chia hết cho <b>3</b>: tổng các chữ số chia hết cho 3.',
        'Chia hết cho <b>9</b>: tổng các chữ số chia hết cho 9.'];
    },
    'Biểu thức': function () {
      return ['Trong biểu thức, làm <b>nhân chia trước, cộng trừ sau</b>.',
        'Nếu có dấu ngoặc thì làm <b>trong ngoặc trước</b>.'];
    },
    'Từ loại': function () {
      return ['Từ chỉ <b>sự vật</b> gọi tên người, vật, cây cối, hiện tượng.',
        'Từ chỉ <b>hoạt động</b> nói việc ai đó làm.',
        'Từ chỉ <b>đặc điểm</b> tả màu sắc, hình dáng, tính nết.'];
    },
    'Chính tả': function (q) {
      return ['Đáp án đúng là <b>' + tran(q.answer) + '</b>.',
        'Mẹo: đọc to từ lên, so với từ mình vẫn gặp trong sách.'];
    },
    'Mẫu câu': function () {
      return ['<b>Ai là gì?</b> — giới thiệu, sau “là” thường là danh từ.',
        '<b>Ai làm gì?</b> — kể việc làm, có động từ.',
        '<b>Ai thế nào?</b> — tả đặc điểm, có tính từ.'];
    },
    'Đọc hiểu': function () {
      return ['Đọc lại đoạn văn rồi tìm <b>đúng câu chữ</b> nhắc tới điều đề hỏi.',
        'Câu trả lời gần như luôn nằm sẵn trong đoạn, không cần suy đoán xa.'];
    },

    /* ----- Bốn phép tính: suy thẳng từ phép tính trong đề ----- */

    'Phép tính': function (q) {
      var t = tran(q.text) || tran(q.prompt);
      var m = t.match(/(\d+)\s*([+−\-×·x*:])\s*(\d+)/);
      if (!m) return null;
      var a = Number(m[1]), b = Number(m[3]), dau = m[2];
      if (dau === '+') {
        // Số một chữ số thì đừng lôi hàng chục ra, bé lớp 1 nghe "0 + 0" là rối
        if (a < 10 && b < 10) {
          return ['Lấy ' + a + ' rồi <b>đếm thêm ' + b + '</b> nữa.',
            'Đếm tiếp: ' + (function () {
              var ds = [];
              for (var i = 1; i <= b; i++) ds.push(a + i);
              return ds.join(', ');
            })() + '.',
            'Dừng ở đâu thì đó là kết quả: ' + a + ' + ' + b + ' = <b>' + (a + b) + '</b>.',
            'Mẹo: đổi chỗ hai số vẫn ra như cũ, nên cứ lấy số lớn đếm thêm số bé cho nhanh.'];
        }
        var don = a % 10 + b % 10;
        return ['Cộng hàng đơn vị trước: ' + (a % 10) + ' + ' + (b % 10) + ' = ' + don +
            (don >= 10 ? ' — quá 10 nên viết ' + (don % 10) + ', nhớ 1 sang hàng chục.' : '.'),
          'Rồi cộng hàng chục: ' + Math.floor(a / 10) + ' + ' + Math.floor(b / 10) +
            (don >= 10 ? ' + 1 (số nhớ)' : '') + '.',
          'Kết quả: ' + a + ' + ' + b + ' = <b>' + (a + b) + '</b>.'];
      }
      if (dau === '−' || dau === '-') {
        if (a < 10 && b < 10) {
          return ['Lấy ' + a + ' rồi <b>đếm lùi ' + b + '</b> bước.',
            'Đếm lùi: ' + (function () {
              var ds = [];
              for (var i = 1; i <= b; i++) ds.push(a - i);
              return ds.join(', ');
            })() + '.',
            'Vậy ' + a + ' − ' + b + ' = <b>' + (a - b) + '</b>.',
            'Thử lại bằng phép cộng: ' + (a - b) + ' + ' + b + ' = ' + a + '.'];
        }
        return ['Đặt tính thẳng cột rồi trừ từ <b>hàng đơn vị</b> sang trái.',
          (a % 10) < (b % 10)
            ? 'Hàng đơn vị ' + (a % 10) + ' nhỏ hơn ' + (b % 10) + ' nên phải <b>mượn 1 chục</b> của hàng bên cạnh.'
            : 'Hàng đơn vị ' + (a % 10) + ' trừ được ' + (b % 10) + ' nên không phải mượn.',
          'Kết quả: ' + a + ' − ' + b + ' = <b>' + (a - b) + '</b>.',
          'Thử lại bằng phép cộng: ' + (a - b) + ' + ' + b + ' = ' + a + '.'];
      }
      if (dau === ':') {
        var thuong = Math.floor(a / b), du = a - thuong * b;
        return ['Hỏi ' + b + ' nhân với mấy thì được ' + a + '.',
          b + ' × ' + thuong + ' = ' + (b * thuong) + (du ? ', còn thừa ' + du + '.' : ', vừa đúng.'),
          'Vậy ' + a + ' : ' + b + ' = ' + thuong + (du ? ' (dư ' + du + ')' : '') + '.',
          'Thử lại: ' + thuong + ' × ' + b + (du ? ' + ' + du : '') + ' = ' + a + '.'];
      }
      return ['Nhân là <b>cộng nhiều lần giống nhau</b>: ' + a + ' × ' + b + ' nghĩa là lấy ' +
          a + ' cộng với chính nó ' + b + ' lần.',
        a + ' × ' + b + ' = ' + (a * b) + '.',
        'Mẹo thử lại: ' + (a * b) + ' : ' + b + ' = ' + a + '.'];
    },

    'Tính dãy': function (q) {
      var n = soTrong(q.text);
      if (n.length < 3) return null;
      return ['Dãy tính không có ngoặc, không có nhân chia thì làm <b>lần lượt từ trái sang phải</b>.',
        'Làm hai số đầu trước, được kết quả bao nhiêu thì đem tính tiếp với số sau.',
        'Đừng cộng nhảy cóc hai số cuối trước — đó là chỗ hay sai nhất.'];
    },

    'Tính nhanh': function (q) {
      var n = soTrong(q.text);
      return ['Nhìn kỹ sẽ thấy hai tích có <b>chung một thừa số</b>.',
        'Đặt thừa số chung ra ngoài: a × b + a × c = <b>a × (b + c)</b>.',
        n.length >= 4 ? n[0] + ' × (' + n[1] + ' + ' + n[3] + ') = ' + n[0] + ' × ' +
          (n[1] + n[3]) + ' = ' + tran(q.answer) + '.' : 'Cộng trong ngoặc trước rồi mới nhân một lần.',
        'Cách này nhẩm nhanh hơn nhân hai lần rồi cộng.'];
    },

    'Thứ tự phép tính': function () {
      return ['Thứ tự đúng: <b>lũy thừa → nhân chia → cộng trừ</b>.',
        'Có dấu ngoặc thì làm trong ngoặc trước tiên.',
        'Cùng mức nhân chia (hoặc cùng mức cộng trừ) thì làm từ trái sang phải.'];
    },

    'Nhân chia': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 3) return null;
      return ['Nhân và chia là <b>hai phép tính ngược nhau</b>.',
        'Từ ' + n[0] + ' × ' + n[1] + ' = ' + n[2] + ' suy ra ngay ' + n[2] + ' : ' + n[1] +
          ' = ' + n[0] + ' và ' + n[2] + ' : ' + n[0] + ' = ' + n[1] + '.',
        'Biết một phép nhân là biết luôn hai phép chia, khỏi tính lại.'];
    },

    'Gấp giảm': function (q) {
      var n = soTrong(q.prompt);
      var gap = /gấp/i.test(tran(q.prompt));
      if (n.length < 2) return null;
      return [gap ? '<b>Gấp lên</b> bao nhiêu lần thì <b>nhân</b> với bấy nhiêu.'
                  : '<b>Giảm đi</b> bao nhiêu lần thì <b>chia</b> cho bấy nhiêu.',
        n[0] + (gap ? ' × ' : ' : ') + n[1] + ' = ' + tran(q.answer) + '.',
        'Chỗ hay nhầm: “giảm đi 7 lần” là chia cho 7, không phải trừ đi 7.'];
    },

    /* ----- Số và cấu tạo số ----- */

    'Đếm': function (q) {
      return ['Đếm từng hình một, chỉ tay vào từng hình cho khỏi sót hay đếm lặp.',
        'Đếm xong đọc lại số cuối cùng — đó chính là số lượng.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Thứ tự số': function (q) {
      return ['Số <b>liền trước</b> là số bé hơn 1 đơn vị, số <b>liền sau</b> là số lớn hơn 1 đơn vị.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.',
        'Mẹo: nhẩm dãy số đếm xuôi rồi tìm số đứng ngay cạnh.'];
    },

    'Tách gộp số': function (q) {
      var n = soTrong(q.prompt);
      if (n.length < 2) return null;
      return ['Gộp lại nghĩa là <b>cộng</b> hai số với nhau.',
        n[0] + ' + ' + n[1] + ' = ' + tran(q.answer) + '.',
        'Ngược lại, tách ' + tran(q.answer) + ' ra thì được ' + n[0] + ' và ' + n[1] + '.'];
    },

    'Chục và đơn vị': function (q) {
      return ['Số có hai chữ số: chữ số bên <b>trái</b> là hàng chục, bên <b>phải</b> là hàng đơn vị.',
        'Ví dụ 35 gồm 3 chục và 5 đơn vị, tức là 30 + 5.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Số có ba chữ số': function (q) {
      return ['Viết theo đúng thứ tự <b>trăm – chục – đơn vị</b>, từ trái sang phải.',
        'Hàng nào không có thì viết số <b>0</b> vào chỗ đó, không được bỏ trống.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Hàng và lớp': function (q) {
      return ['Đếm hàng từ <b>phải sang trái</b>: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn.',
        'Tìm vị trí của chữ số đề hỏi rồi đọc tên hàng ứng với vị trí đó.',
        'Ở câu này chữ số đó ở hàng <b>' + tran(q.answer) + '</b>.'];
    },

    'Dãy số': function (q) {
      var n = soTrong(q.prompt);
      return ['Nhìn hai số liền nhau xem cách nhau mấy đơn vị — đó là <b>khoảng cách</b> của dãy.',
        n.length ? 'Dãy này đếm thêm ' + n[n.length - 1] + ' mỗi bước.' :
          'Tìm ra khoảng cách rồi cộng tiếp vào số đứng trước chỗ trống.',
        'Số cần điền là <b>' + tran(q.answer) + '</b>. Thử lại bằng cách đọc xuôi cả dãy.'];
    },

    'Điền số': function (q) {
      return ['Đây là bài tìm <b>số còn thiếu</b> trong một phép tính.',
        'Thiếu số hạng thì lấy <b>tổng trừ số hạng kia</b>; thiếu số trừ thì lấy ' +
          '<b>số bị trừ trừ hiệu</b>.',
        'Điền <b>' + tran(q.answer) + '</b> rồi đọc lại cả phép tính xem có đúng không.'];
    },

    'Thành phần phép tính': function () {
      return ['Phép cộng: hai <b>số hạng</b> cộng lại ra <b>tổng</b>.',
        'Phép trừ: <b>số bị trừ</b> trừ <b>số trừ</b> ra <b>hiệu</b>.',
        'Phép nhân: hai <b>thừa số</b> nhân ra <b>tích</b>.',
        'Phép chia: <b>số bị chia</b> chia <b>số chia</b> ra <b>thương</b>.'];
    },

    'Làm tròn': function (q) {
      var t = tran(q.prompt);
      var hang = (t.match(/hàng\s+([a-zàáạảãăắằặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữ ]+)/i) || [])[1];
      return ['Nhìn chữ số đứng <b>ngay sau</b> hàng cần làm tròn' + (hang ? ' (hàng ' + hang.trim() + ')' : '') + '.',
        'Chữ số đó <b>nhỏ hơn 5</b> thì giữ nguyên, <b>từ 5 trở lên</b> thì tăng thêm 1.',
        'Các hàng phía sau đổi hết thành 0.',
        'Kết quả là <b>' + tran(q.answer) + '</b>.'];
    },

    'Lũy thừa': function (q) {
      var n = soTrong(q.text);
      if (n.length < 2) return null;
      return ['Lũy thừa là phép <b>nhân nhiều lần cùng một số</b>.',
        n[0] + '<sup>' + n[1] + '</sup> nghĩa là nhân ' + n[1] + ' lần số ' + n[0] + '.',
        'Kết quả bằng <b>' + tran(q.answer) + '</b>.',
        'Chỗ hay nhầm: lấy ' + n[0] + ' × ' + n[1] + ' — đó là phép nhân chứ không phải lũy thừa.'];
    },

    /* ----- So sánh ----- */

    'So sánh': function (q) {
      return ['So từ <b>hàng cao nhất</b> xuống: số nào nhiều chữ số hơn thì lớn hơn.',
        'Bằng số chữ số thì so từng hàng từ trái sang, gặp hàng khác nhau là biết ngay.',
        'Dấu <b>&gt;</b> là lớn hơn, <b>&lt;</b> là bé hơn, <b>=</b> là bằng nhau.',
        'Mẹo nhớ: miệng dấu luôn há về phía số lớn.'];
    },

    'Số thập phân': function (q) {
      return ['So số thập phân thì so <b>phần nguyên trước</b>, bằng nhau mới so tiếp sau dấu phẩy.',
        'Sau dấu phẩy so lần lượt từng chữ số: phần mười, rồi phần trăm.',
        'Cộng trừ số thập phân phải đặt <b>thẳng cột dấu phẩy</b>.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    /* ----- Phân số ----- */

    'Phân số': function (q) {
      var n = soTrong(q.prompt);
      return ['Tìm phân số của một số thì lấy số đó <b>chia cho mẫu, rồi nhân với tử</b>.',
        n.length >= 3 ? n[2] + ' : ' + n[1] + ' = ' + (n[2] / n[1]) + ', rồi × ' + n[0] +
          ' = ' + tran(q.answer) + '.' : 'Chia trước nhân sau cho dễ nhẩm.',
        'Chỗ hay nhầm: nhân thẳng với mẫu số.'];
    },

    'Phân số của một số': function (q) {
      return THEO_MACH['Phân số'](q);
    },

    'Rút gọn phân số': function () {
      return ['Rút gọn là chia <b>cả tử và mẫu</b> cho cùng một số.',
        'Chia cho <b>ước chung lớn nhất</b> thì một lần là xong, không phải rút nhiều lượt.',
        'Phân số tối giản là phân số không chia được cho số nào nữa ngoài 1.'];
    },

    'Cộng trừ phân số': function () {
      return ['Hai phân số <b>cùng mẫu</b>: cộng (hoặc trừ) tử số, <b>giữ nguyên mẫu số</b>.',
        'Khác mẫu thì phải <b>quy đồng</b> về cùng một mẫu rồi mới cộng trừ.',
        'Chỗ hay nhầm: cộng cả tử lẫn mẫu.'];
    },

    'So sánh phân số': function () {
      return ['Cùng mẫu số thì phân số nào <b>tử lớn hơn</b> là lớn hơn.',
        'Cùng tử số thì phân số nào <b>mẫu bé hơn</b> lại lớn hơn — vì chia cho ít phần thì mỗi phần to hơn.',
        'Khác cả tử lẫn mẫu thì <b>quy đồng</b> rồi so tử số.'];
    },

    'Tỉ số phần trăm': function (q) {
      var n = soTrong(q.prompt);
      return ['Muốn tìm a% của một số, lấy <b>số đó nhân a rồi chia 100</b>.',
        n.length >= 2 ? n[1] + ' × ' + n[0] + ' : 100 = ' + tran(q.answer) + '.' :
          'Nhân trước chia sau, hoặc chia 100 trước cho số nhỏ dễ nhẩm.',
        'Mẹo nhẩm: 10% là chia 10, 25% là chia 4, 50% là chia 2.'];
    },

    /* ----- Toán đố ----- */

    'Toán đố': function (q) {
      var t = tran(q.prompt);
      var n = soTrong(q.prompt);
      var dan;
      if (/nhiều hơn|thêm|cho thêm|mua thêm|nữa/i.test(t))
        dan = '“<b>nhiều hơn</b>”, “<b>thêm</b>” là dấu hiệu của phép <b>cộng</b>.';
      else if (/ít hơn|bớt|cho đi|bay đi|còn lại|ăn mất/i.test(t))
        dan = '“<b>ít hơn</b>”, “<b>còn lại</b>”, “<b>cho đi</b>” là dấu hiệu của phép <b>trừ</b>.';
      else if (/mỗi .* có|gấp|tất cả .* nhóm|hàng nào cũng/i.test(t))
        dan = '“<b>mỗi … có</b>”, “<b>gấp … lần</b>” là dấu hiệu của phép <b>nhân</b>.';
      else if (/chia đều|mỗi phần|chia cho/i.test(t))
        dan = '“<b>chia đều</b>”, “<b>mỗi phần</b>” là dấu hiệu của phép <b>chia</b>.';
      else dan = 'Đọc kỹ xem đề hỏi <b>thêm vào</b> hay <b>bớt đi</b> để chọn đúng phép tính.';
      return ['Gạch chân con số và từ khoá trong đề trước đã.',
        dan,
        n.length >= 2 ? 'Hai số trong đề là ' + n[0] + ' và ' + n[1] + '.' :
          'Tìm đủ các số đề cho rồi mới đặt phép tính.',
        'Phép tính đúng cho ra <b>' + tran(q.answer) + (q.after ? ' ' + tran(q.after) : '') + '</b>.',
        'Viết câu trả lời đầy đủ, đừng quên đơn vị.'];
    },

    'Giải toán': function (q) {
      return ['Trung bình cộng = <b>tổng các số chia cho số lượng số</b>.',
        'Cộng hết các số lại trước, rồi mới chia.',
        'Kết quả là <b>' + tran(q.answer) + '</b>.',
        'Chỗ hay nhầm: chia nhầm cho một số bất kỳ thay vì chia cho số lượng số hạng.'];
    },

    /* ----- Đo lường ----- */

    'Đo độ dài': function (q) {
      return ['Đặt vạch <b>0</b> của thước trùng đúng đầu vật cần đo.',
        'Đọc số ở vạch trùng với đầu kia — đó là độ dài.',
        'Ở đây đo được <b>' + tran(q.answer) + ' cm</b>.'];
    },

    'Đơn vị đo độ dài': function () {
      return ['Cộng trừ số đo thì <b>phải cùng một đơn vị</b> mới cộng được.',
        'Tính phần số như bình thường, xong <b>viết lại đơn vị</b> ở kết quả.',
        'Nhớ: 1 m = 100 cm, 1 dm = 10 cm, 1 km = 1000 m.'];
    },

    'Khối lượng': function () {
      return ['Bài cân nặng làm y như toán đố: tìm từ khoá để chọn phép tính.',
        '“Cả hai bao” là <b>cộng</b>, “nặng hơn / nhẹ hơn” là <b>trừ</b>.',
        'Nhớ viết đơn vị <b>kg</b> hoặc <b>g</b> vào kết quả. 1 kg = 1000 g.'];
    },

    'Dung tích': function () {
      return ['Lít viết tắt là <b>l</b>, dùng để đo nước, sữa, dầu…',
        '“Nhiều hơn” thì cộng, “ít hơn” thì trừ — giống hệt toán đố.',
        'Đừng quên ghi đơn vị <b>l</b> sau kết quả.'];
    },

    'Tiền Việt Nam': function (q) {
      var n = soTrong(q.prompt);
      return ['Mua nhiều món cùng giá thì lấy <b>giá một món nhân số món</b>.',
        n.length >= 2 ? n[0] + ' × ' + n[1] + ' = ' + tran(q.answer) + ' đồng.' :
          'Nhân xong nhớ kiểm lại số chữ số 0.',
        'Trả lại tiền thì lấy <b>tiền đưa trừ tiền hàng</b>.'];
    },

    'Xem giờ': function (q) {
      return ['Kim <b>ngắn</b> chỉ giờ, kim <b>dài</b> chỉ phút.',
        'Kim dài chỉ số 12 là đúng giờ, chỉ số 6 là rưỡi (30 phút).',
        'Đồng hồ này chỉ <b>' + tran(q.answer) + '</b>.'];
    },

    'Ngày tháng': function (q) {
      return ['Tháng 1, 3, 5, 7, 8, 10, 12 có <b>31 ngày</b>.',
        'Tháng 4, 6, 9, 11 có <b>30 ngày</b>. Riêng tháng 2 có 28 ngày (năm nhuận là 29).',
        'Mẹo nắm tay: đốt xương nhô lên là tháng 31 ngày, chỗ lõm là 30 ngày.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Số đo thời gian': function () {
      return ['Cộng trừ số đo thời gian thì tính <b>giờ với giờ, phút với phút</b>.',
        'Phút cộng lại quá 60 thì <b>đổi 60 phút thành 1 giờ</b> nhớ sang.',
        'Phút không đủ trừ thì mượn 1 giờ đổi thành 60 phút.'];
    },

    'Chuyển động đều': function (q) {
      return ['Ba công thức đi liền nhau: <b>quãng đường = vận tốc × thời gian</b>.',
        'Từ đó suy ra <b>thời gian = quãng đường : vận tốc</b> và <b>vận tốc = quãng đường : thời gian</b>.',
        'Kết quả là <b>' + tran(q.answer) + (q.after ? ' ' + tran(q.after) : '') + '</b>.',
        'Nhớ kiểm tra đơn vị: km đi với km/giờ thì ra giờ.'];
    },

    /* ----- Hình học ----- */

    'Hình học': function (q) {
      return ['Nhớ số cạnh của từng hình: tam giác <b>3</b>, hình vuông và chữ nhật <b>4</b>, ' +
          'lục giác <b>6</b>.',
        'Hình tròn thì không có cạnh nào, chỉ có một đường cong khép kín.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Hình phẳng': function (q) {
      return ['Hình <b>vuông</b> bốn cạnh bằng nhau; hình <b>chữ nhật</b> hai cạnh dài hai cạnh ngắn.',
        'Hình <b>tam giác</b> ba cạnh, hình <b>tròn</b> không có cạnh.',
        'Đây là <b>' + tran(q.answer) + '</b>.'];
    },

    'Hình khối': function (q) {
      return ['Khối <b>lập phương</b> sáu mặt đều là hình vuông, như con xúc xắc.',
        'Khối <b>hộp chữ nhật</b> giống bao diêm; khối <b>trụ</b> giống lon nước; khối <b>cầu</b> như quả bóng.',
        'Đây là <b>' + tran(q.answer) + '</b>.'];
    },

    'Hình học trực quan': function (q) {
      return ['Đọc kỹ dấu hiệu đề cho rồi đối chiếu với từng hình.',
        'Hình đúng ở đây là <b>' + tran(q.answer) + '</b>.',
        'Mẹo: vẽ nhanh hình ra nháp rồi đếm cạnh, đếm góc cho chắc.'];
    },

    'Góc': function (q) {
      return ['Góc <b>nhọn</b> nhỏ hơn góc vuông, góc <b>vuông</b> đúng 90°, góc <b>tù</b> lớn hơn 90°.',
        'Góc <b>bẹt</b> bằng 180°, hai cạnh duỗi thẳng thành một đường.',
        'Đáp án đúng là <b>' + tran(q.answer) + '</b>.'];
    },

    'Đường gấp khúc': function (q) {
      var n = soTrong(q.prompt);
      return ['Độ dài đường gấp khúc = <b>cộng độ dài tất cả các đoạn</b>.',
        n.length >= 2 ? n.slice(0, n.length).join(' + ') + ' = ' + tran(q.answer) + ' cm.' :
          'Đừng bỏ sót đoạn nào.',
        'Chỗ hay nhầm: chỉ cộng hai đoạn đầu rồi quên đoạn cuối.'];
    },

    'Hình tròn': function (q) {
      return ['Chu vi hình tròn = <b>đường kính × 3,14</b> (hoặc bán kính × 2 × 3,14).',
        'Diện tích hình tròn = <b>bán kính × bán kính × 3,14</b>.',
        'Kết quả là <b>' + tran(q.answer) + (q.after ? ' ' + tran(q.after) : '') + '</b>.',
        'Chỗ hay nhầm: lấy bán kính nhân 2 khi tính diện tích.'];
    },

    'Thể tích': function (q) {
      return ['Thể tích hình hộp chữ nhật = <b>dài × rộng × cao</b>.',
        'Thể tích hình lập phương = <b>cạnh × cạnh × cạnh</b>.',
        'Kết quả là <b>' + tran(q.answer) + ' cm³</b> — nhớ viết mũ ba.'];
    },

    'Tính ngược hình học': function (q) {
      return ['Biết diện tích, tìm ngược lại một kích thước thì làm <b>phép chia</b>.',
        'Tam giác: diện tích = đáy × cao : 2, nên <b>cao = diện tích × 2 : đáy</b>.',
        'Chữ nhật: <b>rộng = diện tích : dài</b>.',
        'Kết quả là <b>' + tran(q.answer) + (q.after ? ' ' + tran(q.after) : '') + '</b>.'];
    },

    /* ----- Tiếng Anh ----- */

    'Từ vựng': function (q) {
      return ['Đáp án đúng là <b>' + tran(q.answer) + '</b>.',
        'Học từ mới thì đọc to lên vài lần rồi đặt một câu ngắn với từ đó.',
        'Mẹo nhớ lâu: gắn từ với hình ảnh trong đầu thay vì học vẹt mặt chữ.'];
    }
  };

  /* Nhiều mạch khác tên nhưng cùng một cách giảng — trỏ chung về một luật. */
  [['Cộng trừ', 'Phép tính'], ['Cộng trừ 1000', 'Phép tính'], ['Cộng trừ số lớn', 'Phép tính'],
   ['Bảng nhân', 'Phép tính'], ['Bảng chia', 'Phép tính'],
   ['Nhân ngoài bảng', 'Phép tính'], ['Chia ngoài bảng', 'Phép tính'],
   ['Nhân số lớn', 'Phép tính'], ['Chia số lớn', 'Phép tính'],
   ['So sánh số', 'So sánh'], ['Số sánh', 'So sánh']
  ].forEach(function (c) {
    if (!THEO_MACH[c[0]]) THEO_MACH[c[0]] = THEO_MACH[c[1]];
  });

  // tên mạch có thể là "Bảng nhân 2", "Bảng chia 5"… nên dò theo tiền tố
  function timLuat(mach) {
    if (!mach) return null;
    if (THEO_MACH[mach]) return THEO_MACH[mach];
    var khoa = Object.keys(THEO_MACH).filter(function (k) { return mach.indexOf(k) === 0; })[0];
    return khoa ? THEO_MACH[khoa] : null;
  }

  function buoc(m) {
    var q = m.cau || {};
    if (q.giai) return [].concat(q.giai);
    var luat = timLuat(m.mach || q.mach);
    if (luat) {
      var ra = luat(q);
      if (ra && ra.length) return ra;
    }
    return ['Đáp án đúng là <b>' + tran(m.answer) + '</b>, bé trả lời <b>' + tran(m.given) + '</b>.',
      'Bé đọc lại đề một lần nữa rồi thử tự làm lại câu này nhé.'];
  }

  /* ---------- Cô Nhi hiện lên giảng bài ---------- */

  var TEN_CO = 'Cô Nhi — AI';

  // Mười một dáng cô giáo cắt sẵn. Mỗi bài giảng đổi một dáng cho đỡ chán.
  // Tấm sticker gốc có mười hai dáng; bỏ dáng giơ nắm tay vì lúc gỡ bóng nói
  // rỗng đã mài sứt mất một mảng tóc.
  var DANG = [
    '1-thuoc-sach', '2-bang-den', '3-om-sach', '4-gio-tay',
    '5-giang-bai', '6-nghi-ngoi', '7-bang-trang', '8-chi-sach',
    '9-may-tinh', '11-xoa-dau', '12-tam-biet'
  ];
  var dangTruoc = -1;

  // Trang bài tập nằm sâu một hoặc hai tầng thư mục, nên lấy gốc trang từ
  // chính đường dẫn của tệp js này thay vì đoán bằng ../
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/tro-ly\.js(\?|$)/.test(src)) return src.replace(/js\/tro-ly\.js.*$/, '');
    }
    return '';
  })();

  function dangNgauNhien() {
    var k;
    do { k = Math.floor(Math.random() * DANG.length); }
    while (DANG.length > 1 && k === dangTruoc);
    dangTruoc = k;
    return GOC + 'assets/co-giao/' + DANG[k] + '.png';
  }

  /* Bài giảng cho một câu sai: từng câu nói ngắn, cô nói lần lượt. */
  function loiGiang(m, thuTu, tong) {
    var noi = [];
    noi.push('Mình cùng xem lại <b>câu ' + thuTu + '</b> trong ' + tong +
      ' câu con làm chưa đúng nhé.');
    // Bài đọc hiểu có nguyên đoạn văn trong đề; đọc lại cả đoạn thì màn hình
    // điện thoại không chứa nổi một bài giảng, nên chỉ nhắc phần cuối.
    var de = tran(m.label);
    if (de.length > 200) de = '…' + de.slice(de.length - 190);
    noi.push('Đề bài là: <i>' + de + (m.after ? ' (' + tran(m.after) + ')' : '') + '</i>');
    noi.push('Con trả lời <b class="sai">' + tran(m.given) + '</b>, còn đáp án đúng là <b class="dung">' +
      tran(m.answer) + '</b>.');
    noi.push('Cô giảng lại từ đầu nha:');
    buoc(m).forEach(function (b, i) { noi.push('<span class="buoc">' + (i + 1) + '</span> ' + b); });
    noi.push(KHUYEN[Math.floor(Math.random() * KHUYEN.length)]);
    return noi;
  }

  var KHUYEN = [
    'Con hiểu rồi chứ? Lần sau gặp dạng này con làm được ngay thôi!',
    'Dạng bài này chỉ cần nhớ đúng một bước là xong. Con giỏi lắm!',
    'Sai một câu không sao cả, biết vì sao sai mới là điều quan trọng nhé.',
    'Con thử tự làm lại câu này một lần nữa cho nhớ lâu nhé!',
    'Cô tin lần sau con sẽ làm đúng câu này.'
  ];

  /* Cô có nói thành tiếng hay không — nhớ lại lựa chọn của lần trước. */
  var KHOA_NOI = 'studyonline:co-noi';

  function dangBatTieng() {
    try { return localStorage.getItem(KHOA_NOI) !== '0'; } catch (e) { return true; }
  }
  function datTieng(bat) {
    try { localStorage.setItem(KHOA_NOI, bat ? '1' : '0'); } catch (e) { /* chế độ riêng tư */ }
  }

  function thoiNoi() {
    if (global.speechSynthesis) { try { global.speechSynthesis.cancel(); } catch (e) {} }
  }

  /* Gõ chữ ra từ từ cho giống đang nói, và nếu bật tiếng thì cô đọc luôn
     từng câu. Câu sau chỉ bắt đầu khi câu trước vừa gõ xong vừa đọc xong.
     Trả về hàm tua nhanh tới hết. */
  // dòng có số thứ tự bước thì xếp theo cột, chữ xuống dòng vẫn thẳng hàng
  function lopDongChung(html) {
    return 'cau' + (/^<span class="buoc">/.test(html) ? ' co-buoc' : '');
  }

  function goChu(oChua, cacCau, xong, coTieng) {
    var lopDong = lopDongChung;
    var i = 0, huy = false, hen = null, dong = null, chuoi = null, vt = 0;
    var goXong = false, noiXong = false, daSang = false;

    function cauSau() {
      if (huy) return;
      if (i >= cacCau.length) { if (xong) xong(); return; }
      dong = el('p', lopDong(cacCau[i]));
      oChua.appendChild(dong);
      chuoi = cheNho(cacCau[i]);
      vt = 0;
      goXong = false;
      daSang = false;
      noiXong = true;

      if (coTieng && global.Quiz && global.Quiz.docTo) {
        noiXong = false;
        global.Quiz.docTo(cacCau[i], null, {
          giangBai: true, noiTiep: i > 0,
          xong: function () { noiXong = true; thuSang(); }
        });
      }
      i++;
      goTiep();
    }

    function thuSang() {
      if (huy || daSang || !goXong || !noiXong) return;
      daSang = true;
      hen = setTimeout(cauSau, 240);
    }

    // tách chuỗi HTML thành từng mẩu: thẻ hiện ngay, chữ hiện từng con một
    function cheNho(html) {
      var ra = [], re = /<[^>]+>|&[a-z#0-9]+;|[\s\S]/g, m;
      while ((m = re.exec(html))) ra.push(m[0]);
      return ra;
    }

    function goTiep() {
      if (huy) return;
      var den = Math.min(chuoi.length, vt + 1);
      dong.innerHTML = chuoi.slice(0, den).join('');
      lan();
      if (den >= chuoi.length) { vt = den; goXong = true; thuSang(); return; }
      var c = chuoi[den - 1];
      vt = den;
      // bật tiếng thì gõ chậm lại cho khớp nhịp cô nói
      var cho = coTieng ? 32 : 17;
      if (c === ',' || c === ';' || c === ':') cho = coTieng ? 190 : 150;
      else if (c === '.' || c === '!' || c === '?') cho = coTieng ? 300 : 240;
      hen = setTimeout(goTiep, cho);
    }

    function lan() {
      // luôn giữ dòng mới nhất trong tầm mắt
      oChua.scrollTop = oChua.scrollHeight;
    }

    cauSau();

    return {
      het: function () {
        if (huy) return;
        clearTimeout(hen);
        thoiNoi();
        if (dong && chuoi) dong.innerHTML = chuoi.join('');
        while (i < cacCau.length) {
          oChua.appendChild(el('p', lopDong(cacCau[i]), cacCau[i]));
          i++;
        }
        lan();
        if (xong) xong();
      },
      dung: function () { huy = true; clearTimeout(hen); thoiNoi(); }
    };
  }

  /* Popup cô giáo: mỗi lần một bài giảng, điện thoại hiện trọn vẹn. */
  function moHop(cacSai, batDau) {
    var k = batDau || 0, dangGo = null;

    var nen = el('div', 'nen-co');
    var hop = el('div', 'hop-co');
    hop.setAttribute('role', 'dialog');
    hop.setAttribute('aria-modal', 'true');
    hop.setAttribute('aria-label', TEN_CO + ' giảng bài');
    nen.appendChild(hop);

    var dau = el('div', 'co-dau');
    dau.appendChild(el('span', 'co-ten', '👩‍🏫 ' + TEN_CO));
    var dem = el('span', 'co-dem');
    dau.appendChild(dem);
    var nutLoa = el('button', 'co-loa', '');
    nutLoa.type = 'button';
    dau.appendChild(nutLoa);
    veLoa();

    function veLoa() {
      var bat = dangBatTieng();
      nutLoa.textContent = bat ? '🔊' : '🔇';
      nutLoa.classList.toggle('tat-tieng', !bat);
      nutLoa.title = bat ? 'Tắt tiếng cô' : 'Bật tiếng cô';
      nutLoa.setAttribute('aria-label', nutLoa.title);
      nutLoa.setAttribute('aria-pressed', bat ? 'true' : 'false');
    }
    var nutDong = el('button', 'co-dong', '✕');
    nutDong.type = 'button';
    nutDong.setAttribute('aria-label', 'Đóng');
    dau.appendChild(nutDong);
    hop.appendChild(dau);

    var than = el('div', 'co-than');
    var anh = el('img', 'co-anh');
    anh.alt = TEN_CO;
    anh.decoding = 'async';
    than.appendChild(anh);
    var bong = el('div', 'co-bong');
    var loi = el('div', 'co-loi');
    bong.appendChild(loi);
    than.appendChild(bong);
    hop.appendChild(than);

    var chan = el('div', 'co-chan');
    var nutTua = el('button', 'btn ghost co-tua', '⏩ Nói nhanh');
    nutTua.type = 'button';
    chan.appendChild(nutTua);
    var nutHieu = el('button', 'btn go co-hieu', 'Em đã hiểu');
    nutHieu.type = 'button';
    chan.appendChild(nutHieu);
    hop.appendChild(chan);

    /* Ướm thử cả bài giảng một lượt để chọn cỡ chữ vừa khung, rồi mới cho
       cô nói. Làm vậy chữ không nhảy cỡ giữa chừng, mà bài dài tới đâu
       màn hình điện thoại vẫn chứa trọn một bài. */
    function chonCoChu(cacCau) {
      var co = 16;
      loi.style.fontSize = co + 'px';
      loi.innerHTML = cacCau.map(function (c) {
        return '<p class="' + lopDongChung(c) + '">' + c + '</p>';
      }).join('');
      while (co > 12.5 && bong.scrollHeight > bong.clientHeight) {
        co -= 0.5;
        loi.style.fontSize = co + 'px';
      }
      loi.innerHTML = '';
    }

    function ve() {
      if (dangGo) dangGo.dung();
      loi.innerHTML = '';
      anh.src = dangNgauNhien();
      dem.textContent = 'Bài giảng ' + (k + 1) + ' / ' + cacSai.length;
      nutHieu.textContent = k + 1 < cacSai.length ? 'Em đã hiểu → câu sau' : 'Em đã hiểu';
      nutTua.disabled = false;
      hop.classList.add('dang-noi');
      thoiNoi();
      var cacCau = loiGiang(cacSai[k], k + 1, cacSai.length);
      chonCoChu(cacCau);
      dangGo = goChu(loi, cacCau, function () {
        nutTua.disabled = true;
        hop.classList.remove('dang-noi');
      }, dangBatTieng());
    }

    function dong() {
      if (dangGo) dangGo.dung();
      thoiNoi();
      document.removeEventListener('keydown', phim);
      document.body.classList.remove('khoa-cuon');
      nen.classList.add('tat');
      setTimeout(function () { if (nen.parentNode) nen.parentNode.removeChild(nen); }, 180);
    }

    function phim(ev) {
      if (ev.key === 'Escape') { dong(); ev.preventDefault(); }
      else if (ev.key === 'Enter' || ev.key === ' ') { nutHieu.click(); ev.preventDefault(); }
    }

    nutTua.addEventListener('click', function () { if (dangGo) dangGo.het(); });
    nutDong.addEventListener('click', dong);
    nen.addEventListener('click', function (ev) { if (ev.target === nen) dong(); });
    nutHieu.addEventListener('click', function () {
      if (k + 1 < cacSai.length) { k++; ve(); }
      else dong();
    });
    nutLoa.addEventListener('click', function () {
      var bat = !dangBatTieng();
      datTieng(bat);
      veLoa();
      // bật lên giữa chừng thì cô giảng lại bài này từ đầu cho có tiếng
      if (bat) ve(); else thoiNoi();
    });
    document.addEventListener('keydown', phim);

    document.body.appendChild(nen);
    document.body.classList.add('khoa-cuon');
    requestAnimationFrame(function () { nen.classList.add('hien'); });
    ve();
    nutHieu.focus();
  }

  /* Khối hiện dưới phiếu điểm: một nút mời cô giáo lên giảng. */
  function veBang(cacSai) {
    var khung = el('div', 'tro-ly');
    khung.appendChild(el('h3', null, '👩‍🏫 ' + TEN_CO + ' giảng lại bài'));
    khung.appendChild(el('p', 'tro-ly-dan',
      'Con làm chưa đúng ' + cacSai.length + ' câu. Bấm nút dưới đây, cô sẽ giảng ' +
      'lại từng câu một cho con nghe.'));

    var nut = el('button', 'btn go nut-giang', '🧑‍🏫 Giải thích câu sai');
    nut.type = 'button';
    nut.addEventListener('click', function () { moHop(cacSai, 0); });
    khung.appendChild(nut);
    return khung;
  }

  global.TroLy = { veBang: veBang, moHop: moHop, buoc: buoc, _soTrong: soTrong };
})(window);
