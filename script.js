// =====================================================
// 끝말잇기 AI
// =====================================================

const START_LETTERS = [
    "기", "시", "이", "비", "미",
    "아", "가", "다", "바", "마",
    "사", "수", "구", "두", "주",
    "지", "자", "보", "부", "모",
    "무", "소", "고", "도", "우",
    "오", "의", "하", "차", "호"
];

const MAX_LIVES = 2;
const TIME_LIMIT = 20;


// =====================================================
// 공격 글자
// =====================================================

const ATTACK_LEVELS = {

    2: `
갊 갋 갵 걋 걔 걹 걿 겎 겥 겪 겯 곕 곩 곯 곷 곻 괏 괫 굇 굥 굷 굻
궨 궬 궵 궹 귇 귊 귑 귕 귛 귺 긃 긇 긏 긓 긜 긧 긱 긿 깇 깋 깢 깥
깧 깪 꺍 껗 껚 껜 껠 껧 껨 껫 꼐 꼲 꼳 꼻 꽇 꽨 꾑 꾕 꾿 꿁 꿂 꿓
꿘 꿴 뀅 뀐 뀔 뀜 뀡 끆 끕 끚 끟 낅 낋 낍 낝 낧 낳 낵 냏 냬 넁
넑 넞 넢 넣 넴 넾 넿 녁 녇 녑 녙 녚 녛 녠 녾 놉 놔 놜 뇅 뇍 뇔 뇜
뇟 뇦 뇧 눍 눓 눛 눟 뉑 뉗 뉙 뉜 뉨 뉩 늗 늛 늟 늫 닑 닓 닞 닣 닯
닺 닾 댇 댑 덖 덚 덛 덞 덭 뎊 뎔 뎝 뎡 뎬 돚 돝 돟 돤 됀 됏 됑 됟
됭 둏 둗 둙 둛 둡 둪 뒐 뒙 뒵 듦 듧 듨 듭 듵 듸 딍 딤 딭 딮 딯 딲
딹 딻 딿 땁 땋 땎 땐 땧 땨 땱 떯 떱 뗌 뗳 똔 똧 뙌 뙷 뚥 뚧 뛴 뛻
뛿 뜃 뜳 뜷 띙 띧 띻 랏 랠 랫 룀 룻 륄 릿 맙 맟 맡 맪 맽 멁 멖 멨
몀 몔 몟 몡 몱 뫃 뫠 묄 묌 묑 뭀 뭃 뭄 뭅 뭊 뭘 뭣 뭥 뭬 뮉 뮊 뮝
믁 믉 믓 믭 믯 밁 및 밞 밟 밫 뱆 뱈 뱉 뱝 뱟 뱡 벟 벢 벰 벱 볽 볿
봌 봏 봐 뵊 뵐 뵘 뵙 뵛 뵝 뵤 붋 붏 붑 붚 붛 붜 붸 뷋 븓 븕 븗 븟
븥 븨 빋 빕 빟 빢 빩 빯 빱 빶 빹 빻 뺍 뺏 뺒 뺠 뺴 뻭 뻴 뻼 뼉 뼐
뼙 뼷 뽛 뾥 뾩 뿐 뿓 뿟 뿥 쀄 삙 삠 삡 삣 삧 삫 삮 삶 삷 샀 샃 샇
샒 샙 섧 섨 섰 섴 섺 셟 셤 셥 셱 솗 솘 솬 솽 쇗 쇙 쇤 숀 숍 숧 숴
숼 쉃 쉔 쉘 쉠 쉡 슘 슯 슺 슻 싄 싞 싳 싶 쌂 쌓 쌞 쌯 쌱 쌸 썅 썌
썪 썻 쎌 쎔 쎤 쎼 쏏 쏟 쏫 쏱 쏳 쏵 쐑 쐠 쐭 쐰 쑇 쑈 쑝 쑦 쑵 쒝
쒬 쓍 쓔 쓷 씃 씌 씪 씱 씿 앃 않 앎 앒 앓 앛 얅 얏 얓 얜 얠 얫 얲
얻 얾 얿 엏 엪 엱 엲 엵 엸 옂 옅 옇 옙 옢 옫 옳 왐 왦 욂 욷 웂 웲
윁 윎 윱 윹 읃 읊 읋 읎 읠 읻 읾 잃 있 잋 잙 잩 잪 잫 쟨 젂 젉 젚
젛 젞 젲 젿 졎 졥 좋 좻 좽 죌 죕 죵 줏 줒 줗 줘 줵 쥅 쥇 쥑 쥡 쥥
즁 즉 짇 짊 짏 짖 짛 짥 쨉 쨋 쨎 쨔 쩎 쩧 쩰 쩻 쩿 쪄 쪾 쫏 쫒
쫗 쬘 쬥 쬧 쬭 쭙 쮜 쯕 쯘 쯜 쯤 쯥 쯩 쯪 찕 찣 찦 찧 챕 챠 챡 챤
쳄 쳘 쵝 쵹 춋 춍 춥 춰 췡 췩 췹 췽 츅 츨 칮 캰 켜 켯 켱 켸 쾡 쿱
퀫 퀭 큘 킈 탓 턻 텊 텹 톧 톺 퇘 퇭 퇵 툉 툐 튓 튕 튝 튤 튿 틉 틔
팃 팎 팹 퍁 퍄 펵 퐃 퓐 퓡 퓰 픠 핟 핧 핱 햍 햑 햬 헏 헓 헕 헗 헟
헡 혬 혿 홅 홠 홡 횔 횥 횩 훋 훛 훝 훠 훵 휀 휏 흄 흗 흝 흟 흣 흨
흭 흴 힁 힗 힛 힡
`.trim().split(/\s+/),

    4: `
갚 걍 겍 겝 겟 겻 곪 괠 괸 괼 굄 굊 굶 궈 궉 귄 깉 깸 꾄 꿸 끎
낌 낏 낡 녈 눋 눕 늣 닢 닦 닳 돠 됩 둬 둼 뒨 듯 듼 딛 땇 떤 떴
똬 뙈 띔 럭 렐 롯 릭 몪 몯 묠 뮐 뮨 뮬 믜 밠 벜 벸 벹 볔 봅 봍
붴 뷕 뾔 쁘 삵 샵 솅 솓 쇨 쇰 쇽 숱 슭 싣 쌘 썍 쎈 쎙 쎠 쏩 쐣
쓋 씅 앰 엷 옐 왯 욋 웻 윔 윰 읫 잽 젇 젊 좡 좩 쥠 쥰 쩐 쫓 릇
쳥 촏 촹 쵯 췻 콛 쾟 킵 탸 텨 텽 툰 틃 틍 틧 팁 퍙 펨 펼 핌 휩
눕
`.trim().split(/\s+/),

    6: `
값 곗 괃 괌 괵 궷 깕 껏 꼉 꿔 낛 낶 넹 뇡 눚 눼 닁 닝 뎜 랄 랙
몃 묀 묻 뱜 볘 뵌 뻠 뻰 뼁 뽂 뽄 뿕 섕 셕 솃 솎 숏 쉿 슛 슝 쌰
쒯 쒸 젝 젭 좇 좨 쫌 쬔 쬬 챵 촨 츄 츼 캣 콥 쿳 퀼 큇 탬 텟 톳
퉷 팻 펙 핥 훍 훑
`.trim().split(/\s+/),

    8: `
갹 굠 궂 껕 껭 껴 꽤 끍 끓 녯 놓 뇽 눔 눗 뉫 닿 댁 뎀 됙 뒛 뒝 뒬
뒴 뒹 듣 딘 뗀 똣 뛔 띳 롬 륭 를 몌 뫽 묍 뭐 믌 밈 밉 볍 붝 뷜 븍
빰 뻿 셦 쉉 쉽 슳 슷 쌧 썹 쐿 쑴 쓿 씷 앚 앳 없 엣 엦 왠 욀 욤 욥
욹 웁 웍 윕 읽 잊 잗 졀 졌 졍 좃 좆 좟 쥭 쥴 짙 쮀 첵 쳑 쵕 춧 츙
츰 캅 캔 켕 켠 쾻 킴 탠 탤 텬 튈 햅 횰 힉 힙
`.trim().split(/\s+/),

    10: `
궝 낀 냅 댄 뎌 둣 름 먈 멥 묫 뱔 빅 뼛 쁠 섐 션 솁 싫 얀 얇 옜 욘
욜 졉 쳇 쳐 칫 켓 톈 튱 픗 헴 헹 훙 휫 흩
`.trim().split(/\s+/),

    12: `
귈 돕 뒌 똗 룩 숩 왤 죠 츠 켈
`.trim().split(/\s+/),

    14: [
        "틱"
    ]
};


