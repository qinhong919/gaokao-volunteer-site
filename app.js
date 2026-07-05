const data = window.GAOKAO_DATA;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = {
  risk: "all",
  keyword: ""
};

function setupCombos() {
  const primary = $("#primarySubject").value;
  const comboSelect = $("#subjectCombo");
  comboSelect.innerHTML = "";

  data.combos
    .filter((combo) => combo.primary === primary)
    .forEach((combo) => {
      const option = document.createElement("option");
      option.value = combo.id;
      option.textContent = `${combo.id}｜${combo.direction}`;
      comboSelect.appendChild(option);
    });
}

function renderComboGrid() {
  $("#comboGrid").innerHTML = data.combos
    .map((combo) => {
      const tone = combo.primary === "物理" ? "var(--soft-blue)" : "var(--soft-amber)";
      return `
        <article class="combo-card" style="background:${tone}">
          <strong>${combo.id}</strong>
          <p>${combo.direction}</p>
        </article>
      `;
    })
    .join("");
}

function renderSources() {
  $("#sourceGrid").innerHTML = data.sources
    .map(
      (source) => `
        <article class="source-card">
          <strong>${source.name}</strong>
          <p>${source.type}</p>
          <p>${source.use}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">打开来源</a></p>
        </article>
      `
    )
    .join("");
}

function selectedSubjects() {
  const combo = data.combos.find((item) => item.id === $("#subjectCombo").value);
  return combo ? combo.subjects : [];
}

function matchesRequired(program, subjects) {
  return program.required.every((subject) => subjects.includes(subject));
}

function classifyRisk(userRank, minRank) {
  const ratio = userRank / minRank;
  if (ratio >= 0.75 && ratio < 0.95) return "冲";
  if (ratio >= 0.95 && ratio <= 1.15) return "稳";
  if (ratio > 1.15) return "保";
  return "冲";
}

function adviceFor(risk, program) {
  if (risk === "冲") return "可放在前段，注意同组专业是否都能接受。";
  if (risk === "稳") return "匹配度较高，建议核对招生计划增减。";
  return program.ownership === "民办" ? "保底可用，需重点确认学费。" : "适合作为保底梯度。";
}

function currentFilters() {
  return {
    primary: $("#primarySubject").value,
    subjects: selectedSubjects(),
    score: Number($("#score").value || 0),
    rank: Number($("#rank").value || 999999),
    major: $("#majorInterest").value,
    level: $("#schoolLevel").value,
    keyword: state.keyword.trim()
  };
}

function filterPrograms() {
  const filters = currentFilters();
  return data.programs
    .filter((program) => program.primary === filters.primary)
    .filter((program) => matchesRequired(program, filters.subjects))
    .filter((program) => filters.major === "all" || program.majorType === filters.major)
    .filter((program) => filters.level === "all" || program.level.includes(filters.level))
    .filter((program) => {
      if (!filters.keyword) return true;
      return `${program.university}${program.major}${program.city}${program.groupCode}`.includes(filters.keyword);
    })
    .map((program) => ({
      ...program,
      risk: classifyRisk(filters.rank, program.minRank2025)
    }))
    .filter((program) => state.risk === "all" || program.risk === state.risk)
    .sort((a, b) => {
      const order = { 冲: 1, 稳: 2, 保: 3 };
      return order[a.risk] - order[b.risk] || a.minRank2025 - b.minRank2025;
    });
}

function renderResults() {
  const filters = currentFilters();
  const rows = filterPrograms();
  const cutoff = data.cutoffs.云南[2026][filters.primary];
  const allMatched = data.programs
    .filter((program) => program.primary === filters.primary)
    .filter((program) => matchesRequired(program, filters.subjects));

  $("#lineCard").textContent = `${filters.primary} ${cutoff.undergraduate}`;
  $("#matchCount").textContent = `${rows.length}`;

  const mix = allMatched.reduce((acc, program) => {
    const risk = classifyRisk(filters.rank, program.minRank2025);
    acc[risk] += 1;
    return acc;
  }, { 冲: 0, 稳: 0, 保: 0 });
  $("#riskMix").textContent = `冲${mix.冲} / 稳${mix.稳} / 保${mix.保}`;

  if (!rows.length) {
    $("#resultBody").innerHTML = `
      <tr>
        <td colspan="7">当前条件下演示库没有匹配结果。正式库需要导入全国院校专业组计划和历年位次后才能完整查询。</td>
      </tr>
    `;
    return;
  }

  $("#resultBody").innerHTML = rows
    .map(
      (program) => `
        <tr>
          <td><span class="badge risk-${program.risk}">${program.risk}</span></td>
          <td>
            <strong>${program.university}</strong><br>
            ${program.groupCode}<br>
            ${program.city}｜${program.level.join("、")}｜${program.ownership}
          </td>
          <td>
            <strong>${program.major}</strong><br>
            ${program.majorType}｜${program.batch}｜${program.fee}
          </td>
          <td>${program.required.join(" + ")}</td>
          <td>${program.minScore2025} 分<br>位次 ${program.minRank2025.toLocaleString()}</td>
          <td>${program.plan} 人</td>
          <td>${adviceFor(program.risk, program)}<br><span class="note">${program.sourceStatus}</span></td>
        </tr>
      `
    )
    .join("");
}

function bindEvents() {
  $("#primarySubject").addEventListener("change", () => {
    setupCombos();
    renderResults();
  });

  $("#searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    renderResults();
  });

  $("#keyword").addEventListener("input", (event) => {
    state.keyword = event.target.value;
    renderResults();
  });

  $$(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.risk = button.dataset.risk;
      $$(".tabs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderResults();
    });
  });

  ["subjectCombo", "majorInterest", "schoolLevel", "score", "rank"].forEach((id) => {
    $(`#${id}`).addEventListener("change", renderResults);
  });
}

setupCombos();
renderComboGrid();
renderSources();
bindEvents();
renderResults();
