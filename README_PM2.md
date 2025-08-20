# 🚀 Hướng dẫn chạy với PM2

## 📋 Tổng quan

PM2 là một process manager cho Node.js giúp quản lý và giám sát ứng dụng web. Chúng ta sẽ sử dụng PM2 để chạy Python HTTP server cho trang web trắc nghiệm.

## 🔧 Cài đặt PM2

### 1. Cài đặt Node.js (nếu chưa có):
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Hoặc sử dụng nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node
```

### 2. Cài đặt PM2:
```bash
npm install -g pm2
```

### 3. Cài đặt dependencies:
```bash
npm install
```

## 🚀 Chạy ứng dụng với PM2

### 1. Sử dụng script quản lý (Khuyến nghị):
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

# Monitor real-time
./manage.sh monit
```

### 2. Sử dụng npm scripts:
```bash
npm start
# hoặc
pm2 start ecosystem.config.js
```

### 2. Khởi động từng service riêng:
```bash
# Chạy trang web cũ (port 8000)
pm2 start ecosystem.config.js --only tracnghiem-web

# Chạy trang web JSON (port 8003)
pm2 start ecosystem.config.js --only tracnghiem-json
```

### 3. Kiểm tra trạng thái:
```bash
npm run status
# hoặc
pm2 status
```

## 📊 Quản lý ứng dụng

### Các lệnh cơ bản:

```bash
# Khởi động
npm start

# Dừng
npm run stop

# Khởi động lại
npm run restart

# Reload (zero-downtime)
npm run reload

# Xóa khỏi PM2
npm run delete

# Xem logs
npm run logs

# Monitor real-time
npm run monit
```

### Lệnh PM2 trực tiếp:

```bash
# Liệt kê tất cả processes
pm2 list

# Xem logs
pm2 logs

# Xem logs của app cụ thể
pm2 logs tracnghiem-web
pm2 logs tracnghiem-json

# Monitor
pm2 monit

# Restart app cụ thể
pm2 restart tracnghiem-web

# Stop app cụ thể
pm2 stop tracnghiem-web

# Delete app cụ thể
pm2 delete tracnghiem-web
```

## 🌐 Truy cập ứng dụng

Sau khi chạy thành công:

- **Trang web cũ**: http://localhost:8000
- **Trang web JSON**: http://localhost:8003/index_json.html

## 📁 Cấu trúc file

```
tracnghiem/
├── ecosystem.config.js      # Cấu hình PM2
├── package.json             # Dependencies và scripts
├── logs/                    # Thư mục chứa logs
│   ├── err.log             # Error logs (web cũ)
│   ├── out.log             # Output logs (web cũ)
│   ├── combined.log        # Combined logs (web cũ)
│   ├── err-json.log        # Error logs (JSON)
│   ├── out-json.log        # Output logs (JSON)
│   └── combined-json.log   # Combined logs (JSON)
├── index.html              # Trang web cũ
├── index_json.html         # Trang web JSON
├── script.js               # JavaScript
├── style.css               # CSS
├── questions.json          # Dữ liệu JSON
└── README_PM2.md           # Hướng dẫn này
```

## 🔍 Troubleshooting

### 1. Port đã được sử dụng:
```bash
# Kiểm tra port đang sử dụng
sudo netstat -tlnp | grep :8000
sudo netstat -tlnp | grep :8003

# Kill process nếu cần
sudo kill -9 <PID>
```

### 2. PM2 không khởi động được:
```bash
# Kiểm tra logs
pm2 logs

# Xóa và tạo lại
pm2 delete all
pm2 start ecosystem.config.js
```

### 3. Python không tìm thấy:
```bash
# Kiểm tra Python
which python3
python3 --version

# Cập nhật path trong ecosystem.config.js nếu cần
```

### 4. Permission denied:
```bash
# Tạo logs directory
mkdir -p logs
chmod 755 logs
```

## 📈 Monitoring

### 1. Xem thống kê real-time:
```bash
pm2 monit
```

### 2. Xem logs:
```bash
# Tất cả logs
pm2 logs

# Logs của app cụ thể
pm2 logs tracnghiem-web --lines 100

# Follow logs
pm2 logs tracnghiem-web -f
```

### 3. Thống kê:
```bash
pm2 show tracnghiem-web
pm2 show tracnghiem-json
```

## 🔄 Auto-restart

PM2 sẽ tự động restart ứng dụng khi:
- Ứng dụng crash
- Server reboot (nếu setup startup script)
- Memory vượt quá 1GB

## 🚀 Startup Script (Tùy chọn)

Để tự động khởi động khi server reboot:

```bash
# Tạo startup script
pm2 startup

# Lưu current processes
pm2 save

# Kiểm tra startup script
pm2 startup status
```

## 📝 Ghi chú

- **Logs**: Được lưu trong thư mục `logs/`
- **Auto-restart**: PM2 tự động restart khi crash
- **Memory limit**: 1GB per process
- **Instances**: 1 instance per app
- **Watch mode**: Tắt để tránh restart không cần thiết

---

**Phiên bản**: 1.0  
**Cập nhật**: 27/01/2025  
**Tác giả**: AI Assistant
