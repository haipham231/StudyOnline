/* ===== Vật thể trong game "Du hành vũ trụ" =====
   Phi thuyền, hành tinh, cổng đáp án và mấy thứ trôi nổi đều là ảnh tự vẽ
   trong assets/vu-tru. Trước đây dùng chung một hoạt hình Lottie cho mọi
   chặng nên chặng nào cũng giống nhau.
*/
(function (global) {
  'use strict';

  // tự suy ra thư mục ảnh từ vị trí của chính tệp script này
  var GOC = (function () {
    var ds = document.getElementsByTagName('script');
    for (var i = ds.length - 1; i >= 0; i--) {
      var src = ds[i].src || '';
      if (/vat-the-vu-tru\.js(\?|$)/.test(src)) return src.replace(/js\/vat-the-vu-tru\.js.*$/, '');
    }
    return '';
  })();

  /* Mười hai hành tinh và sáu nền trời. Mỗi lớp lấy một bộ khác nhau nên bay
     hết lớp này sang lớp khác không gặp lại cảnh cũ. */
  var HANH_TINH = ['vanh-bang', 'dung-nham', 'keo', 'dai-duong', 'nam', 'pha-le',
                   'banh-rang', 'banh-vong', 'may', 'sa-mac', 'rung', 'bang-gia'];
  var NEN = ['tinh-van', 'vanh-da', 'hanh-tinh-khi', 'dung-nham', 'thien-ha', 'vung-sau'];
  var VAT = ['da-xam', 'da-do', 'chum-da', 'sao-choi', 'mat-trang', 've-tinh',
             'pha-le', 'bu-long', 'ngoi-sao', 'binh-nhien-lieu'];

  /* Vật trôi nổi hợp với từng nền: vành đai thì toàn đá, thiên hà thì sao
     và pha lê, vùng sâu thì sao chổi với rác vũ trụ. */
  var VAT_THEO_NEN = {
    'tinh-van': ['pha-le', 'ngoi-sao', 'chum-da'],
    'vanh-da': ['da-xam', 'da-do', 'chum-da', 'mat-trang'],
    'hanh-tinh-khi': ['mat-trang', 've-tinh', 'ngoi-sao'],
    'dung-nham': ['da-do', 'da-xam', 'chum-da'],
    'thien-ha': ['ngoi-sao', 'sao-choi', 'pha-le'],
    'vung-sau': ['sao-choi', 've-tinh', 'bu-long', 'binh-nhien-lieu']
  };

  function vatTheoNen(ten) {
    return VAT_THEO_NEN[ten] || VAT_THEO_NEN['tinh-van'];
  }

  function anh(duong, cao, cls) {
    return '<img class="' + (cls || 'anh-vt') + '" src="' + GOC + 'assets/vu-tru/' + duong +
      '" alt="" draggable="false" style="height:' + cao + 'px;width:auto">';
  }

  function duongNen(ten) {
    return GOC + 'assets/vu-tru/nen/' + (NEN.indexOf(ten) >= 0 ? ten : NEN[0]) + '.jpg';
  }

  function duongVat(ten) {
    return GOC + 'assets/vu-tru/vat/' + (VAT.indexOf(ten) >= 0 ? ten : VAT[0]) + '.png';
  }

  function phiThuyen(cao) { return anh('thuyen/thuyen-thang.png', cao || 62, 'anh-thuyen'); }

  function hanhTinh(ten, cao) {
    return anh('hanh-tinh/' + (HANH_TINH.indexOf(ten) >= 0 ? ten : HANH_TINH[0]) + '.png',
               cao || 86, 'anh-hanh-tinh');
  }

  function tram(cao) { return anh('thuyen/tram.png', cao || 96, 'anh-tram'); }
  function cup(cao) { return anh('thuyen/cup.png', cao || 96, 'anh-cup'); }
  function denHieu(cao) { return anh('thuyen/den-hieu.png', cao || 72, 'anh-den-hieu'); }
  function pin(cao) { return anh('thuyen/pin.png', cao || 40, 'anh-pin'); }

  global.VatTheVuTru = {
    HANH_TINH: HANH_TINH, NEN: NEN, VAT: VAT, GOC: GOC,
    phiThuyen: phiThuyen,
    hanhTinh: hanhTinh,
    tram: tram,
    cup: cup,
    denHieu: denHieu,
    pin: pin,
    duongNen: duongNen,
    duongVat: duongVat,
    vatTheoNen: vatTheoNen
  };
})(window);
