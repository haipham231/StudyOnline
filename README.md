# 🎈 Học cùng bé

Web học vui cho trẻ em, chia theo lứa tuổi — chạy hoàn toàn trong trình duyệt, không cần máy chủ.

👉 **Xem online:** https://haipham231.github.io/StudyOnline/

```
🎈 Học cùng bé  (trang cổng, chọn lứa tuổi)
├── 🧸 Mầm non — 3–4 tuổi
└── 🎒 Lớp 1   — 6–7 tuổi
```

## 🧸 Khu Mầm non (3–4 tuổi)

Bé chưa biết chữ nên **mọi câu hỏi đều được đọc to bằng tiếng Việt** (Web Speech API,
tự chọn giọng `vi-*` nếu máy có), lựa chọn là **hình cỡ lớn** kèm nhãn chữ nhỏ để
người lớn đọc cùng bé. Có nút 🔊 nghe lại.

| Trò chơi | Nội dung |
|---|---|
| 🍽️ Con vật ăn gì | Thỏ ăn cà rốt, mèo ăn cá, khỉ ăn chuối… |
| 🔊 Con gì kêu | Gâu gâu, meo meo, cạp cạp, ộp ộp… |
| 🏞️ Sống ở đâu | Dưới nước, trên cạn hay trên trời |
| 🎨 Màu sắc | Đỏ, vàng, xanh lá, xanh dương, cam, tím |
| 🖐️ Đếm cùng bé | Đếm đến 3, 5 hoặc 10 |
| 🧩 Cái nào khác nhóm | Con vật, trái cây, xe cộ, đồ chơi |
| 📐 To nhỏ, dài ngắn | To hơn – nhỏ hơn, dài – ngắn, cao – thấp |
| ⬜ Hình gì | Đâu là hình tròn, vuông, tam giác, chữ nhật |
| ⚖️ Nhiều hơn, ít hơn | So sánh số lượng hai nhóm |

Dữ liệu 22 con vật (emoji, thức ăn, nơi sống, tiếng kêu) nằm trong `js/con-vat.js`.

## 🎒 Khu Lớp 1 (6–7 tuổi)

Bám mạch kiến thức Toán 1 — Chương trình GDPT 2018. **Không có nhân chia.**

**Số và phép tính**

| Bài | Nội dung |
|---|---|
| ➕ Cộng trừ | Phạm vi 10 (có hình) · 20 (có nhớ) · 100 (không nhớ) |
| 🧱 Tách gộp số | Số 7 gồm 3 và mấy? · 3 và 4 gộp lại được mấy? |
| 🔟 Chục và đơn vị | Cấu tạo số có hai chữ số, có hình bó chục |
| 🧮 Tính dãy | Hai phép tính liền nhau: `3 + 2 + 4` |
| 🧩 Điền số còn thiếu | `3 + ? = 7`, `? − 4 = 5`, số tròn chục |
| ⚖️ So sánh số | Dấu `>`, `<`, `=` — số và cả phép tính |
| 🥇 Lớn nhất, bé nhất | Tìm số lớn nhất / bé nhất trong ba số |
| 🔢 Đếm và dãy số | Đếm hình, số liền trước/sau, dãy đếm thêm 1/2/5/10 |

**Hình học và đo lường**

| Bài | Nội dung |
|---|---|
| 🔷 Nhận biết hình | Vuông, tròn, tam giác, chữ nhật + đếm hình |
| 🧊 Hình khối | Khối lập phương, hộp chữ nhật, khối trụ, khối cầu |
| 📏 Đo độ dài | Thước kẻ vẽ bằng SVG, đọc số đo xăng-ti-mét |
| 🕐 Xem giờ | Đồng hồ kim, giờ đúng và giờ rưỡi |

**Giải toán có lời văn**

| Bài | Nội dung |
|---|---|
| 📖 Toán đố | 8 dạng: thêm, bớt, gộp nhóm, nhiều hơn, ít hơn, rời khỏi, tìm số lúc đầu, hơn kém |

### 📝 Bài kiểm tra

Ba bộ đề theo ba mốc của năm học, mỗi đề **20 câu** rút theo ma trận cố định từ
`js/toan-lop-1.js`, không trùng câu trong cùng một đề, thứ tự xáo trộn:

