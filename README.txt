APTIS COMPLETE TRAINER V3.8.0 — GITHUB EDITION
===============================================

MỤC TIÊU
- Một app thống nhất Listening + Reading.
- Học trên desktop/mobile qua GitHub Pages.
- Pack Listening mới có thể thêm bằng JSON + pack_manifest.json, không sửa app.js.
- Reading ưu tiên học nhanh theo dạng song ngữ English → Tiếng Việt.

DỮ LIỆU HIỆN TẠI
- Built-in: Listening Set 01–02 + Reading R1/R2-3/R4/R5.
- Online/Bundled: Listening Set 03–04, 05–06.
- Tổng Listening hiện tại: Set 01–06.
- Reading SOURCE: R1 85 câu; R2–3 65 câu; R4 42 câu; R5 21 heading/paragraph luyện tập.
- Reading Practice: 10 chủ đề, 90 mục.

READING V3.8.0 — SONG NGỮ HỌC NHANH
- R1: câu, lead, toàn bộ lựa chọn và đáp án đều hiện English + nghĩa Việt.
- R2–3: câu mở đầu và 5 câu sắp xếp hiện song ngữ; thứ tự đúng in đậm cả English và VI.
- R4: passage A–D, statement, lựa chọn Person và Key/Evidence có phần nghĩa Việt.
- R5: heading, paragraph luyện tập, memory token và mnemonic chain có nghĩa Việt.
- Practice R1/R2–3/R4/R5: bổ sung nghĩa Việt cho toàn bộ nội dung học.
- Hộp Key/đáp án đúng dùng chữ đậm cho CẢ tiếng Anh và tiếng Việt.
- Nội dung SOURCE tiếng Anh không bị thay đổi; phần dịch mới được tách trong reading_vi_data.js với provenance DERIVED_TRANSLATION_FOR_LEARNING.
- Practice R5 dùng “nghĩa nhanh” tiếng Việt theo ý chính để ôn nhanh, không được xem là bản dịch SOURCE chính thức.

CÁC SỬA LỖI ĐÃ GIỮ NGUYÊN
- L3: Man luôn dùng voice Nam, Woman luôn dùng voice Nữ; Random không đảo giới tính.
- L4: lựa chọn A/B/C được xáo lại mỗi lần vào; chấm theo answer_index nguồn.
- L4 Key: có đáp án tiếng Anh, nghĩa tiếng Việt, giải thích/evidence khi dữ liệu có.
- R5 generated paragraphs luôn gắn GENERATED_PRACTICE.

GITHUB PACK SYNC
- Manifest: packs/pack_manifest.json
- App tự tải pack online khi chạy qua HTTP/HTTPS.
- Pack online được cache để dùng lại khi mạng lỗi.
- Nút Pack > Cập nhật Pack Online dùng để ép kiểm tra bản mới.
- Khi cập nhật cùng một JSON, tăng version của pack và manifest_version.

CHẠY / CẬP NHẬT GITHUB
1) GitHub Pages: upload toàn bộ thư mục, giữ nguyên packs/ và file reading_vi_data.js.
2) Nếu chỉ cập nhật bản hiện tại, tối thiểu phải thay: index.html, app.js, styles.css, reading_vi_data.js và index_standalone.html.
3) Local HTTP: chạy START_LOCAL_SERVER.bat.
4) Standalone: mở index_standalone.html; Set 01–06 và toàn bộ bản dịch Reading V3.8.0 đã được nhúng sẵn.

Xem hướng dẫn chi tiết: GITHUB_DEPLOY_AND_PACKS.md
