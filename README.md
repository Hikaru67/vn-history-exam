# 🎯 Trắc Nghiệm Lịch Sử - Hệ thống hoàn chỉnh

## 📋 Tổng quan

Trang web trắc nghiệm lịch sử với dữ liệu JSON động, quản lý bằng PM2, và tính năng hiển thị kết quả ngay lập tức.

## ✨ Tính năng chính

### 🎯 **Trắc nghiệm thông minh**
- ✅ Chọn nhiều bộ câu hỏi
- ✅ Tự động chọn ngẫu nhiên 20 câu
- ✅ Hiển thị kết quả ngay lập tức
- ✅ Timer 20 phút
- ✅ Xem lại chi tiết bài làm

### 📊 **Dữ liệu JSON động**
- ✅ 230 câu hỏi đầy đủ
- ✅ Tải dữ liệu từ JSON
- ✅ Fallback tự động
- ✅ Dễ dàng cập nhật

### 🚀 **Quản lý PM2**
- ✅ Auto-restart khi crash
- ✅ Logs tự động
- ✅ Monitoring real-time
- ✅ Startup script

## 📁 Cấu trúc dự án

```
tracnghiem/
├── 📄 index.html              # Trang web chính (cũ)
├── 📄 index_json.html         # Trang web JSON
├── 📄 demo_result.html        # Demo tính năng mới
├── 📄 script.js               # JavaScript chính
├── 📄 style.css               # CSS styling
├── 📄 server.py               # HTTP server script
├── 📄 manage.sh               # Script quản lý PM2
├── 📄 ecosystem.config.js     # Cấu hình PM2
├── 📄 package.json            # Dependencies
├── 📄 extract_to_json.py      # Tạo JSON từ markdown
├── 📄 check_json.py           # Kiểm tra JSON
├── 📄 questions.json          # Dữ liệu chính (230 câu)
├── 📄 part1_questions.json    # Phần 1 (70 câu)
├── 📄 part2_questions.json    # Phần 2 (80 câu)
├── 📄 part3_questions.json    # Phần 3 (80 câu)
├── 📄 README.md               # Hướng dẫn này
├── 📄 README_JSON.md          # Hướng dẫn JSON
├── 📄 README_PM2.md           # Hướng dẫn PM2
├── 📄 README_RESULT_FEATURE.md # Hướng dẫn tính năng mới
├── 📄 thong_ke_cau_hoi.md     # Thống kê câu hỏi
├── 📁 logs/                   # Logs PM2
├── 📁 node_modules/           # Dependencies Node.js
└── 📄 cau_hoi_trac_nghiem_phan_*.md # Dữ liệu gốc
```

## 🚀 Cách sử dụng

### **1. Khởi động với PM2 (Khuyến nghị):**
```bash
# Khởi động
./manage.sh start

# Dừng
./manage.sh stop

# Khởi động lại
./manage.sh restart

# Xem trạng thái
./manage.sh status

# Xem logs
./manage.sh logs
```

### **2. Truy cập trang web:**
- **Trang chính**: http://localhost:8000
- **Trang JSON**: http://localhost:8003/index_json.html
- **Demo tính năng**: http://localhost:8003/demo_result.html

### **3. Cập nhật dữ liệu:**
```bash
# Tạo JSON từ markdown
python3 extract_to_json.py

# Kiểm tra JSON
python3 check_json.py
```

## 📊 Dữ liệu câu hỏi

### **Tổng cộng: 230 câu hỏi**
- **Phần 1**: 70 câu (Cách mạng Tháng 8 và Quốc khánh 2/9)
- **Phần 2**: 80 câu (Cuộc đời Chủ tịch Hồ Chí Minh)
- **Phần 3**: 80 câu (Thành tựu 80 năm và giai đoạn 1945-1969)

### **Nguồn dữ liệu:**
- `cau_hoi_trac_nghiem_phan_1.md` đến `phan_6.md`
- `tong_hop_cau_hoi_trac_nghiem.md`

## 🎯 Tính năng mới: Hiển thị kết quả ngay lập tức

### **Cách hoạt động:**
1. Chọn câu trả lời
2. Hiển thị kết quả ngay lập tức:
   - ✅ Đáp án đúng: màu xanh
   - ❌ Đáp án sai: màu đỏ
3. Thông báo ở góc phải màn hình
4. Tự động chuyển câu sau 2 giây

### **Test tính năng:**
- Truy cập: http://localhost:8003/demo_result.html
- Chọn câu trả lời và quan sát kết quả

## 🔧 Cài đặt và cấu hình

### **1. Cài đặt PM2:**
```bash
npm install -g pm2
npm install
```

### **2. Setup startup script (tùy chọn):**
```bash
./manage.sh startup
# Chạy lệnh được hiển thị
./manage.sh save
```

### **3. Kiểm tra logs:**
```bash
./manage.sh logs
pm2 monit
```

## 📈 Monitoring và logs

### **Logs được lưu trong:**
- `logs/err.log` - Error logs (web cũ)
- `logs/out.log` - Output logs (web cũ)
- `logs/err-json.log` - Error logs (JSON)
- `logs/out-json.log` - Output logs (JSON)

### **Monitoring:**
```bash
# Real-time monitoring
./manage.sh monit

# Xem thống kê
pm2 show tracnghiem-web
pm2 show tracnghiem-json
```

## 🛠️ Troubleshooting

### **Port đã được sử dụng:**
```bash
sudo netstat -tlnp | grep :800
sudo kill -9 <PID>
```

### **PM2 không khởi động:**
```bash
pm2 delete all
./manage.sh start
```

### **JSON lỗi:**
```bash
python3 check_json.py
```

## 📝 Ghi chú

- **Encoding**: UTF-8 cho tiếng Việt
- **Performance**: JSON được cache
- **Compatibility**: Hoạt động trên tất cả trình duyệt hiện đại
- **Security**: Chỉ đọc file JSON, không ghi

## 🔗 Liên kết hữu ích

- [Hướng dẫn JSON chi tiết](README_JSON.md)
- [Hướng dẫn PM2 chi tiết](README_PM2.md)
- [Hướng dẫn tính năng mới](README_RESULT_FEATURE.md)
- [Thống kê câu hỏi](thong_ke_cau_hoi.md)

---

**Phiên bản**: 2.0  
**Cập nhật**: 27/01/2025  
**Tác giả**: AI Assistant
