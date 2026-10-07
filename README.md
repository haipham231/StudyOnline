# 🧮 Học Toán Online

Trang web luyện toán cho trẻ em — chạy hoàn toàn trong trình duyệt, không cần máy chủ.

👉 **Xem online:** https://haipham231.github.io/StudyOnline/

## Các bài hiện có

| Bài | Nội dung |
|---|---|
| ➕ Cộng trừ | Phạm vi 10 / 20 / 100 (có nhớ) |
| ✖️ Bảng cửu chương | Nhân bảng 2–5, 6–9 và phép chia |
| ⚖️ So sánh số | Điền dấu `>`, `<`, `=` |

Mỗi lượt gồm 10 câu sinh ngẫu nhiên, chấm điểm ngay, có sao và xem lại các câu sai.
Kỷ lục được lưu bằng `localStorage` trên chính máy của bé.

## Cấu trúc

```
├── index.html            # trang chủ, danh sách bài
├── css/style.css         # giao diện dùng chung (có cả dark mode)
├── js/quiz.js            # engine bài tập dùng chung
└── bai-tap/
    ├── cong-tru.html
    ├── bang-cuu-chuong.html
    └── so-sanh.html
```

## Thêm một bài mới

Tạo file mới trong `bai-tap/`, rồi khai báo bộ sinh đề:

```html
<script src="../js/quiz.js"></script>
<script>
  Quiz.init({
    id: 'ten-bai',          // khoá lưu kỷ lục
    total: 10,              // số câu mỗi lượt
    levels: [
      {
        name: 'Dễ',
        hint: 'Mô tả ngắn',
        // trả về { text, answer } để bé gõ số,
        // hoặc thêm choices: ['>','<','='] để bé bấm chọn
        gen: function () {
          var a = Quiz.randInt(1, 10);
          var b = Quiz.randInt(1, 10);
          return { text: a + ' + ' + b + ' =', answer: a + b };
        }
      }
    ]
  });
</script>
```

Cuối cùng thêm một mục vào mảng `BAI_TAP` trong `index.html`.

## Chạy thử ở máy

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## Triển khai

GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
Mỗi lần `git push` là trang tự cập nhật.
