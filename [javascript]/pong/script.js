const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const options = document.getElementById("options");
const credits = document.getElementById("credits");
const gameTitle = document.getElementById("game-title");
const startBtn = document.getElementById("start-btn");
const optionsBtn = document.getElementById("options-btn");
const creditsBtn = document.getElementById("credits-btn");
const backBtn = document.getElementById("back-btn");
const backCreditsBtn = document.getElementById("back-credits-btn");
const themeToggle = document.getElementById("theme-toggle");

let isDarkTheme = true; // Tema inicial é escuro

// Função para alternar entre temas
function toggleTheme() {
    if (isDarkTheme) {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        startBtn.classList.remove("light-theme");
        optionsBtn.classList.remove("light-theme");
        creditsBtn.classList.remove("light-theme");
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        startBtn.classList.add("light-theme");
        optionsBtn.classList.add("light-theme");
        creditsBtn.classList.add("light-theme");
    }
    isDarkTheme = !isDarkTheme;
}

// Função para alternar para a tela do jogo
function startGame() {
    menu.classList.add("hidden");
    canvas.classList.remove("hidden");
    update(); // Inicia o jogo
}

// Função para mostrar a tela de opções
function showOptions() {
    menu.classList.add("hidden");
    options.classList.remove("hidden");
}

// Função para mostrar a tela de créditos
function showCredits() {
    menu.classList.add("hidden");
    credits.classList.remove("hidden");
}

// Função para voltar para o menu principal
function goBack() {
    options.classList.add("hidden");
    credits.classList.add("hidden");
    menu.classList.remove("hidden");
}

// Definindo os eventos dos botões
startBtn.addEventListener("click", startGame);
optionsBtn.addEventListener("click", showOptions);
creditsBtn.addEventListener("click", showCredits);
backBtn.addEventListener("click", goBack);
backCreditsBtn.addEventListener("click", goBack);
themeToggle.addEventListener("click", toggleTheme);

// Iniciar com o tema escuro
toggleTheme();



const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerSpeed = 0;
let computerSpeed = 4;

let playerScore = 0;
let computerScore = 0;



// Função para desenhar a raquete
function drawPaddle(x, y) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar o placar
function drawScore() {
    ctx.font = "35px Arial";
    ctx.fillText(playerScore, canvas.width / 4, 50);
    ctx.fillText(computerScore, 3 * canvas.width / 4, 50);
}

// Função para desenhar tudo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, playerY); // Raquete do jogador
    drawPaddle(canvas.width - paddleWidth, computerY); // Raquete do computador
    drawBall();
    drawScore();
}



// Movimento do jogador
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && playerY > 0) {
        playerSpeed = -5; // Mover para cima
    } else if (event.key === "ArrowDown" && playerY < canvas.height - paddleHeight) {
        playerSpeed = 5; // Mover para baixo
    }
});

document.addEventListener("keyup", () => {
    playerSpeed = 0; // Parar quando soltar a tecla
});

// Movimento do computador
function moveComputer() {
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += computerSpeed;
    } else if (computerY + paddleHeight / 2 > ballY) {
        computerY -= computerSpeed;
    }
}



function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão com as bordas superior e inferior
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com as raquetes
    if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Gol de um dos jogadores
    if (ballX - ballRadius < 0) {
        computerScore++;
        resetBall();
    } else if (ballX + ballRadius > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Resetar a posição da bola
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5); // Velocidade inicial aleatória
}



function update() {
    moveBall();
    moveComputer();
    playerY += playerSpeed;
    draw();
    requestAnimationFrame(update);
}

update(); // Iniciar o jogo
