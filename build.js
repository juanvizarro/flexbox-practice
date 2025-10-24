import fs from "fs";
import { execSync } from "child_process";

// 🧹 Elimina la carpeta dist si existe
if (fs.existsSync("dist")) {
  fs.rmSync("dist", { recursive: true, force: true });
}

// 🏗️ Crea carpeta dist
fs.mkdirSync("dist/css");

// 🪄 Ejecuta Tailwind para compilar el CSS final
execSync("npx tailwindcss -i ./scss/main.scss -o ./dist/css/style.css", {
  stdio: "inherit"
});

// 📁 Copia tu index.html y otros archivos necesarios
fs.copyFileSync("index.html", "dist/index.html");

// (Opcional) Si tienes imágenes, JS u otros assets, puedes copiarlos así:
// fs.cpSync("assets", "dist/assets", { recursive: true });

console.log("✅ Build completado. Archivos generados en /dist");
