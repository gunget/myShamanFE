# 해결해야할 과제

1. authorization 기능 만들기

- logout기능 구현: jwt 적용후, Home의 우상단 username부분 수정 필요
- jwt 적용
- 전체DB를 UserDB에 1:N으로 엮어 계정당 DB할당하도록 설정
- `input[type=text]:focus`로 붉은 border뺀 것 적용 고려

1. html에 사용한 js가 signIn화면 때 로드되어, 정작 signIn후엔 적용되지 않는 문제

- 일단은 signIn-전환 후 화면을 refresh하는 것으로 해결
- 최초 화면이 두번 로드되어 데이터 낭비 발생. 다른 방법 고려 필요.
- js파일들을 다시 띄울 순 있었으나 변화없음
- Home component로 전환되어도 main.css가 기 로드된 엘러먼트(ex body)엔 적용되지 않는 문제가 핵심인듯
- body부분에 적용되는 css만 별도로 분리해, signin 단계에서 적용하는 것 검토!!!!

1. get it touch 문구 수정

1. SearchNnew파트의 디자인 수정

1. 한글폰트를 네이버 폰트에서 구해볼 것

1. scrollup기능이 화면이 작아지면 먹지않는 문제 보완

<!-- 1. Artvee서버가 복구되지 않으면, DirectorList의 그림 받아오는 과정 수정 필요 -->
