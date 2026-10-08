/* ===== Tiếng Anh cho bé =====
   Vốn từ dùng chung với khu Việt kiều (TiengVietMN.CHU_DE) để một hình chỉ ứng
   với một từ trên cả site; phần dưới thêm vài chủ đề chỉ khu này mới cần.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var chon = Q.pick;

  // Chủ đề riêng của khu tiếng Anh. Số đếm viết sẵn cả chữ lẫn hình cho bé
  // vừa nhận mặt chữ vừa đếm được.
  var RIENG = {
    'số đếm': [
      { vi: 'một', en: 'one', e: '1️⃣' }, { vi: 'hai', en: 'two', e: '2️⃣' },
      { vi: 'ba', en: 'three', e: '3️⃣' }, { vi: 'bốn', en: 'four', e: '4️⃣' },
      { vi: 'năm', en: 'five', e: '5️⃣' }, { vi: 'sáu', en: 'six', e: '6️⃣' },
      { vi: 'bảy', en: 'seven', e: '7️⃣' }, { vi: 'tám', en: 'eight', e: '8️⃣' },
      { vi: 'chín', en: 'nine', e: '9️⃣' }, { vi: 'mười', en: 'ten', e: '🔟' }
    ],
    // Không có mặt trời và đám mây ở đây: chủ đề "thời tiết" đã dùng ☀️ và ☁️.
    // Một hình chỉ được ứng với một từ, không thì bé chọn đúng mà bị chấm sai.
    'thiên nhiên': [
      { vi: 'mặt trăng', en: 'moon', e: '🌙' }, { vi: 'ngôi sao', en: 'star', e: '⭐' },
      { vi: 'cái cây', en: 'tree', e: '🌳' }, { vi: 'bông hoa', en: 'flower', e: '🌼' },
      { vi: 'ngọn núi', en: 'mountain', e: '⛰️' }, { vi: 'biển', en: 'sea', e: '🌊' },
      { vi: 'chiếc lá', en: 'leaf', e: '🍃' }, { vi: 'ngọn lửa', en: 'fire', e: '🔥' }
    ],
    'con vật to': [
      { vi: 'sư tử', en: 'lion', e: '🦁' }, { vi: 'con hổ', en: 'tiger', e: '🐯' },
      { vi: 'con khỉ', en: 'monkey', e: '🐵' }, { vi: 'con gấu', en: 'bear', e: '🐻' },
      { vi: 'con ngựa', en: 'horse', e: '🐴' }, { vi: 'con hươu cao cổ', en: 'giraffe', e: '🦒' },
      { vi: 'con cá sấu', en: 'crocodile', e: '🐊' }, { vi: 'con cá heo', en: 'dolphin', e: '🐬' }
    ]
  };

  function tatCaChuDe() {
    var goc = (global.TiengVietMN && global.TiengVietMN.CHU_DE) || {};
    var ds = {};
    Object.keys(goc).forEach(function (k) { ds[k] = goc[k]; });
    Object.keys(RIENG).forEach(function (k) { ds[k] = RIENG[k]; });
    return ds;
  }

  var CHU_DE = tatCaChuDe();

  function tuCua(ten) {
    if (ten && CHU_DE[ten]) return CHU_DE[ten];
    var het = [];
    Object.keys(CHU_DE).forEach(function (k) { het = het.concat(CHU_DE[k]); });
    return het;
  }

  // n từ khác với "loaiTru". Loại cả theo từ tiếng Anh lẫn theo hình: hai từ
  // trùng hình thì bé nhìn hình không phân biệt nổi, chọn đúng vẫn bị chấm sai.
  function khac(ds, n, loaiTru) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && x.en !== loaiTru.en && x.e !== loaiTru.e) ket.push(x);
    });
    return ket;
  }

  function the(t) {
    return '<span class="anh-tu">' + t.e + '</span><span class="nhan">' + t.en + '</span>';
  }

  /* --- nhìn hình, chọn từ tiếng Anh --- */

  function nhinChon(ten) {
    var ds = tuCua(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: 'Cái này tiếng Anh gọi là gì?',
      art: '<span class="anh-to">' + dung.e + '</span>',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(function (x) { return x.en; })),
      answer: dung.en,
      // một cột: từ tiếng Anh như "watermelon" xếp ba cột là tràn khỏi màn
      cols: 1,
      speak: dung.en,
      tieng: 'en',
      mach: 'Nhìn hình chọn từ'
    };
  }

  /* --- nghe từ, chọn hình --- */

  function ngheChon(ten) {
    var ds = tuCua(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: 'Nghe rồi chọn đúng hình nhé!',
      speak: dung.en,
      tieng: 'en',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(the)),
      answer: the(dung),
      cols: 3,
      mach: 'Nghe chọn hình'
    };
  }

  /* --- từ tiếng Anh này nghĩa là gì --- */

  function nghiaViet(ten) {
    var ds = tuCua(ten);
    var dung = chon(ds);
    var sai = khac(ds, 2, dung);
    return {
      prompt: '<b class="tu-anh">' + dung.en + '</b> nghĩa là gì?',
      speak: dung.en,
      tieng: 'en',
      choices: Q.shuffle([dung, sai[0], sai[1]].filter(Boolean).map(function (x) { return x.vi; })),
      answer: dung.vi,
      cols: 1,
      mach: 'Hiểu nghĩa'
    };
  }

  function tron(ten) {
    return function () {
      var x = Math.random();
      if (x < 0.4) return nhinChon(ten);
      if (x < 0.8) return ngheChon(ten);
      return nghiaViet(ten);
    };
  }

  global.TiengAnh = {
    CHU_DE: CHU_DE,
    tuCua: tuCua,
    nhinChon: nhinChon,
    ngheChon: ngheChon,
    nghiaViet: nghiaViet,
    tron: tron
  };
})(window);
