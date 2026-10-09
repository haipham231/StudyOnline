/* ===== Tiếng Việt lớp 2 — GDPT 2018 =====
   Từ chỉ sự vật / hoạt động / đặc điểm, ba mẫu câu, dấu câu, chính tả
   phân biệt, từ trái nghĩa, sắp xếp câu và đọc hiểu đoạn ngắn.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var chon = Q.pick, r = Q.randInt;

  function nhieu(ds, n, truKhoi, khoa) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && khoa(x) !== khoa(truKhoi)) ket.push(x);
    });
    return ket;
  }

  /* ---------- Từ loại ---------- */

  var TU_LOAI = {
    'chỉ sự vật': ['cái bàn', 'quyển sách', 'con mèo', 'bông hoa', 'ngôi nhà', 'cây bút',
      'dòng sông', 'bạn Lan', 'cơn mưa', 'chiếc xe', 'con đường', 'bầu trời'],
    'chỉ hoạt động': ['chạy', 'nhảy', 'đọc', 'viết', 'hát', 'quét nhà', 'nấu cơm',
      'rửa bát', 'tưới cây', 'học bài', 'đá bóng', 'bơi lội'],
    'chỉ đặc điểm': ['xanh', 'đỏ', 'cao', 'thấp', 'to', 'nhỏ', 'ngoan', 'chăm chỉ',
      'nhanh nhẹn', 'hiền lành', 'sạch sẽ', 'vui vẻ']
  };

  function timTuLoai() {
    var loai = chon(Object.keys(TU_LOAI));
    var tu = chon(TU_LOAI[loai]);
    var sai = Q.shuffle(Object.keys(TU_LOAI).filter(function (l) { return l !== loai; }));
    return {
      prompt: 'Từ <b>“' + tu + '”</b> là từ gì?',
      speak: 'Từ ' + tu + ' là từ gì?',
      answer: 'Từ ' + loai,
      choices: Q.shuffle(['Từ ' + loai, 'Từ ' + sai[0], 'Từ ' + sai[1]]),
      cols: 1, mach: 'Từ loại'
    };
  }

  function chonTuKhacNhom() {
    var loai = chon(Object.keys(TU_LOAI));
    var khac = chon(Object.keys(TU_LOAI).filter(function (l) { return l !== loai; }));
    var cung = Q.shuffle(TU_LOAI[loai]).slice(0, 2);
    var le = chon(TU_LOAI[khac]);
    return {
      prompt: 'Từ nào <b>không cùng nhóm</b> với hai từ kia?',
      speak: 'Từ nào không cùng nhóm với hai từ kia?',
      answer: le, choices: Q.shuffle(cung.concat([le])), cols: 1, mach: 'Từ loại'
    };
  }

  /* ---------- Mẫu câu ---------- */

  var MAU_CAU = [
    { mau: 'Ai là gì?', vd: ['Bạn Lan là học sinh lớp 2.', 'Bố em là bác sĩ.',
      'Con mèo là vật nuôi trong nhà.', 'Hà Nội là thủ đô của nước ta.'] },
    { mau: 'Ai làm gì?', vd: ['Bạn Nam quét sân.', 'Mẹ nấu cơm.',
      'Em tưới cây.', 'Các bạn đá bóng ngoài sân.'] },
    { mau: 'Ai thế nào?', vd: ['Bạn Mai rất chăm chỉ.', 'Bầu trời hôm nay trong xanh.',
      'Con đường rất rộng.', 'Em bé ngoan lắm.'] }
  ];

  function nhanMauCau() {
    var m = chon(MAU_CAU);
    var cau = chon(m.vd);
    var sai = MAU_CAU.filter(function (x) { return x.mau !== m.mau; }).map(function (x) { return x.mau; });
    return {
      prompt: 'Câu <b>“' + cau + '”</b> thuộc mẫu câu nào?',
      speak: cau + '. Câu này thuộc mẫu câu nào?',
      answer: m.mau, choices: Q.shuffle([m.mau].concat(sai)), cols: 1, mach: 'Mẫu câu'
    };
  }

  /* ---------- Dấu câu ---------- */

  var DAU_CAU = [
    { cau: 'Hôm nay trời đẹp quá', dau: 'dấu chấm than', vi: 'câu bộc lộ cảm xúc' },
    { cau: 'Bạn tên là gì', dau: 'dấu chấm hỏi', vi: 'câu hỏi' },
    { cau: 'Em đi học lúc bảy giờ', dau: 'dấu chấm', vi: 'câu kể' },
    { cau: 'Con mèo nhà em rất ngoan', dau: 'dấu chấm', vi: 'câu kể' },
    { cau: 'Ôi, bông hoa đẹp quá', dau: 'dấu chấm than', vi: 'câu bộc lộ cảm xúc' },
    { cau: 'Mẹ ơi, mấy giờ rồi', dau: 'dấu chấm hỏi', vi: 'câu hỏi' },
    { cau: 'Bạn Lan hát rất hay', dau: 'dấu chấm', vi: 'câu kể' },
    { cau: 'Sao hôm nay em đi học muộn', dau: 'dấu chấm hỏi', vi: 'câu hỏi' }
  ];

  function chonDauCau() {
    var d = chon(DAU_CAU);
    var tatCa = ['dấu chấm', 'dấu chấm hỏi', 'dấu chấm than'];
    return {
      prompt: 'Cuối câu <b>“' + d.cau + '”</b> điền dấu gì?',
      speak: d.cau + '. Cuối câu này điền dấu gì?',
      answer: d.dau, choices: Q.shuffle(tatCa), cols: 1,
      after: '', mach: 'Dấu câu'
    };
  }

  /* ---------- Chính tả phân biệt ---------- */

  var CHINH_TA = [
    { dung: 'con sóc', sai: 'con xóc' }, { dung: 'xe đạp', sai: 'se đạp' },
    { dung: 'cây tre', sai: 'cây che' }, { dung: 'chăm chỉ', sai: 'trăm chỉ' },
    { dung: 'quả na', sai: 'quả la' }, { dung: 'lá cờ', sai: 'ná cờ' },
    { dung: 'con dao', sai: 'con giao' }, { dung: 'giúp đỡ', sai: 'diúp đỡ' },
    { dung: 'ngã tư', sai: 'ngả tư' }, { dung: 'cửa sổ', sai: 'cữa sổ' },
    { dung: 'nghỉ ngơi', sai: 'nghĩ ngơi' }, { dung: 'suy nghĩ', sai: 'suy nghỉ' },
    { dung: 'bờ sông', sai: 'bờ xông' }, { dung: 'trường học', sai: 'chường học' },
    { dung: 'rửa tay', sai: 'giửa tay' }, { dung: 'nấu cơm', sai: 'lấu cơm' }
  ];

  function timTuDung() {
    var c = chon(CHINH_TA);
    var them = nhieu(CHINH_TA, 1, c, function (x) { return x.dung; })[0];
    return {
      prompt: 'Từ nào <b>viết đúng chính tả</b>?',
      speak: 'Từ nào viết đúng chính tả?',
      answer: c.dung, choices: Q.shuffle([c.dung, c.sai, them.sai]), cols: 1, mach: 'Chính tả'
    };
  }

  var QUY_TAC = [
    { am: 'k', truoc: 'i, e, ê', vd: 'kem, kì, kéo' },
    { am: 'c', truoc: 'a, o, ô, u, ư', vd: 'cá, cô, cua' },
    { am: 'gh', truoc: 'i, e, ê', vd: 'ghi, ghế, ghe' },
    { am: 'g', truoc: 'a, o, ô, u, ư', vd: 'gà, gỗ, gừng' },
    { am: 'ngh', truoc: 'i, e, ê', vd: 'nghe, nghỉ, nghề' },
    { am: 'ng', truoc: 'a, o, ô, u, ư', vd: 'ngà, ngô, ngủ' }
  ];

  function quyTacChinhTa() {
    var q = chon(QUY_TAC);
    var sai = nhieu(QUY_TAC, 2, q, function (x) { return x.am; }).map(function (x) { return x.am; });
    return {
      prompt: 'Âm nào đứng trước <b>' + q.truoc + '</b>?<br><small>Ví dụ: ' + q.vd + '</small>',
      speak: 'Âm nào đứng trước ' + q.truoc + '?',
      answer: q.am, choices: Q.shuffle([q.am].concat(sai)), cols: 3, mach: 'Quy tắc chính tả'
    };
  }

  /* ---------- Từ trái nghĩa ---------- */

  var TRAI_NGHIA = [
    ['cao', 'thấp'], ['to', 'nhỏ'], ['dài', 'ngắn'], ['nhanh', 'chậm'],
    ['sáng', 'tối'], ['nóng', 'lạnh'], ['vui', 'buồn'], ['sạch', 'bẩn'],
    ['mới', 'cũ'], ['no', 'đói'], ['trong', 'ngoài'], ['trước', 'sau'],
    ['nặng', 'nhẹ'], ['rộng', 'hẹp'], ['đầy', 'vơi'], ['khen', 'chê']
  ];

  function timTraiNghia() {
    var c = chon(TRAI_NGHIA);
    var daoNguoc = Math.random() < 0.5;
    var hoi = daoNguoc ? c[1] : c[0];
    var dap = daoNguoc ? c[0] : c[1];
    var sai = [];
    Q.shuffle(TRAI_NGHIA).forEach(function (x) {
      if (sai.length < 2 && x[0] !== c[0]) sai.push(chon(x));
    });
    return {
      prompt: 'Từ nào <b>trái nghĩa</b> với từ <b>“' + hoi + '”</b>?',
      speak: 'Từ nào trái nghĩa với từ ' + hoi + '?',
      answer: dap, choices: Q.shuffle([dap].concat(sai)), cols: 3, mach: 'Từ trái nghĩa'
    };
  }

  /* ---------- Sắp xếp câu ---------- */

  var CAU_SAP_XEP = [
    'Em quét sân giúp mẹ', 'Bạn Lan hát rất hay', 'Con mèo nằm ngủ trên ghế',
    'Bố em đọc báo buổi sáng', 'Các bạn chơi đá bóng', 'Cô giáo giảng bài cho chúng em',
    'Mẹ nấu cơm trong bếp', 'Chúng em học bài chăm chỉ'
  ];

  function sapXepCau() {
    var cau = chon(CAU_SAP_XEP);
    var tu = cau.split(' ');
    // ba chuỗi phải khác nhau và hai phương án sai phải khác câu đúng, nếu không
    // xáo trộn có lúc trả về đúng thứ tự ban đầu
    function xao(truKhoi) {
      var x, lan = 0;
      do { x = Q.shuffle(tu.slice()).join(' '); lan++; } while (truKhoi.indexOf(x) !== -1 && lan < 30);
      return x;
    }
    var tron = xao([cau]).split(' ');
    var sai1 = xao([cau]);
    var sai2 = xao([cau, sai1]);
    return {
      prompt: 'Sắp xếp các từ sau thành câu đúng:<br><b>' + tron.join(' / ') + '</b>',
      speak: 'Sắp xếp các từ sau thành câu đúng',
      answer: cau + '.',
      choices: Q.shuffle([cau + '.', sai1 + '.', sai2 + '.']), cols: 1, mach: 'Sắp xếp câu'
    };
  }

  /* ---------- Đọc hiểu ---------- */

  var DOAN = [
    { bai: 'Sáng nay, Lan dậy sớm. Bạn đánh răng, rửa mặt rồi ăn sáng. ' +
           'Sau đó Lan mặc áo đồng phục và đi bộ tới trường cùng mẹ.',
      hoi: [
        { h: 'Lan đi tới trường bằng cách nào?', d: 'Đi bộ', s: ['Đi xe đạp', 'Đi xe buýt'] },
        { h: 'Ai đi cùng Lan tới trường?', d: 'Mẹ', s: ['Bố', 'Chị'] }
      ] },
    { bai: 'Vườn nhà bà có một cây ổi. Mùa hè, cây ra rất nhiều quả. ' +
           'Chim sâu hay đậu trên cành hót líu lo. Em thích ngồi dưới gốc ổi đọc truyện.',
      hoi: [
        { h: 'Vườn nhà bà có cây gì?', d: 'Cây ổi', s: ['Cây xoài', 'Cây na'] },
        { h: 'Con gì hay đậu trên cành?', d: 'Chim sâu', s: ['Con bướm', 'Con ong'] }
      ] },
    { bai: 'Chủ nhật, cả nhà em về quê thăm ông bà. Ông dẫn em ra đồng xem lúa. ' +
           'Bà làm bánh trôi cho em ăn. Em rất vui.',
      hoi: [
        { h: 'Cả nhà về quê vào ngày nào?', d: 'Chủ nhật', s: ['Thứ bảy', 'Thứ hai'] },
        { h: 'Bà làm món gì cho em ăn?', d: 'Bánh trôi', s: ['Bánh chưng', 'Bánh mì'] }
      ] },
    { bai: 'Lớp em có một tủ sách nhỏ. Giờ ra chơi, các bạn hay mượn truyện đọc. ' +
           'Bạn nào đọc xong cũng cất sách về đúng chỗ.',
      hoi: [
        { h: 'Các bạn mượn truyện vào lúc nào?', d: 'Giờ ra chơi', s: ['Giờ học', 'Giờ về'] },
        { h: 'Đọc xong các bạn làm gì?', d: 'Cất sách về đúng chỗ', s: ['Mang sách về nhà', 'Để sách trên bàn'] }
      ] }
  ];

  function docHieu() {
    var d = chon(DOAN);
    var h = chon(d.hoi);
    return {
      prompt: '<span class="doan-van">' + d.bai + '</span><br><b>' + h.h + '</b>',
      speak: d.bai + ' ' + h.h,
      answer: h.d, choices: Q.shuffle([h.d].concat(h.s)), cols: 1, mach: 'Đọc hiểu'
    };
  }

  global.TiengVietL2 = {
    timTuLoai: timTuLoai, chonTuKhacNhom: chonTuKhacNhom,
    nhanMauCau: nhanMauCau, chonDauCau: chonDauCau,
    timTuDung: timTuDung, quyTacChinhTa: quyTacChinhTa,
    timTraiNghia: timTraiNghia, sapXepCau: sapXepCau, docHieu: docHieu
  };
})(window);
