// Biến toàn cục
let questionData = {};
let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let timeLeft = 1200; // 20 phút
let timerInterval;
let selectedParts = [];
let quizConfig = {
    questionCount: 20,
    timePerQuestion: 45, // giây
    totalTime: 900 // 15 phút
};

// Hệ thống khích tướng
const motivationalMessages = {
    perfect: [
        "🌟 HOÀN HẢO! Bạn là bậc thầy lịch sử!",
        "🏆 100%! Không ai có thể làm tốt hơn thế này!",
        "👑 BẬC THẦY! Kiến thức lịch sử của bạn thật đáng nể!",
        "💎 HOÀN HẢO TUYỆT ĐỐI! Bạn xứng đáng nhận huy chương vàng!",
        "🎯 BULLSEYE! Mọi câu trả lời đều chính xác!"
    ],
    excellent: [
        "🎉 XUẤT SẮC! Bạn có kiến thức lịch sử rất vững vàng!",
        "⭐ TÀI GIỎI! Chỉ cần một chút nữa là hoàn hảo!",
        "🔥 RẤT TỐT! Bạn đang trên đường trở thành chuyên gia!",
        "💪 KIÊN CƯỜNG! Kết quả này thật đáng tự hào!",
        "🚀 PHI THƯỜNG! Bạn có tiềm năng rất lớn!",
        "🥊 GẦN HOÀN HẢO! Đừng để 1% còn lại làm hỏng!",
        "⚔️ CHIẾN ĐẤU! 100% đang chờ bạn!",
        "🔥 THÁCH THỨC! Bạn có dám đạt hoàn hảo không?",
        "⚡ BÙNG NỔ! Lịch sử đang thách thức bạn!",
        "🎯 MỤC TIÊU! Chỉ cần 1 bước nữa là BẬC THẦY!"
    ],
    good: [
        "👍 TỐT LẮM! Bạn đã hiểu rõ những điểm cơ bản!",
        "📚 KHÁ TỐT! Hãy tiếp tục học hỏi để tiến bộ hơn!",
        "🎯 KHÔNG TỆ! Với nỗ lực thêm, bạn sẽ xuất sắc!",
        "💡 CÓ TIỀM NĂNG! Kiến thức của bạn đang phát triển tốt!",
        "🌱 ĐANG PHÁT TRIỂN! Mỗi lần làm bài là một cơ hội học hỏi!",
        "🥊 GẦN RỒI! Chỉ cần một chút nữa là hoàn hảo!",
        "⚔️ CHIẾN ĐẤU! Đừng dừng lại ở mức này!",
        "🔥 THÁCH THỨC! Bạn có thể làm tốt hơn nữa!",
        "⚡ BÙNG NỔ! Lịch sử đang chờ bạn chinh phục!",
        "🎯 MỤC TIÊU! 100% không xa đâu!"
    ],
    average: [
        "📖 CẦN CỐ GẮNG! Lịch sử là kho tàng kiến thức vô tận!",
        "🎓 HỌC HỎI! Mỗi sai lầm là bài học quý giá!",
        "🔍 TÌM HIỂU! Hãy đào sâu hơn vào lịch sử nước nhà!",
        "📚 NGHIÊN CỨU! Kiến thức lịch sử sẽ mở ra nhiều cánh cửa!",
        "🌟 TIẾP TỤC! Không có gì là không thể với sự kiên trì!",
        "🥊 KHÔNG CHẤP NHẬN! Điểm số này không xứng với bạn!",
        "⚔️ CHIẾN ĐẤU! Lịch sử đang thách thức bạn!",
        "🔥 THÁCH THỨC! Bạn có dám đối mặt không?",
        "⚡ BÙNG NỔ! Đừng để lịch sử làm khó bạn!",
        "🎯 PHỤC THÙ! Lần này phải đạt điểm cao hơn!"
    ],
    needsImprovement: [
        "💪 ĐỪNG NẢN! Mỗi lần thử là một bước tiến!",
        "🎯 KIÊN TRÌ! Lịch sử sẽ mở ra khi bạn chăm chỉ!",
        "📚 HỌC TẬP! Hãy đọc thêm về lịch sử nước nhà!",
        "🔍 TÌM HIỂU! Mỗi câu hỏi sai là cơ hội học hỏi!",
        "🌟 KHÔNG BỎ CUỘC! Thành công đến từ sự kiên trì!",
        "🥊 KHÔNG ĐẦU HÀNG! Lịch sử không thể đánh bại bạn!",
        "⚔️ CHIẾN ĐẤU! Đừng để điểm số này làm nhục bạn!",
        "🔥 THÁCH THỨC! Bạn có dám đối mặt với lịch sử không?",
        "⚡ BÙNG NỔ! Lịch sử đang thách thức bạn!",
        "🎯 PHỤC THÙ! Lần này phải chứng minh bản thân!"
    ],
    encouragement: [
        "💡 MẸO: Hãy đọc kỹ câu hỏi và tất cả đáp án!",
        "🎯 LƯU Ý: Chú ý đến các từ khóa quan trọng!",
        "📖 GỢI Ý: Ôn lại các sự kiện lịch sử quan trọng!",
        "🔍 TIP: Tập trung vào ngày tháng và tên người!",
        "🌟 HINT: Liên hệ các sự kiện với nhau để nhớ tốt hơn!"
    ],
    comeback: [
        "🔥 COMEBACK! Hãy thử lại và chứng minh bản thân!",
        "⚡ PHẢN CÔNG! Lần này bạn sẽ làm tốt hơn!",
        "🚀 BỨT PHÁ! Đây là cơ hội để vượt qua chính mình!",
        "💪 KIÊN CƯỜNG! Thất bại là mẹ thành công!",
        "🌟 TÁI SINH! Mỗi lần thử là một phiên bản mới!",
        "🥊 PHỤC THÙ! Đừng để lịch sử đánh bại bạn!",
        "⚔️ CHIẾN ĐẤU! Lịch sử đang thách thức bạn!",
        "🎯 BÁO THÙ! Lần này phải đạt 100%!",
        "🔥 THÁCH THỨC! Bạn có dám đối mặt không?",
        "⚡ BÙNG NỔ! Đừng để kiến thức lịch sử làm khó bạn!",
        "🥊 ĐÁNH BẠI! Chứng minh bạn mạnh hơn những câu hỏi này!",
        "⚔️ CHIẾN THẮNG! Lịch sử không thể đánh bại bạn!",
        "🎯 MỤC TIÊU! 100% hoặc không gì cả!",
        "🔥 KHÔNG ĐẦU HÀNG! Lịch sử đang chờ bạn chinh phục!",
        "⚡ BÙNG PHÁT! Đừng để điểm số này làm nhục bạn!"
    ]
};

