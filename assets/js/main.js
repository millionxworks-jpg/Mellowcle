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

const newsArticles = [
  {
    id: 'sugar-skyline-release',
    date: '2026.06.21',
    datetime: '2026-06-21',
    category: 'Release',
    title: '新曲「○○○」を公開しました',
    body: [
      '新曲「○○○」をYouTubeで公開しました。',
      '歌ってみた用素材は、準備が整い次第DOWNLOADに追加予定です。'
    ],
    image: './assets/img/jacket-01.svg',
    link: 'https://www.youtube.com/'
  },
  {
    id: 'cover-assets-added',
    date: '2026.06.10',
    datetime: '2026-06-10',
    category: 'Download',
    title: '歌ってみた用素材を追加しました',
    body: [
      '歌ってみた投稿に使えるinst、歌詞、サムネイル素材を追加しました。',
      '投稿前に利用規約をご確認ください。'
    ],
    image: './assets/img/hero-visual.svg',
    link: '#download'
  },
  {
    id: 'booth-goods',
    date: '2026.05.28',
    datetime: '2026-05-28',
    category: 'Event',
    title: 'イベント頒布グッズのBOOTH通販を開始',
    body: [
      'イベントで頒布したグッズの通販を開始しました。最新の在庫状況はBOOTHをご確認ください。'
    ],
    image: './assets/img/goods-main.svg',
    link: 'https://booth.pm/'
  },
  {
    id: 'guideline-update',
    date: '2026.05.12',
    datetime: '2026-05-12',
    category: 'Info',
    title: '二次利用ガイドラインを更新しました',
    body: [
      'キー変更、動画素材の加工、収益化についてFAQを追加しました。投稿前にOK / NG / CREDITをご確認ください。'
    ],
    image: '',
    link: '#guideline'
  }
];

const songs = [
  {
    title: '○○○',
    image: './assets/img/jacket-01.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-02.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-03.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-01.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-02.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-03.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-01.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-02.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-03.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-01.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-02.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-03.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-01.svg',
    download: '#'
  },
  {
    title: '○○○',
    image: './assets/img/jacket-02.svg',
    download: '#'
  }
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
  const textSongs = songs.slice(10);

  const cardMarkup = cardSongs
    .map(
      (song) => `
        <a class="song-item" href="${song.download}" download>
          <img src="${song.image}" alt="${song.title} jacket" />
          <h3>${song.title}</h3>
        </a>
      `
    )
    .join('');

  const textListMarkup = textSongs
    .map(
      (song) => `
        <li><a href="${song.download}" download>${song.title}</a></li>
      `
    )
    .join('');

  songList.innerHTML = `
    <div class="song-card-grid" aria-label="画像付き楽曲カード">
      ${cardMarkup}
    </div>
    ${
      textSongs.length
        ? `
          <div class="song-text-panel">
            <ul class="song-text-list" aria-label="11曲目以降の楽曲リンク">
              ${textListMarkup}
            </ul>
          </div>
        `
        : ''
    }
  `;
};

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
  soundToggle.setAttribute('aria-pressed', String(!isOn));
  soundToggle.textContent = isOn ? 'Sound Off' : 'Sound On';

  if (heroVideo) {
    const muteValue = isOn ? '1' : '0';
    heroVideo.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${muteValue}&loop=1&playlist=dQw4w9WgXcQ&controls=0&playsinline=1&rel=0&modestbranding=1`;
  }
});

copyButton?.addEventListener('click', async () => {
  const text = document.getElementById('creditText')?.innerText || '';

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    copyStatus.textContent = 'コピーしました。';
  } catch {
    const range = document.createRange();
    const creditText = document.getElementById('creditText');
    if (creditText) {
      range.selectNodeContents(creditText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    const copied = document.execCommand('copy');
    copyStatus.textContent = copied ? 'コピーしました。' : '選択された文面をコピーしてください。';
  }

  window.setTimeout(() => {
    copyStatus.textContent = '';
  }, 2600);
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
