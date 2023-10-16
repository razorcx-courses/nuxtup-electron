const process = require("process");
const path = require("path");
const fs = require("fs");

const updateIndex = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const indexFilename = "./pages/index.vue";
    const index = fs.readFileSync(indexFilename, {
      encoding: "utf8",
      flag: "r",
    });
    const indexHtml = `<div class="flex flex-col h-screen justify-center items-center px-3">
    <div class="prose prose-2xl text-center">
      <h1 id="title" class="text-3xl font-bold text-black leading-relaxed mb-0">
        Nuxt<span class="font-normal text-success">Up</span>
      </h1>
      <p id="description" class="text-lg text-[#a9a9a9] my-0">
        The unOfficial Nuxt 3 Installer
      </p>
      <NuxtLink href="#">
        <button class="btn btn-success font-bold text-lg mt-12">
          Start Here
        </button>
      </NuxtLink>
      <div class="max-w-sm md:max-w-lg mt-12">
        <pre>{{ $device.userAgent }}</pre>
      </div>
    </div>
  </div>`;
    const indexReplaced = index.replace(/Page: foo/g, indexHtml);

    fs.writeFileSync(indexFilename, indexReplaced);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { updateIndex };