// DOM elements
const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// Load dữ liệu từ JSON
async function loadQuestionData() {
    try {
        console.log("Loading question data from JSON...");
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Chuyển đổi cấu trúc dữ liệu để tương thích với code hiện tại
        questionData = {
            part1: data.parts.part1.questions,
            part2: data.parts.part2.questions,
            part3: data.parts.part3.questions
        };
        
        console.log("Question data loaded successfully!");
        console.log("Part 1:", questionData.part1.length, "questions");
        console.log("Part 2:", questionData.part2.length, "questions");
        console.log("Part 3:", questionData.part3.length, "questions");
        
        // Cập nhật thông tin trên giao diện
        updatePartInfo(data.parts);
        
        // Cập nhật thông tin tổng câu hỏi có sẵn
        updateTotalAvailable();
        
    } catch (error) {
        console.error("Error loading question data:", error);
        // Fallback: sử dụng dữ liệu mẫu
        loadFallbackData();
    }
}

function updatePartInfo(parts) {
    // Cập nhật thông tin số câu hỏi trong HTML
    const part1Info = document.querySelector('#part1 + label .set-info p');
    const part2Info = document.querySelector('#part2 + label .set-info p');
    const part3Info = document.querySelector('#part3 + label .set-info p');
    
    if (part1Info) {
        part1Info.textContent = `${parts.part1.question_count} câu hỏi về bối cảnh, diễn biến và ý nghĩa của Cách mạng Tháng 8`;
    }
    if (part2Info) {
        part2Info.textContent = `${parts.part2.question_count} câu hỏi về các giai đoạn cuộc đời của Bác Hồ`;
    }
    if (part3Info) {
        part3Info.textContent = `${parts.part3.question_count} câu hỏi về thành tựu xây dựng và bảo vệ đất nước`;
    }
    
    // Ẩn trạng thái loading
    const loadingStatus = document.getElementById('loading-status');
    if (loadingStatus) {
        loadingStatus.innerHTML = '<p style="color: #28a745;">✅ Dữ liệu đã được tải thành công!</p>';
    }
}