const attackLevelMap = new Map();

for (const level of Object.keys(ATTACK_LEVELS)) {
    for (const letter of ATTACK_LEVELS[level]) {
        attackLevelMap.set(
            letter,
            Number(level)
        );
    }
}


// =====================================================
// 패배 글자
// =====================================================

const LOSS_LEVELS = {

    1: `
가 강 개 갯 거 겁 게 겨 고 곡 공 과 관 괜 구 귀 그 긔 기 길 깍 꼬 끄
나 날 남 네 넵 노 눈 뉴 늘 니 다 닥 달 닭 당 대 댱 덥 데 덴 도 돌 동 되
된 두 둘 뒤 뒷 든 들 디 따 땅 때 떠 떡 뜨 라 러 로 루 리 마 말 맔 맞 머
멋 멘 모 몰 묏 무 묵 문 물 미 민 바 반 받 발 밝 밭 배 버 베 보 본 부 북
불 블 비 뻘 뼈 사 살 상 새 샐 샛 샤 서 석 섣 섬 섯 세 셋 소 속 손 솔 송
쇠 쇼 수 숨 숭 쉣 쉬 스 슫 슬 시 신 실 쌍 쎗 씨 아 안 앏 암 앞 애 야 양
얘 어 언 얼 엊 에 엔 여 옌 오 옥 온 옷 외 왼 요 우 울 움 웃 원 위 윗 유
을 읒 이 인 일 입 잘 잠 장 저 정 제 젹 조 주 중 즘 지 질 집 쩨 쪽 차 찰
채 챈 챌 처 철 첫 초 층 치 칩 카 컷 케 코 콕 콜 퀵 크 클 키 탄 탕 태 터
털 테 텩 투 트 티 판 팔 패 페 푸 풀 풋 풍 프 플 픐 피 필 하 한 할 함 해
핸 햇 허 헌 헛 헝 혓 홀 히
`.trim().split(/\s+/),

    3: `
간 갈 감 갓 갤 걀 걱 걸 것 겉 겹 계 곰 곳 광 괴 국 굴 굼 귿 글 까 깔
껍 꼰 꽃 꿰 끈 끝 난 납 내 너 넝 논 느 늿 닉 닐 님 닛 단 담 닷 댓 더
던 덩 뎨 돈 돛 됴 드 딥 딸 떨 떼 똥 띠 레 림 막 만 매 맨 먹 멀 멍 메
멧 며 목 몸 므 믈 믿 밀 밧 방 뱅 벋 벌 범 법 벗 벼 별 볏 병 봉 뵈 브
빈 빗 산 삼 샘 생 선 설 성 셰 솝 숫 쉐 슈 승 싯 싱 쌩 씹 압 엇 엉 엮
연 염 예 올 옭 옹 왕 왜 왱 워 음 자 잔 잡 잦 전 져 젼 종 줄 줴 쥐 쥬
즈 직 진 짓 째 쪼 쭈 찔 찝 참 천 첨 촌 촐 쵸 친 침 칼 커 콧 콩 큰 타
텍 텔 토 퉤 평 포 폰 합 항 헤 헬 홑 화 훳
`.trim().split(/\s+/),

    5: `
건 검 군 귓 금 깨 꺼 꼼 꿀 끌 끼 낫 낭 낱 넌 녕 놋 누 눌 늪 덧 독 둥
딜 땃 땡 뙤 뜸 란 랩 뢴 링 믄 밥 번 복 볼 봄 붉 빌 빠 빤 뽀 뽐 뿌
색 셀 술 습 쎄 악 알 약 억 엄 열 옻 웹 윈 율 으 은 작 재 좀 찌 찬 찻
체 추 충 취 칠 캘 컨 콤 퀴 킹 탈 턱 퇴 툴 팀 파 팽 퍼 펜 펭 폭 폴
품 핑 헥 혼 황 흐 흘 흙
`.trim().split(/\s+/),

    7: `
결 경 골 곱 교 권 극 근 긋 김 깜 깽 껌 께 꼴 낟 낮 냉 널 넘 넙 넨 녹
농 늑 능 닌 덤 돼 듀 뚜 롱 료 르 맘 망 맥 맷 명 묘 박 밤 백 벵 변
분 붓 빚 빵 삯 샴 샹 섹 센 셈 셉 셩 솟 솥 쇳 순 식 심 싸 싼 쌀 쓰
씸 액 엘 엠 역 엽 영 와 왁 완 욕 용 월 육 임 잰 적 절 점 젓 족 졸
좌 죗 준 증 징 짜 짝 쯔 책 총 최 출 측 캡 컴 콘 콰 쿠 쿼 퀸 큐 킷
택 톰 통 특 편 푯 픽 햐 헐 혈 힘
`.trim().split(/\s+/),

    9: `
각 갑 꾀 꾸 냄 냥 놀 놈 답 덱 델 뎍 될 등 램 량 록 류 맹 먼 멤 몬
뭇 밋 뱃 벤 뷧 삿 셍 숙 썬 쏙 쑤 쑥 쑷 쒜 씀 엥 옴 웨 의 존 죄 죈
줸 쥔 칸 킨 탑 텁 톨 튜 펠 호 후 흰
`.trim().split(/\s+/),

    11: `
겡 놰 뇌 딕 뚝 래 런 뤼 릴 멈 멜 뮤 밸 붐 삐 씰 앤 앱 앵 업 엎 엑
옵 왓 익 잼 쟈 젠 줌 캐 컬 쿨 퀀 텐 팩 팬 펑 펩 펫 퓨 핏 홈 흠
`.trim().split(/\s+/),

    13: `
렌 린 립 벨 셔 숄 왈 켐 킬 톤 핫
`.trim().split(/\s+/),

    15: [
        "폐"
    ]
};


