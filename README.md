# 해결해야할 과제

1. authorization 기능 만들기

- logInMixin 기능 구현. 전체DB를 UserDB에 1:N으로 엮어 계정당 DB할당하도록 설정
- `input[type=text]:focus`로 붉은 border뺀 것 적용 고려

1. html에 사용한 js가 signIn화면 때 로드되어, 정작 signIn후엔 적용되지 않는 문제

- 일단은 signIn-전환 후 화면을 refresh하는 것으로 해결
- mui의 cssBaseLine컴포넌트가 body태그의 css를 오버라이딩 한게 문제였음. 이를 제거하니 css문제는 사라짐
- 브라우저 앞뒤로 이동 시, 여전히 같은 증상 발생
- importScript.js로 javascript문제도 잡았으나, sidebar의 scroll Lock기능이 먹지 않음
- 로딩과정에서 높이값을 측정하는 부분에 오류가 생겨, 강제로 style을 못 먹이는 듯
- 직접 scroll Lock을 구현하거나, 높이값을 띄울 다른 방법을 찾아야 함

1. get it touch 문구 수정

1. SearchNnew파트의 디자인 수정

1. 한글폰트를 네이버 폰트에서 구해볼 것

1. scrollup기능이 화면이 작아지면 먹지않는 문제 보완

<!-- 1. Artvee서버가 복구되지 않으면, DirectorList의 그림 받아오는 과정 수정 필요 -->
