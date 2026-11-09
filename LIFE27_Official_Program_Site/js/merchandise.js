// (() => {
//   const salesNumbers = [
//     { label: "Sales contact 1", phone: "2349135417223" },
//     { label: "Sales contact 2", phone: "2348110788544" }
//   ];

//   document.querySelectorAll("[data-qty]").forEach(button => {
//     button.addEventListener("click", () => {
//       const input = document.getElementById(button.dataset.qty);
//       if (!input) return;
//       const current = Number(input.value) || 1;
//       input.value = Math.min(20, Math.max(1, current + Number(button.dataset.step)));
//     });
//   });

//   document.querySelectorAll(".order-button").forEach(button => {
//     button.addEventListener("click", () => {
//       const product = button.dataset.product;
//       const price = Number(button.dataset.price);
//       const quantityInput = document.getElementById(button.dataset.qty);
//       const quantity = Math.min(20, Math.max(1, Number(quantityInput?.value) || 1));
//       if (quantityInput) quantityInput.value = quantity;
//       const size = button.dataset.size ? document.getElementById(button.dataset.size)?.value : "";
//       if (button.dataset.size && !size) {
//         window.showToast("Please select your polo size first.");
//         document.getElementById(button.dataset.size)?.focus();
//         return;
//       }
//       const total = price * quantity;
//       const message = [
//         "Good day. I would like to order LIFE’27 official merchandise.",
//         "",
//         `Product: ${product}`,
//         ...(size ? [`Polo size: ${size}`] : []),
//         `Quantity: ${quantity}`,
//         `Unit price: ₦${price.toLocaleString("en-NG")}`,
//         `Total: ₦${total.toLocaleString("en-NG")}`,
//         "",
//         "Please send me the payment and collection details. Thank you."
//       ].join("\n");

//       // Let the customer choose either of the two supplied sales contacts.
//       const choice = window.confirm("Press OK to contact 0913 541 7223.\nPress Cancel to contact 0811 078 8544.");
//       const contact = choice ? salesNumbers[0] : salesNumbers[1];
//       const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
//       window.open(url, "_blank", "noopener");
//     });
//   });
// })();


(() => {
  // One official LIFE’27 merchandise sales WhatsApp number
  const salesNumber = "2348110788544";

  // Quantity increase and decrease controls
  document.querySelectorAll("[data-qty]").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.qty);
      if (!input) return;

      const current = Number(input.value) || 1;

      input.value = Math.min(
        20,
        Math.max(1, current + Number(button.dataset.step))
      );
    });
  });

  // Merchandise ordering
  document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      const price = Number(button.dataset.price);

      const quantityInput = document.getElementById(button.dataset.qty);

      const quantity = Math.min(
        20,
        Math.max(1, Number(quantityInput?.value) || 1)
      );

      if (quantityInput) quantityInput.value = quantity;

      // Get selected polo size (if applicable)
      const size = button.dataset.size
        ? document.getElementById(button.dataset.size)?.value
        : "";

      // Require polo size selection
      if (button.dataset.size && !size) {
        window.showToast("Please select your polo size first.");
        document.getElementById(button.dataset.size)?.focus();
        return;
      }

      // Calculate total
      const total = price * quantity;

      // Generate customised WhatsApp message
      const message = [
        "Good day LIFE’27 Merchandise Sales Team!",
        "",
        "I would like to place an order for official LIFE’27 merchandise.",
        "",
        "ORDER DETAILS",
        "--------------------------",
        `Product: ${product}`,
        ...(size ? [`Polo Size: ${size}`] : []),
        `Quantity: ${quantity}`,
        `Unit Price: ₦${price.toLocaleString("en-NG")}`,
        `Total Amount: ₦${total.toLocaleString("en-NG")}`,
        "--------------------------",
        "",
        "Please provide the payment details and collection information.",
        "",
        "Thank you!"
      ].join("\n");

      // Open WhatsApp with the customised message
      const whatsappURL =
        `https://wa.me/${salesNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  });
})();
