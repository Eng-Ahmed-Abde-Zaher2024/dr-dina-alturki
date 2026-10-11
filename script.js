'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  if (preloader) preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

// إغلاق القائمة عند الضغط على أي رابط عادي (غير زر الدروب داون)
document.querySelectorAll(".navbar-link:not(.dropdown-btn)").forEach(link => {
  link.addEventListener("click", () => {
    if (navbar) navbar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  });
});

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    if (header) header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);
window.addEventListener("load", revealElementOnScroll);

// ===== Active Nav Link Underline on Scroll (ScrollSpy) =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-link");
const dropdownLinks = document.querySelectorAll(".dropdown-link");

const highlightNavOnScroll = function () {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${sectionId}` ||
            (link.classList.contains("dropdown-btn") && ["services", "conditions", "steps", "features"].includes(sectionId))) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
      dropdownLinks.forEach(dLink => {
        if (dLink.getAttribute("href") === `#${sectionId}`) {
          dLink.classList.add("active");
        } else {
          dLink.classList.remove("active");
        }
      });
    }
  });

  // تفعيل الرئيسية عند التواجد بأعلى الصفحة
  if (scrollY < 100) {
    navLinks.forEach(link => link.classList.remove("active"));
    const homeLink = document.querySelector('.navbar-link[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
  }
};

window.addEventListener("scroll", highlightNavOnScroll);
window.addEventListener("load", highlightNavOnScroll);

// ===== Mobile Dropdown Toggle =====
const dropdownItem = document.querySelector("[data-dropdown]");
if (dropdownItem) {
  const dropdownBtn = dropdownItem.querySelector(".dropdown-btn");
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", function (e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        dropdownItem.classList.toggle("active");
      }
    });
  }
}

// إغلاق الموبايل منيو عند الضغط على أي رابط في الدروب داون
dropdownLinks.forEach(dLink => {
  dLink.addEventListener("click", () => {
    if (navbar && navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.classList.remove("nav-active");
    }
    if (dropdownItem) dropdownItem.classList.remove("active");
  });
});

// نموذج الحجز عبر واتساب
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("f-name").value.trim();
    const phone = document.getElementById("f-phone").value.trim();
    const branch = document.getElementById("f-branch").value;
    const reason = document.getElementById("f-reason").value.trim();
    const notes = document.getElementById("f-notes").value.trim();

    if (!name || !phone || !branch) {
      alert("من فضلك أكمل الاسم ورقم الهاتف والفرع");
      return;
    }

    const lines = [
      "طلب موعد - مركز PMC",
      "----------------",
      "الاسم: " + name,
      "رقم الهاتف: " + phone,
      "الفرع: " + branch,
      reason ? "الحالة أو سبب الزيارة: " + reason : null,
      notes ? "ملاحظات: " + notes : null
    ].filter(Boolean);

    const msg = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/201066185832?text=" + msg, "_blank");
  });
}