const lossLevelMap = new Map();

for (const level of Object.keys(LOSS_LEVELS)) {
    for (const letter of LOSS_LEVELS[level]) {
        lossLevelMap.set(
            letter,
            Number(level)
        );
    }
}


// =====================================================
// 사전
// =====================================================

let dictionary = [];
let dictionarySet = new Set();
let wordsByFirstLetter = new Map();
let dictionaryLoaded = false;


// =====================================================
// words.txt 불러오기
// =====================================================

fetch("./words.txt", {
    cache: "no-store"
})
.then(response => {

    if (!response.ok) {
        throw new Error(
            "words.txt를 불러오지 못했습니다. 상태 코드: " +
            response.status
        );
    }

    return response.text();
})
.then(text => {

    dictionary = text
        .replace(/^\uFEFF/, "")
        .split(/\r?\n/)
        .map(word => word.trim())
        .filter(word => word.length > 0);

    dictionarySet = new Set(dictionary);

    wordsByFirstLetter = new Map();

    for (const word of dictionary) {

        const firstLetter = word[0];

        if (!wordsByFirstLetter.has(firstLetter)) {
            wordsByFirstLetter.set(
                firstLetter,
                []
            );
        }

        wordsByFirstLetter
            .get(firstLetter)
            .push(word);
    }

    dictionaryLoaded = true;

    console.log(
        "단어 사전 로딩 완료:",
        dictionary.length,
        "개"
    );
})
.catch(error => {

    console.error(
        "단어 사전 로딩 실패:",
        error
    );

    alert(
        "단어 사전을 불러오지 못했습니다.\n\n" +
        error.message
    );
});


