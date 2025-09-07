// Matrix Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Fullscreen canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Ký tự hiển thị (random chữ + số)
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    // Nền mờ dần
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Màu neon + bóng mờ
    ctx.fillStyle = '#00FF41';
    ctx.shadowColor = '#00FF41';
    ctx.shadowBlur = 8;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

// Khi resize giữ hiệu ứng mượt
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
});

// --- Weather Aura ---
function auraPulse() {
    const card = document.querySelector('.weather-card');
    if (!card) return;
    card.classList.add('aura');
    setTimeout(() => {
        card.classList.remove('aura');
    }, 3000);
}

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = 'ba93ab5d9130ee0f1f74ac31088590ca';
    if (!city) {
        document.getElementById('weatherResult').innerHTML = '<p>Please enter a city!</p>';
        return;
    }

    auraPulse();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) {
                const html = `
                    <h2>${city}</h2>
                    <p>Thời tiết: ${data.weather[0].description}</p>
                    <p>Nhiệt độ: ${data.main.temp}°C</p>
                    <p>Độ ẩm: ${data.main.humidity}%</p>
                `;
                typeText('weatherResult', html);
            } else {
                typeText('weatherResult', '<p>City not found!</p>');
            }
        })
        .catch(err => {
            console.error(err);
            typeText('weatherResult', '<p>Error fetching data!</p>');
        });
}

function typeText(elementId, html) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    let i = 0;

    function typing() {
        container.innerHTML = html.substring(0, i);
        i++;
        if (i <= html.length) {
            setTimeout(typing, 20);
        }
    }
    typing();
}

