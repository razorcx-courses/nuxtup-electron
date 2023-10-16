// npx nuxi init --help
// Initialize a fresh project (nuxi init v3.9.0) 
// USAGE nuxi init [OPTIONS] [DIR]

// ARGUMENTS

//   DIR    Project directory

// OPTIONS

//              --cwd    Current working directory
//         --logLevel    Log level
//     -t, --template    Template name
//        -f, --force    Override existing directory
//          --offline    Force offline mode
//    --preferOffline    Prefer offline mode
//       --no-install    Skip installing dependencies
//          --gitInit    Initialize git repository
//            --shell    Start shell after installation in project directory
//   --packageManager    Package manager choice (npm, pnpm, yarn, bun)

const { execSync } = require("node:child_process");
const process = require("process");

const initNuxt = (folder, projectName) => {
  try {
    process.chdir(folder);

    execSync(
      `start cmd /k "npx nuxi@latest init --gitInit --packageManager pnpm ${projectName} && exit`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { initNuxt };



