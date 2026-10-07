# 🧮 Học Toán Lớp 1

Web luyện toán cho bé lớp 1 — chạy hoàn toàn trong trình duyệt, không cần máy chủ.

👉 **Xem online:** https://haipham231.github.io/StudyOnline/

## Các bài tập

| Bài | Nội dung | Mức độ |
|---|---|---|
| ➕ Cộng trừ | Cộng trừ không âm | Phạm vi 10 (có hình) · 20 (có nhớ) · 100 (không nhớ) |
| 📖 Toán đố | Bài toán có lời văn: thêm vào, bớt đi, gộp nhóm, nhiều hơn, ít hơn, tìm số lúc đầu, hơn kém | Phạm vi 10 · 20 · Thử thách |
| 🧩 Điền số còn thiếu | `3 + ? = 7`, `? − 4 = 5` | Phạm vi 10 · 20 · Số tròn chục |
| ⚖️ So sánh số | Điền dấu `>`, `<`, `=` | Đến 10 · đến 100 · so sánh phép tính |
| 🔢 Đếm và dãy số | Đếm hình, số liền trước/liền sau, dãy số đếm thêm | Đếm · liền kề · dãy số |
| 🕐 Xem giờ | Đồng hồ kim vẽ bằng SVG | Giờ đúng · giờ rưỡi |
| 🔷 Nhận biết hình | Hình vuông, tròn, tam giác, chữ nhật | Nhận biết · đếm hình |

Toàn bộ đề được **sinh ngẫu nhiên mỗi lần chơi**, chấm điểm ngay từng câu, có sao,
confetti khi làm tốt và danh sách câu sai để xem lại.
Kỷ lục lưu bằng `localStorage` trên chính máy của bé.

Nội dung bám chương trình Toán lớp 1 — **không có nhân chia**.

## Cấu trúc

```
├── index.html            # trang chủ, danh sách bài + tổng số sao
├── css/style.css         # giao diện (Baloo 2 + Nunito, nút 3D, confetti)
├── js/quiz.js            # engine dùng chung cho mọi bài
└── bai-tap/
    ├── cong-tru.html
    ├── toan-do.html
    ├── dien-so.html
    ├── so-sanh.html
    ├── dem-day-so.html
    ├── xem-gio.html
    └── hinh-hoc.html
```

## Thêm một bài mới

Tạo file trong `bai-tap/` rồi khai báo bộ sinh đề:

```html
<script src="../js/quiz.js"></script>
<script>
  Quiz.init({
    id: 'ten-bai',     // khoá lưu kỷ lục
    total: 10,         // số câu mỗi lượt
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
| `prompt` | Lời văn đặt phía trên (dùng cho toán đố) |
| `art` | HTML/SVG minh hoạ (emoji, hình vẽ, đồng hồ) |
| `text` | Phần trước ô đáp án, ví dụ `'3 +'` |
| `after` | Phần sau ô đáp án, ví dụ `'= 7'` hoặc đơn vị `'quả'` |
| `answer` | Đáp án đúng (**bắt buộc**) |
| `choices` | Có giá trị → bé bấm chọn thay vì gõ số |
| `cols` | Số cột của hàng nút chọn |

Hàm hỗ trợ: `Quiz.randInt(min, max)`, `Quiz.pick(arr)`, `Quiz.shuffle(arr)`,
`Quiz.choicesAround(answer, n, min, max)`, `Quiz.repeatArt(emoji, n)`.

Cuối cùng thêm một mục vào mảng `BAI_TAP` trong `index.html`.

## Chạy thử ở máy

```bash
python3 -m http.server 8000
```

Rồi mở <http://localhost:8000>.

## Triển khai

GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
Mỗi lần `git push` là trang tự cập nhật sau khoảng một phút.
