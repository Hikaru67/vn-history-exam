#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json
import os

def extract_questions_from_markdown(file_path):
    """Trích xuất câu hỏi từ file markdown"""
    questions = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"⚠️  Không tìm thấy file: {file_path}")
        return questions
    
    # Tìm tất cả câu hỏi theo pattern
    pattern = r'\*\*Câu (\d+):\*\* (.+?)\nA\. (.+?)\nB\. (.+?)\nC\. (.+?)\nD\. (.+?)\n\n\*\*Đáp án:\*\* (.+?)\n'
    matches = re.findall(pattern, content, re.DOTALL)
    
    for match in matches:
        question_num, question_text, option_a, option_b, option_c, option_d, correct_answer = match
        
        # Làm sạch text
        question_text = question_text.strip()
        option_a = option_a.strip()
        option_b = option_b.strip()
        option_c = option_c.strip()
        option_d = option_d.strip()
        correct_answer = correct_answer.strip()
        
        questions.append({
            'id': int(question_num),
            'question': question_text,
            'options': {
                'A': option_a,
                'B': option_b,
                'C': option_c,
                'D': option_d
            },
            'correct': correct_answer
        })
    
    return questions

def create_json_files():
    """Tạo các file JSON từ dữ liệu markdown"""
    
    # Trích xuất câu hỏi từ các file
    part1_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_1.md')
    part2_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_2.md')
    part3_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_3.md')
    part4_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_4.md')
    part5_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_5.md')
    part6_questions = extract_questions_from_markdown('cau_hoi_trac_nghiem_phan_6.md')
    
    # Tổ chức lại thành 3 phần chính theo file tổng hợp
    # Phần 1: Cách mạng Tháng 8 và Quốc khánh 2/9 (70 câu) - từ part1 + part2
    # Phần 2: Cuộc đời Chủ tịch Hồ Chí Minh (80 câu) - từ part3 + part4  
    # Phần 3: Thành tựu 80 năm và giai đoạn 1945-1969 (50 câu) - từ part5 + part6
    
    part1_combined = part1_questions + part2_questions
    part2_combined = part3_questions + part4_questions
    part3_combined = part5_questions + part6_questions
    
    # Tạo cấu trúc JSON
    json_data = {
        "metadata": {
            "title": "Trắc Nghiệm Lịch Sử",
            "description": "Kỷ niệm 80 năm Cách mạng Tháng 8 thành công và Quốc khánh 2/9 (1945 - 2025)",
            "total_questions": len(part1_combined) + len(part2_combined) + len(part3_combined),
            "created_date": "2025-01-27",
            "version": "1.0"
        },
        "parts": {
            "part1": {
                "title": "Cách mạng Tháng 8 và Quốc khánh 2/9",
                "description": "70 câu hỏi về bối cảnh, diễn biến và ý nghĩa của Cách mạng Tháng 8",
                "question_count": len(part1_combined),
                "questions": part1_combined
            },
            "part2": {
                "title": "Cuộc đời Chủ tịch Hồ Chí Minh",
                "description": "80 câu hỏi về các giai đoạn cuộc đời của Bác Hồ",
                "question_count": len(part2_combined),
                "questions": part2_combined
            },
            "part3": {
                "title": "Thành tựu 80 năm và giai đoạn 1945-1969",
                "description": "80 câu hỏi về thành tựu xây dựng và bảo vệ đất nước",
                "question_count": len(part3_combined),
                "questions": part3_combined
            }
        }
    }
    
    # Ghi file JSON chính
    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    
    # Ghi các file JSON riêng biệt cho từng phần
    with open('part1_questions.json', 'w', encoding='utf-8') as f:
        json.dump({
            "title": "Cách mạng Tháng 8 và Quốc khánh 2/9",
            "questions": part1_combined
        }, f, ensure_ascii=False, indent=2)
    
    with open('part2_questions.json', 'w', encoding='utf-8') as f:
        json.dump({
            "title": "Cuộc đời Chủ tịch Hồ Chí Minh",
            "questions": part2_combined
        }, f, ensure_ascii=False, indent=2)
    
    with open('part3_questions.json', 'w', encoding='utf-8') as f:
        json.dump({
            "title": "Thành tựu 80 năm và giai đoạn 1945-1969",
            "questions": part3_combined
        }, f, ensure_ascii=False, indent=2)
    
    print("✅ Đã tạo các file JSON thành công!")
    print(f"📊 Thống kê:")
    print(f"   - Phần 1: {len(part1_combined)} câu")
    print(f"   - Phần 2: {len(part2_combined)} câu")
    print(f"   - Phần 3: {len(part3_combined)} câu")
    print(f"   📈 Tổng cộng: {len(part1_combined) + len(part2_combined) + len(part3_combined)} câu")
    print(f"📁 Files đã tạo:")
    print(f"   - questions.json (tất cả câu hỏi)")
    print(f"   - part1_questions.json")
    print(f"   - part2_questions.json")
    print(f"   - part3_questions.json")

if __name__ == "__main__":
    try:
        create_json_files()
    except Exception as e:
        print(f"❌ Lỗi: {e}")
