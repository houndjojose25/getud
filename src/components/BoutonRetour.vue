<template>
  <button @click="$router.go(-1)" class="btn-retour">
    ← Retour
  </button>
</template>

<style scoped>
.btn-retour {
  background: white;
  color: black;
  border: 1px solid black;
  padding: 8px 18px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  transition: 0.3s;
  margin: 10px 0 20px 0;
}

.btn-retour:hover {
  background: black;
  color: white;
}
</style>