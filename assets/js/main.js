const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = document.querySelectorAll('.site-nav a');
const soundToggle = document.querySelector('[data-sound-toggle]');
const heroVideo = document.querySelector('[data-hero-video]');
const copyButton = document.querySelector('[data-copy-credit]');
const copyStatus = document.querySelector('[data-copy-status]');
const newsList = document.querySelector('[data-news-list]');
const songList = document.querySelector('[data-song-list]');
const newsModal = document.querySelector('[data-news-modal]');
const modalPanel = document.querySelector('.modal-panel');
const downloadModal = document.querySelector('[data-download-modal]');
const downloadTitle = document.querySelector('[data-download-title]');
const downloadLinks = document.querySelector('[data-download-links]');



const songs = [
    {
    title: 'Sugar (2026 Version)',
     image: './assets/download/Sugar2026.jpg',
  youtube: 'https://www.youtube.com/watch?v=__CN3wm6p8g',
  drive: 'https://drive.google.com/drive/folders/16oQDGiLWDqKlEVNL_H7pFcVFB81H21qF'
  },
  {
     title: 'kawaii100%',
  image: './assets/download/KAWAII100.png',
 youtube: 'https://www.youtube.com/watch?v=w44WoaDCFJQ',
  drive: 'https://drive.google.com/drive/folders/1S81fnm-AYr5usZpcuc0O2FI-FZGZqAwp'
  },
  {
    title: 'telephone',
    image: './assets/download/Telephone.png',
  youtube: 'https://www.youtube.com/watch?v=o0SNzFbNo4g',
  drive: 'https://drive.google.com/drive/folders/1Xn4_WdTWgig4Ym7AKp1ZChdF19o55Ofi'
  },
  {
    title: 'Maos para cima!',
    image: './assets/download/Maos para cima!.png',
  youtube: 'https://www.youtube.com/watch?v=gjbguYbJQNo',
  drive: 'https://drive.google.com/drive/folders/1y8l5nt1_c0CuEzxwQDr1i1XVeWoEi4wn'
  },
  {
    title: 'ダーリンダーリン',
    image: './assets/download/Darlingdarling.png',
  youtube: 'https://www.youtube.com/watch?v=-LEB8vHLQbI',
  drive: 'https://drive.google.com/drive/folders/1RCaQSTD3Y03g9zhZwEbapQNa3OKrxLYv'
  },
  {
    title: 'On&On',
    image: './assets/download/On&On.png',
  youtube: 'https://www.youtube.com/watch?v=vmPrBtCbxK0',
  drive: 'https://drive.google.com/drive/folders/1GdnmtB2LV2kgloQ6cvM3Ihvf8lPeAgY1'
  },
  {
    title: 'Where shall we go?',
    image: './assets/download/Where_shall_we_go.png',
   youtube: 'https://www.youtube.com/watch?v=jyI9Xn67SHA',
  drive: 'https://drive.google.com/drive/folders/1xE3WVw0pHkmuFDMzWNGUJ9TGh_Y23Qme'
  },
  {
    title: 'Magic',
     image: './assets/download/Magic.png',
  youtube: 'https://www.youtube.com/watch?v=tvhAVNJD6f8',
  drive: 'https://drive.google.com/drive/folders/1dWPbBbucUxc1po64iLGtwLzSh34zijEg'
  },
  {
    title: 'Sugar',
    image: './assets/download/Sugar.png',
  youtube: 'https://www.youtube.com/watch?v=zaCL9JWs-5Q',
  drive: 'https://drive.google.com/drive/folders/1ool8p1yR4QZYyTAlWmlR3xE8fUbatMBa'
  },
  {
    title: 'レモンスカッシュ',
     image: './assets/download/lemonsquash.png',
  youtube: 'https://www.youtube.com/watch?v=LNYIu5YnY7A',
  drive: 'https://drive.google.com/drive/folders/1fXzaYjpIwim8eLedpQSh5QQZoBPVDcXQ'
  },
];

const renderNews = () => {
  if (!newsList) return;

  newsList.innerHTML = newsArticles
    .map(
      (article) => `
        <article class="news-item">
          <time datetime="${article.datetime}">${article.date}</time>
          <span>${article.category}</span>
          <button type="button" data-news-id="${article.id}">${article.title}</button>
        </article>
      `
    )
    .join('');
};

const renderSongs = () => {
  if (!songList) return;

  const cardSongs = songs.slice(0, 10);

  const cardMarkup = cardSongs
    .map(
      (song) => `
        <article class="song-item">
          <button class="song-jacket-button" type="button" data-download-id="${song.title}">
            <img src="${song.image}" alt="${song.title} jacket" />
          </button>
          <h3>${song.title}</h3>
        </article>
      `
    )
    .join('');

  songList.innerHTML = `
  <div class="song-card-grid" aria-label="人気楽曲">
    ${cardMarkup}
  </div>
`;
};

