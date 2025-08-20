#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os

def check_json_files():
    """Kiểm tra tính hợp lệ của các file JSON"""
    
    json_files = [
        'questions.json',
        'part1_questions.json',
        'part2_questions.json',
        'part3_questions.json'
    ]
    
    print("🔍 Kiểm tra các file JSON...")
    print("=" * 50)
    
    for filename in json_files:
        if os.path.exists(filename):
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                print(f"✅ {filename}: Hợp lệ")
                
                # Kiểm tra cấu trúc dữ liệu
                if filename == 'questions.json':
                    if 'metadata' in data and 'parts' in data:
                        print(f"   📊 Metadata: {data['metadata']['title']}")
                        print(f"   📈 Tổng câu hỏi: {data['metadata']['total_questions']}")
                        for part_name, part_data in data['parts'].items():
                            print(f"   📚 {part_name}: {part_data['question_count']} câu")
                    else:
                        print(f"   ⚠️  Cấu trúc không đúng chuẩn")
                else:
                    if 'questions' in data:
                        print(f"   📚 Số câu hỏi: {len(data['questions'])}")
                    else:
                        print(f"   ⚠️  Thiếu trường 'questions'")
                
            except json.JSONDecodeError as e:
                print(f"❌ {filename}: Lỗi JSON - {e}")
            except Exception as e:
                print(f"❌ {filename}: Lỗi - {e}")
        else:
            print(f"❌ {filename}: Không tồn tại")
        
        print()
    
    # Kiểm tra cấu trúc câu hỏi
    print("🔍 Kiểm tra cấu trúc câu hỏi...")
    print("=" * 50)
    
    try:
        with open('questions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        sample_question = data['parts']['part1']['questions'][0]
        required_fields = ['id', 'question', 'options', 'correct']
        
        for field in required_fields:
            if field in sample_question:
                print(f"✅ Trường '{field}': Có")
            else:
                print(f"❌ Trường '{field}': Thiếu")
        
        # Kiểm tra options
        if 'options' in sample_question:
            options = sample_question['options']
            required_options = ['A', 'B', 'C', 'D']
            for opt in required_options:
                if opt in options:
                    print(f"✅ Option '{opt}': Có")
                else:
                    print(f"❌ Option '{opt}': Thiếu")
        
        print(f"\n📝 Mẫu câu hỏi:")
        print(f"   ID: {sample_question['id']}")
        print(f"   Câu hỏi: {sample_question['question'][:50]}...")
        print(f"   Đáp án đúng: {sample_question['correct']}")
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra cấu trúc: {e}")

if __name__ == "__main__":
    check_json_files()
