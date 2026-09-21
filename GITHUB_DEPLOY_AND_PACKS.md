# APTIS Complete Trainer V3.3 — GitHub Edition

## 1. Đưa app lên GitHub Pages

Khuyến nghị tạo một repository riêng, ví dụ `aptis-complete-trainer`.

Upload **toàn bộ nội dung bên trong thư mục V3.3** lên root của repository và giữ nguyên cấu trúc:

```text
/
├── index.html
├── index_standalone.html
├── app.js
├── styles.css
├── default_data.js
├── START_LOCAL_SERVER.bat
├── .nojekyll
└── packs/
    ├── pack_manifest.json
    ├── bundled_online_packs.js
    ├── LISTENING_PACK_03_04_V3_2.json
    └── LISTENING_PACK_05_06_V3_2.json
```

Trong GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.

Sau khi Pages deploy xong, mở URL GitHub Pages. App sẽ tự đọc `packs/pack_manifest.json` và tải các pack online.

## 2. Dữ liệu hiện có

- Built-in: Listening Set 01–02 + toàn bộ Reading bank hiện tại.
- Online/Bundled: Listening Set 03–04 và 05–06.
- L3: khóa voice Man/Woman đúng giới tính, kể cả khi Random voice bật.
- L4: xáo lựa chọn A/B/C mỗi lần vào lại; Key hiển thị đáp án tiếng Anh + nghĩa tiếng Việt.

## 3. Thêm Listening Set 07–08 sau này

Giả sử có file:

`LISTENING_PACK_07_08_V3_2.json`

### Bước A — Upload file

Upload file vào thư mục:

`packs/LISTENING_PACK_07_08_V3_2.json`

### Bước B — Sửa `packs/pack_manifest.json`

Thêm một object vào mảng `packs`:

```json
{
  "pack_id": "LISTENING_PACK_07_08_V3_2",
  "title": "APTIS Listening Pack 07–08 · Canonical V1.2",
  "file": "LISTENING_PACK_07_08_V3_2.json",
  "version": "1.0.0",
  "enabled": true,
  "skill": "listening",
  "set_ids": ["SET_07", "SET_08"],
  "label": "Listening Set 07–08"
}
```

Đồng thời tăng `manifest_version`, ví dụ từ:

`2026.09.21.1` → `2026.09.21.2`

### Bước C — Trên app

Mở **Pack → Cập nhật Pack Online**. Các thiết bị truy cập cùng GitHub Pages sẽ nhận pack mới.

## 4. Khi sửa một pack đã tồn tại

Nếu thay nội dung `LISTENING_PACK_05_06_V3_2.json`, không giữ nguyên version. Hãy tăng:

`1.0.0` → `1.0.1`

và tăng `manifest_version`.

Việc này giúp trình duyệt không tiếp tục dùng bản cache cũ.

## 5. Import JSON thủ công

Nút **Import Pack JSON** vẫn hoạt động. Pack import thủ công được lưu trong localStorage của trình duyệt hiện tại.

- Phù hợp để thử pack mới trước khi đưa lên GitHub.
- Không tự đồng bộ sang điện thoại hoặc trình duyệt khác.
- Nếu muốn mọi thiết bị cùng thấy pack đó, hãy đưa JSON vào `packs/` và thêm vào manifest.
- App không cho pack cá nhân ghi đè một `pack_id` đang thuộc Built-in/Online; đổi `pack_id` nếu muốn giữ một bản thử nghiệm song song.

## 6. Offline và local

- `index_standalone.html`: chứa sẵn Set 01–06 và Reading; mở trực tiếp được bằng Chrome/Edge. Manifest online không đồng bộ ở chế độ `file://`.
- `START_LOCAL_SERVER.bat`: chạy HTTP local để kiểm tra đầy đủ cơ chế manifest.
- GitHub Pages: chế độ khuyến nghị để học trên máy tính và điện thoại.

## 7. Tiến độ học

Điểm số, lựa chọn và cấu hình voice nằm trong localStorage. GitHub Pages không phải database, nên tiến độ trên laptop và điện thoại vẫn độc lập. Pack online thì đồng bộ vì được lấy từ repository.