| Đề | Phạm vi | Ma trận |
|---|---|---|
| Giữa học kì 1 | Các số đến 10 | đếm 3 · thứ tự 2 · so sánh 4 · cộng trừ 4 · tách gộp 3 · điền số 2 · hình phẳng 2 |
| Cuối học kì 1 | Các số đến 20 | cộng trừ 7 · tách gộp 3 · điền số 3 · so sánh 2 · tính dãy 2 · hình phẳng 2 · hình khối 1 |
| Cuối năm học | Các số đến 100 | chục–đơn vị 3 · cộng trừ 7 · điền số 2 · so sánh 2 · dãy số 2 · toán đố 3 · xem giờ 1 · đo độ dài 1 · hình khối 1 |

Khác với phần luyện tập, bài kiểm tra **không báo đúng/sai từng câu** — bé làm hết rồi
máy mới chấm. Có đồng hồ đếm thời gian làm bài. Phiếu kết quả gồm:

- Điểm **thang 10** và xếp loại theo Thông tư 27 (Hoàn thành tốt / Hoàn thành / Chưa hoàn thành)
- **Biểu đồ theo từng mạch kiến thức** để biết bé còn yếu phần nào
- Danh sách các câu cần xem lại, kèm đáp án đúng và nhãn mạch kiến thức
- Lưu 5 lần làm bài gần nhất

## Cấu trúc

```
├── index.html            # cổng chọn lứa tuổi
├── css/style.css         # giao diện chung cho cả hai khu
├── js/
│   ├── quiz.js           # engine dùng chung (luyện tập + chế độ kiểm tra)
│   ├── toan-lop-1.js     # bộ sinh đề lớp 1 — trang bài tập và trang kiểm tra dùng chung
│   └── con-vat.js        # dữ liệu con vật (khu mầm non)
├── mam-non/
│   ├── index.html
│   └── bai-tap/*.html
└── lop-1/
    ├── index.html
    ├── kiem-tra.html     # ba bộ đề, chấm thang 10
    └── bai-tap/*.html
```

Đề sinh ngẫu nhiên mỗi lần chơi, chấm điểm ngay từng câu, có sao, confetti khi làm tốt.
Kỷ lục lưu bằng `localStorage` trên chính máy của bé — mỗi bài một khoá riêng.

## Thêm một bài mới

Tạo file trong `mam-non/bai-tap/` hoặc `lop-1/bai-tap/` rồi khai báo bộ sinh đề:

```html
<script src="../../js/quiz.js"></script>
<script>
  Quiz.init({
    id: 'ten-bai',     // khoá lưu kỷ lục
    total: 10,         // số câu mỗi lượt
    kids: false,       // true → nút cỡ lớn, ẩn phần chữ (khu mầm non)
    speak: false,      // true → đọc to câu hỏi bằng tiếng Việt
    levels: [{
      name: 'Dễ',
      hint: 'Mô tả ngắn',
      gen: function () {
        var a = Quiz.randInt(1, 9), b = Quiz.randInt(1, 10 - a);
        return { text: a + ' + ' + b + ' =', answer: a + b };
      }
    }]
  });
</script>
```

`gen()` trả về một object, tất cả các khoá đều tuỳ chọn trừ `answer`:

| Khoá | Ý nghĩa |
|---|---|
| `prompt` | Lời văn đặt phía trên (toán đố, câu hỏi cho bé mầm non) |
| `speak` | Câu đọc to, nếu khác `prompt` (bỏ thẻ HTML đi) |
| `art` | HTML/SVG minh hoạ — emoji, hình vẽ, đồng hồ |
| `text` | Phần trước ô đáp án, ví dụ `'3 +'` |
| `after` | Phần sau ô đáp án, ví dụ `'= 7'` hoặc đơn vị `'quả'` |
| `answer` | Đáp án đúng (**bắt buộc**) |
| `choices` | Có giá trị → bé bấm chọn thay vì gõ số |
| `cols` | Số cột của hàng nút chọn |
| `small` | Ép cỡ chữ nhỏ cho đề dài |
| `mach` | Tên mạch kiến thức — dùng để thống kê trong phiếu kết quả bài kiểm tra |

Hàm hỗ trợ: `Quiz.randInt(min, max)`, `Quiz.pick(arr)`, `Quiz.shuffle(arr)`,
`Quiz.choicesAround(answer, n, min, max)`, `Quiz.repeatArt(emoji, n)`, `Quiz.docTo(text)`.

Cuối cùng thêm một mục vào mảng ở `index.html` của khu tương ứng.

## Chạy thử ở máy

```bash
python3 -m http.server 8000
```

Rồi mở <http://localhost:8000>.

## Triển khai

GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
Mỗi lần `git push` là trang tự cập nhật sau khoảng một phút.
