const words = [
    "menaik taraf", "simbol kesenian", "retak menanti belah", 
    "monumen bersejarah", "peninggalan sejarah", "menjadi pedoman",
    "mendalami sejarah", "nostalgia sejarah", "kerja-kerja pemulharaan",
    "memperuntukkan", "lokomotif", "melaporkan aduan",
    "memikul obligasi", "semata-mata", "pencerobohan",
    "mengekalkan keaslian", "menunggu masa", "mengimbas kembali",
    "tidak menyesali", "bagai aur dengan tebing"
];

const meanings = [
    "升级", "艺术象征", "小事演变成大事",
    "历史性纪念碑", "历史遗物", "成为指南",
    "深入了解历史", "历史怀旧", "保护工作",
    "分配", "火车头", "报告投诉",
    "扛起责任", "仅仅", "侵略",
    "维持原始", "等待良机", "回想",
    "不后悔", "合作"
];

let currentIndex = 0;
let score = 0;
const totalWords = words.length;

function shuffleArrays(array1, array2) {
    for (let i = array1.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array1[i], array1[j]] = [array1[j], array1[i]];
        [array2[i], array2[j]] = [array2[j], array2[i]];
    }
}

function startGame() {
    shuffleArrays(words, meanings);
    currentIndex = 0;
    score = 0;
    showNextWord();
}

function showNextWord() {
    if (currentIndex < totalWords) {
        document.getElementById('meaning').textContent = `中文含义: ${meanings[currentIndex]}`;
        showChoices();
        document.getElementById('result').textContent = '';
    } else {
        endGame();
    }
}

function showChoices() {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    let choices = [words[currentIndex]];
    while (choices.length < 4) {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        if (!choices.includes(randomWord)) {
            choices.push(randomWord);
        }
    }
    
    choices = shuffleArray(choices);
    
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.className = 'choice-btn';
        button.onclick = () => checkGuess(choice);
        choicesContainer.appendChild(button);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkGuess(guess) {
    const correct = words[currentIndex];
    
    if (guess === correct) {
        document.getElementById('result').textContent = '正确!';
        score++;
    } else {
        document.getElementById('result').textContent = `错误。正确答案是: ${correct}`;
    }
    
    currentIndex++;
    updateScore();
    setTimeout(showNextWord, 2000);
}

function updateScore() {
    document.getElementById('score').textContent = `得分: ${score}/${currentIndex}`;
}

function endGame() {
    document.getElementById('meaning').textContent = '游戏结束!';
    document.getElementById('choices').innerHTML = '';
    document.getElementById('result').textContent = `最终得分: ${score}/${totalWords}`;
}

window.onload = startGame;