// =====================================================
// 게임 상태
// =====================================================

let currentWord = "";
let usedWords = [];
let lives = MAX_LIVES;
let gameRecord = [];
let playerTurn = false;
let firstMove = true;
let timer = null;
let timeLeft = TIME_LIMIT;
let gameStarted = false;
let round = 1;


// =====================================================
// 화면 요소
// =====================================================

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const endScreen =
    document.getElementById("endScreen");

const startLetterText =
    document.getElementById("startLetter");

const requiredLetterText =
    document.getElementById("requiredLetter");

const currentWordText =
    document.getElementById("currentWord");

const livesText =
    document.getElementById("lives");

const timerText =
    document.getElementById("timer");

const turnMessage =
    document.getElementById("turnMessage");

const message =
    document.getElementById("message");

const wordInput =
    document.getElementById("wordInput");

const submitButton =
    document.getElementById("submitButton");

const history =
    document.getElementById("history");


// =====================================================
// 두음법칙
// =====================================================

function makeSyllable(
    initial,
    vowel,
    finalSound
) {

    return String.fromCharCode(
        0xAC00 +
        initial * 588 +
        vowel * 28 +
        finalSound
    );
}


function getDuumLetters(letter) {

    if (!letter) {
        return [];
    }

    const result = [letter];

    const code =
        letter.charCodeAt(0);

    if (
        code < 0xAC00 ||
        code > 0xD7A3
    ) {
        return result;
    }

    const index =
        code - 0xAC00;

    const initial =
        Math.floor(index / 588);

    const vowel =
        Math.floor(
            (index % 588) / 28
        );

    const finalSound =
        index % 28;


    // ㄴ → ㅇ
    // 녀 → 여
    // 뇨 → 요
    // 뉴 → 유
    // 니 → 이

    const nieunToIeungVowels = [
        2,   // ㅑ
        6,   // ㅕ
        7,   // ㅖ
        12,  // ㅛ
        17,  // ㅠ
        20   // ㅣ
    ];

    if (
        initial === 2 &&
        nieunToIeungVowels.includes(vowel)
    ) {

        result.push(
            makeSyllable(
                11,
                vowel,
                finalSound
            )
        );
    }


    // ㄹ → ㄴ
    // 라 → 나
    // 래 → 내
    // 러 → 너
    // 레 → 네
    // 로 → 노
    // 뢰 → 뇌
    // 루 → 누
    // 르 → 느
    // 릐 → 늬

    const rieulToNieunVowels = [
        0,   // ㅏ
        1,   // ㅐ
        4,   // ㅓ
        5,   // ㅔ
        8,   // ㅗ
        11,  // ㅚ
        13,  // ㅜ
        18,  // ㅡ
        19   // ㅢ
    ];

    if (
        initial === 5 &&
        rieulToNieunVowels.includes(vowel)
    ) {

        result.push(
            makeSyllable(
                2,
                vowel,
                finalSound
            )
        );
    }


    // ㄹ → ㅇ
    // 랴 → 야
    // 려 → 여
    // 례 → 예
    // 료 → 요
    // 류 → 유
    // 리 → 이

    const rieulToIeungVowels = [
        2,   // ㅑ
        6,   // ㅕ
        7,   // ㅖ
        12,  // ㅛ
        17,  // ㅠ
        20   // ㅣ
    ];

    if (
        initial === 5 &&
        rieulToIeungVowels.includes(vowel)
    ) {

        result.push(
            makeSyllable(
                11,
                vowel,
                finalSound
            )
        );
    }


    return [
        ...new Set(result)
    ];
}


// =====================================================
// 두음법칙 표시
// =====================================================

function formatRequiredLetter(letter) {

    const letters =
        getDuumLetters(letter);

    if (letters.length <= 1) {
        return letter;
    }

    return (
        letters[0] +
        "(" +
        letters.slice(1).join("/") +
        ")"
    );
}


function updateRequiredLetterDisplay(letter) {

    requiredLetterText.textContent =
        formatRequiredLetter(letter);
}


// =====================================================
// 단어 연결 확인
// =====================================================

function canStartWith(
    word,
    requiredLetter
) {

    if (
        !word ||
        !requiredLetter
    ) {
        return false;
    }

    return getDuumLetters(
        requiredLetter
    ).includes(
        word[0]
    );
}


// =====================================================
// 사용 가능한 단어
// =====================================================

function getAvailableWords(
    letter,
    used
) {

    const possibleLetters =
        getDuumLetters(letter);

    let result = [];

    for (
        const possibleLetter
        of possibleLetters
    ) {

        const list =
            wordsByFirstLetter.get(
                possibleLetter
            ) || [];

        result.push(
            ...list
        );
    }

    return [
        ...new Set(result)
    ].filter(
        word =>
            !used.has(word)
    );
}


// =====================================================
// 공격 단계
// =====================================================

function getAttackLevel(word) {

    if (!word) {
        return Infinity;
    }

    const last =
        word[word.length - 1];

    return (
        attackLevelMap.get(last)
        ?? Infinity
    );
}


function isAttackWord(word) {

    if (!word) {
        return false;
    }

    return attackLevelMap.has(
        word[word.length - 1]
    );
}


// =====================================================
// 패배 단계
// =====================================================

function getLossLevel(word) {

    if (!word) {
        return Infinity;
    }

    const last =
        word[word.length - 1];

    return (
        lossLevelMap.get(last)
        ?? Infinity
    );
}


