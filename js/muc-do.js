/* ===== Mức độ khó dùng chung cho bốn trò chơi =====
   Bé mới học xong học kì 1 mà phải làm đúng bộ đề cả năm thì khó qua màn,
   nản. Ba mức chỉnh ba thứ cùng lúc:

     - số câu mỗi màn: dễ thì ít câu hơn, khó thì nhiều hơn
     - số lượt hụt cho phép (tim, bí ngô, nhiên liệu): dễ thì rộng tay
     - số dạng đề: mức Dễ chỉ lấy mấy dạng đầu trong danh sách của màn đó,
       mà các trang đều xếp dạng dễ lên trước nên đúng là phần học kì 1

   Mức đã chọn lưu riêng từng game, từng lớp.
*/
(function (global) {
  'use strict';

  var DS = [
    { id: 'de', ten: 'Dễ', e: '🌱',
      mota: 'Ít câu, nhiều lượt, chỉ những dạng đầu — hợp bé mới học kì 1',
      soCau: 0.6, mang: 1.7, luot: 1.4, dang: 2, phat: 0.6 },
    { id: 'vua', ten: 'Vừa', e: '⭐',
      mota: 'Đúng chương trình cả năm',
      soCau: 1, mang: 1, luot: 1, dang: 0, phat: 1 },
    { id: 'kho', ten: 'Khó', e: '🔥',
      mota: 'Nhiều câu hơn, ít lượt hơn — cho bé đã vững',
      soCau: 1.3, mang: 0.7, luot: 0.9, dang: 0, phat: 1.3 }
  ];

  function cua(id) {
    for (var i = 0; i < DS.length; i++) if (DS[i].id === id) return DS[i];
    return DS[1];
  }

  function doc(khoa) {
    try {
      var v = localStorage.getItem(khoa + ':muc');
      return cua(v).id;
    } catch (e) {
      return 'vua';
    }
  }

  function ghi(khoa, id) {
    try { localStorage.setItem(khoa + ':muc', cua(id).id); } catch (e) { /* bỏ qua */ }
  }

  function soCau(goc, id) { return Math.max(3, Math.round(goc * cua(id).soCau)); }
  function mang(goc, id) { return Math.max(1, Math.round(goc * cua(id).mang)); }
  function phat(goc, id) { return Math.max(1, Math.round(goc * cua(id).phat)); }

  /* Game câu cá thắng bằng cách đủ sáu nấc trong số câu cho phép, nên ở đó
     "dễ" là ĐƯỢC NHIỀU LƯỢT HƠN chứ không phải ít câu đi — ngược hẳn soCau. */
  function luot(goc, id) { return Math.max(3, Math.round(goc * cua(id).luot)); }

  /* Bớt dạng đề cho mức Dễ. Nhận cả ba kiểu đang dùng trong các trang:
     mảng hàm, hàm do mix() dựng (có kèm .ds), hoặc một hàm trơ — hàm trơ thì
     chịu, trả về nguyên. */
  function de(bo, id) {
    var n = cua(id).dang;
    if (!n || !bo) return bo;
    if (Object.prototype.toString.call(bo) === '[object Array]') {
      return bo.length > n ? bo.slice(0, n) : bo;
    }
    if (typeof bo === 'function' && bo.ds && bo.ds.length > n) {
      var it = bo.ds.slice(0, n);
      return function () { return global.Quiz.pick(it)(); };
    }
    return bo;
  }

  /* Hàng ba nút chọn mức, gắn ngay dưới lời dẫn của màn chọn màn chơi. */
  function veChon(khoa, khiDoi) {
    var dangChon = doc(khoa);
    var hang = document.createElement('div');
    hang.className = 'chon-muc';
    hang.innerHTML = '<span class="nhan-muc">Mức độ</span>';

    var nhom = document.createElement('div');
    nhom.className = 'nut-muc';
    DS.forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mot-muc' + (m.id === dangChon ? ' dang-chon' : '');
      b.innerHTML = '<b>' + m.e + ' ' + m.ten + '</b>';
      b.setAttribute('aria-pressed', m.id === dangChon ? 'true' : 'false');
      b.addEventListener('click', function () {
        if (doc(khoa) === m.id) return;
        ghi(khoa, m.id);
        if (khiDoi) khiDoi(m.id);
      });
      nhom.appendChild(b);
    });
    hang.appendChild(nhom);

    var mo = document.createElement('p');
    mo.className = 'mota-muc';
    mo.textContent = cua(dangChon).mota;
    hang.appendChild(mo);
    return hang;
  }

  global.MucDo = {
    DS: DS, cua: cua, doc: doc, ghi: ghi,
    soCau: soCau, mang: mang, luot: luot, phat: phat, de: de, veChon: veChon
  };
})(window);
