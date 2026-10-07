/* ===== Nhân vật của game "Giải cứu công chúa" =====
   Hiệp sĩ và rồng dùng sticker trên GIPHY (có ghi công ở cuối trang game);
   công chúa và lồng giam tự vẽ bằng SVG.
   Mỗi ảnh ngoài đều có đường lui: tải không được thì tự thay bằng bản SVG,
   nên game vẫn chơi bình thường khi mất mạng.
   Muốn đổi ảnh khác chỉ cần sửa ANH ở ngay dưới đây.
*/
(function (global) {
  'use strict';

  // Hoạt hình Lottie tải sẵn trong assets/lottie; heSo chỉnh cho cân với khung cảnh
  var ANH = {
    hiepSi:   { tep: 'hiep-si', heSo: 1.5, tacGia: 'Abdul Latif' },
    rong:     { tep: 'rong', heSo: 1.9, tacGia: 'Matheus Mesquita' },
    congChua: { tep: 'cong-chua', heSo: 1.6, tacGia: 'Sharmin' }
  };

  function svg(noiDung, rong) {
    return '<svg viewBox="0 0 100 120" width="' + (rong || 74) + '" ' +
           'style="overflow:visible" aria-hidden="true">' + noiDung + '</svg>';
  }

  // Hiệp sĩ nhỏ — bản vẽ dự phòng khi ảnh không tải được
  function hiepSiSVG(rong) {
    return svg(
      '<ellipse cx="50" cy="114" rx="22" ry="5" fill="rgba(43,47,85,.14)"/>' +
      '<rect x="36" y="86" width="11" height="24" rx="5" fill="#3b4a7a"/>' +
      '<rect x="53" y="86" width="11" height="24" rx="5" fill="#3b4a7a"/>' +
      '<rect x="30" y="46" width="40" height="46" rx="14" fill="#4aa8ff"/>' +
      '<path d="M30 60 h40" stroke="#2b7fd4" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="50" cy="28" r="20" fill="#ffd9b8"/>' +
      '<path d="M30 28 a20 20 0 0 1 40 0 v-3 a20 20 0 0 0 -40 0z" fill="#8b7bf7"/>' +
      '<rect x="28" y="20" width="44" height="9" rx="4" fill="#8b7bf7"/>' +
      '<circle cx="43" cy="32" r="3" fill="#2b2f55"/>' +
      '<circle cx="58" cy="32" r="3" fill="#2b2f55"/>' +
      '<path d="M44 40 q6 5 12 0" stroke="#2b2f55" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M72 44 l10 -16 4 3 -9 17z" fill="#c3cbec"/>' +
      '<rect x="70" y="42" width="12" height="5" rx="2" fill="#8a6400"/>' +
      '<path d="M18 52 h16 v18 q0 10 -8 14 -8 -4 -8 -14z" fill="#ffc93c"/>',
      rong);
  }

  function hiepSi(rong) {
    var c = Math.round((rong || 74) * ANH.hiepSi.heSo);
    return global.HoatHinh.ve(ANH.hiepSi.tep, c, 'NhanVat.hiepSiSVG');
  }

  // Công chúa — vương miện, váy hồng
  function hinhCongChua(coBong) {
    return (coBong ? '<ellipse cx="50" cy="114" rx="24" ry="5" fill="rgba(43,47,85,.14)"/>' : '') +
      '<path d="M50 48 l26 62 h-52z" fill="#ff8fd0"/>' +
      '<path d="M50 48 l10 62 h-20z" fill="#ffa8da"/>' +
      '<circle cx="50" cy="28" r="20" fill="#ffd9b8"/>' +
      '<path d="M26 26 a24 24 0 0 1 48 0 q-6 -14 -24 -14 -18 0 -24 14z" fill="#ffc93c"/>' +
      '<path d="M30 20 l5 -12 7 9 8 -13 8 13 7 -9 5 12z" fill="#ffd84d"/>' +
      '<circle cx="42" cy="8" r="3" fill="#ff7a7a"/>' +
      '<circle cx="43" cy="32" r="3" fill="#2b2f55"/>' +
      '<circle cx="58" cy="32" r="3" fill="#2b2f55"/>' +
      '<circle cx="36" cy="38" r="4" fill="#ff9aa2" opacity=".6"/>' +
      '<circle cx="65" cy="38" r="4" fill="#ff9aa2" opacity=".6"/>' +
      '<path d="M44 40 q6 6 12 0" stroke="#2b2f55" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  }

  function congChuaSVG(rong) {
    return svg(hinhCongChua(true), rong);
  }

  function congChua(rong) {
    var c = Math.round((rong || 74) * ANH.congChua.heSo);
    return global.HoatHinh.ve(ANH.congChua.tep, c, 'NhanVat.congChuaSVG');
  }

  // Rồng — bản vẽ dự phòng khi ảnh không tải được
  function rongSVG(rong_) {
    return svg(
      '<ellipse cx="50" cy="116" rx="30" ry="6" fill="rgba(43,47,85,.16)"/>' +
      '<path d="M16 54 q-14 -22 2 -30 2 16 14 20z" fill="#6a58e0"/>' +
      '<path d="M84 54 q14 -22 -2 -30 -2 16 -14 20z" fill="#6a58e0"/>' +
      '<rect x="24" y="44" width="52" height="60" rx="22" fill="#2fcf90"/>' +
      '<ellipse cx="50" cy="86" rx="17" ry="20" fill="#bdf3dc"/>' +
      '<circle cx="50" cy="38" r="26" fill="#2fcf90"/>' +
      '<path d="M30 16 l6 14 -13 -2z" fill="#1fa872"/>' +
      '<path d="M70 16 l-6 14 13 -2z" fill="#1fa872"/>' +
      '<ellipse cx="50" cy="48" rx="15" ry="11" fill="#bdf3dc"/>' +
      '<circle cx="45" cy="47" r="2.4" fill="#2b2f55"/>' +
      '<circle cx="56" cy="47" r="2.4" fill="#2b2f55"/>' +
      '<path d="M40 34 l12 4" stroke="#1fa872" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M60 34 l-12 4" stroke="#1fa872" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="41" cy="38" r="4.5" fill="#fff"/><circle cx="42" cy="38" r="2.6" fill="#2b2f55"/>' +
      '<circle cx="60" cy="38" r="4.5" fill="#fff"/><circle cx="59" cy="38" r="2.6" fill="#2b2f55"/>' +
      '<path d="M43 54 q7 5 14 0" stroke="#1fa872" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      rong_);
  }

  function rong(rong_) {
    var c = Math.round((rong_ || 74) * ANH.rong.heSo);
    return global.HoatHinh.ve(ANH.rong.tep, c, 'NhanVat.rongSVG');
  }

  // Lồng giam — công chúa đang bị nhốt bên trong
  function long(rong) {
    return svg(
      '<ellipse cx="50" cy="110" rx="30" ry="5" fill="rgba(43,47,85,.14)"/>' +
      '<rect x="18" y="26" width="64" height="80" rx="8" fill="#e2e7fb"/>' +
      '<rect x="24" y="32" width="52" height="68" rx="5" fill="#fff6fb"/>' +
      '<g transform="translate(24,34) scale(.52)">' + hinhCongChua(false) + '</g>' +
      '<g stroke="#9aa3c7" stroke-width="4" stroke-linecap="round">' +
      '<path d="M34 32 v68"/><path d="M50 32 v68"/><path d="M66 32 v68"/></g>' +
      '<rect x="14" y="20" width="72" height="12" rx="6" fill="#8b7bf7"/>' +
      '<rect x="24" y="98" width="52" height="8" rx="3" fill="#c3cbec"/>',
      rong);
  }

  global.NhanVat = {
    hiepSi: hiepSi, hiepSiSVG: hiepSiSVG,
    rong: rong, rongSVG: rongSVG,
    congChua: congChua, congChuaSVG: congChuaSVG, long: long, ANH: ANH
  };
})(window);
