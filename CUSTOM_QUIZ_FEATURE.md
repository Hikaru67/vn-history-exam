# 🚀 Tính năng mới: Chọn số lượng câu hỏi và thời gian làm bài

## 📋 Tổng quan

Đã cập nhật hệ thống trắc nghiệm để cho phép người dùng **tùy chỉnh số lượng câu hỏi** và **thời gian làm bài tỷ lệ thuận** với số lượng câu hỏi, tạo ra trải nghiệm linh hoạt và cá nhân hóa hơn.

## ✨ Tính năng mới

### 🎯 **Chọn số lượng câu hỏi**
- ✅ **Preset options**: 10, 20, 30, 50, 100 câu
- ✅ **Tùy chỉnh**: Nhập số câu từ 5-230
- ✅ **Hiển thị thời gian**: Tự động tính thời gian cho mỗi option
- ✅ **Validation**: Kiểm tra giới hạn số câu có sẵn

### ⏱️ **Chọn thời gian mỗi câu**
- ✅ **30 giây**: Cho câu hỏi dễ, trả lời nhanh
- ✅ **45 giây**: Mặc định, cân bằng
- ✅ **1 phút**: Cho câu hỏi trung bình
- ✅ **1.5 phút**: Cho câu hỏi khó
- ✅ **2 phút**: Cho câu hỏi phức tạp

### 🧮 **Tính thời gian tự động**
- ✅ **Công thức**: Tổng thời gian = Số câu × Thời gian mỗi câu
- ✅ **Hiển thị real-time**: Cập nhật ngay khi thay đổi cấu hình
- ✅ **Format thông minh**: Hiển thị giờ/phút/giây phù hợp

### 📊 **Thông tin chi tiết**
- ✅ **Tổng câu hỏi có sẵn**: Hiển thị số câu trong database
- ✅ **Thời gian làm bài**: Tính toán và hiển thị
- ✅ **Giới hạn tùy chỉnh**: Max = tổng câu hỏi có sẵn

## 🎨 Giao diện

### **Cấu hình bài thi:**
```html
<div class="quiz-config">
    <h3>⚙️ Cấu hình bài thi:</h3>
    
    <!-- Số lượng câu hỏi -->
    <div class="config-row">
        <div class="config-item">
            <label>Số lượng câu hỏi:</label>
            <select>
                <option value="10">10 câu (5 phút)</option>
                <option value="20">20 câu (10 phút)</option>
                <option value="30">30 câu (15 phút)</option>
                <option value="50">50 câu (25 phút)</option>
                <option value="100">100 câu (50 phút)</option>
                <option value="custom">Tùy chỉnh</option>
            </select>
        </div>
    </div>
    
    <!-- Thời gian mỗi câu -->
    <div class="config-row">
        <div class="config-item">
            <label>Thời gian mỗi câu:</label>
            <select>
                <option value="30">30 giây</option>
                <option value="45">45 giây</option>
                <option value="60">1 phút</option>
                <option value="90">1.5 phút</option>
                <option value="120">2 phút</option>
            </select>
        </div>
        
        <div class="config-item">
            <label>Tổng thời gian:</label>
            <span id="total-time-display">15 phút</span>
        </div>
    </div>
</div>
```

### **CSS Styling:**
```css
.quiz-config {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    border: 2px solid #e1e5e9;
}

.config-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.config-item {
    flex: 1;
    min-width: 200px;
}

.config-info {
    background: white;
    border-radius: 10px;
    padding: 15px;
    border-left: 4px solid #667eea;
}
```

## 🔧 JavaScript Logic

### **Cấu hình Quiz:**
```javascript
let quizConfig = {
    questionCount: 20,
    timePerQuestion: 45, // giây
    totalTime: 900 // 15 phút
};
```

### **Cập nhật thời gian:**
```javascript
function updateTimeDisplay() {
    const questionCount = quizConfig.questionCount;
    const timePerQuestion = quizConfig.timePerQuestion;
    const totalTime = questionCount * timePerQuestion;
    
    quizConfig.totalTime = totalTime;
    
    // Cập nhật hiển thị
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = formatTime(totalTime);
    }
}
```