function updateTotalAvailable() {
    let total = 0;
    for (let part in questionData) {
        total += questionData[part].length;
    }
    
    const totalAvailableElement = document.getElementById('total-available');
    if (totalAvailableElement) {
        totalAvailableElement.textContent = total;
    }
    
    // Cập nhật max value cho custom count
    const customCountInput = document.getElementById('custom-count');
    if (customCountInput) {
        customCountInput.max = total;
    }
}

function updateTimeDisplay() {
    const questionCount = quizConfig.questionCount;
    const timePerQuestion = quizConfig.timePerQuestion;
    const totalTime = questionCount * timePerQuestion;
    
    quizConfig.totalTime = totalTime;
    
    // Cập nhật hiển thị thời gian
    const timeDisplay = document.getElementById('time-display');
    const totalTimeDisplay = document.getElementById('total-time-display');
    
    if (timeDisplay) {
        timeDisplay.textContent = formatTime(totalTime);
    }
    if (totalTimeDisplay) {
        totalTimeDisplay.textContent = formatTime(totalTime);
    }
}

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

function loadFallbackData() {
    console.log("Loading fallback data...");
    questionData = {
        part1: [
            {
                question: "Cuộc Cách mạng Tháng Tám năm 1945 diễn ra trong bối cảnh nào?",
                options: {
                    A: "Chiến tranh thế giới thứ nhất đang diễn ra",
                    B: "Chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc",
                    C: "Chiến tranh lạnh giữa Mỹ và Liên Xô",
                    D: "Chiến tranh Việt Nam đang diễn ra"
                },
                correct: "B"
            }
        ],
        part2: [
            {
                question: "Chủ tịch Hồ Chí Minh sinh ngày nào?",
                options: {
                    A: "19/5/1890",
                    B: "19/5/1891",
                    C: "19/5/1889",
                    D: "19/5/1892"
                },
                correct: "A"
            }
        ],
        part3: [
            {
                question: "Năm 1945, nước Việt Nam Dân chủ Cộng hòa được thành lập vào ngày nào?",
                options: {
                    A: "2/9/1945",
                    B: "19/8/1945",
                    C: "30/8/1945",
                    D: "25/8/1945"
                },
                correct: "A"
            }
        ]
    };
    
    // Hiển thị trạng thái fallback
    const loadingStatus = document.getElementById('loading-status');
    if (loadingStatus) {
        loadingStatus.innerHTML = '<p style="color: #ffc107;">⚠️ Sử dụng dữ liệu mẫu (không thể tải JSON)</p>';
    }
    
    updateTotalAvailable();
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM loaded successfully");
    
    // Load dữ liệu từ JSON
    await loadQuestionData();
    
    // Selection screen events
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateStartButton);
    });
    
    document.getElementById('select-all').addEventListener('click', selectAllParts);
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    
    // Quiz configuration events
    setupQuizConfigEvents();
    
    // Quiz screen events
    document.getElementById('prev-question').addEventListener('click', previousQuestion);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    
    // Result screen events
    document.getElementById('new-quiz').addEventListener('click', newQuiz);
    document.getElementById('back-to-selection').addEventListener('click', backToSelection);
    
    // Option selection events
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });
    
    console.log("Event listeners attached");
});

