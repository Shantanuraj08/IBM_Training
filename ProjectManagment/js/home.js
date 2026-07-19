/* =========================================================
   home.js — dashboard overview logic
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  seedDemoData();
  renderStats();
  renderProjectList();
  renderActivity();
});

function renderStats() {
  const projects = Projects.all();
  const teams = Teams.all();
  const tasks = Tasks.all();
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  document.getElementById("stat-projects").textContent = projects.length;
  document.getElementById("stat-teams").textContent = teams.length;
  document.getElementById("stat-tasks").textContent = tasks.length;
  document.getElementById("stat-done").textContent = done;
  document.getElementById("stat-done-pct").textContent = `${pct}% completion rate`;
}

function renderProjectList() {
  const projects = Projects.all();
  const container = document.getElementById("project-list");

  if (projects.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="icon"><i class="fa-solid fa-diagram-project"></i></div>
      <h3>No projects yet</h3>
      <p>Create a team and a project to get started.</p>
      <a href="team.html" class="btn btn-primary btn-sm">Create a project</a>
    </div>`;
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const team = Teams.findById(project.teamId);
      const tasks = Tasks.forProject(project.id);
      const done = tasks.filter((t) => t.status === "done").length;
      const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

      return `
        <div class="project-row">
          <div>
            <div class="pname">${project.name}</div>
            <div class="pteam">${team ? team.name : "No team assigned"} · ${tasks.length} tasks</div>
          </div>
          <span class="badge badge-indigo">${pct}% done</span>
        </div>`;
    })
    .join("");
}

function renderActivity() {
  const tasks = [...Tasks.all()].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
  const container = document.getElementById("activity-list");

  if (tasks.length === 0) {
    container.innerHTML = `<p style="color:var(--muted); font-size:13px;">No activity yet.</p>`;
    return;
  }

  const dotClass = { todo: "dot-todo", inprogress: "dot-progress", done: "dot-done" };
  const label = { todo: "created", inprogress: "in progress", done: "completed" };

  container.innerHTML = tasks
    .map(
      (task) => `
      <div class="activity-item">
        <span class="activity-dot ${dotClass[task.status]}"></span>
        <div>
          <strong>${task.assignee}</strong> ${label[task.status]} <em>"${task.title}"</em>
        </div>
      </div>`
    )
    .join("");
}
