/* ===== Dữ liệu con vật dùng chung cho khu Mầm non ===== */
(function (global) {
  'use strict';

  // o: nơi sống — 'nuoc' | 'can' | 'troi'
  var CON_VAT = [
    { ten: 'con thỏ',    e: '🐰', lt: 'tho', an: { ten: 'củ cà rốt',    e: '🥕' }, o: 'can',  keu: null },
    { ten: 'con chó',    e: '🐶', lt: 'cho', an: { ten: 'khúc xương',   e: '🦴' }, o: 'can',  keu: 'gâu gâu' },
    { ten: 'con mèo',    e: '🐱', lt: 'meo', an: { ten: 'con cá',       e: '🐟' }, o: 'can',  keu: 'meo meo' },
    { ten: 'con khỉ',    e: '🐵', an: { ten: 'quả chuối',    e: '🍌' }, o: 'can',  keu: null },
    { ten: 'con gấu',    e: '🐻', an: { ten: 'mật ong',      e: '🍯' }, o: 'can',  keu: null },
    { ten: 'con chuột',  e: '🐭', an: { ten: 'miếng phô mai', e: '🧀' }, o: 'can', keu: 'chít chít' },
    { ten: 'con bò',     e: '🐮', lt: 'bo', an: { ten: 'bó cỏ',        e: '🌿' }, o: 'can',  keu: 'ò ò' },
    { ten: 'con gà',     e: '🐔', an: { ten: 'hạt thóc',     e: '🌾' }, o: 'can',  keu: 'ó ó o' },
    { ten: 'con chim',   e: '🐦', lt: 'chim', an: { ten: 'con sâu',      e: '🐛' }, o: 'troi', keu: 'líu lo' },
    { ten: 'gấu trúc',   e: '🐼', an: { ten: 'cây tre',      e: '🎋' }, o: 'can',  keu: null },
    { ten: 'con voi',    e: '🐘', lt: 'voi', an: { ten: 'lá cây',       e: '🍃' }, o: 'can',  keu: null },
    { ten: 'con cá',     e: '🐠', an: { ten: 'con giun',     e: '🪱' }, o: 'nuoc', keu: null },
    { ten: 'con vịt',    e: '🦆', an: { ten: 'hạt thóc',     e: '🌾' }, o: 'nuoc', keu: 'cạp cạp' },
    { ten: 'con lợn',    e: '🐷', lt: 'lon', an: { ten: 'bắp ngô',      e: '🌽' }, o: 'can',  keu: 'ụt ịt' },
    { ten: 'sư tử',      e: '🦁', an: { ten: 'miếng thịt',   e: '🥩' }, o: 'can',  keu: 'gầm gừ' },
    { ten: 'con ếch',    e: '🐸', an: { ten: 'con ruồi',     e: '🪰' }, o: 'nuoc', keu: 'ộp ộp' },
    { ten: 'con ong',    e: '🐝', an: { ten: 'bông hoa',     e: '🌼' }, o: 'troi', keu: 'vo ve' },
    { ten: 'con cừu',    e: '🐑', an: { ten: 'bó cỏ',        e: '🌿' }, o: 'can',  keu: 'be be' },
    { ten: 'con ngựa',   e: '🐴', an: { ten: 'bó cỏ',        e: '🌿' }, o: 'can',  keu: 'hí hí' },
    { ten: 'con bướm',   e: '🦋', an: { ten: 'bông hoa',     e: '🌼' }, o: 'troi', keu: null },
    { ten: 'con rùa',    e: '🐢', an: { ten: 'lá rau',       e: '🥬' }, o: 'nuoc', keu: null },
    { ten: 'con sóc',    e: '🐿️', an: { ten: 'hạt dẻ',      e: '🌰' }, o: 'can',  keu: null },

    /* --- dưới biển --- */
    { ten: 'cá heo',     e: '🐬', an: { ten: 'con cá nhỏ',  e: '🐠' }, o: 'nuoc', keu: null },
    { ten: 'cá voi',     e: '🐳', an: { ten: 'con tôm',     e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'cá mập',     e: '🦈', an: { ten: 'con cá nhỏ',  e: '🐠' }, o: 'nuoc', keu: null },
    { ten: 'bạch tuộc',  e: '🐙', an: { ten: 'con cua',     e: '🦀' }, o: 'nuoc', keu: null },
    { ten: 'con cua',    e: '🦀', an: { ten: 'con tôm',     e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'con tôm',    e: '🦐', an: { ten: 'lá rau',      e: '🥬' }, o: 'nuoc', keu: null },
    { ten: 'con mực',    e: '🦑', an: { ten: 'con tôm',     e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'con sứa',    e: '🪼', an: { ten: 'con tôm',     e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'hải cẩu',    e: '🦭', an: { ten: 'con cá nhỏ',  e: '🐠' }, o: 'nuoc', keu: null },
    { ten: 'cá sấu',     e: '🐊', an: { ten: 'con cá nhỏ',  e: '🐠' }, o: 'nuoc', keu: null },
    { ten: 'chim cánh cụt', e: '🐧', an: { ten: 'con cá nhỏ', e: '🐠' }, o: 'nuoc', keu: null },

    /* --- thú rừng --- */
    { ten: 'con sói',    e: '🐺', an: { ten: 'miếng thịt',  e: '🥩' }, o: 'can',  keu: 'hú u u' },
    { ten: 'con cáo',    e: '🦊', an: { ten: 'quả nho',     e: '🍇' }, o: 'can',  keu: null },
    { ten: 'con nai',    e: '🦌', an: { ten: 'lá cây',      e: '🍃' }, o: 'can',  keu: null },
    { ten: 'ngựa vằn',   e: '🦓', an: { ten: 'bó cỏ',       e: '🌿' }, o: 'can',  keu: null },
    { ten: 'tê giác',    e: '🦏', an: { ten: 'bó cỏ',       e: '🌿' }, o: 'can',  keu: null },
    { ten: 'hà mã',      e: '🦛', an: { ten: 'quả dưa hấu', e: '🍉' }, o: 'can',  keu: null },
    { ten: 'lạc đà',     e: '🐫', an: { ten: 'lá cây',      e: '🍃' }, o: 'can',  keu: null },
    { ten: 'kangaroo',   e: '🦘', an: { ten: 'bó cỏ',       e: '🌿' }, o: 'can',  keu: null },
    { ten: 'con lười',   e: '🦥', an: { ten: 'lá cây',      e: '🍃' }, o: 'can',  keu: null },
    { ten: 'con nhím',   e: '🦔', an: { ten: 'quả táo',     e: '🍎' }, o: 'can',  keu: null },
    { ten: 'khỉ đột',    e: '🦍', an: { ten: 'quả chuối',   e: '🍌' }, o: 'can',  keu: null },
    { ten: 'hươu cao cổ', e: '🦒', an: { ten: 'lá cây',     e: '🍃' }, o: 'can',  keu: null },
    { ten: 'con rắn',    e: '🐍', an: { ten: 'con chuột',   e: '🐭' }, o: 'can',  keu: 'xì xì' },
    { ten: 'con dê',     e: '🐐', an: { ten: 'bó cỏ',       e: '🌿' }, o: 'can',  keu: 'be he' },

    /* --- trên trời --- */
    { ten: 'đại bàng',   e: '🦅', an: { ten: 'con chuột',   e: '🐭' }, o: 'troi', keu: null },
    { ten: 'con cú',     e: '🦉', an: { ten: 'con chuột',   e: '🐭' }, o: 'troi', keu: 'cú cú' },
    { ten: 'con công',   e: '🦚', an: { ten: 'bắp ngô',     e: '🌽' }, o: 'troi', keu: null },
    { ten: 'con vẹt',    e: '🦜', an: { ten: 'quả xoài',    e: '🥭' }, o: 'troi', keu: null },
    { ten: 'con dơi',    e: '🦇', an: { ten: 'quả xoài',    e: '🥭' }, o: 'troi', keu: null },
    { ten: 'con kiến',   e: '🐜', an: { ten: 'quả dâu tây', e: '🍓' }, o: 'can',  keu: null },
    { ten: 'bọ rùa',     e: '🐞', an: { ten: 'lá cây',      e: '🍃' }, o: 'can',  keu: null },
    { ten: 'ốc sên',     e: '🐌', an: { ten: 'quả dưa chuột', e: '🥒' }, o: 'can', keu: null },

    /* --- có hình riêng, không emoji nào tả đúng --- */
    { ten: 'con hổ',        hinh: 'dan/con-vat/ho',             an: { ten: 'miếng thịt', e: '🥩' }, o: 'can',  keu: 'gầm' },
    { ten: 'con báo',       hinh: 'dan/con-vat/bao',            an: { ten: 'miếng thịt', e: '🥩' }, o: 'can',  keu: null },
    { ten: 'gấu bắc cực',   hinh: 'dan/con-vat/gau-bac-cuc',    an: { ten: 'con cá',     e: '🐟' }, o: 'can',  keu: null },
    { ten: 'gấu nâu',       hinh: 'dan/con-vat/gau-nau',        an: { ten: 'mật ong',    e: '🍯' }, o: 'can',  keu: null },
    { ten: 'gấu mèo',       hinh: 'dan/con-vat/gau-meo',        an: { ten: 'quả táo',    e: '🍎' }, o: 'can',  keu: null },
    { ten: 'con hải ly',    hinh: 'dan/con-vat/hai-ly',         an: { ten: 'cây tre',    e: '🎋' }, o: 'nuoc', keu: null },
    { ten: 'nai sừng tấm',  hinh: 'dan/con-vat/nai-sung-tam',   an: { ten: 'lá cây',     e: '🍃' }, o: 'can',  keu: null },
    { ten: 'sóc đỏ',        hinh: 'dan/con-vat/soc-do',         an: { ten: 'hạt dẻ',     e: '🌰' }, o: 'can',  keu: null },
    { ten: 'cá voi xanh',   hinh: 'dan/con-vat/ca-voi-xanh',    an: { ten: 'con tôm',    e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'cá voi lưng gù', hinh: 'dan/con-vat/ca-voi-lung-gu', an: { ten: 'con tôm',   e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'cá nhà táng',   hinh: 'dan/con-vat/ca-nha-tang',    an: { ten: 'con mực',    e: '🦑' }, o: 'nuoc', keu: null },
    { ten: 'cá voi sát thủ', hinh: 'dan/con-vat/ca-voi-sat-thu', an: { ten: 'con cá nhỏ', e: '🐠' }, o: 'nuoc', keu: null },
    { ten: 'lươn biển',     hinh: 'dan/con-vat/luon-bien',      an: { ten: 'con tôm',    e: '🦐' }, o: 'nuoc', keu: null },
    { ten: 'sao biển',      hinh: 'dan/con-vat/sao-bien',       an: { ten: 'con sò',     e: '🐚' }, o: 'nuoc', keu: null },
    { ten: 'nhím biển',     hinh: 'dan/con-vat/nhim-bien',      an: { ten: 'lá rau',     e: '🥬' }, o: 'nuoc', keu: null },
    { ten: 'cá đuối',       hinh: 'dan/con-vat/ca-duoi',        an: { ten: 'con cua',    e: '🦀' }, o: 'nuoc', keu: null }
  ];

  var NOI_SONG = {
    nuoc: { e: '🌊', ten: 'dưới nước' },
    can:  { e: '🌳', ten: 'trên cạn' },
    troi: { e: '☁️', ten: 'trên trời' }
  };

  /* ===== Nơi sống cụ thể, cho game kéo thả =====

     Ba ô "dưới nước / trên cạn / trên trời" ở trên vẫn giữ cho trang nào còn
     dùng, nhưng quá chung: con khỉ với con lạc đà đều "trên cạn" mà nhà hai
     bạn khác nhau một trời một vực. Bảng này chia mười nơi cụ thể.

     hinh: tranh vẽ kín nền trong tranh/noi-song/. Trong tranh cố ý không có
           con vật nào — có sẵn con cá trong tranh biển thì bé nhìn là ra đáp
           án, khỏi cần nghĩ.
     nen:  màu nền của ô, hiện thoáng qua lúc tranh chưa tải xong.
     gan:  mấy nơi DỄ NHẦM với nơi này. Không bao giờ đưa chúng ra làm lựa
           chọn sai cùng nhau — con khỉ ở rừng nhiệt đới mà đưa thêm ô rừng
           thường thì người lớn còn ngập ngừng, nói gì bé ba tuổi. */
  var NOI = {
    bien:   { ten: 'dưới biển',            hinh: 'tranh/noi-song/bien',           nen: '#bfe7ff', gan: ['ao'] },
    ao:     { ten: 'ở ao hồ',              hinh: 'tranh/noi-song/ao-ho',          nen: '#cdeedd', gan: ['bien'] },
    bang:   { ten: 'ở xứ băng giá',        hinh: 'tranh/noi-song/bang-gia',       nen: '#e8f4ff', gan: [] },
    rungND: { ten: 'trong rừng nhiệt đới', hinh: 'tranh/noi-song/rung-nhiet-doi', nen: '#c9efc4', gan: ['rung'] },
    thao:   { ten: 'trên thảo nguyên',     hinh: 'tranh/noi-song/thao-nguyen',    nen: '#fbe9b0', gan: ['saMac'] },
    saMac:  { ten: 'ở sa mạc',             hinh: 'tranh/noi-song/sa-mac',         nen: '#fde3b0', gan: ['thao'] },
    rung:   { ten: 'trong rừng',           hinh: 'tranh/noi-song/rung',           nen: '#d4ecd0', gan: ['rungND'] },
    trai:   { ten: 'ở nông trại',          hinh: 'tranh/noi-song/nong-trai',      nen: '#f7e3cf', gan: [] },
    nha:    { ten: 'ở trong nhà',          hinh: 'tranh/noi-song/trong-nha',      nen: '#fde7ef', gan: [] },
    vuon:   { ten: 'trong vườn hoa',       hinh: 'tranh/noi-song/vuon-hoa',       nen: '#ffe9f6', gan: [] }
  };

  /* Nhà của từng con. Để riêng một bảng theo tên chứ không thêm trường vào
     từng dòng CON_VAT ở trên, cho dễ soát cả bảng một lượt.

     Vài chỗ phải chọn:
     - Rùa vào biển vì hình rùa trong kho là rùa biển, vây chèo chứ không phải
       chân.
     - Chim cánh cụt vào xứ băng giá, KHÔNG phải Bắc Cực: nó sống ở Nam Cực,
       Bắc Cực là nhà gấu trắng.
     - Dơi gộp vào rừng chứ không tách riêng hang động: một tranh cho đúng
       một con thì phí, mà dơi cũng ngủ cả trên cây.
     - Gấu trúc vào rừng: rừng tre trên núi, không phải rừng nhiệt đới. */
  var NHA = {
    bien: ['cá heo', 'cá voi', 'cá mập', 'bạch tuộc', 'cua', 'tôm', 'mực', 'sứa',
           'cá voi xanh', 'cá voi lưng gù', 'cá nhà táng', 'cá voi sát thủ',
           'lươn biển', 'sao biển', 'nhím biển', 'cá đuối', 'rùa'],
    ao:     ['cá', 'vịt', 'ếch', 'cá sấu', 'hải ly'],
    bang:   ['chim cánh cụt', 'gấu bắc cực', 'hải cẩu'],
    rungND: ['khỉ', 'khỉ đột', 'vẹt', 'hổ', 'báo', 'rắn', 'lười', 'công'],
    thao:   ['sư tử', 'ngựa vằn', 'hươu cao cổ', 'tê giác', 'hà mã', 'voi', 'kangaroo'],
    saMac:  ['lạc đà'],
    rung:   ['gấu', 'gấu nâu', 'sói', 'cáo', 'nai', 'nai sừng tấm', 'sóc', 'sóc đỏ',
             'nhím', 'cú', 'gấu mèo', 'gấu trúc', 'đại bàng', 'dơi'],
    trai:   ['bò', 'lợn', 'gà', 'cừu', 'ngựa', 'dê'],
    nha:    ['chó', 'mèo', 'thỏ', 'chuột'],
    vuon:   ['ong', 'bướm', 'kiến', 'bọ rùa', 'ốc sên', 'chim']
  };

  /* Khớp tên với hoặc không kèm chữ "con": bảng CON_VAT viết không đều tay,
     "con sư tử" có chữ con mà "gấu trúc" thì không. Khớp một kiểu là sót mất
     ba mươi hai con. */
  (function () {
    var theoTen = {};
    Object.keys(NHA).forEach(function (k) {
      NHA[k].forEach(function (t) { theoTen[t] = k; });
    });
    CON_VAT.forEach(function (c) {
      c.noi = theoTen[c.ten.replace(/^con /, '')] || null;
    });
  })();

  /* Hình của một con: con nào có trường hinh thì trỏ thẳng vào tệp ảnh (mấy
     con không có emoji nào tả đúng), còn lại vẫn đi qua emoji như cũ. */
  function anhCon(con) {
    if (con.hinh && global.HinhVe && global.HinhVe.veTen) {
      return global.HinhVe.veTen(con.hinh);
    }
    return con.e;
  }

  // Khoá phân biệt hai con: dùng cho chỗ bốc đáp án nhiễu, tránh trùng nhau
  function khoaCon(con) { return con.hinh || con.e; }

  // Nút lựa chọn: hình to kèm nhãn chữ nhỏ cho người lớn đọc cùng bé
  function nut(emoji, nhan) {
    return emoji + '<span class="nhan">' + nhan + '</span>';
  }

  // Lấy n phần tử của ds thoả dieuKien, không trùng nhau theo khoá khoa()
  function nhieu(ds, n, khoa, loaiTru) {
    var da = [loaiTru];
    var ket = [];
    var tron = global.Quiz.shuffle(ds);
    for (var i = 0; i < tron.length && ket.length < n; i++) {
      var k = khoa(tron[i]);
      if (da.indexOf(k) === -1) { da.push(k); ket.push(tron[i]); }
    }
    return ket;
  }

  // con nào có hoạt hình thì dùng, còn lại vẫn là emoji
  function veCon(con, cao) {
    if (con.lt && global.HoatHinh) {
      return global.HoatHinh.ve('con-vat/' + con.lt, cao || 120, null);
    }
    return '<span class="nhun">' + anhCon(con) + '</span>';
  }

  global.ConVat = {
    veCon: veCon,
    DS: CON_VAT,
    NOI_SONG: NOI_SONG,
    NOI: NOI,
    anhCon: anhCon,
    khoaCon: khoaCon,
    nut: nut,
    nhieu: nhieu,
    coTiengKeu: CON_VAT.filter(function (c) { return c.keu; })
  };
})(window);
