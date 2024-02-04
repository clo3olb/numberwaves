import os
import pandas as pd
from tqdm import tqdm


def compileAllCSV():

    dir = 'data/infraday/'
    tickers = []
    for ticker in os.listdir(dir):
        if os.path.isdir(os.path.join(dir, ticker)):
            tickers.append(ticker)

    # 전체 반복 횟수 설정
    total_iterations = len(tickers)

    # 프로그레스 바 생성
    progress_bar = tqdm(total=total_iterations,
                        bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt}')

    # 반복 작업 수행
    for ticker in tickers:
        compileCSV(ticker)
        progress_bar.update(1)

    # 작업 완료 후 프로그레스 바 닫기
    progress_bar.close()


def compileCSV(ticker: str):
    # 특정 디렉토리 경로 설정
    base_dir = 'data/infraday/'

    dir = base_dir + ticker

    file_list = []
    for file in os.listdir(dir):
        if os.path.isfile(os.path.join(dir, file)):
            file_list.append(file)

    # 합칠 CSV 파일들의 경로 리스트 설정
    file_list = [
        'data/infraday/A/A_2023_10.csv',
        'data/infraday/A/A_2023_11.csv',
        'data/infraday/A/A_2023_12.csv',
        'data/infraday/A/A_2024_1.csv',
    ]

    # 빈 데이터 프레임 생성
    combined = pd.DataFrame()

    # CSV 파일들을 순회하며 데이터 합치기
    for file in file_list:
        current_df = pd.read_csv(file)
        combined = pd.concat([combined, current_df], ignore_index=True)

    combined = combined.drop_duplicates(subset='timestamp')

    combined = combined.fillna(method='ffill')
    combined.to_csv("data/combined/" + ticker + '.csv', index=False)

    # print(combined.shape)


compileAllCSV()
# compileCSV("A")
