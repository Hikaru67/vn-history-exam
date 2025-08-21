# 🎯 Trắc Nghiệm Lịch Sử - Hệ thống hoàn chỉnh

## 📋 Tổng quan

Trang web trắc nghiệm lịch sử với dữ liệu JSON động, quản lý bằng PM2, và nhiều tính năng tiên tiến bao gồm hệ thống khích tướng thông minh.

## ✨ Tính năng chính

### 🎯 **Trắc nghiệm thông minh**
- ✅ Chọn nhiều bộ câu hỏi
- ✅ **Tùy chỉnh số lượng câu hỏi** (10-100 câu hoặc tùy chỉnh)
- ✅ **Thời gian tỷ lệ thuận** với số câu hỏi
- ✅ Hiển thị kết quả ngay lập tức
- ✅ Timer động theo cấu hình
- ✅ Xem lại chi tiết bài làm
- ✅ **Hệ thống khích tướng thông minh** theo mức điểm

### 🧠 **Hệ thống khích tướng**
- ✅ **Khích tướng theo mức điểm** (100%, 90-99%, 80-89%, 60-79%, <60%)
- ✅ **Gợi ý cải thiện** cụ thể và thực tế
- ✅ **Khuyến khích thử lại** với động lực tích cực
- ✅ **Tâm lý học tích cực** - không chỉ trích, chỉ khuyến khích
- ✅ **Animation đẹp mắt** với màu sắc phân loại

### 📊 **Dữ liệu JSON động**
- ✅ **230 câu hỏi đầy đủ** với tỷ lệ đáp án cân bằng
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
├── 📄 index.html              # Trang web chính với tính năng mới
├── 📄 demo_custom_quiz.html   # Demo tính năng tùy chỉnh
├── 📄 demo_motivation.html    # Demo hệ thống khích tướng
├── 📄 demo_result.html        # Demo tính năng kết quả
├── 📄 script.js               # JavaScript chính
├── 📄 style.css               # CSS styling
├── 📄 server.py               # HTTP server script
├── 📄 manage.sh               # Script quản lý PM2
├── 📄 ecosystem.config.js     # Cấu hình PM2
├── 📄 package.json            # Dependencies
├── 📄 questions.json          # Dữ liệu chính (230 câu)
├── 📄 part1_questions.json    # Phần 1 (70 câu)
├── 📄 part2_questions.json    # Phần 2 (80 câu)
├── 📄 part3_questions.json    # Phần 3 (80 câu)
├── 📄 questions_backup.json   # Backup dữ liệu
├── 📄 README.md               # Hướng dẫn này
├── 📄 README_JSON.md          # Hướng dẫn JSON
├── 📄 README_PM2.md           # Hướng dẫn PM2
├── 📄 README_RESULT_FEATURE.md # Hướng dẫn tính năng mới
├── 📄 README_MOTIVATION_FEATURE.md # Hướng dẫn khích tướng
├── 📁 logs/                   # Logs PM2
└── 📁 node_modules/           # Dependencies Node.js
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
- **Demo tùy chỉnh**: http://localhost:8000/demo_custom_quiz.html
- **Demo khích tướng**: http://localhost:8000/demo_motivation.html
- **Demo kết quả**: http://localhost:8000/demo_result.html

### **3. Cập nhật dữ liệu:**
```bash
# Kiểm tra JSON
python3 check_json.py
```

## 📊 Dữ liệu câu hỏi

### **Tổng cộng: 230 câu hỏi**
- **Phần 1**: 70 câu (Cách mạng Tháng 8 và Quốc khánh 2/9)
- **Phần 2**: 80 câu (Cuộc đời Chủ tịch Hồ Chí Minh)
- **Phần 3**: 80 câu (Thành tựu 80 năm và giai đoạn 1945-1969)

### **Tỷ lệ đáp án cân bằng:**
- **Đáp án A**: ~50 câu (21.7%)
- **Đáp án B**: ~60 câu (26.1%)
- **Đáp án C**: ~55 câu (23.9%)
- **Đáp án D**: ~50 câu (21.7%)

## 🎯 Tính năng mới: Tùy chỉnh bài thi

