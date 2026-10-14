# Bộ kiểm tra

```bash
node test/chay.js
```

Chạy hết. Muốn chạy riêng một bộ thì thêm một mẩu tên:

```bash
node test/chay.js dao-duc
```

Không cần cài gì cả — chỉ dùng Node, không có thư viện ngoài.

## Vì sao có thư mục này

Mấy bộ này trước nằm ở thư mục tạm của phiên làm việc. Thư mục đó bị hệ thống
dọn ba lần, mỗi lần mất vài bộ: từ hai mươi sáu bộ rơi xuống còn mười một.
Trong số đã mất có `check-l1.js` mà `check-game.js` cần tới, nên hiện phần soi
đáp án theo mạch của `check-game` không chạy — nó báo thẳng ra màn hình chứ
không im lặng bỏ qua, kẻo tưởng là đã kiểm.

Thư mục này không phải một phần của trang web. Nó có nằm trên GitHub Pages
nhưng chẳng trang nào trỏ tới, và toàn tệp chạy bằng Node chứ trình duyệt
không đụng tới.

## Mười một bộ hiện có

| Bộ | Canh chuyện gì |
|---|---|
| `anh-tu` | Ảnh cho từ vựng tiếng Anh: mọi khoá tra phải có ảnh thật, câu hỏi nhìn hình không ra hai lựa chọn trùng hình, chủ đề vẽ-không-đoán-được phải lùi về hỏi nghĩa |
| `cc-anh` | Game Giải cứu công chúa: tỉ lệ câu tiếng Anh, đáp án luôn nằm trong lựa chọn |
| `con-vat` | Kho con vật: con nào trỏ thẳng vào tệp ảnh thì tệp đó phải có |
| `dao-duc` | Khu Bé ngoan: ba cảnh một truyện, cảnh giữa là cảnh do dự, ô trả lời tuyệt đối không có chữ |
| `do-net` | Độ nét ảnh: mỗi thư mục khai cỡ hiển thị to nhất, đối chiếu với số pixel thật |
| `game` | Bốn game dùng chung: đề không lặp, nhân vật vẽ ra SVG hợp lệ |
| `hinh` | Kho hình thay emoji: mọi khoá có ảnh thật, mọi ảnh có khoá trỏ tới |
| `hw` | Game Đêm Halloween |
| `me-cung` | Màn mê cung: mê cung không bao giờ bị bí, rắn không xuyên tường |
| `muc` | Ba mức độ khó của các game |
| `pa` | Phiên âm tiếng Anh |

## Mấy bộ đã mất, viết lại thì tốt

`check-l1` (luật đề toán lớp 1, `check-game` cần) · `check-l5` · `check-l6` ·
`check-l234` · `check-l5-trang` · `check-ta` · `check-tv` · `check-mn` ·
`check-khoa` · `check-kieu` · `check-de` · `check-nhay` · `check-co` ·
`check-nc` · `check-dh` · `check-ca` · `check-vu-tru` · `check-game-moi`
