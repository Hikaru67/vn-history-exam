#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import sys
import os

def run_server(port=8000):
    """Chạy HTTP server trên port được chỉ định"""
    
    # Thay đổi thư mục làm việc
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Tạo handler
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 Server đang chạy trên http://localhost:{port}")
            print(f"📁 Thư mục: {os.getcwd()}")
            print("⏹️  Nhấn Ctrl+C để dừng server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server đã dừng")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} đã được sử dụng")
            print(f"💡 Thử port khác hoặc dừng process đang chạy trên port {port}")
        else:
            print(f"❌ Lỗi: {e}")
    except Exception as e:
        print(f"❌ Lỗi không xác định: {e}")

if __name__ == "__main__":
    # Lấy port từ command line argument hoặc sử dụng default
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)
