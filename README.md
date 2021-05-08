# 해결해야할 과제

1. 배포하기

- 리액트 빌드해서 장고의 프론트로 만들기

<!-- 1. authorization 기능 만들기

- `input[type=text]:focus`로 붉은 border뺀 것 적용 고려 -->

1. html에 사용한 js가 signIn화면 때 로드되어, 정작 signIn후엔 적용되지 않는 문제

- 일단은 signIn-전환 후 화면을 refresh하는 것으로 해결
- mui의 cssBaseLine컴포넌트가 body태그의 css를 오버라이딩 한게 문제였음. 이를 제거하니 css문제는 사라짐
- 브라우저 앞뒤로 이동 시, 여전히 같은 증상 발생
- importScript.js로 javascript문제도 잡았으나, sidebar의 scroll Lock기능이 먹지 않음
- 로딩과정에서 높이값을 측정하는 부분에 오류가 생겨, 강제로 style을 못 먹이는 듯
- 직접 scroll Lock을 구현하거나, 높이값을 띄울 다른 방법을 찾아야 함. 템플릿 자바스크립트 변경 불가능 상태.

<!-- 1. get it touch 문구 수정 -->

<!-- 1. list의 loading 글자를 이미지 나오게 수정 -->

1. director코드가 검색이 안될 때, 직접 입력하게 하는 모달창 개발

<!-- 1. sign in시 배경 그림이 흐려졌다 나타나는 효과 적용

- sign in 상단에 myshaman logo 삽입. 무료 로고 서칭 필요 -->

1. SearchNnew파트의 디자인 수정

<!-- 1. 한글폰트 수정 -->

<!-- 1. scrollup기능이 화면이 작아지면 먹지않는 문제 보완 -> react-scroll-up-button삭제. floating Text로 보완 -->

<!-- 1. Artvee서버가 복구되지 않으면, DirectorList의 그림 받아오는 과정 수정 필요

- 외부서버에 의존하는 방식은 서비스를 불안정하게 만듦
- 궁극적으로 파일을 선택해야 하는 문제 존재
- 보안상 input태그로 선택 시 특정폴더 선택불가능. 파일을 받아와 저장한다 해도 사용자가 어디있는지 알 수 없음.
- 보다 근본적으로 앱의 기능상 이미지가 갖는 역할이 미미함. 데코레이션 역할 일 뿐, 아이템의 차별성을 나타내진 않음. 사족.
- 결론적으로, static img를 활용하는 것이 깔끔 -->