// =====================================================
// 한방단어
// =====================================================

function isOneShotWord(word) {

    if (!word) {
        return false;
    }

    const last =
        word[word.length - 1];

    const nextWords =
        getAvailableWords(
            last,
            new Set([
                ...usedWords,
                word
            ])
        );

    return (
        nextWords.length === 0
    );
}


// =====================================================
// 게임 시작
// =====================================================

function startGame(mode) {

    if (!dictionaryLoaded) {

        alert(
            "단어 사전이 아직 로딩되지 않았습니다.\n잠시 후 다시 눌러주세요."
        );

        return;
    }

    if (dictionary.length === 0) {

        alert(
            "단어 사전이 비어 있습니다."
        );

        return;
    }

    currentWord = "";
    usedWords = [];
    gameRecord = [];
    lives = MAX_LIVES;
    round = 1;
    firstMove = true;
    gameStarted = true;

    const startingLetter =
        START_LETTERS[
            Math.floor(
                Math.random() *
                START_LETTERS.length
            )
        ];

    startLetterText.textContent =
        startingLetter;

    updateRequiredLetterDisplay(
        startingLetter
    );

    if (mode === "player") {

        playerTurn = true;

    } else if (mode === "bot") {

        playerTurn = false;

    } else {

        playerTurn =
            Math.random() < 0.5;
    }

    startScreen.classList.add(
        "hidden"
    );

    endScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );

    updateLives();
    updateHistory();

    currentWordText.textContent = "";
    message.textContent = "";

    if (playerTurn) {

        setPlayerTurn();

    } else {

        setBotTurn();

        setTimeout(() => {

            if (gameStarted) {
                botTurn();
            }

        }, 800);
    }
}


// =====================================================
// 플레이어 턴
// =====================================================

function setPlayerTurn() {

    playerTurn = true;

    turnMessage.textContent =
        "당신의 턴";

    submitButton.disabled =
        false;

    wordInput.disabled =
        false;

    wordInput.focus();

    startTimer();
}


// =====================================================
// 봇 턴
// =====================================================

function setBotTurn() {

    playerTurn = false;

    turnMessage.textContent =
        "봇이 생각 중...";

    submitButton.disabled =
        true;

    wordInput.disabled =
        true;

    stopTimer();
}


// =====================================================
// 필요한 글자
// =====================================================

function getRequiredLetter() {

    if (currentWord === "") {
        return startLetterText.textContent;
    }

    return (
        currentWord[
            currentWord.length - 1
        ]
    );
}


// =====================================================
// 플레이어 단어 제출
// =====================================================

function submitWord() {

    if (
        !playerTurn ||
        !gameStarted
    ) {
        return;
    }

    const word =
        wordInput.value.trim();

    wordInput.value = "";

    message.textContent = "";

    if (word.length === 0) {

        message.textContent =
            "단어를 입력해주세요.";

        return;
    }

    if (usedWords.includes(word)) {

        message.textContent =
            "이미 사용한 단어입니다.";

        return;
    }

    if (!dictionarySet.has(word)) {

        message.textContent =
            "존재하지 않는 단어입니다.";

        return;
    }

    const requiredLetter =
        getRequiredLetter();

    if (
        !canStartWith(
            word,
            requiredLetter
        )
    ) {

        message.textContent =
            "단어의 첫 글자가 맞지 않습니다.";

        return;
    }


    // 첫 턴 공격 / 한방 금지

    if (firstMove) {

        if (isOneShotWord(word)) {

            message.textContent =
                "첫 턴에는 한방 단어를 사용할 수 없습니다.";

            return;
        }

        if (isAttackWord(word)) {

            message.textContent =
                "첫 턴에는 공격 단어를 사용할 수 없습니다.";

            return;
        }
    }

    stopTimer();

    useWord(word);

    firstMove = false;

    setBotTurn();

    setTimeout(() => {

        if (gameStarted) {
            botTurn();
        }

    }, 700);
}


// =====================================================
// 단어 사용
// =====================================================

function useWord(word) {

    currentWord = word;

    usedWords.push(word);

    currentWordText.textContent =
        word;

    gameRecord.push({
        player:
            playerTurn
                ? "당신"
                : "봇",
        word: word
    });

    updateRequiredLetterDisplay(
        word[word.length - 1]
    );

    updateHistory();
}


// =====================================================
// 봇 턴
// =====================================================

function botTurn() {

    if (!gameStarted) {
        return;
    }

    const botWord =
        chooseBotWord();

    if (!botWord) {

        endGame(
            "승리!",
            "봇이 이어갈 단어를 찾지 못했습니다."
        );

        return;
    }

    useWord(botWord);

    firstMove = false;

    setPlayerTurn();
}


// =====================================================
// 봇 AI
// =====================================================

