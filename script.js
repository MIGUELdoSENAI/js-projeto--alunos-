// ===================== SELETORES =====================
const menuIcon = document.querySelector("#menu-icon");
const navList = document.querySelector(".navlist");
const navLinks = document.querySelectorAll(".navlist a");
const sections = document.querySelectorAll("main section");
const contactForm = document.getElementById("contactForm");
const thankYouMessage = document.getElementById("thankYouMessage");

// ===================== MENU MOBILE =====================
if (menuIcon && navList) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
    document.body.style.overflow = navList.classList.contains("open")
      ? "hidden"
      : "auto";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navList.classList.remove("open");
      document.body.style.overflow = "auto";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      menuIcon.classList.remove("bx-x");
      navList.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  });
}

// ===================== TEMA CLARO/ESCURO =====================
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
  localStorage.setItem("theme", theme);
}

function toggleMode() {
  const isLight = document.documentElement.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
}

// Carrega tema salvo ou usa light como padrão
(function initTheme() {
  const saved = localStorage.getItem("theme");
  applyTheme(saved ? saved : "light");
})();

// ===================== LINK ATIVO POR CLIQUE =====================
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

// ===================== LINK ATIVO POR SCROLL =====================
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      const match = document.querySelector(`.navlist a[href="#${id}"]`);
      if (match) {
        navLinks.forEach((link) => link.classList.remove("active"));
        match.classList.add("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===================== ANIMAÇÃO DE ENTRADA =====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); // roda só uma vez
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => revealObserver.observe(section));

// ===================== FORMULÁRIO =====================
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit");
    submitBtn.value = "Enviando...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        thankYouMessage.style.display = "flex";
        submitBtn.value = "Enviar mensagem";
        submitBtn.disabled = false;

        setTimeout(() => {
          thankYouMessage.style.display = "none";
        }, 5000);
      } else {
        alert("Erro ao enviar formulário. Tente novamente.");
        submitBtn.value = "Enviar mensagem";
        submitBtn.disabled = false;
      }
    } catch (err) {
      alert("Erro na conexão. Verifique sua internet e tente novamente.");
      submitBtn.value = "Enviar mensagem";
      submitBtn.disabled = false;
    }
  });
}

// ===================== VOLTAR AO TOPO =====================
const topBtn = document.querySelector(".top a");

if (topBtn) {
  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// ===================== ANIMAÇÃO DE DIGITAÇÃO =====================
const nameEl = document.getElementById("name");
const fullName = "Miguel";
let index = 0;
let typing = true;
let nameColor = "var(--title-color)";

function animateName() {
  if (typing) {
    if (index < fullName.length) {
      nameEl.textContent = fullName.slice(0, index + 1);
      index++;
    } else {
      typing = false;
    }
  } else {
    if (index > 1) {
      nameEl.textContent = fullName.slice(0, index - 1);
      index--;
    } else {
      typing = true;
      // Alterna cor entre title-color e accent-color
      nameColor =
        nameColor === "var(--title-color)"
          ? "var(--accent-color)"
          : "var(--title-color)";
      nameEl.style.color = nameColor;
    }
  }
  setTimeout(animateName, 350);
}

// Inicia quando a página carregar
window.addEventListener("load", animateName);
