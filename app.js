const data = window.GAOKAO_DATA;
const rankData = window.GAOKAO_RANK_DATA || {};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = {
  risk: "all",
  keyword: "",
  programs: data.programs,
  dataMode: "demo",
  importedName: ""
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
          <p class="source-verify">${source.linkStatus}<br>核验日期：${source.verifiedAt}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">${source.urlLabel || "打开来源"}</a></p>
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

function splitList(value) {
  return String(value || "")
    .split(/[+、,，;；|]/)
    .map((item) => item.trim())
    .filter(Boolean);
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
  return state.programs
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
  const allMatched = state.programs
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
  renderDataMode();

  if (!rows.length) {
    const emptyMessage = state.dataMode === "demo"
      ? "当前条件下演示库没有匹配结果。正式库需要导入全国院校专业组计划和历年位次后才能完整查询。"
      : "当前正式库没有匹配结果。请检查关键词、选科要求、专业方向和院校层次筛选条件，或核对导入 CSV 是否包含该院校专业组。";
    $("#resultBody").innerHTML = `
      <tr>
        <td colspan="7">${emptyMessage}</td>
      </tr>
    `;
    $("#mobileResultBody").innerHTML = `
      <article class="mobile-empty">
        ${emptyMessage}
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

function renderDataMode() {
  if (state.dataMode === "official") {
    $("#dataMode").textContent = `当前使用：正式库（${state.programs.length.toLocaleString()} 条）`;
    $("#importStatus").textContent = `${state.importedName} 已导入。查询结果按导入表中的院校专业组计划和最低位次筛选。`;
    $("#dataWarning").textContent = "当前结果来自已导入正式库。仍需确认每条记录的 source_url、source_publish_date、verified_status 和 verified_at；待核验记录不应用于最终填报。";
    return;
  }

  $("#dataMode").textContent = "当前使用：演示库";
  $("#importStatus").textContent = "正式查询需导入全国院校专业组计划和历年位次 CSV。";
  $("#dataWarning").textContent = "当前结果来自演示库，只用于验证查询逻辑，不代表完整可报清单。正式上线要导入全国高校在云南招生计划、2025-2026 投档位次后，才会生成完整冲稳保组合。";
}

function useOfficialPrograms(programs, importedName) {
  state.programs = programs;
  state.dataMode = "official";
  state.importedName = importedName;
  renderResults();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function csvToPrograms(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) throw new Error("CSV 至少需要表头和一行数据。");

  const headers = rows[0].map((header) => header.trim());
  const requiredHeaders = [
    "primary_subject",
    "university_name",
    "university_city",
    "group_code",
    "major_name",
    "major_type",
    "required_subjects",
    "plan_count",
    "min_score",
    "min_rank",
    "school_level",
    "ownership"
  ];
  const missing = requiredHeaders.filter((header) => !headers.includes(header));
  if (missing.length) throw new Error(`CSV 缺少字段：${missing.join("、")}`);

  const records = rows.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
  const programs = records.map((record, index) => {
    const minRank = Number(record.min_rank || record.min_rank_2025 || record.min_rank_2026 || record.min_rank_2024);
    const minScore = Number(record.min_score || record.min_score_2025 || record.min_score_2026 || record.min_score_2024);
    const plan = Number(record.plan_count);
    if (!record.university_name || !record.major_name || !record.group_code) {
      throw new Error(`第 ${index + 2} 行缺少院校、专业或专业组。`);
    }
    if (!Number.isFinite(minRank) || minRank < 1) {
      throw new Error(`第 ${index + 2} 行 min_rank 不是有效位次。`);
    }

    return {
      university: record.university_name.trim(),
      groupCode: record.group_code.trim(),
      city: record.university_city.trim() || record.university_province.trim() || "未标注",
      level: splitList(record.school_level || "普通本科"),
      ownership: record.ownership.trim() || "未标注",
      major: record.major_name.trim(),
      majorType: record.major_type.trim() || "未分类",
      batch: record.batch.trim() || "本科批",
      primary: record.primary_subject.trim(),
      required: splitList(record.required_subjects || record.primary_subject),
      plan: Number.isFinite(plan) && plan > 0 ? plan : 0,
      minScore2025: Number.isFinite(minScore) ? minScore : 0,
      minRank2025: minRank,
      fee: record.tuition ? `${record.tuition} 元/年` : "未标注",
      sourceStatus: `${record.verified_status || "待核验"}｜${record.source_name || "未标注来源"}`
    };
  });

  return programs;
}

function importOfficialCsv(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const programs = csvToPrograms(String(reader.result || ""));
      useOfficialPrograms(programs, file.name);
    } catch (error) {
      $("#importStatus").textContent = `导入失败：${error.message}`;
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetDemoData() {
  state.programs = data.programs;
  state.dataMode = "demo";
  state.importedName = "";
  $("#programImport").value = "";
  renderResults();
}

async function loadBundledOfficialData() {
  try {
    const response = await fetch("./data/official-programs.csv", { cache: "no-store" });
    if (!response.ok) return;
    const text = await response.text();
    const rows = parseCsv(text);
    if (rows.length < 2) {
      $("#importStatus").textContent = "已检测到 data/official-programs.csv，但还没有正式数据行。";
      return;
    }
    const programs = csvToPrograms(text);
    useOfficialPrograms(programs, "data/official-programs.csv");
  } catch (error) {
    $("#importStatus").textContent = `自动加载正式库失败：${error.message}`;
  }
}

function bindEvents() {
  $("#primarySubject").addEventListener("change", () => {
    setupCombos();
    renderResults();
  });

  $("#rankLookupButton").addEventListener("click", applyRankLookup);
  $("#programImport").addEventListener("change", (event) => importOfficialCsv(event.target.files[0]));
  $("#resetDemoData").addEventListener("click", resetDemoData);

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
loadBundledOfficialData();
