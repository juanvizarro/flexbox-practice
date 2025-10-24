import fs from "fs";
import { execSync } from "child_process";

// 🧹 1. Elimina la carpeta dist si existe
if (fs.existsSync("dist")) {
  fs.rmSync("dist", { recursive: true, force: true });
}

// 🏗️ 2. Crea carpeta dist/css
fs.mkdirSync("dist/css", { recursive: true });

// 🪄 3. Compila Tailwind CSS
execSync("npx tailwindcss -i ./scss/main.scss -o ./dist/css/style.css --minify", {
  stdio: "inherit",
});

// 📄 4. Copia archivos principales
fs.copyFileSync("index.html", "dist/index.html");

// 🧠 5. Copia tu JavaScript
if (fs.existsSync("script.js")) {
  fs.copyFileSync("script.js", "dist/script.js");
}

// 🖼️ 6. (Opcional) Copia tus assets si existen
if (fs.existsSync("assets")) {
  fs.cpSync("assets", "dist/assets", { recursive: true });
}

console.log("✅ Build completado. Archivos generados en /dist");