### **Format thời gian thông minh:**
```javascript
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} giờ ${remainingMinutes} phút`;
    } else if (minutes > 0) {
        return `${minutes} phút ${remainingSeconds > 0 ? remainingSeconds + ' giây' : ''}`;
    } else {
        return `${seconds} giây`;
    }
}
```

### **Event Listeners:**
```javascript
function setupQuizConfigEvents() {
    // Question count selection
    const questionCountSelect = document.getElementById('question-count');
    const customConfig = document.getElementById('custom-config');
    const customCountInput = document.getElementById('custom-count');
    const timePerQuestionSelect = document.getElementById('time-per-question');
    
    // Xử lý thay đổi số lượng câu hỏi
    questionCountSelect.addEventListener('change', function() {
        const value = this.value;
        if (value === 'custom') {
            customConfig.style.display = 'block';
            quizConfig.questionCount = parseInt(customCountInput.value);
        } else {
            customConfig.style.display = 'none';
            quizConfig.questionCount = parseInt(value);
        }
        updateTimeDisplay();
    });
    
    // Xử lý thay đổi thời gian mỗi câu
    timePerQuestionSelect.addEventListener('change', function() {
        quizConfig.timePerQuestion = parseInt(this.value);
        updateTimeDisplay();
    });
}
```

## 📱 Responsive Design

### **Mobile-friendly:**
```css
@media (max-width: 768px) {
    .config-row {
        flex-direction: column;
        gap: 15px;
    }
    
    .config-item {
        min-width: auto;
    }
    
    .quiz-config {
        padding: 20px;
    }
}
```

## 🧪 Test tính năng

### **1. Demo trang:**
```
http://localhost:8000/demo_custom_quiz.html
```

### **2. Trang chính:**
```
http://localhost:8000/index_json.html
```

### **3. Cách test:**
1. Chọn các phần câu hỏi
2. Thử các preset số lượng câu hỏi khác nhau
3. Thử chọn "Tùy chỉnh" và nhập số câu
4. Thay đổi thời gian mỗi câu
5. Quan sát thời gian tổng thay đổi
6. Bắt đầu làm bài và kiểm tra timer

## 📊 Ví dụ cấu hình

### **Bài thi nhanh (10 câu):**
- Số câu: 10
- Thời gian mỗi câu: 30 giây
- Tổng thời gian: 5 phút

### **Bài thi chuẩn (20 câu):**
- Số câu: 20
- Thời gian mỗi câu: 45 giây
- Tổng thời gian: 15 phút

### **Bài thi dài (50 câu):**
- Số câu: 50
- Thời gian mỗi câu: 1 phút
- Tổng thời gian: 50 phút

### **Bài thi toàn diện (100 câu):**
- Số câu: 100
- Thời gian mỗi câu: 45 giây
- Tổng thời gian: 75 phút

## 🎯 Lợi ích

### **Cho người dùng:**
- ✅ **Linh hoạt**: Chọn số câu phù hợp với thời gian
- ✅ **Cá nhân hóa**: Điều chỉnh độ khó qua thời gian
- ✅ **Rõ ràng**: Biết trước thời gian làm bài
- ✅ **Tiện lợi**: Không cần tính toán thủ công

### **Cho hệ thống:**
- ✅ **Mở rộng**: Dễ dàng thêm preset mới
- ✅ **Tương thích**: Hoạt động với dữ liệu hiện tại
- ✅ **Hiệu suất**: Tính toán nhanh và chính xác
- ✅ **UX tốt**: Giao diện trực quan, dễ sử dụng

## 🔄 Triển khai

### **1. Restart server:**
```bash
./manage.sh restart
```

### **2. Test tính năng:**
- Truy cập: http://localhost:8000/demo_custom_quiz.html
- Thử các cấu hình khác nhau
- Kiểm tra tính toán thời gian

### **3. Kiểm tra logs:**
```bash
./manage.sh logs
```

## 📝 Ghi chú

- **Backward compatibility**: Tính năng tương thích với dữ liệu cũ
- **Performance**: Không ảnh hưởng đến hiệu suất
- **Mobile friendly**: Hoạt động tốt trên mobile
- **Accessibility**: Giao diện dễ tiếp cận

---

**Phiên bản**: 3.0  
**Cập nhật**: 27/01/2025  
**Tác giả**: AI Assistant
