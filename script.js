// Biến toàn cục
let questionData = {};
let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let timeLeft = 1200; // 20 phút
let timerInterval;
let selectedParts = [];

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
    // Tạo bài thi ngẫu nhiên
    currentQuiz = generateRandomQuiz();
    currentQuestionIndex = 0;
    userAnswers = {};
    timeLeft = 1200; // 20 phút
    
    console.log("Generated quiz with", currentQuiz.length, "questions");
    
    // Chuyển màn hình
    showScreen('quiz-screen');
    
    // Bắt đầu timer
    startTimer();
    
    // Hiển thị câu hỏi đầu tiên
    displayQuestion();
}

function generateRandomQuiz() {
    let allQuestions = [];
    
    // Lấy câu hỏi từ các phần đã chọn
    selectedParts.forEach(part => {
        if (questionData[part]) {
            allQuestions = allQuestions.concat(questionData[part]);
        }
    });
    
    // Trộn ngẫu nhiên và lấy 20 câu
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 20);
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
    const option = event.currentTarget;
    const selectedOption = option.getAttribute('data-option');
    
    // Kiểm tra nếu đã chọn rồi thì không cho chọn lại
    if (userAnswers[currentQuestionIndex]) {
        return;
    }
    
    // Xóa selection cũ
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Thêm selection mới
    option.classList.add('selected');
    
    // Lưu câu trả lời
    userAnswers[currentQuestionIndex] = selectedOption;
    
    // Hiển thị kết quả ngay lập tức
    showQuestionResult(selectedOption);
    
    // Tự động chuyển câu tiếp theo sau 2 giây
    setTimeout(() => {
        if (currentQuestionIndex < currentQuiz.length - 1) {
            nextQuestion();
        }
    }, 2000);
}

function showQuestionResult(selectedOption) {
    const question = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedOption === question.correct;
    
    // Hiển thị kết quả cho từng option
    document.querySelectorAll('.option').forEach(opt => {
        const optionValue = opt.getAttribute('data-option');
        
        if (optionValue === question.correct) {
            // Đáp án đúng - màu xanh
            opt.classList.add('correct');
        } else if (optionValue === selectedOption && !isCorrect) {
            // Đáp án sai của user - màu đỏ
            opt.classList.add('incorrect');
        }
    });
    
    // Hiển thị thông báo kết quả
    showResultMessage(isCorrect, question);
}

function showResultMessage(isCorrect, question) {
    // Tạo hoặc cập nhật thông báo kết quả
    let resultMessage = document.getElementById('result-message');
    if (!resultMessage) {
        resultMessage = document.createElement('div');
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
        document.body.appendChild(resultMessage);
    }
    
    if (isCorrect) {
        resultMessage.textContent = '✅ Đúng!';
        resultMessage.style.backgroundColor = '#28a745';
    } else {
        resultMessage.textContent = `❌ Sai! Đáp án đúng: ${question.correct}`;
        resultMessage.style.backgroundColor = '#dc3545';
    }
    
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
    
    if (currentQuestionIndex === currentQuiz.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    showResults();
}

function showResults() {
    const totalQuestions = currentQuiz.length;
    const answeredQuestions = Object.keys(userAnswers).length;
    let correctAnswers = 0;
    
    // Tính số câu trả lời đúng
    currentQuiz.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Hiển thị kết quả
    document.getElementById('score-percentage').textContent = percentage + '%';
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('total-answered').textContent = totalQuestions;
    
    // Hiển thị chi tiết bài làm
    displayQuestionReview();
    
    // Chuyển màn hình
    showScreen('result-screen');
}

function displayQuestionReview() {
    const reviewContainer = document.getElementById('question-review');
    reviewContainer.innerHTML = '';
    
    currentQuiz.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <strong>Câu ${index + 1}:</strong> ${question.question}
            </div>
            <div class="review-answer">
                <strong>Bạn chọn:</strong> ${userAnswer ? question.options[userAnswer] : 'Chưa trả lời'}
            </div>
            <div class="review-answer">
                <strong>Đáp án đúng:</strong> ${question.options[question.correct]}
            </div>
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
    // Reset về màn hình chọn
    showScreen('selection-screen');
    
    // Reset các checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    updateStartButton();
}

function backToSelection() {
    showScreen('selection-screen');
}
