# 📊 THỐNG KÊ CÂU HỎI TRẮC NGHIỆM

## Tổng quan

**Tổng số câu hỏi:** 230 câu
**Số bộ câu hỏi:** 3 bộ chính
**Nguồn dữ liệu:** 6 file markdown

## Chi tiết từng phần

### 📚 Phần 1: Cách mạng Tháng 8 và Quốc khánh 2/9
**Số câu hỏi:** 70 câu
**Nguồn:** 
- `cau_hoi_trac_nghiem_phan_1.md`: 30 câu
- `cau_hoi_trac_nghiem_phan_2.md`: 40 câu

**Nội dung:**
- Bối cảnh lịch sử (12 câu)
- Diễn biến chính (38 câu)
- Nguyên nhân thắng lợi (12 câu)
- Ý nghĩa lịch sử (8 câu)

### 👤 Phần 2: Cuộc đời Chủ tịch Hồ Chí Minh
**Số câu hỏi:** 80 câu
**Nguồn:**
- `cau_hoi_trac_nghiem_phan_3.md`: 42 câu
- `cau_hoi_trac_nghiem_phan_4.md`: 38 câu

**Nội dung:**
- Giai đoạn 1890-1911 (14 câu)
- Giai đoạn 1911-1920 (28 câu)
- Giai đoạn 1920-1930 (23 câu)
- Giai đoạn 1930-1945 (15 câu)

### 🏛️ Phần 3: Thành tựu 80 năm và giai đoạn 1945-1969
**Số câu hỏi:** 80 câu
**Nguồn:**
- `cau_hoi_trac_nghiem_phan_5.md`: 40 câu
- `cau_hoi_trac_nghiem_phan_6.md`: 40 câu

**Nội dung:**
- Giai đoạn 1945-1969 (20 câu)
- Thành tựu 80 năm xây dựng, bảo vệ và phát triển đất nước (60 câu)

## Cấu trúc dữ liệu

Mỗi câu hỏi có cấu trúc:
```javascript
{
    question: "Nội dung câu hỏi",
    options: {
        A: "Đáp án A",
        B: "Đáp án B", 
        C: "Đáp án C",
        D: "Đáp án D"
    },
    correct: "A" // Đáp án đúng
}
```

## Tính năng trang web

### 🎯 Chức năng chính
- **Chọn bộ câu hỏi**: Người dùng có thể chọn 1-3 bộ câu hỏi
- **Bài thi ngẫu nhiên**: Lấy ngẫu nhiên 20 câu từ các bộ đã chọn
- **Timer 20 phút**: Đếm ngược thời gian làm bài
- **Kết quả chi tiết**: Hiển thị điểm số và đáp án đúng/sai
- **Tự động chuyển câu**: Sau khi chọn đáp án, tự động chuyển sang câu tiếp theo

### 📱 Giao diện
- **Responsive**: Tương thích mọi thiết bị
- **Thân thiện**: Thiết kế đơn giản, dễ sử dụng
- **Animation**: Hiệu ứng chuyển đổi mượt mà
- **Màu sắc**: Gradient xanh tím đẹp mắt

## Cách sử dụng

1. Mở file `index.html` trong trình duyệt
2. Chọn bộ câu hỏi muốn làm
3. Nhấn "Bắt đầu làm bài"
4. Trả lời 20 câu hỏi trong 20 phút
5. Xem kết quả chi tiết

## Cập nhật dữ liệu

Để cập nhật dữ liệu câu hỏi:
```bash
python3 extract_questions.py
```

Script sẽ tự động trích xuất câu hỏi từ các file markdown và cập nhật file `script.js`.

---

**Lưu ý**: Dữ liệu này được trích xuất tự động từ các file markdown gốc. Để đảm bảo tính chính xác, hãy kiểm tra lại các đáp án trước khi sử dụng trong thực tế.