function setupQuizConfigEvents() {
    // Question count selection
    const questionCountSelect = document.getElementById('question-count');
    const customConfig = document.getElementById('custom-config');
    const customCountInput = document.getElementById('custom-count');
    const timePerQuestionSelect = document.getElementById('time-per-question');
    
    if (questionCountSelect) {
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
    }
    
    if (customCountInput) {
        customCountInput.addEventListener('input', function() {
            quizConfig.questionCount = parseInt(this.value) || 20;
            updateTimeDisplay();
        });
    }
    
    if (timePerQuestionSelect) {
        timePerQuestionSelect.addEventListener('change', function() {
            quizConfig.timePerQuestion = parseInt(this.value);
            updateTimeDisplay();
        });
    }
    
    // Khởi tạo hiển thị thời gian
    updateTimeDisplay();
}

// Functions
function updateStartButton() {
    console.log("updateStartButton called");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const startButton = document.getElementById('start-quiz');
    
    if (checkboxes.length > 0) {
        startButton.disabled = false;
        selectedParts = Array.from(checkboxes).map(cb => cb.value);
        console.log("Selected parts:", selectedParts);
    } else {
        startButton.disabled = true;
        selectedParts = [];
    }
}

function selectAllParts() {
    console.log("selectAllParts called");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
    });
    
    updateStartButton();
}

function startQuiz() {
    console.log("startQuiz called");
    
    // Lấy cấu hình hiện tại
    const questionCountSelect = document.getElementById('question-count');
    const customCountInput = document.getElementById('custom-count');
    const timePerQuestionSelect = document.getElementById('time-per-question');
    
    if (questionCountSelect.value === 'custom') {
        quizConfig.questionCount = parseInt(customCountInput.value) || 20;
    } else {
        quizConfig.questionCount = parseInt(questionCountSelect.value);
    }
    
    quizConfig.timePerQuestion = parseInt(timePerQuestionSelect.value);
    quizConfig.totalTime = quizConfig.questionCount * quizConfig.timePerQuestion;
    
    // Tạo bài thi ngẫu nhiên
    currentQuiz = generateRandomQuiz();
    currentQuestionIndex = 0;
    userAnswers = {};
    timeLeft = quizConfig.totalTime;
    
    console.log("Generated quiz with", currentQuiz.length, "questions");
    console.log("Time per question:", quizConfig.timePerQuestion, "seconds");
    console.log("Total time:", quizConfig.totalTime, "seconds");
    
    // Chuyển màn hình
    showScreen('quiz-screen');
    
    // Bắt đầu timer
    startTimer();
    
    // Hiển thị câu hỏi đầu tiên
    displayQuestion();
}

