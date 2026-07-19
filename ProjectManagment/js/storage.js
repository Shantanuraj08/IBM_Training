/* =========================================================
   storage.js
   A tiny data-access layer built on localStorage.
   This acts as our "database" since the site is fully static.
   Every page includes this file before its own script.
   ========================================================= */

const DB_KEYS = {
  session: "pmd_session",
  user: "pmd_user",
  teams: "pmd_teams",
  projects: "pmd_projects",
  tasks: "pmd_tasks",
  seeded: "pmd_seeded",
};

// ---- generic helpers ----------------------------------------------------

function readList(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function makeId(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 8);
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

// ---- session --------------------------------------------------------------

const Auth = {
  get() {
    const raw = localStorage.getItem(DB_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  },
  set(user) {
    localStorage.setItem(DB_KEYS.user, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(DB_KEYS.user);
  },
};

const Session = {
  get() {
    const raw = localStorage.getItem(DB_KEYS.session);
    return raw ? JSON.parse(raw) : null;
  },
  set(user) {
    localStorage.setItem(DB_KEYS.session, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(DB_KEYS.session);
  },
  requireLogin() {
    const user = Session.get();
    if (!user) {
      window.location.href = "auth.html";
    }
    return user;
  },
};

// ---- teams ------------------------------------------------------------

const Teams = {
  all() {
    return readList(DB_KEYS.teams);
  },
  save(list) {
    writeList(DB_KEYS.teams, list);
  },
  create(name) {
    const list = Teams.all();
    const team = { id: makeId("team"), name, members: [] };
    list.push(team);
    Teams.save(list);
    return team;
  },
  addMember(teamId, memberName, role) {
    const list = Teams.all();
    const team = list.find((t) => t.id === teamId);
    if (!team) return;
    team.members.push({ id: makeId("mem"), name: memberName, role });
    Teams.save(list);
  },
  removeMember(teamId, memberId) {
    const list = Teams.all();
    const team = list.find((t) => t.id === teamId);
    if (!team) return;
    team.members = team.members.filter((m) => m.id !== memberId);
    Teams.save(list);
  },
  findById(id) {
    return Teams.all().find((t) => t.id === id);
  },
};

// ---- projects -----------------------------------------------------------

const Projects = {
  all() {
    return readList(DB_KEYS.projects);
  },
  save(list) {
    writeList(DB_KEYS.projects, list);
  },
  create(name, teamId, description) {
    const list = Projects.all();
    const project = { id: makeId("proj"), name, teamId, description };
    list.push(project);
    Projects.save(list);
    return project;
  },
  forTeam(teamId) {
    return Projects.all().filter((project) => project.teamId === teamId);
  },
  upsertByName(name, teamId, description = "") {
    const list = Projects.all();
    const normalizedName = name.trim().toLowerCase();
    let project = list.find((item) => item.name.trim().toLowerCase() === normalizedName);

    if (project) {
      project.teamId = teamId;
      if (description) {
        project.description = description;
      }
    } else {
      project = { id: makeId("proj"), name: name.trim(), teamId, description };
      list.push(project);
    }

    Projects.save(list);
    return project;
  },
  findById(id) {
    return Projects.all().find((p) => p.id === id);
  },
};

// ---- tasks --------------------------------------------------------------

const Tasks = {
  all() {
    return readList(DB_KEYS.tasks);
  },
  save(list) {
    writeList(DB_KEYS.tasks, list);
  },
  forProject(projectId) {
    return Tasks.all().filter((t) => t.projectId === projectId);
  },
  create(title, projectId, assignee) {
    const list = Tasks.all();
    const task = {
      id: makeId("task"),
      title,
      projectId,
      assignee,
      status: "todo",
      createdAt: Date.now(),
    };
    list.push(task);
    Tasks.save(list);
    return task;
  },
  updateStatus(taskId, status) {
    const list = Tasks.all();
    const task = list.find((t) => t.id === taskId);
    if (!task) return;
    task.status = status;
    Tasks.save(list);
  },
  remove(taskId) {
    const list = Tasks.all().filter((t) => t.id !== taskId);
    Tasks.save(list);
  },
};

// ---- demo seed data -------------------------------------------------------
// Populates the dashboard with a believable starting point the first time
// the site is opened, so the UI never looks empty on first run.

function seedDemoData() {
  if (localStorage.getItem(DB_KEYS.seeded)) return;

  const team = {
    id: makeId("team"),
    name: "Platform Team",
    members: [
      { id: makeId("mem"), name: "Shantanu Kumar", role: "Backend Engineer" },
      { id: makeId("mem"), name: "Ayesha Rao", role: "Frontend Engineer" },
      { id: makeId("mem"), name: "Rohit Verma", role: "QA Engineer" },
    ],
  };

  const project = {
    id: makeId("proj"),
    name: "CivicPulse AI",
    teamId: team.id,
    description: "Civic complaint management platform with citizen, authority and admin portals.",
  };

  const tasks = [
    { id: makeId("task"), title: "Design complaint submission schema", projectId: project.id, assignee: team.members[0].name, status: "done", createdAt: Date.now() },
    { id: makeId("task"), title: "Build JWT auth for citizen portal", projectId: project.id, assignee: team.members[0].name, status: "inprogress", createdAt: Date.now() },
    { id: makeId("task"), title: "Design authority dashboard UI", projectId: project.id, assignee: team.members[1].name, status: "inprogress", createdAt: Date.now() },
    { id: makeId("task"), title: "Write test cases for escalation flow", projectId: project.id, assignee: team.members[2].name, status: "todo", createdAt: Date.now() },
    { id: makeId("task"), title: "Set up CI pipeline", projectId: project.id, assignee: team.members[0].name, status: "todo", createdAt: Date.now() },
  ];

  writeList(DB_KEYS.teams, [team]);
  writeList(DB_KEYS.projects, [project]);
  writeList(DB_KEYS.tasks, tasks);
  localStorage.setItem(DB_KEYS.seeded, "1");
}

// ---- toast helper (shared UI utility) -------------------------------------

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}
