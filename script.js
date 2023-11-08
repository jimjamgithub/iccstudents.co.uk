const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? 1 : 0;
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

const articleTitles = document.querySelectorAll('.article-title');

articleTitles.forEach((articleTitle) => {
  articleTitle.addEventListener('click', () => {
    const article = articleTitle.parentNode;
    const articleContent = article.querySelector('.article-content');
    const articleIcon = articleTitle.querySelector('i');

    article.classList.toggle('is-open');
    articleIcon.classList.toggle('rotate');

    if (article.classList.contains('is-open')) {
      articleContent.style.maxHeight = articleContent.scrollHeight + 'px';
    } else {
      articleContent.style.maxHeight = 0;
    }
  });
});

document.getElementById('searchbtn').addEventListener('click', function(event) {
  event.preventDefault();
  const value = document.getElementById('searchbar').value;
  window.location.href = '/articles/?search=' + value;
});

if (window.location.pathname == '/articles/') {
  const url = new URLSearchParams(window.location.search);
  const search = url.get('search');
  if (search !== null) {
    const articles = document.querySelectorAll('.article-title');
    let scrolledToElement = false;
    for (let i = 0; i < articles.length; i++) {
      const title = articles[i].innerHTML.split("<")[0];
      const titled = title.toLowerCase().replace(/\s+/g, "");
      if (titled.includes(search.toLowerCase().replace(/\s+/g, ""))) {
        const top = articles[i].parentElement.offsetTop - 300;
        window.scrollTo({ top: top, behavior: 'smooth' });
        scrolledToElement = true;
        articles[i].parentElement.parentElement.classList.remove("article-container");
        articles[i].parentElement.parentElement.classList.add("high-animation");
        break;
      }
    }
  }
}

if (window.location.pathname === '/articles/') {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');

  if (category) {
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
      if (article.id.toLocaleLowerCase() !== category) {
        article.parentElement.style.display = 'none';
      }
    });
  }
}

const bars = document.querySelector(".bars");

bars.addEventListener("click", function() {
  if (bars.classList.contains("active")) {
    bars.style.transform = "translateX(0vw)";
    bars.classList.remove("active");
  } else {
    bars.style.transform = "translateX(80vw)";
    bars.classList.add("active");
  }
});