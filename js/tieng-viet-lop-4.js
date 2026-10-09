/* ===== Tiếng Việt lớp 4 — GDPT 2018 =====
   Danh từ, động từ, tính từ; từ ghép và từ láy; đồng nghĩa và trái nghĩa;
   bốn kiểu câu; chủ ngữ vị ngữ; dấu ngoặc kép và gạch ngang; đọc hiểu.
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

  /* ---------- Danh từ, động từ, tính từ ---------- */

  var TU_LOAI_4 = {
    'danh từ': ['học sinh', 'ngôi trường', 'dòng sông', 'niềm vui', 'lòng dũng cảm',
      'quyển sách', 'cơn bão', 'tình bạn', 'con đường', 'bầu trời'],
    'động từ': ['chạy', 'suy nghĩ', 'xây dựng', 'bảo vệ', 'học tập',
      'chiến đấu', 'giúp đỡ', 'khám phá', 'lắng nghe', 'chăm sóc'],
    'tính từ': ['xanh biếc', 'dũng cảm', 'chăm chỉ', 'rộng lớn', 'hiền lành',
      'thông minh', 'rực rỡ', 'yên tĩnh', 'nhanh nhẹn', 'cần cù']
  };

  function nhanTuLoai4() {
    var loai = chon(Object.keys(TU_LOAI_4));
    var tu = chon(TU_LOAI_4[loai]);
    var sai = Object.keys(TU_LOAI_4).filter(function (l) { return l !== loai; });
    return {
      prompt: 'Từ <b>“' + tu + '”</b> thuộc từ loại nào?',
      speak: 'Từ ' + tu + ' thuộc từ loại nào?',
      answer: loai, choices: Q.shuffle([loai].concat(sai)), cols: 3, mach: 'Từ loại'
    };
  }

  /* ---------- Từ ghép, từ láy ---------- */

  var TU_GHEP = ['bàn ghế', 'quần áo', 'sách vở', 'nhà cửa', 'cây cối', 'ăn uống',
    'học hành', 'xe cộ', 'ruộng vườn', 'bạn bè'];
  var TU_LAY = ['lấp lánh', 'rì rào', 'xanh xanh', 'lung linh', 'thì thầm',
    'mênh mông', 'róc rách', 'nhỏ nhắn', 'đo đỏ', 'khúc khích'];

  function ghepHayLay() {
    var laLay = Math.random() < 0.5;
    var tu = laLay ? chon(TU_LAY) : chon(TU_GHEP);
    return {
      prompt: 'Từ <b>“' + tu + '”</b> là từ ghép hay từ láy?',
      speak: 'Từ ' + tu + ' là từ ghép hay từ láy?',
      answer: laLay ? 'Từ láy' : 'Từ ghép',
      choices: Q.shuffle(['Từ ghép', 'Từ láy', 'Từ đơn']), cols: 3, mach: 'Từ ghép từ láy'
    };
  }

  function timTuLay() {
    var lay = chon(TU_LAY);
    var ghep = Q.shuffle(TU_GHEP).slice(0, 2);
    return {
      prompt: 'Từ nào là <b>từ láy</b>?',
      speak: 'Từ nào là từ láy?',
      answer: lay, choices: Q.shuffle([lay].concat(ghep)), cols: 3, mach: 'Từ ghép từ láy'
    };
  }

  /* ---------- Đồng nghĩa, trái nghĩa ---------- */

  var DONG_NGHIA = [
    ['chăm chỉ', 'siêng năng'], ['dũng cảm', 'gan dạ'], ['to lớn', 'khổng lồ'],
    ['xinh đẹp', 'xinh xắn'], ['vui vẻ', 'hớn hở'], ['im lặng', 'yên tĩnh'],
    ['nhanh nhẹn', 'lanh lẹ'], ['hiền lành', 'hiền hậu']
  ];
  var TRAI_NGHIA_4 = [
    ['chăm chỉ', 'lười biếng'], ['dũng cảm', 'hèn nhát'], ['thật thà', 'dối trá'],
    ['đoàn kết', 'chia rẽ'], ['hoà bình', 'chiến tranh'], ['hạnh phúc', 'đau khổ'],
    ['rộng rãi', 'chật hẹp'], ['cẩn thận', 'cẩu thả']
  ];

  function timDongNghia() {
    var c = chon(DONG_NGHIA);
    var sai = [];
    Q.shuffle(TRAI_NGHIA_4).forEach(function (x) { if (sai.length < 2) sai.push(x[1]); });
    return {
      prompt: 'Từ nào <b>đồng nghĩa</b> với từ <b>“' + c[0] + '”</b>?',
      speak: 'Từ nào đồng nghĩa với từ ' + c[0] + '?',
      answer: c[1], choices: Q.shuffle([c[1]].concat(sai)), cols: 1, mach: 'Đồng nghĩa trái nghĩa'
    };
  }

  function timTraiNghia4() {
    var c = chon(TRAI_NGHIA_4);
    var sai = nhieu(DONG_NGHIA, 2, c, function (x) { return x[0]; }).map(function (x) { return x[1]; });
    return {
      prompt: 'Từ nào <b>trái nghĩa</b> với từ <b>“' + c[0] + '”</b>?',
      speak: 'Từ nào trái nghĩa với từ ' + c[0] + '?',
      answer: c[1], choices: Q.shuffle([c[1]].concat(sai)), cols: 1, mach: 'Đồng nghĩa trái nghĩa'
    };
  }

  /* ---------- Bốn kiểu câu ---------- */

  var KIEU_CAU = [
    { kieu: 'Câu kể', vd: ['Hôm nay lớp em đi tham quan.', 'Bố em làm nghề kĩ sư.',
      'Cánh đồng lúa chín vàng.', 'Em rất thích đọc sách.'] },
    { kieu: 'Câu hỏi', vd: ['Bạn đã làm bài tập chưa?', 'Hôm nay là thứ mấy?',
      'Ai là người trực nhật hôm nay?', 'Vì sao em đi học muộn?'] },
    { kieu: 'Câu khiến', vd: ['Em hãy đóng cửa lại!', 'Các bạn trật tự nào!',
      'Đừng vứt rác ra sân!', 'Hãy giúp mẹ dọn nhà nhé!'] },
    { kieu: 'Câu cảm', vd: ['Ôi, phong cảnh đẹp quá!', 'Chao ôi, trời nóng thật!',
      'A, mẹ về rồi!', 'Trời, bạn giỏi quá!'] }
  ];

  function nhanKieuCau() {
    var k = chon(KIEU_CAU);
    var cau = chon(k.vd);
    var sai = nhieu(KIEU_CAU, 2, k, function (x) { return x.kieu; }).map(function (x) { return x.kieu; });
    return {
      prompt: 'Câu <b>“' + cau + '”</b> thuộc kiểu câu nào?',
      speak: cau + ' Câu này thuộc kiểu câu nào?',
      answer: k.kieu, choices: Q.shuffle([k.kieu].concat(sai)), cols: 3, mach: 'Kiểu câu'
    };
  }

  /* ---------- Chủ ngữ, vị ngữ ---------- */

  var CAU_CN_VN = [
    { cau: 'Những cánh diều bay cao trên bầu trời.', cn: 'Những cánh diều', vn: 'bay cao trên bầu trời' },
    { cau: 'Bạn Lan là học sinh giỏi của lớp.', cn: 'Bạn Lan', vn: 'là học sinh giỏi của lớp' },
    { cau: 'Dòng sông quê em rất hiền hoà.', cn: 'Dòng sông quê em', vn: 'rất hiền hoà' },
    { cau: 'Các bác nông dân gặt lúa ngoài đồng.', cn: 'Các bác nông dân', vn: 'gặt lúa ngoài đồng' },
    { cau: 'Cây bàng trước sân trường toả bóng mát.', cn: 'Cây bàng trước sân trường', vn: 'toả bóng mát' },
    { cau: 'Tiếng chim hót vang cả khu vườn.', cn: 'Tiếng chim', vn: 'hót vang cả khu vườn' }
  ];

  function timChuNguViNgu() {
    var c = chon(CAU_CN_VN);
    var hoiCN = Math.random() < 0.5;
    var dung = hoiCN ? c.cn : c.vn;
    var sai = nhieu(CAU_CN_VN, 2, c, function (x) { return x.cau; })
      .map(function (x) { return hoiCN ? x.cn : x.vn; });
    return {
      prompt: 'Tìm <b>' + (hoiCN ? 'chủ ngữ' : 'vị ngữ') + '</b> trong câu:<br>' +
              '<b>“' + c.cau + '”</b>',
      speak: c.cau + ' Tìm ' + (hoiCN ? 'chủ ngữ' : 'vị ngữ') + ' trong câu này.',
      answer: dung, choices: Q.shuffle([dung].concat(sai)), cols: 1, mach: 'Chủ ngữ vị ngữ'
    };
  }

  /* ---------- Dấu câu ---------- */

  var DAU_4 = [
    { ten: 'dấu ngoặc kép', vi: 'đánh dấu lời nói trực tiếp hoặc từ dùng với nghĩa đặc biệt' },
    { ten: 'dấu gạch ngang', vi: 'đánh dấu chỗ bắt đầu lời nói của nhân vật trong đối thoại' },
    { ten: 'dấu hai chấm', vi: 'báo hiệu phần giải thích hoặc liệt kê đứng sau nó' },
    { ten: 'dấu phẩy', vi: 'ngăn cách các bộ phận cùng chức vụ trong câu' }
  ];

  function congDungDau4() {
    var d = chon(DAU_4);
    var sai = nhieu(DAU_4, 2, d, function (x) { return x.ten; }).map(function (x) { return x.ten; });
    return {
      prompt: 'Dấu nào dùng để <b>' + d.vi + '</b>?',
      speak: 'Dấu nào dùng để ' + d.vi + '?',
      answer: d.ten, choices: Q.shuffle([d.ten].concat(sai)), cols: 1, mach: 'Dấu câu'
    };
  }

  /* ---------- Đọc hiểu ---------- */

  var DOAN_4 = [
    { bai: 'Ngày xưa, có một người tiều phu nghèo nhưng rất thật thà. Một hôm, ông đánh rơi ' +
           'chiếc rìu sắt xuống sông. Một ông lão hiện lên, đưa cho ông chiếc rìu vàng rồi rìu bạc, ' +
           'nhưng người tiều phu đều lắc đầu. Chỉ đến khi thấy chiếc rìu sắt của mình, ông mới ' +
           'nhận. Cảm phục lòng thật thà ấy, ông lão tặng ông cả ba chiếc rìu.',
      hoi: [
        { h: 'Người tiều phu đánh rơi vật gì?', d: 'Chiếc rìu sắt', s: ['Chiếc rìu vàng', 'Chiếc rìu bạc'] },
        { h: 'Vì sao ông lão tặng cả ba chiếc rìu?', d: 'Vì cảm phục lòng thật thà của người tiều phu',
          s: ['Vì thương người tiều phu nghèo', 'Vì người tiều phu xin cả ba'] },
        { h: 'Câu chuyện khuyên ta điều gì?', d: 'Sống thật thà sẽ được đền đáp',
          s: ['Phải chăm chỉ làm việc', 'Phải biết tiết kiệm'] }
      ] },
    { bai: 'Rừng ngập mặn ở vùng ven biển nước ta như một bức tường xanh. Rễ cây chằng chịt ' +
           'giữ đất, chắn sóng, che chở cho làng mạc phía trong. Rừng còn là nơi sinh sống của ' +
           'tôm, cua, cá và nhiều loài chim. Giữ rừng ngập mặn chính là giữ lấy cuộc sống yên ' +
           'bình của người dân ven biển.',
      hoi: [
        { h: 'Rừng ngập mặn được ví như cái gì?', d: 'Một bức tường xanh',
          s: ['Một tấm thảm xanh', 'Một dòng sông xanh'] },
        { h: 'Rễ cây chằng chịt có tác dụng gì?', d: 'Giữ đất và chắn sóng',
          s: ['Cho bóng mát', 'Làm thức ăn cho cá'] },
        { h: 'Vì sao phải giữ rừng ngập mặn?', d: 'Vì rừng giữ cuộc sống yên bình cho người dân ven biển',
          s: ['Vì rừng cho gỗ quý', 'Vì rừng làm đẹp bờ biển'] }
      ] },
    { bai: 'Buổi sáng mùa thu, sương còn đọng trên lá. Mặt hồ phẳng lặng như một tấm gương lớn. ' +
           'Mấy chú chim sâu chuyền cành, thỉnh thoảng cất tiếng hót trong veo. Xa xa, tiếng ' +
           'chuông trường ngân vang gọi học trò tới lớp.',
      hoi: [
        { h: 'Đoạn văn tả cảnh mùa nào?', d: 'Mùa thu', s: ['Mùa xuân', 'Mùa hè'] },
        { h: 'Mặt hồ được so sánh với cái gì?', d: 'Một tấm gương lớn',
          s: ['Một tấm thảm', 'Một bức tranh'] },
        { h: 'Tiếng chuông trường báo hiệu điều gì?', d: 'Đã đến giờ học trò tới lớp',
          s: ['Đã đến giờ tan học', 'Đã đến giờ ăn trưa'] }
      ] }
  ];

  function docHieu4() {
    var d = chon(DOAN_4);
    var h = chon(d.hoi);
    return {
      prompt: '<span class="doan-van">' + d.bai + '</span><br><b>' + h.h + '</b>',
      speak: h.h,
      answer: h.d, choices: Q.shuffle([h.d].concat(h.s)), cols: 1, mach: 'Đọc hiểu'
    };
  }

  global.TiengVietL4 = {
    nhanTuLoai4: nhanTuLoai4, ghepHayLay: ghepHayLay, timTuLay: timTuLay,
    timDongNghia: timDongNghia, timTraiNghia4: timTraiNghia4,
    nhanKieuCau: nhanKieuCau, timChuNguViNgu: timChuNguViNgu,
    congDungDau4: congDungDau4, docHieu4: docHieu4
  };
})(window);
