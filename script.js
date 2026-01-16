/* =========================
   1) DATA: sửa thông tin ở đây
========================= */
const INVITE = {
  bride: {
    shortName: "Mỹ Kim",
    fullName: "Đỗ Mỹ Kim",
    role: "Út nữ", // "Trưởng nữ" | "Thứ nữ" | "Út nữ"
    grandpa: "Ông ...",
    grandma: "Bà ...",
    dad: "Ông ...",
    mom: "Bà ...",
    address: "Số ..., Phường ..., Quận ..., Tỉnh/TP ...",
    bankText: "Ngân hàng: ... • STK: ... • Chủ TK: Nguyễn Thị A",
    mapQuery: "Ho Chi Minh City",
  },
  groom: {
    shortName: "Tuấn Khang",
    fullName: "Châu Tuấn Khang",
    role: "Út nam", // "Trưởng nam" | "Thứ nam" | "Út nam"
    grandpa: "Ông ...",
    grandma: "Bà ...",
    dad: "Ông ...",
    mom: "Bà ...",
    address: "Số ..., Phường ..., Quận ..., Tỉnh/TP ...",
    bankText: "Ngân hàng: ... • STK: ... • Chủ TK: Trần Văn B",
    mapQuery: "Ho Chi Minh City",
  },

  cover: {
    dateLine: "20:00 • 20/02/2026",
    venueLine: "TP. Hồ Chí Minh",
  },

  eventDateTimeISO: "2026-02-20T18:00:00+07:00",
  eventDateText: "Thứ sáu • 20/02/2026",
  eventTimeText: "18:00",

  brideCeremony: {
    timeText: "08:00 • 20/02/2026",
    addrText: "Nhà gái: ...",
    mapQuery: "Ho Chi Minh City",
  },
  groomCeremony: {
    timeText: "18:00 • 20/02/2026",
    addrText: "Nhà trai / Tiệc: ...",
    mapQuery: "Ho Chi Minh City",
  },

  thanks:
    "Chúng tôi xin chân thành cảm ơn quý quan khách đã dành thời gian đến chung vui và gửi lời chúc phúc. Kính chúc quý khách sức khỏe, hạnh phúc và bình an.",
};

/* =========================
   2) HELPERS
========================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function pad2(n) {
  return String(n).padStart(2, "0");
}

function safePlay(audioEl) {
  if (!audioEl) return;
  const p = audioEl.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function safePause(audioEl) {
  if (!audioEl) return;
  audioEl.pause();
}

/* =========================
   3) BIND DATA TO UI
========================= */
function bindData() {
  // Cover
  $("#coverBride").textContent = INVITE.bride.shortName;
  $("#coverGroom").textContent = INVITE.groom.shortName;
  $("#coverDate").textContent = INVITE.cover.dateLine;
  $("#coverVenue").textContent = INVITE.cover.venueLine;

  // Hero
  $("#brideName").textContent = INVITE.bride.fullName;
  $("#groomName").textContent = INVITE.groom.fullName;
  $("#eventDateText").textContent = INVITE.eventDateText;
  $("#eventTimeText").textContent = INVITE.eventTimeText;

  // Family
  $("#groomGrandpa").textContent = INVITE.groom.grandpa;
  $("#groomGrandma").textContent = INVITE.groom.grandma;
  $("#groomDad").textContent = INVITE.groom.dad;
  $("#groomMom").textContent = INVITE.groom.mom;
  $("#groomAddress").textContent = INVITE.groom.address;

  $("#brideGrandpa").textContent = INVITE.bride.grandpa;
  $("#brideGrandma").textContent = INVITE.bride.grandma;
  $("#brideDad").textContent = INVITE.bride.dad;
  $("#brideMom").textContent = INVITE.bride.mom;
  $("#brideAddress").textContent = INVITE.bride.address;

  // Roles
  $("#groomFullName").textContent = INVITE.groom.fullName;
  $("#brideFullName").textContent = INVITE.bride.fullName;
  $("#groomRole").textContent = INVITE.groom.role;
  $("#brideRole").textContent = INVITE.bride.role;

  $("#groomParentsInline").textContent = `${INVITE.groom.dad} & ${INVITE.groom.mom}`;
  $("#brideParentsInline").textContent = `${INVITE.bride.dad} & ${INVITE.bride.mom}`;

  // Ceremony info
  $("#brideCeremonyTime").textContent = INVITE.brideCeremony.timeText;
  $("#brideCeremonyAddr").textContent = INVITE.brideCeremony.addrText;

  $("#groomCeremonyTime").textContent = INVITE.groomCeremony.timeText;
  $("#groomCeremonyAddr").textContent = INVITE.groomCeremony.addrText;

  // Maps
  const brideEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    INVITE.brideCeremony.mapQuery
  )}&output=embed`;
  const groomEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    INVITE.groomCeremony.mapQuery
  )}&output=embed`;

  $("#mapBride").src = brideEmbed;
  $("#mapGroom").src = groomEmbed;

  $("#mapBrideLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    INVITE.brideCeremony.mapQuery
  )}`;
  $("#mapGroomLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    INVITE.groomCeremony.mapQuery
  )}`;

  // Thanks + Banks
  $("#thanksText").textContent = INVITE.thanks;
  $("#brideBankText").textContent = INVITE.bride.bankText;
  $("#groomBankText").textContent = INVITE.groom.bankText;
}

