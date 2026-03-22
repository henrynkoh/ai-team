# 티스토리 — DebateHeat 포스트 초안

**카테고리:** 개발 / IT / AI  
**태그:** DebateHeat, 멀티에이전트, Next.js, Plotly, 히트맵

---

## 제목 후보

- [개발] DebateHeat — AI 토론 결과를 히트맵으로 아침 브리프  
- 멀티 에이전트 토론, 로그 말고 “한 페이지”로 보기  

---

## 본문

### 왜 만들었나

LLM 여러 명이 한 주제로 말하면 **출력량이 폭발**합니다. 스크롤만 하다 끝나기 쉽습니다. DebateHeat는 그날의 토론을 **날짜별 JSON 하나**로 받아서, 웹에서 **히트맵·순위·그룹별 의견**으로 보여줍니다.

### 스택

- **Next.js** (App Router)  
- **Plotly** (히트맵, 레이더)  
- 데이터는 `data/sessions/YYYY-MM-DD.json`  

### 핵심 화면

1. 토픽 + 메타  
2. Top 아이디어  
3. 전일 대비 (있을 때)  
4. 히트맵 A/B/C  
5. 레이더  
6. 그룹 관점 하이라이트  

### 시작 방법 (초간단)

```text
git clone ...
npm install
npm run dev
```

브라우저에서 `localhost:3000` → 최신 브리프로 이동.

Python만 있으면 `scripts/generate_brief.py`로 **목 데이터**도 뽑을 수 있음.

### 링크

- 문서: 저장소의 `docs/QUICKSTART.md`  
- 데모/배포: YOUR_LINK  

---

### 티스토리용 팁

- 썸네일: 히트맵 A 캡처  
- 인용구 모듈에 “한 줄 요약: 하루 한 JSON, 아침 한 페이지” 넣으면 가독성 좋음  
