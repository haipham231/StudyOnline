/* ===== Bộ sinh đề Tiếng Việt lớp 1 =====
   Bám chương trình Tiếng Việt 1 (GDPT 2018): âm và vần, thanh điệu, quy tắc
   chính tả, phân biệt tiếng dễ lẫn, từ và câu.
   Mọi câu đều là dạng bấm chọn vì bé lớp 1 chưa gõ chữ.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var r = Q.randInt, chon = Q.pick;

  function tron(dung, cacSai, n) {
    var set = [dung];
    Q.shuffle(cacSai).forEach(function (v) {
      if (set.length < n && set.indexOf(v) === -1) set.push(v);
    });
    return Q.shuffle(set);
  }

  /* ================= ÂM, VẦN VÀ THANH ================= */

  var THANH = [
    { ten: 'thanh ngang', dau: '' }, { ten: 'thanh huyền', dau: '̀' },
    { ten: 'thanh sắc', dau: '́' }, { ten: 'thanh hỏi', dau: '̉' },
    { ten: 'thanh ngã', dau: '̃' }, { ten: 'thanh nặng', dau: '̣' }
  ];

  // tiếng có nghĩa, ghép từ âm đầu + vần + thanh
  var TIENG = [
    { a: 'b', v: 'a', t: 'thanh huyền', kq: 'bà', nghia: 'bà nội' },
    { a: 'b', v: 'e', t: 'thanh sắc', kq: 'bé', nghia: 'em bé' },
    { a: 'b', v: 'o', t: 'thanh huyền', kq: 'bò', nghia: 'con bò' },
    { a: 'c', v: 'a', t: 'thanh sắc', kq: 'cá', nghia: 'con cá' },
    { a: 'c', v: 'o', t: 'thanh huyền', kq: 'cò', nghia: 'con cò' },
    { a: 'd', v: 'ê', t: 'thanh ngang', kq: 'dê', nghia: 'con dê' },
    { a: 'đ', v: 'a', t: 'thanh sắc', kq: 'đá', nghia: 'hòn đá' },
    { a: 'g', v: 'a', t: 'thanh huyền', kq: 'gà', nghia: 'con gà' },
    { a: 'h', v: 'e', t: 'thanh huyền', kq: 'hè', nghia: 'mùa hè' },
    { a: 'l', v: 'a', t: 'thanh sắc', kq: 'lá', nghia: 'lá cây' },
    { a: 'm', v: 'e', t: 'thanh nặng', kq: 'mẹ', nghia: 'mẹ của bé' },
    { a: 'n', v: 'a', t: 'thanh ngang', kq: 'na', nghia: 'quả na' },
    { a: 'n', v: 'ơ', t: 'thanh ngang', kq: 'nơ', nghia: 'chiếc nơ' },
    { a: 'r', v: 'ô', t: 'thanh hỏi', kq: 'rổ', nghia: 'cái rổ' },
    { a: 's', v: 'e', t: 'thanh hỏi', kq: 'sẻ', nghia: 'chim sẻ' },
    { a: 't', v: 'ô', t: 'thanh hỏi', kq: 'tổ', nghia: 'tổ chim' },
    { a: 'v', v: 'e', t: 'thanh ngã', kq: 'vẽ', nghia: 'vẽ tranh' },
    { a: 'x', v: 'e', t: 'thanh ngang', kq: 'xe', nghia: 'xe đạp' },
    { a: 'ph', v: 'ơ', t: 'thanh hỏi', kq: 'phở', nghia: 'bát phở' },
    { a: 'ch', v: 'e', t: 'thanh ngang', kq: 'che', nghia: 'che nắng' },
    { a: 'kh', v: 'e', t: 'thanh ngang', kq: 'khe', nghia: 'khe suối' },
    { a: 'th', v: 'ơ', t: 'thanh ngang', kq: 'thơ', nghia: 'bài thơ' },
    { a: 'nh', v: 'a', t: 'thanh huyền', kq: 'nhà', nghia: 'ngôi nhà' },
    { a: 'tr', v: 'e', t: 'thanh ngang', kq: 'tre', nghia: 'cây tre' }
  ];

  function dauThanh(ten) {
    for (var i = 0; i < THANH.length; i++) if (THANH[i].ten === ten) return THANH[i].dau;
    return '';
  }

  // đặt dấu thanh lên nguyên âm rồi chuẩn hoá về một ký tự
  function datThanh(amDau, van, thanhTen) {
    return (amDau + van + dauThanh(thanhTen)).normalize('NFC');
  }

  function ghepVan() {
    var t = chon(TIENG);
    var sai = [];
    THANH.forEach(function (th) {
      if (th.ten !== t.t) sai.push(datThanh(t.a, t.v, th.ten));
    });

    return {
      prompt: 'Ghép tiếng: <b>' + t.a + '</b> + <b>' + t.v + '</b> + <b>' + t.t + '</b>',
      speak: 'Ghép tiếng ' + t.a + ' với ' + t.v + ' và ' + t.t,
      answer: t.kq, choices: tron(t.kq, sai, 4), cols: 4,
      mach: 'Ghép vần'
    };
  }

  function timThanh() {
    var t = chon(TIENG);
    var sai = THANH.filter(function (th) { return th.ten !== t.t; }).map(function (th) { return th.ten; });
    return {
      prompt: 'Tiếng <b>' + t.kq + '</b> <small>(' + t.nghia + ')</small> mang thanh gì?',
      speak: 'Tiếng ' + t.kq + ' mang thanh gì?',
      answer: t.t, choices: tron(t.t, sai, 4), cols: 2,
      mach: 'Thanh điệu'
    };
  }

  function timAmDau() {
    var t = chon(TIENG);
    var sai = Q.shuffle(TIENG.map(function (x) { return x.a; })
      .filter(function (a) { return a !== t.a; }));
    return {
      prompt: 'Tiếng <b>' + t.kq + '</b> có âm đầu là gì?',
      speak: 'Tiếng ' + t.kq + ' có âm đầu là gì?',
      answer: t.a, choices: tron(t.a, sai, 4), cols: 4,
      mach: 'Âm đầu'
    };
  }

  /* ---- vần của tiếng ---- */

  var TIENG_VAN = [
    { tieng: 'bàn', van: 'an' }, { tieng: 'bánh', van: 'anh' }, { tieng: 'bóng', van: 'ong' },
    { tieng: 'căn', van: 'ăn' }, { tieng: 'cân', van: 'ân' }, { tieng: 'con', van: 'on' },
    { tieng: 'hoa', van: 'oa' }, { tieng: 'mai', van: 'ai' }, { tieng: 'máy', van: 'ay' },
    { tieng: 'mèo', van: 'eo' }, { tieng: 'mưa', van: 'ưa' }, { tieng: 'nắng', van: 'ăng' },
    { tieng: 'ngôi', van: 'ôi' }, { tieng: 'sông', van: 'ông' }, { tieng: 'tay', van: 'ay' },
    { tieng: 'thuyền', van: 'uyên' }, { tieng: 'trăng', van: 'ăng' }, { tieng: 'vui', van: 'ui' },
    { tieng: 'xinh', van: 'inh' }, { tieng: 'yêu', van: 'êu' }
  ];

  function timVan() {
    var t = chon(TIENG_VAN);
    var sai = Q.shuffle(TIENG_VAN.map(function (x) { return x.van; })
      .filter(function (v) { return v !== t.van; }));
    return {
      prompt: 'Tiếng <b>' + t.tieng + '</b> có vần gì?',
      speak: 'Tiếng ' + t.tieng + ' có vần gì?',
      answer: t.van, choices: tron(t.van, sai, 4), cols: 4,
      mach: 'Vần'
    };
  }

  /* ================= CHỮ HOA — CHỮ THƯỜNG ================= */

  var CHU_CAI = 'aăâbcdđeêghiklmnoôơpqrstuưvxy'.split('');

  function chuHoaThuong() {
    var c = chon(CHU_CAI);
    var hoiHoa = Math.random() < 0.5;
    var sai = Q.shuffle(CHU_CAI.filter(function (x) { return x !== c; }))
      .slice(0, 6).map(function (x) { return hoiHoa ? x.toUpperCase() : x; });

    return {
      prompt: hoiHoa
        ? 'Chữ <b>hoa</b> của chữ <b>' + c + '</b> là chữ nào?'
        : 'Chữ <b>thường</b> của chữ <b>' + c.toUpperCase() + '</b> là chữ nào?',
      speak: hoiHoa ? 'Chữ hoa của chữ ' + c + ' là chữ nào?'
                    : 'Chữ thường của chữ ' + c + ' là chữ nào?',
      answer: hoiHoa ? c.toUpperCase() : c,
      choices: tron(hoiHoa ? c.toUpperCase() : c, sai, 4), cols: 4,
      mach: 'Chữ cái'
    };
  }

  /* ================= QUY TẮC CHÍNH TẢ ================= */

  // k/gh/ngh đi với i, e, ê; còn lại dùng c/g/ng
  var QUY_TAC = [
    { cap: ['c', 'k'], hep: 'k', rong: 'c',
      tu: [['…á', 'a'], ['…ô', 'o'], ['…ơm', 'o'], ['…ũ', 'u'], ['…ì', 'i'], ['…ê', 'ê'], ['…em', 'e'], ['…ể', 'ê']] },
    { cap: ['g', 'gh'], hep: 'gh', rong: 'g',
      tu: [['…à', 'a'], ['…ỗ', 'ô'], ['…ói', 'o'], ['…i', 'i'], ['…ế', 'ê'], ['…e', 'e'], ['…ẹ', 'e']] },
    { cap: ['ng', 'ngh'], hep: 'ngh', rong: 'ng',
      tu: [['…à', 'a'], ['…ô', 'ô'], ['…ủ', 'u'], ['…e', 'e'], ['…ĩ', 'i'], ['…é', 'e'], ['…ỉ', 'i']] }
  ];

  function quyTacChinhTa() {
    var q = chon(QUY_TAC);
    var t = chon(q.tu);
    var hep = 'ieê'.indexOf(t[1]) !== -1;
    var dung = hep ? q.hep : q.rong;
    var sai = hep ? q.rong : q.hep;

    return {
      prompt: 'Điền vào chỗ trống: <b>' + t[0] + '</b>',
      speak: 'Điền ' + q.cap[0] + ' hay ' + q.cap[1] + ' vào chỗ trống',
      art: '<span class="go-y">' + (hep
        ? q.hep + ' đi với i, e, ê'
        : q.rong + ' đi với các chữ còn lại') + '</span>',
      answer: dung, choices: Q.shuffle([dung, sai]), cols: 2,
      mach: 'Quy tắc chính tả'
    };
  }

  /* ================= TIẾNG DỄ LẪN ================= */

  // mỗi cặp: [viết đúng, viết sai]
  var DE_LAN = {
    's / x': [['xinh đẹp', 'sinh đẹp'], ['sâu bọ', 'xâu bọ'], ['xe đạp', 'se đạp'],
              ['quyển sách', 'quyển xách'], ['dòng sông', 'dòng xông'], ['xôi gấc', 'sôi gấc'],
              ['ngôi sao', 'ngôi xao'], ['xa xôi', 'sa sôi']],
    'ch / tr': [['con trâu', 'con châu'], ['cây tre', 'cây che'], ['con chó', 'con tró'],
                ['quả chuối', 'quả truối'], ['trường học', 'chường học'], ['chăm chỉ', 'trăm chỉ'],
                ['trời mưa', 'chời mưa'], ['chim sẻ', 'trim sẻ']],
    'l / n': [['quả na', 'quả la'], ['lá cây', 'ná cây'], ['làng quê', 'nàng quê'],
              ['nước mắt', 'lước mắt'], ['lúa chín', 'núa chín'], ['nói chuyện', 'lói chuyện'],
              ['con nai', 'con lai'], ['lời nói', 'nời lói']],
    'd / gi / r': [['gia đình', 'da đình'], ['dạy học', 'giạy học'], ['rổ rá', 'dổ dá'],
                   ['giúp đỡ', 'dúp đỡ'], ['da thịt', 'gia thịt'], ['rau cải', 'dau cải'],
                   ['giấc ngủ', 'dấc ngủ'], ['dòng nước', 'giòng nước']],
    'dấu hỏi / dấu ngã': [['suy nghĩ', 'suy nghỉ'], ['nghỉ ngơi', 'nghĩ ngơi'],
                          ['cửa sổ', 'cữa sỗ'], ['sửa chữa', 'sữa chửa'],
                          ['vẽ tranh', 'vẻ tranh'], ['củ khoai', 'cũ khoai'],
                          ['mãi mãi', 'mải mải'], ['sẵn sàng', 'sẳn sàng']]
  };

  function vietDung(nhom) {
    var ds = nhom ? DE_LAN[nhom] : DE_LAN[chon(Object.keys(DE_LAN))];
    var c = chon(ds);
    return {
      prompt: 'Từ nào <b>viết đúng</b>?',
      speak: 'Từ nào viết đúng?',
      answer: c[0], choices: Q.shuffle([c[0], c[1]]), cols: 2,
      mach: 'Chính tả'
    };
  }

  /* ================= TỪ VÀ CÂU ================= */

  var TU_LOAI = {
    'chỉ sự vật': ['quyển sách', 'cái bàn', 'con mèo', 'bông hoa', 'ngôi nhà', 'cây bút', 'quả táo', 'con chim'],
    'chỉ hoạt động': ['chạy', 'nhảy', 'hát', 'đọc', 'viết', 'ăn', 'ngủ', 'bơi'],
    'chỉ đặc điểm': ['xanh', 'đỏ', 'cao', 'thấp', 'to', 'nhỏ', 'đẹp', 'ngoan']
  };

  function timTuLoai() {
    var cacLoai = Object.keys(TU_LOAI);
    var loai = chon(cacLoai);
    var dung = chon(TU_LOAI[loai]);
    var sai = [];
    cacLoai.forEach(function (l) {
      if (l !== loai) sai = sai.concat(Q.shuffle(TU_LOAI[l]).slice(0, 2));
    });

    return {
      prompt: 'Từ nào là từ <b>' + loai + '</b>?',
      speak: 'Từ nào là từ ' + loai + '?',
      answer: dung, choices: tron(dung, sai, 4), cols: 2,
      mach: 'Từ loại'
    };
  }

  var TRAI_NGHIA = [
    ['cao', 'thấp'], ['to', 'nhỏ'], ['dài', 'ngắn'], ['nóng', 'lạnh'],
    ['sáng', 'tối'], ['nhanh', 'chậm'], ['vui', 'buồn'], ['đầy', 'vơi'],
    ['trong', 'ngoài'], ['trước', 'sau'], ['lên', 'xuống'], ['nhiều', 'ít']
  ];

  function traiNghia() {
    var c = chon(TRAI_NGHIA);
    var dao = Math.random() < 0.5;
    var hoi = dao ? c[1] : c[0], dung = dao ? c[0] : c[1];

    var sai = Q.shuffle(TRAI_NGHIA.reduce(function (t, x) { return t.concat(x); }, []))
      .filter(function (t) { return t !== hoi && t !== dung; });

    return {
      prompt: 'Từ nào <b>trái nghĩa</b> với từ <b>' + hoi + '</b>?',
      speak: 'Từ nào trái nghĩa với từ ' + hoi + '?',
      answer: dung, choices: tron(dung, sai, 4), cols: 4,
      mach: 'Từ trái nghĩa'
    };
  }

  var CAU_MAU = [
    { tu: ['Bé', 'đi', 'học'], cau: 'Bé đi học.' },
    { tu: ['Mẹ', 'nấu', 'cơm'], cau: 'Mẹ nấu cơm.' },
    { tu: ['Chim', 'hót', 'líu lo'], cau: 'Chim hót líu lo.' },
    { tu: ['Em', 'yêu', 'bà'], cau: 'Em yêu bà.' },
    { tu: ['Bố', 'đọc', 'báo'], cau: 'Bố đọc báo.' },
    { tu: ['Cô', 'dạy', 'em'], cau: 'Cô dạy em.' },
    { tu: ['Gà', 'gáy', 'sáng'], cau: 'Gà gáy sáng.' },
    { tu: ['Bé', 'vẽ', 'tranh'], cau: 'Bé vẽ tranh.' }
  ];

  function sapXepCau() {
    var c = chon(CAU_MAU);
    var sai = [];
    for (var i = 0; i < 6; i++) {
      var tron_ = Q.shuffle(c.tu).join(' ') + '.';
      if (tron_ !== c.cau && sai.indexOf(tron_) === -1) sai.push(tron_);
    }
    // câu sai thêm: không viết hoa, thiếu dấu chấm
    sai.push(c.cau.toLowerCase());
    sai.push(c.cau.replace('.', ''));

    return {
      prompt: 'Sắp xếp các từ <b>' + c.tu.join(' · ') + '</b> thành câu đúng',
      speak: 'Sắp xếp thành câu đúng: ' + c.tu.join(', '),
      answer: c.cau, choices: tron(c.cau, sai, 4), cols: 1,
      mach: 'Câu'
    };
  }

  var CAU_HOI_DAU = [
    { cau: 'Bé tên là gì', dau: '?' }, { cau: 'Em đi học', dau: '.' },
    { cau: 'Mẹ đang nấu cơm', dau: '.' }, { cau: 'Con mèo ở đâu', dau: '?' },
    { cau: 'Hôm nay trời nắng', dau: '.' }, { cau: 'Ai là bạn của em', dau: '?' },
    { cau: 'Bà kể chuyện cho bé nghe', dau: '.' }, { cau: 'Quyển sách này của ai', dau: '?' }
  ];

  function dauCau() {
    var c = chon(CAU_HOI_DAU);
    return {
      prompt: 'Cuối câu <b>“' + c.cau + '”</b> điền dấu gì?',
      speak: 'Cuối câu ' + c.cau + ' điền dấu gì?',
      answer: c.dau === '?' ? 'dấu chấm hỏi (?)' : 'dấu chấm (.)',
      choices: Q.shuffle(['dấu chấm (.)', 'dấu chấm hỏi (?)']), cols: 2,
      mach: 'Dấu câu'
    };
  }

  function demTieng() {
    var c = chon(CAU_MAU);
    var so = c.cau.replace('.', '').trim().split(/\s+/).length;
    var sai = [so - 1, so + 1, so + 2, so - 2].filter(function (v) { return v > 0; }).map(String);
    return {
      prompt: 'Câu <b>“' + c.cau + '”</b> có mấy tiếng?',
      speak: 'Câu ' + c.cau + ' có mấy tiếng?',
      answer: String(so), choices: tron(String(so), sai, 4), cols: 4,
      mach: 'Câu'
    };
  }

  /* ================= ĐỌC HIỂU ================= */

  var DOAN_VAN = [
    { doan: 'Nhà bé có một con mèo tam thể. Mèo rất thích nằm sưởi nắng ngoài sân.',
      hoi: 'Con mèo thích làm gì?', dung: 'Nằm sưởi nắng ngoài sân',
      sai: ['Bắt chuột trong bếp', 'Chạy chơi ngoài đường', 'Ngủ trên giường của bé'] },
    { doan: 'Sáng nay trời mưa to. Bé mặc áo mưa rồi cùng mẹ đi học.',
      hoi: 'Vì sao bé phải mặc áo mưa?', dung: 'Vì trời mưa to',
      sai: ['Vì trời nắng gắt', 'Vì trời rất lạnh', 'Vì bé thích áo mưa'] },
    { doan: 'Trong vườn, bà trồng rất nhiều hoa. Đẹp nhất là khóm hoa hồng đỏ thắm.',
      hoi: 'Khóm hoa nào đẹp nhất trong vườn?', dung: 'Khóm hoa hồng đỏ thắm',
      sai: ['Khóm hoa cúc vàng', 'Khóm hoa mai trắng', 'Khóm hoa sen hồng'] },
    { doan: 'Bé rất thích đọc sách. Mỗi tối, bé đọc truyện cho em nghe trước khi đi ngủ.',
      hoi: 'Mỗi tối bé làm gì?', dung: 'Đọc truyện cho em nghe',
      sai: ['Xem phim hoạt hình', 'Chơi với bạn ngoài ngõ', 'Vẽ tranh cùng mẹ'] },
    { doan: 'Chú gà trống nhà em dậy rất sớm. Chú gáy vang gọi mọi người thức dậy.',
      hoi: 'Chú gà trống làm gì vào buổi sáng?', dung: 'Gáy vang gọi mọi người thức dậy',
      sai: ['Đi kiếm mồi trong vườn', 'Nằm ngủ trong chuồng', 'Chạy theo đàn gà con'] }
  ];

  function docHieu() {
    var d = chon(DOAN_VAN);
    return {
      prompt: '<span class="doan-van">' + d.doan + '</span><br>' + d.hoi,
      speak: d.doan + ' ' + d.hoi,
      answer: d.dung, choices: tron(d.dung, d.sai, 4), cols: 1,
      mach: 'Đọc hiểu'
    };
  }

  global.TiengVietL1 = {
    ghepVan: ghepVan, timThanh: timThanh, timAmDau: timAmDau, timVan: timVan,
    chuHoaThuong: chuHoaThuong, quyTacChinhTa: quyTacChinhTa,
    vietDung: vietDung,
    vietDungSX: function () { return vietDung('s / x'); },
    vietDungChTr: function () { return vietDung('ch / tr'); },
    vietDungLN: function () { return vietDung('l / n'); },
    vietDungDGiR: function () { return vietDung('d / gi / r'); },
    vietDungHoiNga: function () { return vietDung('dấu hỏi / dấu ngã'); },
    timTuLoai: timTuLoai, traiNghia: traiNghia, sapXepCau: sapXepCau,
    dauCau: dauCau, demTieng: demTieng, docHieu: docHieu,
    DE_LAN: DE_LAN
  };
})(window);
