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

  // emoji → 'dan/<chủ đề>/<tên tệp>' trong assets/hinh
  var KHO = {
    /* thú quen thuộc và thú nuôi */
    '🐰': 'dan/con-vat/tho', '🐶': 'dan/con-vat/cho', '🐱': 'dan/con-vat/meo', '🐵': 'dan/con-vat/khi',
    '🐻': 'dan/con-vat/gau', '🐭': 'dan/con-vat/chuot', '🐮': 'dan/con-vat/bo', '🐔': 'dan/con-vat/ga-mai',
    '🐘': 'dan/con-vat/voi', '🐷': 'dan/con-vat/lon', '🦁': 'dan/con-vat/su-tu', '🐑': 'dan/con-vat/cuu',
    '🐴': 'dan/con-vat/ngua', '🐿️': 'dan/con-vat/soc', '🐐': 'dan/con-vat/de', '🦆': 'dan/con-vat/vit',
    '🐕': 'dan/con-vat/cho', '🐈': 'dan/con-vat/meo',

    /* thú rừng */
    '🐺': 'dan/con-vat/soi', '🦊': 'dan/con-vat/cao', '🦌': 'dan/con-vat/nai', '🐼': 'dan/con-vat/gau-truc',
    '🦓': 'dan/con-vat/ngua-van', '🦏': 'dan/con-vat/te-giac', '🦛': 'dan/con-vat/ha-ma', '🐫': 'dan/con-vat/lac-da',
    '🦘': 'dan/con-vat/kangaroo', '🦥': 'dan/con-vat/luoi', '🦔': 'dan/con-vat/nhim', '🦇': 'dan/con-vat/doi',
    '🦍': 'dan/con-vat/khi-dot', '🐍': 'dan/con-vat/ran', '🦎': 'dan/con-vat/than-lan', '🦒': 'dan/con-vat/huou-cao-co',

    /* dưới biển */
    '🐬': 'dan/con-vat/ca-heo', '🐳': 'dan/con-vat/ca-voi', '🦈': 'dan/con-vat/ca-map', '🐙': 'dan/con-vat/bach-tuoc',
    '🦑': 'dan/con-vat/muc', '🦀': 'dan/con-vat/cua', '🦞': 'dan/con-vat/tom-hum', '🦐': 'dan/con-vat/tom',
    '🪼': 'dan/con-vat/sua', '🦭': 'dan/con-vat/hai-cau', '🐚': 'dan/con-vat/so', '🪸': 'dan/con-vat/san-ho',
    '🐠': 'dan/con-vat/ca-nhiet-doi', '🐊': 'dan/con-vat/ca-sau', '🐢': 'dan/con-vat/rua-bien',

    /* chim và côn trùng */
    '🐦': 'dan/con-vat/chim-nho', '🦅': 'dan/con-vat/dai-bang', '🦉': 'dan/con-vat/cu',
    '🦚': 'dan/con-vat/cong', '🦢': 'dan/con-vat/thien-nga', '🐧': 'dan/con-vat/canh-cut',
    '🦩': 'dan/con-vat/hong-hac', '🐓': 'dan/con-vat/ga-trong', '🐤': 'dan/con-vat/ga-con',
    '🦜': 'dan/con-vat/vet', '🐝': 'dan/con-vat/ong', '🦋': 'dan/con-vat/buom',
    '🐜': 'dan/con-vat/kien', '🐞': 'dan/con-vat/bo-rua', '🐌': 'dan/con-vat/oc-sen', '🐛': 'dan/con-vat/sau',

    /* phương tiện */
    '🚗': 'dan/xe-co/o-to', '🏍️': 'dan/xe-co/xe-may', '🚲': 'dan/xe-co/xe-dap', '✈️': 'dan/xe-co/may-bay',
    '🚂': 'dan/xe-co/tau-hoa', '⛵': 'dan/xe-co/thuyen-buom', '🚌': 'dan/xe-co/xe-buyt', '🚒': 'dan/xe-co/xe-cuu-hoa',
    '🚚': 'dan/xe-co/xe-tai', '🚑': 'dan/xe-co/xe-cuu-thuong', '🚓': 'dan/xe-co/xe-canh-sat', '🚕': 'dan/xe-co/taxi',
    '🚊': 'dan/xe-co/tau-dien', '🚁': 'dan/xe-co/truc-thang', '🚢': 'dan/xe-co/tau-thuy', '🚜': 'dan/xe-co/may-cay',

    /* trái cây và rau củ */
    '🍎': 'dan/an-uong/tao', '🍌': 'dan/an-uong/chuoi', '🍊': 'dan/an-uong/cam', '🍇': 'dan/an-uong/nho',
    '🍉': 'dan/an-uong/dua-hau', '🍓': 'dan/an-uong/dau-tay', '🍍': 'dan/an-uong/dua', '🥭': 'dan/an-uong/xoai',
    '🥕': 'dan/an-uong/ca-rot', '🌽': 'dan/an-uong/ngo', '🍅': 'dan/an-uong/ca-chua', '🥔': 'dan/an-uong/khoai-tay',
    '🥒': 'dan/an-uong/dua-chuot', '🥦': 'dan/an-uong/bong-cai', '🍄': 'dan/an-uong/nam', '🌶️': 'dan/an-uong/ot',

    /* món ăn của con vật */
    '🦴': 'dan/thuc-an-con-vat/xuong', '🐟': 'dan/thuc-an-con-vat/ca', '🍯': 'dan/thuc-an-con-vat/mat-ong',
    '🧀': 'dan/thuc-an-con-vat/pho-mai', '🌿': 'dan/thuc-an-con-vat/co', '🌾': 'dan/thuc-an-con-vat/thoc',
    '🎋': 'dan/thuc-an-con-vat/tre', '🍃': 'dan/thuc-an-con-vat/la-cay', '🪱': 'dan/thuc-an-con-vat/giun',
    '🥩': 'dan/thuc-an-con-vat/thit', '🪰': 'dan/thuc-an-con-vat/ruoi', '🌼': 'dan/thuc-an-con-vat/hoa',
    '🥬': 'dan/thuc-an-con-vat/la-rau', '🌰': 'dan/thuc-an-con-vat/hat-de',
    '🐸': 'dan/thuc-an-con-vat/ech', '🦗': 'dan/thuc-an-con-vat/chau-chau',

    /* đồ vật quen thuộc */
    '🎒': 'dan/truong-hoc/cap-sach', '📖': 'dan/truong-hoc/sach', '✏️': 'dan/truong-hoc/but-chi',
    '🥤': 'dan/do-dung/coc-nuoc', '☂️': 'dan/do-dung/cai-o', '⚽': 'dan/vui-choi/qua-bong',
    '🧸': 'dan/vui-choi/gau-bong', '🎈': 'dan/vui-choi/bong-bay', '🪑': 'dan/do-dung/cai-ghe',
    '🛏️': 'dan/do-dung/cai-giuong', '💡': 'dan/do-dung/bong-den', '🌀': 'dan/do-dung/quat-may',
    '🥣': 'dan/do-dung/bat', '🥄': 'dan/do-dung/thia', '🔑': 'dan/do-dung/chia-khoa',
    '🕐': 'dan/do-dung/dong-ho',

    /* gia đình và cơ thể */
    '👴': 'dan/nguoi/ong', '👵': 'dan/nguoi/ba', '👨': 'dan/nguoi/bo', '👩': 'dan/nguoi/me',
    '👦': 'dan/nguoi/anh-trai', '👧': 'dan/nguoi/chi-gai', '👶': 'dan/nguoi/em-be',
    '👨‍👩‍👧‍👦': 'dan/nguoi/ca-nha',
    '👁️': 'dan/nguoi/mat', '👂': 'dan/nguoi/tai', '👃': 'dan/nguoi/mui', '👄': 'dan/nguoi/mieng',
    '✋': 'dan/nguoi/ban-tay', '🦶': 'dan/nguoi/ban-chan', '💇': 'dan/nguoi/toc', '🦷': 'dan/nguoi/rang',

    /* quần áo và đồ ăn */
    '👕': 'dan/quan-ao/ao-phong', '👖': 'dan/quan-ao/quan', '👗': 'dan/quan-ao/vay',
    '🧢': 'dan/quan-ao/mu', '👟': 'dan/quan-ao/giay', '🧦': 'dan/quan-ao/tat',
    '🧣': 'dan/quan-ao/khan', '🧤': 'dan/quan-ao/gang-tay', '🍚': 'dan/an-uong/com',
    '🍜': 'dan/an-uong/pho', '🍞': 'dan/an-uong/banh-mi', '🥛': 'dan/an-uong/sua',
    '🥚': 'dan/an-uong/trung', '🧁': 'dan/an-uong/banh-ngot', '🍬': 'dan/an-uong/keo',
    '💧': 'dan/an-uong/giot-nuoc',

    /* thêm thú và sinh vật biển */
    '🐋': 'dan/con-vat/ca-voi-xanh', '🐅': 'dan/con-vat/ho', '🐆': 'dan/con-vat/bao',
    '🐻‍❄️': 'dan/con-vat/gau-bac-cuc', '🦝': 'dan/con-vat/gau-meo', '🦫': 'dan/con-vat/hai-ly',
    '🫎': 'dan/con-vat/nai-sung-tam',

    /* màu sắc, thời tiết và nơi sống */
    '🟥': 'dan/mau-hinh/mau-do', '🟨': 'dan/mau-hinh/mau-vang',
    '🟩': 'dan/mau-hinh/mau-xanh-la', '🟦': 'dan/mau-hinh/mau-xanh-duong',
    '🟪': 'dan/mau-hinh/mau-tim', '🟧': 'dan/mau-hinh/mau-cam',
    '🟫': 'dan/mau-hinh/mau-nau', '⬛': 'dan/mau-hinh/mau-den',
    '☀️': 'dan/thien-nhien/nang', '🌧️': 'dan/thien-nhien/mua', '☁️': 'dan/thien-nhien/may',
    '🌈': 'dan/thien-nhien/cau-vong', '❄️': 'dan/thien-nhien/tuyet', '💨': 'dan/thien-nhien/gio',
    '🌊': 'dan/thien-nhien/song-bien', '🌳': 'dan/thien-nhien/doi-co',

    /* ===== Đợt bổ sung: 36 tấm, phủ nốt từ vựng tiếng Anh ===== */

    /* thú nuôi */
    '🐹': 'dan/con-vat/hamster', '🪿': 'dan/con-vat/goose', '🫏': 'dan/con-vat/donkey',

    /* côn trùng */
    '🕷️': 'dan/con-vat/spider', '🦟': 'dan/con-vat/mosquito',

    /* trái cây thêm */
    '🍐': 'dan/an-uong/pear', '🍑': 'dan/an-uong/peach', '🍒': 'dan/an-uong/cherry',
    '🍋': 'dan/an-uong/lemon', '🥥': 'dan/an-uong/coconut', '🥑': 'dan/an-uong/avocado',
    '🥝': 'dan/an-uong/kiwi', '🫐': 'dan/an-uong/blueberry', '🫒': 'dan/an-uong/olive',
    '🍈': 'dan/an-uong/melon',

    /* rau củ thêm */
    '🧅': 'dan/an-uong/onion', '🧄': 'dan/an-uong/garlic', '🥜': 'dan/an-uong/peanut',
    '🫚': 'dan/an-uong/ginger', '🎃': 'dan/an-uong/pumpkin',

    /* đồ ăn thêm */
    '🥪': 'dan/an-uong/sandwich', '🍔': 'dan/an-uong/burger', '🍕': 'dan/an-uong/pizza',
    '🍟': 'dan/an-uong/chips', '🌭': 'dan/an-uong/sausage', '🍗': 'dan/an-uong/fried-chicken',
    '🍝': 'dan/an-uong/noodles', '🥞': 'dan/an-uong/pancake', '🍪': 'dan/an-uong/biscuit',
    '🍦': 'dan/an-uong/ice-cream', '🍫': 'dan/an-uong/chocolate',
    '🎂': 'dan/an-uong/birthday-cake', '🥗': 'dan/an-uong/salad', '🥟': 'dan/an-uong/bun',

    /* đồ uống */
    '🧃': 'dan/an-uong/juice', '🍵': 'dan/an-uong/tea', '☕': 'dan/an-uong/coffee',
    '🧋': 'dan/an-uong/bubble-tea', '🍼': 'dan/an-uong/bottle', '🧊': 'dan/an-uong/ice',

    /* màu sắc thêm */
    '⬜': 'dan/mau-hinh/white', '🩶': 'dan/mau-hinh/grey', '🩷': 'dan/mau-hinh/pink',
    '🩵': 'dan/mau-hinh/light-blue',

    /* cơ thể thêm */
    '👅': 'dan/nguoi/tongue', '🧠': 'dan/nguoi/brain', '🫀': 'dan/nguoi/heart-organ',
    '🫁': 'dan/nguoi/lungs', '💪': 'dan/nguoi/arm', '🦵': 'dan/nguoi/leg',
    '👆': 'dan/nguoi/finger',

    /* gia đình thêm */
    '👪': 'dan/nguoi/family', '👬': 'dan/nguoi/brothers', '👭': 'dan/nguoi/sisters',
    '👰': 'dan/nguoi/bride', '🧑‍🤝‍🧑': 'dan/nguoi/friend',
    '🛒': 'dan/nguoi/cradle',

    /* quần áo thêm */
    '🧥': 'dan/quan-ao/coat', '🧶': 'dan/quan-ao/sweater', '🩳': 'dan/quan-ao/shorts',
    '🩱': 'dan/quan-ao/swimsuit', '🩴': 'dan/quan-ao/sandals', '🥾': 'dan/quan-ao/boots',
    '👒': 'dan/quan-ao/sun-hat', '👔': 'dan/quan-ao/tie', '👓': 'dan/quan-ao/glasses',
    '💍': 'dan/quan-ao/ring', '👜': 'dan/quan-ao/handbag', '👛': 'dan/quan-ao/wallet',

    /* đồ dùng học tập */
    '🖋️': 'dan/truong-hoc/fountain-pen', '📏': 'dan/truong-hoc/ruler',
    '📐': 'dan/truong-hoc/set-square', '✂️': 'dan/truong-hoc/scissors',
    '📓': 'dan/truong-hoc/notebook', '📄': 'dan/truong-hoc/paper',
    '📁': 'dan/truong-hoc/folder', '🖼️': 'dan/truong-hoc/blackboard',
    '🖍️': 'dan/truong-hoc/crayons', '📎': 'dan/truong-hoc/paper-clip',
    '🗑️': 'dan/truong-hoc/bin',

    /* trong nhà thêm */
    '🚪': 'dan/do-dung/door', '🪟': 'dan/do-dung/window', '🪞': 'dan/do-dung/mirror',
    '🛋️': 'dan/do-dung/sofa', '🕯️': 'dan/do-dung/candle', '🧹': 'dan/do-dung/broom',
    '🧻': 'dan/do-dung/toilet-paper', '🧼': 'dan/do-dung/soap',
    '🛁': 'dan/do-dung/bathtub', '🚿': 'dan/do-dung/shower',
    '🪥': 'dan/do-dung/toothbrush', '🔒': 'dan/do-dung/lock',
    '🪜': 'dan/do-dung/stairs',

    /* nhà bếp */
    '🍲': 'dan/do-dung/pot', '🍳': 'dan/do-dung/pan', '🔪': 'dan/do-dung/knife', '🍴': 'dan/do-dung/fork',
    '🍽️': 'dan/do-dung/plate', '🧂': 'dan/do-dung/salt', '🫖': 'dan/do-dung/teapot',

    /* phương tiện thêm */
    '🚀': 'dan/xe-co/rocket', '🛴': 'dan/xe-co/scooter',
    '🛹': 'dan/xe-co/skateboard',

    /* thiên nhiên thêm */
    '🏞️': 'dan/thien-nhien/hill', '🏜️': 'dan/thien-nhien/desert',
    '🌲': 'dan/thien-nhien/forest', '🏖️': 'dan/thien-nhien/beach',
    '🌋': 'dan/thien-nhien/volcano', '🏝️': 'dan/thien-nhien/island',
    '🌵': 'dan/thien-nhien/cactus', '🌱': 'dan/thien-nhien/seed',
    '🌹': 'dan/thien-nhien/rose', '🌷': 'dan/thien-nhien/tulip',
    '🌴': 'dan/thien-nhien/palm-tree',

    /* thời tiết thêm */
    '⛈️': 'dan/thien-nhien/storm', '⚡': 'dan/thien-nhien/lightning', '🌫️': 'dan/thien-nhien/fog',
    '⛄': 'dan/thien-nhien/snowman', '🌡️': 'dan/thien-nhien/thermometer',

    /* thể thao */
    '🏀': 'dan/vui-choi/basketball', '🏐': 'dan/vui-choi/volleyball', '🏉': 'dan/vui-choi/rugby-ball',
    '🎾': 'dan/vui-choi/tennis', '🏸': 'dan/vui-choi/badminton', '🏊': 'dan/vui-choi/swimming',
    '🏃': 'dan/vui-choi/running', '🚴': 'dan/vui-choi/cycling', '🏅': 'dan/vui-choi/medal',
    '🏆': 'dan/vui-choi/trophy',

    /* nhạc cụ */
    '🎸': 'dan/vui-choi/guitar', '🎹': 'dan/vui-choi/piano', '🎻': 'dan/vui-choi/violin', '🥁': 'dan/vui-choi/drum',
    '🎺': 'dan/vui-choi/trumpet', '🪈': 'dan/vui-choi/flute', '🎤': 'dan/vui-choi/microphone',
    '🎵': 'dan/vui-choi/music-note',

    /* nghề nghiệp */
    '🧑‍⚕️': 'dan/nguoi/doctor', '🧑‍🏫': 'dan/nguoi/teacher',
    '🧑‍🌾': 'dan/nguoi/farmer', '🧑‍🍳': 'dan/nguoi/chef',
    '🧑‍🚒': 'dan/nguoi/firefighter', '🧑‍✈️': 'dan/nguoi/pilot',
    '🧑‍🚀': 'dan/nguoi/astronaut', '🧑‍🏭': 'dan/nguoi/worker',
    '🧑‍🔬': 'dan/nguoi/scientist', '🧑‍🎨': 'dan/nguoi/artist',
    '🧑‍🔧': 'dan/nguoi/mechanic', '👮': 'dan/nguoi/police-officer',

    /* nơi chốn */
    '🏠': 'dan/noi-chon/house', '🏫': 'dan/noi-chon/school', '🏥': 'dan/noi-chon/hospital',
    '🏪': 'dan/noi-chon/shop', '🏦': 'dan/noi-chon/bank', '⛪': 'dan/noi-chon/church',
    '🏕️': 'dan/noi-chon/park', '🏟️': 'dan/noi-chon/stadium', '🏭': 'dan/noi-chon/factory',
    '🏰': 'dan/noi-chon/castle', '🌉': 'dan/noi-chon/bridge', '🚏': 'dan/noi-chon/bus-stop',

    /* đồ công nghệ */
    '📱': 'dan/do-dung/phone', '💻': 'dan/do-dung/computer', '📺': 'dan/do-dung/television',
    '📷': 'dan/do-dung/camera', '🎧': 'dan/do-dung/headphones', '📻': 'dan/do-dung/radio',
    '🔋': 'dan/do-dung/battery', '🔦': 'dan/do-dung/torch',

    /* đồ chơi và lễ hội */
    '🪁': 'dan/vui-choi/kite', '🪆': 'dan/vui-choi/doll',
    '🧩': 'dan/vui-choi/puzzle', '♟️': 'dan/vui-choi/chess',
    '🎁': 'dan/vui-choi/present', '🎆': 'dan/vui-choi/fireworks',
    '🎄': 'dan/vui-choi/christmas-tree', '🎅': 'dan/vui-choi/santa',

    /* cảm xúc */
    '😀': 'dan/cam-xuc/happy', '😢': 'dan/cam-xuc/sad', '😠': 'dan/cam-xuc/angry',
    '😮': 'dan/cam-xuc/surprised', '😴': 'dan/cam-xuc/sleepy', '😱': 'dan/cam-xuc/scared',
    '🤒': 'dan/cam-xuc/sick', '😂': 'dan/cam-xuc/laughing',

    /* thời gian */
    '🌅': 'dan/thoi-gian/morning', '🌆': 'dan/thoi-gian/evening', '🌃': 'dan/thoi-gian/night',
    '📅': 'dan/thoi-gian/calendar', '⏳': 'dan/thoi-gian/hourglass', '⏰': 'dan/thoi-gian/alarm-clock',

    /* vườn và công cụ */
    '🪣': 'dan/do-dung/bucket', '🔨': 'dan/do-dung/hammer', '🪚': 'dan/do-dung/saw',
    '🪛': 'dan/do-dung/screwdriver', '🔧': 'dan/do-dung/spanner',
    '🔩': 'dan/do-dung/screw', '🧱': 'dan/do-dung/spade',
    '🫗': 'dan/do-dung/watering-can', '🪴': 'dan/do-dung/plant-pot',
    '🏖': 'dan/do-dung/parasol',

    /* tiền và mua sắm */
    '🪙': 'dan/mua-ban/coin', '💵': 'dan/mua-ban/banknote',
    '💳': 'dan/mua-ban/bank-card', '🧺': 'dan/mua-ban/basket',
    '🏷️': 'dan/mua-ban/price-tag', '🧾': 'dan/mua-ban/receipt',

    /* vũ trụ */
    '🌍': 'dan/vu-tru/the-earth', '🪐': 'dan/vu-tru/planet', '🌌': 'dan/vu-tru/galaxy',
    '☄️': 'dan/vu-tru/comet', '🛸': 'dan/vu-tru/ufo', '🛰️': 'dan/vu-tru/satellite',
    '🔭': 'dan/vu-tru/telescope', '🔬': 'dan/vu-tru/microscope',

    /* ở trường */
    '🗺️': 'dan/truong-hoc/map', '🌐': 'dan/truong-hoc/globe', '🧪': 'dan/truong-hoc/test-tube',
    '🧲': 'dan/truong-hoc/magnet', '🧮': 'dan/truong-hoc/calculator', '📜': 'dan/truong-hoc/certificate',
    '🔔': 'dan/truong-hoc/bell',

    /* hình khối */
    '⭕': 'dan/mau-hinh/circle', '🔺': 'dan/mau-hinh/triangle', '🔷': 'dan/mau-hinh/diamond',
    '🌟': 'dan/mau-hinh/star-shape', '❤️': 'dan/mau-hinh/heart'

  };

  /* Bảng tra theo TỪ, không theo emoji.

     Phần lớn từ vựng tra ảnh qua emoji, nhưng có cả một tầng từ mà không
     emoji nào tả đúng: động từ (dance, swim), tính từ (big, clean), ngày
     tháng, số đếm lớn, vị trí. Mấy từ đó giờ cũng có ảnh riêng nên tra thẳng
     bằng mặt chữ tiếng Anh.

     Đã kiểm trước khi dựng bảng: không từ nào trong này trùng tên với từ
     nào khác, nên khoá theo mặt chữ là chắc. */
  var KHO_TU = {

    /* việc hằng ngày */
    'wake up': 'dan/hanh-dong/wake-up', 'go to bed': 'dan/hanh-dong/go-to-bed',
    'wash your face': 'dan/hanh-dong/wash-your-face',
    'brush your teeth': 'dan/hanh-dong/brush-your-teeth',
    'take a shower': 'dan/hanh-dong/take-a-shower',
    'get dressed': 'dan/hanh-dong/get-dressed',
    'have breakfast': 'dan/hanh-dong/have-breakfast',
    'have lunch': 'dan/hanh-dong/have-lunch', 'have dinner': 'dan/hanh-dong/have-dinner',
    'go to school': 'dan/hanh-dong/go-to-school', 'go home': 'dan/hanh-dong/go-home',
    'do homework': 'dan/hanh-dong/do-homework', 'tidy up': 'dan/hanh-dong/tidy-up',
    'wash the dishes': 'dan/hanh-dong/wash-the-dishes', 'cook': 'dan/hanh-dong/cook',
    'sweep the floor': 'dan/hanh-dong/sweep-the-floor',
    'do the laundry': 'dan/hanh-dong/do-the-laundry',
    'go shopping': 'dan/hanh-dong/go-shopping', 'rest': 'dan/hanh-dong/rest',
    'wait': 'dan/hanh-dong/wait',

    /* động từ thường gặp */
    'go': 'dan/hanh-dong/go', 'come': 'dan/hanh-dong/come',
    'run': 'dan/hanh-dong/run', 'jump': 'dan/hanh-dong/jump',
    'walk': 'dan/hanh-dong/walk', 'sit': 'dan/hanh-dong/sit',
    'stand': 'dan/hanh-dong/stand', 'lie down': 'dan/hanh-dong/lie-down',
    'eat': 'dan/hanh-dong/eat', 'drink': 'dan/hanh-dong/drink',
    'sleep': 'dan/hanh-dong/sleep', 'speak': 'dan/hanh-dong/speak',
    'listen': 'dan/hanh-dong/listen', 'look': 'dan/hanh-dong/look',
    'watch': 'dan/hanh-dong/watch', 'read': 'dan/hanh-dong/read',
    'write': 'dan/hanh-dong/write', 'draw': 'dan/hanh-dong/draw',
    'sing': 'dan/hanh-dong/sing', 'dance': 'dan/hanh-dong/dance',
    'play': 'dan/hanh-dong/play', 'smile': 'dan/hanh-dong/smile',
    'cry': 'dan/hanh-dong/cry', 'open': 'dan/hanh-dong/open',
    'close': 'dan/hanh-dong/close', 'give': 'dan/hanh-dong/give',
    'take': 'dan/hanh-dong/take', 'buy': 'dan/hanh-dong/buy',
    'sell': 'dan/hanh-dong/sell', 'find': 'dan/hanh-dong/find',
    'help': 'dan/hanh-dong/help', 'ask': 'dan/hanh-dong/ask',
    'answer': 'dan/hanh-dong/answer', 'remember': 'dan/hanh-dong/remember',
    'forget': 'dan/hanh-dong/forget', 'know': 'dan/hanh-dong/know',
    'think': 'dan/hanh-dong/think', 'like': 'dan/hanh-dong/like',
    'love': 'dan/hanh-dong/love', 'hate': 'dan/hanh-dong/hate',
    'want': 'dan/hanh-dong/want', 'need': 'dan/hanh-dong/need',
    'start': 'dan/hanh-dong/start', 'finish': 'dan/hanh-dong/finish',
    'try': 'dan/hanh-dong/try', 'make': 'dan/hanh-dong/make',
    'bring': 'dan/hanh-dong/bring', 'fly': 'dan/hanh-dong/fly',
    'swim': 'dan/hanh-dong/swim', 'climb': 'dan/hanh-dong/climb',
    'throw': 'dan/hanh-dong/throw', 'catch': 'dan/hanh-dong/catch',
    'push': 'dan/hanh-dong/push', 'pull': 'dan/hanh-dong/pull',
    'cut': 'dan/hanh-dong/cut', 'wash': 'dan/hanh-dong/wash',
    'wipe': 'dan/hanh-dong/wipe', 'pack': 'dan/hanh-dong/pack',
    'count': 'dan/hanh-dong/count', 'share': 'dan/hanh-dong/share',

    /* tính từ thường gặp */
    'big': 'dan/tinh-tu/big', 'small': 'dan/tinh-tu/small',
    'long': 'dan/tinh-tu/long', 'short': 'dan/tinh-tu/short',
    'tall': 'dan/tinh-tu/tall', 'low': 'dan/tinh-tu/low',
    'heavy': 'dan/tinh-tu/heavy', 'light': 'dan/tinh-tu/light',
    'fast': 'dan/tinh-tu/fast', 'slow': 'dan/tinh-tu/slow',
    'hot': 'dan/tinh-tu/hot', 'cold': 'dan/tinh-tu/cold',
    'warm': 'dan/tinh-tu/warm', 'cool': 'dan/tinh-tu/cool',
    'new': 'dan/tinh-tu/new', 'old': 'dan/tinh-tu/old',
    'clean': 'dan/tinh-tu/clean', 'dirty': 'dan/tinh-tu/dirty',
    'beautiful': 'dan/tinh-tu/beautiful', 'ugly': 'dan/tinh-tu/ugly',
    'good': 'dan/tinh-tu/good', 'bad': 'dan/tinh-tu/bad',
    'easy': 'dan/tinh-tu/easy', 'difficult': 'dan/tinh-tu/difficult',
    'right': 'dan/tinh-tu/right', 'wrong': 'dan/tinh-tu/wrong',
    'full': 'dan/tinh-tu/full', 'empty': 'dan/tinh-tu/empty',
    'noisy': 'dan/tinh-tu/noisy', 'quiet': 'dan/tinh-tu/quiet',
    'strong': 'dan/tinh-tu/strong', 'weak': 'dan/tinh-tu/weak',
    'rich': 'dan/tinh-tu/rich', 'poor': 'dan/tinh-tu/poor',
    'funny': 'dan/tinh-tu/funny', 'boring': 'dan/tinh-tu/boring',
    'sweet': 'dan/tinh-tu/sweet', 'sour': 'dan/tinh-tu/sour',
    'salty': 'dan/tinh-tu/salty', 'spicy': 'dan/tinh-tu/spicy',
    'bitter': 'dan/tinh-tu/bitter', 'delicious': 'dan/tinh-tu/delicious',
    'soft': 'dan/tinh-tu/soft', 'hard': 'dan/tinh-tu/hard',
    'wet': 'dan/tinh-tu/wet', 'dry': 'dan/tinh-tu/dry',
    'bright': 'dan/tinh-tu/bright', 'dark': 'dan/tinh-tu/dark',
    'wide': 'dan/tinh-tu/wide', 'narrow': 'dan/tinh-tu/narrow',
    'deep': 'dan/tinh-tu/deep', 'shallow': 'dan/tinh-tu/shallow',
    'busy': 'dan/tinh-tu/busy', 'free': 'dan/tinh-tu/free',
    'clever': 'dan/tinh-tu/clever', 'polite': 'dan/tinh-tu/polite',
    'kind': 'dan/tinh-tu/kind', 'lazy': 'dan/tinh-tu/lazy',
    'hard-working': 'dan/tinh-tu/hard-working', 'brave': 'dan/tinh-tu/brave',

    /* ngày tháng mùa */
    'Monday': 'dan/thoi-gian/monday', 'Tuesday': 'dan/thoi-gian/tuesday',
    'Wednesday': 'dan/thoi-gian/wednesday', 'Thursday': 'dan/thoi-gian/thursday',
    'Friday': 'dan/thoi-gian/friday', 'Saturday': 'dan/thoi-gian/saturday',
    'Sunday': 'dan/thoi-gian/sunday', 'January': 'dan/thoi-gian/january',
    'February': 'dan/thoi-gian/february', 'March': 'dan/thoi-gian/march',
    'April': 'dan/thoi-gian/april', 'May': 'dan/thoi-gian/may', 'June': 'dan/thoi-gian/june',
    'July': 'dan/thoi-gian/july', 'August': 'dan/thoi-gian/august',
    'September': 'dan/thoi-gian/september', 'October': 'dan/thoi-gian/october',
    'November': 'dan/thoi-gian/november', 'December': 'dan/thoi-gian/december',
    'spring': 'dan/thoi-gian/spring', 'summer': 'dan/thoi-gian/summer',
    'autumn': 'dan/thoi-gian/autumn', 'winter': 'dan/thoi-gian/winter',
    'today': 'dan/thoi-gian/today', 'yesterday': 'dan/thoi-gian/yesterday',
    'tomorrow': 'dan/thoi-gian/tomorrow', 'week': 'dan/thoi-gian/week',
    'month': 'dan/thoi-gian/month', 'year': 'dan/thoi-gian/year',
    'hour': 'dan/thoi-gian/hour', 'minute': 'dan/thoi-gian/minute',
    'second': 'dan/thoi-gian/second',

    /* số lớn và thứ tự */
    'eleven': 'dan/so-dem/eleven', 'twelve': 'dan/so-dem/twelve',
    'thirteen': 'dan/so-dem/thirteen', 'fourteen': 'dan/so-dem/fourteen',
    'fifteen': 'dan/so-dem/fifteen', 'sixteen': 'dan/so-dem/sixteen',
    'seventeen': 'dan/so-dem/seventeen', 'eighteen': 'dan/so-dem/eighteen',
    'nineteen': 'dan/so-dem/nineteen', 'twenty': 'dan/so-dem/twenty',
    'thirty': 'dan/so-dem/thirty', 'forty': 'dan/so-dem/forty',
    'fifty': 'dan/so-dem/fifty', 'one hundred': 'dan/so-dem/one-hundred',
    'one thousand': 'dan/so-dem/one-thousand', 'first': 'dan/so-dem/first',
    'second (order)': 'dan/so-dem/second-order', 'third': 'dan/so-dem/third',
    'last': 'dan/so-dem/last', 'half': 'dan/so-dem/half',

    /* vị trí và hướng */
    'on': 'dan/vi-tri/on', 'under': 'dan/vi-tri/under', 'in': 'dan/vi-tri/in',
    'outside': 'dan/vi-tri/outside', 'next to': 'dan/vi-tri/next-to',
    'in front of': 'dan/vi-tri/in-front-of', 'behind': 'dan/vi-tri/behind',
    'between': 'dan/vi-tri/between', 'left': 'dan/vi-tri/left',
    'right (side)': 'dan/vi-tri/right-side', 'near': 'dan/vi-tri/near',
    'far': 'dan/vi-tri/far', 'up': 'dan/vi-tri/up', 'down': 'dan/vi-tri/down',
    'into': 'dan/vi-tri/into', 'out': 'dan/vi-tri/out',
    'around': 'dan/vi-tri/around', 'across': 'dan/vi-tri/across',
    'here': 'dan/vi-tri/here', 'there': 'dan/vi-tri/there',

    /* câu chào và lễ phép */
    'hello': 'dan/giao-tiep/hello', 'goodbye': 'dan/giao-tiep/goodbye',
    'good morning': 'dan/giao-tiep/good-morning',
    'good night': 'dan/giao-tiep/good-night',
    'thank you': 'dan/giao-tiep/thank-you',
    'you\'re welcome': 'dan/giao-tiep/you-re-welcome',
    'sorry': 'dan/giao-tiep/sorry', 'please': 'dan/giao-tiep/please',
    'how are you?': 'dan/giao-tiep/how-are-you',
    'I\'m fine': 'dan/giao-tiep/i-m-fine',
    'what\'s your name?': 'dan/giao-tiep/what-s-your-name',
    'my name is…': 'dan/giao-tiep/my-name-is',
    'nice to meet you': 'dan/giao-tiep/nice-to-meet-you',
    'see you': 'dan/giao-tiep/see-you', 'good luck': 'dan/giao-tiep/good-luck',
    'happy birthday': 'dan/giao-tiep/happy-birthday',
    'how old are you?': 'dan/giao-tiep/how-old-are-you',
    'I\'m … years old': 'dan/giao-tiep/i-m-years-old',
    'where do you live?': 'dan/giao-tiep/where-do-you-live',
    'I don\'t know': 'dan/giao-tiep/i-don-t-know',
    'I understand': 'dan/giao-tiep/i-understand',
    'say it again, please': 'dan/giao-tiep/say-it-again-please',
    'yes': 'dan/giao-tiep/yes', 'no': 'dan/giao-tiep/no',

    /* câu trong lớp học */
    'stand up': 'dan/truong-hoc/stand-up', 'sit down': 'dan/truong-hoc/sit-down',
    'be quiet': 'dan/truong-hoc/be-quiet', 'listen to me': 'dan/truong-hoc/listen-to-me',
    'look at the board': 'dan/truong-hoc/look-at-the-board',
    'open your book': 'dan/truong-hoc/open-your-book',
    'close your book': 'dan/truong-hoc/close-your-book',
    'put your hand up': 'dan/truong-hoc/put-your-hand-up',
    'repeat after me': 'dan/truong-hoc/repeat-after-me',
    'well done': 'dan/truong-hoc/well-done', 'try again': 'dan/truong-hoc/try-again',
    'line up': 'dan/truong-hoc/line-up',
    'work in groups': 'dan/truong-hoc/work-in-groups',
    'it\'s your turn': 'dan/truong-hoc/it-s-your-turn',
    'break time': 'dan/truong-hoc/break-time', 'home time': 'dan/truong-hoc/home-time',

    /* ngược nghĩa */
    'inside — outside': 'dan/tinh-tu/inside-outside',
    'before — after': 'dan/tinh-tu/before-after', 'early — late': 'dan/tinh-tu/early-late',
    'more — less': 'dan/tinh-tu/more-less', 'same — different': 'dan/tinh-tu/same-different',
    'begin — end': 'dan/tinh-tu/begin-end', 'remember — forget': 'dan/tinh-tu/remember-forget',
    'lose — find': 'dan/tinh-tu/lose-find', 'win — lose': 'dan/tinh-tu/win-lose',
    'safe — dangerous': 'dan/tinh-tu/safe-dangerous',

    /* môn học */
    'maths': 'dan/truong-hoc/maths', 'English': 'dan/truong-hoc/english', 'science': 'dan/truong-hoc/science',
    'history': 'dan/truong-hoc/history', 'geography': 'dan/truong-hoc/geography', 'art': 'dan/truong-hoc/art',
    'music': 'dan/truong-hoc/music', 'PE': 'dan/truong-hoc/pe', 'test': 'dan/truong-hoc/test',
    'mark': 'dan/truong-hoc/mark', 'homework': 'dan/truong-hoc/homework', 'timetable': 'dan/truong-hoc/timetable',

    /* ở nhà hàng và cửa hàng */
    'menu': 'dan/mua-ban/menu', 'order': 'dan/mua-ban/order',
    'how much is it?': 'dan/mua-ban/how-much-is-it',
    'it\'s too expensive': 'dan/mua-ban/it-s-too-expensive',
    'cheap': 'dan/mua-ban/cheap', 'can I have…': 'dan/mua-ban/can-i-have',
    'it\'s delicious': 'dan/mua-ban/it-s-delicious',
    'I\'m full': 'dan/mua-ban/i-m-full', 'pay': 'dan/mua-ban/pay',
    'change': 'dan/mua-ban/change',

    /* đi đường */
    'turn left': 'dan/noi-chon/turn-left', 'turn right': 'dan/noi-chon/turn-right',
    'go straight': 'dan/noi-chon/go-straight', 'stop': 'dan/noi-chon/stop',
    'cross the road': 'dan/noi-chon/cross-the-road', 'traffic light': 'dan/noi-chon/traffic-light',
    'pavement': 'dan/noi-chon/pavement', 'directions': 'dan/noi-chon/directions',
    'get lost': 'dan/noi-chon/get-lost', 'take a lift': 'dan/noi-chon/take-a-lift',
    'ticket': 'dan/noi-chon/ticket', 'trip': 'dan/noi-chon/trip',

    /* thiên nhiên và con vật (chữ) */
    'a flock of birds': 'dan/thien-nhien/a-flock-of-birds',
    'nest': 'dan/thien-nhien/nest', 'feather': 'dan/thien-nhien/feather',
    'tail': 'dan/thien-nhien/tail', 'wing': 'dan/thien-nhien/wing',
    'horn': 'dan/thien-nhien/horn', 'fur': 'dan/thien-nhien/fur',
    'scale': 'dan/thien-nhien/scale', 'cave': 'dan/thien-nhien/cave',
    'cage': 'dan/thien-nhien/cage',
    'pet food': 'dan/thien-nhien/pet-food', 'zoo': 'dan/thien-nhien/zoo',
    'farm': 'dan/thien-nhien/farm', 'field': 'dan/thien-nhien/field',
    'river': 'dan/thien-nhien/river', 'lake': 'dan/thien-nhien/lake',
    'sky': 'dan/thien-nhien/sky', 'ground': 'dan/thien-nhien/ground',
    'air': 'dan/thien-nhien/air', 'sand': 'dan/thien-nhien/sand',

    /* cảm xúc và tính cách (chữ) */
    'glad': 'dan/cam-xuc/glad', 'worried': 'dan/cam-xuc/worried',
    'excited': 'dan/cam-xuc/excited', 'calm': 'dan/cam-xuc/calm',
    'shy': 'dan/cam-xuc/shy', 'proud': 'dan/cam-xuc/proud',
    'disappointed': 'dan/cam-xuc/disappointed',
    'confused': 'dan/cam-xuc/confused',
    'pleased': 'dan/cam-xuc/pleased', 'amazed': 'dan/cam-xuc/amazed',
    'friendly': 'dan/cam-xuc/friendly',
    'honest': 'dan/cam-xuc/honest', 'patient': 'dan/cam-xuc/patient',
    'selfish': 'dan/cam-xuc/selfish',
    'generous': 'dan/cam-xuc/generous',
    'serious': 'dan/cam-xuc/serious',

    /* sức khoẻ */
    'headache': 'dan/suc-khoe/headache', 'stomach ache': 'dan/suc-khoe/stomach-ache',
    'toothache': 'dan/suc-khoe/toothache', 'fever': 'dan/suc-khoe/fever', 'cough': 'dan/suc-khoe/cough',
    'cold (illness)': 'dan/suc-khoe/cold-illness', 'tired': 'dan/suc-khoe/tired',
    'hungry': 'dan/suc-khoe/hungry', 'thirsty': 'dan/suc-khoe/thirsty', 'healthy': 'dan/suc-khoe/healthy',
    'medicine': 'dan/suc-khoe/medicine', 'be off sick': 'dan/suc-khoe/be-off-sick'
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

  function timTu(en) { return en ? KHO_TU[String(en)] || null : null; }
  function coTu(en) { return !!timTu(en); }

  function veTu(en, cls) {
    var d = timTu(en);
    return d ? the(d, cls) : null;
  }

  /* Dựng thẻ ảnh.

     Ảnh ở đây là WebP: cùng một con vật, bản WebP 400px còn nhẹ hơn bản PNG
     200px từng dùng, nên hình vừa to gấp đôi vừa đỡ tốn mạng.

     Trước đây có đặt onerror lùi về bản .png nằm cạnh, nhưng chỉ 192 ảnh đời
     đầu mới có bản .png đó; 571 ảnh đợt sau thì không. Đường lui chỉ đỡ được
     một phần tư kho ảnh thì máy cũ vẫn hỏng, mà lại tốn thêm một lượt gọi
     mạng hỏng cho mỗi ảnh, nên bỏ hẳn. WebP có mặt trên mọi trình duyệt từ
     năm 2020. */
  function the(duong, cls) {
    return '<img class="' + (cls || 'hinh-ve') + '" src="' + GOC + 'assets/hinh/' +
      duong + '.webp" alt="" draggable="false">';
  }

  /* Vẽ thẳng theo đường dẫn trong assets/hinh, dùng cho thứ không có
     emoji nào tả đúng. */
  function veTen(duong, cls) {
    if (!duong) return null;
    return the(duong, cls);
  }

  function ve(e, cls) {
    var d = tim(e);
    if (!d) return null;
    return the(d, cls);
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

  global.HinhVe = {
    co: co, ve: ve, veTen: veTen, doi: doi, KHO: KHO, GOC: GOC,
    coTu: coTu, veTu: veTu, timTu: timTu, KHO_TU: KHO_TU
  };
})(window);
