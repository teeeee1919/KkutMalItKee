// ========================================
// 🔴 1. 한방단어
// ========================================
// 첫 번째 단어로는 사용할 수 없음.
// 두 번째 단어부터는 사용 가능.

const oneShotWords = [
    "기동돓",
    "기쁨", "가녘", "가믐", "가마솣", "가매솣", "가싥", "가읅", "가벼운피읖", "가쿄", "가래틋", "가래툿", "가오픈",
    "거먕", "겨읅", "고래구녘", "고븜", "고쭘", "고달픔", "구녝", "구듫", "그믐", "그쭘", "개녘", "개울녘",
    "개울녘", "개픈개픈", "게훽", "니맣", "니오븀", "나무갗", "나준녘", "나이오븀", "나무샡", "나무새앝", "나구쟤",
    "나가오카쿄", "노짓돜", "노듈", "노휵", "뉴브런즈윅", "뉴욕머스캇", "네오디뮴", "네트웤", "네오머스캇",
    "다이디뮴", "다봊", "다래쨤", "다름슈타튬", "도린꼍", "도쿄", "두듥", "두왑", "대숳", "데엋", "데릭스텝",
    "강녘", "강능띱", "갯불녘", "겁쟤", "곡뒿", "공뭔", "과실쨤", "관싕", "괙괙", "괜찮", "귀썀", "귀틤",
    "귀아픔", "귁귁", "긔츌", "길녘", "깍쟤", "꼬꾜", "꼬냑", "꼬쟹", "꿕꿕", "뀍뀍", "끄룽텝", "날옺",
    "남녘", "넵튠", "눈도궃", "눈꽅", "눈쎂", "눈쎕", "눕눕", "늘휫늘휫", "닥울녘", "달거리아픔", "닭울녘",
    "당구솣", "댱맣", "댱짗", "덥스텝", "덴드로븀", "돌꼇", "동녘", "동솣", "되프뎧", "된히읗", "된아픔", "둘뤗",
    "둘암탉", "둘훕", "뒤껱", "뒤꼍", "뒤컽", "뒷묗", "든뼌", "들꼍", "들녘", "들뤗", "들옄", "들쭉쨤",
    "따듬돍", "따곱쟤", "땅붤", "때꾜", "때뀨", "떠돎", "떡케잌", "뙁뙁", "뜨꺼븡", "라듐", "라멜리포듐",
    "라이피듐", "러키세븐", "로듐", "루비듐", "루테튬", "리튬", "마이크로모듈", "마이크로튜뷸", "마웉",
    "말볌", "맔겿", "맞춤부엌", "머리컽", "멋쁨", "멘델레븀", "모듈", "모밇", "모스크븀", "모얗", "모샅왙",
    "몰래왙", "묏긑", "묏얺", "무뤂", "무웟", "묵은지앝", "문녘", "문밲", "물녘", "물랖", "미라시듐", "미쁨",
    "미왑", "민틋", "바긑", "바꼇", "바냔", "바나듐", "바깥부엌", "반됵", "받두듥", "발가울넠", "발란티듐",
    "발볌발볌", "밝을넠", "밝아올녘", "밝아울녘", "밭녘", "밭지숡", "배낕", "배캍", "배고픔", "배아픔",
    "뱍뱍", "버섳", "베꼍", "보솦", "보리앝", "보엌"

];


// ========================================
// 🟠 2. 공격단어
// ========================================
// 첫 번째 단어로는 사용할 수 없음.
// 두 번째 단어부터는 사용 가능.

const attackWords = [
    "예시공격단어1",
    "예시공격단어2"
];


// ========================================
// 🟢 3. 나머지단어
// ========================================
// 일반적으로 사용할 수 있는 단어.

const normalWords = [
    "기차",
    "기린",
    "기름",
    "기분",
    "시계",
    "시장",
    "시골",
    "이불",
    "이름",
    "이사",
    "비행기",
    "비누",
    "미술",
    "미소",
    "아기",
    "아침",
    "가방",
    "가게",
    "가수",
    "다리",
    "다람쥐",
    "바다",
    "바나나",
    "마음",
    "마차",
    "사과",
    "사람",
    "수박",
    "수영",
    "구름",
    "구두",
    "두부",
    "주전자",
    "지우개",
    "자동차",
    "보리",
    "부엌",
    "모자",
    "무지개",
    "소나무",
    "고기",
    "고래",
    "도서관",
    "우산",
    "오리",
    "의자",
    "하늘",
    "차표",
    "호랑이"
];


// ========================================
// 게임 설정
// ========================================

const startLetters = [
    "기", "시", "이", "비", "미", "아",
    "가", "다", "바", "마", "사", "수",
    "구", "두", "주", "지", "자", "보",
    "부", "모", "무", "소", "고", "도",
    "우", "오", "의", "하", "차", "호"
];

let currentWord = "";
let usedWords = [];
let lives = 2;
let timer = 20;
let timerInterval = null;
let playerTurn = false;
let firstPlayerWord = true;


// ========================================
// 모든 단어 합치기
// ========================================

const allWords = [
    ...oneShotWords,
    ...attackWords,
    ...normalWords
];


// ========================================
// 게임 시작
// ========================================

function startGame(mode) {

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    lives = 2;
    usedWords = [];
    firstPlayerWord = true;

    // 시작 글자 랜덤 선택
    const randomIndex =
        Math.floor(Math.random() * startLetters.length);

    currentWord = startLetters[randomIndex];

    document.getElementById("currentWord").textContent = currentWord;

    // 선공 / 후공 / 랜덤 결정
    if (mode === "first") {
        playerTurn = true;
    }

    else if (mode === "second") {
        playerTurn = false;
    }

    else {
        playerTurn = Math.random() < 0.5;
    }

    updateLives();
    updateNextLetter();

    if (playerTurn) {
        showMessage("당신의 차례입니다.");
        startTimer();
    }

    else {
        showMessage("봇이 생각 중...");
        setTimeout(botTurn, 1000);
    }
}


