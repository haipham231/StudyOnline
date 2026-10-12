/* ===== Bộ kể chuyện cho khu Bé ngoan =====

   Mỗi cảnh là một màn hình: hình to ở giữa, lời kể ở dưới. Máy đọc lời kể,
   chữ gõ ra theo nhịp đọc, đọc xong thì tự sang cảnh sau. Bé hai tuổi không
   bấm kịp nên tự chạy là mặc định; nút chỉ để bé chủ động khi muốn.

   Vì sao không dùng lại hàm gõ chữ trong js/tro-ly.js: hàm đó xếp chồng
   nhiều câu vào một hộp cuộn được của popup giảng bài, còn ở đây mỗi cảnh
   thay cả hình lẫn chữ rồi mới sang cảnh sau. Hơn nữa tro-ly.js đang được
   mười ba trang nạp và chạy tốt, tách hàm ra là phải sửa cả mười ba trang.
   Chép lại cái nhịp "chờ cả gõ lẫn đọc cùng xong" thì rẻ hơn nhiều.
*/
(function (global) {
  'use strict';

  function el(tag, cls, html) {
    var o = global.document.createElement(tag);
    if (cls) o.className = cls;
    if (html != null) o.innerHTML = html;
    return o;
  }

  // dùng chung khoá với Cô Nhi, bé tắt tiếng ở đâu thì tắt cả hai nơi
  var KHOA_TIENG = 'studyonline:co-noi';

  function dangBatTieng() {
    try { return global.localStorage.getItem(KHOA_TIENG) !== '0'; } catch (e) { return true; }
  }
  function datTieng(bat) {
    try { global.localStorage.setItem(KHOA_TIENG, bat ? '1' : '0'); } catch (e) { /* chế độ riêng tư */ }
  }
  function thoiNoi() {
    if (global.speechSynthesis) { try { global.speechSynthesis.cancel(); } catch (e) {} }
  }

  function anh(duong) {
    if (global.HinhVe && global.HinhVe.veTen) return global.HinhVe.veTen(duong, 'hinh-canh');
    return '';
  }

  /* ke(khung, truyen, tuyChon)

     tuyChon.xong(truyen)  — gọi khi kể hết và bé đã nghe xong thẻ bài học
     Trả về { dung: fn } để trang gọi lúc rời đi, kẻo máy còn đọc dở. */
  function ke(khung, truyen, tuyChon) {
    tuyChon = tuyChon || {};
    var canh = truyen.canh;
    var i = 0;                 // cảnh đang kể
    var huy = false;
    var hen = null;            // hẹn giờ gõ chữ
    var henSang = null;        // hẹn giờ sang cảnh sau
    var chuoi = null, vt = 0;  // chuỗi chữ đang gõ và vị trí
    var goXong = false, docXong = false, daSang = false;

    khung.innerHTML = '';
    var san = el('div', 'san-truyen');
    khung.appendChild(san);

    var thanh = el('div', 'thanh-canh');
    canh.forEach(function () { thanh.appendChild(el('i', 'cham-canh')); });
    san.appendChild(thanh);

    var oHinh = el('div', 'khung-canh');
    san.appendChild(oHinh);

    var oLoi = el('p', 'loi-canh');
    san.appendChild(oLoi);

    var hangNut = el('div', 'nut-truyen');
    var nutNghe = el('button', 'btn phu', '🔁 Nghe lại');
    nutNghe.type = 'button';
    var nutTiep = el('button', 'btn chinh', 'Tiếp ▶');
    nutTiep.type = 'button';
    var nutLoa = el('button', 'btn phu loa-truyen', '');
    nutLoa.type = 'button';
    hangNut.appendChild(nutNghe);
    hangNut.appendChild(nutLoa);
    hangNut.appendChild(nutTiep);
    san.appendChild(hangNut);

    function veLoa() {
      var bat = dangBatTieng();
      nutLoa.innerHTML = bat ? '🔊 Đang đọc' : '🔇 Tắt tiếng';
      nutLoa.setAttribute('aria-pressed', bat ? 'true' : 'false');
    }
    veLoa();

    nutLoa.addEventListener('click', function () {
      var bat = !dangBatTieng();
      datTieng(bat);
      veLoa();
      if (!bat) { thoiNoi(); docXong = true; thuSang(); }
    });

    nutNghe.addEventListener('click', function () { veCanh(i); });
    nutTiep.addEventListener('click', sangNgay);
    // chạm vào hình cũng sang cảnh sau, bé nhỏ bấm nút chưa chuẩn
    oHinh.addEventListener('click', sangNgay);

    function sangNgay() {
      if (huy) return;
      dungNhip();
      if (vt < (chuoi ? chuoi.length : 0)) {   // đang gõ dở thì hiện trọn câu đã
        oLoi.innerHTML = chuoi.join('');
        vt = chuoi.length;
        goXong = true;
        docXong = true;
        return;
      }
      i++;
      if (i < canh.length) veCanh(i); else xongTruyen();
    }

    function dungNhip() {
      clearTimeout(hen); clearTimeout(henSang);
      thoiNoi();
      daSang = false;
    }

    function veCanh(k) {
      if (huy) return;
      dungNhip();
      i = k;
      goXong = false; docXong = false; daSang = false;

      for (var d = 0; d < thanh.children.length; d++) {
        thanh.children[d].className = 'cham-canh' + (d < k ? ' qua' : d === k ? ' nay' : '');
      }

      oHinh.innerHTML = anh(canh[k].hinh);
      oHinh.classList.remove('hien');
      // ép trình duyệt tính lại để hoạt ảnh hiện hình chạy mỗi cảnh
      void oHinh.offsetWidth;
      oHinh.classList.add('hien');

      oLoi.innerHTML = '';
      chuoi = canh[k].loi.split('');
      vt = 0;

      var coTieng = dangBatTieng();
      if (coTieng && global.Quiz && global.Quiz.docTo) {
        global.Quiz.docTo(canh[k].loi, 'vi', {
          xong: function () { docXong = true; thuSang(); }
        });
      } else {
        docXong = true;
      }
      goTiep();
    }

    /* Gõ chữ. Bật tiếng thì gõ chậm lại cho khớp nhịp đọc, nghỉ lâu hơn ở
       dấu phẩy và dấu chấm — nghe mới ra câu chứ không thành một tràng. */
    function goTiep() {
      if (huy) return;
      if (vt >= chuoi.length) { goXong = true; thuSang(); return; }
      oLoi.textContent = chuoi.slice(0, vt + 1).join('');
      var c = chuoi[vt];
      vt++;
      var coTieng = dangBatTieng();
      var cho = coTieng ? 34 : 18;
      if (c === ',' || c === ';' || c === ':') cho = coTieng ? 190 : 150;
      else if (c === '.' || c === '!' || c === '?') cho = coTieng ? 300 : 240;
      hen = setTimeout(goTiep, cho);
    }

    function thuSang() {
      if (huy || daSang || !goXong || !docXong) return;
      daSang = true;
      henSang = setTimeout(function () {
        if (huy) return;
        i++;
        if (i < canh.length) veCanh(i); else xongTruyen();
      }, 900);
    }

    function xongTruyen() {
      if (huy) return;
      dungNhip();
      san.innerHTML = '';
      var the = el('div', 'the-bai-hoc');
      the.appendChild(el('div', 'nhan-bai-hoc', '🌟 Bài học hôm nay'));
      the.appendChild(el('p', 'chu-bai-hoc', truyen.baiHoc));
      san.appendChild(the);

      var nut = el('button', 'btn chinh nut-sang-hoi', 'Trả lời câu hỏi ▶');
      nut.type = 'button';
      san.appendChild(nut);
      nut.addEventListener('click', function () {
        thoiNoi();
        if (tuyChon.xong) tuyChon.xong(truyen);
      });

      if (dangBatTieng() && global.Quiz && global.Quiz.docTo) {
        global.Quiz.docTo(truyen.baiHoc, 'vi', {});
      }
    }

    veCanh(0);

    return {
      dung: function () { huy = true; dungNhip(); }
    };
  }

  global.KeChuyen = { ke: ke, dangBatTieng: dangBatTieng, datTieng: datTieng };
})(window);
