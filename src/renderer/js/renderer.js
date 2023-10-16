const installStatus = document.querySelector("#status");
const config = document.querySelector("#config");
const toast = document.querySelector("#toast");
const toastContent = document.querySelector("#toast-content");
const selectDependencies = document.querySelector("#select-dependencies");
const projectDir = document.querySelector("#project-dir");

ipcRenderer.send("loaded");

ipcRenderer.on("dependencies", (args) => {
  devDep = args;

  selectDependencies.innerHTML = "";

  devDep.forEach((e) => {
    selectDependencies.innerHTML += `<label class="label cursor-pointer justify-start mb-0 animate-flip-up animate-once animate-normal hover:bg-gray-600/20 py-2 px-4 rounded-md"
>
  <input
    type="checkbox"
    id="${e.name}-checkbox"
    class="checkbox checkbox-success"
    onchange="updateDependencies('${e.name}', event.target.checked)"
  />
  <span class="ml-3">${e.title}</span>
</label>`;
  });
});

ipcRenderer.on("status:start", (args) => {
  installStatus.innerHTML += `<div class="flex flex-row justify-between w-full items-center">
  <p class="w-full">${args.message}</p>
  <p id="${args.id}" class="text-slate-100 ml-2 bg-primary rounded-full px-3">Working</p>
</div>`;
});

ipcRenderer.on("status:complete", (args) => {
  const statusEl = document.getElementById(args.id);
  statusEl.outerHTML = `<p class="text-black ml-2 bg-success rounded-full px-3">Success</p>
  </div>`;
});

ipcRenderer.on("dir:selected", (args) => {
  projectDir.value = args[0];
});

const minimizeWindow = () => {
  console.log("minimize");
  ipcRenderer.send("minimize");
};

const maximizeWindow = () => {
  console.log("maximize");
  ipcRenderer.send("maximize");
};

const closeWindow = () => {
  console.log("close");
  ipcRenderer.send("close");
};

let projectName = "";
let dependencies = new Set();

const updateProjectName = (e) => {
  projectName = e.replace(/\s/g, "").toLowerCase();
};

const updateDependencies = (option, value) => {
  value === true
    ? dependencies.add(option.toLowerCase())
    : dependencies.delete(option.toLowerCase());
};

const selectDir = async () => {
  ipcRenderer.send("dir:select");
};

const createProject = () => {
  installStatus.innerHTML = "";

  if (!projectName || projectName.length < 1) return;

  const dep = Array.from(dependencies);
  if (!dep || dep.length < 1) return;

  console.log("Project Name: ", projectName);
  console.log("Project Dependencies: ", dependencies);

  const projectDirectory = projectDir.value;

  ipcRenderer.send("project:create", { projectName, dep, projectDirectory });
};