/* =========================
   4) COUNTDOWN
========================= */
let countdownTimer = null;

function startCountdown() {
  const target = new Date(INVITE.eventDateTimeISO).getTime();

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const d = Math.floor(diff / (24 * 3600 * 1000));
    const h = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
    const m = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
    const s = Math.floor((diff % (60 * 1000)) / 1000);

    $("#cdDays").textContent = pad2(d);
    $("#cdHours").textContent = pad2(h);
    $("#cdMins").textContent = pad2(m);
    $("#cdSecs").textContent = pad2(s);
  }

  tick();
  countdownTimer = setInterval(tick, 1000);
}

/* =========================
   5) AUTO SCROLL
   - Start after open
   - Stop permanently on any user interaction
   - Auto stop at bottom
========================= */
let autoScrollOn = false;
let autoScrollStoppedForever = false;
let autoScrollRaf = null;

// phân biệt scroll do code vs do user
let programmaticScroll = false;

function stopAutoScrollForever(reason = "") {
  if (autoScrollStoppedForever) return;
  autoScrollStoppedForever = true;
  autoScrollOn = false;

  if (autoScrollRaf) cancelAnimationFrame(autoScrollRaf);
  autoScrollRaf = null;

  const note = $("#autoNote");
  if (note) {
    note.textContent =
      reason === "bottom"
        ? "Đã tới cuối thiệp."
        : "Bạn có thể xem thiệp theo ý muốn.";
  }
}

function startAutoScroll() {
  if (autoScrollStoppedForever) return;
  autoScrollOn = true;

  const speedPxPerSec = 70; // chỉnh tốc độ (px/giây)
  let lastTs = performance.now();

  function step(ts) {
    if (!autoScrollOn || autoScrollStoppedForever) return;

    const dt = Math.min(0.05, (ts - lastTs) / 1000); // clamp để tránh nhảy
    lastTs = ts;

    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY;

    if (y >= maxScroll - 2) {
      stopAutoScrollForever("bottom");
      return;
    }

    const nextY = Math.min(maxScroll, y + speedPxPerSec * dt);

    programmaticScroll = true;
    window.scrollTo(0, nextY);

    requestAnimationFrame(() => (programmaticScroll = false));
    autoScrollRaf = requestAnimationFrame(step);
  }

  autoScrollRaf = requestAnimationFrame(step);
}

function bindStopAutoScrollEvents() {
  const stopEvents = ["wheel", "touchstart", "pointerdown", "mousedown", "keydown"];
  const handler = () => stopAutoScrollForever("user");

  stopEvents.forEach((ev) => {
    window.addEventListener(ev, handler, { passive: true, once: true });
  });

  // user tự cuộn cũng dừng (nhưng bỏ qua scroll do auto-scroll)
  window.addEventListener(
    "scroll",
    () => {
      if (programmaticScroll) return;
      stopAutoScrollForever("user");
    },
    { passive: true, once: true }
  );

  const btn = $("#btnScrollHint");
  if (btn) btn.addEventListener("click", () => stopAutoScrollForever("user"));
}

/* =========================
   6) GALLERY LIGHTBOX
========================= */
function bindGallery() {
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbClose = $("#lbClose");

  function open(src) {
    lbImg.src = src;
    lb.classList.remove("hidden");
  }
  function close() {
    lb.classList.add("hidden");
    lbImg.removeAttribute("src");
  }

  $$("#gallery .photo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      open(src);
    });
  });

  lbClose.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("hidden") && e.key === "Escape") close();
  });
}

