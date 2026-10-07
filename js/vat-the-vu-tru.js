/* ===== Vật thể trong game "Du hành vũ trụ" =====
   Phi thuyền dùng sticker của jupag trên GIPHY; nếu ảnh không tải được
   thì tự động rơi về bản SVG vẽ sẵn bên dưới, nên game vẫn chơi được khi mất mạng.
*/
(function (global) {
  'use strict';

  var ANH_PHI_THUYEN = 'https://media.giphy.com/media/pcyoWXeoHCapjCvCTQ/giphy.gif';

  function phiThuyenSVG(rong) {
    return '<svg viewBox="0 0 80 120" width="' + (rong || 62) + '" aria-hidden="true">' +
      '<ellipse cx="40" cy="116" rx="13" ry="4" fill="rgba(255,255,255,.18)"/>' +
      '<path d="M40 6 q20 24 20 56 v18 h-40 v-18 q0 -32 20 -56z" fill="#eef2ff"/>' +
      '<path d="M40 6 q20 24 20 56 h-20z" fill="#c3cbec"/>' +
      '<circle cx="40" cy="48" r="11" fill="#4aa8ff" stroke="#2b7fd4" stroke-width="3"/>' +
      '<path d="M20 70 l-13 24 13 -6z" fill="#ff7a7a"/>' +
      '<path d="M60 70 l13 24 -13 -6z" fill="#ff7a7a"/>' +
      '<path d="M32 96 h16 l-3 10 h-10z" fill="#ffc93c"/>' +
      '<path d="M34 106 q6 12 12 0 -6 6 -12 0z" fill="#ff8f3c"/>' +
      '</svg>';
  }

  // thẻ ảnh có sẵn đường lui: ảnh lỗi thì thay bằng SVG
  function phiThuyen(rong) {
    var id = 'pt' + Math.random().toString(36).slice(2, 8);
    return '<span id="' + id + '" class="phi-thuyen">' +
      '<img src="' + ANH_PHI_THUYEN + '" width="' + (rong || 62) + '" alt="phi thuyền" ' +
      'onerror="var o=document.getElementById(\'' + id + '\'); if(o) o.innerHTML=' +
      'window.VatTheVuTru.phiThuyenSVG(' + (rong || 62) + ');">' +
      '</span>';
  }

  // Hành tinh: vòng tròn có vành đai và vài hố
  function hanhTinh(mau, mauToi, coVanh, rong) {
    var d = rong || 86;
    return '<svg viewBox="0 0 120 120" width="' + d + '" aria-hidden="true">' +
      (coVanh ? '<ellipse cx="60" cy="62" rx="56" ry="15" fill="none" stroke="' + mauToi +
                '" stroke-width="6" opacity=".55" transform="rotate(-18 60 62)"/>' : '') +
      '<circle cx="60" cy="60" r="38" fill="' + mau + '"/>' +
      '<path d="M26 72 a38 38 0 0 0 68 -16 a38 38 0 0 1 -68 16z" fill="' + mauToi + '" opacity=".45"/>' +
      '<circle cx="46" cy="48" r="7" fill="' + mauToi + '" opacity=".5"/>' +
      '<circle cx="72" cy="66" r="5" fill="' + mauToi + '" opacity=".4"/>' +
      '<circle cx="62" cy="38" r="3.5" fill="' + mauToi + '" opacity=".45"/>' +
      (coVanh ? '<path d="M8 70 a56 15 0 0 0 104 -16" fill="none" stroke="' + mauToi +
                '" stroke-width="6" opacity=".55" transform="rotate(-18 60 62)"/>' : '') +
      '</svg>';
  }

  function tram(rong) {
    var d = rong || 96;
    return '<svg viewBox="0 0 120 120" width="' + d + '" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="34" fill="#ffd96b"/>' +
      '<circle cx="60" cy="60" r="34" fill="none" stroke="#e0a800" stroke-width="3"/>' +
      '<rect x="8" y="54" width="34" height="12" rx="4" fill="#8b7bf7"/>' +
      '<rect x="78" y="54" width="34" height="12" rx="4" fill="#8b7bf7"/>' +
      '<rect x="52" y="6" width="16" height="22" rx="5" fill="#c3cbec"/>' +
      '<circle cx="60" cy="60" r="15" fill="#fff" opacity=".65"/>' +
      '<circle cx="60" cy="60" r="7" fill="#4aa8ff"/>' +
      '</svg>';
  }

  global.VatTheVuTru = {
    phiThuyen: phiThuyen,
    phiThuyenSVG: phiThuyenSVG,
    hanhTinh: hanhTinh,
    tram: tram,
    ANH_PHI_THUYEN: ANH_PHI_THUYEN
  };
})(window);
