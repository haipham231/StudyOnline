/* ===== Tiếng Việt lớp 3 — GDPT 2018 =====
   So sánh và nhân hoá, ba mẫu câu, dấu phẩy và dấu hai chấm, mở rộng vốn từ
   theo chủ điểm, chính tả phân biệt, đọc hiểu.
*/
(function (global) {
  'use strict';

  var Q = global.Quiz;
  var chon = Q.pick;

  function nhieu(ds, n, truKhoi, khoa) {
    var ket = [];
    Q.shuffle(ds).forEach(function (x) {
      if (ket.length < n && khoa(x) !== khoa(truKhoi)) ket.push(x);
    });
    return ket;
  }

  /* ---------- Biện pháp so sánh ---------- */

  var SO_SANH = [
    { cau: 'Mặt trời đỏ như quả cầu lửa.', a: 'Mặt trời', b: 'quả cầu lửa' },
    { cau: 'Tóc bà trắng như mây.', a: 'Tóc bà', b: 'mây' },
    { cau: 'Đôi mắt bé tròn như hai hạt nhãn.', a: 'Đôi mắt bé', b: 'hai hạt nhãn' },
    { cau: 'Cánh đồng rộng như tấm thảm xanh.', a: 'Cánh đồng', b: 'tấm thảm xanh' },
    { cau: 'Tiếng suối trong như tiếng hát.', a: 'Tiếng suối', b: 'tiếng hát' },
    { cau: 'Mặt hồ phẳng như một tấm gương.', a: 'Mặt hồ', b: 'một tấm gương' }
  ];

  function timHinhAnhSoSanh() {
    var s = chon(SO_SANH);
    var hoiVeB = Math.random() < 0.5;
    var dung = hoiVeB ? s.b : s.a;
    var sai = nhieu(SO_SANH, 2, s, function (x) { return x.cau; })
      .map(function (x) { return hoiVeB ? x.b : x.a; });
    return {
      prompt: 'Trong câu <b>“' + s.cau + '”</b>, sự vật ' +
              (hoiVeB ? '<b>được so sánh với</b>' : '<b>được đem ra so sánh</b>') + ' là gì?',
      speak: s.cau + ' Sự vật nào được so sánh?',
      answer: dung, choices: Q.shuffle([dung].concat(sai)), cols: 1, mach: 'So sánh'
    };
  }

  function nhanBietSoSanh() {
    var s = chon(SO_SANH);
    var thuong = chon([
      'Em đi học lúc bảy giờ.', 'Mẹ nấu cơm trong bếp.',
      'Lớp em có ba mươi bạn.', 'Chiều nay trời mưa to.'
    ]);
    var thuong2 = chon([
      'Bố em làm nghề lái xe.', 'Cây bàng trước sân rụng lá.',
      'Chúng em đi tham quan vườn thú.'
    ]);
    return {
      prompt: 'Câu nào có <b>hình ảnh so sánh</b>?',
      speak: 'Câu nào có hình ảnh so sánh?',
      answer: s.cau, choices: Q.shuffle([s.cau, thuong, thuong2]), cols: 1, mach: 'So sánh'
    };
  }

  /* ---------- Nhân hoá ---------- */

  var NHAN_HOA = [
    'Ông mặt trời thức dậy từ sớm.', 'Chị gió chạy nhảy khắp cánh đồng.',
    'Bác cây đa đứng trầm ngâm bên đường.', 'Cô mây mặc áo trắng dạo chơi.',
    'Anh sóng vỗ về bờ cát.', 'Chú chim sâu chăm chỉ bắt sâu cho cây.'
  ];

  function nhanBietNhanHoa() {
    var nh = chon(NHAN_HOA);
    var thuong = Q.shuffle([
      'Mặt trời mọc ở đằng đông.', 'Gió thổi qua cánh đồng.',
      'Cây đa mọc bên đường.', 'Mây bay trên bầu trời.'
    ]).slice(0, 2);
    return {
      prompt: 'Câu nào dùng <b>biện pháp nhân hoá</b>?<br>' +
              '<small>Nhân hoá là gọi hoặc tả vật như tả người.</small>',
      speak: 'Câu nào dùng biện pháp nhân hoá?',
      answer: nh, choices: Q.shuffle([nh].concat(thuong)), cols: 1, mach: 'Nhân hoá'
    };
  }

  /* ---------- Mẫu câu ---------- */

  var MAU = [
    { mau: 'Ai là gì?', vd: ['Bạn Hoa là lớp trưởng lớp em.', 'Cây tre là biểu tượng của làng quê.',
      'Chú Nam là bộ đội.', 'Sách là người bạn thân của em.'] },
    { mau: 'Ai làm gì?', vd: ['Các bạn nhỏ thả diều trên đê.', 'Bà kể chuyện cho em nghe.',
      'Chúng em trồng cây trong vườn trường.', 'Chị Hà tưới hoa mỗi sáng.'] },
    { mau: 'Ai thế nào?', vd: ['Dòng sông quê em rất hiền hoà.', 'Bạn Minh thông minh và chăm chỉ.',
      'Cánh đồng lúa chín vàng rực.', 'Ngôi trường của em rất khang trang.'] }
  ];

  function nhanMauCau3() {
    var m = chon(MAU);
    var cau = chon(m.vd);
    var sai = MAU.filter(function (x) { return x.mau !== m.mau; }).map(function (x) { return x.mau; });
    return {
      prompt: 'Câu <b>“' + cau + '”</b> thuộc mẫu câu nào?',
      speak: cau + ' Câu này thuộc mẫu câu nào?',
      answer: m.mau, choices: Q.shuffle([m.mau].concat(sai)), cols: 1, mach: 'Mẫu câu'
    };
  }

  function timBoPhanCau() {
    var m = chon(MAU);
    var cau = chon(m.vd);
    var chuNgu = cau.split(' ').slice(0, m.mau === 'Ai là gì?' ? 2 : 2).join(' ');
    // lấy đúng cụm chủ ngữ đã soạn sẵn thay vì cắt máy móc
    var BO_PHAN = {
      'Bạn Hoa là lớp trưởng lớp em.': 'Bạn Hoa',
      'Cây tre là biểu tượng của làng quê.': 'Cây tre',
      'Chú Nam là bộ đội.': 'Chú Nam',
      'Sách là người bạn thân của em.': 'Sách',
      'Các bạn nhỏ thả diều trên đê.': 'Các bạn nhỏ',
      'Bà kể chuyện cho em nghe.': 'Bà',
      'Chúng em trồng cây trong vườn trường.': 'Chúng em',
      'Chị Hà tưới hoa mỗi sáng.': 'Chị Hà',
      'Dòng sông quê em rất hiền hoà.': 'Dòng sông quê em',
      'Bạn Minh thông minh và chăm chỉ.': 'Bạn Minh',
      'Cánh đồng lúa chín vàng rực.': 'Cánh đồng lúa',
      'Ngôi trường của em rất khang trang.': 'Ngôi trường của em'
    };
    chuNgu = BO_PHAN[cau] || chuNgu;
    var sai = [];
    Q.shuffle(Object.keys(BO_PHAN)).forEach(function (k) {
      if (sai.length < 2 && BO_PHAN[k] !== chuNgu) sai.push(BO_PHAN[k]);
    });
    return {
      prompt: 'Bộ phận trả lời cho câu hỏi <b>“Ai?”</b> trong câu ' +
              '<b>“' + cau + '”</b> là gì?',
      speak: cau + ' Bộ phận nào trả lời cho câu hỏi Ai?',
      answer: chuNgu, choices: Q.shuffle([chuNgu].concat(sai)), cols: 1, mach: 'Bộ phận câu'
    };
  }

  /* ---------- Dấu câu ---------- */

  var DAU_PHAY = [
    { cau: 'Trong vườn có hoa hồng, hoa cúc và hoa lan.', vi: 'ngăn cách các từ cùng loại' },
    { cau: 'Sáng nay, em dậy sớm đi học.', vi: 'ngăn cách trạng ngữ với câu' },
    { cau: 'Lan, Mai và Hoa cùng đi chơi.', vi: 'ngăn cách các từ cùng loại' },
    { cau: 'Ngoài sân, các bạn đang đá bóng.', vi: 'ngăn cách trạng ngữ với câu' }
  ];

  function congDungDauPhay() {
    var d = chon(DAU_PHAY);
    var sai = ['kết thúc câu', 'thể hiện câu hỏi'];
    var khac = d.vi === 'ngăn cách các từ cùng loại'
      ? 'ngăn cách trạng ngữ với câu' : 'ngăn cách các từ cùng loại';
    return {
      prompt: 'Trong câu <b>“' + d.cau + '”</b>, dấu phẩy dùng để làm gì?',
      speak: d.cau + ' Dấu phẩy trong câu này dùng để làm gì?',
      answer: d.vi, choices: Q.shuffle([d.vi, khac, chon(sai)]), cols: 1, mach: 'Dấu câu'
    };
  }

  /* ---------- Mở rộng vốn từ ---------- */

  var CHU_DIEM = {
    'trường học': ['lớp học', 'bảng đen', 'cô giáo', 'học sinh', 'sân trường', 'thư viện'],
    'gia đình': ['ông bà', 'bố mẹ', 'anh chị', 'em bé', 'họ hàng', 'quê hương'],
    'thiên nhiên': ['dòng sông', 'ngọn núi', 'cánh đồng', 'rừng cây', 'biển cả', 'bầu trời'],
    'nghề nghiệp': ['bác sĩ', 'giáo viên', 'công nhân', 'nông dân', 'kĩ sư', 'lái xe']
  };

  function tuTheoChuDiem() {
    var cd = chon(Object.keys(CHU_DIEM));
    var khac = chon(Object.keys(CHU_DIEM).filter(function (k) { return k !== cd; }));
    var dung = chon(CHU_DIEM[cd]);
    var sai = Q.shuffle(CHU_DIEM[khac]).slice(0, 2);
    return {
      prompt: 'Từ nào thuộc chủ điểm <b>' + cd + '</b>?',
      speak: 'Từ nào thuộc chủ điểm ' + cd + '?',
      answer: dung, choices: Q.shuffle([dung].concat(sai)), cols: 1, mach: 'Mở rộng vốn từ'
    };
  }

  /* ---------- Chính tả ---------- */

  var CHINH_TA_3 = [
    { dung: 'sản xuất', sai: 'xản xuất' }, { dung: 'xuất sắc', sai: 'suất sắc' },
    { dung: 'trung thực', sai: 'chung thực' }, { dung: 'chung sức', sai: 'trung sức' },
    { dung: 'dành dụm', sai: 'giành dụm' }, { dung: 'giành chiến thắng', sai: 'dành chiến thắng' },
    { dung: 'rực rỡ', sai: 'dực dỡ' }, { dung: 'lấp lánh', sai: 'nấp nánh' },
    { dung: 'nghiêm túc', sai: 'ngiêm túc' }, { dung: 'khúc khích', sai: 'khúc khính' },
    { dung: 'suy nghĩ', sai: 'suy nghỉ' }, { dung: 'nghỉ hè', sai: 'nghĩ hè' },
    { dung: 'sạch sẽ', sai: 'sạch sẻ' }, { dung: 'vẻ đẹp', sai: 'vẽ đẹp' }
  ];

  function chinhTa3() {
    var c = chon(CHINH_TA_3);
    var them = nhieu(CHINH_TA_3, 1, c, function (x) { return x.dung; })[0];
    return {
      prompt: 'Từ nào <b>viết đúng chính tả</b>?',
      speak: 'Từ nào viết đúng chính tả?',
      answer: c.dung, choices: Q.shuffle([c.dung, c.sai, them.sai]), cols: 1, mach: 'Chính tả'
    };
  }

  /* ---------- Đọc hiểu ---------- */

  var DOAN_3 = [
    { bai: 'Mỗi sáng, ông em dậy sớm quét sân. Ông bảo quét sân vừa sạch nhà vừa khoẻ người. ' +
           'Em thường ra giúp ông nhặt lá rụng. Hai ông cháu vừa làm vừa trò chuyện vui vẻ.',
      hoi: [
        { h: 'Ông dậy sớm để làm gì?', d: 'Quét sân', s: ['Tưới cây', 'Nấu cơm'] },
        { h: 'Em giúp ông việc gì?', d: 'Nhặt lá rụng', s: ['Lau nhà', 'Rửa bát'] },
        { h: 'Theo ông, quét sân có lợi gì?', d: 'Vừa sạch nhà vừa khoẻ người',
          s: ['Vừa nhanh vừa đỡ tốn tiền', 'Vừa vui vừa được khen'] }
      ] },
    { bai: 'Lớp em nhận chăm sóc một bồn hoa trước cửa lớp. Mỗi tổ tưới hoa một ngày. ' +
           'Nhờ vậy bồn hoa lúc nào cũng tươi tốt. Giờ ra chơi, các bạn hay đứng ngắm hoa nở.',
      hoi: [
        { h: 'Lớp em chăm sóc cái gì?', d: 'Một bồn hoa', s: ['Một vườn rau', 'Một cây bàng'] },
        { h: 'Mỗi tổ tưới hoa bao lâu một lần?', d: 'Một ngày', s: ['Một tuần', 'Một tháng'] },
        { h: 'Vì sao bồn hoa luôn tươi tốt?', d: 'Vì các tổ thay nhau tưới',
          s: ['Vì trời hay mưa', 'Vì hoa dễ sống'] }
      ] },
    { bai: 'Chiều hè, đàn trâu thong thả về làng. Tiếng mõ trâu lốc cốc vang trên đường đê. ' +
           'Lũ trẻ chạy theo reo hò. Khói bếp nhà ai bay lên trong ánh hoàng hôn.',
      hoi: [
        { h: 'Đoạn văn tả cảnh vào lúc nào?', d: 'Chiều hè', s: ['Sáng sớm', 'Đêm khuya'] },
        { h: 'Tiếng gì vang trên đường đê?', d: 'Tiếng mõ trâu', s: ['Tiếng chim hót', 'Tiếng xe chạy'] },
        { h: 'Đàn trâu đang đi đâu?', d: 'Về làng', s: ['Ra đồng', 'Xuống sông'] }
      ] }
  ];

  function docHieu3() {
    var d = chon(DOAN_3);
    var h = chon(d.hoi);
    return {
      prompt: '<span class="doan-van">' + d.bai + '</span><br><b>' + h.h + '</b>',
      speak: d.bai + ' ' + h.h,
      answer: h.d, choices: Q.shuffle([h.d].concat(h.s)), cols: 1, mach: 'Đọc hiểu'
    };
  }

  global.TiengVietL3 = {
    timHinhAnhSoSanh: timHinhAnhSoSanh, nhanBietSoSanh: nhanBietSoSanh,
    nhanBietNhanHoa: nhanBietNhanHoa, nhanMauCau3: nhanMauCau3,
    timBoPhanCau: timBoPhanCau, congDungDauPhay: congDungDauPhay,
    tuTheoChuDiem: tuTheoChuDiem, chinhTa3: chinhTa3, docHieu3: docHieu3
  };
})(window);
