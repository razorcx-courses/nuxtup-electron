const process = require("process");
const path = require("path");
const fs = require("fs");

const updateTailwindConfig = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  theme: {
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./content/**/*.md",
  ],
};
`;

    fs.writeFileSync("./tailwind.config.ts", tailwindConfig);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { updateTailwindConfig };
