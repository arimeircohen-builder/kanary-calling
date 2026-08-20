# Project Instructions

## Website changes

- For every requested change to this website, complete the implementation and appropriate validation, then commit the task's files and push the resulting commit to the GitHub `origin` remote automatically.
- Treat the GitHub push as part of completing the website task; do not wait for a separate request to push.
- Keep changes local only when the user explicitly says to keep them local or not to push.
- Preserve unrelated work and stage only files that belong to the requested task.

## Independent verification

- For every user-requested website change, always spawn the custom `website_reviewer` agent after implementation and primary validation but before publishing, pushing to GitHub, or reporting completion. Do not skip this review because a change appears small.
- Give the reviewer the original request, the changed files or diff, validation evidence, and the relevant route, viewport, breakpoint, state, or interaction details.
- For every visual or responsive change, provide the reviewer with a runnable preview or sufficient rendered evidence covering every relevant route, viewport, breakpoint, and state. Missing or insufficient rendered evidence is an actionable blocking finding and cannot receive a passing review.
- Keep the reviewer independent and read-only. The primary agent owns all fixes.
- Wait for the reviewer to finish. If it reports an actionable problem, fix the problem, rerun appropriate validation, and ask `website_reviewer` to review the revised result again. Repeat until the reviewer reports no actionable findings.
- Do not publish, push to GitHub, or tell the user the work is complete until the independent review passes.