function chooseBotWord() {

    const requiredLetter =
        getRequiredLetter();

    let candidates =
        getAvailableWords(
            requiredLetter,
            new Set(usedWords)
        );

    if (candidates.length === 0) {
        return null;
    }


    // 첫 턴 공격 / 한방 금지

    if (firstMove) {

        candidates =
            candidates.filter(
                word =>
                    !isOneShotWord(word) &&
                    !isAttackWord(word)
            );

        if (candidates.length === 0) {
            return null;
        }
    }


    const analyzed =
        candidates.map(
            word => {

                const nextWords =
                    getAvailableWords(
                        word[word.length - 1],
                        new Set([
                            ...usedWords,
                            word
                        ])
                    );

                let score = 0;


                // 한방

                if (
                    nextWords.length === 0
                ) {

                    score += 100000;
                }


                // 공격

                const attackLevel =
                    getAttackLevel(word);

                if (
                    attackLevel !== Infinity
                ) {

                    score +=
                        50000 -
                        attackLevel * 2500;
                }


                // 상대 선택지 줄이기

                score +=
                    5000 -
                    nextWords.length * 20;


                // 약간의 랜덤성

                score +=
                    Math.random() * 100;


                return {
                    word,
                    score
                };
            }
        );


    analyzed.sort(
        (a, b) =>
            b.score - a.score
    );


    return analyzed[0].word;
}


// =====================================================
// 타이머
// =====================================================

function startTimer() {

    stopTimer();

    timeLeft =
        TIME_LIMIT;

    timerText.textContent =
        timeLeft;

    timer =
        setInterval(
            () => {

                timeLeft--;

                timerText.textContent =
                    timeLeft;

                if (
                    timeLeft <= 0
                ) {

                    stopTimer();

                    timeOut();
                }

            },
            1000
        );
}


// =====================================================
// 타이머 정지
// =====================================================

function stopTimer() {

    if (timer !== null) {

        clearInterval(timer);

        timer = null;
    }
}


// =====================================================
// 시간 초과
// =====================================================

function timeOut() {

    if (
        !playerTurn ||
        !gameStarted
    ) {
        return;
    }

    message.textContent =
        "시간 초과!";

    lives--;

    updateLives();

    if (lives <= 0) {

        endGame(
            "패배!",
            "목숨을 모두 잃었습니다."
        );

        return;
    }

    setTimeout(
        () => {

            if (!gameStarted) {
                return;
            }

            message.textContent =
                "목숨을 하나 잃었습니다.";

            setPlayerTurn();

        },
        700
    );
}


// =====================================================
// 라운드 끝내기
// =====================================================

function giveUpRound() {

    if (!gameStarted) {
        return;
    }

    stopTimer();

    lives--;

    updateLives();

    if (lives <= 0) {

        endGame(
            "패배!",
            "목숨을 모두 잃었습니다."
        );

        return;
    }

    round++;

    currentWord = "";
    usedWords = [];
    firstMove = true;

    const startingLetter =
        START_LETTERS[
            Math.floor(
                Math.random() *
                START_LETTERS.length
            )
        ];

    startLetterText.textContent =
        startingLetter;

    updateRequiredLetterDisplay(
        startingLetter
    );

    currentWordText.textContent =
        "";

    message.textContent =
        "라운드 " +
        round +
        " 시작!";

    updateHistory();

    setPlayerTurn();
}


// =====================================================
// 목숨 표시
// =====================================================

function updateLives() {

    livesText.textContent =
        "❤️".repeat(lives) +
        "🖤".repeat(
            MAX_LIVES - lives
        );
}


// =====================================================
// 사용한 단어 표시
// =====================================================

function updateHistory() {

    history.innerHTML = "";

    for (
        const word
        of usedWords
    ) {

        const element =
            document.createElement(
                "span"
            );

        element.className =
            "historyWord";

        element.textContent =
            word;

        history.appendChild(
            element
        );
    }
}


// =====================================================
// 게임 종료
// =====================================================

function endGame(
    title,
    text
) {

    gameStarted = false;

    stopTimer();

    gameScreen.classList.add(
        "hidden"
    );

    endScreen.classList.remove(
        "hidden"
    );

    document.getElementById(
        "resultTitle"
    ).textContent =
        title;

    document.getElementById(
        "resultMessage"
    ).textContent =
        text;
}


// =====================================================
// Enter
// =====================================================

wordInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            submitWord();
        }
    }
);


// =====================================================
// 게임 기록 보기
// =====================================================

function showGameRecord() {

    const recordBox =
        document.getElementById(
            "recordBox"
        );

    const gameRecordElement =
        document.getElementById(
            "gameRecord"
        );

    gameRecordElement.innerHTML = "";

    if (
        gameRecord.length === 0
    ) {

        gameRecordElement.textContent =
            "기록된 단어가 없습니다.";

    } else {

        gameRecord.forEach(
            (record, index) => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    record.player === "당신"
                        ? "recordPlayer"
                        : "recordBot";

                row.textContent =
                    (index + 1) +
                    ". " +
                    record.player +
                    " : " +
                    record.word;

                gameRecordElement.appendChild(
                    row
                );
            }
        );
    }

    recordBox.classList.remove(
        "hidden"
    );
}


// =====================================================
// 게임 기록 닫기
// =====================================================

function hideGameRecord() {

    const recordBox =
        document.getElementById(
            "recordBox"
        );

    recordBox.classList.add(
        "hidden"
    );
}


// =====================================================
// 사전 요소
// =====================================================

const dictionaryButton =
    document.getElementById(
        "dictionaryButton"
    );

const dictionaryScreen =
    document.getElementById(
        "dictionaryScreen"
    );

const closeDictionary =
    document.getElementById(
        "closeDictionary"
    );

const dictionarySearch =
    document.getElementById(
        "dictionarySearch"
    );

const dictionaryResult =
    document.getElementById(
        "dictionaryResult"
    );


