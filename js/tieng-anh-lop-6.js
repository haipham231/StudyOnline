/* ===== Tiếng Anh lớp 6 — chương trình THCS =====
   Ngữ pháp (thì, so sánh, mạo từ, giới từ, động từ khuyết thiếu, đại từ,
   danh từ đếm được), từ vựng theo chủ đề sách lớp 6, và đọc hiểu.
   Câu hỏi ra bằng tiếng Việt cho bé dễ hiểu yêu cầu, phần cần chọn là
   tiếng Anh.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var chon = Q.pick;

  function ba(dung, sai) {
    var set = [dung];
    Q.shuffle(sai).forEach(function (v) { if (set.length < 3 && set.indexOf(v) === -1) set.push(v); });
    return Q.shuffle(set);
  }

  /* ---------- Thì hiện tại đơn ---------- */

  var HTD = [
    { cau: 'She ___ to school every day.', dung: 'goes', sai: ['go', 'going', 'went'] },
    { cau: 'They ___ football on Sundays.', dung: 'play', sai: ['plays', 'playing', 'played'] },
    { cau: 'My brother ___ English very well.', dung: 'speaks', sai: ['speak', 'speaking', 'spoke'] },
    { cau: 'We ___ in Ha Noi.', dung: 'live', sai: ['lives', 'living', 'lived'] },
    { cau: 'Lan ___ her homework after dinner.', dung: 'does', sai: ['do', 'doing', 'did'] },
    { cau: 'The sun ___ in the east.', dung: 'rises', sai: ['rise', 'rising', 'rose'] }
  ];

  function hienTaiDon() {
    var c = chon(HTD);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Hiện tại đơn',
      giai: ['Thì <b>hiện tại đơn</b> nói về thói quen, sự thật.',
        'Chủ ngữ là <b>he / she / it</b> hoặc một người thì động từ <b>thêm -s / -es</b>.',
        'Chủ ngữ là <b>I / you / we / they</b> thì động từ giữ nguyên.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Thì hiện tại tiếp diễn ---------- */

  var HTTD = [
    { cau: 'Look! The children ___ in the yard.', dung: 'are playing', sai: ['play', 'plays', 'is playing'] },
    { cau: 'I ___ my homework now.', dung: 'am doing', sai: ['do', 'does', 'is doing'] },
    { cau: 'She ___ a book at the moment.', dung: 'is reading', sai: ['read', 'reads', 'are reading'] },
    { cau: 'Listen! Someone ___ a song.', dung: 'is singing', sai: ['sing', 'sings', 'are singing'] }
  ];

  function hienTaiTiepDien() {
    var c = chon(HTTD);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 1, mach: 'Hiện tại tiếp diễn',
      giai: ['Có <b>now, at the moment, Look!, Listen!</b> là dấu hiệu của hiện tại tiếp diễn.',
        'Công thức: <b>am / is / are + V-ing</b>.',
        'I đi với <b>am</b>, he/she/it đi với <b>is</b>, you/we/they đi với <b>are</b>.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Quá khứ đơn ---------- */

  var QKD = [
    { cau: 'We ___ to Da Nang last summer.', dung: 'went', sai: ['go', 'goes', 'are going'] },
    { cau: 'She ___ a new bike yesterday.', dung: 'bought', sai: ['buy', 'buys', 'buying'] },
    { cau: 'They ___ the film last night.', dung: 'watched', sai: ['watch', 'watches', 'watching'] },
    { cau: 'I ___ my grandparents last week.', dung: 'visited', sai: ['visit', 'visits', 'visiting'] }
  ];

  function quaKhuDon() {
    var c = chon(QKD);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Quá khứ đơn',
      giai: ['Có <b>yesterday, last night, last week, ago</b> là dấu hiệu của quá khứ đơn.',
        'Động từ có quy tắc thì <b>thêm -ed</b>, động từ bất quy tắc phải học thuộc.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- So sánh ---------- */

  var SO_SANH = [
    { cau: 'My house is ___ than yours.', dung: 'bigger', sai: ['big', 'biggest', 'more big'], loai: 'hơn' },
    { cau: 'This book is ___ than that one.', dung: 'more interesting',
      sai: ['interesting', 'most interesting', 'interestinger'], loai: 'hơn' },
    { cau: 'She is the ___ student in my class.', dung: 'tallest', sai: ['tall', 'taller', 'most tall'], loai: 'nhất' },
    { cau: 'Mount Everest is the ___ mountain in the world.', dung: 'highest',
      sai: ['high', 'higher', 'most high'], loai: 'nhất' },
    { cau: 'Today is ___ than yesterday.', dung: 'hotter', sai: ['hot', 'hottest', 'more hot'], loai: 'hơn' }
  ];

  function soSanhHonNhat() {
    var c = chon(SO_SANH);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 1, mach: 'So sánh',
      giai: ['Có <b>than</b> là so sánh <b>hơn</b>; có <b>the</b> là so sánh <b>nhất</b>.',
        'Tính từ ngắn: thêm <b>-er / -est</b> (big → bigger → biggest).',
        'Tính từ dài: dùng <b>more / the most</b> (interesting → more interesting).',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Mạo từ, giới từ ---------- */

  var MAO_TU = [
    { cau: 'I have ___ apple for breakfast.', dung: 'an', sai: ['a', 'the', 'some'] },
    { cau: 'She is ___ teacher.', dung: 'a', sai: ['an', 'the', 'some'] },
    { cau: 'Can you open ___ door, please?', dung: 'the', sai: ['a', 'an', 'some'] },
    { cau: 'There is ___ umbrella near the door.', dung: 'an', sai: ['a', 'the', 'any'] }
  ];

  function maoTu() {
    var c = chon(MAO_TU);
    return {
      prompt: 'Chọn mạo từ đúng:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Mạo từ',
      giai: ['<b>a</b> đứng trước phụ âm, <b>an</b> đứng trước nguyên âm a, e, i, o, u.',
        '<b>the</b> dùng khi nói tới vật mà cả hai người đều biết là vật nào.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  var GIOI_TU = [
    { cau: 'My birthday is ___ June.', dung: 'in', sai: ['on', 'at', 'to'] },
    { cau: 'We go to school ___ Monday.', dung: 'on', sai: ['in', 'at', 'to'] },
    { cau: 'The film starts ___ 7 p.m.', dung: 'at', sai: ['in', 'on', 'to'] },
    { cau: 'The cat is ___ the table.', dung: 'under', sai: ['in', 'at', 'of'] },
    { cau: 'There is a map ___ the wall.', dung: 'on', sai: ['in', 'at', 'under'] }
  ];

  function gioiTu() {
    var c = chon(GIOI_TU);
    return {
      prompt: 'Chọn giới từ đúng:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Giới từ',
      giai: ['<b>in</b> + tháng, năm, mùa · <b>on</b> + thứ, ngày · <b>at</b> + giờ.',
        'Giới từ chỉ nơi chốn: in (trong), on (trên bề mặt), under (dưới), next to (cạnh).',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Động từ khuyết thiếu, đại từ ---------- */

  var KHUYET_THIEU = [
    { cau: 'You ___ do your homework before going out.', dung: 'should', sai: ['can', 'may', 'are'] },
    { cau: 'Birds ___ fly.', dung: 'can', sai: ['should', 'must', 'are'] },
    { cau: 'We ___ wear a helmet when riding a motorbike.', dung: 'must', sai: ['can', 'may', 'are'] },
    { cau: '___ you swim?', dung: 'Can', sai: ['Do', 'Are', 'Is'] }
  ];

  function dongTuKhuyetThieu() {
    var c = chon(KHUYET_THIEU);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Động từ khuyết thiếu',
      giai: ['<b>can</b> — có thể, biết làm · <b>should</b> — nên · <b>must</b> — phải, bắt buộc.',
        'Sau các từ này luôn là động từ <b>nguyên thể, không chia</b>.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  var DEM_DUOC = [
    { cau: 'How ___ books do you have?', dung: 'many', sai: ['much', 'any', 'a lot'] },
    { cau: 'How ___ water is there in the bottle?', dung: 'much', sai: ['many', 'any', 'a lot'] },
    { cau: 'There aren\'t ___ eggs in the fridge.', dung: 'any', sai: ['some', 'much', 'a'] },
    { cau: 'I need ___ milk for the cake.', dung: 'some', sai: ['many', 'an', 'a'] }
  ];

  function demDuocKhongDem() {
    var c = chon(DEM_DUOC);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Danh từ đếm được',
      giai: ['<b>many</b> đi với danh từ <b>đếm được</b> số nhiều (books, eggs).',
        '<b>much</b> đi với danh từ <b>không đếm được</b> (water, milk, rice).',
        '<b>some</b> dùng trong câu khẳng định, <b>any</b> dùng trong câu phủ định và câu hỏi.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Từ vựng theo chủ đề sách lớp 6 ---------- */

  var TU_VUNG = {
    'My new school': [
      { en: 'classroom', vi: 'lớp học' }, { en: 'playground', vi: 'sân chơi' },
      { en: 'library', vi: 'thư viện' }, { en: 'uniform', vi: 'đồng phục' },
      { en: 'timetable', vi: 'thời khoá biểu' }, { en: 'subject', vi: 'môn học' },
      { en: 'break time', vi: 'giờ ra chơi' }, { en: 'homework', vi: 'bài tập về nhà' },
      { en: 'schoolbag', vi: 'cặp sách' }, { en: 'headmaster', vi: 'thầy hiệu trưởng' }
    ],
    'My house': [
      { en: 'living room', vi: 'phòng khách' }, { en: 'kitchen', vi: 'nhà bếp' },
      { en: 'bedroom', vi: 'phòng ngủ' }, { en: 'furniture', vi: 'đồ đạc trong nhà' },
      { en: 'wardrobe', vi: 'tủ quần áo' }, { en: 'air conditioner', vi: 'máy điều hoà' },
      { en: 'cushion', vi: 'cái đệm ngồi' }, { en: 'chest of drawers', vi: 'tủ có ngăn kéo' },
      { en: 'attic', vi: 'gác mái' }, { en: 'balcony', vi: 'ban công' }
    ],
    'My friends': [
      { en: 'confident', vi: 'tự tin' }, { en: 'friendly', vi: 'thân thiện' },
      { en: 'generous', vi: 'hào phóng' }, { en: 'patient', vi: 'kiên nhẫn' },
      { en: 'reliable', vi: 'đáng tin cậy' }, { en: 'talkative', vi: 'nói nhiều' },
      { en: 'creative', vi: 'sáng tạo' }, { en: 'shy', vi: 'nhút nhát' },
      { en: 'hard-working', vi: 'chăm chỉ' }, { en: 'funny', vi: 'hài hước' }
    ],
    'My neighbourhood': [
      { en: 'museum', vi: 'bảo tàng' }, { en: 'temple', vi: 'ngôi đền' },
      { en: 'square', vi: 'quảng trường' }, { en: 'convenient', vi: 'tiện lợi' },
      { en: 'noisy', vi: 'ồn ào' }, { en: 'historic', vi: 'có tính lịch sử' },
      { en: 'pagoda', vi: 'ngôi chùa' }, { en: 'railway station', vi: 'nhà ga xe lửa' },
      { en: 'market', vi: 'khu chợ' }, { en: 'crowded', vi: 'đông đúc' }
    ],
    'Natural wonders': [
      { en: 'desert', vi: 'sa mạc' }, { en: 'waterfall', vi: 'thác nước' },
      { en: 'cave', vi: 'hang động' }, { en: 'island', vi: 'hòn đảo' },
      { en: 'valley', vi: 'thung lũng' }, { en: 'mountain', vi: 'ngọn núi' },
      { en: 'beach', vi: 'bãi biển' }, { en: 'forest', vi: 'khu rừng' },
      { en: 'lake', vi: 'cái hồ' }, { en: 'river', vi: 'dòng sông' }
    ],
    'Our Tet holiday': [
      { en: 'firework', vi: 'pháo hoa' }, { en: 'lucky money', vi: 'tiền lì xì' },
      { en: 'peach blossom', vi: 'hoa đào' }, { en: 'banh chung', vi: 'bánh chưng' },
      { en: 'decorate', vi: 'trang trí' }, { en: 'celebrate', vi: 'tổ chức ăn mừng' },
      { en: 'calendar', vi: 'quyển lịch' }, { en: 'ancestor', vi: 'tổ tiên' },
      { en: 'apricot blossom', vi: 'hoa mai' }, { en: 'wish', vi: 'lời chúc' }
    ],
    'Television': [
      { en: 'channel', vi: 'kênh truyền hình' }, { en: 'programme', vi: 'chương trình' },
      { en: 'cartoon', vi: 'phim hoạt hình' }, { en: 'remote control', vi: 'cái điều khiển từ xa' },
      { en: 'viewer', vi: 'người xem' }, { en: 'newsreader', vi: 'người đọc bản tin' },
      { en: 'comedy', vi: 'phim hài' }, { en: 'documentary', vi: 'phim tài liệu' },
      { en: 'weather forecast', vi: 'bản tin dự báo thời tiết' }, { en: 'episode', vi: 'tập phim' }
    ],
    'Sports and games': [
      { en: 'goalkeeper', vi: 'thủ môn' }, { en: 'racket', vi: 'cái vợt' },
      { en: 'stadium', vi: 'sân vận động' }, { en: 'champion', vi: 'nhà vô địch' },
      { en: 'score', vi: 'ghi bàn' }, { en: 'competition', vi: 'cuộc thi đấu' },
      { en: 'athlete', vi: 'vận động viên' }, { en: 'medal', vi: 'tấm huy chương' },
      { en: 'referee', vi: 'trọng tài' }, { en: 'team', vi: 'đội tuyển' }
    ],
    'Cities of the world': [
      { en: 'capital', vi: 'thủ đô' }, { en: 'skyscraper', vi: 'toà nhà chọc trời' },
      { en: 'palace', vi: 'cung điện' }, { en: 'tourist', vi: 'khách du lịch' },
      { en: 'landmark', vi: 'địa danh nổi tiếng' }, { en: 'population', vi: 'dân số' },
      { en: 'bridge', vi: 'cây cầu' }, { en: 'harbour', vi: 'bến cảng' },
      { en: 'postcard', vi: 'tấm bưu thiếp' }, { en: 'souvenir', vi: 'đồ lưu niệm' }
    ],
    'Our houses in the future': [
      { en: 'smart home', vi: 'ngôi nhà thông minh' }, { en: 'solar energy', vi: 'năng lượng mặt trời' },
      { en: 'automatic', vi: 'tự động' }, { en: 'modern', vi: 'hiện đại' },
      { en: 'wireless', vi: 'không dây' }, { en: 'space station', vi: 'trạm vũ trụ' },
      { en: 'underwater', vi: 'ở dưới nước' }, { en: 'comfortable', vi: 'thoải mái' },
      { en: 'appliance', vi: 'thiết bị gia dụng' }, { en: 'future', vi: 'tương lai' }
    ],
    'Our greener world': [
      { en: 'pollution', vi: 'sự ô nhiễm' }, { en: 'recycle', vi: 'tái chế' },
      { en: 'reuse', vi: 'dùng lại' }, { en: 'plastic bag', vi: 'túi ni lông' },
      { en: 'rubbish', vi: 'rác thải' }, { en: 'environment', vi: 'môi trường' },
      { en: 'save energy', vi: 'tiết kiệm năng lượng' }, { en: 'natural resource', vi: 'tài nguyên thiên nhiên' },
      { en: 'plant trees', vi: 'trồng cây' }, { en: 'clean up', vi: 'dọn dẹp sạch sẽ' }
    ],
    'Robots': [
      { en: 'machine', vi: 'cái máy' }, { en: 'factory', vi: 'nhà máy' },
      { en: 'repair', vi: 'sửa chữa' }, { en: 'guard', vi: 'canh gác' },
      { en: 'understand', vi: 'hiểu được' }, { en: 'instruction', vi: 'lời hướng dẫn' },
      { en: 'invent', vi: 'phát minh' }, { en: 'helpful', vi: 'hữu ích' },
      { en: 'housework', vi: 'việc nhà' }, { en: 'battery', vi: 'cục pin' }
    ]
  };

  function tatCaTu() {
    var het = [];
    Object.keys(TU_VUNG).forEach(function (k) { het = het.concat(TU_VUNG[k]); });
    return het;
  }

  function nghiaTuVung() {
    var het = tatCaTu();
    var dung = chon(het);
    var sai = [];
    Q.shuffle(het).forEach(function (x) { if (sai.length < 2 && x.en !== dung.en) sai.push(x.vi); });
    return {
      prompt: 'Từ <b class="tu-anh">' + dung.en + '</b> nghĩa là gì?',
      speak: dung.en, tieng: 'en',
      answer: dung.vi, choices: Q.shuffle([dung.vi].concat(sai)), cols: 1, mach: 'Từ vựng'
    };
  }

  function tuTiengAnh() {
    var het = tatCaTu();
    var dung = chon(het);
    var sai = [];
    Q.shuffle(het).forEach(function (x) { if (sai.length < 2 && x.en !== dung.en) sai.push(x.en); });
    return {
      prompt: '<b>' + dung.vi.charAt(0).toUpperCase() + dung.vi.slice(1) +
              '</b> trong tiếng Anh là từ nào?',
      speak: 'Which word means ' + dung.vi, tieng: 'en',
      answer: dung.en, choices: Q.shuffle([dung.en].concat(sai)), cols: 1, mach: 'Từ vựng'
    };
  }

  /* ---------- Đọc hiểu ---------- */

  var BAI_DOC = [
    { bai: 'My name is Mai. I am twelve years old. I study at Nguyen Du Secondary School. ' +
           'My school is small but beautiful. I go to school by bike every morning. ' +
           'My favourite subject is English because I want to travel around the world.',
      hoi: [
        { h: 'How old is Mai?', d: 'Twelve', s: ['Eleven', 'Thirteen'] },
        { h: 'How does Mai go to school?', d: 'By bike', s: ['By bus', 'On foot'] },
        { h: 'Why does Mai like English?', d: 'Because she wants to travel around the world',
          s: ['Because it is easy', 'Because her father is a teacher'] }
      ] },
    { bai: 'Nam lives in a small house in the countryside. There is a big garden behind the house. ' +
           'His mother grows vegetables and flowers there. In the afternoon, Nam often helps her ' +
           'water the plants. At the weekend, he goes fishing with his father.',
      hoi: [
        { h: 'Where does Nam live?', d: 'In the countryside', s: ['In the city', 'Near the sea'] },
        { h: 'What is behind the house?', d: 'A big garden', s: ['A small lake', 'A tall tree'] },
        { h: 'What does Nam do at the weekend?', d: 'He goes fishing with his father',
          s: ['He waters the plants', 'He visits his grandparents'] }
      ] },
    { bai: 'Tet is the most important holiday in Viet Nam. Before Tet, people clean and decorate ' +
           'their houses. They buy peach blossoms in the North and apricot blossoms in the South. ' +
           'On the first day of Tet, children receive lucky money from adults and wish them good health.',
      hoi: [
        { h: 'What do people do before Tet?', d: 'They clean and decorate their houses',
          s: ['They travel abroad', 'They go to school'] },
        { h: 'What flower do people in the South buy?', d: 'Apricot blossoms',
          s: ['Peach blossoms', 'Sunflowers'] },
        { h: 'What do children receive on the first day of Tet?', d: 'Lucky money',
          s: ['New books', 'A new bike'] }
      ] },
    { bai: 'My family watches television together every evening. My father likes the news and ' +
           'football matches. My mother prefers cooking programmes. My little sister never misses ' +
           'her cartoons at seven o’clock. I like documentaries about animals because I learn a lot ' +
           'from them. We only watch television for one hour a day.',
      hoi: [
        { h: 'What does the father like watching?', d: 'The news and football matches',
          s: ['Cartoons', 'Cooking programmes'] },
        { h: 'When does the sister watch cartoons?', d: 'At seven o’clock',
          s: ['At six o’clock', 'At eight o’clock'] },
        { h: 'How long does the family watch television every day?', d: 'One hour',
          s: ['Two hours', 'Three hours'] }
      ] },
    { bai: 'Minh is a member of the school football team. He trains three times a week at the ' +
           'stadium near his house. Last Saturday his team played against class 6A and won two to ' +
           'one. Minh scored the second goal. His coach says Minh runs fast and never gives up. ' +
           'Minh hopes to become a professional player one day.',
      hoi: [
        { h: 'How often does Minh train?', d: 'Three times a week',
          s: ['Twice a week', 'Every day'] },
        { h: 'What was the score of the match?', d: 'Two to one',
          s: ['One to one', 'Three to two'] },
        { h: 'What does Minh want to be?', d: 'A professional football player',
          s: ['A football coach', 'A sports teacher'] }
      ] },
    { bai: 'Our class joined a green day last month. In the morning we collected rubbish around ' +
           'the lake. We put plastic bottles and paper into different boxes so that they can be ' +
           'recycled. In the afternoon we planted twenty young trees in the schoolyard. We were ' +
           'tired but very happy. Our teacher said small actions can make a big change.',
      hoi: [
        { h: 'What did the class do in the morning?', d: 'They collected rubbish around the lake',
          s: ['They planted trees', 'They cleaned the classroom'] },
        { h: 'How many trees did they plant?', d: 'Twenty',
          s: ['Twelve', 'Thirty'] },
        { h: 'Why did they put bottles and paper into different boxes?', d: 'So that they can be recycled',
          s: ['Because the boxes were empty', 'Because the teacher asked for paper'] }
      ] },
    { bai: 'In the future, robots will help people in many ways. A home robot can cook meals, ' +
           'wash clothes and clean the floor. A doctor robot can look after sick people in hospital. ' +
           'Some robots work in factories and build cars. However, robots cannot think or feel like ' +
           'humans, so people will still do the most important work.',
      hoi: [
        { h: 'What can a home robot do?', d: 'Cook, wash clothes and clean the floor',
          s: ['Drive a car', 'Teach English'] },
        { h: 'Where do some robots build cars?', d: 'In factories',
          s: ['In hospitals', 'At home'] },
        { h: 'What can robots not do?', d: 'Think or feel like humans',
          s: ['Clean the floor', 'Work in a factory'] }
      ] }
  ];

  function docHieu6() {
    var d = chon(BAI_DOC);
    var h = chon(d.hoi);
    return {
      prompt: '<span class="doan-van">' + d.bai + '</span><br><b>' + h.h + '</b>',
      speak: h.h, tieng: 'en',
      answer: h.d, choices: Q.shuffle([h.d].concat(h.s)), cols: 1, mach: 'Đọc hiểu'
    };
  }

  /* ===== Phần bổ sung: thêm ngữ pháp, từ vựng và bài đọc cho lớp 6 ===== */

  /* ---------- Động từ to be ---------- */

  var TO_BE = [
    { cau: 'I ___ a student at Chu Van An School.', dung: 'am', sai: ['is', 'are', 'be'] },
    { cau: 'My sister ___ twelve years old.', dung: 'is', sai: ['am', 'are', 'be'] },
    { cau: 'They ___ my best friends.', dung: 'are', sai: ['is', 'am', 'be'] },
    { cau: 'There ___ a big tree in our schoolyard.', dung: 'is', sai: ['are', 'am', 'be'] },
    { cau: 'My parents ___ very kind.', dung: 'are', sai: ['is', 'am', 'be'] },
    { cau: 'This ___ my new bicycle.', dung: 'is', sai: ['are', 'am', 'be'] },
    { cau: 'You and I ___ in the same class.', dung: 'are', sai: ['is', 'am', 'be'] }
  ];

  function dongTuToBe() {
    var c = chon(TO_BE);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Động từ to be',
      giai: ['Động từ <b>to be</b> đổi theo chủ ngữ: <b>I am</b>, <b>he / she / it is</b>, ' +
        '<b>you / we / they are</b>.',
        'Danh từ số ít đi với <b>is</b>, danh từ số nhiều đi với <b>are</b>.',
        'Ở câu này chủ ngữ hợp với <b>' + c.dung + '</b>.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- There is / There are ---------- */

  var CO_KHONG = [
    { cau: 'There ___ four chairs in the kitchen.', dung: 'are', sai: ['is', 'am', 'be'] },
    { cau: 'There ___ some milk in the fridge.', dung: 'is', sai: ['are', 'am', 'have'] },
    { cau: '___ there any books on the shelf?', dung: 'Are', sai: ['Is', 'Am', 'Do'] },
    { cau: 'There ___ not any water in the bottle.', dung: 'is', sai: ['are', 'am', 'do'] },
    { cau: 'There ___ a park and two shops near my house.', dung: 'is', sai: ['are', 'am', 'be'] },
    { cau: 'How many students ___ there in your class?', dung: 'are', sai: ['is', 'am', 'do'] }
  ];

  function coKhongCo() {
    var c = chon(CO_KHONG);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'There is, there are',
      giai: ['<b>There is</b> dùng với danh từ <b>số ít</b> và danh từ <b>không đếm được</b>.',
        '<b>There are</b> dùng với danh từ <b>số nhiều</b>.',
        'Nếu sau “there” có nhiều danh từ thì nhìn <b>danh từ đứng ngay sau</b> để chọn.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Từ để hỏi ---------- */

  var TU_HOI = [
    { cau: '___ is your name? — My name is Lan.', dung: 'What', sai: ['Where', 'When', 'Who'] },
    { cau: '___ do you live? — I live in Hue.', dung: 'Where', sai: ['What', 'When', 'How'] },
    { cau: '___ is your birthday? — It is in May.', dung: 'When', sai: ['Where', 'Who', 'Why'] },
    { cau: '___ is that boy? — He is my brother.', dung: 'Who', sai: ['What', 'Where', 'How'] },
    { cau: '___ do you go to school? — By bus.', dung: 'How', sai: ['What', 'Who', 'When'] },
    { cau: '___ are you late? — Because I missed the bus.', dung: 'Why', sai: ['How', 'Where', 'Who'] },
    { cau: '___ books do you have? — Five.', dung: 'How many', sai: ['How much', 'What', 'How often'] },
    { cau: '___ do you watch television? — Twice a week.', dung: 'How often', sai: ['How many', 'How long', 'Where'] }
  ];

  function tuDeHoi() {
    var c = chon(TU_HOI);
    return {
      prompt: 'Chọn từ để hỏi đúng:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 1, mach: 'Từ để hỏi',
      giai: ['<b>What</b> hỏi cái gì, <b>Where</b> hỏi ở đâu, <b>When</b> hỏi khi nào.',
        '<b>Who</b> hỏi ai, <b>Why</b> hỏi tại sao, <b>How</b> hỏi bằng cách nào.',
        '<b>How many</b> hỏi số lượng đếm được, <b>How often</b> hỏi mức độ thường xuyên.',
        'Nhìn vào <b>câu trả lời</b> sẽ biết phải hỏi bằng từ nào — ở đây là ' + c.dung + '.']
    };
  }

  /* ---------- Đại từ và tính từ sở hữu ---------- */

  var SO_HUU = [
    { cau: 'This is my sister. ___ name is Hoa.', dung: 'Her', sai: ['His', 'Its', 'Their'] },
    { cau: 'Nam is my friend. I often play with ___.', dung: 'him', sai: ['he', 'his', 'her'] },
    { cau: 'We love ___ school very much.', dung: 'our', sai: ['us', 'we', 'ours'] },
    { cau: 'The cat is hungry. Please give ___ some milk.', dung: 'it', sai: ['its', 'he', 'she'] },
    { cau: 'My parents are teachers. ___ work in a small school.', dung: 'They', sai: ['Their', 'Them', 'Theirs'] },
    { cau: 'That book is not mine. It is ___.', dung: 'hers', sai: ['her', 'she', 'his book'] },
    { cau: 'This is ___ bag. Nam bought it yesterday.', dung: "Nam's", sai: ['Nam', 'Nams', "Nams'"] }
  ];

  function daiTuSoHuu() {
    var c = chon(SO_HUU);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 1, mach: 'Đại từ và sở hữu',
      giai: ['<b>Tính từ sở hữu</b> đứng trước danh từ: my, your, his, her, its, our, their.',
        '<b>Đại từ tân ngữ</b> đứng sau động từ hoặc giới từ: me, you, him, her, it, us, them.',
        'Muốn nói của ai đó thì thêm <b>’s</b> vào sau tên, ví dụ <i>Nam’s bag</i>.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Trạng từ chỉ tần suất ---------- */

  var TAN_SUAT = [
    { cau: 'He ___ gets up at six o’clock. (100%)', dung: 'always', sai: ['never', 'sometimes', 'rarely'] },
    { cau: 'I ___ eat fast food. (0%)', dung: 'never', sai: ['always', 'often', 'usually'] },
    { cau: 'She ___ goes to the library on Saturday. (80%)', dung: 'usually', sai: ['never', 'rarely', 'seldom'] },
    { cau: 'We ___ play badminton after school. (60%)', dung: 'often', sai: ['never', 'always', 'rarely'] },
    { cau: 'They ___ watch television at midnight. (10%)', dung: 'rarely', sai: ['always', 'usually', 'often'] }
  ];

  function trangTuTanSuat() {
    var c = chon(TAN_SUAT);
    return {
      prompt: 'Chọn trạng từ hợp với mức độ trong ngoặc:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank').replace(/\([^)]*\)/, ''), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Trạng từ tần suất',
      giai: ['Thang mức độ: <b>always</b> (luôn luôn) → <b>usually</b> (thường) → ' +
        '<b>often</b> (hay) → <b>sometimes</b> (thỉnh thoảng) → <b>rarely</b> (hiếm khi) → ' +
        '<b>never</b> (không bao giờ).',
        'Trạng từ tần suất đứng <b>trước động từ thường</b> nhưng <b>sau động từ to be</b>.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Tương lai gần ---------- */

  var TUONG_LAI = [
    { cau: 'Next summer we ___ visit Ha Long Bay.', dung: 'are going to', sai: ['go', 'went', 'is going to'] },
    { cau: 'Look at those clouds! It ___ rain.', dung: 'is going to', sai: ['are going to', 'rains', 'rained'] },
    { cau: 'I ___ buy a new bicycle tomorrow.', dung: 'am going to', sai: ['is going to', 'are going to', 'bought'] },
    { cau: 'They ___ plant more trees in the schoolyard.', dung: 'are going to', sai: ['is going to', 'am going to', 'planted'] }
  ];

  function tuongLaiGan() {
    var c = chon(TUONG_LAI);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 1, mach: 'Tương lai gần',
      giai: ['<b>Be going to</b> nói về dự định, hoặc điều sắp xảy ra mà đã thấy dấu hiệu.',
        'Công thức: <b>am / is / are + going to + động từ nguyên thể</b>.',
        'Dấu hiệu: tomorrow, next week, next summer, Look at…',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Câu mệnh lệnh ---------- */

  var MENH_LENH = [
    { cau: '___ the door, please. It is cold.', dung: 'Close', sai: ['Closes', 'Closing', 'To close'] },
    { cau: '___ talk in the library!', dung: "Don't", sai: ['No', 'Not', 'Doesn’t'] },
    { cau: '___ your hands before meals.', dung: 'Wash', sai: ['Washes', 'Washing', 'Washed'] },
    { cau: '___ late for school again!', dung: "Don't be", sai: ['Not be', 'No be', 'Doesn’t be'] },
    { cau: '___ quiet, the baby is sleeping.', dung: 'Be', sai: ['Are', 'Is', 'Being'] }
  ];

  function cauMenhLenh() {
    var c = chon(MENH_LENH);
    return {
      prompt: 'Chọn từ đúng điền vào chỗ trống:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Câu mệnh lệnh',
      giai: ['Câu mệnh lệnh <b>không có chủ ngữ</b>, bắt đầu luôn bằng <b>động từ nguyên thể</b>.',
        'Muốn bảo đừng làm gì thì thêm <b>Don’t</b> ở đầu câu.',
        'Với động từ to be thì dùng <b>Be…</b> hoặc <b>Don’t be…</b>',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Liên từ ---------- */

  var LIEN_TU = [
    { cau: 'I like English ___ I don’t like maths.', dung: 'but', sai: ['and', 'so', 'because'] },
    { cau: 'It was raining, ___ we stayed at home.', dung: 'so', sai: ['but', 'because', 'or'] },
    { cau: 'She is tired ___ she worked all day.', dung: 'because', sai: ['so', 'but', 'and'] },
    { cau: 'My brother ___ I go to the same school.', dung: 'and', sai: ['but', 'so', 'because'] },
    { cau: 'Would you like tea ___ coffee?', dung: 'or', sai: ['and', 'but', 'so'] }
  ];

  function lienTu() {
    var c = chon(LIEN_TU);
    return {
      prompt: 'Chọn liên từ đúng:<br><b>' + c.cau + '</b>',
      speak: c.cau.replace('___', 'blank'), tieng: 'en',
      answer: c.dung, choices: ba(c.dung, c.sai), cols: 3, mach: 'Liên từ',
      giai: ['<b>and</b> nối hai ý cùng chiều, <b>but</b> nối hai ý trái ngược.',
        '<b>because</b> nêu <b>lí do</b>, <b>so</b> nêu <b>kết quả</b>.',
        '<b>or</b> dùng khi đưa ra lựa chọn.',
        'Đáp án: ' + c.dung + '.']
    };
  }

  /* ---------- Danh từ số nhiều ---------- */

  var SO_NHIEU = [
    { it: 'book', nhieu: 'books', sai: ['bookes', 'bookies'] },
    { it: 'box', nhieu: 'boxes', sai: ['boxs', 'boxies'] },
    { it: 'city', nhieu: 'cities', sai: ['citys', 'cityes'] },
    { it: 'watch', nhieu: 'watches', sai: ['watchs', 'watchies'] },
    { it: 'knife', nhieu: 'knives', sai: ['knifes', 'knifies'] },
    { it: 'child', nhieu: 'children', sai: ['childs', 'childes'] },
    { it: 'tooth', nhieu: 'teeth', sai: ['tooths', 'toothes'] },
    { it: 'foot', nhieu: 'feet', sai: ['foots', 'footes'] },
    { it: 'man', nhieu: 'men', sai: ['mans', 'manes'] },
    { it: 'woman', nhieu: 'women', sai: ['womans', 'womens'] },
    { it: 'mouse', nhieu: 'mice', sai: ['mouses', 'mouse'] },
    { it: 'leaf', nhieu: 'leaves', sai: ['leafs', 'leafes'] },
    { it: 'potato', nhieu: 'potatoes', sai: ['potatos', 'potatoies'] },
    { it: 'fish', nhieu: 'fish', sai: ['fishes', 'fishs'] }
  ];

  function danhTuSoNhieu() {
    var c = chon(SO_NHIEU);
    return {
      prompt: 'Dạng <b>số nhiều</b> của <b class="tu-anh">' + c.it + '</b> là từ nào?',
      speak: 'What is the plural of ' + c.it, tieng: 'en',
      answer: c.nhieu, choices: ba(c.nhieu, c.sai.concat([c.it])), cols: 3,
      mach: 'Danh từ số nhiều',
      giai: ['Phần lớn danh từ chỉ thêm <b>-s</b>, nhưng có nhiều trường hợp riêng.',
        'Tận cùng <b>-s, -x, -ch, -sh, -o</b> thì thêm <b>-es</b>; tận cùng <b>phụ âm + y</b> thì đổi y thành <b>-ies</b>.',
        'Tận cùng <b>-f, -fe</b> thường đổi thành <b>-ves</b>.',
        'Một số từ <b>bất quy tắc</b>: child → children, tooth → teeth, man → men.',
        'Đáp án: ' + c.nhieu + '.']
    };
  }

  /* ---------- Từ trái nghĩa ---------- */

  var TRAI_NGHIA = [
    ['big', 'small'], ['tall', 'short'], ['old', 'young'], ['new', 'old'],
    ['hot', 'cold'], ['happy', 'sad'], ['easy', 'difficult'], ['cheap', 'expensive'],
    ['noisy', 'quiet'], ['clean', 'dirty'], ['fast', 'slow'], ['near', 'far'],
    ['open', 'close'], ['strong', 'weak'], ['early', 'late'], ['light', 'heavy'],
    ['wet', 'dry'], ['full', 'empty'], ['safe', 'dangerous'], ['beautiful', 'ugly']
  ];

  function traiNghia() {
    var c = chon(TRAI_NGHIA);
    var dao = Math.random() < 0.5;
    var hoi = dao ? c[1] : c[0], dap = dao ? c[0] : c[1];
    // Gom hết từ khác làm kho đáp án sai rồi mới bốc — nhiều từ nằm ở hai
    // cặp (old đi với young mà cũng đi với new), bốc thẳng là dễ trùng nhau
    // rồi câu hỏi chỉ còn hai lựa chọn.
    var kho = [];
    TRAI_NGHIA.forEach(function (x) {
      if (x === c) return;
      x.forEach(function (t) {
        if (t !== hoi && t !== dap && kho.indexOf(t) === -1) kho.push(t);
      });
    });
    var sai = Q.shuffle(kho).slice(0, 2);
    return {
      prompt: 'Từ nào <b>trái nghĩa</b> với <b class="tu-anh">' + hoi + '</b>?',
      speak: 'What is the opposite of ' + hoi, tieng: 'en',
      answer: dap, choices: ba(dap, sai), cols: 3, mach: 'Từ trái nghĩa',
      giai: ['Trái nghĩa với <b>' + hoi + '</b> là <b>' + dap + '</b>.',
        'Học từ vựng theo <b>cặp trái nghĩa</b> thì nhớ được gấp đôi số từ.']
    };
  }

  /* ---------- Chọn từ khác loại ---------- */

  var NHOM_TU = [
    { nhom: ['apple', 'banana', 'orange', 'mango'], la: 'chair', chu: 'đồ ăn' },
    { nhom: ['dog', 'cat', 'bird', 'fish'], la: 'table', chu: 'con vật' },
    { nhom: ['red', 'blue', 'green', 'yellow'], la: 'book', chu: 'màu sắc' },
    { nhom: ['Monday', 'Tuesday', 'Friday', 'Sunday'], la: 'January', chu: 'thứ trong tuần' },
    { nhom: ['football', 'tennis', 'badminton', 'swimming'], la: 'kitchen', chu: 'môn thể thao' },
    { nhom: ['mother', 'father', 'sister', 'brother'], la: 'teacher', chu: 'người trong gia đình' },
    { nhom: ['kitchen', 'bedroom', 'bathroom', 'living room'], la: 'museum', chu: 'phòng trong nhà' },
    { nhom: ['bus', 'train', 'plane', 'bicycle'], la: 'rice', chu: 'phương tiện đi lại' }
  ];

  function tuKhacLoai() {
    var g = chon(NHOM_TU);
    var hai = Q.shuffle(g.nhom).slice(0, 2);
    return {
      prompt: 'Từ nào <b>khác loại</b> với các từ còn lại?',
      speak: hai.join(', ') + ', ' + g.la, tieng: 'en',
      answer: g.la, choices: Q.shuffle(hai.concat([g.la])), cols: 3, mach: 'Từ khác loại',
      giai: [hai.join(' và ') + ' đều thuộc nhóm <b>' + g.chu + '</b>.',
        '<b>' + g.la + '</b> không cùng nhóm đó nên là từ khác loại.']
    };
  }

  /* ---------- Sắp xếp trật tự câu ---------- */

  var TRAT_TU = [
    { dung: 'She often goes to school by bus.',
      sai: ['She goes often to school by bus.', 'Often she goes school to by bus.'] },
    { dung: 'My father works in a hospital.',
      sai: ['My father work in a hospital.', 'In a hospital my father works.'] },
    { dung: 'There are two parks in my neighbourhood.',
      sai: ['There is two parks in my neighbourhood.', 'Two parks there are in my neighbourhood.'] },
    { dung: 'What time do you get up?',
      sai: ['What time you do get up?', 'What time do get you up?'] },
    { dung: 'I am doing my homework now.',
      sai: ['I doing am my homework now.', 'Now I do my homework am.'] },
    { dung: 'Ha Noi is bigger than Hue.',
      sai: ['Ha Noi is more big than Hue.', 'Ha Noi bigger is than Hue.'] }
  ];

  function trongCauDung() {
    var c = chon(TRAT_TU);
    return {
      prompt: 'Câu nào viết <b>đúng</b>?',
      speak: c.dung, tieng: 'en',
      answer: c.dung, choices: Q.shuffle([c.dung].concat(c.sai)), cols: 1, mach: 'Trật tự câu',
      giai: ['Trật tự thường gặp trong câu tiếng Anh: <b>chủ ngữ – động từ – tân ngữ – nơi chốn – thời gian</b>.',
        'Trạng từ tần suất (often, always…) đứng <b>trước động từ thường</b>.',
        'Câu hỏi có <b>do / does</b> thì chủ ngữ đứng ngay sau nó.',
        'Câu đúng là: ' + c.dung]
    };
  }

  global.TiengAnhL6 = {
    TU_VUNG: TU_VUNG,
    hienTaiDon: hienTaiDon, hienTaiTiepDien: hienTaiTiepDien, quaKhuDon: quaKhuDon,
    soSanhHonNhat: soSanhHonNhat, maoTu: maoTu, gioiTu: gioiTu,
    dongTuKhuyetThieu: dongTuKhuyetThieu, demDuocKhongDem: demDuocKhongDem,
    nghiaTuVung: nghiaTuVung, tuTiengAnh: tuTiengAnh, docHieu6: docHieu6,

    /* phần bổ sung */
    dongTuToBe: dongTuToBe, coKhongCo: coKhongCo, tuDeHoi: tuDeHoi,
    daiTuSoHuu: daiTuSoHuu, trangTuTanSuat: trangTuTanSuat, tuongLaiGan: tuongLaiGan,
    cauMenhLenh: cauMenhLenh, lienTu: lienTu, danhTuSoNhieu: danhTuSoNhieu,
    traiNghia: traiNghia, tuKhacLoai: tuKhacLoai, trongCauDung: trongCauDung
  };
})(window);
