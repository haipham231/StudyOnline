/* ===== Kho từ vựng tiếng Anh cho bé =====
   Hai tầng:
   CO_HINH  — mỗi từ một emoji riêng, dùng cho thẻ từ và câu nhìn hình / nghe chọn hình.
   CHU      — từ không có emoji nào tả đúng (động từ, tính từ, trạng từ, mẫu câu).
              Chỉ dùng cho câu chữ: "từ này nghĩa là gì" và thẻ từ kiểu chữ.
   Quy tắc: một emoji chỉ được ứng với một từ trên toàn site, kể cả các từ đã
   có sẵn trong TiengVietMN.CHU_DE — xem check-ta.js.
*/
(function (global) {
  'use strict';

  var CO_HINH = {
    'thú nuôi': [
      { vi: 'con chó con', en: 'puppy', e: '🐕' }, { vi: 'con mèo con', en: 'kitten', e: '🐈' },
      { vi: 'con chuột lang', en: 'hamster', e: '🐹' }, { vi: 'con chuột', en: 'mouse', e: '🐭' },
      { vi: 'con vẹt', en: 'parrot', e: '🦜' }, { vi: 'con rùa', en: 'turtle', e: '🐢' },
      { vi: 'con dê', en: 'goat', e: '🐐' }, { vi: 'con cừu', en: 'sheep', e: '🐑' },
      { vi: 'con lợn', en: 'pig', e: '🐷' }, { vi: 'con vịt', en: 'duck', e: '🦆' },
      { vi: 'con ngỗng', en: 'goose', e: '🪿' }, { vi: 'con lừa', en: 'donkey', e: '🫏' }
    ],
    'thú rừng': [
      { vi: 'con sói', en: 'wolf', e: '🐺' },
      { vi: 'con cáo', en: 'fox', e: '🦊' }, { vi: 'con nai', en: 'deer', e: '🦌' },
      { vi: 'con gấu trúc', en: 'panda', e: '🐼' }, { vi: 'con ngựa vằn', en: 'zebra', e: '🦓' },
      { vi: 'con tê giác', en: 'rhino', e: '🦏' }, { vi: 'con hà mã', en: 'hippo', e: '🦛' },
      { vi: 'con lạc đà', en: 'camel', e: '🐫' }, { vi: 'con kangaroo', en: 'kangaroo', e: '🦘' },
      { vi: 'con lười', en: 'sloth', e: '🦥' }, { vi: 'con nhím', en: 'hedgehog', e: '🦔' },
      { vi: 'con dơi', en: 'bat', e: '🦇' }, { vi: 'con khỉ đột', en: 'gorilla', e: '🦍' },
      { vi: 'con rắn', en: 'snake', e: '🐍' }, { vi: 'con thằn lằn', en: 'lizard', e: '🦎' }
    ],
    'chim chóc': [
      { vi: 'con đại bàng', en: 'eagle', e: '🦅' }, { vi: 'con cú', en: 'owl', e: '🦉' },
      { vi: 'con công', en: 'peacock', e: '🦚' }, { vi: 'con thiên nga', en: 'swan', e: '🦢' },
      { vi: 'con chim cánh cụt', en: 'penguin', e: '🐧' }, { vi: 'con hồng hạc', en: 'flamingo', e: '🦩' },
      { vi: 'con gà trống', en: 'rooster', e: '🐓' }, { vi: 'con gà con', en: 'chick', e: '🐤' }
    ],
    'côn trùng': [
      { vi: 'con ong', en: 'bee', e: '🐝' }, { vi: 'con bướm', en: 'butterfly', e: '🦋' },
      { vi: 'con kiến', en: 'ant', e: '🐜' }, { vi: 'con nhện', en: 'spider', e: '🕷️' },
      { vi: 'con bọ rùa', en: 'ladybug', e: '🐞' }, { vi: 'con châu chấu', en: 'cricket', e: '🦗' },
      { vi: 'con muỗi', en: 'mosquito', e: '🦟' }, { vi: 'con sâu', en: 'worm', e: '🐛' },
      { vi: 'con ốc sên', en: 'snail', e: '🐌' }, { vi: 'con ruồi', en: 'housefly', e: '🪰' }
    ],
    'dưới biển': [
      { vi: 'con cá heo', en: 'dolphin', e: '🐬' }, { vi: 'con cá voi', en: 'whale', e: '🐳' },
      { vi: 'con cá mập', en: 'shark', e: '🦈' }, { vi: 'con bạch tuộc', en: 'octopus', e: '🐙' },
      { vi: 'con mực', en: 'squid', e: '🦑' }, { vi: 'con cua', en: 'crab', e: '🦀' },
      { vi: 'con tôm hùm', en: 'lobster', e: '🦞' }, { vi: 'con tôm', en: 'shrimp', e: '🦐' },
      { vi: 'con sứa', en: 'jellyfish', e: '🪼' }, { vi: 'con hải cẩu', en: 'seal', e: '🦭' },
      { vi: 'con sò', en: 'shell', e: '🐚' }, { vi: 'con san hô', en: 'coral', e: '🪸' },
      { vi: 'con cá nhiệt đới', en: 'tropical fish', e: '🐠' }, { vi: 'con cá sấu', en: 'crocodile', e: '🐊' }
    ],
    'trái cây thêm': [
      { vi: 'quả lê', en: 'pear', e: '🍐' }, { vi: 'quả đào', en: 'peach', e: '🍑' },
      { vi: 'quả anh đào', en: 'cherry', e: '🍒' }, { vi: 'quả chanh', en: 'lemon', e: '🍋' },
      { vi: 'quả dừa', en: 'coconut', e: '🥥' }, { vi: 'quả bơ', en: 'avocado', e: '🥑' },
      { vi: 'quả kiwi', en: 'kiwi', e: '🥝' }, { vi: 'quả việt quất', en: 'blueberry', e: '🫐' },
      { vi: 'quả ô liu', en: 'olive', e: '🫒' }, { vi: 'quả dưa gang', en: 'melon', e: '🍈' }
    ],
    'rau củ thêm': [
      { vi: 'cây rau diếp', en: 'lettuce', e: '🥬' },
      { vi: 'củ hành', en: 'onion', e: '🧅' }, { vi: 'củ tỏi', en: 'garlic', e: '🧄' },
      { vi: 'hạt đậu phộng', en: 'peanut', e: '🥜' },
      { vi: 'củ gừng', en: 'ginger', e: '🫚' }, { vi: 'quả bí ngô', en: 'pumpkin', e: '🎃' }
    ],
    'đồ ăn thêm': [
      { vi: 'cái bánh mì kẹp', en: 'sandwich', e: '🥪' }, { vi: 'cái bánh hamburger', en: 'burger', e: '🍔' },
      { vi: 'miếng pizza', en: 'pizza', e: '🍕' }, { vi: 'khoai tây chiên', en: 'chips', e: '🍟' },
      { vi: 'cái xúc xích', en: 'sausage', e: '🌭' }, { vi: 'miếng pho mát', en: 'cheese', e: '🧀' },
      { vi: 'miếng thịt', en: 'meat', e: '🥩' }, { vi: 'con gà rán', en: 'fried chicken', e: '🍗' },
      { vi: 'bát mì', en: 'noodles', e: '🍝' }, { vi: 'cái bánh kếp', en: 'pancake', e: '🥞' },
      { vi: 'cái bánh quy', en: 'biscuit', e: '🍪' }, { vi: 'cây kem', en: 'ice cream', e: '🍦' },
      { vi: 'thanh sô cô la', en: 'chocolate', e: '🍫' }, { vi: 'cái bánh sinh nhật', en: 'birthday cake', e: '🎂' },
      { vi: 'bát salad', en: 'salad', e: '🥗' }, { vi: 'cái bánh bao', en: 'bun', e: '🥟' }
    ],
    'đồ uống': [
      { vi: 'cốc nước cam', en: 'juice', e: '🧃' }, { vi: 'cốc trà', en: 'tea', e: '🍵' },
      { vi: 'cốc cà phê', en: 'coffee', e: '☕' }, { vi: 'cốc trà sữa', en: 'bubble tea', e: '🧋' }, { vi: 'chai nước', en: 'bottle', e: '🍼' }, { vi: 'cục đá', en: 'ice', e: '🧊' }
    ],
    'màu sắc thêm': [
      { vi: 'màu trắng', en: 'white', e: '⬜' }, { vi: 'màu xám', en: 'grey', e: '🩶' },
      { vi: 'màu hồng', en: 'pink', e: '🩷' }, { vi: 'màu xanh nhạt', en: 'light blue', e: '🩵' }
    ],
    'cơ thể thêm': [
      { vi: 'cái lưỡi', en: 'tongue', e: '👅' }, { vi: 'bộ não', en: 'brain', e: '🧠' },
      { vi: 'trái tim', en: 'heart (organ)', e: '🫀' }, { vi: 'lá phổi', en: 'lungs', e: '🫁' },
      { vi: 'khúc xương', en: 'bone', e: '🦴' }, { vi: 'cánh tay', en: 'arm', e: '💪' },
      { vi: 'cái chân', en: 'leg', e: '🦵' }, { vi: 'ngón tay', en: 'finger', e: '👆' }
    ],
    'gia đình thêm': [
      { vi: 'cả nhà', en: 'family', e: '👪' }, { vi: 'hai anh em', en: 'brothers', e: '👬' },
      { vi: 'hai chị em', en: 'sisters', e: '👭' }, { vi: 'cô dâu', en: 'bride', e: '👰' },
      { vi: 'bạn thân', en: 'friend', e: '🧑‍🤝‍🧑' }, { vi: 'cái nôi', en: 'cradle', e: '🛒' }
    ],
    'quần áo thêm': [
      { vi: 'cái áo khoác', en: 'coat', e: '🧥' }, { vi: 'cái áo len', en: 'sweater', e: '🧶' },
      { vi: 'cái quần đùi', en: 'shorts', e: '🩳' }, { vi: 'cái áo tắm', en: 'swimsuit', e: '🩱' },
      { vi: 'đôi dép', en: 'sandals', e: '🩴' }, { vi: 'đôi bốt', en: 'boots', e: '🥾' },
      { vi: 'cái mũ rộng vành', en: 'sun hat', e: '👒' }, { vi: 'cái cà vạt', en: 'tie', e: '👔' },
      { vi: 'cái kính', en: 'glasses', e: '👓' }, { vi: 'cái nhẫn', en: 'ring', e: '💍' },
      { vi: 'cái túi xách', en: 'handbag', e: '👜' }, { vi: 'cái ví', en: 'wallet', e: '👛' }
    ],
    'đồ dùng học tập': [
      { vi: 'cây bút mực', en: 'fountain pen', e: '🖋️' },
      { vi: 'cái thước kẻ', en: 'ruler', e: '📏' }, { vi: 'cái ê ke', en: 'set square', e: '📐' },
      { vi: 'cái kéo', en: 'scissors', e: '✂️' }, { vi: 'quyển vở', en: 'notebook', e: '📓' },
      { vi: 'tập giấy', en: 'paper', e: '📄' }, { vi: 'cái cặp tài liệu', en: 'folder', e: '📁' },
      { vi: 'cái bảng đen', en: 'blackboard', e: '🖼️' }, { vi: 'hộp bút màu', en: 'crayons', e: '🖍️' },
      { vi: 'cái ghim giấy', en: 'paper clip', e: '📎' }, { vi: 'cái thùng rác', en: 'bin', e: '🗑️' }
    ],
    'trong nhà thêm': [
      { vi: 'cái cửa', en: 'door', e: '🚪' }, { vi: 'cái cửa sổ', en: 'window', e: '🪟' },
      { vi: 'cái gương', en: 'mirror', e: '🪞' }, { vi: 'cái ghế sofa', en: 'sofa', e: '🛋️' },
      { vi: 'cái nến', en: 'candle', e: '🕯️' }, { vi: 'cái chổi', en: 'broom', e: '🧹' },
      { vi: 'cuộn giấy vệ sinh', en: 'toilet paper', e: '🧻' }, { vi: 'cục xà phòng', en: 'soap', e: '🧼' },
      { vi: 'cái bồn tắm', en: 'bathtub', e: '🛁' }, { vi: 'cái vòi sen', en: 'shower', e: '🚿' },
      { vi: 'bàn chải đánh răng', en: 'toothbrush', e: '🪥' }, { vi: 'cái ổ khoá', en: 'lock', e: '🔒' }, { vi: 'cái cầu thang', en: 'stairs', e: '🪜' }
    ],
    'nhà bếp': [
      { vi: 'cái nồi', en: 'pot', e: '🍲' }, { vi: 'cái chảo', en: 'pan', e: '🍳' },
      { vi: 'cái dao', en: 'knife', e: '🔪' }, { vi: 'cái nĩa', en: 'fork', e: '🍴' },
      { vi: 'cái đĩa', en: 'plate', e: '🍽️' }, { vi: 'hạt muối', en: 'salt', e: '🧂' },
      { vi: 'lọ mật ong', en: 'honey', e: '🍯' }, { vi: 'cái bình trà', en: 'teapot', e: '🫖' }
    ],
    'phương tiện thêm': [
      { vi: 'xe tải', en: 'truck', e: '🚚' }, { vi: 'xe cứu thương', en: 'ambulance', e: '🚑' },
      { vi: 'xe cảnh sát', en: 'police car', e: '🚓' }, { vi: 'xe taxi', en: 'taxi', e: '🚕' },
      { vi: 'tàu điện', en: 'tram', e: '🚊' }, { vi: 'trực thăng', en: 'helicopter', e: '🚁' },
      { vi: 'tên lửa', en: 'rocket', e: '🚀' }, { vi: 'con tàu thuỷ', en: 'ship', e: '🚢' },
      { vi: 'xe máy cày', en: 'tractor', e: '🚜' }, { vi: 'xe trượt scooter', en: 'scooter', e: '🛴' },
      { vi: 'ván trượt', en: 'skateboard', e: '🛹' }
    ],
    'thiên nhiên thêm': [
      { vi: 'ngọn đồi', en: 'hill', e: '🏞️' }, { vi: 'sa mạc', en: 'desert', e: '🏜️' },
      { vi: 'khu rừng', en: 'forest', e: '🌲' }, { vi: 'bãi biển', en: 'beach', e: '🏖️' },
      { vi: 'núi lửa', en: 'volcano', e: '🌋' }, { vi: 'hòn đảo', en: 'island', e: '🏝️' },
      { vi: 'cây xương rồng', en: 'cactus', e: '🌵' }, { vi: 'bụi cỏ', en: 'grass', e: '🌿' },
      { vi: 'hạt giống', en: 'seed', e: '🌱' }, { vi: 'bông hoa hồng', en: 'rose', e: '🌹' },
      { vi: 'bông hoa tulip', en: 'tulip', e: '🌷' }, { vi: 'cây dừa', en: 'palm tree', e: '🌴' }
    ],
    'thời tiết thêm': [
      { vi: 'cơn bão', en: 'storm', e: '⛈️' }, { vi: 'tia sét', en: 'lightning', e: '⚡' },
      { vi: 'sương mù', en: 'fog', e: '🌫️' }, { vi: 'người tuyết', en: 'snowman', e: '⛄' },
      { vi: 'cái nhiệt kế', en: 'thermometer', e: '🌡️' }
    ],
    'thể thao': [
      { vi: 'bóng rổ', en: 'basketball', e: '🏀' }, { vi: 'bóng chuyền', en: 'volleyball', e: '🏐' },
      { vi: 'bóng bầu dục', en: 'rugby ball', e: '🏉' }, { vi: 'quả bóng tennis', en: 'tennis', e: '🎾' },
      { vi: 'quả cầu lông', en: 'badminton', e: '🏸' }, { vi: 'bơi lội', en: 'swimming', e: '🏊' },
      { vi: 'chạy bộ', en: 'running', e: '🏃' }, { vi: 'đạp xe', en: 'cycling', e: '🚴' },
      { vi: 'cái huy chương', en: 'medal', e: '🏅' }, { vi: 'cái cúp', en: 'trophy', e: '🏆' }
    ],
    'nhạc cụ': [
      { vi: 'cây đàn ghi ta', en: 'guitar', e: '🎸' }, { vi: 'cây đàn piano', en: 'piano', e: '🎹' },
      { vi: 'cây đàn vi ô lông', en: 'violin', e: '🎻' }, { vi: 'cái trống', en: 'drum', e: '🥁' },
      { vi: 'cây kèn', en: 'trumpet', e: '🎺' }, { vi: 'cây sáo', en: 'flute', e: '🪈' },
      { vi: 'cái micro', en: 'microphone', e: '🎤' }, { vi: 'nốt nhạc', en: 'music note', e: '🎵' }
    ],
    'nghề nghiệp': [
      { vi: 'bác sĩ', en: 'doctor', e: '🧑‍⚕️' }, { vi: 'thầy cô giáo', en: 'teacher', e: '🧑‍🏫' },
      { vi: 'bác nông dân', en: 'farmer', e: '🧑‍🌾' }, { vi: 'chú đầu bếp', en: 'chef', e: '🧑‍🍳' },
      { vi: 'chú lính cứu hoả', en: 'firefighter', e: '🧑‍🚒' }, { vi: 'chú phi công', en: 'pilot', e: '🧑‍✈️' },
      { vi: 'nhà du hành vũ trụ', en: 'astronaut', e: '🧑‍🚀' }, { vi: 'chú công nhân', en: 'worker', e: '🧑‍🏭' },
      { vi: 'nhà khoa học', en: 'scientist', e: '🧑‍🔬' }, { vi: 'hoạ sĩ', en: 'artist', e: '🧑‍🎨' },
      { vi: 'thợ máy', en: 'mechanic', e: '🧑‍🔧' }, { vi: 'chú cảnh sát', en: 'police officer', e: '👮' }
    ],
    'nơi chốn': [
      { vi: 'ngôi nhà', en: 'house', e: '🏠' }, { vi: 'trường học', en: 'school', e: '🏫' },
      { vi: 'bệnh viện', en: 'hospital', e: '🏥' }, { vi: 'cửa hàng', en: 'shop', e: '🏪' },
      { vi: 'ngân hàng', en: 'bank', e: '🏦' }, { vi: 'nhà thờ', en: 'church', e: '⛪' },
      { vi: 'công viên', en: 'park', e: '🏕️' }, { vi: 'sân vận động', en: 'stadium', e: '🏟️' },
      { vi: 'nhà máy', en: 'factory', e: '🏭' }, { vi: 'lâu đài', en: 'castle', e: '🏰' },
      { vi: 'cây cầu', en: 'bridge', e: '🌉' }, { vi: 'bến xe buýt', en: 'bus stop', e: '🚏' }
    ],
    'đồ công nghệ': [
      { vi: 'cái điện thoại', en: 'phone', e: '📱' }, { vi: 'cái máy tính', en: 'computer', e: '💻' },
      { vi: 'cái ti vi', en: 'television', e: '📺' }, { vi: 'cái máy ảnh', en: 'camera', e: '📷' },
      { vi: 'cái tai nghe', en: 'headphones', e: '🎧' }, { vi: 'cái radio', en: 'radio', e: '📻' },
      { vi: 'cục pin', en: 'battery', e: '🔋' }, { vi: 'cái đèn pin', en: 'torch', e: '🔦' }
    ],
    'đồ chơi và lễ hội': [
      { vi: 'con diều', en: 'kite', e: '🪁' }, { vi: 'con búp bê', en: 'doll', e: '🪆' },
      { vi: 'bộ xếp hình', en: 'puzzle', e: '🧩' }, { vi: 'quân cờ', en: 'chess', e: '♟️' },
      { vi: 'hộp quà', en: 'present', e: '🎁' }, { vi: 'pháo hoa', en: 'fireworks', e: '🎆' },
      { vi: 'cây thông Noel', en: 'Christmas tree', e: '🎄' }, { vi: 'ông già Noel', en: 'Santa', e: '🎅' }
    ],
    'cảm xúc': [
      { vi: 'vui vẻ', en: 'happy', e: '😀' }, { vi: 'buồn bã', en: 'sad', e: '😢' },
      { vi: 'tức giận', en: 'angry', e: '😠' }, { vi: 'ngạc nhiên', en: 'surprised', e: '😮' },
      { vi: 'buồn ngủ', en: 'sleepy', e: '😴' }, { vi: 'sợ hãi', en: 'scared', e: '😱' },
      { vi: 'bị ốm', en: 'sick', e: '🤒' }, { vi: 'cười lớn', en: 'laughing', e: '😂' }
    ],
    'thời gian': [
      { vi: 'buổi sáng', en: 'morning', e: '🌅' }, { vi: 'buổi tối', en: 'evening', e: '🌆' },
      { vi: 'ban đêm', en: 'night', e: '🌃' }, { vi: 'quyển lịch', en: 'calendar', e: '📅' },
      { vi: 'đồng hồ cát', en: 'hourglass', e: '⏳' }, { vi: 'đồng hồ báo thức', en: 'alarm clock', e: '⏰' }
    ],
    'vườn và công cụ': [
      { vi: 'cái xô', en: 'bucket', e: '🪣' }, { vi: 'cái búa', en: 'hammer', e: '🔨' },
      { vi: 'cái cưa', en: 'saw', e: '🪚' }, { vi: 'cái tua vít', en: 'screwdriver', e: '🪛' },
      { vi: 'cái cờ lê', en: 'spanner', e: '🔧' }, { vi: 'cái đinh ốc', en: 'screw', e: '🔩' },
      { vi: 'cái xẻng', en: 'spade', e: '🧱' }, { vi: 'cái bình tưới', en: 'watering can', e: '🫗' },
      { vi: 'cái chậu cây', en: 'plant pot', e: '🪴' }, { vi: 'cái ô dù', en: 'parasol', e: '🏖' }
    ],
    'tiền và mua sắm': [
      { vi: 'đồng tiền xu', en: 'coin', e: '🪙' }, { vi: 'tờ tiền', en: 'banknote', e: '💵' },
      { vi: 'cái thẻ ngân hàng', en: 'bank card', e: '💳' }, { vi: 'cái giỏ mua hàng', en: 'basket', e: '🧺' },
      { vi: 'cái nhãn giá', en: 'price tag', e: '🏷️' }, { vi: 'cái hoá đơn', en: 'receipt', e: '🧾' }
    ],
    'vũ trụ': [
      { vi: 'trái đất', en: 'the Earth', e: '🌍' }, { vi: 'hành tinh', en: 'planet', e: '🪐' },
      { vi: 'thiên hà', en: 'galaxy', e: '🌌' }, { vi: 'sao chổi', en: 'comet', e: '☄️' },
      { vi: 'đĩa bay', en: 'UFO', e: '🛸' }, { vi: 'vệ tinh', en: 'satellite', e: '🛰️' },
      { vi: 'kính thiên văn', en: 'telescope', e: '🔭' }, { vi: 'kính hiển vi', en: 'microscope', e: '🔬' }
    ],
    'ở trường': [
      { vi: 'tấm bản đồ', en: 'map', e: '🗺️' }, { vi: 'quả địa cầu', en: 'globe', e: '🌐' },
      { vi: 'cái cặp nhiệt', en: 'test tube', e: '🧪' }, { vi: 'cái nam châm', en: 'magnet', e: '🧲' },
      { vi: 'cái máy tính bỏ túi', en: 'calculator', e: '🧮' }, { vi: 'tấm bằng khen', en: 'certificate', e: '📜' },
      { vi: 'cái chuông', en: 'bell', e: '🔔' }
    ],
    'hình khối': [
      { vi: 'hình tròn', en: 'circle', e: '⭕' }, { vi: 'hình tam giác', en: 'triangle', e: '🔺' }, { vi: 'hình thoi', en: 'diamond', e: '🔷' },
      { vi: 'ngôi sao năm cánh', en: 'star shape', e: '🌟' }, { vi: 'hình trái tim', en: 'heart', e: '❤️' }
    ]
  };


  // Từ không có emoji nào tả đúng. Thẻ từ hiện chữ to thay cho hình, và chỉ
  // sinh ra kiểu câu chữ ("từ này nghĩa là gì") chứ không sinh câu nhìn hình.
  var CHU = {
    'việc hằng ngày': [
      { vi: 'thức dậy', en: 'wake up' }, { vi: 'đi ngủ', en: 'go to bed' },
      { vi: 'rửa mặt', en: 'wash your face' }, { vi: 'đánh răng', en: 'brush your teeth' },
      { vi: 'tắm', en: 'take a shower' }, { vi: 'mặc quần áo', en: 'get dressed' },
      { vi: 'ăn sáng', en: 'have breakfast' }, { vi: 'ăn trưa', en: 'have lunch' },
      { vi: 'ăn tối', en: 'have dinner' }, { vi: 'đi học', en: 'go to school' },
      { vi: 'về nhà', en: 'go home' }, { vi: 'làm bài tập', en: 'do homework' },
      { vi: 'dọn phòng', en: 'tidy up' }, { vi: 'rửa bát', en: 'wash the dishes' },
      { vi: 'nấu ăn', en: 'cook' }, { vi: 'quét nhà', en: 'sweep the floor' },
      { vi: 'giặt quần áo', en: 'do the laundry' }, { vi: 'đi chợ', en: 'go shopping' },
      { vi: 'nghỉ ngơi', en: 'rest' }, { vi: 'chờ đợi', en: 'wait' }
    ],
    'động từ thường gặp': [
      { vi: 'đi', en: 'go' }, { vi: 'đến', en: 'come' }, { vi: 'chạy', en: 'run' },
      { vi: 'nhảy', en: 'jump' }, { vi: 'đi bộ', en: 'walk' }, { vi: 'ngồi', en: 'sit' },
      { vi: 'đứng', en: 'stand' }, { vi: 'nằm', en: 'lie down' }, { vi: 'ăn', en: 'eat' },
      { vi: 'uống', en: 'drink' }, { vi: 'ngủ', en: 'sleep' }, { vi: 'nói', en: 'speak' },
      { vi: 'nghe', en: 'listen' }, { vi: 'nhìn', en: 'look' }, { vi: 'xem', en: 'watch' },
      { vi: 'đọc', en: 'read' }, { vi: 'viết', en: 'write' }, { vi: 'vẽ', en: 'draw' },
      { vi: 'hát', en: 'sing' }, { vi: 'múa', en: 'dance' }, { vi: 'chơi', en: 'play' },
      { vi: 'cười', en: 'smile' }, { vi: 'khóc', en: 'cry' }, { vi: 'mở', en: 'open' },
      { vi: 'đóng', en: 'close' }, { vi: 'cho', en: 'give' }, { vi: 'lấy', en: 'take' },
      { vi: 'mua', en: 'buy' }, { vi: 'bán', en: 'sell' }, { vi: 'tìm', en: 'find' },
      { vi: 'giúp', en: 'help' }, { vi: 'hỏi', en: 'ask' }, { vi: 'trả lời', en: 'answer' },
      { vi: 'nhớ', en: 'remember' }, { vi: 'quên', en: 'forget' }, { vi: 'biết', en: 'know' },
      { vi: 'nghĩ', en: 'think' }, { vi: 'thích', en: 'like' }, { vi: 'yêu', en: 'love' },
      { vi: 'ghét', en: 'hate' }, { vi: 'muốn', en: 'want' }, { vi: 'cần', en: 'need' },
      { vi: 'bắt đầu', en: 'start' }, { vi: 'kết thúc', en: 'finish' }, { vi: 'cố gắng', en: 'try' },
      { vi: 'làm', en: 'make' }, { vi: 'mang', en: 'bring' }, { vi: 'bay', en: 'fly' },
      { vi: 'bơi', en: 'swim' }, { vi: 'leo trèo', en: 'climb' }, { vi: 'ném', en: 'throw' },
      { vi: 'bắt', en: 'catch' }, { vi: 'đẩy', en: 'push' }, { vi: 'kéo', en: 'pull' },
      { vi: 'cắt', en: 'cut' }, { vi: 'rửa', en: 'wash' }, { vi: 'lau', en: 'wipe' },
      { vi: 'đóng gói', en: 'pack' }, { vi: 'đếm', en: 'count' }, { vi: 'chia sẻ', en: 'share' }
    ],
    'tính từ thường gặp': [
      { vi: 'to', en: 'big' }, { vi: 'nhỏ', en: 'small' }, { vi: 'dài', en: 'long' },
      { vi: 'ngắn', en: 'short' }, { vi: 'cao', en: 'tall' }, { vi: 'thấp', en: 'low' },
      { vi: 'nặng', en: 'heavy' }, { vi: 'nhẹ', en: 'light' }, { vi: 'nhanh', en: 'fast' },
      { vi: 'chậm', en: 'slow' }, { vi: 'nóng', en: 'hot' }, { vi: 'lạnh', en: 'cold' },
      { vi: 'ấm', en: 'warm' }, { vi: 'mát', en: 'cool' }, { vi: 'mới', en: 'new' },
      { vi: 'cũ', en: 'old' }, { vi: 'sạch', en: 'clean' }, { vi: 'bẩn', en: 'dirty' },
      { vi: 'đẹp', en: 'beautiful' }, { vi: 'xấu', en: 'ugly' }, { vi: 'tốt', en: 'good' },
      { vi: 'dở', en: 'bad' }, { vi: 'dễ', en: 'easy' }, { vi: 'khó', en: 'difficult' },
      { vi: 'đúng', en: 'right' }, { vi: 'sai', en: 'wrong' }, { vi: 'đầy', en: 'full' },
      { vi: 'rỗng', en: 'empty' }, { vi: 'ồn ào', en: 'noisy' }, { vi: 'yên tĩnh', en: 'quiet' },
      { vi: 'mạnh', en: 'strong' }, { vi: 'yếu', en: 'weak' }, { vi: 'giàu', en: 'rich' },
      { vi: 'nghèo', en: 'poor' }, { vi: 'vui', en: 'funny' }, { vi: 'chán', en: 'boring' },
      { vi: 'ngọt', en: 'sweet' }, { vi: 'chua', en: 'sour' }, { vi: 'mặn', en: 'salty' },
      { vi: 'cay', en: 'spicy' }, { vi: 'đắng', en: 'bitter' }, { vi: 'ngon', en: 'delicious' },
      { vi: 'mềm', en: 'soft' }, { vi: 'cứng', en: 'hard' }, { vi: 'ướt', en: 'wet' },
      { vi: 'khô', en: 'dry' }, { vi: 'sáng', en: 'bright' }, { vi: 'tối', en: 'dark' },
      { vi: 'rộng', en: 'wide' }, { vi: 'hẹp', en: 'narrow' }, { vi: 'sâu', en: 'deep' },
      { vi: 'nông', en: 'shallow' }, { vi: 'bận', en: 'busy' }, { vi: 'rảnh', en: 'free' },
      { vi: 'thông minh', en: 'clever' }, { vi: 'lịch sự', en: 'polite' },
      { vi: 'tử tế', en: 'kind' }, { vi: 'lười', en: 'lazy' },
      { vi: 'chăm chỉ', en: 'hard-working' }, { vi: 'dũng cảm', en: 'brave' }
    ],
    'ngày tháng mùa': [
      { vi: 'thứ hai', en: 'Monday' }, { vi: 'thứ ba', en: 'Tuesday' },
      { vi: 'thứ tư', en: 'Wednesday' }, { vi: 'thứ năm', en: 'Thursday' },
      { vi: 'thứ sáu', en: 'Friday' }, { vi: 'thứ bảy', en: 'Saturday' },
      { vi: 'chủ nhật', en: 'Sunday' }, { vi: 'tháng một', en: 'January' },
      { vi: 'tháng hai', en: 'February' }, { vi: 'tháng ba', en: 'March' },
      { vi: 'tháng tư', en: 'April' }, { vi: 'tháng năm', en: 'May' },
      { vi: 'tháng sáu', en: 'June' }, { vi: 'tháng bảy', en: 'July' },
      { vi: 'tháng tám', en: 'August' }, { vi: 'tháng chín', en: 'September' },
      { vi: 'tháng mười', en: 'October' }, { vi: 'tháng mười một', en: 'November' },
      { vi: 'tháng mười hai', en: 'December' }, { vi: 'mùa xuân', en: 'spring' },
      { vi: 'mùa hè', en: 'summer' }, { vi: 'mùa thu', en: 'autumn' },
      { vi: 'mùa đông', en: 'winter' }, { vi: 'hôm nay', en: 'today' },
      { vi: 'hôm qua', en: 'yesterday' }, { vi: 'ngày mai', en: 'tomorrow' },
      { vi: 'tuần', en: 'week' }, { vi: 'tháng', en: 'month' }, { vi: 'năm', en: 'year' },
      { vi: 'giờ', en: 'hour' }, { vi: 'phút', en: 'minute' }, { vi: 'giây', en: 'second' }
    ],
    'số lớn và thứ tự': [
      { vi: 'mười một', en: 'eleven' }, { vi: 'mười hai', en: 'twelve' },
      { vi: 'mười ba', en: 'thirteen' }, { vi: 'mười bốn', en: 'fourteen' },
      { vi: 'mười lăm', en: 'fifteen' }, { vi: 'mười sáu', en: 'sixteen' },
      { vi: 'mười bảy', en: 'seventeen' }, { vi: 'mười tám', en: 'eighteen' },
      { vi: 'mười chín', en: 'nineteen' }, { vi: 'hai mươi', en: 'twenty' },
      { vi: 'ba mươi', en: 'thirty' }, { vi: 'bốn mươi', en: 'forty' },
      { vi: 'năm mươi', en: 'fifty' }, { vi: 'một trăm', en: 'one hundred' },
      { vi: 'một nghìn', en: 'one thousand' }, { vi: 'thứ nhất', en: 'first' },
      { vi: 'thứ hai (thứ tự)', en: 'second (order)' }, { vi: 'thứ ba (thứ tự)', en: 'third' },
      { vi: 'cuối cùng', en: 'last' }, { vi: 'một nửa', en: 'half' }
    ],
    'vị trí và hướng': [
      { vi: 'ở trên', en: 'on' }, { vi: 'ở dưới', en: 'under' }, { vi: 'ở trong', en: 'in' },
      { vi: 'ở ngoài', en: 'outside' }, { vi: 'bên cạnh', en: 'next to' },
      { vi: 'phía trước', en: 'in front of' }, { vi: 'phía sau', en: 'behind' },
      { vi: 'ở giữa', en: 'between' }, { vi: 'bên trái', en: 'left' },
      { vi: 'bên phải', en: 'right (side)' }, { vi: 'gần', en: 'near' }, { vi: 'xa', en: 'far' },
      { vi: 'lên', en: 'up' }, { vi: 'xuống', en: 'down' }, { vi: 'vào', en: 'into' },
      { vi: 'ra', en: 'out' }, { vi: 'quanh', en: 'around' }, { vi: 'qua', en: 'across' },
      { vi: 'ở đây', en: 'here' }, { vi: 'ở kia', en: 'there' }
    ],
    'câu hỏi và đại từ': [
      { vi: 'ai', en: 'who' }, { vi: 'cái gì', en: 'what' }, { vi: 'ở đâu', en: 'where' },
      { vi: 'khi nào', en: 'when' }, { vi: 'tại sao', en: 'why' }, { vi: 'như thế nào', en: 'how' },
      { vi: 'bao nhiêu', en: 'how many' }, { vi: 'cái nào', en: 'which' },
      { vi: 'tôi', en: 'I' }, { vi: 'bạn', en: 'you' }, { vi: 'anh ấy', en: 'he' },
      { vi: 'chị ấy', en: 'she' }, { vi: 'nó', en: 'it' }, { vi: 'chúng tôi', en: 'we' },
      { vi: 'họ', en: 'they' }, { vi: 'của tôi', en: 'my' }, { vi: 'của bạn', en: 'your' },
      { vi: 'này', en: 'this' }, { vi: 'kia', en: 'that' }, { vi: 'tất cả', en: 'all' },
      { vi: 'một ít', en: 'some' }, { vi: 'nhiều', en: 'many' }, { vi: 'không có gì', en: 'nothing' },
      { vi: 'mọi người', en: 'everyone' }
    ],
    'câu chào và lễ phép': [
      { vi: 'xin chào', en: 'hello' }, { vi: 'tạm biệt', en: 'goodbye' },
      { vi: 'chào buổi sáng', en: 'good morning' }, { vi: 'chúc ngủ ngon', en: 'good night' },
      { vi: 'cảm ơn', en: 'thank you' }, { vi: 'không có gì đâu', en: "you're welcome" },
      { vi: 'xin lỗi', en: 'sorry' }, { vi: 'làm ơn', en: 'please' },
      { vi: 'bạn khoẻ không?', en: 'how are you?' }, { vi: 'tôi khoẻ', en: "I'm fine" },
      { vi: 'tên bạn là gì?', en: "what's your name?" }, { vi: 'tôi tên là…', en: 'my name is…' },
      { vi: 'rất vui được gặp bạn', en: 'nice to meet you' }, { vi: 'hẹn gặp lại', en: 'see you' },
      { vi: 'chúc may mắn', en: 'good luck' }, { vi: 'chúc mừng sinh nhật', en: 'happy birthday' },
      { vi: 'bạn bao nhiêu tuổi?', en: 'how old are you?' }, { vi: 'tôi … tuổi', en: "I'm … years old" },
      { vi: 'bạn sống ở đâu?', en: 'where do you live?' }, { vi: 'tôi không biết', en: "I don't know" },
      { vi: 'tôi hiểu rồi', en: 'I understand' }, { vi: 'xin nhắc lại', en: 'say it again, please' },
      { vi: 'có', en: 'yes' }, { vi: 'không', en: 'no' }
    ],
    'câu trong lớp học': [
      { vi: 'đứng lên', en: 'stand up' }, { vi: 'ngồi xuống', en: 'sit down' },
      { vi: 'im lặng nào', en: 'be quiet' }, { vi: 'nghe cô nói', en: 'listen to me' },
      { vi: 'nhìn lên bảng', en: 'look at the board' }, { vi: 'mở sách ra', en: 'open your book' },
      { vi: 'gấp sách lại', en: 'close your book' }, { vi: 'giơ tay lên', en: 'put your hand up' },
      { vi: 'nhắc lại nào', en: 'repeat after me' }, { vi: 'làm tốt lắm', en: 'well done' },
      { vi: 'thử lại nhé', en: 'try again' }, { vi: 'xếp hàng', en: 'line up' },
      { vi: 'làm theo nhóm', en: 'work in groups' }, { vi: 'đến lượt bạn', en: "it's your turn" },
      { vi: 'giờ ra chơi', en: 'break time' }, { vi: 'tan học', en: 'home time' }
    ],
    'ngược nghĩa': [
      { vi: 'bên trong — bên ngoài', en: 'inside — outside' },
      { vi: 'trước — sau', en: 'before — after' },
      { vi: 'sớm — muộn', en: 'early — late' },
      { vi: 'nhiều — ít', en: 'more — less' },
      { vi: 'cùng — khác', en: 'same — different' },
      { vi: 'bắt đầu — kết thúc', en: 'begin — end' },
      { vi: 'nhớ — quên', en: 'remember — forget' },
      { vi: 'mất — tìm thấy', en: 'lose — find' },
      { vi: 'thắng — thua', en: 'win — lose' },
      { vi: 'an toàn — nguy hiểm', en: 'safe — dangerous' }
    ],
    'môn học': [
      { vi: 'môn toán', en: 'maths' }, { vi: 'môn tiếng Anh', en: 'English' },
      { vi: 'môn khoa học', en: 'science' }, { vi: 'môn lịch sử', en: 'history' },
      { vi: 'môn địa lí', en: 'geography' }, { vi: 'môn mĩ thuật', en: 'art' },
      { vi: 'môn âm nhạc', en: 'music' }, { vi: 'môn thể dục', en: 'PE' },
      { vi: 'bài kiểm tra', en: 'test' }, { vi: 'điểm số', en: 'mark' },
      { vi: 'bài tập về nhà', en: 'homework' }, { vi: 'thời khoá biểu', en: 'timetable' }
    ],
    'ở nhà hàng và cửa hàng': [
      { vi: 'thực đơn', en: 'menu' }, { vi: 'gọi món', en: 'order' },
      { vi: 'bao nhiêu tiền?', en: 'how much is it?' }, { vi: 'đắt quá', en: "it's too expensive" },
      { vi: 'rẻ', en: 'cheap' }, { vi: 'cho tôi xin…', en: 'can I have…' },
      { vi: 'ngon quá', en: "it's delicious" }, { vi: 'no rồi', en: "I'm full" },
      { vi: 'trả tiền', en: 'pay' }, { vi: 'tiền thừa', en: 'change' }
    ],
    'đi đường': [
      { vi: 'rẽ trái', en: 'turn left' }, { vi: 'rẽ phải', en: 'turn right' },
      { vi: 'đi thẳng', en: 'go straight' }, { vi: 'dừng lại', en: 'stop' },
      { vi: 'qua đường', en: 'cross the road' }, { vi: 'đèn giao thông', en: 'traffic light' },
      { vi: 'vỉa hè', en: 'pavement' }, { vi: 'bản đồ đường đi', en: 'directions' },
      { vi: 'lạc đường', en: 'get lost' }, { vi: 'đi nhờ xe', en: 'take a lift' },
      { vi: 'vé xe', en: 'ticket' }, { vi: 'chuyến đi', en: 'trip' }
    ],
    'thiên nhiên và con vật (chữ)': [
      { vi: 'đàn chim', en: 'a flock of birds' }, { vi: 'tổ chim', en: 'nest' },
      { vi: 'cái lông vũ', en: 'feather' }, { vi: 'cái đuôi', en: 'tail' },
      { vi: 'cái cánh', en: 'wing' }, { vi: 'cái sừng', en: 'horn' },
      { vi: 'bộ lông', en: 'fur' }, { vi: 'cái vảy', en: 'scale' },
      { vi: 'cái hang', en: 'cave' }, { vi: 'cái chuồng', en: 'cage' },
      { vi: 'thức ăn cho thú', en: 'pet food' }, { vi: 'vườn thú', en: 'zoo' },
      { vi: 'nông trại', en: 'farm' }, { vi: 'cánh đồng', en: 'field' },
      { vi: 'dòng sông', en: 'river' }, { vi: 'cái hồ', en: 'lake' },
      { vi: 'bầu trời', en: 'sky' }, { vi: 'mặt đất', en: 'ground' },
      { vi: 'không khí', en: 'air' }, { vi: 'cát', en: 'sand' }
    ],
    'cảm xúc và tính cách (chữ)': [
      { vi: 'hạnh phúc', en: 'glad' }, { vi: 'lo lắng', en: 'worried' },
      { vi: 'hồi hộp', en: 'excited' }, { vi: 'bình tĩnh', en: 'calm' },
      { vi: 'xấu hổ', en: 'shy' }, { vi: 'tự hào', en: 'proud' },
      { vi: 'thất vọng', en: 'disappointed' }, { vi: 'bối rối', en: 'confused' },
      { vi: 'hài lòng', en: 'pleased' }, { vi: 'ngạc nhiên lắm', en: 'amazed' },
      { vi: 'thân thiện', en: 'friendly' }, { vi: 'trung thực', en: 'honest' },
      { vi: 'kiên nhẫn', en: 'patient' }, { vi: 'ích kỉ', en: 'selfish' },
      { vi: 'hào phóng', en: 'generous' }, { vi: 'nghiêm túc', en: 'serious' }
    ],
    'mẫu câu hay dùng': [
      { vi: 'Tôi có thể giúp gì?', en: 'Can I help you?' },
      { vi: 'Cho tôi hỏi một chút', en: 'Excuse me' },
      { vi: 'Đợi một lát nhé', en: 'Just a moment' },
      { vi: 'Tôi đồng ý', en: 'I agree' },
      { vi: 'Tôi không đồng ý', en: "I don't agree" },
      { vi: 'Tất nhiên rồi', en: 'Of course' },
      { vi: 'Có lẽ vậy', en: 'Maybe' },
      { vi: 'Không sao đâu', en: "It's okay" },
      { vi: 'Cẩn thận nhé', en: 'Be careful' },
      { vi: 'Nhanh lên nào', en: 'Hurry up' },
      { vi: 'Đừng lo', en: "Don't worry" },
      { vi: 'Tôi quên mất', en: 'I forgot' },
      { vi: 'Tôi mệt rồi', en: "I'm tired" },
      { vi: 'Trời đẹp quá', en: "It's a lovely day" },
      { vi: 'Bạn thích gì?', en: 'What do you like?' },
      { vi: 'Tôi thích nhất là…', en: 'My favourite is…' },
      { vi: 'Bây giờ mấy giờ rồi?', en: "What's the time?" },
      { vi: 'Đã đến giờ rồi', en: "It's time" },
      { vi: 'Chúng ta đi thôi', en: "Let's go" },
      { vi: 'Cùng chơi nhé', en: "Let's play" }
    ],
    'trạng từ và từ nối': [
      { vi: 'luôn luôn', en: 'always' }, { vi: 'thường thường', en: 'usually' },
      { vi: 'thỉnh thoảng', en: 'sometimes' }, { vi: 'hiếm khi', en: 'rarely' },
      { vi: 'không bao giờ', en: 'never' }, { vi: 'bây giờ', en: 'now' },
      { vi: 'sau đó', en: 'then' }, { vi: 'cuối cùng thì', en: 'finally' },
      { vi: 'rất', en: 'very' }, { vi: 'hơi', en: 'a bit' },
      { vi: 'quá', en: 'too' }, { vi: 'cũng', en: 'also' },
      { vi: 'nhưng', en: 'but' }, { vi: 'và', en: 'and' },
      { vi: 'hoặc', en: 'or' }, { vi: 'vì', en: 'because' },
      { vi: 'nếu', en: 'if' }, { vi: 'khi', en: 'when (linking)' },
      { vi: 'cẩn thận', en: 'carefully' }, { vi: 'nhanh chóng', en: 'quickly' }
    ]
    ,
    'sức khoẻ': [
      { vi: 'đau đầu', en: 'headache' }, { vi: 'đau bụng', en: 'stomach ache' },
      { vi: 'đau răng', en: 'toothache' }, { vi: 'bị sốt', en: 'fever' },
      { vi: 'bị ho', en: 'cough' }, { vi: 'bị cảm', en: 'cold (illness)' },
      { vi: 'mệt', en: 'tired' }, { vi: 'đói', en: 'hungry' }, { vi: 'khát', en: 'thirsty' },
      { vi: 'khoẻ mạnh', en: 'healthy' }, { vi: 'viên thuốc', en: 'medicine' },
      { vi: 'nghỉ ốm', en: 'be off sick' }
    ]
  };

  global.TuVungAnh = { CO_HINH: CO_HINH, CHU: CHU };
})(window);
