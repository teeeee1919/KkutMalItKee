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

let round = 1;


// =====================================================
// 사전
// =====================================================

let dictionary = [];
let dictionarySet = new Set();

let wordsByFirstLetter = new Map();


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


        // 첫 글자별로 단어 저장
        for (const word of dictionary) {

            const first = word[0];

            if (!wordsByFirstLetter.has(first)) {
                wordsByFirstLetter.set(first, []);
            }

            wordsByFirstLetter
                .get(first)
                .push(word);
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
            "GitHub에 words.txt가 제대로 올라가 있는지 확인해주세요."
        );
    });


// =====================================================
// 게임 시작
// =====================================================

function startGame(mode) {

    if (dictionary.length === 0) {

        alert("아직 단어 사전이 로딩되지 않았습니다.");

        return;
    }


    currentWord = "";
    usedWords = [];

    lives = MAX_LIVES;

    round = 1;

    firstMove = true;

    gameStarted = true;


    // 시작 글자 랜덤
    const randomIndex =
        Math.floor(
            Math.random() * START_LETTERS.length
        );

    const startingLetter =
        START_LETTERS[randomIndex];


    startLetterText.textContent =
        startingLetter;

    requiredLetterText.textContent =
        startingLetter;


    // 선공 / 후공 / 랜덤
    if (mode === "player") {

        playerTurn = true;

    }

    else if (mode === "bot") {

        playerTurn = false;

    }

    else {

        playerTurn =
            Math.random() < 0.5;
    }


    startScreen.classList.add("hidden");

    endScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");


    updateLives();

    updateHistory();

    currentWordText.textContent = "";

    message.textContent = "";


    // 플레이어 선공
    if (playerTurn) {

        setPlayerTurn();

    }

    // 봇 선공
    else {

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
// 필요한 글자
// =====================================================

function getRequiredLetter() {

    if (currentWord === "") {

        return requiredLetterText.textContent;
    }

    return currentWord[
        currentWord.length - 1
    ];
}


// =====================================================
// 플레이어 단어 제출
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


    // 이미 사용
    if (usedWords.includes(word)) {

        message.textContent =
            "이미 사용한 단어입니다.";

        return;
    }


    // 사전에 없음
    if (!dictionarySet.has(word)) {

        message.textContent =
            "존재하지 않는 단어입니다.";

        return;
    }


    // 필요한 글자
    const requiredLetter =
        getRequiredLetter();


    if (word[0] !== requiredLetter) {

        message.textContent =
            "단어의 첫 글자가 맞지 않습니다.";

        return;
    }


    // 첫 단어 한방 금지
    if (
        firstMove &&
        isOneShotWord(word)
    ) {

        message.textContent =
            "처음에는 한방 단어를 사용할 수 없습니다.";

        return;
    }


    // 정상 입력
    stopTimer();

    useWord(word);

    firstMove = false;


    // 봇 턴
    setBotTurn();

    setTimeout(botTurn, 700);
}


// =====================================================
// 단어 사용
// =====================================================

function useWord(word) {

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


    // 봇이 낼 단어가 없음
    if (!botWord) {

        endGame(
            "승리!",
            "봇이 이어갈 단어를 찾지 못했습니다."
        );

        return;
    }


    // 봇 단어 사용
    useWord(botWord);

    firstMove = false;


    // 플레이어 턴
    setPlayerTurn();
}


// =====================================================
// 봇 AI
// =====================================================

function chooseBotWord() {

    const requiredLetter =
        getRequiredLetter();


    // 필요한 글자로 시작하는 단어
    let candidates =
        wordsByFirstLetter.get(requiredLetter) || [];


    // 이미 사용한 단어 제거
    candidates =
        candidates.filter(
            word => !usedWords.includes(word)
        );


    // 후보가 하나도 없음
    if (candidates.length === 0) {

        return null;
    }


    // =================================================
    // 첫 번째 수
    // =================================================

    if (firstMove) {

        const safeCandidates =
            candidates.filter(
                word => !isOneShotWord(word)
            );


        // 안전한 단어가 있으면 사용
        if (safeCandidates.length > 0) {

            candidates =
                safeCandidates;
        }
    }


    // =================================================
    // 후보 점수 계산
    // =================================================

    const analyzed =
        candidates.map(word => {

            const nextWords =
                getAvailableWords(
                    word[word.length - 1],
                    new Set([
                        ...usedWords,
                        word
                    ])
                );


            let score = 0;


            // 상대 선택지가 적을수록 좋음
            score +=
                1000 -
                (nextWords.length * 10);


            // 한방 단어
            if (nextWords.length === 0) {

                score += 10000;
            }


            // 공격 단어
            else if (nextWords.length <= 2) {

                score += 3000;
            }


            // 같은 점수만 계속 나오지 않도록
            // 작은 랜덤값 추가
            score +=
                Math.random() * 100;


            return {
                word: word,
                score: score
            };
        });


    // 점수 높은 순
    analyzed.sort(
        (a, b) =>
            b.score - a.score
    );


    // 최고 점수 단어
    return analyzed[0].word;
}


// =====================================================
// 사용 가능한 다음 단어
// =====================================================

function getAvailableWords(
    letter,
    used
) {

    const words =
        wordsByFirstLetter.get(letter) || [];


    return words.filter(
        word => !used.has(word)
    );
}


// =====================================================
// 한방 단어 확인
// =====================================================

function isOneShotWord(word) {

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


    return nextWords.length === 0;
}


// =====================================================
// 공격 단어 확인
// =====================================================

function isAttackWord(word) {

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
        nextWords.length >= 1 &&
        nextWords.length <= 2
    );
}


// =====================================================
// 타이머
// =====================================================

function startTimer() {

    stopTimer();

    timeLeft = TIME_LIMIT;

    timerText.textContent =
        timeLeft;


    timer =
        setInterval(() => {

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
        "🖤".repeat(
            MAX_LIVES - lives
        );
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

// =====================================================
// 라운드 끝내기
// =====================================================

function giveUpRound() {

    if (!gameStarted) {
        return;
    }

    // 타이머 정지
    stopTimer();

    // 목숨 1개 차감
    lives--;

    updateLives();

    // 목숨이 0이면 패배
    if (lives <= 0) {

        endGame(
            "패배!",
            "목숨을 모두 잃었습니다."
        );

        return;
    }

    // 다음 라운드
    round++;

    currentWord = "";
    usedWords = [];

    firstMove = true;

    // 시작 글자 랜덤
    const randomIndex =
        Math.floor(
            Math.random() * START_LETTERS.length
        );

    const startingLetter =
        START_LETTERS[randomIndex];

    startLetterText.textContent =
        startingLetter;

    requiredLetterText.textContent =
        startingLetter;

    currentWordText.textContent = "";

    message.textContent =
        "라운드 " + round + " 시작!";

    updateHistory();

    // 플레이어 턴으로 시작
    setPlayerTurn();
}
