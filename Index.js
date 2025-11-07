const iris = document.querySelector('.iris');
const pupil = document.querySelector('.pupil');
const crystalBall = document.querySelector('.crystal-ball');
const fill = document.querySelector('.loading-bar-fill');
const percentage = document.querySelector('.loading-bar-percentage');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');


document.addEventListener('mousemove', e => {
  const ballRect = crystalBall.getBoundingClientRect();
  const centerX = ballRect.left + ballRect.width / 2;
  const centerY = ballRect.top + ballRect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const maxOffset = 12;
  const angle = Math.atan2(dy, dx);
  const offsetX = Math.cos(angle) * Math.min(Math.hypot(dx, dy), maxOffset);
  const offsetY = Math.sin(angle) * Math.min(Math.hypot(dx, dy), maxOffset);

  iris.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});


const assets = [
  "image1.png",
  "image2.png",
  "video1.mp4",
  "sound1.mp3",
  "script1.js",
  "data.json"
];

let loadedAssets = 0;

assets.forEach(asset => {
  const loadTime = Math.random() * 3000 + 1500; 
  setTimeout(() => {
    loadedAssets++;
    updateProgress();
  }, loadTime);
});

function updateProgress() {
  const percent = (loadedAssets / assets.length) * 100;
  fill.style.width = percent + '%';
  percentage.textContent = Math.floor(percent) + '%';

  if (loadedAssets === assets.length) {
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.getElementById('pagecontent').style.display = 'block';
    }, 200);
  }
}

document.querySelectorAll('.symbol-button').forEach(button => {
  button.addEventListener('click', () => {
    const link = button.getAttribute('data-link');
    if (link) window.open(link, '_blank');
  });
});

document.querySelectorAll('.glassbutton[data-link]').forEach(button => {
    button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});
