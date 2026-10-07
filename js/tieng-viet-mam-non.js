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
      { vi: 'cái bàn', en: 'table', e: '🪑' }, { vi: 'quyển sách', en: 'book', e: '📖' },
      { vi: 'cái bút', en: 'pen', e: '✏️' }, { vi: 'cái cốc', en: 'cup', e: '🥤' },
      { vi: 'cái mũ', en: 'hat', e: '🧢' }, { vi: 'đôi giày', en: 'shoes', e: '👟' },
      { vi: 'cái ô', en: 'umbrella', e: '☂️' }, { vi: 'quả bóng', en: 'ball', e: '⚽' }
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
    ]
  };

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

  global.TiengVietMN = {
    CHU_DE: CHU_DE,
    songNgu: songNgu, datSongNgu: datSongNgu,
    ngheVaChon: ngheVaChon, goiTen: goiTen,
    nhanBietChu: nhanBietChu, chuDauTu: chuDauTu,
    demBangChu: demBangChu, chaoHoi: chaoHoi,
    theoChuDe: function (ten) { return function () { return Math.random() < 0.6 ? ngheVaChon(ten, 3) : goiTen(ten); }; }
  };
})(window);