// ========================================
// 단어 입력
// ========================================

function submitWord() {

    if (!playerTurn) {
        return;
    }

    const input =
        document.getElementById("wordInput");

    const word = input.value.trim();

    input.value = "";

    if (word === "") {
        return;
    }


    // ----------------------------------------
    // 이미 사용한 단어
    // ----------------------------------------

    if (usedWords.includes(word)) {
        showMessage("이미 사용한 단어입니다.");
        return;
    }


    // ----------------------------------------
    // 존재하지 않는 단어
    // ----------------------------------------

    if (!allWords.includes(word)) {
        showMessage("존재하지 않는 단어입니다.");
        return;
    }


    // ----------------------------------------
    // 첫 글자 검사
    // ----------------------------------------

    const requiredLetter =
        getRequiredLetter(currentWord);

    if (word.charAt(0) !== requiredLetter) {

        showMessage("단어의 첫 글자가 맞지 않습니다.");
        return;
    }


    // ----------------------------------------
    // 첫 번째 단어에서 한방 / 공격단어 금지
    // ----------------------------------------

    if (firstPlayerWord) {

        if (
            oneShotWords.includes(word) ||
            attackWords.includes(word)
        ) {

            showMessage("처음에 사용할 수 없는 단어입니다.");
            return;
        }
    }


    // ----------------------------------------
    // 정상적으로 단어 입력
    // ----------------------------------------

    stopTimer();

    currentWord = word;

    usedWords.push(word);

    firstPlayerWord = false;

    addWordToHistory(word);

    document.getElementById("currentWord").textContent =
        currentWord;

    updateNextLetter();

    playerTurn = false;

    showMessage("봇이 생각 중...");

    setTimeout(botTurn, 800);
}


// ========================================
// 봇 차례
// ========================================

function botTurn() {

    if (lives <= 0) {
        return;
    }

    const requiredLetter =
        getRequiredLetter(currentWord);


    // 봇이 낼 수 있는 단어 찾기
    const possibleWords = allWords.filter(word => {

        return (
            word.charAt(0) === requiredLetter &&
            !usedWords.includes(word)
        );

    });


    // ----------------------------------------
    // 봇이 낼 단어가 없음
    // ----------------------------------------

    if (possibleWords.length === 0) {

        showMessage("봇이 더 이상 낼 단어가 없습니다!");

        endGame(true);

        return;
    }


    // 랜덤으로 선택
    const randomIndex =
        Math.floor(Math.random() * possibleWords.length);

    const botWord =
        possibleWords[randomIndex];


    currentWord = botWord;

    usedWords.push(botWord);

    addWordToHistory(botWord);

    document.getElementById("currentWord").textContent =
        currentWord;

    updateNextLetter();

    showMessage("봇: " + botWord);

    playerTurn = true;

    startTimer();
}


// ========================================
// 다음 글자 계산
// ========================================

function getRequiredLetter(word) {

    return word.charAt(word.length - 1);
}


// ========================================
// 제한시간 시작
// ========================================

function startTimer() {

    stopTimer();

    timer = 20;

    document.getElementById("timer").textContent =
        timer;

    timerInterval = setInterval(() => {

        timer--;

        document.getElementById("timer").textContent =
            timer;

        if (timer <= 0) {

            stopTimer();

            timeOut();
        }

    }, 1000);
}


// ========================================
// 제한시간 종료
// ========================================

function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


// ========================================
// 시간 초과
// ========================================

function timeOut() {

    if (!playerTurn) {
        return;
    }

    lives--;

    updateLives();

    showMessage("시간 초과! 목숨이 1개 깎였습니다.");

    if (lives <= 0) {

        endGame(false);

        return;
    }


    // 목숨이 남아있으면 봇 차례
    playerTurn = false;

    showMessage("시간 초과! 봇이 이어갑니다.");

    setTimeout(botTurn, 1000);
}


// ========================================
// 목숨 표시
// ========================================

function updateLives() {

    let hearts = "";

    for (let i = 0; i < lives; i++) {
        hearts += "❤️ ";
    }

    document.getElementById("lives").textContent =
        hearts;
}


// ========================================
// 현재 필요한 글자 표시
// ========================================

function updateNextLetter() {

    const letter =
        getRequiredLetter(currentWord);

    document.getElementById("nextLetter").textContent =
        "다음 단어는 '" + letter + "'으로 시작해야 합니다.";
}


// ========================================
// 메시지 표시
// ========================================

function showMessage(message) {

    document.getElementById("message").textContent =
        message;
}


// ========================================
// 단어 기록
// ========================================

function addWordToHistory(word) {

    const wordList =
        document.getElementById("wordList");

    const item =
        document.createElement("span");

    item.className = "word-item";

    item.textContent = word;

    wordList.appendChild(item);
}


// ========================================
// 게임 종료
// ========================================

function endGame(playerWon) {

    stopTimer();

    playerTurn = false;

    document.getElementById("gameScreen")
        .classList.add("hidden");

    document.getElementById("endScreen")
        .classList.remove("hidden");

    const result =
        document.getElementById("resultText");

    if (playerWon) {

        result.textContent =
            "🎉 승리!";

    } else {

        result.textContent =
            "😢 패배!";
    }
}


// ========================================
// Enter 키로 입력
// ========================================

document.getElementById("wordInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            submitWord();
        }

    });
