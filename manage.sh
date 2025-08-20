#!/bin/bash

# Script quản lý PM2 cho trang web trắc nghiệm
# Sử dụng: ./manage.sh [start|stop|restart|status|logs|monit]

case "$1" in
    start)
        echo "🚀 Khởi động trang web trắc nghiệm..."
        pm2 start ecosystem.config.js
        echo "✅ Đã khởi động thành công!"
        echo "🌐 Trang web cũ: http://localhost:8000"
        echo "🌐 Trang web JSON: http://localhost:8003/index_json.html"
        ;;
    stop)
        echo "🛑 Dừng trang web trắc nghiệm..."
        pm2 stop ecosystem.config.js
        echo "✅ Đã dừng thành công!"
        ;;
    restart)
        echo "🔄 Khởi động lại trang web trắc nghiệm..."
        pm2 restart ecosystem.config.js
        echo "✅ Đã khởi động lại thành công!"
        ;;
    reload)
        echo "🔄 Reload trang web trắc nghiệm (zero-downtime)..."
        pm2 reload ecosystem.config.js
        echo "✅ Đã reload thành công!"
        ;;
    status)
        echo "📊 Trạng thái trang web trắc nghiệm:"
        pm2 status
        ;;
    logs)
        echo "📝 Logs trang web trắc nghiệm:"
        pm2 logs --lines 20
        ;;
    monit)
        echo "📈 Monitor real-time:"
        pm2 monit
        ;;
    delete)
        echo "🗑️  Xóa trang web trắc nghiệm khỏi PM2..."
        pm2 delete ecosystem.config.js
        echo "✅ Đã xóa thành công!"
        ;;
    save)
        echo "💾 Lưu cấu hình PM2..."
        pm2 save
        echo "✅ Đã lưu thành công!"
        ;;
    startup)
        echo "🔧 Tạo startup script..."
        pm2 startup
        echo "✅ Đã tạo startup script!"
        echo "💡 Chạy lệnh được hiển thị ở trên để hoàn tất setup"
        ;;
    *)
        echo "❌ Sử dụng: $0 {start|stop|restart|reload|status|logs|monit|delete|save|startup}"
        echo ""
        echo "📋 Các lệnh có sẵn:"
        echo "  start    - Khởi động trang web"
        echo "  stop     - Dừng trang web"
        echo "  restart  - Khởi động lại trang web"
        echo "  reload   - Reload zero-downtime"
        echo "  status   - Xem trạng thái"
        echo "  logs     - Xem logs"
        echo "  monit    - Monitor real-time"
        echo "  delete   - Xóa khỏi PM2"
        echo "  save     - Lưu cấu hình"
        echo "  startup  - Tạo startup script"
        echo ""
        echo "🌐 URLs:"
        echo "  Trang web cũ: http://localhost:8000"
        echo "  Trang web JSON: http://localhost:8003/index_json.html"
        exit 1
        ;;
esac
