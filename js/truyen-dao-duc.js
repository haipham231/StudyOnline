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

   Hình của CẢNH nằm ở assets/hinh/tranh/truyen/ — tranh vẽ kín nền, mỗi truyện
   một bộ ba vẽ riêng, cùng nhân vật xuyên suốt. Khác hẳn hình của các ô trả
   lời bên dưới: những hình đó là vật đơn lẻ nền trong suốt lấy từ kho chung.

   Bộ test check-dao-duc kiểm từng tệp.
*/
(function (global) {
  'use strict';

  var TRUYEN = [
    {
      ma: 'hai-qua-tao', doDu: 1, ten: 'Hai quả táo', duc: 'chia sẻ', tuoi: [2, 3],
      canh: [
        { hinh: 'tranh/truyen/hai-qua-tao-1', loi: 'Thỏ có hai quả táo đỏ. Bạn Sóc đi ngang, bụng đói meo, cứ nhìn mãi.' },
        { hinh: 'tranh/truyen/hai-qua-tao-2', loi: 'Thỏ nhìn Sóc, rồi nhìn hai quả táo. Thỏ nghĩ mãi: chia hay là ăn hết đây?' },
        { hinh: 'tranh/truyen/hai-qua-tao-3', loi: 'Thỏ đưa cho Sóc một quả. Thỏ chỉ ăn một quả thôi, mà vui gấp đôi.' }
      ],
      baiHoc: 'Chia cho bạn một chút, niềm vui lại nhiều thêm.',
      hoi: [
        { de: 'Thỏ đã làm gì với quả táo thứ hai?',
          dung: { hinh: 'dan/hanh-dong/share', nhan: 'chia cho bạn' },
          sai: [{ hinh: 'dan/cam-xuc/selfish', nhan: 'giữ một mình' },
                { hinh: 'dan/hanh-dong/cry', nhan: 'khóc' }] },
        { de: 'Được bạn cho quà thì mình nói gì?',
          dung: { hinh: 'dan/giao-tiep/thank-you', nhan: 'cảm ơn' },
          sai: [{ hinh: 'dan/giao-tiep/sorry', nhan: 'xin lỗi' },
                { hinh: 'dan/giao-tiep/no', nhan: 'lắc đầu' }] },
        { de: 'Bạn đói mà mình có đồ ăn, mình nên làm sao?',
          dung: { hinh: 'dan/hanh-dong/give', nhan: 'cho bạn một ít' },
          sai: [{ hinh: 'dan/hanh-dong/eat', nhan: 'ăn một mình' },
                { hinh: 'dan/hanh-dong/sleep', nhan: 'đi ngủ' }] }
      ]
    },

    {
      ma: 'vet-mau-tren-ao', doDu: 1, ten: 'Vết màu trên áo bạn', duc: 'biết xin lỗi', tuoi: [3, 4],
      canh: [
        { hinh: 'tranh/truyen/vet-mau-tren-ao-1', loi: 'Na quay người lại khoe tranh. Cây bút quệt vào áo bạn Bo, để lại một vết xanh dài.' },
        { hinh: 'tranh/truyen/vet-mau-tren-ao-2', loi: 'Bo nhìn cái áo, mắt đỏ hoe. Na sợ quá, định lủi đi chỗ khác cho xong.' },
        { hinh: 'tranh/truyen/vet-mau-tren-ao-3', loi: 'Nhưng Na quay lại: "Bo ơi, mình xin lỗi bạn." Hai bạn lại ngồi vẽ chung.' }
      ],
      baiHoc: 'Lỡ làm sai thì nói xin lỗi ngay, đừng bỏ chạy.',
      hoi: [
        { de: 'Na làm bẩn áo bạn. Na nên làm gì?',
          dung: { hinh: 'dan/giao-tiep/sorry', nhan: 'xin lỗi bạn' },
          sai: [{ hinh: 'dan/hanh-dong/run', nhan: 'chạy đi chỗ khác' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Bạn buồn vì mình, mình nói câu gì trước?',
          dung: { hinh: 'dan/giao-tiep/sorry', nhan: 'xin lỗi' },
          sai: [{ hinh: 'dan/giao-tiep/thank-you', nhan: 'cảm ơn' },
                { hinh: 'dan/giao-tiep/hello', nhan: 'chào bạn' }] },
        { de: 'Bạn tha lỗi rồi, hai bạn làm gì tiếp?',
          dung: { hinh: 'dan/truong-hoc/work-in-groups', nhan: 'chơi chung lại' },
          sai: [{ hinh: 'dan/cam-xuc/angry', nhan: 'giận nhau' },
                { hinh: 'dan/cam-xuc/shy', nhan: 'mỗi người một nơi' }] }
      ]
    },

    {
      ma: 'ly-nuoc-cho-ba', doDu: 1, ten: 'Ly nước cho bà', duc: 'thương ông bà', tuoi: [3, 4],
      canh: [
        { hinh: 'tranh/truyen/ly-nuoc-cho-ba-1', loi: 'Bà ngồi trong nhà, khát nước, gọi khẽ: "Mun ơi…". Mun đang chơi búp bê ngoài sân.' },
        { hinh: 'tranh/truyen/ly-nuoc-cho-ba-2', loi: 'Mun nghe tiếng bà. Mun nghĩ mãi: chạy vào với bà hay là chơi tiếp đây?' },
        { hinh: 'tranh/truyen/ly-nuoc-cho-ba-3', loi: 'Mun bưng ly nước bằng hai tay đưa cho bà. Bà xoa đầu Mun, Mun thấy ấm cả bụng.' }
      ],
      baiHoc: 'Ông bà cần mình, mình để đồ chơi xuống một lát cũng không sao.',
      hoi: [
        { de: 'Bà gọi mà Mun đang chơi. Mun nên làm gì?',
          dung: { hinh: 'dan/hanh-dong/come', nhan: 'chạy tới với bà' },
          sai: [{ hinh: 'dan/hanh-dong/play', nhan: 'chơi tiếp' },
                { hinh: 'dan/hanh-dong/sleep', nhan: 'đi ngủ' }] },
        { de: 'Bà già rồi. Mình nên làm gì cho bà?',
          dung: { hinh: 'dan/hanh-dong/help', nhan: 'giúp bà' },
          sai: [{ hinh: 'dan/hanh-dong/watch', nhan: 'xem tivi tiếp' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bà' }] },
        { de: 'Bà khen, Mun thấy trong lòng thế nào?',
          dung: { hinh: 'dan/cam-xuc/happy', nhan: 'vui' },
          sai: [{ hinh: 'dan/cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'dan/cam-xuc/angry', nhan: 'giận' }] }
      ]
    },

    {
      ma: 'chau-hoa-cua-me', doDu: 1, ten: 'Chậu hoa của mẹ', duc: 'trung thực, dám nhận lỗi', tuoi: [4, 5],
      canh: [
        { hinh: 'tranh/truyen/chau-hoa-cua-me-1', loi: 'Tin đá bóng trong nhà. Bụp! Quả bóng trúng chậu hoa của mẹ, chậu rơi xuống đất.' },
        { hinh: 'tranh/truyen/chau-hoa-cua-me-2', loi: 'Mẹ hỏi: "Ai làm đổ chậu hoa thế này?" Tin nhìn con mèo đang ngủ, định bảo mèo làm.' },
        { hinh: 'tranh/truyen/chau-hoa-cua-me-3', loi: 'Tin hít một hơi thật sâu: "Con ạ." Mẹ ôm Tin: "Con nói thật, mẹ vui hơn nhiều."' }
      ],
      baiHoc: 'Nói thật thì khó, nhưng nói xong lòng mình nhẹ hẳn.',
      hoi: [
        { de: 'Tin làm đổ chậu hoa. Tin nên làm gì?',
          dung: { hinh: 'dan/cam-xuc/honest', nhan: 'nhận lỗi' },
          sai: [{ hinh: 'dan/con-vat/meo', nhan: 'đổ cho con mèo' },
                { hinh: 'dan/cam-xuc/scared', nhan: 'trốn đi' }] },
        { de: 'Làm hỏng đồ của mẹ thì nói gì với mẹ?',
          dung: { hinh: 'dan/giao-tiep/sorry', nhan: 'xin lỗi mẹ' },
          sai: [{ hinh: 'dan/truong-hoc/be-quiet', nhan: 'không nói gì' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'cười trừ' }] },
        { de: 'Bạn nào là bạn trung thực?',
          dung: { hinh: 'dan/cam-xuc/honest', nhan: 'bạn nói thật' },
          sai: [{ hinh: 'dan/hanh-dong/run', nhan: 'bạn bỏ chạy' },
                { hinh: 'dan/cam-xuc/selfish', nhan: 'bạn đổ cho người khác' }] }
      ]
    },

    {
      ma: 'ban-moi-trong-lop', doDu: 1, ten: 'Bạn mới trong lớp', duc: 'thân thiện với bạn mới', tuoi: [4, 5],
      canh: [
        { hinh: 'tranh/truyen/ban-moi-trong-lop-1', loi: 'Lớp có bạn mới tên Mi. Mi ngồi một mình cuối lớp, chẳng ai nhìn tới.' },
        { hinh: 'tranh/truyen/ban-moi-trong-lop-2', loi: 'Bo nhìn thấy Mi. Bo nghĩ: chạy ra chơi tiếp, hay là tới rủ bạn ấy nhỉ?' },
        { hinh: 'tranh/truyen/ban-moi-trong-lop-3', loi: 'Bo chạy tới: "Chơi với bọn mình nhé!" Cả nhóm xếp hình, Mi cười thật tươi.' }
      ],
      baiHoc: 'Bạn mới sẽ bớt sợ, nếu có một người bước tới trước.',
      hoi: [
        { de: 'Thấy bạn mới ngồi một mình, mình làm gì?',
          dung: { hinh: 'dan/giao-tiep/hello', nhan: 'tới chào bạn' },
          sai: [{ hinh: 'dan/hanh-dong/go', nhan: 'kệ bạn' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Gặp bạn lần đầu thì nói câu gì?',
          dung: { hinh: 'dan/giao-tiep/nice-to-meet-you', nhan: 'rất vui được gặp bạn' },
          sai: [{ hinh: 'dan/truong-hoc/be-quiet', nhan: 'không nói gì' },
                { hinh: 'dan/giao-tiep/no', nhan: 'lắc đầu' }] },
        { de: 'Rủ bạn vào chơi cùng thì cả nhóm thế nào?',
          dung: { hinh: 'dan/truong-hoc/work-in-groups', nhan: 'chơi chung vui vẻ' },
          sai: [{ hinh: 'dan/cam-xuc/shy', nhan: 'bạn vẫn ngồi một mình' },
                { hinh: 'dan/hanh-dong/go', nhan: 'các bạn bỏ đi' }] }
      ]
    },

    {
      ma: 'gau-quen-chao', doDu: 1, ten: 'Chú gấu quên chào', duc: 'chào hỏi', tuoi: [2, 3],
      canh: [
        { hinh: 'tranh/truyen/gau-quen-chao-1', loi: 'Bác Voi vẫy vòi: "Chào Gấu con!" Gấu mải nghĩ chuyện khác, cứ cắm cúi đi.' },
        { hinh: 'tranh/truyen/gau-quen-chao-2', loi: 'Đi được mấy bước, Gấu chợt nhớ ra. Quay lại chào, hay là đi luôn nhỉ?' },
        { hinh: 'tranh/truyen/gau-quen-chao-3', loi: 'Gấu chạy lại: "Cháu chào bác Voi ạ!" Bác Voi cười thật tươi.' }
      ],
      baiHoc: 'Một tiếng chào thôi mà ai cũng vui.',
      hoi: [
        { de: 'Gặp người lớn thì mình làm gì?',
          dung: { hinh: 'dan/giao-tiep/hello', nhan: 'chào' },
          sai: [{ hinh: 'dan/truong-hoc/be-quiet', nhan: 'im lặng' },
                { hinh: 'dan/hanh-dong/run', nhan: 'chạy đi' }] },
        { de: 'Gấu quên chào. Gấu nên làm gì?',
          dung: { hinh: 'dan/hanh-dong/come', nhan: 'quay lại chào' },
          sai: [{ hinh: 'dan/hanh-dong/walk', nhan: 'đi tiếp' },
                { hinh: 'dan/cam-xuc/scared', nhan: 'trốn' }] },
        { de: 'Được cháu chào, bác Voi thấy thế nào?',
          dung: { hinh: 'dan/cam-xuc/happy', nhan: 'vui' },
          sai: [{ hinh: 'dan/cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'dan/cam-xuc/angry', nhan: 'giận' }] }
      ]
    },

    {
      ma: 'kien-khieng-la', doDu: 1, ten: 'Bạn kiến khiêng lá', duc: 'giúp đỡ', tuoi: [3, 4],
      canh: [
        { hinh: 'tranh/truyen/kien-khieng-la-1', loi: 'Kiến bé tí kéo mãi một chiếc lá to. Lá chẳng nhúc nhích, Kiến ngồi thở, sắp khóc.' },
        { hinh: 'tranh/truyen/kien-khieng-la-2', loi: 'Bọ Rùa bay ngang, đang vội về nhà. Bọ Rùa nhìn Kiến, rồi nhìn đường về, nghĩ một giây.' },
        { hinh: 'tranh/truyen/kien-khieng-la-3', loi: 'Bọ Rùa đáp xuống đẩy phụ. Một bạn kéo, một bạn đẩy, chiếc lá trôi băng băng.' }
      ],
      baiHoc: 'Một mình thì nặng, hai mình thì nhẹ.',
      hoi: [
        { de: 'Thấy bạn kéo mãi không nổi, mình nên làm gì?',
          dung: { hinh: 'dan/hanh-dong/help', nhan: 'giúp bạn' },
          sai: [{ hinh: 'dan/hanh-dong/go', nhan: 'bỏ đi' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bạn' }] },
        { de: 'Hai bạn cùng làm thì việc nặng thành ra sao?',
          dung: { hinh: 'dan/tinh-tu/easy', nhan: 'dễ hơn' },
          sai: [{ hinh: 'dan/tinh-tu/difficult', nhan: 'khó hơn' },
                { hinh: 'dan/tinh-tu/heavy', nhan: 'nặng hơn' }] },
        { de: 'Được bạn giúp thì mình nói gì?',
          dung: { hinh: 'dan/giao-tiep/thank-you', nhan: 'cảm ơn bạn' },
          sai: [{ hinh: 'dan/giao-tiep/no', nhan: 'lắc đầu' },
                { hinh: 'dan/truong-hoc/be-quiet', nhan: 'không nói gì' }] }
      ]
    },

    {
      ma: 'goc-do-choi', doDu: 1, ten: 'Góc đồ chơi của bé', duc: 'tự dọn dẹp', tuoi: [3, 4],
      canh: [
        { hinh: 'tranh/truyen/goc-do-choi-1', loi: 'Bi chơi suốt cả buổi chiều. Đồ chơi vương khắp sàn nhà.' },
        { hinh: 'tranh/truyen/goc-do-choi-2', loi: 'Mẹ gọi: "Tới giờ ăn cơm rồi!" Bi nhìn đống đồ chơi, định bỏ đó mà chạy đi.' },
        { hinh: 'tranh/truyen/goc-do-choi-3', loi: 'Bi ngồi xuống nhặt từng món bỏ vào giỏ. Sàn nhà sạch bong, Bi thấy mình giỏi ghê.' }
      ],
      baiHoc: 'Chơi xong mà cất đồ, lần sau tìm là thấy ngay.',
      hoi: [
        { de: 'Chơi xong thì đồ chơi để đâu?',
          dung: { hinh: 'dan/hanh-dong/pack', nhan: 'cất vào giỏ' },
          sai: [{ hinh: 'dan/hanh-dong/throw', nhan: 'ném đi' },
                { hinh: 'dan/tinh-tu/dirty', nhan: 'để bừa ra sàn' }] },
        { de: 'Ai dọn góc đồ chơi của bé?',
          dung: { hinh: 'dan/hanh-dong/tidy-up', nhan: 'chính bé dọn' },
          sai: [{ hinh: 'dan/nguoi/me', nhan: 'mẹ dọn hộ' },
                { hinh: 'dan/hanh-dong/sleep', nhan: 'không ai dọn' }] },
        { de: 'Phòng gọn gàng thì bé thấy thế nào?',
          dung: { hinh: 'dan/cam-xuc/proud', nhan: 'tự hào' },
          sai: [{ hinh: 'dan/cam-xuc/sad', nhan: 'buồn' },
                { hinh: 'dan/cam-xuc/angry', nhan: 'bực mình' }] }
      ]
    },

    {
      ma: 'xep-hang-lay-sua', doDu: 1, ten: 'Xếp hàng lấy sữa', duc: 'chờ đến lượt', tuoi: [4, 5],
      canh: [
        { hinh: 'tranh/truyen/xep-hang-lay-sua-1', loi: 'Cô mang sữa ra, cả lớp xếp thành một hàng dài. Tí đứng cuối, sốt ruột lắm.' },
        { hinh: 'tranh/truyen/xep-hang-lay-sua-2', loi: 'Tí nghĩ: hay là mình chen lên trước nhỉ? Nhưng các bạn sẽ nhăn mặt mất.' },
        { hinh: 'tranh/truyen/xep-hang-lay-sua-3', loi: 'Tí đứng yên chờ. Đến lượt Tí, ly sữa vẫn còn đó, mát lạnh.' }
      ],
      baiHoc: 'Chờ một chút thôi, phần của mình không mất đi đâu cả.',
      hoi: [
        { de: 'Đông bạn cùng muốn lấy sữa thì phải làm sao?',
          dung: { hinh: 'dan/truong-hoc/line-up', nhan: 'xếp hàng' },
          sai: [{ hinh: 'dan/cam-xuc/selfish', nhan: 'chen lên trước' },
                { hinh: 'dan/hanh-dong/push', nhan: 'xô bạn ra' }] },
        { de: 'Chưa tới lượt mình thì mình làm gì?',
          dung: { hinh: 'dan/cam-xuc/patient', nhan: 'kiên nhẫn chờ' },
          sai: [{ hinh: 'dan/hanh-dong/cry', nhan: 'khóc đòi' },
                { hinh: 'dan/cam-xuc/angry', nhan: 'cáu lên' }] },
        { de: 'Tí chờ xong thì chuyện gì xảy ra?',
          dung: { hinh: 'dan/cam-xuc/happy', nhan: 'vẫn có phần của mình' },
          sai: [{ hinh: 'dan/cam-xuc/sad', nhan: 'hết mất sữa' },
                { hinh: 'dan/cam-xuc/scared', nhan: 'bị cô mắng' }] }
      ]
    },

    {
      ma: 'hen-ban-goc-cay', doDu: 1, ten: 'Hẹn bạn ở gốc cây', duc: 'giữ lời hứa', tuoi: [4, 5],
      canh: [
        { hinh: 'tranh/truyen/hen-ban-goc-cay-1', loi: 'Bo hẹn Na: "Mai mình chờ bạn ở gốc cây nhé!" Sáng hôm sau, trời đổ mưa to.' },
        { hinh: 'tranh/truyen/hen-ban-goc-cay-2', loi: 'Bo nằm trong chăn ấm, nhớ ra lời hẹn. Mưa thế này, chắc Na cũng chẳng đi đâu.' },
        { hinh: 'tranh/truyen/hen-ban-goc-cay-3', loi: 'Bo mặc áo mưa chạy ra gốc cây. Na vẫn đứng đó chờ, ướt hết cả tóc.' }
      ],
      baiHoc: 'Đã hứa với bạn thì tới, dù trời mưa.',
      hoi: [
        { de: 'Đã hẹn bạn mà trời mưa thì mình làm gì?',
          dung: { hinh: 'dan/hanh-dong/come', nhan: 'vẫn tới gặp bạn' },
          sai: [{ hinh: 'dan/hanh-dong/sleep', nhan: 'ngủ tiếp' },
                { hinh: 'dan/hanh-dong/watch', nhan: 'ở nhà xem tivi' }] },
        { de: 'Na chờ Bo ở gốc cây. Na là bạn thế nào?',
          dung: { hinh: 'dan/cam-xuc/patient', nhan: 'kiên nhẫn' },
          sai: [{ hinh: 'dan/cam-xuc/selfish', nhan: 'ích kỷ' },
                { hinh: 'dan/cam-xuc/angry', nhan: 'hay cáu' }] },
        { de: 'Hứa rồi mà không tới thì bạn sẽ thế nào?',
          dung: { hinh: 'dan/cam-xuc/sad', nhan: 'bạn buồn' },
          sai: [{ hinh: 'dan/cam-xuc/happy', nhan: 'bạn vui' },
                { hinh: 'dan/cam-xuc/laughing', nhan: 'bạn cười' }] }
      ]
    }
  ];

  /* Tình huống: mười hai câu ngắn, chơi nhanh mỗi ngày. Không có truyện, chỉ
     hỏi thẳng "bé nên làm gì" rồi cho ba hình để chọn. */
  var TINH_HUONG = [
    { de: 'Bạn bị ngã ngay trước mặt bé. Bé nên làm gì?',
      dung: { hinh: 'dan/hanh-dong/help', nhan: 'đỡ bạn dậy' },
      sai: [{ hinh: 'dan/hanh-dong/go', nhan: 'bỏ đi' },
            { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bạn' }] },
    { de: 'Bé làm đổ ly nước của mẹ. Bé nên làm gì?',
      dung: { hinh: 'dan/giao-tiep/sorry', nhan: 'nhận lỗi và xin lỗi' },
      sai: [{ hinh: 'dan/cam-xuc/scared', nhan: 'trốn đi' },
            { hinh: 'dan/cam-xuc/selfish', nhan: 'đổ cho em' }] },
    { de: 'Tới giờ lấy sữa, bạn nào cũng muốn lấy trước. Bé làm gì?',
      dung: { hinh: 'dan/truong-hoc/line-up', nhan: 'xếp hàng chờ' },
      sai: [{ hinh: 'dan/hanh-dong/push', nhan: 'chen lên' },
            { hinh: 'dan/hanh-dong/take', nhan: 'giành lấy' }] },
    { de: 'Chơi xong, đồ chơi vương khắp nhà. Bé làm gì?',
      dung: { hinh: 'dan/hanh-dong/tidy-up', nhan: 'cất vào giỏ' },
      sai: [{ hinh: 'dan/hanh-dong/sleep', nhan: 'để đó đi ngủ' },
            { hinh: 'dan/hanh-dong/throw', nhan: 'đá ra chỗ khác' }] },
    { de: 'Bà cầm nhiều đồ nặng đi vào. Bé làm gì?',
      dung: { hinh: 'dan/hanh-dong/help', nhan: 'chạy ra đỡ bà' },
      sai: [{ hinh: 'dan/hanh-dong/watch', nhan: 'xem tivi tiếp' },
            { hinh: 'dan/hanh-dong/play', nhan: 'chạy đi chơi' }] },
    { de: 'Bé có một gói bánh, bạn ngồi cạnh không có gì. Bé làm gì?',
      dung: { hinh: 'dan/hanh-dong/share', nhan: 'chia cho bạn' },
      sai: [{ hinh: 'dan/hanh-dong/eat', nhan: 'ăn hết một mình' },
            { hinh: 'dan/cam-xuc/selfish', nhan: 'giấu đi' }] },
    { de: 'Sáng tới lớp, bé gặp cô giáo. Bé nói gì?',
      dung: { hinh: 'dan/giao-tiep/good-morning', nhan: 'con chào cô' },
      sai: [{ hinh: 'dan/truong-hoc/be-quiet', nhan: 'im lặng đi qua' },
            { hinh: 'dan/hanh-dong/run', nhan: 'chạy vào lớp' }] },
    { de: 'Bạn cho bé mượn cây bút màu. Bé nói gì?',
      dung: { hinh: 'dan/giao-tiep/thank-you', nhan: 'cảm ơn bạn' },
      sai: [{ hinh: 'dan/giao-tiep/no', nhan: 'lắc đầu' },
            { hinh: 'dan/giao-tiep/sorry', nhan: 'xin lỗi' }] },
    { de: 'Bé muốn mượn đồ chơi của bạn. Bé nói thế nào?',
      dung: { hinh: 'dan/giao-tiep/please', nhan: 'cho mình mượn với' },
      sai: [{ hinh: 'dan/hanh-dong/take', nhan: 'giật lấy' },
            { hinh: 'dan/hanh-dong/cry', nhan: 'khóc đòi' }] },
    { de: 'Lớp có bạn mới ngồi một mình. Bé làm gì?',
      dung: { hinh: 'dan/giao-tiep/hello', nhan: 'tới chào bạn' },
      sai: [{ hinh: 'dan/hanh-dong/go', nhan: 'kệ bạn' },
            { hinh: 'dan/cam-xuc/laughing', nhan: 'cười bạn' }] },
    { de: 'Bé làm vỡ đồ mà chưa ai thấy. Bé nên làm gì?',
      dung: { hinh: 'dan/cam-xuc/honest', nhan: 'nói thật với mẹ' },
      sai: [{ hinh: 'dan/cam-xuc/scared', nhan: 'giấu đi' },
            { hinh: 'dan/truong-hoc/be-quiet', nhan: 'im lặng luôn' }] },
    { de: 'Cô đang nói chuyện với cả lớp. Bé làm gì?',
      dung: { hinh: 'dan/hanh-dong/listen', nhan: 'ngồi nghe cô' },
      sai: [{ hinh: 'dan/hanh-dong/speak', nhan: 'nói chuyện riêng' },
            { hinh: 'dan/hanh-dong/play', nhan: 'chơi đồ chơi' }] }
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
