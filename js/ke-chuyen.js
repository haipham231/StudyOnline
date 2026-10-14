/* ===== Bộ kể chuyện cho khu Bé ngoan =====

   Sách tranh lật tay, không phải phim tự chạy.

   Bản đầu tôi làm tự chạy: máy đọc lời kể, chữ gõ ra theo nhịp đọc, đọc xong
   tự sang cảnh sau. Chủ dự án dùng thử rồi đổi ý — muốn tự lật tự đọc cho bé
   nghe. Đúng là hợp hơn: bố mẹ ngồi cạnh đọc cho con thì nhịp phải do người
   đọc quyết, chứ máy giục sang trang giữa lúc bé đang chỉ trỏ hỏi han thì
   hỏng cả buổi.

   Vì vậy nay:
   - Không có hẹn giờ nào hết. Cảnh chỉ đổi khi có người vuốt, bấm hoặc gõ.
   - Lời kể hiện trọn ngay, không gõ từng chữ. Người lớn đọc theo nhịp của
     mình, chữ bò ra từ từ chỉ tổ vướng.
   - Máy không tự đọc. Có nút loa để đọc cảnh đang mở, cho lúc bé tự xem một
     mình hoặc người lớn muốn nghe mẫu.
   - Lật được cả hai chiều, vì bé hay đòi xem lại trang vừa rồi.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var o = global.document.createElement(tag);
    if (cls) o.className = cls;
    if (html != null) o.innerHTML = html;
    return o;
  }

  function thoiNoi() {
    if (global.speechSynthesis) { try { global.speechSynthesis.cancel(); } catch (e) {} }
  }

  function doc(loi) {
    if (global.Quiz && global.Quiz.docTo) global.Quiz.docTo(loi, 'vi', {});
  }

  function anh(duong) {
    if (global.HinhVe && global.HinhVe.veTen) return global.HinhVe.veTen(duong, 'hinh-canh');
    return '';
  }

  /* ke(khung, truyen, tuyChon)

     tuyChon.xong(truyen) — gọi khi người lớn bấm sang phần câu hỏi
     Trả về { dung: fn } để trang gọi lúc rời đi, kẻo máy còn đọc dở. */
  function ke(khung, truyen, tuyChon) {
    tuyChon = tuyChon || {};
    var canh = truyen.canh;
    var i = 0;
    var huy = false;

    khung.innerHTML = '';
    var san = el('div', 'san-truyen');
    khung.appendChild(san);

    var thanh = el('div', 'thanh-canh');
    canh.forEach(function (_, k) {
      var c = el('button', 'cham-canh');
      c.type = 'button';
      c.setAttribute('aria-label', 'Trang ' + (k + 1));
      c.addEventListener('click', function () { veCanh(k); });
      thanh.appendChild(c);
    });
    san.appendChild(thanh);

    var oHinh = el('div', 'khung-canh');
    san.appendChild(oHinh);

    var oLoi = el('p', 'loi-canh');
    san.appendChild(oLoi);

    var hangNut = el('div', 'nut-truyen');
    var nutTruoc = el('button', 'btn phu', '◀ Trước');
    nutTruoc.type = 'button';
    var nutLoa = el('button', 'btn phu loa-truyen', '🔊 Đọc');
    nutLoa.type = 'button';
    var nutSau = el('button', 'btn chinh', 'Tiếp ▶');
    nutSau.type = 'button';
    hangNut.appendChild(nutTruoc);
    hangNut.appendChild(nutLoa);
    hangNut.appendChild(nutSau);
    san.appendChild(hangNut);

    nutTruoc.addEventListener('click', lui);
    nutSau.addEventListener('click', toi);
    nutLoa.addEventListener('click', function () { thoiNoi(); doc(canh[i].loi); });
    // chạm vào hình cũng sang trang, tay bé bấm nút chưa chuẩn
    oHinh.addEventListener('click', toi);

    /* Vuốt ngang để lật trang. Chỉ nhận khi đi ngang rõ hơn đi dọc, kẻo bé
       cuộn trang một cái là nhảy mất hai trang. */
    var x0 = null, y0 = null;
    san.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    san.addEventListener('touchend', function (e) {
      if (x0 == null || !e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) toi(); else lui();
    }, { passive: true });

    function phim(e) {
      if (huy) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); toi(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); lui(); }
    }
    global.document.addEventListener('keydown', phim);

    function lui() {
      if (huy || i === 0) return;
      veCanh(i - 1);
    }

    function toi() {
      if (huy) return;
      if (i < canh.length - 1) veCanh(i + 1); else xongTruyen();
    }

    function veCanh(k) {
      if (huy) return;
      thoiNoi();
      i = k;

      for (var d = 0; d < thanh.children.length; d++) {
        thanh.children[d].className = 'cham-canh' + (d < k ? ' qua' : d === k ? ' nay' : '');
      }

      oHinh.innerHTML = anh(canh[k].hinh);
      oHinh.classList.remove('hien');
      // ép trình duyệt tính lại để hoạt ảnh hiện hình chạy mỗi lần lật
      void oHinh.offsetWidth;
      oHinh.classList.add('hien');

      // lời kể hiện trọn ngay: người lớn đọc theo nhịp của mình
      oLoi.textContent = canh[k].loi;

      nutTruoc.disabled = k === 0;
      nutSau.innerHTML = k === canh.length - 1 ? 'Hết truyện ▶' : 'Tiếp ▶';
    }

    /* Thẻ bài học dựng sẵn từ đầu rồi ẩn đi, lúc hết truyện mới hiện.

       Trước tôi để nút "Xem lại" gọi ke() lần nữa cho gọn, nhưng như vậy là
       đẻ ra một bộ kể thứ hai trong khi trang vẫn giữ con trỏ tới bộ cũ —
       bộ mới không ai gỡ, phím mũi tên của nó bám lại mãi. Ẩn hiện hai khối
       thì chỉ có đúng một bộ từ đầu tới cuối. */
    var khoiBaiHoc = el('div', 'khoi-bai-hoc');
    khoiBaiHoc.style.display = 'none';
    var the = el('div', 'the-bai-hoc');
    the.appendChild(el('div', 'nhan-bai-hoc', '🌟 Bài học hôm nay'));
    the.appendChild(el('p', 'chu-bai-hoc', truyen.baiHoc));
    khoiBaiHoc.appendChild(the);

    var hangCuoi = el('div', 'nut-truyen');
    var nutXemLai = el('button', 'btn phu', '◀ Xem lại');
    nutXemLai.type = 'button';
    var nutDocBai = el('button', 'btn phu loa-truyen', '🔊 Đọc');
    nutDocBai.type = 'button';
    var nutSangHoi = el('button', 'btn chinh', 'Trả lời câu hỏi ▶');
    nutSangHoi.type = 'button';
    hangCuoi.appendChild(nutXemLai);
    hangCuoi.appendChild(nutDocBai);
    hangCuoi.appendChild(nutSangHoi);
    khoiBaiHoc.appendChild(hangCuoi);
    san.appendChild(khoiBaiHoc);

    nutXemLai.addEventListener('click', function () { hienBaiHoc(false); veCanh(canh.length - 1); });
    nutDocBai.addEventListener('click', function () { thoiNoi(); doc(truyen.baiHoc); });
    nutSangHoi.addEventListener('click', function () {
      thoiNoi();
      if (tuyChon.xong) tuyChon.xong(truyen);
    });

    function hienBaiHoc(bat) {
      [thanh, oHinh, oLoi, hangNut].forEach(function (o) {
        o.style.display = bat ? 'none' : '';
      });
      khoiBaiHoc.style.display = bat ? '' : 'none';
    }

    function xongTruyen() {
      if (huy) return;
      thoiNoi();
      hienBaiHoc(true);
    }

    function dung() {
      huy = true;
      thoiNoi();
      global.document.removeEventListener('keydown', phim);
    }

    veCanh(0);

    return { dung: dung };
  }

  global.KeChuyen = { ke: ke };
})(window);