// =====================================================
// 사전 열기
// =====================================================

dictionaryButton.addEventListener(
    "click",
    function() {

        dictionaryScreen.classList.remove(
            "hidden"
        );

        dictionarySearch.value = "";

        dictionaryResult.innerHTML = `
            <p class="dictionaryGuide">
                첫 글자를 입력하면 단어가 표시됩니다.
            </p>
        `;

        setTimeout(
            () => {
                dictionarySearch.focus();
            },
            100
        );
    }
);


// =====================================================
// 사전 닫기
// =====================================================

closeDictionary.addEventListener(
    "click",
    function() {

        dictionaryScreen.classList.add(
            "hidden"
        );
    }
);


// =====================================================
// 사전 검색
// =====================================================

dictionarySearch.addEventListener(
    "input",
    function() {

        const firstLetter =
            dictionarySearch.value.trim();

        if (!firstLetter) {

            dictionaryResult.innerHTML = `
                <p class="dictionaryGuide">
                    첫 글자를 입력하면 단어가 표시됩니다.
                </p>
            `;

            return;
        }

        showDictionaryWords(
            firstLetter
        );
    }
);


// =====================================================
// 사전용 한방단어 검사
// =====================================================

function isOneShotWordForDictionary(
    word
) {

    if (!word) {
        return false;
    }

    const lastLetter =
        word[word.length - 1];

    const possibleLetters =
        getDuumLetters(
            lastLetter
        );

    let nextWords = [];

    for (
        const possibleLetter
        of possibleLetters
    ) {

        const list =
            wordsByFirstLetter.get(
                possibleLetter
            ) || [];

        nextWords.push(
            ...list
        );
    }

    nextWords =
        [
            ...new Set(nextWords)
        ].filter(
            nextWord =>
                nextWord !== word
        );

    return (
        nextWords.length === 0
    );
}


// =====================================================
// 사전 단어 분류
// =====================================================

function classifyDictionaryWord(
    word
) {

    // 1. 한방

    if (
        isOneShotWordForDictionary(
            word
        )
    ) {

        return {
            type: "oneshot",
            level: null
        };
    }


    // 2. 공격

    const attackLevel =
        getAttackLevel(word);

    if (
        attackLevel !== Infinity
    ) {

        return {
            type: "attack",
            level: attackLevel
        };
    }


    // 3. 패배

    const lossLevel =
        getLossLevel(word);

    if (
        lossLevel !== Infinity
    ) {

        return {
            type: "loss",
            level: lossLevel
        };
    }


    // 4. 루트

    return {
        type: "root",
        level: null
    };
}


// =====================================================
// 일반 사전 섹션
// =====================================================

function createDictionarySection(
    title,
    words,
    type = "root"
) {

    const section =
        document.createElement(
            "div"
        );

    section.className =
        "dictionarySection";

    const titleElement =
        document.createElement(
            "h3"
        );

    titleElement.textContent =
        title;

    section.appendChild(
        titleElement
    );


    if (
        words.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "dictionaryEmpty";

        empty.textContent =
            "해당 단어가 없습니다.";

        section.appendChild(
            empty
        );

        return section;
    }


    const container =
        document.createElement(
            "div"
        );

    container.className =
        "dictionaryWords";


    const pagination =
        document.createElement(
            "div"
        );

    pagination.className =
        "dictionaryPagination";


    const pageSize = 30;

    let currentPage = 1;


    function renderPage() {

        container.innerHTML =
            "";

        pagination.innerHTML =
            "";


        const start =
            (currentPage - 1) *
            pageSize;

        const end =
            start + pageSize;

        const pageWords =
            words.slice(
                start,
                end
            );


        for (
            const word
            of pageWords
        ) {

            const line =
                document.createElement(
                    "div"
                );

            line.className =
                "dictionaryWordLine";


            const wordText =
                document.createElement(
                    "span"
                );

            wordText.className =
                "dictionaryWordText";

            wordText.textContent =
                word;


            line.appendChild(
                wordText
            );


            if (
                type === "oneshot"
            ) {

                const arrow =
                    document.createElement(
                        "span"
                    );

                arrow.className =
                    "dictionaryArrow up";

                arrow.textContent =
                    "⬆️";

                line.appendChild(
                    arrow
                );
            }


            container.appendChild(
                line
            );
        }


        const totalPages =
            Math.ceil(
                words.length /
                pageSize
            );


        if (
            totalPages <= 1
        ) {
            return;
        }


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                page;

            button.className =
                "dictionaryPageButton";


            if (
                page === currentPage
            ) {

                button.classList.add(
                    "active"
                );
            }


            button.addEventListener(
                "click",
                function() {

                    currentPage =
                        page;

                    renderPage();
                }
            );


            pagination.appendChild(
                button
            );
        }
    }


    section.appendChild(
        container
    );

    section.appendChild(
        pagination
    );

    renderPage();

    return section;
}


// =====================================================
// 공격 / 패배 섹션
// =====================================================

