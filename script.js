// =======================
// UTILS
// =======================

function showMessage(text, type = "error") {
  const el = document.getElementById("error");
  if (!el) return;

  el.textContent = text;
  el.style.color = type === "success" ? "#22c55e" : "#ef4444";
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  }, 3000);
}

function setLoading(btn, state, text = "Carregando...") {
  if (!btn) return;

  if (state) {
    btn.dataset.original = btn.textContent;
    btn.textContent = text;
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.original;
    btn.disabled = false;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

// =======================
// PROTEÇÃO DE ROTAS (CORRIGIDO)
// =======================

const currentPage = window.location.pathname.split("/").pop();

const protectedPages = [
  "dashboard.html",
  "accounts.html",
  "transactions.html",
  "transfer.html"
];

if (protectedPages.includes(currentPage)) {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "index.html";
  }
}

// =======================
// LOGIN
// =======================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = document.getElementById("loginBtn");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!isValidEmail(email)) {
      showMessage("Email inválido");
      return;
    }

    if (!isValidPassword(password)) {
      showMessage("Senha inválida");
      return;
    }

    setLoading(btn, true, "Entrando...");

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        name: email.split("@")[0],
        email
      }));

      window.location.href = "dashboard.html";
    }, 800);
  });
}

// =======================
// REGISTER
// =======================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = registerForm.querySelector("button");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (name.length < 3) {
      showMessage("Nome muito curto");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Email inválido");
      return;
    }

    if (!isValidPassword(password)) {
      showMessage("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(btn, true);

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ name, email }));

      showMessage("Conta criada com sucesso", "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    }, 800);
  });
}

// =======================
// DASHBOARD
// =======================

const welcome = document.querySelector(".home-card h1");

if (welcome) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    welcome.textContent = `Olá, ${user.name}`;
  }
}

// =======================
// TRANSFER
// =======================

const transferForm = document.getElementById("transferForm");

if (transferForm) {
  transferForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = document.getElementById("transferBtn");
    const recipient = document.getElementById("recipient").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (recipient.length < 3) {
      showMessage("Destinatário inválido");
      return;
    }

    if (!amount || amount <= 0) {
      showMessage("Valor inválido");
      return;
    }

    setLoading(btn, true, "Transferindo...");

    setTimeout(() => {
      showMessage("Transferência realizada com sucesso", "success");
      setLoading(btn, false);
      transferForm.reset();
    }, 1000);
  });
}

// =======================
// LOGOUT
// =======================

function logout() {
  localStorage.removeItem("user");

  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}