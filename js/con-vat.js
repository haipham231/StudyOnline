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
    { ten: 'con sóc',    e: '🐿️', an: { ten: 'hạt dẻ',      e: '🌰' }, o: 'can',  keu: null }
  ];

  var NOI_SONG = {
    nuoc: { e: '💧', ten: 'dưới nước' },
    can:  { e: '🌳', ten: 'trên cạn' },
    troi: { e: '☁️', ten: 'trên trời' }
  };

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
    return '<span class="nhun">' + con.e + '</span>';
  }

  global.ConVat = {
    veCon: veCon,
    DS: CON_VAT,
    NOI_SONG: NOI_SONG,
    nut: nut,
    nhieu: nhieu,
    coTiengKeu: CON_VAT.filter(function (c) { return c.keu; })
  };
})(window);
