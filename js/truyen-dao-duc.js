/* ===== Kho truyện đạo đức và tình huống cho bé mầm non =====

   Mỗi truyện là một dãy cảnh. Một cảnh gồm một hình và một hai câu kể — bé
   chưa biết đọc nên nghe là chính, chữ chỉ để người lớn ngồi cạnh đọc theo.

   Ba điều cố ý khi viết:

   - Truyện nào cũng có một cảnh nhân vật DO DỰ. Thỏ nghĩ một lúc lâu trước
     khi chia táo, Na định lủi đi, Tin tính đổ lỗi cho con mèo. Nhân vật ngoan
     sẵn từ đầu thì bé chẳng học được gì — phải thấy bạn ấy cũng muốn làm sai
     mà cuối cùng chọn làm đúng.
   - Không doạ, không phạt. Mẹ không mắng Tin, Bo không giận Na. Phần thưởng
     cho việc làm đúng là cảm giác dễ chịu, không phải tránh được đòn.
   - Bài học đặt ở cuối, đúng một câu. Bé bốn tuổi nhớ được một câu thôi.

   Trường "nhan" của mỗi lựa chọn KHÔNG hiện ra cho bé — ô trả lời chỉ có
   hình. Nó để cho người lớn đọc bản kê và cho bộ test soi.

   Hình đều lấy từ assets/sinh-vat, bộ test check-dao-duc kiểm từng tệp.
*/
(function (global) {
  'use strict';

  var TRUYEN = [
    {
      ma: 'hai-qua-tao', doDu: 4, /* Thỏ nghĩ một lúc lâu, suýt ăn cả hai quả */ ten: 'Hai quả táo', duc: 'chia sẻ', tuoi: [2, 3],
      canh: [
        { hinh: 'quen/tho', loi: 'Bạn Thỏ có hai quả táo đỏ thật to.' },
        { hinh: 'qua-rau/tao', loi: 'Thỏ ngồi dưới gốc cây, định ăn hết cả hai quả.' },
        { hinh: 'quen/soc', loi: 'Bạn Sóc đi ngang qua. Bụng Sóc kêu ọc ọc vì đói quá.' },
        { hinh: 'cam-xuc/sad', loi: 'Sóc nhìn hai quả táo rồi cúi mặt xuống, không nói gì.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Thỏ nhìn Sóc. Thỏ nghĩ một lúc lâu.' },
        { hinh: 'dong-tu-thuong-gap/share', loi: 'Thỏ đưa một quả cho bạn: "Mình chia cho bạn nhé!"' },
        { hinh: 'cau-chao-va-le-phep/thank-you', loi: 'Sóc cười thật tươi: "Cảm ơn bạn Thỏ!"' },
        { hinh: 'cam-xuc/happy', loi: 'Hai bạn ngồi ăn táo cùng nhau. Thỏ chỉ ăn một quả, mà vui gấp đôi.' }
      ],
      baiHoc: 'Chia cho bạn một chút, niềm vui lại nhiều thêm.',
      hoi: [
        { de: 'Thỏ đã làm gì với quả táo thứ hai?',
          dung: { hinh: 'dong-tu-thuong-gap/share', nhan: 'chia cho bạn' },
          sai: [{ hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'giữ một mình' },
                { hinh: 'dong-tu-thuong-gap/cry', nhan: 'khóc' }] },
        { de: 'Được bạn cho quà thì mình nói gì?',
          dung: { hinh: 'cau-chao-va-le-phep/thank-you', nhan: 'cảm ơn' },
          sai: [{ hinh: 'cau-chao-va-le-phep/sorry', nhan: 'xin lỗi' },
                { hinh: 'cau-chao-va-le-phep/no', nhan: 'lắc đầu' }] },
        { de: 'Bạn đói mà mình có đồ ăn, mình nên làm sao?',
          dung: { hinh: 'dong-tu-thuong-gap/give', nhan: 'cho bạn một ít' },
          sai: [{ hinh: 'dong-tu-thuong-gap/eat', nhan: 'ăn một mình' },
                { hinh: 'dong-tu-thuong-gap/sleep', nhan: 'đi ngủ' }] }
      ]
    },

    {
      ma: 'vet-mau-tren-ao', doDu: 5, /* Na sợ quá, định lủi đi cho xong */ ten: 'Vết màu trên áo bạn', duc: 'biết xin lỗi', tuoi: [3, 4],
      canh: [
        { hinh: 'do-dung-hoc-tap/crayons', loi: 'Lớp đang giờ vẽ. Bé Na có một hộp bút màu mới tinh.' },
        { hinh: 'dong-tu-thuong-gap/draw', loi: 'Na vẽ một ông mặt trời thật to, thật tròn.' },
        { hinh: 'dong-tu-thuong-gap/run', loi: 'Vẽ xong, Na quay phắt người lại để khoe bạn.' },
        { hinh: 'tinh-tu-thuong-gap/dirty', loi: 'Cây bút quệt vào áo bạn Bo. Áo Bo có một vết xanh dài.' },
        { hinh: 'cam-xuc/sad', loi: 'Bo nhìn cái áo. Mắt Bo đỏ hoe.' },
        { hinh: 'cam-xuc/scared', loi: 'Na sợ quá. Na định lủi đi chỗ khác cho xong.' },
        { hinh: 'cau-chao-va-le-phep/sorry', loi: 'Nhưng Na quay lại: "Bo ơi, mình xin lỗi bạn."' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/friendly', loi: 'Bo lau mắt: "Không sao đâu." Hai bạn lại ngồi vẽ chung.' }
      ],
      baiHoc: 'Lỡ làm sai thì nói xin lỗi ngay, đừng bỏ chạy.',
      hoi: [
        { de: 'Na làm bẩn áo bạn. Na nên làm gì?',
          dung: { hinh: 'cau-chao-va-le-phep/sorry', nhan: 'xin lỗi bạn' },
          sai: [{ hinh: 'dong-tu-thuong-gap/run', nhan: 'chạy đi chỗ khác' },
                { hinh: 'cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Bạn buồn vì mình, mình nói câu gì trước?',
          dung: { hinh: 'cau-chao-va-le-phep/sorry', nhan: 'xin lỗi' },
          sai: [{ hinh: 'cau-chao-va-le-phep/thank-you', nhan: 'cảm ơn' },
                { hinh: 'cau-chao-va-le-phep/hello', nhan: 'chào bạn' }] },
        { de: 'Bạn tha lỗi rồi, hai bạn làm gì tiếp?',
          dung: { hinh: 'cau-trong-lop-hoc/work-in-groups', nhan: 'chơi chung lại' },
          sai: [{ hinh: 'cam-xuc/angry', nhan: 'giận nhau' },
                { hinh: 'cam-xuc-va-tinh-cach-chu/shy', nhan: 'mỗi người một nơi' }] }
      ]
    },

    {
      ma: 'ly-nuoc-cho-ba', doDu: 4, /* Mun đang chơi dở, phân vân đi hay không */ ten: 'Ly nước cho bà', duc: 'thương ông bà', tuoi: [3, 4],
      canh: [
        { hinh: 'nguoi/ba', loi: 'Bà của bé Mun đã già. Bà đi lại chậm lắm.' },
        { hinh: 'do-choi-va-le-hoi/doll', loi: 'Mun đang chơi búp bê ngoài sân, vui ơi là vui.' },
        { hinh: 'suc-khoe/thirsty', loi: 'Trong nhà, bà khát nước. Bà gọi khẽ: "Mun ơi…"' },
        { hinh: 'dong-tu-thuong-gap/listen', loi: 'Mun nghe thấy tiếng bà.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Mun đang chơi dở. Mun nghĩ: đi hay là chơi tiếp nhỉ?' },
        { hinh: 'dong-tu-thuong-gap/stand', loi: 'Mun đặt búp bê xuống ghế rồi đứng dậy.' },
        { hinh: 'dong-tu-thuong-gap/bring', loi: 'Mun rót một ly nước, bưng bằng cả hai tay đưa cho bà.' },
        { hinh: 'cam-xuc/happy', loi: 'Bà xoa đầu Mun: "Cháu của bà ngoan quá." Mun thấy ấm cả bụng.' }
      ],
      baiHoc: 'Ông bà cần mình, mình để đồ chơi xuống một lát cũng không sao.',
      hoi: [
        { de: 'Bà gọi mà Mun đang chơi. Mun nên làm gì?',
          dung: { hinh: 'dong-tu-thuong-gap/come', nhan: 'chạy tới với bà' },
          sai: [{ hinh: 'dong-tu-thuong-gap/play', nhan: 'chơi tiếp' },
                { hinh: 'dong-tu-thuong-gap/sleep', nhan: 'đi ngủ' }] },
        { de: 'Bà già rồi. Mình nên làm gì cho bà?',
          dung: { hinh: 'dong-tu-thuong-gap/help', nhan: 'giúp bà' },
          sai: [{ hinh: 'dong-tu-thuong-gap/watch', nhan: 'xem tivi tiếp' },
                { hinh: 'cam-xuc/laughing', nhan: 'cười bà' }] },
        { de: 'Bà khen, Mun thấy trong lòng thế nào?',
          dung: { hinh: 'cam-xuc/happy', nhan: 'vui' },
          sai: [{ hinh: 'cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'cam-xuc/angry', nhan: 'giận' }] }
      ]
    },

    {
      ma: 'chau-hoa-cua-me', doDu: 4, /* Tin tính đổ lỗi cho con mèo */ ten: 'Chậu hoa của mẹ', duc: 'trung thực, dám nhận lỗi', tuoi: [4, 5],
      canh: [
        { hinh: 'vuon-va-cong-cu/plant-pot', loi: 'Mẹ có một chậu hoa đặt trên bàn. Mẹ quý nó lắm.' },
        { hinh: 'the-thao/basketball', loi: 'Mẹ dặn đừng chơi bóng trong nhà. Nhưng bé Tin vẫn đá.' },
        { hinh: 'cam-xuc/surprised', loi: 'Bụp! Quả bóng trúng chậu hoa, chậu rơi xuống đất.' },
        { hinh: 'cam-xuc/scared', loi: 'Tin đứng im. Tim Tin đập thình thịch.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Tin nghĩ: hay là mình bảo con mèo làm đổ?' },
        { hinh: 'quen/meo', loi: 'Con mèo đang nằm ngủ ngoài hiên, chẳng biết gì cả.' },
        { hinh: 'nguoi/me', loi: 'Mẹ đi vào: "Ai làm đổ chậu hoa của mẹ thế này?"' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/honest', loi: 'Tin hít một hơi thật sâu: "Con ạ. Con đá bóng trong nhà."' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/friendly', loi: 'Mẹ im lặng một lúc. Rồi mẹ ôm Tin vào lòng.' },
        { hinh: 'cam-xuc/happy', loi: '"Chậu vỡ thì mẹ mua chậu khác. Con nói thật, mẹ vui hơn nhiều."' }
      ],
      baiHoc: 'Nói thật thì khó, nhưng nói xong lòng mình nhẹ hẳn.',
      hoi: [
        { de: 'Tin làm đổ chậu hoa. Tin nên làm gì?',
          dung: { hinh: 'cam-xuc-va-tinh-cach-chu/honest', nhan: 'nhận lỗi' },
          sai: [{ hinh: 'quen/meo', nhan: 'đổ cho con mèo' },
                { hinh: 'cam-xuc/scared', nhan: 'trốn đi' }] },
        { de: 'Làm hỏng đồ của mẹ thì nói gì với mẹ?',
          dung: { hinh: 'cau-chao-va-le-phep/sorry', nhan: 'xin lỗi mẹ' },
          sai: [{ hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'không nói gì' },
                { hinh: 'cam-xuc/laughing', nhan: 'cười trừ' }] },
        { de: 'Bạn nào là bạn trung thực?',
          dung: { hinh: 'cam-xuc-va-tinh-cach-chu/honest', nhan: 'bạn nói thật' },
          sai: [{ hinh: 'dong-tu-thuong-gap/run', nhan: 'bạn bỏ chạy' },
                { hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'bạn đổ cho người khác' }] }
      ]
    },

    {
      ma: 'ban-moi-trong-lop', doDu: 5, /* Bo có thể lờ đi như các bạn khác */ ten: 'Bạn mới trong lớp', duc: 'thân thiện với bạn mới', tuoi: [4, 5],
      canh: [
        { hinh: 'noi-chon/school', loi: 'Hôm nay lớp mình có một bạn mới. Bạn ấy tên là Mi.' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/shy', loi: 'Mi đứng ở cửa lớp, tay nắm chặt vạt áo.' },
        { hinh: 'dong-tu-thuong-gap/play', loi: 'Các bạn đang chơi với nhau, chẳng ai nhìn Mi cả.' },
        { hinh: 'cam-xuc/sad', loi: 'Mi ngồi xuống cái ghế cuối lớp. Mi thấy mình lạc lõng.' },
        { hinh: 'dong-tu-thuong-gap/look', loi: 'Bé Bo nhìn thấy Mi ngồi một mình.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Bo nghĩ: nếu mình là bạn ấy thì mình sẽ buồn lắm.' },
        { hinh: 'cau-chao-va-le-phep/hello', loi: 'Bo chạy tới: "Chào bạn! Mình là Bo, chơi với bọn mình nhé!"' },
        { hinh: 'cau-trong-lop-hoc/work-in-groups', loi: 'Mi cười. Cả nhóm cùng ngồi xếp hình với nhau.' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/friendly', loi: 'Tan học, Mi vẫy tay: "Mai gặp lại nhé!"' }
      ],
      baiHoc: 'Bạn mới sẽ bớt sợ, nếu có một người bước tới trước.',
      hoi: [
        { de: 'Thấy bạn mới ngồi một mình, mình làm gì?',
          dung: { hinh: 'cau-chao-va-le-phep/hello', nhan: 'tới chào bạn' },
          sai: [{ hinh: 'dong-tu-thuong-gap/go', nhan: 'kệ bạn' },
                { hinh: 'cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Gặp bạn lần đầu thì nói câu gì?',
          dung: { hinh: 'cau-chao-va-le-phep/nice-to-meet-you', nhan: 'rất vui được gặp bạn' },
          sai: [{ hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'không nói gì' },
                { hinh: 'cau-chao-va-le-phep/no', nhan: 'lắc đầu' }] },
        { de: 'Rủ bạn vào chơi cùng thì cả nhóm thế nào?',
          dung: { hinh: 'cau-trong-lop-hoc/work-in-groups', nhan: 'chơi chung vui vẻ' },
          sai: [{ hinh: 'cam-xuc-va-tinh-cach-chu/shy', nhan: 'bạn vẫn ngồi một mình' },
                { hinh: 'dong-tu-thuong-gap/go', nhan: 'các bạn bỏ đi' }] }
      ]
    },

    {
      ma: 'gau-quen-chao', doDu: 2, /* Gấu cắm cúi đi, không chào bác Voi */ ten: 'Chú gấu quên chào', duc: 'chào hỏi', tuoi: [2, 3],
      canh: [
        { hinh: 'quen/gau', loi: 'Chú Gấu con mới ngủ dậy, bước ra khỏi nhà.' },
        { hinh: 'quen/voi', loi: 'Bác Voi đi tới, vẫy vòi: "Chào Gấu con!"' },
        { hinh: 'dong-tu-thuong-gap/walk', loi: 'Gấu cắm cúi đi, chẳng nói gì cả.' },
        { hinh: 'cam-xuc/sad', loi: 'Bác Voi đứng nhìn theo. Bác hơi buồn.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Đi được mấy bước, Gấu chợt nhớ ra.' },
        { hinh: 'cau-chao-va-le-phep/hello', loi: 'Gấu chạy lại: "Cháu chào bác Voi ạ!" Bác Voi cười thật tươi.' }
      ],
      baiHoc: 'Một tiếng chào thôi mà ai cũng vui.',
      hoi: [
        { de: 'Gặp người lớn thì mình làm gì?',
          dung: { hinh: 'cau-chao-va-le-phep/hello', nhan: 'chào' },
          sai: [{ hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'im lặng' },
                { hinh: 'dong-tu-thuong-gap/run', nhan: 'chạy đi' }] },
        { de: 'Gấu quên chào. Gấu nên làm gì?',
          dung: { hinh: 'dong-tu-thuong-gap/come', nhan: 'quay lại chào' },
          sai: [{ hinh: 'dong-tu-thuong-gap/walk', nhan: 'đi tiếp' },
                { hinh: 'cam-xuc/scared', nhan: 'trốn' }] },
        { de: 'Được cháu chào, bác Voi thấy thế nào?',
          dung: { hinh: 'cam-xuc/happy', nhan: 'vui' },
          sai: [{ hinh: 'cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'cam-xuc/angry', nhan: 'giận' }] }
      ]
    },

    {
      ma: 'kien-khieng-la', doDu: 5, /* Bọ Rùa đang vội, có thể bay thẳng về nhà */ ten: 'Bạn kiến khiêng lá', duc: 'giúp đỡ', tuoi: [3, 4],
      canh: [
        { hinh: 'chim-bo/kien', loi: 'Bạn Kiến bé tí tìm được một chiếc lá to ơi là to.' },
        { hinh: 'mau-troi/doi-co', loi: 'Kiến muốn khiêng lá về tổ ở bên kia đồi cỏ.' },
        { hinh: 'dong-tu-thuong-gap/pull', loi: 'Kiến kéo mãi. Chiếc lá nặng quá, chẳng nhúc nhích.' },
        { hinh: 'cam-xuc/sad', loi: 'Kiến ngồi thở. Kiến sắp khóc đến nơi.' },
        { hinh: 'chim-bo/bo-rua', loi: 'Bạn Bọ Rùa bay ngang. Bọ Rùa đang vội về nhà.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Bọ Rùa nhìn Kiến, rồi nhìn đường về. Bọ Rùa nghĩ một giây.' },
        { hinh: 'dong-tu-thuong-gap/help', loi: 'Rồi Bọ Rùa đáp xuống: "Để mình đẩy phụ bạn!"' },
        { hinh: 'dong-tu-thuong-gap/push', loi: 'Một bạn kéo, một bạn đẩy. Chiếc lá nhúc nhích rồi trôi đi.' },
        { hinh: 'cam-xuc/happy', loi: 'Về tới tổ, hai bạn nhìn nhau cười. Việc nặng mà hoá nhẹ tênh.' }
      ],
      baiHoc: 'Một mình thì nặng, hai mình thì nhẹ.',
      hoi: [
        { de: 'Thấy bạn kéo mãi không nổi, mình nên làm gì?',
          dung: { hinh: 'dong-tu-thuong-gap/help', nhan: 'giúp bạn' },
          sai: [{ hinh: 'dong-tu-thuong-gap/go', nhan: 'bỏ đi' },
                { hinh: 'cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Hai bạn cùng làm thì việc nặng thành ra sao?',
          dung: { hinh: 'tinh-tu-thuong-gap/easy', nhan: 'dễ hơn' },
          sai: [{ hinh: 'tinh-tu-thuong-gap/difficult', nhan: 'khó hơn' },
                { hinh: 'tinh-tu-thuong-gap/heavy', nhan: 'nặng hơn' }] },
        { de: 'Được bạn giúp thì mình nói gì?',
          dung: { hinh: 'cau-chao-va-le-phep/thank-you', nhan: 'cảm ơn bạn' },
          sai: [{ hinh: 'cau-chao-va-le-phep/no', nhan: 'lắc đầu' },
                { hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'không nói gì' }] }
      ]
    },

    {
      ma: 'goc-do-choi', doDu: 3, /* Bi có thể bỏ đống đồ chơi đó mà đi ăn cơm */ ten: 'Góc đồ chơi của bé', duc: 'tự dọn dẹp', tuoi: [3, 4],
      canh: [
        { hinh: 'do-choi-va-le-hoi/puzzle', loi: 'Bé Bi chơi xếp hình suốt cả buổi chiều.' },
        { hinh: 'do-choi-va-le-hoi/doll', loi: 'Bi lôi thêm búp bê, thêm ô tô, thêm cả hộp bút màu.' },
        { hinh: 'nguoi/me', loi: 'Mẹ gọi: "Bi ơi, tới giờ ăn cơm rồi!"' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Bi nhìn sàn nhà. Đồ chơi nằm vương khắp nơi.' },
        { hinh: 'dong-tu-thuong-gap/pack', loi: 'Bi ngồi xuống, nhặt từng món bỏ vào giỏ.' },
        { hinh: 'viec-hang-ngay/tidy-up', loi: 'Một lúc sau, sàn nhà sạch bong.' },
        { hinh: 'cam-xuc/happy', loi: 'Mẹ nhìn vào: "Phòng con gọn quá!" Bi tự thấy mình giỏi ghê.' }
      ],
      baiHoc: 'Chơi xong mà cất đồ, lần sau tìm là thấy ngay.',
      hoi: [
        { de: 'Chơi xong thì đồ chơi để đâu?',
          dung: { hinh: 'dong-tu-thuong-gap/pack', nhan: 'cất vào giỏ' },
          sai: [{ hinh: 'dong-tu-thuong-gap/throw', nhan: 'ném đi' },
                { hinh: 'tinh-tu-thuong-gap/dirty', nhan: 'để bừa ra sàn' }] },
        { de: 'Ai dọn góc đồ chơi của bé?',
          dung: { hinh: 'viec-hang-ngay/tidy-up', nhan: 'chính bé dọn' },
          sai: [{ hinh: 'nguoi/me', nhan: 'mẹ dọn hộ' },
                { hinh: 'dong-tu-thuong-gap/sleep', nhan: 'không ai dọn' }] },
        { de: 'Phòng gọn gàng thì bé thấy thế nào?',
          dung: { hinh: 'cam-xuc-va-tinh-cach-chu/proud', nhan: 'tự hào' },
          sai: [{ hinh: 'cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'cam-xuc/angry', nhan: 'bực mình' }] }
      ]
    },

    {
      ma: 'xep-hang-lay-sua', doDu: 2, /* Tí chen lên đầu hàng */ ten: 'Xếp hàng lấy sữa', duc: 'chờ đến lượt', tuoi: [4, 5],
      canh: [
        { hinh: 'do-uong/bottle', loi: 'Giờ ra chơi, cô mang sữa ra cho cả lớp.' },
        { hinh: 'cau-trong-lop-hoc/line-up', loi: 'Các bạn xếp thành một hàng dài.' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/selfish', loi: 'Bạn Tí muốn uống trước. Tí chen lên đầu hàng.' },
        { hinh: 'cam-xuc/angry', loi: 'Các bạn phía sau nhăn mặt hết cả.' },
        { hinh: 'cau-trong-lop-hoc/it-s-your-turn', loi: 'Cô nói: "Bạn nào cũng có phần. Đến lượt ai thì bạn ấy lấy."' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/shy', loi: 'Tí đỏ mặt, lùi về chỗ cũ.' },
        { hinh: 'cam-xuc-va-tinh-cach-chu/patient', loi: 'Tí đứng chờ. Hàng nhích dần, nhích dần.' },
        { hinh: 'cam-xuc/happy', loi: 'Đến lượt Tí. Ly sữa vẫn còn đó, mát lạnh.' }
      ],
      baiHoc: 'Chờ một chút thôi, phần của mình không mất đi đâu cả.',
      hoi: [
        { de: 'Đông bạn cùng muốn lấy sữa thì phải làm sao?',
          dung: { hinh: 'cau-trong-lop-hoc/line-up', nhan: 'xếp hàng' },
          sai: [{ hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'chen lên trước' },
                { hinh: 'dong-tu-thuong-gap/push', nhan: 'xô bạn ra' }] },
        { de: 'Chưa tới lượt mình thì mình làm gì?',
          dung: { hinh: 'cam-xuc-va-tinh-cach-chu/patient', nhan: 'kiên nhẫn chờ' },
          sai: [{ hinh: 'dong-tu-thuong-gap/cry', nhan: 'khóc đòi' },
                { hinh: 'cam-xuc/angry', nhan: 'cáu lên' }] },
        { de: 'Tí chờ xong thì chuyện gì xảy ra?',
          dung: { hinh: 'cam-xuc/happy', nhan: 'vẫn có phần của mình' },
          sai: [{ hinh: 'cam-xuc/sad', nhan: 'hết mất sữa' },
                { hinh: 'cam-xuc/scared', nhan: 'bị cô mắng' }] }
      ]
    },

    {
      ma: 'hen-ban-goc-cay', doDu: 4, /* Bo nghĩ mưa thế này chắc Na cũng chẳng đi */ ten: 'Hẹn bạn ở gốc cây', duc: 'giữ lời hứa', tuoi: [4, 5],
      canh: [
        { hinh: 'thien-nhien-them/palm-tree', loi: 'Chiều qua Bo hẹn Na: "Mai mình chờ bạn ở gốc cây nhé!"' },
        { hinh: 'mau-troi/mua', loi: 'Sáng nay trời đổ mưa. Mưa to lắm.' },
        { hinh: 'dong-tu-thuong-gap/sleep', loi: 'Bo đang nằm trong chăn ấm. Bo chẳng muốn dậy.' },
        { hinh: 'dong-tu-thuong-gap/remember', loi: 'Bo chợt nhớ ra lời hẹn hôm qua.' },
        { hinh: 'dong-tu-thuong-gap/think', loi: 'Bo nghĩ: mưa thế này, chắc Na cũng chẳng đi đâu.' },
        { hinh: 'quan-ao-them/coat', loi: 'Nhưng Bo vẫn tung chăn, mặc áo mưa vào.' },
        { hinh: 'dong-tu-thuong-gap/run', loi: 'Bo chạy ra gốc cây.' },
        { hinh: 'cam-xuc/surprised', loi: 'Na đang đứng đó, ướt hết cả tóc. Na vẫn chờ.' },
        { hinh: 'cam-xuc/happy', loi: 'Hai bạn cùng cười. "Mình biết thế nào bạn cũng tới mà!"' }
      ],
      baiHoc: 'Đã hứa với bạn thì tới, dù trời mưa.',
      hoi: [
        { de: 'Đã hẹn bạn mà trời mưa thì mình làm gì?',
          dung: { hinh: 'dong-tu-thuong-gap/come', nhan: 'vẫn tới gặp bạn' },
          sai: [{ hinh: 'dong-tu-thuong-gap/sleep', nhan: 'ngủ tiếp' },
                { hinh: 'dong-tu-thuong-gap/watch', nhan: 'ở nhà xem tivi' }] },
        { de: 'Na chờ Bo ở gốc cây. Na là bạn thế nào?',
          dung: { hinh: 'cam-xuc-va-tinh-cach-chu/patient', nhan: 'kiên nhẫn' },
          sai: [{ hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'ích kỷ' },
                { hinh: 'cam-xuc/angry', nhan: 'hay cáu' }] },
        { de: 'Hứa rồi mà không tới thì bạn sẽ thế nào?',
          dung: { hinh: 'cam-xuc/sad', nhan: 'bạn buồn' },
          sai: [{ hinh: 'cam-xuc/happy', nhan: 'bạn vui' },
                { hinh: 'cam-xuc/laughing', nhan: 'bạn cười' }] }
      ]
    }
  ];

  /* Tình huống: mười hai câu ngắn, chơi nhanh mỗi ngày. Không có truyện, chỉ
     hỏi thẳng "bé nên làm gì" rồi cho ba hình để chọn. */
  var TINH_HUONG = [
    { de: 'Bạn bị ngã ngay trước mặt bé. Bé nên làm gì?',
      dung: { hinh: 'dong-tu-thuong-gap/help', nhan: 'đỡ bạn dậy' },
      sai: [{ hinh: 'dong-tu-thuong-gap/go', nhan: 'bỏ đi' },
            { hinh: 'cam-xuc/laughing', nhan: 'cười bạn' }] },
    { de: 'Bé làm đổ ly nước của mẹ. Bé nên làm gì?',
      dung: { hinh: 'cau-chao-va-le-phep/sorry', nhan: 'nhận lỗi và xin lỗi' },
      sai: [{ hinh: 'cam-xuc/scared', nhan: 'trốn đi' },
            { hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'đổ cho em' }] },
    { de: 'Tới giờ lấy sữa, bạn nào cũng muốn lấy trước. Bé làm gì?',
      dung: { hinh: 'cau-trong-lop-hoc/line-up', nhan: 'xếp hàng chờ' },
      sai: [{ hinh: 'dong-tu-thuong-gap/push', nhan: 'chen lên' },
            { hinh: 'dong-tu-thuong-gap/take', nhan: 'giành lấy' }] },
    { de: 'Chơi xong, đồ chơi vương khắp nhà. Bé làm gì?',
      dung: { hinh: 'viec-hang-ngay/tidy-up', nhan: 'cất vào giỏ' },
      sai: [{ hinh: 'dong-tu-thuong-gap/sleep', nhan: 'để đó đi ngủ' },
            { hinh: 'dong-tu-thuong-gap/throw', nhan: 'đá ra chỗ khác' }] },
    { de: 'Bà cầm nhiều đồ nặng đi vào. Bé làm gì?',
      dung: { hinh: 'dong-tu-thuong-gap/help', nhan: 'chạy ra đỡ bà' },
      sai: [{ hinh: 'dong-tu-thuong-gap/watch', nhan: 'xem tivi tiếp' },
            { hinh: 'dong-tu-thuong-gap/play', nhan: 'chạy đi chơi' }] },
    { de: 'Bé có một gói bánh, bạn ngồi cạnh không có gì. Bé làm gì?',
      dung: { hinh: 'dong-tu-thuong-gap/share', nhan: 'chia cho bạn' },
      sai: [{ hinh: 'dong-tu-thuong-gap/eat', nhan: 'ăn hết một mình' },
            { hinh: 'cam-xuc-va-tinh-cach-chu/selfish', nhan: 'giấu đi' }] },
    { de: 'Sáng tới lớp, bé gặp cô giáo. Bé nói gì?',
      dung: { hinh: 'cau-chao-va-le-phep/good-morning', nhan: 'con chào cô' },
      sai: [{ hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'im lặng đi qua' },
            { hinh: 'dong-tu-thuong-gap/run', nhan: 'chạy vào lớp' }] },
    { de: 'Bạn cho bé mượn cây bút màu. Bé nói gì?',
      dung: { hinh: 'cau-chao-va-le-phep/thank-you', nhan: 'cảm ơn bạn' },
      sai: [{ hinh: 'cau-chao-va-le-phep/no', nhan: 'lắc đầu' },
            { hinh: 'cau-chao-va-le-phep/sorry', nhan: 'xin lỗi' }] },
    { de: 'Bé muốn mượn đồ chơi của bạn. Bé nói thế nào?',
      dung: { hinh: 'cau-chao-va-le-phep/please', nhan: 'cho mình mượn với' },
      sai: [{ hinh: 'dong-tu-thuong-gap/take', nhan: 'giật lấy' },
            { hinh: 'dong-tu-thuong-gap/cry', nhan: 'khóc đòi' }] },
    { de: 'Lớp có bạn mới ngồi một mình. Bé làm gì?',
      dung: { hinh: 'cau-chao-va-le-phep/hello', nhan: 'tới chào bạn' },
      sai: [{ hinh: 'dong-tu-thuong-gap/go', nhan: 'kệ bạn' },
            { hinh: 'cam-xuc/laughing', nhan: 'cười bạn' }] },
    { de: 'Bé làm vỡ đồ mà chưa ai thấy. Bé nên làm gì?',
      dung: { hinh: 'cam-xuc-va-tinh-cach-chu/honest', nhan: 'nói thật với mẹ' },
      sai: [{ hinh: 'cam-xuc/scared', nhan: 'giấu đi' },
            { hinh: 'cau-trong-lop-hoc/be-quiet', nhan: 'im lặng luôn' }] },
    { de: 'Cô đang nói chuyện với cả lớp. Bé làm gì?',
      dung: { hinh: 'dong-tu-thuong-gap/listen', nhan: 'ngồi nghe cô' },
      sai: [{ hinh: 'dong-tu-thuong-gap/speak', nhan: 'nói chuyện riêng' },
            { hinh: 'dong-tu-thuong-gap/play', nhan: 'chơi đồ chơi' }] }
  ];

  function tim(ma) {
    for (var i = 0; i < TRUYEN.length; i++) if (TRUYEN[i].ma === ma) return TRUYEN[i];
    return null;
  }

  // truyện hợp với tuổi; không truyền tuổi thì ra hết
  function theoTuoi(tuoi) {
    if (!tuoi) return TRUYEN.slice();
    return TRUYEN.filter(function (t) { return t.tuoi.indexOf(Number(tuoi)) >= 0; });
  }

  global.TruyenDaoDuc = {
    TRUYEN: TRUYEN,
    TINH_HUONG: TINH_HUONG,
    tim: tim,
    theoTuoi: theoTuoi
  };
})(window);