function generateRandomQuiz() {
    let allQuestions = [];
    
    // Thu thập tất cả câu hỏi từ các phần được chọn
    selectedParts.forEach(part => {
        if (questionData[part]) {
            allQuestions = allQuestions.concat(questionData[part]);
        }
    });
    
    // Xáo trộn câu hỏi
    allQuestions = shuffleArray(allQuestions);
    
    // Lấy số lượng câu hỏi theo cấu hình
    const questionCount = Math.min(quizConfig.questionCount, allQuestions.length);
    
    return allQuestions.slice(0, questionCount);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    
    // Cập nhật thông tin tiến độ
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = currentQuiz.length;
    
    // Cập nhật thanh tiến độ
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Hiển thị câu hỏi
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('option-a').textContent = question.options.A;
    document.getElementById('option-b').textContent = question.options.B;
    document.getElementById('option-c').textContent = question.options.C;
    document.getElementById('option-d').textContent = question.options.D;
    
    // Reset trạng thái các option
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Hiển thị câu trả lời đã chọn và kết quả (nếu có)
    const userAnswer = userAnswers[currentQuestionIndex];
    if (userAnswer) {
        const selectedOption = document.querySelector(`[data-option="${userAnswer}"]`);
        selectedOption.classList.add('selected');
        
        // Hiển thị kết quả nếu đã trả lời
        const isCorrect = userAnswer === question.correct;
        document.querySelectorAll('.option').forEach(opt => {
            const optionValue = opt.getAttribute('data-option');
            
            if (optionValue === question.correct) {
                opt.classList.add('correct');
            } else if (optionValue === userAnswer && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });
    }
    
    // Cập nhật trạng thái các nút
    updateNavigationButtons();
}

function selectOption(event) {
    const selectedOption = event.currentTarget;
    const optionValue = selectedOption.getAttribute('data-option');
    
    // Kiểm tra nếu đã chọn rồi thì không cho chọn lại
    if (userAnswers[currentQuestionIndex]) {
        return;
    }
    
    // Xóa trạng thái selected của tất cả options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Thêm trạng thái selected cho option được chọn
    selectedOption.classList.add('selected');
    
    // Lưu câu trả lời
    userAnswers[currentQuestionIndex] = optionValue;
    
    // Hiển thị kết quả ngay lập tức
    showQuestionResult(optionValue);
    
    // Tự động chuyển câu tiếp theo sau 2 giây
    setTimeout(() => {
        if (currentQuestionIndex < currentQuiz.length - 1) {
            nextQuestion();
        }
    }, 500);
}

function showQuestionResult(selectedOption) {
    const question = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedOption === question.correct;
    
    // Hiển thị kết quả cho từng option
    document.querySelectorAll('.option').forEach(opt => {
        const optionValue = opt.getAttribute('data-option');
        
        if (optionValue === question.correct) {
            opt.classList.add('correct');
        } else if (optionValue === selectedOption && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Hiển thị thông báo kết quả
    showResultMessage(isCorrect, question);
}

function showResultMessage(isCorrect, question) {
    // Tạo thông báo kết quả
    let resultMessage = document.createElement('div');
    resultMessage.id = 'result-message';
    resultMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (isCorrect) {
        resultMessage.textContent = '✅ Đúng!';
        resultMessage.style.backgroundColor = '#28a745';
    } else {
        resultMessage.textContent = `❌ Sai! Đáp án đúng: ${question.correct}`;
        resultMessage.style.backgroundColor = '#dc3545';
    }
    
    document.body.appendChild(resultMessage);
    
    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        if (resultMessage && resultMessage.parentNode) {
            resultMessage.remove();
        }
    }, 2000);
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const submitButton = document.getElementById('submit-quiz');
    
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'inline-block' : 'none';
}

function submitQuiz() {
    clearInterval(timerInterval);
    
    // Tính điểm
    let correctCount = 0;
    let totalAnswered = 0;
    
    for (let i = 0; i < currentQuiz.length; i++) {
        if (userAnswers[i]) {
            totalAnswered++;
            if (userAnswers[i] === currentQuiz[i].correct) {
                correctCount++;
            }
        }
    }
    
    const score = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    
    // Hiển thị kết quả
    document.getElementById('score-percentage').textContent = score + '%';
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('total-answered').textContent = totalAnswered;
    
    // Hiển thị khích tướng
    displayMotivationalMessage(score, correctCount, totalAnswered);
    
    // Hiển thị chi tiết bài làm
    displayQuestionReview();
    
    // Chuyển màn hình kết quả
    showScreen('result-screen');
}

function displayMotivationalMessage(score, correctCount, totalAnswered) {
    const motivationContainer = document.getElementById('motivation-message');
    if (!motivationContainer) return;
    
    let messageCategory = '';
    let message = '';
    
    // Phân loại kết quả và chọn khích tướng phù hợp
    if (score === 100) {
        messageCategory = 'perfect';
    } else if (score >= 90) {
        messageCategory = 'excellent';
    } else if (score >= 80) {
        messageCategory = 'good';
    } else if (score >= 60) {
        messageCategory = 'average';
    } else {
        messageCategory = 'needsImprovement';
    }
    
    // Chọn ngẫu nhiên một câu khích tướng
    const messages = motivationalMessages[messageCategory];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Tạo thông báo chi tiết
    let detailedMessage = '';
    if (score === 100) {
        detailedMessage = `
            <div class="motivation-header perfect">
                <h2>${randomMessage}</h2>
                <p>🎊 Chúc mừng! Bạn đã hoàn thành xuất sắc bài thi!</p>
            </div>
        `;
    } else if (score >= 90) {
        detailedMessage = `
            <div class="motivation-header excellent">
                <h2>${randomMessage}</h2>
                <p>🎯 Chỉ cần ${100 - score}% nữa là hoàn hảo! Hãy thử lại!</p>
            </div>
        `;
    } else if (score >= 80) {
        detailedMessage = `
            <div class="motivation-header good">
                <h2>${randomMessage}</h2>
                <p>📈 Kết quả tốt! Hãy cố gắng thêm để đạt điểm cao hơn!</p>
            </div>
        `;
    } else if (score >= 60) {
        detailedMessage = `
            <div class="motivation-header average">
                <h2>${randomMessage}</h2>
                <p>📚 Cần cố gắng thêm! Mỗi lần làm bài là cơ hội học hỏi!</p>
            </div>
        `;
    } else {
        detailedMessage = `
            <div class="motivation-header needs-improvement">
                <h2>${randomMessage}</h2>
                <p>💪 Đừng nản! Hãy thử lại và học hỏi từ những sai lầm!</p>
            </div>
        `;
    }
    
    // Thêm gợi ý cải thiện
    const encouragementMessages = motivationalMessages.encouragement;
    const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    
    detailedMessage += `
        <div class="encouragement-tip">
            <p>💡 <strong>Gợi ý cải thiện:</strong> ${randomEncouragement}</p>
        </div>
    `;
    
    // Thêm nút thử lại với khích tướng
    const comebackMessages = motivationalMessages.comeback;
    const randomComeback = comebackMessages[Math.floor(Math.random() * comebackMessages.length)];
    
    detailedMessage += `
        <div class="comeback-section">
            <p>${randomComeback}</p>
            <button id="retry-quiz" class="btn btn-primary">🔄 Thử lại ngay!</button>
        </div>
    `;
    
    motivationContainer.innerHTML = detailedMessage;
    
    // Thêm event listener cho nút thử lại
    setTimeout(() => {
        const retryButton = document.getElementById('retry-quiz');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                showScreen('selection-screen');
            });
        }
    }, 100);
}

function displayQuestionReview() {
    const reviewContainer = document.getElementById('question-review');
    reviewContainer.innerHTML = '';
    
    currentQuiz.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.style.cssText = `
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid ${isCorrect ? '#28a745' : '#dc3545'};
            background: ${isCorrect ? '#f8fff9' : '#fff8f8'};
        `;
        
        reviewItem.innerHTML = `
            <h4>Câu ${index + 1}: ${isCorrect ? '✅' : '❌'}</h4>
            <p><strong>Câu hỏi:</strong> ${question.question}</p>
            <p><strong>Đáp án của bạn:</strong> ${userAnswer || 'Chưa trả lời'} ${userAnswer ? `(${question.options[userAnswer]})` : ''}</p>
            <p><strong>Đáp án đúng:</strong> ${question.correct} (${question.options[question.correct]})</p>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

function showScreen(screenId) {
    // Ẩn tất cả màn hình
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Hiển thị màn hình được chọn
    document.getElementById(screenId).classList.add('active');
}

function newQuiz() {
    showScreen('selection-screen');
}

function backToSelection() {
    showScreen('selection-screen');
}
