const data = window.GAOKAO_DATA;
const rankData = window.GAOKAO_RANK_DATA || {};
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
          <span class="source-rank">${source.priority}</span>
          <strong>${source.name}</strong>
          <p>${source.type}｜${source.status}</p>
          <p>${source.use}</p>
          <p class="source-fields">${source.fields}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">打开来源</a></p>
        </article>
      `
    )
    .join("");
}

function renderUpdateRules() {
  $("#updateGrid").innerHTML = data.updateRules
    .map(
      (rule) => `
        <article class="update-card">
          <strong>${rule.name}</strong>
          <span>${rule.cadence}</span>
          <p>${rule.owner}</p>
          <p>${rule.freshness}</p>
          <p>${rule.action}</p>
        </article>
      `
    )
    .join("");
}

function renderPolicyGrid() {
  $("#policyGrid").innerHTML = data.policyChecks
    .map(
      (item) => `
        <article class="policy-card">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
          <span>${item.status}</span>
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

function getRankTable() {
  const province = $("#province").value;
  const primary = $("#primarySubject").value;
  return rankData[province]?.[2026]?.[primary] || null;
}

function getRankMatch() {
  const table = getRankTable();
  const score = Number($("#score").value || 0);
  if (!table || !score) return null;
  const matchedRank = table.rows[String(score)];
  if (!matchedRank) return { table, score, matchedRank: null };
  return { table, score, matchedRank };
}

function updateRankLookupStatus() {
  const status = $("#rankLookupStatus");
  const rank = Number($("#rank").value || 0);
  const match = getRankMatch();

  if (!match) {
    status.textContent = "当前省份或科类还没有接入公开一分一段数据。请使用官方成绩查询或一分一段表录入位次。";
    status.className = "";
    return;
  }

  if (!match.matchedRank) {
    status.textContent = `${match.table.label} 暂未收录 ${match.score} 分的结构化位次。请用云南省官方一分一段表填写，导入完整表后可自动匹配。`;
    status.className = "is-warn";
    return;
  }

  const isConsistent = Math.abs(rank - match.matchedRank) <= 0;
  status.textContent = isConsistent
    ? `已匹配：${match.score} 分对应累计位次 ${match.matchedRank.toLocaleString()}。${match.table.verification}`
    : `公开表显示 ${match.score} 分对应累计位次 ${match.matchedRank.toLocaleString()}；当前填写 ${rank.toLocaleString()}，两者不一致。`;
  status.className = isConsistent ? "is-ok" : "is-alert";
}

function applyRankLookup() {
  const match = getRankMatch();
  if (!match?.matchedRank) {
    updateRankLookupStatus();
    return;
  }

  $("#rank").value = match.matchedRank;
  updateRankLookupStatus();
  renderResults();
}

function isRankConsistentWithPublicData() {
  const match = getRankMatch();
  if (!match?.matchedRank) return true;
  return Number($("#rank").value || 0) === match.matchedRank;
}

function rankAccuracyStatus(rank) {
  if (!rank || rank < 1) return "需官方位次";
  if (!isRankConsistentWithPublicData()) return "位次待核";
  return "按位次筛";
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
  $("#riskMix").textContent = rankAccuracyStatus(filters.rank);
  updateRankLookupStatus();

  if (!rows.length) {
    $("#resultBody").innerHTML = `
      <tr>
        <td colspan="7">当前条件下演示库没有匹配结果。正式库需要导入全国院校专业组计划和历年位次后才能完整查询。</td>
      </tr>
    `;
    $("#mobileResultBody").innerHTML = `
      <article class="mobile-empty">
        当前条件下演示库没有匹配结果。正式库需要导入全国院校专业组计划和历年位次后才能完整查询。
      </article>
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

  $("#mobileResultBody").innerHTML = rows
    .map(
      (program) => `
        <article class="result-card">
          <div class="result-card-head">
            <span class="badge risk-${program.risk}">${program.risk}</span>
            <span>${program.city}｜${program.ownership}</span>
          </div>
          <h3>${program.university}</h3>
          <p class="major-line">${program.major}</p>
          <dl>
            <div>
              <dt>专业组</dt>
              <dd>${program.groupCode}</dd>
            </div>
            <div>
              <dt>选科</dt>
              <dd>${program.required.join(" + ")}</dd>
            </div>
            <div>
              <dt>2025 最低</dt>
              <dd>${program.minScore2025} 分 / ${program.minRank2025.toLocaleString()} 位</dd>
            </div>
            <div>
              <dt>计划</dt>
              <dd>${program.plan} 人</dd>
            </div>
          </dl>
          <p class="card-advice">${adviceFor(program.risk, program)}</p>
        </article>
      `
    )
    .join("");
}

function bindEvents() {
  $("#primarySubject").addEventListener("change", () => {
    setupCombos();
    renderResults();
  });

  $("#rankLookupButton").addEventListener("click", applyRankLookup);

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
    $(`#${id}`).addEventListener("input", renderResults);
    $(`#${id}`).addEventListener("change", renderResults);
  });
}

setupCombos();
renderComboGrid();
renderSources();
renderUpdateRules();
renderPolicyGrid();
bindEvents();
renderResults();
