
(() => {

  // =========================================
  // 1. ELEMENTS AND CONFIGURATION
  // =========================================

  const canvas = document.getElementById("flyerCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const template = new Image();

  template.src = "assets/images/templates/attendance-template.jpg";


  // PHOTO STATE

  let uploadedPhoto = null;

  let currentPhotoZoom = 1;

  let photoOffsetX = 0;
  let photoOffsetY = 0;


  // DRAG STATE

  let isDraggingPhoto = false;

  let lastPointerX = 0;
  let lastPointerY = 0;


  // PHOTO FRAME COORDINATES

  const PHOTO_FRAME = {
    x: 430,
    y: 550,
    width: 372,
    height: 510
  };


  // PHOTO MOVEMENT SETTINGS

  const PHOTO_MOVE_STEP = 20;


  // =========================================
  // 2. HTML ELEMENTS
  // =========================================

  const nameInput = document.getElementById("attendeeName");

  const photoInput = document.getElementById("attendeePhoto");

  const status = document.getElementById("flyerStatus");

  const downloadButton = document.getElementById("downloadFlyer");

  const resetButton = document.getElementById("resetFlyer");


  // ZOOM CONTROLS

  const zoomControls = document.getElementById("photoZoomControls");

  const photoZoom = document.getElementById("photoZoom");

  const zoomIn = document.getElementById("zoomIn");

  const zoomOut = document.getElementById("zoomOut");

  const zoomValue = document.getElementById("zoomValue");

  const resetZoom = document.getElementById("resetZoom");


  // POSITION CONTROLS

  const positionControls = document.getElementById("photoPositionControls");

  const previewDragHint = document.getElementById("previewDragHint");


  // =========================================
  // 3. UPDATE ZOOM CONTROLS
  // =========================================

  function updateZoomControls() {

    if (!photoZoom || !zoomValue) return;

    photoZoom.value = currentPhotoZoom;

    zoomValue.textContent =
      Math.round(currentPhotoZoom * 100) + "%";

    if (zoomOut) {
      zoomOut.disabled = currentPhotoZoom <= 1;
    }

    if (zoomIn) {
      zoomIn.disabled = currentPhotoZoom >= 3;
    }

  }


  // =========================================
  // 4. UPDATE PHOTO ZOOM
  // =========================================

  function updatePhotoZoom(value) {

    const previousZoom = currentPhotoZoom;

    currentPhotoZoom = Math.min(
      3,
      Math.max(1, Number(value) || 1)
    );

    // Keep the existing position when possible.
    // The drawing function will restrict movement
    // to the available photo boundaries.

    updateZoomControls();

    render();

  }


  // =========================================
  // 5. CALCULATE PHOTO BOUNDARIES
  // =========================================

  function getPhotoBounds(img, w, h, zoom) {

    const scale = Math.max(
      w / img.width,
      h / img.height
    );

    const sw = w / (scale * zoom);

    const sh = h / (scale * zoom);

    return {

      scale,

      sw,

      sh,

      maxOffsetX: (img.width - sw) * scale / 2,

      maxOffsetY: (img.height - sh) * scale / 2

    };

  }


  // =========================================
  // 6. DRAW PHOTO WITH ZOOM AND POSITION
  // =========================================

  function drawCover(img, x, y, w, h, zoom = 1) {

    const bounds = getPhotoBounds(img, w, h, zoom);

    const scale = bounds.scale;

    const sw = bounds.sw;

    const sh = bounds.sh;


    // Restrict horizontal movement

    photoOffsetX = Math.max(
      -bounds.maxOffsetX,
      Math.min(bounds.maxOffsetX, photoOffsetX)
    );


    // Restrict vertical movement

    photoOffsetY = Math.max(
      -bounds.maxOffsetY,
      Math.min(bounds.maxOffsetY, photoOffsetY)
    );


    // Calculate crop coordinates

    const sx = Math.max(
      0,
      Math.min(
        img.width - sw,
        (img.width - sw) / 2 - photoOffsetX / scale
      )
    );


    const sy = Math.max(
      0,
      Math.min(
        img.height - sh,
        (img.height - sh) / 2 - photoOffsetY / scale
      )
    );


    ctx.save();


    // Keep photo inside its original frame

    ctx.beginPath();

    ctx.rect(x, y, w, h);

    ctx.clip();


    // Draw the positioned photograph

    ctx.drawImage(
      img,
      sx,
      sy,
      sw,
      sh,
      x,
      y,
      w,
      h
    );


    ctx.restore();

  }


  // =========================================
  // 7. RENDER COMPLETE FLYER
  // =========================================

  function render() {

    if (!template.complete || !template.naturalWidth) {
      return;
    }


    // Clear canvas

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    // Draw original LIFE'27 template

    ctx.drawImage(
      template,
      0,
      0,
      canvas.width,
      canvas.height
    );


    // Draw attendee photograph

    if (uploadedPhoto) {

      drawCover(
        uploadedPhoto,
        PHOTO_FRAME.x,
        PHOTO_FRAME.y,
        PHOTO_FRAME.width,
        PHOTO_FRAME.height,
        currentPhotoZoom
      );

    }


    // Draw attendee name

    const name = (
      nameInput.value || "YOUR NAME HERE"
    ).trim().toUpperCase();


    ctx.save();

    ctx.fillStyle = "#10285B";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";


    let fontSize = 38;

    ctx.font = `800 ${fontSize}px Montserrat, Arial, sans-serif`;


    while (
      ctx.measureText(name).width > 500 &&
      fontSize > 19
    ) {

      fontSize -= 1;

      ctx.font = `800 ${fontSize}px Montserrat, Arial, sans-serif`;

    }


    ctx.fillText(name, 620, 1187, 510);


    ctx.restore();

  }


  // =========================================
  // 8. TEMPLATE LOADED
  // =========================================

  template.onload = render;


  template.onerror = () => {

    if (status) {

      status.textContent =
        "The attendance template could not be loaded. Check the template image file.";

    }

  };


  // =========================================
  // 9. LIVE NAME UPDATE
  // =========================================

  nameInput.addEventListener("input", render);


  // =========================================
  // 10. SHOW AND HIDE PHOTO CONTROLS
  // =========================================

  function showPhotoControls() {

    zoomControls.hidden = false;

    positionControls.hidden = false;

    canvas.classList.add("photo-draggable");

    if (previewDragHint) {
      previewDragHint.hidden = false;
    }

  }


  function hidePhotoControls() {

    zoomControls.hidden = true;

    positionControls.hidden = true;

    canvas.classList.remove("photo-draggable");

    canvas.classList.remove("photo-dragging");

    if (previewDragHint) {
      previewDragHint.hidden = true;
    }

  }


  // =========================================
  // 11. RESET PHOTO STATE
  // =========================================

  function resetPhotoState() {

    currentPhotoZoom = 1;

    photoOffsetX = 0;

    photoOffsetY = 0;

    isDraggingPhoto = false;

    updateZoomControls();

  }


  // =========================================
  // 12. UPLOAD PHOTO
  // =========================================

  photoInput.addEventListener("change", () => {

    const file = photoInput.files && photoInput.files[0];


    if (!file) {

      uploadedPhoto = null;

      resetPhotoState();

      hidePhotoControls();

      render();

      return;

    }


    // Validate file type

    if (!file.type.startsWith("image/")) {

      status.textContent =
        "Please choose an image file.";

      photoInput.value = "";

      return;

    }


    // Validate file size

    if (file.size > 10 * 1024 * 1024) {

      status.textContent =
        "Image is larger than 10MB. Please choose a smaller photo.";

      photoInput.value = "";

      return;

    }


    const reader = new FileReader();


    reader.onload = () => {

      const img = new Image();


      img.onload = () => {

        uploadedPhoto = img;


        // Reset zoom and positioning

        resetPhotoState();


        // Show controls

        showPhotoControls();


        status.textContent =
          "Photo added. Drag your photo or use the controls to position it.";


        render();

      };


      img.onerror = () => {

        status.textContent =
          "Could not read this image. Try another photo.";

      };


      img.src = reader.result;

    };


    reader.onerror = () => {

      status.textContent =
        "Could not load this image. Please try again.";

    };


    reader.readAsDataURL(file);

  });


  // =========================================
  // 13. ZOOM SLIDER
  // =========================================

  photoZoom.addEventListener("input", event => {

    updatePhotoZoom(event.target.value);

  });


  // =========================================
  // 14. ZOOM IN
  // =========================================

  zoomIn.addEventListener("click", () => {

    updatePhotoZoom(currentPhotoZoom + 0.15);

  });


  // =========================================
  // 15. ZOOM OUT
  // =========================================

  zoomOut.addEventListener("click", () => {

    updatePhotoZoom(currentPhotoZoom - 0.15);

  });


  // =========================================
  // 16. RESET ZOOM ONLY
  // =========================================

  resetZoom.addEventListener("click", () => {

    updatePhotoZoom(1);

  });


  // =========================================
  // 17. MOVE PHOTO WITH DIRECTIONAL BUTTONS
  // =========================================

  function movePhoto(direction, distance = PHOTO_MOVE_STEP) {

    if (!uploadedPhoto) return;


    switch (direction) {

      case "up":

        photoOffsetY -= distance;

        break;


      case "down":

        photoOffsetY += distance;

        break;


      case "left":

        photoOffsetX -= distance;

        break;


      case "right":

        photoOffsetX += distance;

        break;


      case "reset":

        photoOffsetX = 0;

        photoOffsetY = 0;

        break;

    }


    render();

  }


  // =========================================
  // 18. POSITION BUTTON EVENTS
  // =========================================

  if (positionControls) {

    positionControls
      .querySelectorAll("[data-photo-move]")
      .forEach(button => {

        button.addEventListener("click", () => {

          movePhoto(button.dataset.photoMove);

        });

      });

  }


  // =========================================
  // 19. GET CANVAS POINTER POSITION
  // =========================================

  function getCanvasPosition(event) {

    const rect = canvas.getBoundingClientRect();


    return {

      x:
        (event.clientX - rect.left) *
        (canvas.width / rect.width),


      y:
        (event.clientY - rect.top) *
        (canvas.height / rect.height)

    };

  }


  // =========================================
  // 20. CHECK IF POINTER IS ON PHOTO
  // =========================================

  function isInsidePhotoFrame(x, y) {

    return (

      x >= PHOTO_FRAME.x &&

      x <= PHOTO_FRAME.x + PHOTO_FRAME.width &&

      y >= PHOTO_FRAME.y &&

      y <= PHOTO_FRAME.y + PHOTO_FRAME.height

    );

  }


  // =========================================
  // 21. START DRAGGING PHOTO
  // =========================================

  canvas.addEventListener("pointerdown", event => {

    if (!uploadedPhoto) return;

    if (event.button !== undefined && event.button !== 0) {
      return;
    }


    const position = getCanvasPosition(event);


    if (!isInsidePhotoFrame(position.x, position.y)) {
      return;
    }


    isDraggingPhoto = true;


    lastPointerX = position.x;

    lastPointerY = position.y;


    canvas.classList.add("photo-dragging");


    try {

      canvas.setPointerCapture(event.pointerId);

    } catch (error) {

      // Pointer capture may be unavailable in some environments.

    }


    event.preventDefault();

  });


  // =========================================
  // 22. MOVE PHOTO WHILE DRAGGING
  // =========================================

  canvas.addEventListener("pointermove", event => {

    if (!isDraggingPhoto || !uploadedPhoto) return;


    const position = getCanvasPosition(event);


    const deltaX = position.x - lastPointerX;

    const deltaY = position.y - lastPointerY;


    photoOffsetX += deltaX;

    photoOffsetY += deltaY;


    lastPointerX = position.x;

    lastPointerY = position.y;


    render();

  });


  // =========================================
  // 23. STOP DRAGGING
  // =========================================

  function stopDraggingPhoto() {

    isDraggingPhoto = false;

    canvas.classList.remove("photo-dragging");

  }


  canvas.addEventListener("pointerup", stopDraggingPhoto);

  canvas.addEventListener("pointercancel", stopDraggingPhoto);

  canvas.addEventListener("lostpointercapture", stopDraggingPhoto);


  // =========================================
  // 24. DOWNLOAD PERSONALIZED FLYER
  // =========================================

  downloadButton.addEventListener("click", () => {


    // Check template

    if (!template.complete || !template.naturalWidth) {

      status.textContent =
        "The flyer template is still loading. Please try again.";

      return;

    }


    // Check name

    if (!nameInput.value.trim()) {

      status.textContent =
        "Please enter your name before downloading.";

      nameInput.focus();

      return;

    }


    // Check photograph

    if (!uploadedPhoto) {

      status.textContent =
        "Please upload your photograph before downloading.";

      photoInput.click();

      return;

    }


    // Render final flyer with current zoom and position

    render();


    // Prepare filename

    const safeName = nameInput.value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "attendee";


    // Create download link

    const link = document.createElement("a");

    link.download = `LIFE27-attendance-${safeName}.png`;

    link.href = canvas.toDataURL("image/png");


    // Download

    link.click();


    status.textContent =
      "Your personalized flyer has been downloaded.";

  });


  // =========================================
  // 25. RESET EVERYTHING
  // =========================================

  resetButton.addEventListener("click", () => {


    // Reset name

    nameInput.value = "";


    // Reset uploaded file

    photoInput.value = "";


    // Remove photograph

    uploadedPhoto = null;


    // Reset photo zoom and position

    resetPhotoState();


    // Hide controls

    hidePhotoControls();


    // Clear status

    status.textContent = "";


    // Render original flyer

    render();

  });


  // =========================================
  // 26. INITIALIZE
  // =========================================

  updateZoomControls();

  hidePhotoControls();

  render();


})();
