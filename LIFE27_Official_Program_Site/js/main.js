document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const toast = document.getElementById("toast");
  let toastTimer;
  window.showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const account = "2199602304";
  document.getElementById("copyAccount")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(account);
      window.showToast("Account number copied.");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = account; document.body.appendChild(temp); temp.select();
      document.execCommand("copy"); temp.remove();
      window.showToast("Account number copied.");
    }
  });

  // The receipt contact was supplied as 0812779085. Confirm the digits with the organisers before publishing.
  const receiptPhone = "2348123779085";
  const receiptMessage = "Good day. I have made a financial contribution towards LIFE’27. Please find my payment receipt attached. Thank you.";
  const receiptUrl = `https://wa.me/${receiptPhone}?text=${encodeURIComponent(receiptMessage)}`;
  const receiptLink = document.getElementById("receiptWhatsapp");
  if (receiptLink) receiptLink.href = receiptUrl;
  const footerReceipt = document.getElementById("footerFundraisingContact");
  if (footerReceipt) footerReceipt.href = receiptUrl;

  const merchPhoneOne = "2348110788544";
  const footerMerch = document.getElementById("footerMerchContact");
  if (footerMerch) footerMerch.href = `https://wa.me/${merchPhoneOne}?text=${encodeURIComponent("Good day. I would like to make an enquiry about LIFE’27 merchandise.")}`;
});