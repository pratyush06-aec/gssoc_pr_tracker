---
page: pr-check
---
A high-density PR Validator form for GSSoC Tracker.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Light version of the Crimson Protocol (Light Mode)
- Background: Ghost White (#FAFAFA)
- Surface: White (#FFFFFF)
- Primary Accent: Crimson Engine (#E11D48)
- Text Primary: Canvas Night (#09090B)
- Typography: Cabinet Grotesk (headers), Satoshi (body), JetBrains Mono (data)

**Page Structure:**
1. **Header:** Title "PR Validator Engine" with a subtitle "Check PR eligibility for GSSoC scoring".
2. **Main Form (Center Column):** A single 1200px max-width container. 
   - A large input field with a placeholder "Enter GitHub PR URL (e.g. https://github.com/org/repo/pull/123)".
   - A primary "Validate PR" button (Crimson Engine color).
3. **Validation Results Panel:** (Shown as an active state)
   - Status Indicator: Large green "VALID" or red "INVALID" badge.
   - PR Details: A 2-column grid showing extracted data: Repository Name, Author, PR Title, Merged Status, and Labels applied (e.g. "gssoc-ext", "level-2"). Use JetBrains Mono for data points.
   - Score Calculation: A prominent section showing "Calculated Score: +25 PTS" based on the L2 label.
4. **Recent Checks History:** A small sidebar or bottom section showing a list of recently validated PRs with their score and status.
