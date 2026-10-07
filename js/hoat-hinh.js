/* ===== Hoạt hình Lottie =====
   Các tệp .lottie nằm trong assets/lottie/ (tải sẵn về repo, không phụ thuộc mạng ngoài).
   Trình phát là web component dotlottie-wc nạp từ CDN; nếu CDN không tới được thì
   mỗi hoạt hình tự rơi về bản SVG vẽ tay, nên trang vẫn dùng bình thường.
*/
(function (global) {
  'use strict';

  // tự suy ra đường dẫn assets từ vị trí của chính tệp script này
  var GOC = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/js\/hoat-hinh\.js.*$/, 'assets/lottie/') : 'assets/lottie/';
  })();

  var SAN_SANG = false;
  var CHO = [];

  function sanSang() {
    SAN_SANG = true;
    CHO.length = 0;
  }

  if (global.customElements) {
    if (customElements.get('dotlottie-wc')) sanSang();
    else customElements.whenDefined('dotlottie-wc').then(sanSang);
  }

  /**
   * ve(ten, cao, duPhong)
   *   ten     — tên tệp trong assets/lottie, không kèm đuôi
   *   cao     — chiều cao hiển thị, px
   *   duPhong — tên hàm toàn cục vẽ SVG thay thế, ví dụ 'NhanVat.rongSVG'
   */
  function ve(ten, cao, duPhong) {
    var id = 'lt' + Math.random().toString(36).slice(2, 8);

    // nếu sau 3,5 giây trình phát vẫn chưa sẵn sàng thì dùng bản vẽ tay
    if (duPhong) {
      setTimeout(function () {
        var o = document.getElementById(id);
        if (!o || SAN_SANG) return;
        try {
          var duong = duPhong.split('.');
          var fn = global[duong[0]] && global[duong[0]][duong[1]];
          if (fn) o.innerHTML = fn(cao);
        } catch (e) { /* vẫn còn ô trống, không sao */ }
      }, 3500);
    }

    return '<span id="' + id + '" class="hoat" style="--cao:' + cao + 'px">' +
      '<dotlottie-wc src="' + GOC + ten + '.lottie" autoplay loop ' +
      'style="width:' + cao + 'px;height:' + cao + 'px"></dotlottie-wc></span>';
  }

  global.HoatHinh = { ve: ve, GOC: GOC };
})(window);