### **Cấu hình linh hoạt:**
1. **Số lượng câu hỏi**: 10, 20, 30, 50, 100 câu hoặc tùy chỉnh
2. **Thời gian mỗi câu**: 30s, 45s, 1p, 1.5p, 2p
3. **Tổng thời gian**: Tự động tính theo số câu × thời gian/câu

### **Ví dụ cấu hình:**
- **20 câu × 45s = 15 phút**
- **50 câu × 30s = 25 phút**
- **100 câu × 60s = 100 phút**

### **Tính năng kết quả ngay lập tức:**
- ✅ Đáp án đúng: màu xanh
- ❌ Đáp án sai: màu đỏ
- Thông báo ở góc phải màn hình
- Tự động chuyển câu sau 2 giây

## 🧠 Tính năng khích tướng thông minh

### **Phân loại theo mức điểm:**
- **🌟 100% - Hoàn hảo**: Khích tướng đặc biệt cho thành tích xuất sắc
- **⭐ 90-99% - Xuất sắc**: Khuyến khích đạt mục tiêu cuối cùng
- **🔥 80-89% - Tốt**: Công nhận tiến bộ và khuyến khích tiếp tục
- **📚 60-79% - Trung bình**: Hướng dẫn cải thiện và học hỏi
- **💪 Dưới 60% - Cần cải thiện**: Động viên không bỏ cuộc

### **Tính năng khích tướng:**
- **🎯 Khích tướng ngẫu nhiên**: Mỗi lần hiển thị khác nhau
- **💡 Gợi ý cải thiện**: Mẹo học tập cụ thể
- **🔄 Khuyến khích thử lại**: Nút "Thử lại ngay!" với động lực
- **🎨 Giao diện đẹp**: Màu sắc phân loại và animation

### **Ví dụ khích tướng:**
- **100%**: "🌟 HOÀN HẢO! Bạn là bậc thầy lịch sử!"
- **95%**: "🎉 XUẤT SẮC! Chỉ cần 5% nữa là hoàn hảo!"
- **85%**: "👍 TỐT LẮM! Hãy tiếp tục học hỏi để tiến bộ hơn!"
- **70%**: "📖 CẦN CỐ GẮNG! Lịch sử là kho tàng kiến thức vô tận!"
- **45%**: "💪 ĐỪNG NẢN! Mỗi lần thử là một bước tiến!"

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
- `logs/err-0.log` - Error logs
- `logs/out-0.log` - Output logs
- `logs/err-json-1.log` - Error logs (JSON)
- `logs/out-json-1.log` - Output logs (JSON)

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
- **Tỷ lệ đáp án**: Đã được cân bằng để đảm bảo công bằng
- **Khích tướng**: Sử dụng tâm lý học tích cực để tăng động lực

## 🔗 Liên kết hữu ích

- [Hướng dẫn JSON chi tiết](README_JSON.md)
- [Hướng dẫn PM2 chi tiết](README_PM2.md)
- [Hướng dẫn tính năng mới](README_RESULT_FEATURE.md)
- [Hướng dẫn khích tướng](README_MOTIVATION_FEATURE.md)

## 📈 Lịch sử cập nhật

### **Phiên bản 3.1 (27/01/2025)**
- ✅ **Hệ thống khích tướng thông minh** theo mức điểm
- ✅ **Gợi ý cải thiện** cụ thể và thực tế
- ✅ **Khuyến khích thử lại** với động lực tích cực
- ✅ **Demo khích tướng** để test tính năng
- ✅ **Tâm lý học tích cực** - không chỉ trích, chỉ khuyến khích

### **Phiên bản 3.0 (27/01/2025)**
- ✅ Thêm tính năng tùy chỉnh số lượng câu hỏi
- ✅ Thời gian tỷ lệ thuận với số câu hỏi
- ✅ Cân bằng tỷ lệ đáp án (A: 21.7%, B: 26.1%, C: 23.9%, D: 21.7%)
- ✅ Cải thiện giao diện người dùng
- ✅ Backup dữ liệu tự động

### **Phiên bản 2.0 (27/01/2025)**
- ✅ Hiển thị kết quả ngay lập tức
- ✅ Quản lý PM2
- ✅ Dữ liệu JSON động

---

**Phiên bản**: 3.1  
**Cập nhật**: 27/01/2025  
**Tác giả**: AI Assistant