songList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-download-id]');
  if (!button) return;

  const song = songs.find((item) => item.title === button.dataset.downloadId);
  if (!song || !downloadModal || !downloadTitle || !downloadLinks) return;

  downloadTitle.textContent = song.title;

 downloadLinks.innerHTML = `
  <a href="${song.youtube}" target="_blank" rel="noreferrer">YouTube</a>
  <a href="${song.drive}" target="_blank" rel="noreferrer">素材DL (Drive)</a>
`;

  downloadModal.classList.add('is-open');
  downloadModal.setAttribute('aria-hidden', 'false');
});

const openNewsModal = (article) => {
  if (!newsModal || !article) return;

  newsModal.querySelector('[data-modal-date]').textContent = article.date;
  newsModal.querySelector('[data-modal-date]').setAttribute('datetime', article.datetime);
  newsModal.querySelector('[data-modal-category]').textContent = article.category;
  newsModal.querySelector('[data-modal-title]').textContent = article.title;
  newsModal.querySelector('[data-modal-body]').innerHTML = article.body.map((text) => `<p>${text}</p>`).join('');

  const imageWrap = newsModal.querySelector('[data-modal-image]');
  imageWrap.innerHTML = article.image ? `<img src="${article.image}" alt="" />` : '';
  imageWrap.hidden = !article.image;

  const modalLink = newsModal.querySelector('[data-modal-link]');
  if (article.link) {
    modalLink.href = article.link;
    modalLink.hidden = false;
  } else {
    modalLink.hidden = true;
  }

  newsModal.classList.add('is-open');
  newsModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalPanel?.focus();
};

const closeNewsModal = () => {
  if (!newsModal) return;
  newsModal.classList.remove('is-open');
  newsModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

renderNews();
renderSongs();

document.querySelectorAll('[data-download-close]').forEach((button) => {
  button.addEventListener('click', () => {
    downloadModal?.classList.remove('is-open');
    downloadModal?.setAttribute('aria-hidden', 'true');
  });
});

newsList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-news-id]');
  if (!button) return;
  const article = newsArticles.find((item) => item.id === button.dataset.newsId);
  openNewsModal(article);
});

newsModal?.addEventListener('click', (event) => {
  const clickedCloseButton = event.target.closest('.modal-close');
  const clickedBackdrop = event.target.classList.contains('modal-backdrop') || event.target === newsModal;

  if (clickedCloseButton || clickedBackdrop) {
    closeNewsModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && newsModal?.classList.contains('is-open')) {
    closeNewsModal();
  }
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

soundToggle?.addEventListener('click', () => {
  const isOn = soundToggle.getAttribute('aria-pressed') === 'true';
  const nextIsOn = !isOn;

  soundToggle.setAttribute('aria-pressed', String(nextIsOn));
  soundToggle.textContent = nextIsOn ? 'Sound Off' : 'Sound On';

  if (heroVideo) {
    heroVideo.muted = !nextIsOn;
    heroVideo.volume = nextIsOn ? 1 : 0;

    if (nextIsOn) {
      heroVideo.play().catch(() => {
        soundToggle.textContent = 'Tap to Sound On';
      });
    }
  }
});



document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const modal = document.getElementById("video-modal");
const player = document.getElementById("video-player");
const closeBtn = document.getElementById("close-video");

document.querySelectorAll(".work-card[data-video]").forEach(card => {
  card.addEventListener("click", () => {
    const video = card.dataset.video;

    console.log("読み込む動画:", video);

    player.src = video;
    player.load();

    modal.classList.remove("hidden");

    player.play().catch(error => {
      console.log("動画再生エラー:", error);
    });
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  player.pause();
  player.currentTime = 0;
});

const worksCards = document.querySelectorAll(".work-modal-trigger");
const worksModal = document.querySelector(".works-modal");
worksCards.forEach(card => {
  card.addEventListener("click", () => {
    document.querySelector("#works-title").textContent = card.dataset.title;
    document.querySelector("#works-artist").textContent = card.dataset.artist;
    document.querySelector("#works-role").textContent = card.dataset.role;
    document.querySelector("#works-link").href = card.dataset.url;

    worksModal.classList.add("is-open");
  });
});

document.querySelectorAll("[data-works-close]").forEach((button) => {
  button.addEventListener("click", () => {
    worksModal.classList.remove("is-open");
    worksModal.setAttribute("aria-hidden", "true");
  });
});
const tabs = document.querySelectorAll(".lang-tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    copyStatus.textContent = ''; // ← ここ！

    if (tab.dataset.lang === "en") {
      document.body.classList.add("lang-en");
    } else {
      document.body.classList.remove("lang-en");
    }
  });
});
copyButton?.addEventListener('click', async () => {
  const selector = document.body.classList.contains('lang-en')
    ? '#guideline .credit-text.lang-en'
    : '#guideline .credit-text.lang-ja';

  const text = document.querySelector(selector)?.innerText || '';

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = document.body.classList.contains('lang-en')
  ? 'Credit copied!'
  : 'コピーしました';
  } catch {
    copyStatus.textContent = document.body.classList.contains('lang-en')
  ? 'Credit Copy failed'
  : 'コピーに失敗しました';
  }

  window.setTimeout(() => {
    copyStatus.textContent = '';
  }, 2600);
});