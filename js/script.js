// 사진 버튼을 누르면 원본 크기의 팝업으로 보여줍니다.
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = document.querySelector("#closeLightbox");

document.querySelectorAll(".photo-button").forEach((button) => {
  button.addEventListener("click", () => {
    const imagePath = button.dataset.full || button.querySelector("img")?.src;
    if (!imagePath) return;
    lightboxImage.src = imagePath;
    lightbox.showModal();
  });
});

closeLightbox.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  // 사진 바깥의 어두운 영역을 누르면 팝업을 닫습니다.
  if (event.target === lightbox) lightbox.close();
});

// 계좌번호 복사 후 안내 팝업을 표시합니다.
const copyDialog = document.querySelector("#copyDialog");
const copyMessage = document.querySelector("#copyMessage");

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const accountNumber = button.dataset.copy;
    const owner = button.dataset.owner || "계좌번호";
    try {
      await navigator.clipboard.writeText(accountNumber);
      copyMessage.textContent = `${owner} 계좌번호가 복사되었습니다.`;
    } catch (error) {
      // 로컬 파일 등에서 클립보드 권한이 막히면 번호를 안내합니다.
      copyMessage.textContent = `${owner} 계좌번호: ${accountNumber}`;
    }
    copyDialog.showModal();
  });
});

document.querySelector("#closeCopy").addEventListener("click", () => copyDialog.close());
