/* ===== Kéo thả cho bé =====

   Bé cầm một vật (con vật, món ăn…) kéo tới thả vào một trong mấy đích.

   Dùng Pointer Events chứ không tách riêng chuột với cảm ứng: một bộ sự kiện
   chạy được cả ngón tay trên điện thoại lẫn chuột trên máy tính.

   Mấy điều cố ý vì người dùng là bé hai tới năm tuổi:
   - Đích nào nằm dưới NGÓN TAY thì tính là đích đó, chứ không xét tâm của
     vật đang kéo. Bé nhìn vào chỗ ngón tay mình chứ không nhìn cái hình.
   - Thả ra ngoài mọi đích thì vật trôi êm về chỗ cũ, không tính sai. Bé
     tuột tay là chuyện thường.
   - Chạm nhẹ một cái mà không kéo thì không làm gì cả. Chủ dự án dặn rõ:
     không chọn bằng cách bấm vào nơi chốn nữa, phải cầm con vật đặt vào.
*/
(function (global) {
  'use strict';

  /* gan(vat, cacDich, tuyChon)

     vat      — phần tử bé cầm kéo
     cacDich  — mảng phần tử làm đích thả
     tuyChon.khiTha(dich)    — thả lên một đích; dich là phần tử đích
     tuyChon.khiDiQua(dich)  — ngón tay đi vào hoặc ra khỏi một đích (null)

     Trả về { go, veCho, khoa } — go gỡ hết sự kiện, veCho đưa vật về chỗ cũ,
     khoa(true) tạm không cho kéo (lúc đang chạy hoạt ảnh chấm điểm). */
  function gan(vat, cacDich, tuyChon) {
    tuyChon = tuyChon || {};
    var x0 = 0, y0 = 0, dangKeo = false, ma = null, dangKhoa = false, dichNay = null;

    // chặn trình duyệt cuộn trang khi bé kéo, kẻo vừa kéo vừa trôi màn hình
    vat.style.touchAction = 'none';

    function dichDuoi(x, y) {
      for (var i = 0; i < cacDich.length; i++) {
        var r = cacDich[i].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return cacDich[i];
      }
      return null;
    }

    function diQua(d) {
      if (d === dichNay) return;
      dichNay = d;
      if (tuyChon.khiDiQua) tuyChon.khiDiQua(d);
    }

    function xuong(e) {
      if (dangKhoa || dangKeo) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dangKeo = true;
      ma = e.pointerId;
      x0 = e.clientX; y0 = e.clientY;
      try { vat.setPointerCapture(ma); } catch (_) { /* máy cũ không có */ }
      vat.style.transition = 'none';
      vat.classList.add('dang-keo');
      e.preventDefault();
    }

    function di(e) {
      if (!dangKeo || e.pointerId !== ma) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      vat.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.08)';
      diQua(dichDuoi(e.clientX, e.clientY));
    }

    function len(e) {
      if (!dangKeo || e.pointerId !== ma) return;
      dangKeo = false;
      try { vat.releasePointerCapture(ma); } catch (_) {}
      vat.classList.remove('dang-keo');
      var d = dichDuoi(e.clientX, e.clientY);
      diQua(null);
      // kéo chưa tới đâu (chạm nhẹ) hoặc thả ra ngoài: về chỗ cũ, không tính gì
      var xa = Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0);
      if (!d || xa < 12) { veCho(); return; }
      if (tuyChon.khiTha) tuyChon.khiTha(d);
    }

    function huyKeo(e) {
      if (!dangKeo || e.pointerId !== ma) return;
      dangKeo = false;
      vat.classList.remove('dang-keo');
      diQua(null);
      veCho();
    }

    function veCho() {
      vat.style.transition = 'transform .32s cubic-bezier(.3,1.4,.6,1)';
      vat.style.transform = '';
    }

    vat.addEventListener('pointerdown', xuong);
    vat.addEventListener('pointermove', di);
    vat.addEventListener('pointerup', len);
    vat.addEventListener('pointercancel', huyKeo);

    return {
      go: function () {
        vat.removeEventListener('pointerdown', xuong);
        vat.removeEventListener('pointermove', di);
        vat.removeEventListener('pointerup', len);
        vat.removeEventListener('pointercancel', huyKeo);
      },
      veCho: veCho,
      khoa: function (b) { dangKhoa = !!b; }
    };
  }

  global.KeoTha = { gan: gan };
})(window);
