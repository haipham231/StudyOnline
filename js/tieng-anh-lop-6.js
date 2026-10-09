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
      { en: 'timetable', vi: 'thời khoá biểu' }, { en: 'subject', vi: 'môn học' }
    ],
    'My house': [
      { en: 'living room', vi: 'phòng khách' }, { en: 'kitchen', vi: 'nhà bếp' },
      { en: 'bedroom', vi: 'phòng ngủ' }, { en: 'furniture', vi: 'đồ đạc' },
      { en: 'wardrobe', vi: 'tủ quần áo' }, { en: 'air conditioner', vi: 'máy điều hoà' }
    ],
    'My friends': [
      { en: 'confident', vi: 'tự tin' }, { en: 'friendly', vi: 'thân thiện' },
      { en: 'generous', vi: 'hào phóng' }, { en: 'patient', vi: 'kiên nhẫn' },
      { en: 'reliable', vi: 'đáng tin cậy' }, { en: 'talkative', vi: 'nói nhiều' }
    ],
    'My neighbourhood': [
      { en: 'museum', vi: 'bảo tàng' }, { en: 'temple', vi: 'ngôi đền' },
      { en: 'square', vi: 'quảng trường' }, { en: 'convenient', vi: 'tiện lợi' },
      { en: 'noisy', vi: 'ồn ào' }, { en: 'historic', vi: 'có tính lịch sử' }
    ],
    'Natural wonders': [
      { en: 'desert', vi: 'sa mạc' }, { en: 'waterfall', vi: 'thác nước' },
      { en: 'cave', vi: 'hang động' }, { en: 'island', vi: 'hòn đảo' },
      { en: 'valley', vi: 'thung lũng' }, { en: 'plaster', vi: 'băng dán vết thương' }
    ],
    'Our Tet holiday': [
      { en: 'firework', vi: 'pháo hoa' }, { en: 'lucky money', vi: 'tiền lì xì' },
      { en: 'peach blossom', vi: 'hoa đào' }, { en: 'banh chung', vi: 'bánh chưng' },
      { en: 'decorate', vi: 'trang trí' }, { en: 'celebrate', vi: 'tổ chức, ăn mừng' }
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

  global.TiengAnhL6 = {
    TU_VUNG: TU_VUNG,
    hienTaiDon: hienTaiDon, hienTaiTiepDien: hienTaiTiepDien, quaKhuDon: quaKhuDon,
    soSanhHonNhat: soSanhHonNhat, maoTu: maoTu, gioiTu: gioiTu,
    dongTuKhuyetThieu: dongTuKhuyetThieu, demDuocKhongDem: demDuocKhongDem,
    nghiaTuVung: nghiaTuVung, tuTiengAnh: tuTiengAnh, docHieu6: docHieu6
  };
})(window);
