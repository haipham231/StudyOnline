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
    '🌊': 'mau-troi/song-bien', '🌳': 'mau-troi/doi-co',

    /* ===== Đợt bổ sung: 36 tấm, phủ nốt từ vựng tiếng Anh ===== */

    /* thú nuôi */
    '🐹': 'thu-nuoi/hamster', '🪿': 'thu-nuoi/goose', '🫏': 'thu-nuoi/donkey',

    /* côn trùng */
    '🕷️': 'con-trung/spider', '🦟': 'con-trung/mosquito',

    /* trái cây thêm */
    '🍐': 'trai-cay-them/pear', '🍑': 'trai-cay-them/peach', '🍒': 'trai-cay-them/cherry',
    '🍋': 'trai-cay-them/lemon', '🥥': 'trai-cay-them/coconut', '🥑': 'trai-cay-them/avocado',
    '🥝': 'trai-cay-them/kiwi', '🫐': 'trai-cay-them/blueberry', '🫒': 'trai-cay-them/olive',
    '🍈': 'trai-cay-them/melon',

    /* rau củ thêm */
    '🧅': 'rau-cu-them/onion', '🧄': 'rau-cu-them/garlic', '🥜': 'rau-cu-them/peanut',
    '🫚': 'rau-cu-them/ginger', '🎃': 'rau-cu-them/pumpkin',

    /* đồ ăn thêm */
    '🥪': 'do-an-them/sandwich', '🍔': 'do-an-them/burger', '🍕': 'do-an-them/pizza',
    '🍟': 'do-an-them/chips', '🌭': 'do-an-them/sausage', '🍗': 'do-an-them/fried-chicken',
    '🍝': 'do-an-them/noodles', '🥞': 'do-an-them/pancake', '🍪': 'do-an-them/biscuit',
    '🍦': 'do-an-them/ice-cream', '🍫': 'do-an-them/chocolate',
    '🎂': 'do-an-them/birthday-cake', '🥗': 'do-an-them/salad', '🥟': 'do-an-them/bun',

    /* đồ uống */
    '🧃': 'do-uong/juice', '🍵': 'do-uong/tea', '☕': 'do-uong/coffee',
    '🧋': 'do-uong/bubble-tea', '🍼': 'do-uong/bottle', '🧊': 'do-uong/ice',

    /* màu sắc thêm */
    '⬜': 'mau-sac-them/white', '🩶': 'mau-sac-them/grey', '🩷': 'mau-sac-them/pink',
    '🩵': 'mau-sac-them/light-blue',

    /* cơ thể thêm */
    '👅': 'co-the-them/tongue', '🧠': 'co-the-them/brain', '🫀': 'co-the-them/heart-organ',
    '🫁': 'co-the-them/lungs', '💪': 'co-the-them/arm', '🦵': 'co-the-them/leg',
    '👆': 'co-the-them/finger',

    /* gia đình thêm */
    '👪': 'gia-dinh-them/family', '👬': 'gia-dinh-them/brothers', '👭': 'gia-dinh-them/sisters',
    '👰': 'gia-dinh-them/bride', '🧑‍🤝‍🧑': 'gia-dinh-them/friend',
    '🛒': 'gia-dinh-them/cradle',

    /* quần áo thêm */
    '🧥': 'quan-ao-them/coat', '🧶': 'quan-ao-them/sweater', '🩳': 'quan-ao-them/shorts',
    '🩱': 'quan-ao-them/swimsuit', '🩴': 'quan-ao-them/sandals', '🥾': 'quan-ao-them/boots',
    '👒': 'quan-ao-them/sun-hat', '👔': 'quan-ao-them/tie', '👓': 'quan-ao-them/glasses',
    '💍': 'quan-ao-them/ring', '👜': 'quan-ao-them/handbag', '👛': 'quan-ao-them/wallet',

    /* đồ dùng học tập */
    '🖋️': 'do-dung-hoc-tap/fountain-pen', '📏': 'do-dung-hoc-tap/ruler',
    '📐': 'do-dung-hoc-tap/set-square', '✂️': 'do-dung-hoc-tap/scissors',
    '📓': 'do-dung-hoc-tap/notebook', '📄': 'do-dung-hoc-tap/paper',
    '📁': 'do-dung-hoc-tap/folder', '🖼️': 'do-dung-hoc-tap/blackboard',
    '🖍️': 'do-dung-hoc-tap/crayons', '📎': 'do-dung-hoc-tap/paper-clip',
    '🗑️': 'do-dung-hoc-tap/bin',

    /* trong nhà thêm */
    '🚪': 'trong-nha-them/door', '🪟': 'trong-nha-them/window', '🪞': 'trong-nha-them/mirror',
    '🛋️': 'trong-nha-them/sofa', '🕯️': 'trong-nha-them/candle', '🧹': 'trong-nha-them/broom',
    '🧻': 'trong-nha-them/toilet-paper', '🧼': 'trong-nha-them/soap',
    '🛁': 'trong-nha-them/bathtub', '🚿': 'trong-nha-them/shower',
    '🪥': 'trong-nha-them/toothbrush', '🔒': 'trong-nha-them/lock',
    '🪜': 'trong-nha-them/stairs',

    /* nhà bếp */
    '🍲': 'nha-bep/pot', '🍳': 'nha-bep/pan', '🔪': 'nha-bep/knife', '🍴': 'nha-bep/fork',
    '🍽️': 'nha-bep/plate', '🧂': 'nha-bep/salt', '🫖': 'nha-bep/teapot',

    /* phương tiện thêm */
    '🚀': 'phuong-tien-them/rocket', '🛴': 'phuong-tien-them/scooter',
    '🛹': 'phuong-tien-them/skateboard',

    /* thiên nhiên thêm */
    '🏞️': 'thien-nhien-them/hill', '🏜️': 'thien-nhien-them/desert',
    '🌲': 'thien-nhien-them/forest', '🏖️': 'thien-nhien-them/beach',
    '🌋': 'thien-nhien-them/volcano', '🏝️': 'thien-nhien-them/island',
    '🌵': 'thien-nhien-them/cactus', '🌱': 'thien-nhien-them/seed',
    '🌹': 'thien-nhien-them/rose', '🌷': 'thien-nhien-them/tulip',
    '🌴': 'thien-nhien-them/palm-tree',

    /* thời tiết thêm */
    '⛈️': 'thoi-tiet-them/storm', '⚡': 'thoi-tiet-them/lightning', '🌫️': 'thoi-tiet-them/fog',
    '⛄': 'thoi-tiet-them/snowman', '🌡️': 'thoi-tiet-them/thermometer',

    /* thể thao */
    '🏀': 'the-thao/basketball', '🏐': 'the-thao/volleyball', '🏉': 'the-thao/rugby-ball',
    '🎾': 'the-thao/tennis', '🏸': 'the-thao/badminton', '🏊': 'the-thao/swimming',
    '🏃': 'the-thao/running', '🚴': 'the-thao/cycling', '🏅': 'the-thao/medal',
    '🏆': 'the-thao/trophy',

    /* nhạc cụ */
    '🎸': 'nhac-cu/guitar', '🎹': 'nhac-cu/piano', '🎻': 'nhac-cu/violin', '🥁': 'nhac-cu/drum',
    '🎺': 'nhac-cu/trumpet', '🪈': 'nhac-cu/flute', '🎤': 'nhac-cu/microphone',
    '🎵': 'nhac-cu/music-note',

    /* nghề nghiệp */
    '🧑‍⚕️': 'nghe-nghiep/doctor', '🧑‍🏫': 'nghe-nghiep/teacher',
    '🧑‍🌾': 'nghe-nghiep/farmer', '🧑‍🍳': 'nghe-nghiep/chef',
    '🧑‍🚒': 'nghe-nghiep/firefighter', '🧑‍✈️': 'nghe-nghiep/pilot',
    '🧑‍🚀': 'nghe-nghiep/astronaut', '🧑‍🏭': 'nghe-nghiep/worker',
    '🧑‍🔬': 'nghe-nghiep/scientist', '🧑‍🎨': 'nghe-nghiep/artist',
    '🧑‍🔧': 'nghe-nghiep/mechanic', '👮': 'nghe-nghiep/police-officer',

    /* nơi chốn */
    '🏠': 'noi-chon/house', '🏫': 'noi-chon/school', '🏥': 'noi-chon/hospital',
    '🏪': 'noi-chon/shop', '🏦': 'noi-chon/bank', '⛪': 'noi-chon/church',
    '🏕️': 'noi-chon/park', '🏟️': 'noi-chon/stadium', '🏭': 'noi-chon/factory',
    '🏰': 'noi-chon/castle', '🌉': 'noi-chon/bridge', '🚏': 'noi-chon/bus-stop',

    /* đồ công nghệ */
    '📱': 'do-cong-nghe/phone', '💻': 'do-cong-nghe/computer', '📺': 'do-cong-nghe/television',
    '📷': 'do-cong-nghe/camera', '🎧': 'do-cong-nghe/headphones', '📻': 'do-cong-nghe/radio',
    '🔋': 'do-cong-nghe/battery', '🔦': 'do-cong-nghe/torch',

    /* đồ chơi và lễ hội */
    '🪁': 'do-choi-va-le-hoi/kite', '🪆': 'do-choi-va-le-hoi/doll',
    '🧩': 'do-choi-va-le-hoi/puzzle', '♟️': 'do-choi-va-le-hoi/chess',
    '🎁': 'do-choi-va-le-hoi/present', '🎆': 'do-choi-va-le-hoi/fireworks',
    '🎄': 'do-choi-va-le-hoi/christmas-tree', '🎅': 'do-choi-va-le-hoi/santa',

    /* cảm xúc */
    '😀': 'cam-xuc/happy', '😢': 'cam-xuc/sad', '😠': 'cam-xuc/angry',
    '😮': 'cam-xuc/surprised', '😴': 'cam-xuc/sleepy', '😱': 'cam-xuc/scared',
    '🤒': 'cam-xuc/sick', '😂': 'cam-xuc/laughing',

    /* thời gian */
    '🌅': 'thoi-gian/morning', '🌆': 'thoi-gian/evening', '🌃': 'thoi-gian/night',
    '📅': 'thoi-gian/calendar', '⏳': 'thoi-gian/hourglass', '⏰': 'thoi-gian/alarm-clock',

    /* vườn và công cụ */
    '🪣': 'vuon-va-cong-cu/bucket', '🔨': 'vuon-va-cong-cu/hammer', '🪚': 'vuon-va-cong-cu/saw',
    '🪛': 'vuon-va-cong-cu/screwdriver', '🔧': 'vuon-va-cong-cu/spanner',
    '🔩': 'vuon-va-cong-cu/screw', '🧱': 'vuon-va-cong-cu/spade',
    '🫗': 'vuon-va-cong-cu/watering-can', '🪴': 'vuon-va-cong-cu/plant-pot',
    '🏖': 'vuon-va-cong-cu/parasol',

    /* tiền và mua sắm */
    '🪙': 'tien-va-mua-sam/coin', '💵': 'tien-va-mua-sam/banknote',
    '💳': 'tien-va-mua-sam/bank-card', '🧺': 'tien-va-mua-sam/basket',
    '🏷️': 'tien-va-mua-sam/price-tag', '🧾': 'tien-va-mua-sam/receipt',

    /* vũ trụ */
    '🌍': 'vu-tru/the-earth', '🪐': 'vu-tru/planet', '🌌': 'vu-tru/galaxy',
    '☄️': 'vu-tru/comet', '🛸': 'vu-tru/ufo', '🛰️': 'vu-tru/satellite',
    '🔭': 'vu-tru/telescope', '🔬': 'vu-tru/microscope',

    /* ở trường */
    '🗺️': 'o-truong/map', '🌐': 'o-truong/globe', '🧪': 'o-truong/test-tube',
    '🧲': 'o-truong/magnet', '🧮': 'o-truong/calculator', '📜': 'o-truong/certificate',
    '🔔': 'o-truong/bell',

    /* hình khối */
    '⭕': 'hinh-khoi/circle', '🔺': 'hinh-khoi/triangle', '🔷': 'hinh-khoi/diamond',
    '🌟': 'hinh-khoi/star-shape', '❤️': 'hinh-khoi/heart'

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
    'wake up': 'viec-hang-ngay/wake-up', 'go to bed': 'viec-hang-ngay/go-to-bed',
    'wash your face': 'viec-hang-ngay/wash-your-face',
    'brush your teeth': 'viec-hang-ngay/brush-your-teeth',
    'take a shower': 'viec-hang-ngay/take-a-shower',
    'get dressed': 'viec-hang-ngay/get-dressed',
    'have breakfast': 'viec-hang-ngay/have-breakfast',
    'have lunch': 'viec-hang-ngay/have-lunch', 'have dinner': 'viec-hang-ngay/have-dinner',
    'go to school': 'viec-hang-ngay/go-to-school', 'go home': 'viec-hang-ngay/go-home',
    'do homework': 'viec-hang-ngay/do-homework', 'tidy up': 'viec-hang-ngay/tidy-up',
    'wash the dishes': 'viec-hang-ngay/wash-the-dishes', 'cook': 'viec-hang-ngay/cook',
    'sweep the floor': 'viec-hang-ngay/sweep-the-floor',
    'do the laundry': 'viec-hang-ngay/do-the-laundry',
    'go shopping': 'viec-hang-ngay/go-shopping', 'rest': 'viec-hang-ngay/rest',
    'wait': 'viec-hang-ngay/wait',

    /* động từ thường gặp */
    'go': 'dong-tu-thuong-gap/go', 'come': 'dong-tu-thuong-gap/come',
    'run': 'dong-tu-thuong-gap/run', 'jump': 'dong-tu-thuong-gap/jump',
    'walk': 'dong-tu-thuong-gap/walk', 'sit': 'dong-tu-thuong-gap/sit',
    'stand': 'dong-tu-thuong-gap/stand', 'lie down': 'dong-tu-thuong-gap/lie-down',
    'eat': 'dong-tu-thuong-gap/eat', 'drink': 'dong-tu-thuong-gap/drink',
    'sleep': 'dong-tu-thuong-gap/sleep', 'speak': 'dong-tu-thuong-gap/speak',
    'listen': 'dong-tu-thuong-gap/listen', 'look': 'dong-tu-thuong-gap/look',
    'watch': 'dong-tu-thuong-gap/watch', 'read': 'dong-tu-thuong-gap/read',
    'write': 'dong-tu-thuong-gap/write', 'draw': 'dong-tu-thuong-gap/draw',
    'sing': 'dong-tu-thuong-gap/sing', 'dance': 'dong-tu-thuong-gap/dance',
    'play': 'dong-tu-thuong-gap/play', 'smile': 'dong-tu-thuong-gap/smile',
    'cry': 'dong-tu-thuong-gap/cry', 'open': 'dong-tu-thuong-gap/open',
    'close': 'dong-tu-thuong-gap/close', 'give': 'dong-tu-thuong-gap/give',
    'take': 'dong-tu-thuong-gap/take', 'buy': 'dong-tu-thuong-gap/buy',
    'sell': 'dong-tu-thuong-gap/sell', 'find': 'dong-tu-thuong-gap/find',
    'help': 'dong-tu-thuong-gap/help', 'ask': 'dong-tu-thuong-gap/ask',
    'answer': 'dong-tu-thuong-gap/answer', 'remember': 'dong-tu-thuong-gap/remember',
    'forget': 'dong-tu-thuong-gap/forget', 'know': 'dong-tu-thuong-gap/know',
    'think': 'dong-tu-thuong-gap/think', 'like': 'dong-tu-thuong-gap/like',
    'love': 'dong-tu-thuong-gap/love', 'hate': 'dong-tu-thuong-gap/hate',
    'want': 'dong-tu-thuong-gap/want', 'need': 'dong-tu-thuong-gap/need',
    'start': 'dong-tu-thuong-gap/start', 'finish': 'dong-tu-thuong-gap/finish',
    'try': 'dong-tu-thuong-gap/try', 'make': 'dong-tu-thuong-gap/make',
    'bring': 'dong-tu-thuong-gap/bring', 'fly': 'dong-tu-thuong-gap/fly',
    'swim': 'dong-tu-thuong-gap/swim', 'climb': 'dong-tu-thuong-gap/climb',
    'throw': 'dong-tu-thuong-gap/throw', 'catch': 'dong-tu-thuong-gap/catch',
    'push': 'dong-tu-thuong-gap/push', 'pull': 'dong-tu-thuong-gap/pull',
    'cut': 'dong-tu-thuong-gap/cut', 'wash': 'dong-tu-thuong-gap/wash',
    'wipe': 'dong-tu-thuong-gap/wipe', 'pack': 'dong-tu-thuong-gap/pack',
    'count': 'dong-tu-thuong-gap/count', 'share': 'dong-tu-thuong-gap/share',

    /* tính từ thường gặp */
    'big': 'tinh-tu-thuong-gap/big', 'small': 'tinh-tu-thuong-gap/small',
    'long': 'tinh-tu-thuong-gap/long', 'short': 'tinh-tu-thuong-gap/short',
    'tall': 'tinh-tu-thuong-gap/tall', 'low': 'tinh-tu-thuong-gap/low',
    'heavy': 'tinh-tu-thuong-gap/heavy', 'light': 'tinh-tu-thuong-gap/light',
    'fast': 'tinh-tu-thuong-gap/fast', 'slow': 'tinh-tu-thuong-gap/slow',
    'hot': 'tinh-tu-thuong-gap/hot', 'cold': 'tinh-tu-thuong-gap/cold',
    'warm': 'tinh-tu-thuong-gap/warm', 'cool': 'tinh-tu-thuong-gap/cool',
    'new': 'tinh-tu-thuong-gap/new', 'old': 'tinh-tu-thuong-gap/old',
    'clean': 'tinh-tu-thuong-gap/clean', 'dirty': 'tinh-tu-thuong-gap/dirty',
    'beautiful': 'tinh-tu-thuong-gap/beautiful', 'ugly': 'tinh-tu-thuong-gap/ugly',
    'good': 'tinh-tu-thuong-gap/good', 'bad': 'tinh-tu-thuong-gap/bad',
    'easy': 'tinh-tu-thuong-gap/easy', 'difficult': 'tinh-tu-thuong-gap/difficult',
    'right': 'tinh-tu-thuong-gap/right', 'wrong': 'tinh-tu-thuong-gap/wrong',
    'full': 'tinh-tu-thuong-gap/full', 'empty': 'tinh-tu-thuong-gap/empty',
    'noisy': 'tinh-tu-thuong-gap/noisy', 'quiet': 'tinh-tu-thuong-gap/quiet',
    'strong': 'tinh-tu-thuong-gap/strong', 'weak': 'tinh-tu-thuong-gap/weak',
    'rich': 'tinh-tu-thuong-gap/rich', 'poor': 'tinh-tu-thuong-gap/poor',
    'funny': 'tinh-tu-thuong-gap/funny', 'boring': 'tinh-tu-thuong-gap/boring',
    'sweet': 'tinh-tu-thuong-gap/sweet', 'sour': 'tinh-tu-thuong-gap/sour',
    'salty': 'tinh-tu-thuong-gap/salty', 'spicy': 'tinh-tu-thuong-gap/spicy',
    'bitter': 'tinh-tu-thuong-gap/bitter', 'delicious': 'tinh-tu-thuong-gap/delicious',
    'soft': 'tinh-tu-thuong-gap/soft', 'hard': 'tinh-tu-thuong-gap/hard',
    'wet': 'tinh-tu-thuong-gap/wet', 'dry': 'tinh-tu-thuong-gap/dry',
    'bright': 'tinh-tu-thuong-gap/bright', 'dark': 'tinh-tu-thuong-gap/dark',
    'wide': 'tinh-tu-thuong-gap/wide', 'narrow': 'tinh-tu-thuong-gap/narrow',
    'deep': 'tinh-tu-thuong-gap/deep', 'shallow': 'tinh-tu-thuong-gap/shallow',
    'busy': 'tinh-tu-thuong-gap/busy', 'free': 'tinh-tu-thuong-gap/free',
    'clever': 'tinh-tu-thuong-gap/clever', 'polite': 'tinh-tu-thuong-gap/polite',
    'kind': 'tinh-tu-thuong-gap/kind', 'lazy': 'tinh-tu-thuong-gap/lazy',
    'hard-working': 'tinh-tu-thuong-gap/hard-working', 'brave': 'tinh-tu-thuong-gap/brave',

    /* ngày tháng mùa */
    'Monday': 'ngay-thang-mua/monday', 'Tuesday': 'ngay-thang-mua/tuesday',
    'Wednesday': 'ngay-thang-mua/wednesday', 'Thursday': 'ngay-thang-mua/thursday',
    'Friday': 'ngay-thang-mua/friday', 'Saturday': 'ngay-thang-mua/saturday',
    'Sunday': 'ngay-thang-mua/sunday', 'January': 'ngay-thang-mua/january',
    'February': 'ngay-thang-mua/february', 'March': 'ngay-thang-mua/march',
    'April': 'ngay-thang-mua/april', 'May': 'ngay-thang-mua/may', 'June': 'ngay-thang-mua/june',
    'July': 'ngay-thang-mua/july', 'August': 'ngay-thang-mua/august',
    'September': 'ngay-thang-mua/september', 'October': 'ngay-thang-mua/october',
    'November': 'ngay-thang-mua/november', 'December': 'ngay-thang-mua/december',
    'spring': 'ngay-thang-mua/spring', 'summer': 'ngay-thang-mua/summer',
    'autumn': 'ngay-thang-mua/autumn', 'winter': 'ngay-thang-mua/winter',
    'today': 'ngay-thang-mua/today', 'yesterday': 'ngay-thang-mua/yesterday',
    'tomorrow': 'ngay-thang-mua/tomorrow', 'week': 'ngay-thang-mua/week',
    'month': 'ngay-thang-mua/month', 'year': 'ngay-thang-mua/year',
    'hour': 'ngay-thang-mua/hour', 'minute': 'ngay-thang-mua/minute',
    'second': 'ngay-thang-mua/second',

    /* số lớn và thứ tự */
    'eleven': 'so-lon-va-thu-tu/eleven', 'twelve': 'so-lon-va-thu-tu/twelve',
    'thirteen': 'so-lon-va-thu-tu/thirteen', 'fourteen': 'so-lon-va-thu-tu/fourteen',
    'fifteen': 'so-lon-va-thu-tu/fifteen', 'sixteen': 'so-lon-va-thu-tu/sixteen',
    'seventeen': 'so-lon-va-thu-tu/seventeen', 'eighteen': 'so-lon-va-thu-tu/eighteen',
    'nineteen': 'so-lon-va-thu-tu/nineteen', 'twenty': 'so-lon-va-thu-tu/twenty',
    'thirty': 'so-lon-va-thu-tu/thirty', 'forty': 'so-lon-va-thu-tu/forty',
    'fifty': 'so-lon-va-thu-tu/fifty', 'one hundred': 'so-lon-va-thu-tu/one-hundred',
    'one thousand': 'so-lon-va-thu-tu/one-thousand', 'first': 'so-lon-va-thu-tu/first',
    'second (order)': 'so-lon-va-thu-tu/second-order', 'third': 'so-lon-va-thu-tu/third',
    'last': 'so-lon-va-thu-tu/last', 'half': 'so-lon-va-thu-tu/half',

    /* vị trí và hướng */
    'on': 'vi-tri-va-huong/on', 'under': 'vi-tri-va-huong/under', 'in': 'vi-tri-va-huong/in',
    'outside': 'vi-tri-va-huong/outside', 'next to': 'vi-tri-va-huong/next-to',
    'in front of': 'vi-tri-va-huong/in-front-of', 'behind': 'vi-tri-va-huong/behind',
    'between': 'vi-tri-va-huong/between', 'left': 'vi-tri-va-huong/left',
    'right (side)': 'vi-tri-va-huong/right-side', 'near': 'vi-tri-va-huong/near',
    'far': 'vi-tri-va-huong/far', 'up': 'vi-tri-va-huong/up', 'down': 'vi-tri-va-huong/down',
    'into': 'vi-tri-va-huong/into', 'out': 'vi-tri-va-huong/out',
    'around': 'vi-tri-va-huong/around', 'across': 'vi-tri-va-huong/across',
    'here': 'vi-tri-va-huong/here', 'there': 'vi-tri-va-huong/there',

    /* câu chào và lễ phép */
    'hello': 'cau-chao-va-le-phep/hello', 'goodbye': 'cau-chao-va-le-phep/goodbye',
    'good morning': 'cau-chao-va-le-phep/good-morning',
    'good night': 'cau-chao-va-le-phep/good-night',
    'thank you': 'cau-chao-va-le-phep/thank-you',
    'you\'re welcome': 'cau-chao-va-le-phep/you-re-welcome',
    'sorry': 'cau-chao-va-le-phep/sorry', 'please': 'cau-chao-va-le-phep/please',
    'how are you?': 'cau-chao-va-le-phep/how-are-you',
    'I\'m fine': 'cau-chao-va-le-phep/i-m-fine',
    'what\'s your name?': 'cau-chao-va-le-phep/what-s-your-name',
    'my name is…': 'cau-chao-va-le-phep/my-name-is',
    'nice to meet you': 'cau-chao-va-le-phep/nice-to-meet-you',
    'see you': 'cau-chao-va-le-phep/see-you', 'good luck': 'cau-chao-va-le-phep/good-luck',
    'happy birthday': 'cau-chao-va-le-phep/happy-birthday',
    'how old are you?': 'cau-chao-va-le-phep/how-old-are-you',
    'I\'m … years old': 'cau-chao-va-le-phep/i-m-years-old',
    'where do you live?': 'cau-chao-va-le-phep/where-do-you-live',
    'I don\'t know': 'cau-chao-va-le-phep/i-don-t-know',
    'I understand': 'cau-chao-va-le-phep/i-understand',
    'say it again, please': 'cau-chao-va-le-phep/say-it-again-please',
    'yes': 'cau-chao-va-le-phep/yes', 'no': 'cau-chao-va-le-phep/no',

    /* câu trong lớp học */
    'stand up': 'cau-trong-lop-hoc/stand-up', 'sit down': 'cau-trong-lop-hoc/sit-down',
    'be quiet': 'cau-trong-lop-hoc/be-quiet', 'listen to me': 'cau-trong-lop-hoc/listen-to-me',
    'look at the board': 'cau-trong-lop-hoc/look-at-the-board',
    'open your book': 'cau-trong-lop-hoc/open-your-book',
    'close your book': 'cau-trong-lop-hoc/close-your-book',
    'put your hand up': 'cau-trong-lop-hoc/put-your-hand-up',
    'repeat after me': 'cau-trong-lop-hoc/repeat-after-me',
    'well done': 'cau-trong-lop-hoc/well-done', 'try again': 'cau-trong-lop-hoc/try-again',
    'line up': 'cau-trong-lop-hoc/line-up',
    'work in groups': 'cau-trong-lop-hoc/work-in-groups',
    'it\'s your turn': 'cau-trong-lop-hoc/it-s-your-turn',
    'break time': 'cau-trong-lop-hoc/break-time', 'home time': 'cau-trong-lop-hoc/home-time',

    /* ngược nghĩa */
    'inside — outside': 'nguoc-nghia/inside-outside',
    'before — after': 'nguoc-nghia/before-after', 'early — late': 'nguoc-nghia/early-late',
    'more — less': 'nguoc-nghia/more-less', 'same — different': 'nguoc-nghia/same-different',
    'begin — end': 'nguoc-nghia/begin-end', 'remember — forget': 'nguoc-nghia/remember-forget',
    'lose — find': 'nguoc-nghia/lose-find', 'win — lose': 'nguoc-nghia/win-lose',
    'safe — dangerous': 'nguoc-nghia/safe-dangerous',

    /* môn học */
    'maths': 'mon-hoc/maths', 'English': 'mon-hoc/english', 'science': 'mon-hoc/science',
    'history': 'mon-hoc/history', 'geography': 'mon-hoc/geography', 'art': 'mon-hoc/art',
    'music': 'mon-hoc/music', 'PE': 'mon-hoc/pe', 'test': 'mon-hoc/test',
    'mark': 'mon-hoc/mark', 'homework': 'mon-hoc/homework', 'timetable': 'mon-hoc/timetable',

    /* ở nhà hàng và cửa hàng */
    'menu': 'o-nha-hang-va-cua-hang/menu', 'order': 'o-nha-hang-va-cua-hang/order',
    'how much is it?': 'o-nha-hang-va-cua-hang/how-much-is-it',
    'it\'s too expensive': 'o-nha-hang-va-cua-hang/it-s-too-expensive',
    'cheap': 'o-nha-hang-va-cua-hang/cheap', 'can I have…': 'o-nha-hang-va-cua-hang/can-i-have',
    'it\'s delicious': 'o-nha-hang-va-cua-hang/it-s-delicious',
    'I\'m full': 'o-nha-hang-va-cua-hang/i-m-full', 'pay': 'o-nha-hang-va-cua-hang/pay',
    'change': 'o-nha-hang-va-cua-hang/change',

    /* đi đường */
    'turn left': 'di-duong/turn-left', 'turn right': 'di-duong/turn-right',
    'go straight': 'di-duong/go-straight', 'stop': 'di-duong/stop',
    'cross the road': 'di-duong/cross-the-road', 'traffic light': 'di-duong/traffic-light',
    'pavement': 'di-duong/pavement', 'directions': 'di-duong/directions',
    'get lost': 'di-duong/get-lost', 'take a lift': 'di-duong/take-a-lift',
    'ticket': 'di-duong/ticket', 'trip': 'di-duong/trip',

    /* thiên nhiên và con vật (chữ) */
    'a flock of birds': 'thien-nhien-va-con-vat-chu/a-flock-of-birds',
    'nest': 'thien-nhien-va-con-vat-chu/nest', 'feather': 'thien-nhien-va-con-vat-chu/feather',
    'tail': 'thien-nhien-va-con-vat-chu/tail', 'wing': 'thien-nhien-va-con-vat-chu/wing',
    'horn': 'thien-nhien-va-con-vat-chu/horn', 'fur': 'thien-nhien-va-con-vat-chu/fur',
    'scale': 'thien-nhien-va-con-vat-chu/scale', 'cave': 'thien-nhien-va-con-vat-chu/cave',
    'cage': 'thien-nhien-va-con-vat-chu/cage',
    'pet food': 'thien-nhien-va-con-vat-chu/pet-food', 'zoo': 'thien-nhien-va-con-vat-chu/zoo',
    'farm': 'thien-nhien-va-con-vat-chu/farm', 'field': 'thien-nhien-va-con-vat-chu/field',
    'river': 'thien-nhien-va-con-vat-chu/river', 'lake': 'thien-nhien-va-con-vat-chu/lake',
    'sky': 'thien-nhien-va-con-vat-chu/sky', 'ground': 'thien-nhien-va-con-vat-chu/ground',
    'air': 'thien-nhien-va-con-vat-chu/air', 'sand': 'thien-nhien-va-con-vat-chu/sand',

    /* cảm xúc và tính cách (chữ) */
    'glad': 'cam-xuc-va-tinh-cach-chu/glad', 'worried': 'cam-xuc-va-tinh-cach-chu/worried',
    'excited': 'cam-xuc-va-tinh-cach-chu/excited', 'calm': 'cam-xuc-va-tinh-cach-chu/calm',
    'shy': 'cam-xuc-va-tinh-cach-chu/shy', 'proud': 'cam-xuc-va-tinh-cach-chu/proud',
    'disappointed': 'cam-xuc-va-tinh-cach-chu/disappointed',
    'confused': 'cam-xuc-va-tinh-cach-chu/confused',
    'pleased': 'cam-xuc-va-tinh-cach-chu/pleased', 'amazed': 'cam-xuc-va-tinh-cach-chu/amazed',
    'friendly': 'cam-xuc-va-tinh-cach-chu/friendly',
    'honest': 'cam-xuc-va-tinh-cach-chu/honest', 'patient': 'cam-xuc-va-tinh-cach-chu/patient',
    'selfish': 'cam-xuc-va-tinh-cach-chu/selfish',
    'generous': 'cam-xuc-va-tinh-cach-chu/generous',
    'serious': 'cam-xuc-va-tinh-cach-chu/serious',

    /* sức khoẻ */
    'headache': 'suc-khoe/headache', 'stomach ache': 'suc-khoe/stomach-ache',
    'toothache': 'suc-khoe/toothache', 'fever': 'suc-khoe/fever', 'cough': 'suc-khoe/cough',
    'cold (illness)': 'suc-khoe/cold-illness', 'tired': 'suc-khoe/tired',
    'hungry': 'suc-khoe/hungry', 'thirsty': 'suc-khoe/thirsty', 'healthy': 'suc-khoe/healthy',
    'medicine': 'suc-khoe/medicine', 'be off sick': 'suc-khoe/be-off-sick'
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
    return '<img class="' + (cls || 'hinh-ve') + '" src="' + GOC + 'assets/sinh-vat/' +
      duong + '.webp" alt="" draggable="false">';
  }

  /* Vẽ thẳng theo đường dẫn trong assets/sinh-vat, dùng cho thứ không có
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
