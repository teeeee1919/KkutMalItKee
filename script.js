// =====================================================
// 끝말잇기 AI
// =====================================================


// =====================================================
// 기본 설정
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
// 사전
// =====================================================

let dictionary = [];
let dictionarySet = new Set();

// 첫 글자별 단어
let wordsByFirstLetter = new Map();

// 마지막 글자별 단어
let wordsByLastLetter = new Map();


// =====================================================
// 게임 상태
// =====================================================

let currentWord = "";
let usedWords = [];

let lives = MAX_LIVES;

let playerTurn = false;
let firstMove = true;

let timer = null;
let timeLeft = TIME_LIMIT;

let gameStarted = false;


// =====================================================
// 화면 요소
// =====================================================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

const startLetterText = document.getElementById("startLetter");
const requiredLetterText = document.getElementById("requiredLetter");

const currentWordText = document.getElementById("currentWord");

const livesText = document.getElementById("lives");
const timerText = document.getElementById("timer");

const turnMessage = document.getElementById("turnMessage");
const message = document.getElementById("message");

const wordInput = document.getElementById("wordInput");
const submitButton = document.getElementById("submitButton");

const history = document.getElementById("history");


// =====================================================
// 단어 사전 불러오기
// =====================================================

fetch("words.txt")
    .then(response => {

        if (!response.ok) {
            throw new Error("words.txt를 불러오지 못했습니다.");
        }

        return response.text();
    })

    .then(text => {

        dictionary = text
            .split(/\r?\n/)
            .map(word => word.trim())
            .filter(word => word.length > 0);

        // 중복 제거
        dictionary = [...new Set(dictionary)];

        dictionarySet = new Set(dictionary);


        // -------------------------------------------------
        // 첫 글자 / 마지막 글자별로 색인
        // -------------------------------------------------

        for (const word of dictionary) {

            const first = word[0];
            const last = word[word.length - 1];


            // 첫 글자
            if (!wordsByFirstLetter.has(first)) {
                wordsByFirstLetter.set(first, []);
            }

            wordsByFirstLetter.get(first).push(word);


            // 마지막 글자
            if (!wordsByLastLetter.has(last)) {
                wordsByLastLetter.set(last, []);
            }

            wordsByLastLetter.get(last).push(word);
        }


        console.log(
            "단어 로딩 완료:",
            dictionary.length,
            "개"
        );

    })

    .catch(error => {

        console.error(error);

        alert(
            "words.txt를 불러오지 못했습니다.\n" +
            "GitHub에 words.txt가 제대로 올라갔는지 확인해주세요."
        );
    });


// =====================================================
// 시작
// =====================================================

function startGame(mode) {

    if (dictionary.length === 0) {

        alert("아직 단어 사전이 로딩되지 않았습니다.");

        return;
    }


    // 게임 초기화
    currentWord = "";
    usedWords = [];

    lives = MAX_LIVES;

    firstMove = true;

    gameStarted = true;


    // 시작 글자 랜덤
    const randomIndex =
        Math.floor(Math.random() * START_LETTERS.length);

    const startingLetter =
        START_LETTERS[randomIndex];

    startLetterText.textContent = startingLetter;
    requiredLetterText.textContent = startingLetter;


    // 선공 / 후공 / 랜덤
    if (mode === "player") {

        playerTurn = true;

    } else if (mode === "bot") {

        playerTurn = false;

    } else {

        playerTurn = Math.random() < 0.5;
    }


    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");


    updateLives();

    updateHistory();

    message.textContent = "";


    // -------------------------------------------------
    // 선공이면 바로 플레이어
    // 후공이면 봇
    // -------------------------------------------------

    if (playerTurn) {

        setPlayerTurn();

    } else {

        setBotTurn();

        setTimeout(botTurn, 800);
    }
}


// =====================================================
// 플레이어 턴
// =====================================================

function setPlayerTurn() {

    playerTurn = true;

    turnMessage.textContent =
        "당신의 턴";

    submitButton.disabled = false;
    wordInput.disabled = false;

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

    submitButton.disabled = true;
    wordInput.disabled = true;

    stopTimer();
}


// =====================================================
// 현재 필요한 글자
// =====================================================

function getRequiredLetter() {

    if (currentWord === "") {

        return requiredLetterText.textContent;
    }

    return currentWord[currentWord.length - 1];
}


// =====================================================
// 플레이어 단어 입력
// =====================================================