function createLevelDictionarySection(
    title,
    levelMap,
    levels,
    label,
    type
) {

    const section =
        document.createElement(
            "div"
        );

    section.className =
        "dictionarySection";


    const titleElement =
        document.createElement(
            "h3"
        );

    titleElement.textContent =
        title;

    section.appendChild(
        titleElement
    );


    let hasWords = false;


    for (
        const level
        of levels
    ) {

        const words =
            levelMap.get(level) || [];


        if (
            words.length === 0
        ) {
            continue;
        }


        hasWords = true;


        const levelTitle =
            document.createElement(
                "div"
            );

        levelTitle.className =
            "dictionaryLevelTitle";

        levelTitle.textContent =
            `-${level}수 이내 ${label}-`;

        section.appendChild(
            levelTitle
        );


        const container =
            document.createElement(
                "div"
            );

        container.className =
            "dictionaryWords";


        const pagination =
            document.createElement(
                "div"
            );

        pagination.className =
            "dictionaryPagination";


        const pageSize = 30;

        let currentPage = 1;


        function renderPage() {

            container.innerHTML =
                "";

            pagination.innerHTML =
                "";


            const start =
                (currentPage - 1) *
                pageSize;

            const end =
                start + pageSize;

            const pageWords =
                words.slice(
                    start,
                    end
                );


            for (
                const word
                of pageWords
            ) {

                const line =
                    document.createElement(
                        "div"
                    );

                line.className =
                    "dictionaryWordLine";


                const wordText =
                    document.createElement(
                        "span"
                    );

                wordText.className =
                    "dictionaryWordText";

                wordText.textContent =
                    word;


                line.appendChild(
                    wordText
                );


                const arrow =
                    document.createElement(
                        "span"
                    );


                if (
                    type === "attack"
                ) {

                    arrow.className =
                        "dictionaryArrow up";

                    arrow.textContent =
                        "⬆️";

                } else {

                    arrow.className =
                        "dictionaryArrow down";

                    arrow.textContent =
                        "⬇️";
                }


                line.appendChild(
                    arrow
                );


                container.appendChild(
                    line
                );
            }


            const totalPages =
                Math.ceil(
                    words.length /
                    pageSize
                );


            if (
                totalPages <= 1
            ) {
                return;
            }


            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.textContent =
                    page;

                button.className =
                    "dictionaryPageButton";


                if (
                    page === currentPage
                ) {

                    button.classList.add(
                        "active"
                    );
                }


                button.addEventListener(
                    "click",
                    function() {

                        currentPage =
                            page;

                        renderPage();
                    }
                );


                pagination.appendChild(
                    button
                );
            }
        }


        section.appendChild(
            container
        );

        section.appendChild(
            pagination
        );


        renderPage();
    }


    if (!hasWords) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "dictionaryEmpty";

        empty.textContent =
            "해당 단어가 없습니다.";

        section.appendChild(
            empty
        );
    }


    return section;
}


// =====================================================
// 사전 검색 결과
// =====================================================

function showDictionaryWords(
    firstLetter
) {

    firstLetter =
        firstLetter[0];


    const possibleLetters =
        getDuumLetters(
            firstLetter
        );


    let words = [];


    // 두음법칙 적용

    for (
        const letter
        of possibleLetters
    ) {

        const list =
            wordsByFirstLetter.get(
                letter
            ) || [];

        words.push(
            ...list
        );
    }


    words = [
        ...new Set(words)
    ];


    // 긴 단어부터

    words.sort(
        (a, b) => {

            if (
                b.length !== a.length
            ) {

                return (
                    b.length -
                    a.length
                );
            }

            return a.localeCompare(b);
        }
    );


    if (
        words.length === 0
    ) {

        dictionaryResult.innerHTML = `
            <p class="dictionaryEmpty">
                해당 글자로 시작하는 단어가 없습니다.
            </p>
        `;

        return;
    }


    // =================================================
    // 분류
    // =================================================

    const oneShotWords = [];

    const attackMap =
        new Map();

    const lossMap =
        new Map();

    const rootWords = [];


    for (
        const word
        of words
    ) {

        const result =
            classifyDictionaryWord(
                word
            );


        if (
            result.type === "oneshot"
        ) {

            oneShotWords.push(
                word
            );

        } else if (
            result.type === "attack"
        ) {

            if (
                !attackMap.has(
                    result.level
                )
            ) {

                attackMap.set(
                    result.level,
                    []
                );
            }

            attackMap
                .get(result.level)
                .push(word);

        } else if (
            result.type === "loss"
        ) {

            if (
                !lossMap.has(
                    result.level
                )
            ) {

                lossMap.set(
                    result.level,
                    []
                );
            }

            lossMap
                .get(result.level)
                .push(word);

        } else {

            rootWords.push(
                word
            );
        }
    }


    dictionaryResult.innerHTML =
        "";


    // =================================================
    // 한방단어
    // =================================================

    dictionaryResult.appendChild(
        createDictionarySection(
            "한방단어",
            oneShotWords,
            "oneshot"
        )
    );


    // =================================================
    // 공격단어
    // =================================================

    dictionaryResult.appendChild(
        createLevelDictionarySection(
            "공격단어",
            attackMap,
            [
                2,
                4,
                6,
                8,
                10,
                12,
                14
            ],
            "승리",
            "attack"
        )
    );


    // =================================================
    // 패배단어
    // =================================================

    dictionaryResult.appendChild(
        createLevelDictionarySection(
            "패배단어",
            lossMap,
            [
                1,
                3,
                5,
                7,
                9,
                11,
                13,
                15
            ],
            "패배",
            "loss"
        )
    );


    // =================================================
    // 루트단어
    // =================================================

    dictionaryResult.appendChild(
        createDictionarySection(
            "루트단어",
            rootWords,
            "root"
        )
    );
}