/* =========================
   7) GUESTBOOK (localStorage) + fireworks
========================= */
const STORAGE_KEY = "wedding_guestbook_v1";

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveWishes(wishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function renderWishes() {
  const list = $("#wishesList");
  const wishes = loadWishes();

  if (wishes.length === 0) {
    list.innerHTML = `<div class="wish"><div class="meta">Chưa có lời chúc nào.</div></div>`;
    return;
  }

  list.innerHTML = wishes
    .slice()
    .reverse()
    .map((w) => {
      const time = new Date(w.ts).toLocaleString("vi-VN", { hour12: false });
      return `
        <div class="wish">
          <div class="meta"><strong>${escapeHtml(w.name)}</strong> <span class="dot">•</span> <span>${time}</span></div>
          <p class="msg">${escapeHtml(w.msg)}</p>
        </div>
      `;
    })
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindGuestbook() {
  const form = $("#guestbookForm");
  const nameEl = $("#guestName");
  const wishEl = $("#guestWish");

  renderWishes();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const msg = wishEl.value.trim();

    if (!name || !msg) return;

    const wishes = loadWishes();
    wishes.push({ name, msg, ts: Date.now() });
    saveWishes(wishes);

    nameEl.value = "";
    wishEl.value = "";
    renderWishes();

    burstFireworks();
  });
}

/* =========================
   8) FIREWORKS CANVAS
========================= */
const fw = {
  canvas: null,
  ctx: null,
  w: 0,
  h: 0,
  running: false,
  particles: [],
  raf: null,
};

function initFireworks() {
  fw.canvas = $("#fireworks");
  fw.ctx = fw.canvas.getContext("2d");
  resizeFireworks();
  window.addEventListener("resize", resizeFireworks);
}

function resizeFireworks() {
  fw.w = fw.canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
  fw.h = fw.canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function addBurst(x, y) {
  const count = 80;
  for (let i = 0; i < count; i++) {
    const a = rand(0, Math.PI * 2);
    const sp = rand(1.8, 5.2) * devicePixelRatio;
    fw.particles.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: rand(40, 78),
      ttl: rand(40, 78),
      r: rand(220, 255),
      g: rand(40, 220),
      b: rand(60, 150),
    });
  }
}

function drawFireworks() {
  if (!fw.running) return;

  const ctx = fw.ctx;
  ctx.clearRect(0, 0, fw.w, fw.h);

  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 0, fw.w, fw.h);

  fw.particles = fw.particles.filter((p) => p.life > 0);
  for (const p of fw.particles) {
    p.life -= 1;
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.vy += 0.03 * devicePixelRatio;

    const alpha = Math.max(0, p.life / p.ttl);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
    ctx.arc(p.x, p.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
  }

  if (fw.particles.length === 0) {
    fw.running = false;
    ctx.clearRect(0, 0, fw.w, fw.h);
    return;
  }

  fw.raf = requestAnimationFrame(drawFireworks);
}

function burstFireworks() {
  if (!fw.canvas) initFireworks();

  const x = rand(fw.w * 0.25, fw.w * 0.75);
  const y = rand(fw.h * 0.18, fw.h * 0.40);

  addBurst(x, y);
  addBurst(
    x + rand(-120, 120) * devicePixelRatio,
    y + rand(-80, 80) * devicePixelRatio
  );

  fw.running = true;
  if (!fw.raf) fw.raf = requestAnimationFrame(drawFireworks);

  setTimeout(() => {
    fw.particles = [];
  }, 2500);
}

/* =========================
   9) OPEN FLOW + MUSIC
========================= */
function bindOpenFlow() {
  const btnOpen = $("#btnOpen");
  const cover = $("#cover");
  const invitation = $("#invitation");
  const card3d = $(".card3d");
  const openSfx = $("#openSfx");
  const bgm = $("#bgm");

  const btnToggleMusic = $("#btnToggleMusic");

  btnOpen.addEventListener("click", async () => {
    // Visual open
    card3d.classList.add("open");

    // SFX open
    if (openSfx) {
      openSfx.currentTime = 0;
      safePlay(openSfx);
    }

    // Show invitation after a bit
    setTimeout(() => {
      cover.classList.add("hidden");
      invitation.classList.remove("hidden");

      // Start music
      safePlay(bgm);

      // Countdown
      startCountdown();

      // Auto-scroll stop handlers
      bindStopAutoScrollEvents();

      // Go to top (programmatic)
      programmaticScroll = true;
      window.scrollTo(0, 0);
      requestAnimationFrame(() => (programmaticScroll = false));

      // Start auto-scroll
      setTimeout(() => startAutoScroll(), 300);
    }, 850);
  });

  if (btnToggleMusic) {
    btnToggleMusic.addEventListener("click", () => {
      if (!bgm) return;

      if (bgm.paused) {
        safePlay(bgm);
        btnToggleMusic.textContent = "Tắt nhạc";
      } else {
        safePause(bgm);
        btnToggleMusic.textContent = "Bật nhạc";
      }
    });
  }
}

/* =========================
   10) INIT
========================= */
function init() {
  bindData();
  bindGallery();
  bindGuestbook();
  bindOpenFlow();
  initFireworks();
}

document.addEventListener("DOMContentLoaded", init);