function submitWord() {

    if (!playerTurn || !gameStarted) {
        return;
    }


    const word =
        wordInput.value.trim();


    wordInput.value = "";

    message.textContent = "";


    // 빈칸
    if (word.length === 0) {

        message.textContent =
            "단어를 입력해주세요.";

        return;
    }


    // -------------------------------------------------
    // 이미 사용한 단어
    // -------------------------------------------------

    if (usedWords.includes(word)) {

        message.textContent =
            "이미 사용한 단어입니다.";

        return;
    }


    // -------------------------------------------------
    // 사전에 없는 단어
    // -------------------------------------------------

    if (!dictionarySet.has(word)) {

        message.textContent =
            "존재하지 않는 단어입니다.";

        return;
    }


    // -------------------------------------------------
    // 첫 글자 검사
    // -------------------------------------------------

    const requiredLetter =
        getRequiredLetter();

    if (word[0] !== requiredLetter) {

        message.textContent =
            "단어의 첫 글자가 맞지 않습니다.";

        return;
    }


    // -------------------------------------------------
    // 첫 번째 수에는 한방/공격 금지
    // -------------------------------------------------

    if (
        firstMove &&
        isOneShotWord(word)
    ) {

        message.textContent =
            "처음에 사용할 수 없는 단어입니다.";

        return;
    }


    // -------------------------------------------------
    // 정상 입력
    // -------------------------------------------------

    stopTimer();

    useWord(word, "player");

    firstMove = false;


    // 봇 턴
    setBotTurn();

    setTimeout(botTurn, 700);
}


// =====================================================
// 단어 사용
// =====================================================

function useWord(word, owner) {

    currentWord = word;

    usedWords.push(word);


    currentWordText.textContent =
        word;


    requiredLetterText.textContent =
        word[word.length - 1];


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


    // 낼 단어가 없음
    if (!botWord) {

        endGame(
            "승리!",
            "봇이 낼 수 있는 단어가 없습니다."
        );

        return;
    }


    useWord(botWord, "bot");

    firstMove = false;


    // 다시 플레이어
    setPlayerTurn();
}


// =====================================================
// 봇 AI
// =====================================================

function chooseBotWord() {

    const requiredLetter =
        getRequiredLetter();


    let candidates =
        wordsByFirstLetter.get(requiredLetter) || [];


    // 이미 사용한 단어 제거
    candidates = candidates.filter(
        word => !usedWords.includes(word)
    );


    if (candidates.length === 0) {
        return null;
    }


    // -------------------------------------------------
    // 첫 수에는 한방/공격 금지
    // -------------------------------------------------

    if (firstMove) {

        candidates =
            candidates.filter(word =>
                !isOneShotWord(word) &&
                !isAttackWord(word)
            );
    }


    if (candidates.length === 0) {
        return null;
    }


    // -------------------------------------------------
    // 모든 후보 분석
    // -------------------------------------------------

    const analyzed = candidates.map(word => {

        return {
            word: word,
            category: analyzeWord(word),
            score: getWordScore(word)
        };
    });


    // -------------------------------------------------
    // 우선순위
    //
    // 한방 > 공격 > 루트 > 패배
    // -------------------------------------------------

    const priority = {
        "한방": 4,
        "공격": 3,
        "루트": 2,
        "패배": 1
    };


    analyzed.sort((a, b) => {

        const priorityDifference =
            priority[b.category] -
            priority[a.category];


        if (priorityDifference !== 0) {
            return priorityDifference;
        }


        // 같은 분류라면 점수가 높은 것
        return b.score - a.score;
    });


    return analyzed[0].word;
}


// =====================================================
// 단어 분류
// =====================================================

function analyzeWord(word) {

    // 한방
    if (isOneShotWord(word)) {
        return "한방";
    }


    // 공격
    if (isAttackWord(word)) {
        return "공격";
    }


    // -------------------------------------------------
    // 이후 몇 수를 계산해서 승패 가능성 판단
    // -------------------------------------------------

    const result =
        searchPosition(
            word,
            5,
            new Set([...usedWords, word])
        );


    if (result === "WIN") {
        return "공격";
    }


    if (result === "LOSE") {
        return "패배";
    }


    return "루트";
}


// =====================================================
// 한방단어
// =====================================================

