import json
import re
from pathlib import Path

from build_questionnaire import SECTIONS


output = []
number = 1
for index, (title, questions) in enumerate(SECTIONS, start=1):
    clean_title = re.sub(r"^[一二三四五六七八九十]+、", "", title)
    section = {"id": f"section-{index}", "title": clean_title, "questions": []}
    for text, choices, lines, core in questions:
        section["questions"].append({
            "id": f"q{number}",
            "number": number,
            "text": text,
            "choices": choices,
            "lines": lines,
            "core": core,
        })
        number += 1
    output.append(section)

target = Path("/Users/mymac/Documents/Codex/2026-06-16/project/questionnaire-data.js")
target.write_text(
    "window.QUESTIONNAIRE = " + json.dumps(output, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)
print(f"{target} ({number - 1} questions)")
