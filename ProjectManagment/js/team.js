/* =========================================================
   team.js — team creation & project allocation logic
   ========================================================= */

let activeTeamIdForModal = null;

document.addEventListener("DOMContentLoaded", () => {
  seedDemoData();
  bindCreateTeam();
  bindCreateProject();
  bindModal();
  renderTeams();
  renderTeamSelect();
  renderProjects();
});

// ---- create team ---------------------------------------------------------

function bindCreateTeam() {
  document.getElementById("create-team-btn").addEventListener("click", () => {
    const input = document.getElementById("team-name-input");
    const name = input.value.trim();

    if (!name) {
      showToast("Enter a team name");
      return;
    }

    Teams.create(name);

    input.value = "";

    renderTeams();
    renderTeamSelect();

    showToast("Team created");
  });
}

function renderTeams() {
  const teams = Teams.all();
  const container = document.getElementById("team-list");

  if (teams.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="icon"><i class="fa-solid fa-people-group"></i></div>
      <h3>No teams yet</h3>
      <p>Create your first team using the form above.</p>
    </div>`;
    return;
  }

  container.innerHTML = teams.map(renderTeamCard).join("");

  // bind per-team "add member" buttons
  document.querySelectorAll("[data-add-member]").forEach((btn) => {
    btn.addEventListener("click", () => openMemberModal(btn.dataset.addMember));
  });

  // bind per-member "remove" buttons
  document.querySelectorAll("[data-remove-member]").forEach((el) => {
    el.addEventListener("click", () => {
      Teams.removeMember(el.dataset.teamId, el.dataset.removeMember);
      renderTeams();
      renderTeamSelect();
    });
  });
}

function renderTeamCard(team) {
  const members = team.members
    .map(
      (m) => `
      <span class="member-chip">
        <span class="task-avatar">${initials(m.name)}</span>
        ${m.name} <span class="role">· ${m.role}</span>
        <span class="remove-x" data-team-id="${team.id}" data-remove-member="${m.id}"><i class="fa-solid fa-xmark"></i></span>
      </span>`
    )
    .join("");

  const projects = Projects.forTeam(team.id)
    .map((project) => `<span class="project-chip">${project.name}</span>`)
    .join("");

  return `
    <div class="team-card">
      <div class="team-card__head">
        <h3>${team.name}</h3>
        <span class="member-count">${team.members.length} member${team.members.length === 1 ? "" : "s"}</span>
      </div>
      <div class="team-section-label">Assigned projects</div>
      <div class="project-chip-list">
        ${projects || `<span style="color:var(--muted-light); font-size:12.5px;">No projects assigned yet</span>`}
      </div>
      <div class="team-section-label">Members</div>
      <div class="member-list">
        ${members || `<span style="color:var(--muted-light); font-size:12.5px;">No members yet</span>`}
      </div>
      <div class="inline-form">
        <button class="btn btn-outline btn-sm" data-add-member="${team.id}"><i class="fa-solid fa-user-plus"></i> Add member</button>
      </div>
    </div>`;
}

// ---- add member modal -----------------------------------------------------

function bindModal() {
  document.getElementById("cancel-member-btn").addEventListener("click", closeMemberModal);

  document.getElementById("save-member-btn").addEventListener("click", () => {
    const name = document.getElementById("member-name-input").value.trim();
    const role = document.getElementById("member-role-input").value.trim() || "Team Member";

    if (!name) {
      showToast("Enter a member name");
      return;
    }

    Teams.addMember(activeTeamIdForModal, name, role);
    closeMemberModal();
    renderTeams();
    renderTeamSelect();
    showToast("Member added");
  });
}

function openMemberModal(teamId) {
  activeTeamIdForModal = teamId;
  document.getElementById("member-name-input").value = "";
  document.getElementById("member-role-input").value = "";
  document.getElementById("member-modal").classList.add("show");
}

function closeMemberModal() {
  document.getElementById("member-modal").classList.remove("show");
}

// ---- create project & allocate team ---------------------------------------

function renderTeamSelect() {
  const select = document.getElementById("project-team-select");
  const teams = Teams.all();
  select.innerHTML = teams.length
    ? teams.map((t) => `<option value="${t.id}">${t.name}</option>`).join("")
    : `<option value="">Create a team first</option>`;
}

function bindCreateProject() {
  document.getElementById("create-project-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("project-name-input");
    const descInput = document.getElementById("project-desc-input");
    const teamSelect = document.getElementById("project-team-select");

    const name = nameInput.value.trim();
    if (!name) {
      showToast("Enter a project name");
      return;
    }
    if (!teamSelect.value) {
      showToast("Create a team before allocating a project");
      return;
    }

    Projects.create(name, teamSelect.value, descInput.value.trim());
    nameInput.value = "";
    descInput.value = "";
    renderTeams();
    renderProjects();
    showToast("Project created and team allocated");
  });
}

function renderProjects() {
  const projects = Projects.all();
  const container = document.getElementById("project-list-team-page");

  if (projects.length === 0) {
    container.innerHTML = `<p style="color:var(--muted); font-size:13px;">No projects created yet.</p>`;
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const team = Teams.findById(project.teamId);
      return `
        <div class="project-row">
          <div>
            <div class="pname">${project.name}</div>
            <div class="pteam">${project.description || "No description"}</div>
          </div>
          <span class="badge badge-indigo">${team ? team.name : "Unassigned"}</span>
        </div>`;
    })
    .join("");
}
