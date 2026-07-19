/* =========================================================
   kanban.js — kanban board logic
   Renders columns for the selected project and supports
   native HTML5 drag-and-drop to change task status.
   ========================================================= */

const STATUSES = ["todo", "inprogress", "done"];
const BORDER_CLASS = { todo: "border-todo", inprogress: "border-progress", done: "border-done" };

let currentProjectId = null;

document.addEventListener("DOMContentLoaded", () => {
  seedDemoData();
  populateProjectSelect();
  bindToolbar();
  bindDropZones();

  const projects = Projects.all();
  if (projects.length > 0) {
    currentProjectId = projects[0].id;
    document.getElementById("project-select").value = currentProjectId;
    populateAssigneeSelect();
    renderBoard();
  } else {
    document.getElementById("no-project-msg").style.display = "block";
    document.getElementById("kanban-board").style.display = "none";
  }
});

function populateProjectSelect() {
  const select = document.getElementById("project-select");
  const projects = Projects.all();
  select.innerHTML = projects.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");

  select.addEventListener("change", () => {
    currentProjectId = select.value;
    populateAssigneeSelect();
    renderBoard();
  });
}

function populateAssigneeSelect() {
  const assigneeSelect = document.getElementById("new-task-assignee");
  const project = Projects.findById(currentProjectId);
  const team = project ? Teams.findById(project.teamId) : null;
  const members = team ? team.members : [];

  assigneeSelect.innerHTML = members.length
    ? members.map((m) => `<option value="${m.name}">${m.name}</option>`).join("")
    : `<option value="Unassigned">Unassigned</option>`;
}

function bindToolbar() {
  document.getElementById("add-task-btn").addEventListener("click", () => {
    const titleInput = document.getElementById("new-task-title");
    const assigneeSelect = document.getElementById("new-task-assignee");
    const title = titleInput.value.trim();

    if (!currentProjectId) {
      showToast("Create a project first");
      return;
    }
    if (!title) {
      showToast("Enter a task title");
      return;
    }

    Tasks.create(title, currentProjectId, assigneeSelect.value);
    titleInput.value = "";
    renderBoard();
    showToast("Task added");
  });
}

function renderBoard() {
  if (!currentProjectId) return;
  const tasks = Tasks.forProject(currentProjectId);

  STATUSES.forEach((status) => {
    const col = document.getElementById(`col-${status}`);
    const tasksInCol = tasks.filter((t) => t.status === status);
    document.getElementById(`count-${status}`).textContent = tasksInCol.length;

    col.innerHTML = tasksInCol.length
      ? tasksInCol.map(renderTaskCard).join("")
      : `<div class="empty-col-msg">No tasks here yet</div>`;
  });

  bindTaskCardEvents();
}

function renderTaskCard(task) {
  return `
    <div class="task-card ${BORDER_CLASS[task.status]}" draggable="true" data-task-id="${task.id}">
      <div class="task-card__title">${task.title}</div>
      <div class="task-card__meta">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="task-avatar">${initials(task.assignee)}</div>
          <span class="task-id">${task.id}</span>
        </div>
        <button class="task-card__delete" data-delete-id="${task.id}" title="Delete task">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;
}

function bindTaskCardEvents() {
  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.dataset.taskId);
      card.style.opacity = "0.5";
    });
    card.addEventListener("dragend", () => {
      card.style.opacity = "1";
    });
  });

  document.querySelectorAll("[data-delete-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      Tasks.remove(btn.dataset.deleteId);
      renderBoard();
      showToast("Task deleted");
    });
  });
}

function bindDropZones() {
  STATUSES.forEach((status) => {
    const col = document.getElementById(`col-${status}`);

    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("drag-over");
    });

    col.addEventListener("dragleave", () => {
      col.classList.remove("drag-over");
    });

    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");
      const taskId = e.dataTransfer.getData("text/plain");
      Tasks.updateStatus(taskId, status);
      renderBoard();
    });
  });
}
