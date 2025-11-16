const items = document.querySelectorAll(".gallery-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

items.forEach(item => {
    item.classList.add("fade-in");
    observer.observe(item);
});
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");
const backdrop = document.querySelector(".lightbox-backdrop");

document.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.querySelector(".caption").innerText;

        lightboxImage.src = img.src;
        lightboxCaption.innerText = caption;

        lightbox.classList.add("active");
    });
});
const closeLightbox = () => {
    lightbox.classList.remove("active");
};

closeBtn.addEventListener("click", closeLightbox);
backdrop.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});