function isOneShotWord(word) {

    const last =
        word[word.length - 1];


    const nextWords =
        getAvailableWords(
            last,
            new Set([...usedWords, word])
        );


    return nextWords.length === 0;
}


// =====================================================
// 공격단어
// =====================================================

function isAttackWord(word) {

    const last =
        word[word.length - 1];


    const nextWords =
        getAvailableWords(
            last,
            new Set([...usedWords, word])
        );


    // 상대가 선택할 수 있는 단어가 적을수록
    // 공격적인 단어로 취급
    //
    // 1~2개 → 공격
    //
    // 0개는 한방에서 이미 처리
    //

    return (
        nextWords.length >= 1 &&
        nextWords.length <= 2
    );
}


// =====================================================
// 사용 가능한 다음 단어
// =====================================================

function getAvailableWords(letter, used) {

    const words =
        wordsByFirstLetter.get(letter) || [];


    return words.filter(
        word => !used.has(word)
    );
}


// =====================================================
// 게임 탐색 AI
// =====================================================
//
// WIN  = 현재 봇에게 유리
// LOSE = 현재 봇에게 불리
// DRAW = 확실하게 판단하기 어려움
//
// depth가 너무 높으면 54만 단어에서
// 계산량이 폭발할 수 있기 때문에 제한함.
// =====================================================

const searchMemo = new Map();


function searchPosition(
    word,
    depth,
    used
) {

    if (depth <= 0) {
        return "DRAW";
    }


    const last =
        word[word.length - 1];


    const nextWords =
        getAvailableWords(last, used);


    // 다음 단어가 없다
    if (nextWords.length === 0) {
        return "LOSE";
    }


    let hasDraw = false;


    // 후보를 최대 20개까지만 검색
    // 브라우저 속도 보호
    const candidates =
        nextWords.slice(0, 20);


    for (const nextWord of candidates) {

        const nextUsed =
            new Set(used);

        nextUsed.add(nextWord);


        const result =
            searchPosition(
                nextWord,
                depth - 1,
                nextUsed
            );


        // 상대가 LOSE가 되는 수를 찾으면
        // 현재 플레이어에게 WIN
        if (result === "LOSE") {
            return "WIN";
        }


        if (result === "DRAW") {
            hasDraw = true;
        }
    }


    if (hasDraw) {
        return "DRAW";
    }


    return "LOSE";
}


// =====================================================
// 봇 점수
// =====================================================

function getWordScore(word) {

    const last =
        word[word.length - 1];


    const nextWords =
        getAvailableWords(
            last,
            new Set([...usedWords, word])
        );


    // 상대 선택지가 적을수록 높은 점수
    let score =
        1000 - nextWords.length;


    // 탐색으로 미래 승리 가능성 계산
    const result =
        searchPosition(
            word,
            4,
            new Set([...usedWords, word])
        );


    if (result === "WIN") {
        score += 500;
    }

    else if (result === "LOSE") {
        score -= 500;
    }


    return score;
}


// =====================================================
// 타이머
// =====================================================

function startTimer() {

    stopTimer();

    timeLeft = TIME_LIMIT;

    timerText.textContent =
        timeLeft;


    timer = setInterval(() => {

        timeLeft--;

        timerText.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            stopTimer();

            timeOut();
        }

    }, 1000);
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

    if (!playerTurn) {
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


    // 목숨 하나 잃고 다시 플레이
    setTimeout(() => {

        message.textContent =
            "목숨을 하나 잃었습니다.";

        setPlayerTurn();

    }, 700);
}


// =====================================================
// 목숨 표시
// =====================================================

function updateLives() {

    livesText.textContent =
        "❤️".repeat(lives) +
        "🖤".repeat(MAX_LIVES - lives);
}


// =====================================================
// 사용 단어 표시
// =====================================================

function updateHistory() {

    history.innerHTML = "";


    for (const word of usedWords) {

        const element =
            document.createElement("span");

        element.className =
            "historyWord";

        element.textContent =
            word;

        history.appendChild(element);
    }
}


// =====================================================
// 게임 종료
// =====================================================

function endGame(title, text) {

    gameStarted = false;

    stopTimer();


    gameScreen.classList.add("hidden");

    endScreen.classList.remove("hidden");


    document.getElementById(
        "resultTitle"
    ).textContent = title;


    document.getElementById(
        "resultMessage"
    ).textContent = text;
}


// =====================================================
// Enter 키
// =====================================================

wordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            submitWord();
        }

    }
);
