APTIS COMPLETE TRAINER V3.3 — GITHUB EDITION
============================================

MỤC TIÊU
- Một app thống nhất Listening + Reading.
- Học trên desktop/mobile qua GitHub Pages.
- Pack Listening mới có thể thêm bằng JSON + pack_manifest.json, không sửa app.js.
- Vẫn hỗ trợ Import JSON thủ công để thử nghiệm.

DỮ LIỆU HIỆN TẠI
- Built-in: Listening Set 01–02 + Reading R1/R2-3/R4/R5.
- Online/Bundled: Listening Set 03–04, 05–06.
- Tổng Listening hiện tại: Set 01–06.

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

CHẠY
1) GitHub Pages: upload toàn bộ thư mục, giữ nguyên packs/.
2) Local HTTP: chạy START_LOCAL_SERVER.bat.
3) Standalone: mở index_standalone.html; Set 01–06 vẫn có sẵn nhưng không đồng bộ manifest file://.

Xem hướng dẫn chi tiết: GITHUB_DEPLOY_AND_PACKS.md

UPDATE STOP AUDIO:
- L1: Stop ở từng câu và khu vực nghe lại câu sai.
- L2: Stop ở từng speaker.
- L3/L4: Stop cạnh nút Nghe toàn bài.
- Thanh Listening có Stop chung.
