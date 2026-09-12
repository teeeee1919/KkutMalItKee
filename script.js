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
즁 즉 즉 짇 짊 짏 짖 짛 짥 쨉 쨋 쨎 쨔 쩎 쩧 쩰 쩻 쩿 쪄 쪾 쫏 쫒
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


// =====================================================
// 공격 글자 Set으로 변환
// =====================================================

const attackLevelMap = new Map();

for (const level of Object.keys(ATTACK_LEVELS)) {
    for (const letter of ATTACK_LEVELS[level]) {
        attackLevelMap.set(letter, Number(level));
    }
}


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
let round = 1;


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
// 사전 불러오기
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

        dictionary = [...new Set(dictionary)];

        dictionarySet = new Set(dictionary);

        wordsByFirstLetter = new Map();

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

    const startingLetter =
        START_LETTERS[
            Math.floor(
                Math.random() * START_LETTERS.length
            )
        ];

    startLetterText.textContent = startingLetter;
    requiredLetterText.textContent = startingLetter;

    if (mode === "player") {
        playerTurn = true;
    }
    else if (mode === "bot") {
        playerTurn = false;
    }
    else {
        playerTurn = Math.random() < 0.5;
    }

    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    updateLives();
    updateHistory();

    currentWordText.textContent = "";
    message.textContent = "";

    if (playerTurn) {
        setPlayerTurn();
    }
    else {
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

    turnMessage.textContent = "당신의 턴";

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

    turnMessage.textContent = "봇이 생각 중...";

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

    return currentWord[currentWord.length - 1];
}


// =====================================================
// 두음법칙
// =====================================================

function getDuumLetters(letter) {

    const result = [letter];

    if (!letter) {
        return result;
    }

    const code = letter.charCodeAt(0);

    if (code < 0xAC00 || code > 0xD7A3) {
        return result;
    }

    const index = code - 0xAC00;

    const initial = Math.floor(index / 588);

    const vowel =
        Math.floor(
            (index % 588) / 28
        );

    const finalSound = index % 28;


    // ㄴ → ㅇ
    const nToIeungVowels = [
        2, 6, 7, 12, 13, 20
    ];

    if (
        initial === 2 &&
        nToIeungVowels.includes(vowel)
    ) {

        const newCode =
            0xAC00 +
            11 * 588 +
            vowel * 28 +
            finalSound;

        result.push(
            String.fromCharCode(newCode)
        );
    }


    // ㄹ → ㅇ / ㄴ
    if (initial === 5) {

        if (
            nToIeungVowels.includes(vowel)
        ) {

            const newCode =
                0xAC00 +
                11 * 588 +
                vowel * 28 +
                finalSound;

            result.push(
                String.fromCharCode(newCode)
            );
        }

        const rieulToNieunVowels = [
            0, 1, 8, 9, 13, 18
        ];

        if (
            rieulToNieunVowels.includes(vowel)
        ) {

            const newCode =
                0xAC00 +
                2 * 588 +
                vowel * 28 +
                finalSound;

            result.push(
                String.fromCharCode(newCode)
            );
        }
    }

    return [...new Set(result)];
}


// =====================================================
// 이어지는 단어인지 확인
// =====================================================

function canStartWith(word, requiredLetter) {

    if (!word || !requiredLetter) {
        return false;
    }

    return getDuumLetters(requiredLetter)
        .includes(word[0]);
}


// =====================================================
// 사용 가능한 단어
// =====================================================

function getAvailableWords(letter, used) {

    const possibleLetters =
        getDuumLetters(letter);

    let words = [];

    for (const possibleLetter of possibleLetters) {

        const list =
            wordsByFirstLetter.get(possibleLetter) || [];

        words.push(...list);
    }

    return [
        ...new Set(words)
    ].filter(word => !used.has(word));
}


// =====================================================
// 공격력 확인
// =====================================================

function getAttackLevel(word) {

    if (!word) {
        return Infinity;
    }

    const last =
        word[word.length - 1];

    return attackLevelMap.get(last) ?? Infinity;
}


// =====================================================
// 한방 단어
// =====================================================

function isOneShotWord(word) {

    const nextWords =
        getAvailableWords(
            word[word.length - 1],
            new Set([
                ...usedWords,
                word
            ])
        );

    return nextWords.length === 0;
}


// =====================================================
// 공격 단어인지
// =====================================================

function isAttackWord(word) {

    return attackLevelMap.has(
        word[word.length - 1]
    );
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


    if (!canStartWith(word, requiredLetter)) {

        message.textContent =
            "단어의 첫 글자가 맞지 않습니다.";

        return;
    }


    // 첫 턴에는 공격 단어 + 한방 단어 금지
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

    currentWordText.textContent = word;

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


    // 첫 턴에는 공격/한방 단어 제외
    if (firstMove) {

        const safeCandidates =
            candidates.filter(word => {

                return (
                    !isOneShotWord(word) &&
                    !isAttackWord(word)
                );

            });


        if (safeCandidates.length > 0) {
            candidates = safeCandidates;
        }
    }


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

            const attackLevel =
                getAttackLevel(word);


            // =================================================
            // 한방
            // =================================================

            if (nextWords.length === 0) {

                score += 100000;
            }


            // =================================================
            // 공격 단어
            // =================================================

            if (attackLevel !== Infinity) {

                // 2수짜리가 가장 강함
                score +=
                    50000 -
                    attackLevel * 2500;
            }


            // =================================================
            // 일반 단어
            // =================================================

            score +=
                5000 -
                nextWords.length * 20;


            // 약간의 랜덤
            score +=
                Math.random() * 100;


            return {
                word,
                score
            };

        });


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

    timeLeft = TIME_LIMIT;

    timerText.textContent = timeLeft;

    timer =
        setInterval(() => {

            timeLeft--;

            timerText.textContent = timeLeft;

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

    if (!playerTurn || !gameStarted) {
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

        if (!gameStarted) {
            return;
        }

        message.textContent =
            "목숨을 하나 잃었습니다.";

        setPlayerTurn();

    }, 700);
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
                Math.random() * START_LETTERS.length
            )
        ];


    startLetterText.textContent =
        startingLetter;

    requiredLetterText.textContent =
        startingLetter;

    currentWordText.textContent =
        "";

    message.textContent =
        "라운드 " + round + " 시작!";


    updateHistory();

    setPlayerTurn();
}


// =====================================================
// 목숨
// =====================================================

function updateLives() {

    livesText.textContent =
        "❤️".repeat(lives) +
        "🖤".repeat(
            MAX_LIVES - lives
        );
}


// =====================================================
// 사용 단어
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

    document.getElementById("resultTitle").textContent =
        title;

    document.getElementById("resultMessage").textContent =
        text;
}


// =====================================================
// Enter
// =====================================================

wordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            submitWord();
        }

    }
);
