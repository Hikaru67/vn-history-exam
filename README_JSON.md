# 🎯 Trắc Nghiệm Lịch Sử - Phiên bản JSON

## 📋 Tổng quan

Trang web trắc nghiệm sử dụng dữ liệu JSON động, cho phép dễ dàng cập nhật và quản lý câu hỏi mà không cần sửa code JavaScript.

## ✨ Tính năng mới

- **Dữ liệu JSON động**: Tải câu hỏi từ file JSON thay vì hardcode
- **Cập nhật dễ dàng**: Chỉ cần sửa file JSON để thay đổi câu hỏi
- **Fallback tự động**: Sử dụng dữ liệu mẫu nếu không tải được JSON
- **Trạng thái loading**: Hiển thị quá trình tải dữ liệu

## 📁 Cấu trúc file

```
tracnghiem/
├── index_json.html          # Trang chính (phiên bản JSON)
├── index.html               # Trang chính (phiên bản cũ)
├── style.css                # CSS chung
├── script.js                # JavaScript (đã cập nhật để đọc JSON)
├── questions.json           # Dữ liệu tất cả câu hỏi
├── part1_questions.json     # Câu hỏi phần 1
├── part2_questions.json     # Câu hỏi phần 2
├── part3_questions.json     # Câu hỏi phần 3
├── extract_to_json.py       # Script tạo JSON từ markdown
└── README_JSON.md           # Hướng dẫn này
```

## 📊 Cấu trúc JSON

### File `questions.json` chính:

```json
{
  "metadata": {
    "title": "Trắc Nghiệm Lịch Sử",
    "description": "Kỷ niệm 80 năm Cách mạng Tháng 8 thành công và Quốc khánh 2/9",
    "total_questions": 230,
    "created_date": "2025-01-27",
    "version": "1.0"
  },
  "parts": {
    "part1": {
      "title": "Cách mạng Tháng 8 và Quốc khánh 2/9",
      "description": "70 câu hỏi về bối cảnh, diễn biến và ý nghĩa",
      "question_count": 70,
      "questions": [...]
    },
    "part2": {...},
    "part3": {...}
  }
}
```

### Cấu trúc câu hỏi:

```json
{
  "id": 1,
  "question": "Nội dung câu hỏi?",
  "options": {
    "A": "Đáp án A",
    "B": "Đáp án B",
    "C": "Đáp án C",
    "D": "Đáp án D"
  },
  "correct": "A"
}
```

## 🚀 Cách sử dụng

### 1. Chạy trang web:
```bash
python3 -m http.server 8003
```
Truy cập: `http://localhost:8003/index_json.html`

### 2. Cập nhật câu hỏi:
- Sửa file `questions.json` hoặc các file `part*_questions.json`
- Refresh trang web để thấy thay đổi

### 3. Tạo JSON từ markdown:
```bash
python3 extract_to_json.py
```

## 🔧 Tùy chỉnh

### Thêm câu hỏi mới:
1. Mở file `questions.json`
2. Thêm câu hỏi vào phần tương ứng
3. Refresh trang web

### Thay đổi cấu trúc:
- Sửa file `script.js` trong hàm `loadQuestionData()`
- Điều chỉnh cách chuyển đổi dữ liệu JSON

### Tạo file JSON riêng:
```bash
# Tạo JSON cho từng phần
python3 extract_to_json.py
```

## 📈 Thống kê dữ liệu

- **Tổng câu hỏi**: 230 câu
- **Phần 1**: 70 câu (Cách mạng Tháng 8)
- **Phần 2**: 80 câu (Cuộc đời Bác Hồ)
- **Phần 3**: 80 câu (Thành tựu 80 năm)

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và animation
- **JavaScript ES6+**: Logic xử lý với async/await
- **JSON**: Dữ liệu động
- **Fetch API**: Tải dữ liệu từ file

## 🔍 Debug và Troubleshooting

### Kiểm tra console:
- Mở Developer Tools (F12)
- Xem tab Console để kiểm tra lỗi

### Lỗi thường gặp:
1. **CORS error**: Chạy qua HTTP server (không mở file trực tiếp)
2. **JSON syntax error**: Kiểm tra cú pháp JSON
3. **File not found**: Đảm bảo file JSON tồn tại

### Fallback mode:
- Nếu không tải được JSON, trang sẽ sử dụng dữ liệu mẫu
- Hiển thị cảnh báo màu vàng

## 📝 Ghi chú

- **Encoding**: Sử dụng UTF-8 cho tiếng Việt
- **Performance**: JSON được cache sau lần tải đầu tiên
- **Compatibility**: Hoạt động trên tất cả trình duyệt hiện đại
- **Security**: Chỉ đọc file JSON, không ghi

---

**Phiên bản**: 1.0  
**Cập nhật**: 27/01/2025  
**Tác giả**: AI Assistant
