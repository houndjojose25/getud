<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <p>
          🎓 Gestion Étudiants
        </p>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/ajouter" class="nav-link">Ajouter</router-link>
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2026 Gestion Étudiants</p>
    </footer>
  </div>
</template>


<style>
:root {
  --bg: #ffffff;
  --text: #000000;
  --border: #ccc;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Arial', sans-serif;
  transition: background 0.3s, color 0.3s;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.navbar {
  background: black;
  color: white;
  padding: 12px 20px;
  border-bottom: 1px solid #333;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  font-size: 14px;
  transition: 0.3s;
  padding: 6px 10px;
}

.nav-link:hover {
  color: white;
}

.router-link-active {
  color: white !important;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  background: var(--bg);
  color: var(--text);
}

.footer {
  background: black;
  color: #666;
  text-align: center;
  padding: 15px;
  font-size: 13px;
  border-top: 1px solid #333;
}

@media (max-width: 480px) {
  .nav-container {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-links {
    justify-content: center;
  }
}
</style>