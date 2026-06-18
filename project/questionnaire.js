const STORAGE_KEY = "xvi-questionnaire-v1";
const data = window.QUESTIONNAIRE || [];
const answers = loadAnswers();
let saveTimer;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (_) {
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function saveAnswers() {
  $("#saveStatus").textContent = "正在保存";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    $("#saveStatus").textContent = "已保存";
  }, 250);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function isAnswered(question) {
  const answer = answers[question.id];
  return Boolean(answer && ((answer.text || "").trim() || (answer.choices || []).length));
}

function updateProgress() {
  const questions = data.flatMap((section) => section.questions);
  const completed = questions.filter(isAnswered).length;
  const percentage = questions.length ? Math.round((completed / questions.length) * 100) : 0;
  $("#progressText").textContent = `${completed} / ${questions.length}`;
  $("#progressBar").style.width = `${percentage}%`;
  $("#footerProgress").textContent = completed ? `已完成 ${percentage}%` : "尚未开始";
}

function renderQuestion(question) {
  const wrapper = document.createElement("article");
  wrapper.className = `question${question.core ? " core" : ""}`;
  wrapper.dataset.questionId = question.id;

  const number = document.createElement("span");
  number.className = "question-number";
  number.textContent = question.core ? "16" : String(question.number).padStart(2, "0");

  const heading = document.createElement("h3");
  heading.textContent = question.text;
  wrapper.append(number, heading);

  if (question.choices.length) {
    const choices = document.createElement("div");
    choices.className = "choice-list";
    question.choices.forEach((choice, index) => {
      const label = document.createElement("label");
      label.className = "choice";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = choice;
      input.name = `${question.id}-choice-${index}`;
      input.checked = (answers[question.id]?.choices || []).includes(choice);
      input.addEventListener("change", () => {
        const selected = [...choices.querySelectorAll("input:checked")].map((item) => item.value);
        answers[question.id] = { ...(answers[question.id] || {}), choices: selected };
        saveAnswers();
        updateProgress();
      });
      const labelText = document.createElement("span");
      labelText.textContent = choice;
      label.append(input, labelText);
      choices.append(label);
    });
    wrapper.append(choices);
  }

  const textarea = document.createElement("textarea");
  textarea.className = `answer-field${question.lines >= 3 ? " tall" : ""}`;
  textarea.placeholder = question.choices.length ? "补充说明（可选）" : "在这里回答";
  textarea.value = answers[question.id]?.text || "";
  textarea.addEventListener("input", () => {
    answers[question.id] = { ...(answers[question.id] || {}), text: textarea.value };
    saveAnswers();
    updateProgress();
  });
  wrapper.append(textarea);
  return wrapper;
}

function renderForm() {
  const nav = $("#sectionLinks");
  const form = $("#questionnaireForm");
  data.forEach((section, sectionIndex) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.innerHTML = `<b>${String(sectionIndex + 1).padStart(2, "0")}</b><span>${section.title}</span>`;
    nav.append(link);

    const block = document.createElement("section");
    block.className = "question-section";
    block.id = section.id;
    const heading = document.createElement("header");
    heading.className = "section-heading";
    heading.innerHTML = `<span>${String(sectionIndex + 1).padStart(2, "0")}</span><h2>${section.title}</h2>`;
    block.append(heading, ...section.questions.map(renderQuestion));
    form.append(block);
  });
  updateProgress();
}

function makeMarkdown() {
  const lines = ["# XVI / 十六开产品设计问卷回答", ""];
  data.forEach((section) => {
    lines.push(`## ${section.title}`, "");
    section.questions.forEach((question) => {
      const answer = answers[question.id] || {};
      lines.push(`### ${question.number}. ${question.text}`);
      if ((answer.choices || []).length) lines.push(`选择：${answer.choices.join("、")}`);
      lines.push((answer.text || "").trim() || "（未回答）", "");
    });
  });
  return lines.join("\n");
}

async function copyAnswers() {
  try {
    await navigator.clipboard.writeText(makeMarkdown());
    showToast("完整回答已复制，可以粘贴回对话");
  } catch (_) {
    const helper = document.createElement("textarea");
    helper.value = makeMarkdown();
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    showToast("完整回答已复制");
  }
}

function downloadAnswers() {
  const blob = new Blob([makeMarkdown()], { type: "text/markdown;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "XVI-产品设计问卷回答.md";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function observeSections() {
  const links = $$("#sectionLinks a");
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => link.classList.toggle("active", link.hash === `#${visible.target.id}`));
  }, { rootMargin: "-64px 0px -65% 0px", threshold: [0, 0.2] });
  $$(".question-section").forEach((section) => observer.observe(section));
}

$("#copyButton").addEventListener("click", copyAnswers);
$("#footerCopyButton").addEventListener("click", copyAnswers);
$("#downloadButton").addEventListener("click", downloadAnswers);
$("#resetButton").addEventListener("click", () => {
  if (!window.confirm("确定清空全部回答吗？此操作无法撤销。")) return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

renderForm();
observeSections();
