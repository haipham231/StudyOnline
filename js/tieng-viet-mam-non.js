/* ===== Tiếng Việt cho bé mầm non (3–5 tuổi) =====
   Dùng được cho cả bé trong nước và bé gốc Việt ở nước ngoài:
   bật "song ngữ" thì mỗi từ hiện thêm nghĩa tiếng Anh dưới hình.
   Mọi câu đều là bấm chọn hình và đều được đọc to bằng tiếng Việt.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;
  var KHOA_SONG_NGU = 'studyonline:songngu';

  function songNgu() {
    try { return localStorage.getItem(KHOA_SONG_NGU) === '1'; } catch (e) { return false; }
  }

  function datSongNgu(bat) {
    try { localStorage.setItem(KHOA_SONG_NGU, bat ? '1' : '0'); } catch (e) { /* bỏ qua */ }
  }

  // nút chọn: hình to, nhãn tiếng Việt, thêm tiếng Anh nếu bật song ngữ
  function nut(hinh, vi, en) {
    return hinh + '<span class="nhan">' + vi +
      (songNgu() && en ? '<i class="en">' + en + '</i>' : '') + '</span>';
  }

  function nhieu(ds, n, loaiTru, khoa) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && khoa(x) !== khoa(loaiTru)) ket.push(x);
    });
    return ket;
  }

  /* ================= TỪ VỰNG THEO CHỦ ĐỀ ================= */

  var CHU_DE = {
    'con vật': [
      { vi: 'con mèo', en: 'cat', e: '🐱' }, { vi: 'con chó', en: 'dog', e: '🐶' },
      { vi: 'con cá', en: 'fish', e: '🐟' }, { vi: 'con chim', en: 'bird', e: '🐦' },
      { vi: 'con voi', en: 'elephant', e: '🐘' }, { vi: 'con thỏ', en: 'rabbit', e: '🐰' },
      { vi: 'con gà', en: 'chicken', e: '🐔' }, { vi: 'con bò', en: 'cow', e: '🐮' }
    ],
    'trái cây': [
      { vi: 'quả táo', en: 'apple', e: '🍎' }, { vi: 'quả chuối', en: 'banana', e: '🍌' },
      { vi: 'quả cam', en: 'orange', e: '🍊' }, { vi: 'quả nho', en: 'grapes', e: '🍇' },
      { vi: 'quả dưa hấu', en: 'watermelon', e: '🍉' }, { vi: 'quả dâu', en: 'strawberry', e: '🍓' },
      { vi: 'quả dứa', en: 'pineapple', e: '🍍' }, { vi: 'quả xoài', en: 'mango', e: '🥭' }
    ],
    'đồ vật': [
      { vi: 'cái cặp sách', en: 'school bag', e: '🎒' }, { vi: 'quyển sách', en: 'book', e: '📖' },
      { vi: 'cái bút', en: 'pen', e: '✏️' }, { vi: 'cái cốc', en: 'cup', e: '🥤' },
      { vi: 'cái ô', en: 'umbrella', e: '☂️' }, { vi: 'quả bóng', en: 'ball', e: '⚽' },
      { vi: 'con gấu bông', en: 'teddy bear', e: '🧸' }, { vi: 'quả bóng bay', en: 'balloon', e: '🎈' }
    ],
    'gia đình': [
      { vi: 'ông', en: 'grandpa', e: '👴' }, { vi: 'bà', en: 'grandma', e: '👵' },
      { vi: 'bố', en: 'dad', e: '👨' }, { vi: 'mẹ', en: 'mum', e: '👩' },
      { vi: 'anh', en: 'big brother', e: '👦' }, { vi: 'chị', en: 'big sister', e: '👧' },
      { vi: 'em bé', en: 'baby', e: '👶' }
    ],
    'màu sắc': [
      { vi: 'màu đỏ', en: 'red', e: '🟥' }, { vi: 'màu vàng', en: 'yellow', e: '🟨' },
      { vi: 'màu xanh lá', en: 'green', e: '🟩' }, { vi: 'màu xanh dương', en: 'blue', e: '🟦' },
      { vi: 'màu tím', en: 'purple', e: '🟪' }, { vi: 'màu cam', en: 'orange', e: '🟧' },
      { vi: 'màu nâu', en: 'brown', e: '🟫' }, { vi: 'màu đen', en: 'black', e: '⬛' }
    ],
    'cơ thể': [
      { vi: 'mắt', en: 'eye', e: '👁️' }, { vi: 'tai', en: 'ear', e: '👂' },
      { vi: 'mũi', en: 'nose', e: '👃' }, { vi: 'miệng', en: 'mouth', e: '👄' },
      { vi: 'tay', en: 'hand', e: '✋' }, { vi: 'chân', en: 'foot', e: '🦶' },
      { vi: 'tóc', en: 'hair', e: '💇' }, { vi: 'răng', en: 'tooth', e: '🦷' }
    ],
    'đồ dùng trong nhà': [
      { vi: 'cái ghế', en: 'chair', e: '🪑' }, { vi: 'cái giường', en: 'bed', e: '🛏️' },
      { vi: 'cái đèn', en: 'lamp', e: '💡' }, { vi: 'cái quạt', en: 'fan', e: '🌀' },
      { vi: 'cái bát', en: 'bowl', e: '🥣' }, { vi: 'cái thìa', en: 'spoon', e: '🥄' },
      { vi: 'cái chìa khoá', en: 'key', e: '🔑' }, { vi: 'cái đồng hồ', en: 'clock', e: '🕐' }
    ],
    'quần áo': [
      { vi: 'cái áo', en: 'shirt', e: '👕' }, { vi: 'cái quần', en: 'trousers', e: '👖' },
      { vi: 'cái váy', en: 'dress', e: '👗' }, { vi: 'cái mũ', en: 'hat', e: '🧢' },
      { vi: 'đôi giày', en: 'shoes', e: '👟' }, { vi: 'đôi tất', en: 'socks', e: '🧦' },
      { vi: 'cái khăn', en: 'scarf', e: '🧣' }, { vi: 'đôi găng tay', en: 'gloves', e: '🧤' }
    ],
    'phương tiện': [
      { vi: 'ô tô', en: 'car', e: '🚗' }, { vi: 'xe máy', en: 'motorbike', e: '🏍️' },
      { vi: 'xe đạp', en: 'bicycle', e: '🚲' }, { vi: 'máy bay', en: 'plane', e: '✈️' },
      { vi: 'tàu hoả', en: 'train', e: '🚂' }, { vi: 'con thuyền', en: 'boat', e: '⛵' },
      { vi: 'xe buýt', en: 'bus', e: '🚌' }, { vi: 'xe cứu hoả', en: 'fire truck', e: '🚒' }
    ],
    'đồ ăn': [
      { vi: 'bát cơm', en: 'rice', e: '🍚' }, { vi: 'bát phở', en: 'pho noodles', e: '🍜' },
      { vi: 'bánh mì', en: 'bread', e: '🍞' }, { vi: 'cốc sữa', en: 'milk', e: '🥛' },
      { vi: 'quả trứng', en: 'egg', e: '🥚' }, { vi: 'cái bánh', en: 'cake', e: '🧁' },
      { vi: 'cái kẹo', en: 'candy', e: '🍬' }, { vi: 'cốc nước', en: 'water', e: '💧' }
    ],
    'rau củ': [
      { vi: 'củ cà rốt', en: 'carrot', e: '🥕' }, { vi: 'bắp ngô', en: 'corn', e: '🌽' },
      { vi: 'quả cà chua', en: 'tomato', e: '🍅' }, { vi: 'củ khoai', en: 'potato', e: '🥔' },
      { vi: 'quả dưa chuột', en: 'cucumber', e: '🥒' }, { vi: 'bông cải', en: 'broccoli', e: '🥦' },
      { vi: 'cây nấm', en: 'mushroom', e: '🍄' }, { vi: 'quả ớt', en: 'chilli', e: '🌶️' }
    ],
    'thời tiết': [
      { vi: 'trời nắng', en: 'sunny', e: '☀️' }, { vi: 'trời mưa', en: 'rainy', e: '🌧️' },
      { vi: 'đám mây', en: 'cloud', e: '☁️' }, { vi: 'cầu vồng', en: 'rainbow', e: '🌈' },
      { vi: 'bông tuyết', en: 'snow', e: '❄️' }, { vi: 'cơn gió', en: 'wind', e: '💨' }
    ]
  };

  /* ---------- hoạt động hằng ngày ---------- */

  var HOAT_DONG = [
    { vi: 'ăn cơm', en: 'eating', e: '🍽️' }, { vi: 'ngủ', en: 'sleeping', e: '😴' },
    { vi: 'chạy', en: 'running', e: '🏃' }, { vi: 'hát', en: 'singing', e: '🎤' },
    { vi: 'múa', en: 'dancing', e: '💃' }, { vi: 'đọc sách', en: 'reading', e: '📚' },
    { vi: 'vẽ tranh', en: 'drawing', e: '🎨' }, { vi: 'tắm', en: 'bathing', e: '🛁' },
    { vi: 'đánh răng', en: 'brushing teeth', e: '🪥' }, { vi: 'rửa tay', en: 'washing hands', e: '🧼' }
  ];

  function hoatDong() {
    var dung = chon(HOAT_DONG);
    var sai = nhieu(HOAT_DONG, 2, dung, function (x) { return x.vi; });
    return {
      prompt: 'Bạn nhỏ đang làm gì?',
      speak: 'Bạn nhỏ đang làm gì?',
      art: '<span class="nhun">' + dung.e + '</span>',
      answer: dung.vi + (songNgu() && dung.en ? ' <i class="en">' + dung.en + '</i>' : ''),
      choices: Q.shuffle([dung].concat(sai)).map(function (x) {
        return x.vi + (songNgu() && x.en ? ' <i class="en">' + x.en + '</i>' : '');
      }),
      cols: 1, mach: 'Hoạt động hằng ngày'
    };
  }

  /* ---------- vị trí: trong, ngoài, trên, dưới ---------- */

  var VI_TRI = [
    { vi: 'ở trên', en: 'on top', art: '⬆️🧸' }, { vi: 'ở dưới', en: 'underneath', art: '🧸⬇️' },
    { vi: 'ở trong', en: 'inside', art: '📦🧸' }, { vi: 'ở ngoài', en: 'outside', art: '🧸 📦' }
  ];

  function viTri() {
    var dung = chon(VI_TRI);
    var sai = nhieu(VI_TRI, 2, dung, function (x) { return x.vi; });
    return {
      prompt: 'Gấu bông <b>' + dung.vi + '</b> cái hộp — đâu là hình đúng?',
      speak: 'Gấu bông ' + dung.vi + ' cái hộp. Đâu là hình đúng?',
      answer: nut(dung.art, dung.vi, dung.en),
      choices: Q.shuffle([dung].concat(sai)).map(function (x) { return nut(x.art, x.vi, x.en); }),
      cols: 3, mach: 'Vị trí'
    };
  }

  // nghe tiếng Việt rồi chọn đúng hình
  function ngheVaChon(tenChuDe, soLuaChon) {
    var cd = tenChuDe || chon(Object.keys(CHU_DE));
    var ds = CHU_DE[cd];
    var dung = chon(ds);
    var sai = nhieu(ds, (soLuaChon || 3) - 1, dung, function (x) { return x.vi; });

    return {
      prompt: 'Đâu là <b>' + dung.vi + '</b>?' + (songNgu() ? ' <i class="en-de">(' + dung.en + ')</i>' : ''),
      speak: 'Đâu là ' + dung.vi + '?',
      answer: nut(dung.e, dung.vi, dung.en),
      choices: Q.shuffle([dung].concat(sai)).map(function (x) { return nut(x.e, x.vi, x.en); }),
      cols: (soLuaChon || 3) === 2 ? 2 : 3,
      mach: 'Từ vựng: ' + cd
    };
  }

  // nhìn hình rồi chọn đúng tên tiếng Việt
  function goiTen(tenChuDe) {
    var cd = tenChuDe || chon(Object.keys(CHU_DE));
    var ds = CHU_DE[cd];
    var dung = chon(ds);
    var sai = nhieu(ds, 2, dung, function (x) { return x.vi; });

    return {
      prompt: 'Đây là gì?',
      speak: 'Đây là gì?',
      art: '<span class="nhun">' + dung.e + '</span>',
      answer: dung.vi + (songNgu() ? ' <i class="en">' + dung.en + '</i>' : ''),
      choices: Q.shuffle([dung].concat(sai)).map(function (x) {
        return x.vi + (songNgu() ? ' <i class="en">' + x.en + '</i>' : '');
      }),
      cols: 1, mach: 'Gọi tên: ' + cd
    };
  }

  /* ================= CHỮ CÁI ================= */

  // tiếng chính của mỗi từ phải THẬT SỰ bắt đầu bằng chữ đó
  var CHU_CAI = [
    { c: 'a', tu: 'cái áo', e: '👕' }, { c: 'b', tu: 'con bò', e: '🐮' },
    { c: 'c', tu: 'con cá', e: '🐟' }, { c: 'd', tu: 'quả dưa', e: '🍉' },
    { c: 'đ', tu: 'đôi đũa', e: '🥢' }, { c: 'e', tu: 'em bé', e: '👶' },
    { c: 'g', tu: 'con gà', e: '🐔' }, { c: 'h', tu: 'bông hoa', e: '🌸' },
    { c: 'l', tu: 'chiếc lá', e: '🍃' }, { c: 'm', tu: 'con mèo', e: '🐱' },
    { c: 'n', tu: 'quả na', e: '🍈' }, { c: 'o', tu: 'con ong', e: '🐝' },
    { c: 'r', tu: 'con rùa', e: '🐢' }, { c: 's', tu: 'ngôi sao', e: '⭐' },
    { c: 't', tu: 'cái tai', e: '👂' }, { c: 'v', tu: 'con voi', e: '🐘' },
    { c: 'x', tu: 'xe đạp', e: '🚲' }
  ];

  function nhanBietChu() {
    var c = chon(CHU_CAI);
    var hoa = Math.random() < 0.4;
    var dung = hoa ? c.c.toUpperCase() : c.c;
    var sai = Q.shuffle(CHU_CAI.filter(function (x) { return x.c !== c.c; }))
      .slice(0, 5).map(function (x) { return hoa ? x.c.toUpperCase() : x.c; });

    return {
      prompt: 'Đâu là chữ <b>' + dung + '</b>?',
      speak: 'Đâu là chữ ' + c.c + '?',
      answer: '<span class="chu-to">' + dung + '</span>',
      choices: Q.shuffle([dung].concat(sai)).map(function (x) {
        return '<span class="chu-to">' + x + '</span>';
      }),
      cols: 3, mach: 'Chữ cái'
    };
  }

  function chuDauTu() {
    var c = chon(CHU_CAI);
    var sai = Q.shuffle(CHU_CAI.filter(function (x) { return x.c !== c.c; }))
      .slice(0, 3).map(function (x) { return x.c; });

    return {
      prompt: '<b>' + c.tu + '</b> bắt đầu bằng chữ gì?',
      speak: c.tu + ' bắt đầu bằng chữ gì?',
      art: '<span class="nhun">' + c.e + '</span>',
      answer: '<span class="chu-to">' + c.c + '</span>',
      choices: Q.shuffle([c.c].concat(sai)).map(function (x) {
        return '<span class="chu-to">' + x + '</span>';
      }),
      cols: 4, mach: 'Chữ đầu của từ'
    };
  }

  /* ================= ĐẾM BẰNG TIẾNG VIỆT ================= */

  var SO_CHU = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

  function demBangChu(toiDa) {
    var ds = chon(CHU_DE['con vật'].concat(CHU_DE['trái cây']));
    var n = r(1, toiDa || 5);
    var sai = [n - 1, n + 1, n + 2, n - 2]
      .filter(function (v) { return v >= 1 && v <= 10 && v !== n; })
      .map(function (v) { return SO_CHU[v]; });

    return {
      prompt: 'Có mấy ' + ds.vi + '?',
      speak: 'Có mấy ' + ds.vi + '?',
      art: Q.repeatArt(ds.e, n),
      answer: SO_CHU[n],
      choices: Q.shuffle([SO_CHU[n]].concat(sai.slice(0, 2))),
      cols: 3, mach: 'Đếm bằng tiếng Việt'
    };
  }

  /* ================= CHÀO HỎI, LỄ PHÉP ================= */

  var TINH_HUONG = [
    { hoi: 'Gặp cô giáo buổi sáng, bé nói gì?', dung: 'Con chào cô ạ!', en: 'Good morning, teacher!',
      sai: ['Tạm biệt cô ạ!', 'Con cảm ơn cô ạ!', 'Con xin lỗi cô ạ!'] },
    { hoi: 'Được bà cho quà, bé nói gì?', dung: 'Con cảm ơn bà ạ!', en: 'Thank you, grandma!',
      sai: ['Con chào bà ạ!', 'Con xin lỗi bà ạ!', 'Bà ơi cho con!'] },
    { hoi: 'Bé làm đổ nước, bé nói gì?', dung: 'Con xin lỗi ạ!', en: 'I am sorry!',
      sai: ['Con cảm ơn ạ!', 'Con chào ạ!', 'Không phải con ạ!'] },
    { hoi: 'Bé về nhà, gặp ông bà, bé nói gì?', dung: 'Con chào ông bà ạ!', en: 'Hello grandpa and grandma!',
      sai: ['Tạm biệt ông bà ạ!', 'Con cảm ơn ông bà ạ!', 'Ông bà ơi!'] },
    { hoi: 'Mẹ hỏi “Con ăn cơm chưa?”, bé trả lời lễ phép thế nào?', dung: 'Dạ, con ăn rồi ạ!',
      en: 'Yes, I have eaten.', sai: ['Ăn rồi!', 'Chưa!', 'Không biết!'] },
    { hoi: 'Bé đi ngủ, bé nói gì với bố mẹ?', dung: 'Con chúc bố mẹ ngủ ngon ạ!', en: 'Good night!',
      sai: ['Con chào bố mẹ ạ!', 'Con cảm ơn bố mẹ ạ!', 'Bố mẹ ngủ đi!'] }
  ];

  function chaoHoi() {
    var t = chon(TINH_HUONG);
    var kem = function (s, en) { return s + (songNgu() && en ? '<i class="en">' + en + '</i>' : ''); };
    return {
      prompt: t.hoi,
      speak: t.hoi,
      answer: kem(t.dung, t.en),
      choices: Q.shuffle([kem(t.dung, t.en)].concat(t.sai.map(function (s) { return kem(s, null); }))),
      cols: 1, mach: 'Chào hỏi lễ phép'
    };
  }


  /* ================= DÀNH CHO BÉ VIỆT KIỀU ================= */

  /* --- Xưng hô trong gia đình: thứ bé xa quê hay lúng túng nhất --- */

  var XUNG_HO = [
    { hoi: 'Bé nói chuyện với <b>mẹ</b> thì bé tự gọi mình là gì?', dung: 'con',
      sai: ['em', 'cháu', 'tôi'], en: 'With parents, a child says "con"' },
    { hoi: 'Bé nói chuyện với <b>bà</b> thì bé tự gọi mình là gì?', dung: 'cháu',
      sai: ['con', 'em', 'tôi'], en: 'With grandparents, a child says "cháu"' },
    { hoi: 'Bé nói chuyện với <b>anh trai</b> thì bé tự gọi mình là gì?', dung: 'em',
      sai: ['con', 'cháu', 'anh'], en: 'With an older sibling, say "em"' },
    { hoi: 'Gọi <b>em trai của bố</b> là gì?', dung: 'chú',
      sai: ['bác', 'cậu', 'dượng'], en: 'Father’s younger brother = chú' },
    { hoi: 'Gọi <b>anh trai của bố</b> là gì?', dung: 'bác',
      sai: ['chú', 'cậu', 'ông'], en: 'Father’s older brother = bác' },
    { hoi: 'Gọi <b>em trai của mẹ</b> là gì?', dung: 'cậu',
      sai: ['chú', 'bác', 'dì'], en: 'Mother’s younger brother = cậu' },
    { hoi: 'Gọi <b>em gái của mẹ</b> là gì?', dung: 'dì',
      sai: ['cô', 'bác', 'mợ'], en: 'Mother’s younger sister = dì' },
    { hoi: 'Gọi <b>em gái của bố</b> là gì?', dung: 'cô',
      sai: ['dì', 'bác', 'mợ'], en: 'Father’s younger sister = cô' },
    { hoi: 'Bố của mẹ bé thì bé gọi là gì?', dung: 'ông ngoại',
      sai: ['ông nội', 'bác', 'cậu'], en: 'Mother’s father = ông ngoại' },
    { hoi: 'Mẹ của bố bé thì bé gọi là gì?', dung: 'bà nội',
      sai: ['bà ngoại', 'cô', 'dì'], en: 'Father’s mother = bà nội' }
  ];

  function xungHo() {
    var t = chon(XUNG_HO);
    var kem = function (x, en) { return x + (songNgu() && en ? '<i class="en">' + en + '</i>' : ''); };
    return {
      prompt: t.hoi + (songNgu() ? '<br><i class="en-de">' + t.en + '</i>' : ''),
      speak: String(t.hoi).replace(/<[^>]+>/g, ''),
      answer: kem(t.dung, null),
      choices: Q.shuffle([t.dung].concat(t.sai)).map(function (x) { return kem(x, null); }),
      cols: 2, mach: 'Xưng hô gia đình'
    };
  }

  /* --- Thanh điệu: bé lớn lên ở nước ngoài thường nghe không ra --- */

  var CAP_THANH = [
    { goc: 'ma', ds: [
      { t: 'ma', ten: 'thanh ngang', n: 'con ma' }, { t: 'mà', ten: 'thanh huyền', n: 'nhưng mà' },
      { t: 'má', ten: 'thanh sắc', n: 'má của mẹ' }, { t: 'mả', ten: 'thanh hỏi', n: 'mồ mả' },
      { t: 'mã', ten: 'thanh ngã', n: 'mã số' }, { t: 'mạ', ten: 'thanh nặng', n: 'cây mạ' }] },
    { goc: 'ba', ds: [
      { t: 'ba', ten: 'thanh ngang', n: 'số ba' }, { t: 'bà', ten: 'thanh huyền', n: 'bà nội' },
      { t: 'bá', ten: 'thanh sắc', n: 'bá chủ' }, { t: 'bả', ten: 'thanh hỏi', n: 'bả vai' },
      { t: 'bã', ten: 'thanh ngã', n: 'bã mía' }, { t: 'bạ', ten: 'thanh nặng', n: 'học bạ' }] },
    { goc: 'co', ds: [
      { t: 'co', ten: 'thanh ngang', n: 'co chân' }, { t: 'cò', ten: 'thanh huyền', n: 'con cò' },
      { t: 'có', ten: 'thanh sắc', n: 'có nhà' }, { t: 'cỏ', ten: 'thanh hỏi', n: 'bãi cỏ' },
      { t: 'cõ', ten: 'thanh ngã', n: '' }, { t: 'cọ', ten: 'thanh nặng', n: 'cây cọ' }] }
  ];

  function nhanThanh() {
    var nhom = chon(CAP_THANH);
    var ds = nhom.ds.filter(function (x) { return x.n; });
    var dung = chon(ds);
    var sai = nhieu(ds, 3, dung, function (x) { return x.t; });

    return {
      prompt: 'Nghe và chọn đúng tiếng: <b>' + dung.t + '</b>' +
              '<br><small>' + dung.n + '</small>',
      speak: dung.t + '. ' + dung.n,
      answer: '<span class="chu-to">' + dung.t + '</span>',
      choices: Q.shuffle([dung].concat(sai)).map(function (x) {
        return '<span class="chu-to">' + x.t + '</span>';
      }),
      cols: 4, mach: 'Thanh điệu'
    };
  }

  function thanhCuaTieng() {
    var nhom = chon(CAP_THANH);
    var ds = nhom.ds.filter(function (x) { return x.n; });
    var t = chon(ds);
    var sai = nhieu(ds, 3, t, function (x) { return x.ten; }).map(function (x) { return x.ten; });

    return {
      prompt: 'Tiếng <b>' + t.t + '</b> <small>(' + t.n + ')</small> mang thanh gì?',
      speak: 'Tiếng ' + t.t + ' mang thanh gì?',
      answer: t.ten, choices: Q.shuffle([t.ten].concat(sai)), cols: 2,
      mach: 'Thanh điệu'
    };
  }

  /* --- Mẫu câu giao tiếp hằng ngày --- */

  var MAU_CAU = [
    { hoi: 'Bé muốn xin thêm cơm, bé nói thế nào?', dung: 'Mẹ cho con thêm cơm ạ!',
      sai: ['Cho cơm!', 'Con muốn cơm!', 'Thêm cơm đi!'], en: 'May I have more rice, please?' },
    { hoi: 'Bé muốn đi vệ sinh ở lớp, bé nói gì với cô?', dung: 'Thưa cô, con xin phép đi vệ sinh ạ!',
      sai: ['Con đi vệ sinh!', 'Cô ơi đi vệ sinh!', 'Đi vệ sinh đây!'], en: 'May I go to the toilet, please?' },
    { hoi: 'Bạn cho bé mượn đồ chơi, bé nói gì?', dung: 'Tớ cảm ơn cậu nhé!',
      sai: ['Cho tớ!', 'Tớ lấy nhé!', 'Được rồi!'], en: 'Thank you, my friend!' },
    { hoi: 'Bé gặp người lớn lần đầu, bé nói gì?', dung: 'Cháu chào bác ạ!',
      sai: ['Chào!', 'Hi bác!', 'Bác ơi!'], en: 'Hello, nice to meet you.' },
    { hoi: 'Bé không hiểu lời cô nói, bé hỏi thế nào?', dung: 'Thưa cô, con chưa hiểu ạ!',
      sai: ['Hả?', 'Gì cơ?', 'Nói lại đi!'], en: 'Sorry, I do not understand.' },
    { hoi: 'Bé muốn chơi cùng bạn, bé nói gì?', dung: 'Tớ chơi cùng với nhé?',
      sai: ['Cho tớ chơi!', 'Tớ chơi đây!', 'Chơi!'], en: 'May I play with you?' }
  ];

  function mauCau() {
    var t = chon(MAU_CAU);
    var kem = function (x, en) { return x + (songNgu() && en ? '<i class="en">' + en + '</i>' : ''); };
    return {
      prompt: t.hoi,
      speak: t.hoi,
      answer: kem(t.dung, t.en),
      choices: Q.shuffle([kem(t.dung, t.en)].concat(t.sai.map(function (x) { return kem(x, null); }))),
      cols: 1, mach: 'Mẫu câu giao tiếp'
    };
  }

  /* --- Văn hoá và món ăn Việt --- */

  var VAN_HOA = [
    { vi: 'bánh chưng', en: 'square sticky rice cake (Tet)', e: '🍘' },
    { vi: 'áo dài', en: 'Vietnamese long dress', e: '👘' },
    { vi: 'nón lá', en: 'conical leaf hat', e: '👒' },
    { vi: 'bát phở', en: 'pho noodle soup', e: '🍜' },
    { vi: 'bánh mì', en: 'Vietnamese baguette', e: '🥖' },
    { vi: 'đèn ông sao', en: 'star lantern (Mid-Autumn)', e: '🏮' },
    { vi: 'bánh trung thu', en: 'mooncake', e: '🥮' },
    { vi: 'lì xì', en: 'lucky money envelope', e: '🧧' }
  ];

  function vanHoaViet() {
    var dung = chon(VAN_HOA);
    var sai = nhieu(VAN_HOA, 2, dung, function (x) { return x.vi; });
    return {
      prompt: 'Đâu là <b>' + dung.vi + '</b>?' + (songNgu() ? ' <i class="en-de">(' + dung.en + ')</i>' : ''),
      speak: 'Đâu là ' + dung.vi + '?',
      answer: nut(dung.e, dung.vi, dung.en),
      choices: Q.shuffle([dung].concat(sai)).map(function (x) { return nut(x.e, x.vi, x.en); }),
      cols: 3, mach: 'Văn hoá Việt'
    };
  }

  /* ================= CHUẨN BỊ VÀO LỚP 1 (bé 5 tuổi) ================= */

  // ghép âm đầu với vần thành tiếng, mức đơn giản nhất
  var GHEP = [
    { a: 'b', v: 'a', kq: 'ba', n: 'số ba' }, { a: 'b', v: 'e', kq: 'be', n: 'bé be' },
    { a: 'c', v: 'a', kq: 'ca', n: 'ca hát' }, { a: 'c', v: 'o', kq: 'co', n: 'co chân' },
    { a: 'd', v: 'a', kq: 'da', n: 'làn da' }, { a: 'l', v: 'a', kq: 'la', n: 'la hét' },
    { a: 'm', v: 'a', kq: 'ma', n: 'con ma' }, { a: 'n', v: 'o', kq: 'no', n: 'ăn no' },
    { a: 't', v: 'o', kq: 'to', n: 'to lớn' }, { a: 'v', v: 'e', kq: 've', n: 'con ve' },
    { a: 'x', v: 'e', kq: 'xe', n: 'xe đạp' }, { a: 'g', v: 'a', kq: 'ga', n: 'nhà ga' }
  ];

  function ghepAmDon() {
    var g = chon(GHEP);
    var sai = nhieu(GHEP, 3, g, function (x) { return x.kq; }).map(function (x) { return x.kq; });
    return {
      prompt: 'Ghép <b>' + g.a + '</b> với <b>' + g.v + '</b> được tiếng gì?',
      speak: g.a + ' ghép với ' + g.v + ' được tiếng gì?',
      answer: '<span class="chu-to">' + g.kq + '</span>',
      choices: Q.shuffle([g.kq].concat(sai)).map(function (x) {
        return '<span class="chu-to">' + x + '</span>';
      }),
      cols: 4, mach: 'Ghép âm'
    };
  }

  var CAU_NGAN = [
    'Bé đi học', 'Mẹ nấu cơm', 'Bà kể chuyện', 'Bố đọc báo',
    'Em bé ngủ ngon', 'Con mèo kêu meo meo', 'Bé rửa tay sạch'
  ];

  function tachTieng() {
    var c = chon(CAU_NGAN);
    var so = c.split(/\s+/).length;
    var sai = [so - 1, so + 1, so + 2].filter(function (v) { return v >= 1 && v !== so; });
    return {
      prompt: 'Câu <b>“' + c + '”</b> có mấy tiếng?',
      speak: 'Câu ' + c + ' có mấy tiếng?',
      answer: String(so), choices: Q.shuffle([String(so)].concat(sai.slice(0, 2).map(String))),
      cols: 3, mach: 'Tách tiếng'
    };
  }

  global.TiengVietMN = {
    CHU_DE: CHU_DE, HOAT_DONG: HOAT_DONG, VI_TRI: VI_TRI,
    hoatDong: hoatDong, viTri: viTri,
    XUNG_HO: XUNG_HO, MAU_CAU: MAU_CAU, VAN_HOA: VAN_HOA, CAP_THANH: CAP_THANH, GHEP: GHEP,
    xungHo: xungHo, nhanThanh: nhanThanh, thanhCuaTieng: thanhCuaTieng,
    mauCau: mauCau, vanHoaViet: vanHoaViet, ghepAmDon: ghepAmDon, tachTieng: tachTieng,
    songNgu: songNgu, datSongNgu: datSongNgu,
    ngheVaChon: ngheVaChon, goiTen: goiTen,
    nhanBietChu: nhanBietChu, chuDauTu: chuDauTu,
    demBangChu: demBangChu, chaoHoi: chaoHoi,
    theoChuDe: function (ten) { return function () { return Math.random() < 0.6 ? ngheVaChon(ten, 3) : goiTen(ten); }; }
  };
})(window);
