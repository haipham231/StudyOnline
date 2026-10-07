/* ===== Danh hiệu =====
   Mở khoá dựa trên kết quả đã lưu: kỷ lục từng bài, tiến độ game, điểm kiểm tra.
   Không lưu trùng dữ liệu — chỉ đọc lại những gì các trang khác đã ghi.
*/
(function (global) {
  'use strict';

  var STORE = 'studyonline:';
  var DA_XEM = STORE + 'danhhieu-daxem';

  function doc(khoa) {
    try { return JSON.parse(localStorage.getItem(STORE + khoa) || 'null'); } catch (e) { return null; }
  }

  // số sao của một bài, 0 nếu chưa làm
  function sao(id) {
    var b = doc(id);
    return b ? (b.correct / b.total >= 0.9 ? 3 : b.correct / b.total >= 0.7 ? 2 : b.correct / b.total >= 0.5 ? 1 : 0) : 0;
  }

  function diemKiemTra(id) {
    try {
      var ds = JSON.parse(localStorage.getItem(STORE + 'lichsu:' + id) || '[]');
      return ds.reduce(function (m, x) { return Math.max(m, x.diem || 0); }, 0);
    } catch (e) { return 0; }
  }

  function game(ten) { return doc(ten) || {}; }

  function tongSaoCua(ds) {
    return ds.reduce(function (t, id) { return t + sao(id); }, 0);
  }

  var DANH_HIEU = [
    /* ---- Lớp 1 ---- */
    { id: 'tap-su', e: '🌱', ten: 'Tân Binh', mo: 'Hoàn thành bài tập đầu tiên', khu: 'lop-1',
      dat: function () { return tongSaoCua(['cong-tru', 'tach-gop', 'so-sanh', 'toan-do']) > 0; } },
    { id: 'cong-tru-gioi', e: '➕', ten: 'Bậc Thầy Phép Cộng', mo: 'Đạt 3 sao bài Cộng trừ', khu: 'lop-1',
      dat: function () { return sao('cong-tru') === 3; } },
    { id: 'tach-gop-gioi', e: '🧱', ten: 'Kiến Trúc Sư Tách Gộp', mo: 'Đạt 3 sao bài Tách gộp số', khu: 'lop-1',
      dat: function () { return sao('tach-gop') === 3; } },
    { id: 'giu-thoi-gian', e: '🕐', ten: 'Người Giữ Thời Gian', mo: 'Đạt 3 sao bài Xem giờ', khu: 'lop-1',
      dat: function () { return sao('xem-gio') === 3; } },
    { id: 'tho-do', e: '📏', ten: 'Thợ Đo Lành Nghề', mo: 'Đạt 3 sao bài Đo độ dài', khu: 'lop-1',
      dat: function () { return sao('do-do-dai') === 3; } },
    { id: 'ngon-ngu-nhi', e: '📚', ten: 'Nhà Ngôn Ngữ Nhí', mo: 'Đạt 3 sao ở 3 bài Tiếng Việt', khu: 'lop-1',
      dat: function () {
        var ds = ['tv-chu-cai', 'tv-ghep-van', 'tv-thanh-dieu', 'tv-quy-tac', 'tv-chinh-ta',
                  'tv-tu-ngu', 'tv-cau', 'tv-doc-hieu'];
        return ds.filter(function (id) { return sao(id) === 3; }).length >= 3;
      } },
    { id: 'cuu-cong-chua', e: '👑', ten: 'Người Cứu Công Chúa', mo: 'Thắng game Giải cứu công chúa', khu: 'lop-1',
      dat: function () { return !!game('game-cong-chua').daCuu; } },
    { id: 'vua-halloween', e: '🎃', ten: 'Vua Halloween', mo: 'Thắng game Đêm Halloween', khu: 'lop-1',
      dat: function () { return !!game('game-halloween').thang; } },
    { id: 'tho-san-keo', e: '🍬', ten: 'Thợ Săn Kẹo', mo: 'Gom được 60 viên kẹo', khu: 'lop-1',
      dat: function () { return (game('game-halloween').keo || 0) >= 60; } },
    { id: 'hoc-sinh-gioi-1', e: '🏅', ten: 'Học Sinh Giỏi', mo: 'Đạt từ 9 điểm một bài kiểm tra', khu: 'lop-1',
      dat: function () { return diemKiemTra('kiem-tra') >= 9; } },

    /* ---- Lớp 5 ---- */
    { id: 'phan-so-gioi', e: '🍰', ten: 'Bậc Thầy Phân Số', mo: 'Đạt 3 sao ở 3 bài phân số', khu: 'lop-5',
      dat: function () {
        var ds = ['l5-rut-gon-quy-dong', 'l5-cong-tru-phan-so', 'l5-nhan-chia-phan-so',
                  'l5-so-sanh-phan-so', 'l5-hon-so'];
        return ds.filter(function (id) { return sao(id) === 3; }).length >= 3;
      } },
    { id: 'thap-phan-gioi', e: '🔟', ten: 'Chuyên Gia Thập Phân', mo: 'Đạt 3 sao ở 3 bài số thập phân', khu: 'lop-5',
      dat: function () {
        var ds = ['l5-cong-tru-thap-phan', 'l5-nhan-chia-thap-phan', 'l5-lam-tron',
                  'l5-doi-phan-so-thap-phan', 'l5-tim-x'];
        return ds.filter(function (id) { return sao(id) === 3; }).length >= 3;
      } },
    { id: 'phan-tram-gioi', e: '💯', ten: 'Trùm Phần Trăm', mo: 'Đạt 3 sao bài Tỉ số phần trăm', khu: 'lop-5',
      dat: function () { return sao('l5-ti-so-phan-tram') === 3; } },
    { id: 'ky-su-hinh-hoc', e: '📐', ten: 'Kỹ Sư Hình Học', mo: 'Đạt 3 sao ở 3 bài hình học', khu: 'lop-5',
      dat: function () {
        var ds = ['l5-dien-tich-hinh-phang', 'l5-hinh-tron', 'l5-hinh-hop', 'l5-tinh-nguoc'];
        return ds.filter(function (id) { return sao(id) === 3; }).length >= 3;
      } },
    { id: 'nha-tham-hiem', e: '🧭', ten: 'Nhà Thám Hiểm Ngược', mo: 'Đạt 3 sao bài Tính ngược', khu: 'lop-5',
      dat: function () { return sao('l5-tinh-nguoc') === 3; } },
    { id: 'phi-hanh-gia', e: '🚀', ten: 'Phi Hành Gia', mo: 'Tới được Trạm Thiên Hà', khu: 'lop-5',
      dat: function () { return !!game('game-vu-tru').veDich; } },
    { id: 'hoc-sinh-gioi-5', e: '🏅', ten: 'Học Sinh Giỏi', mo: 'Đạt từ 9 điểm một bài kiểm tra', khu: 'lop-5',
      dat: function () { return diemKiemTra('l5-kiem-tra') >= 9; } },
    { id: 'nha-toan-hoc', e: '🧮', ten: 'Nhà Toán Học Nhí', mo: 'Gom đủ 30 sao ở khu lớp 5', khu: 'lop-5',
      dat: function () {
        var tong = 0;
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(STORE + 'l5-') === 0 && k.indexOf('lichsu') === -1) {
            tong += sao(k.slice(STORE.length));
          }
        }
        return tong >= 30;
      } },

    /* ---- Mầm non ---- */
    { id: 'be-ngoan', e: '🧸', ten: 'Bé Ngoan', mo: 'Chơi xong 3 trò ở khu mầm non', khu: 'mam-non',
      dat: function () {
        var ds = ['mn-con-vat-an-gi', 'mn-con-vat-keu', 'mn-con-vat-o-dau', 'mn-mau-sac',
                  'mn-dem-den-5', 'mn-khac-nhom', 'mn-to-nho', 'mn-hinh-gi', 'mn-nhieu-it'];
        return ds.filter(function (id) { return sao(id) > 0; }).length >= 3;
      } },
    { id: 'bay-cao', e: '🧙‍♀️', ten: 'Bạn Của Phù Thuỷ', mo: 'Bay tới được Lâu Đài Mây', khu: 'mam-non',
      dat: function () { return !!game('game-phu-thuy').len; } },
    { id: 'nhat-sao', e: '⭐', ten: 'Người Nhặt Sao', mo: 'Nhặt được 20 ngôi sao khi bay', khu: 'mam-non',
      dat: function () { return (game('game-phu-thuy').ngoiSao || 0) >= 20; } },
    { id: 'be-noi-tieng-viet', e: '🇻🇳', ten: 'Bé Nói Tiếng Việt', mo: 'Đạt 3 sao ở 3 bài tiếng Việt mầm non', khu: 'mam-non',
      dat: function () {
        var ds = ['mn-tv-tu-vung', 'mn-tv-gia-dinh', 'mn-tv-co-the', 'mn-tv-chu-cai',
                  'mn-tv-dem-tieng-viet', 'mn-tv-chao-hoi'];
        return ds.filter(function (id) { return sao(id) === 3; }).length >= 3;
      } }
  ];

  function daXem() {
    try { return JSON.parse(localStorage.getItem(DA_XEM) || '[]'); } catch (e) { return []; }
  }

  function ghiDaXem(ds) {
    try { localStorage.setItem(DA_XEM, JSON.stringify(ds)); } catch (e) { /* bỏ qua */ }
  }

  function trangThai(khu) {
    return DANH_HIEU.filter(function (d) { return !khu || d.khu === khu; })
      .map(function (d) {
        var dat = false;
        try { dat = !!d.dat(); } catch (e) { dat = false; }
        return { id: d.id, e: d.e, ten: d.ten, mo: d.mo, khu: d.khu, dat: dat };
      });
  }

  // trả về các danh hiệu vừa mới đạt mà bé chưa được báo
  function moiDat() {
    var cu = daXem();
    var moi = trangThai().filter(function (d) { return d.dat && cu.indexOf(d.id) === -1; });
    if (moi.length) ghiDaXem(cu.concat(moi.map(function (d) { return d.id; })));
    return moi;
  }

  // dải huy hiệu để gắn vào trang chủ
  function veDai(khu) {
    var ds = trangThai(khu);
    var dat = ds.filter(function (d) { return d.dat; });
    return '<div class="dai-danh-hieu"><h2 class="nhom">Danh hiệu ' +
      '<span class="dem">' + dat.length + '/' + ds.length + '</span></h2><div class="huy-hieu">' +
      ds.map(function (d) {
        return '<div class="hh' + (d.dat ? ' dat' : '') + '" title="' + d.mo + '">' +
          '<span class="bieu-tuong">' + (d.dat ? d.e : '🔒') + '</span>' +
          '<b>' + d.ten + '</b><small>' + d.mo + '</small></div>';
      }).join('') + '</div></div>';
  }

  // thông báo nhỏ khi vừa mở khoá
  function baoMoiDat() {
    var moi = moiDat();
    if (!moi.length) return;
    // mở khoá nhiều cùng lúc thì chỉ hiện ba cái, còn lại gộp một dòng
    var HIEN = 3;
    var o = document.createElement('div');
    o.className = 'bao-danh-hieu';
    o.innerHTML = moi.slice(0, HIEN).map(function (d) {
      return '<div class="bao"><span>' + d.e + '</span><div><b>Mở khoá danh hiệu!</b>' +
        '<small>' + d.ten + '</small></div></div>';
    }).join('') + (moi.length > HIEN
      ? '<div class="bao"><span>🏅</span><div><b>Và thêm nữa</b><small>' +
        (moi.length - HIEN) + ' danh hiệu khác</small></div></div>'
      : '');
    document.body.appendChild(o);
    setTimeout(function () { o.classList.add('an'); }, 5200);
    setTimeout(function () { o.remove(); }, 6000);
  }

  global.DanhHieu = {
    DANH_HIEU: DANH_HIEU,
    trangThai: trangThai, moiDat: moiDat, veDai: veDai, baoMoiDat: baoMoiDat
  };
})(window);
