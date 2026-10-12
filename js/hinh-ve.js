/* ===== Kho hình vẽ thay cho emoji =====
   Khu Mầm non và Tiếng Anh trước đây dùng emoji hệ thống cho mọi con vật, xe
   cộ, trái cây — mỗi máy hiện một kiểu, nét nhỏ và nhạt. Mô-đun này tra một
   emoji ra ảnh tự vẽ tương ứng.

   Emoji nào chưa có ảnh thì giữ nguyên emoji, nên thêm được tới đâu dùng tới
   đó, không phải đổi cả site một lượt.
*/
(function (global) {
  'use strict';

  // tự suy ra thư mục ảnh từ vị trí của chính tệp script này
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/hinh-ve\.js(\?|$)/.test(src)) return src.replace(/js\/hinh-ve\.js.*$/, '');
    }
    return '';
  })();

  // emoji → 'thư mục/tên tệp' trong assets/sinh-vat
  var KHO = {
    /* thú quen thuộc và thú nuôi */
    '🐰': 'quen/tho', '🐶': 'quen/cho', '🐱': 'quen/meo', '🐵': 'quen/khi',
    '🐻': 'quen/gau', '🐭': 'quen/chuot', '🐮': 'quen/bo', '🐔': 'quen/ga-mai',
    '🐘': 'quen/voi', '🐷': 'quen/lon', '🦁': 'quen/su-tu', '🐑': 'quen/cuu',
    '🐴': 'quen/ngua', '🐿️': 'quen/soc', '🐐': 'quen/de', '🦆': 'quen/vit',
    '🐕': 'quen/cho', '🐈': 'quen/meo',

    /* thú rừng */
    '🐺': 'rung/soi', '🦊': 'rung/cao', '🦌': 'rung/nai', '🐼': 'rung/gau-truc',
    '🦓': 'rung/ngua-van', '🦏': 'rung/te-giac', '🦛': 'rung/ha-ma', '🐫': 'rung/lac-da',
    '🦘': 'rung/kangaroo', '🦥': 'rung/luoi', '🦔': 'rung/nhim', '🦇': 'rung/doi',
    '🦍': 'rung/khi-dot', '🐍': 'rung/ran', '🦎': 'rung/than-lan', '🦒': 'rung/huou-cao-co',

    /* dưới biển */
    '🐬': 'bien/ca-heo', '🐳': 'bien/ca-voi', '🦈': 'bien/ca-map', '🐙': 'bien/bach-tuoc',
    '🦑': 'bien/muc', '🦀': 'bien/cua', '🦞': 'bien/tom-hum', '🦐': 'bien/tom',
    '🪼': 'bien/sua', '🦭': 'bien/hai-cau', '🐚': 'bien/so', '🪸': 'bien/san-ho',
    '🐠': 'bien/ca-nhiet-doi', '🐊': 'bien/ca-sau', '🐢': 'bien/rua-bien',

    /* chim và côn trùng */
    '🐦': 'chim-bo/chim-nho', '🦅': 'chim-bo/dai-bang', '🦉': 'chim-bo/cu',
    '🦚': 'chim-bo/cong', '🦢': 'chim-bo/thien-nga', '🐧': 'chim-bo/canh-cut',
    '🦩': 'chim-bo/hong-hac', '🐓': 'chim-bo/ga-trong', '🐤': 'chim-bo/ga-con',
    '🦜': 'chim-bo/vet', '🐝': 'chim-bo/ong', '🦋': 'chim-bo/buom',
    '🐜': 'chim-bo/kien', '🐞': 'chim-bo/bo-rua', '🐌': 'chim-bo/oc-sen', '🐛': 'chim-bo/sau',

    /* phương tiện */
    '🚗': 'xe/o-to', '🏍️': 'xe/xe-may', '🚲': 'xe/xe-dap', '✈️': 'xe/may-bay',
    '🚂': 'xe/tau-hoa', '⛵': 'xe/thuyen-buom', '🚌': 'xe/xe-buyt', '🚒': 'xe/xe-cuu-hoa',
    '🚚': 'xe/xe-tai', '🚑': 'xe/xe-cuu-thuong', '🚓': 'xe/xe-canh-sat', '🚕': 'xe/taxi',
    '🚊': 'xe/tau-dien', '🚁': 'xe/truc-thang', '🚢': 'xe/tau-thuy', '🚜': 'xe/may-cay',

    /* trái cây và rau củ */
    '🍎': 'qua-rau/tao', '🍌': 'qua-rau/chuoi', '🍊': 'qua-rau/cam', '🍇': 'qua-rau/nho',
    '🍉': 'qua-rau/dua-hau', '🍓': 'qua-rau/dau-tay', '🍍': 'qua-rau/dua', '🥭': 'qua-rau/xoai',
    '🥕': 'qua-rau/ca-rot', '🌽': 'qua-rau/ngo', '🍅': 'qua-rau/ca-chua', '🥔': 'qua-rau/khoai-tay',
    '🥒': 'qua-rau/dua-chuot', '🥦': 'qua-rau/bong-cai', '🍄': 'qua-rau/nam', '🌶️': 'qua-rau/ot',

    /* món ăn của con vật */
    '🦴': 'thuc-an/xuong', '🐟': 'thuc-an/ca', '🍯': 'thuc-an/mat-ong',
    '🧀': 'thuc-an/pho-mai', '🌿': 'thuc-an/co', '🌾': 'thuc-an/thoc',
    '🎋': 'thuc-an/tre', '🍃': 'thuc-an/la-cay', '🪱': 'thuc-an/giun',
    '🥩': 'thuc-an/thit', '🪰': 'thuc-an/ruoi', '🌼': 'thuc-an/hoa',
    '🥬': 'thuc-an/la-rau', '🌰': 'thuc-an/hat-de',
    '🐸': 'thuc-an/ech', '🦗': 'thuc-an/chau-chau',

    /* đồ vật quen thuộc */
    '🎒': 'do-vat/cap-sach', '📖': 'do-vat/sach', '✏️': 'do-vat/but-chi',
    '🥤': 'do-vat/coc-nuoc', '☂️': 'do-vat/cai-o', '⚽': 'do-vat/qua-bong',
    '🧸': 'do-vat/gau-bong', '🎈': 'do-vat/bong-bay', '🪑': 'do-vat/cai-ghe',
    '🛏️': 'do-vat/cai-giuong', '💡': 'do-vat/bong-den', '🌀': 'do-vat/quat-may',
    '🥣': 'do-vat/bat', '🥄': 'do-vat/thia', '🔑': 'do-vat/chia-khoa',
    '🕐': 'do-vat/dong-ho',

    /* gia đình và cơ thể */
    '👴': 'nguoi/ong', '👵': 'nguoi/ba', '👨': 'nguoi/bo', '👩': 'nguoi/me',
    '👦': 'nguoi/anh-trai', '👧': 'nguoi/chi-gai', '👶': 'nguoi/em-be',
    '👨‍👩‍👧‍👦': 'nguoi/ca-nha',
    '👁️': 'nguoi/mat', '👂': 'nguoi/tai', '👃': 'nguoi/mui', '👄': 'nguoi/mieng',
    '✋': 'nguoi/ban-tay', '🦶': 'nguoi/ban-chan', '💇': 'nguoi/toc', '🦷': 'nguoi/rang',

    /* quần áo và đồ ăn */
    '👕': 'mac-an/ao-phong', '👖': 'mac-an/quan', '👗': 'mac-an/vay',
    '🧢': 'mac-an/mu', '👟': 'mac-an/giay', '🧦': 'mac-an/tat',
    '🧣': 'mac-an/khan', '🧤': 'mac-an/gang-tay', '🍚': 'mac-an/com',
    '🍜': 'mac-an/pho', '🍞': 'mac-an/banh-mi', '🥛': 'mac-an/sua',
    '🥚': 'mac-an/trung', '🧁': 'mac-an/banh-ngot', '🍬': 'mac-an/keo',
    '💧': 'mac-an/giot-nuoc',

    /* thêm thú và sinh vật biển */
    '🐋': 'them/ca-voi-xanh', '🐅': 'them/ho', '🐆': 'them/bao',
    '🐻‍❄️': 'them/gau-bac-cuc', '🦝': 'them/gau-meo', '🦫': 'them/hai-ly',
    '🫎': 'them/nai-sung-tam',

    /* màu sắc, thời tiết và nơi sống */
    '🟥': 'mau-troi/mau-do', '🟨': 'mau-troi/mau-vang',
    '🟩': 'mau-troi/mau-xanh-la', '🟦': 'mau-troi/mau-xanh-duong',
    '🟪': 'mau-troi/mau-tim', '🟧': 'mau-troi/mau-cam',
    '🟫': 'mau-troi/mau-nau', '⬛': 'mau-troi/mau-den',
    '☀️': 'mau-troi/nang', '🌧️': 'mau-troi/mua', '☁️': 'mau-troi/may',
    '🌈': 'mau-troi/cau-vong', '❄️': 'mau-troi/tuyet', '💨': 'mau-troi/gio',
    '🌊': 'mau-troi/song-bien', '🌳': 'mau-troi/doi-co'
  };

  // Emoji có thể kèm hoặc không kèm ký tự biến thể U+FE0F; tra cả hai kiểu.
  var KHONG_FE0F = {};
  Object.keys(KHO).forEach(function (k) {
    KHONG_FE0F[k.replace(/️/g, '')] = KHO[k];
  });

  function tim(e) {
    if (!e) return null;
    return KHO[e] || KHONG_FE0F[String(e).replace(/️/g, '')] || null;
  }

  function co(e) { return !!tim(e); }

  /* Vẽ thẳng theo đường dẫn trong assets/sinh-vat, dùng cho thứ không có
     emoji nào tả đúng. */
  function veTen(duong, cls) {
    if (!duong) return null;
    return '<img class="' + (cls || 'hinh-ve') + '" src="' + GOC + 'assets/sinh-vat/' +
      duong + '.png" alt="" draggable="false">';
  }

  function ve(e, cls) {
    var d = tim(e);
    if (!d) return null;
    return '<img class="' + (cls || 'hinh-ve') + '" src="' + GOC + 'assets/sinh-vat/' + d +
      '.png" alt="" draggable="false">';
  }

  /* Đổi mọi emoji đã có ảnh trong một đoạn HTML thành thẻ ảnh. Chỉ đụng tới
     phần chữ ngoài thẻ, không mò vào thuộc tính nên không phá src hay class. */
  var MAU = new RegExp('(' + Object.keys(KHO)
    .sort(function (a, b) { return b.length - a.length; })
    .map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); })
    .join('|') + ')', 'g');

  function doi(html, cls) {
    if (html == null) return html;
    var s = String(html);
    if (s.indexOf('<') === -1) return s.replace(MAU, function (m) { return ve(m, cls) || m; });
    // có thẻ: tách ra, chỉ thay ở đoạn nằm ngoài thẻ
    return s.replace(/(<[^>]*>)|([^<]+)/g, function (_, the, chu) {
      if (the) return the;
      return chu.replace(MAU, function (m) { return ve(m, cls) || m; });
    });
  }

  global.HinhVe = { co: co, ve: ve, veTen: veTen, doi: doi, KHO: KHO, GOC: GOC };
})(window);
