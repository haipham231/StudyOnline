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

Dữ liệu 22 con vật (emoji, thức ăn, nơi sống, tiếng kêu) nằm trong `js/con-vat.js`.

## 🎒 Khu Lớp 1 (6–7 tuổi)

Bám chương trình Toán lớp 1 — **không có nhân chia**.

| Bài | Nội dung | Mức độ |
|---|---|---|
| ➕ Cộng trừ | Cộng trừ không âm | Phạm vi 10 (có hình) · 20 (có nhớ) · 100 (không nhớ) |
| 📖 Toán đố | 8 dạng lời văn: thêm vào, bớt đi, gộp nhóm, nhiều hơn, ít hơn, rời khỏi, tìm số lúc đầu, hơn kém | Phạm vi 10 · 20 · Thử thách |
| 🧩 Điền số còn thiếu | `3 + ? = 7`, `? − 4 = 5` | Phạm vi 10 · 20 · Số tròn chục |
| ⚖️ So sánh số | Điền dấu `>`, `<`, `=` | Đến 10 · đến 100 · so sánh phép tính |
| 🔢 Đếm và dãy số | Đếm hình, số liền trước/sau, dãy đếm thêm | Đếm · liền kề · dãy số |
| 🕐 Xem giờ | Đồng hồ kim vẽ bằng SVG | Giờ đúng · giờ rưỡi |
| 🔷 Nhận biết hình | Vuông, tròn, tam giác, chữ nhật | Nhận biết · đếm hình |

## Cấu trúc

```
├── index.html            # cổng chọn lứa tuổi
├── css/style.css         # giao diện chung cho cả hai khu
├── js/
│   ├── quiz.js           # engine dùng chung
│   └── con-vat.js        # dữ liệu con vật (khu mầm non)
├── mam-non/
│   ├── index.html
│   └── bai-tap/*.html
└── lop-1/
    ├── index.html
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
