

const RING_RADIUS = 30;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

document.addEventListener("DOMContentLoaded", () => {
  seedDemoData();
  renderTracker();
});

function renderTracker() {
  const projects = Projects.all();
  const container = document.getElementById("tracker-list");

  if (projects.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="icon"><i class="fa-solid fa-chart-line"></i></div>
      <h3>Nothing to track yet</h3>
      <p>Create a project and add tasks to see progress here.</p>
      <a href="team.html" class="btn btn-primary btn-sm">Create a project</a>
    </div>`;
    return;
  }

  container.innerHTML = projects.map(renderProjectTracker).join("");
}

function renderProjectTracker(project) {
  const tasks = Tasks.forProject(project.id);
  const team = Teams.findById(project.teamId);

  const todo = tasks.filter((t) => t.status === "todo").length;
  const inprogress = tasks.filter((t) => t.status === "inprogress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const offset = RING_CIRCUMFERENCE - (pct / 100) * RING_CIRCUMFERENCE;

  return `
    <div class="tracker-card">
      <svg class="progress-ring" width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="${RING_RADIUS}" fill="none" stroke="#e4e7ed" stroke-width="8" />
        <circle cx="40" cy="40" r="${RING_RADIUS}" fill="none" stroke="#5b5bd6" stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="${RING_CIRCUMFERENCE}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 40 40)" />
        <text x="40" y="45" text-anchor="middle" font-size="16" fill="#171923">${pct}%</text>
      </svg>

      <div class="tracker-info">
        <h3>${project.name}</h3>
        <div class="tmeta">${team ? team.name : "No team"} · ${tasks.length} tasks total</div>
        <div class="mini-bar-track">
          <div class="mini-bar-fill" style="width:${pct}%;"></div>
        </div>
        <div class="task-status-row">
          <span><span class="status-dot dot-todo"></span> ${todo} to do</span>
          <span><span class="status-dot dot-progress"></span> ${inprogress} in progress</span>
          <span><span class="status-dot dot-done"></span> ${done} done</span>
        </div>
      </div>
    </div>`;
}
