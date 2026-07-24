# Graph Report - /Users/daniyalrizvi/Desktop/UIL Math Practice Website  (2026-07-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 359 nodes · 624 edges · 25 communities (21 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.7)
- Token cost: 1,346 input · 182 output

## Graph Freshness
- Built from commit: `79f1df97`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Babel Runtime Helpers
- App Constants and Utilities
- Admin Panel Components
- Package Configuration
- History and Analytics Pages
- Problem View Components
- Community Solutions Module
- AI Answer Key Parser
- Frontend CDN Dependencies
- Mastery and Achievements
- AI Boundary Extraction
- Leaderboard Components
- AI Question Verifier
- App Entry and Settings
- Custom React Hooks
- Leaderboard Page JSX
- Data Export Utilities
- AI API Core
- Babel Configuration
- Supabase Client

## God Nodes (most connected - your core abstractions)
1. `App()` - 22 edges
2. `ReviewImportsPanel()` - 16 edges
3. `AdminQuestionManager()` - 16 edges
4. `ProblemView()` - 13 edges
5. `ADMIN_EMAILS` - 13 edges
6. `_regenerator()` - 11 edges
7. `HistoryPage()` - 11 edges
8. `_asyncToGenerator()` - 10 edges
9. `_slicedToArray()` - 10 edges
10. `Landing Page (index.html)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `App HTML (Problems Page)` --references--> `Favicon SVG`  [EXTRACTED]
  app.html → assets/favicon.svg
- `Landing Page (index.html)` --references--> `Favicon SVG`  [EXTRACTED]
  index.html → assets/favicon.svg
- `Landing Page (index.html)` --references--> `Logo Icon SVG`  [EXTRACTED]
  index.html → assets/logo-icon.svg
- `Landing Page (index.html)` --references--> `UIL General Mathematics Competition`  [EXTRACTED]
  index.html → README.md
- `Landing Page (index.html)` --references--> `Supabase JS SDK (CDN)`  [EXTRACTED]
  index.html → app.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Authentication Flow (Sign In / Sign Up / Google / Sign Out)** — index_handlesignin, index_handlesignup, index_handlegoogleauth, index_handlesignout, concept_supabase_auth, concept_google_auth [EXTRACTED 0.90]
- **External CDN Dependencies** — ext_react, ext_reactdom, ext_tailwindcss, ext_katex, ext_supabase_js, ext_jspdf [EXTRACTED 1.00]

## Communities (25 total, 4 thin omitted)

### Community 0 - "Babel Runtime Helpers"
Cohesion: 0.09
Nodes (37): App(), _arrayLikeToArray(), _arrayWithHoles(), _arrayWithoutHoles(), _assertThisInitialized(), _asyncToGenerator(), _callSuper(), _classCallCheck() (+29 more)

### Community 1 - "App Constants and Utilities"
Cohesion: 0.08
Nodes (22): ADMIN_EMAILS, ALLOWED_IMAGE_TYPES, AVATAR_COLORS, DIFF_PILL, DIFFICULTIES, getMasteryLevel(), MASTERY_LEVELS, SOURCE_TYPES (+14 more)

### Community 2 - "Admin Panel Components"
Cohesion: 0.19
Nodes (29): AdminBugReports(), AdminQuestionManager(), AdminReports(), AdminUserActivity(), _arrayLikeToArray(), _arrayWithHoles(), _arrayWithoutHoles(), _asyncToGenerator() (+21 more)

### Community 3 - "Package Configuration"
Cohesion: 0.08
Nodes (24): @babel/cli, @babel/preset-env, @babel/preset-react, author, bugs, url, description, devDependencies (+16 more)

### Community 4 - "History and Analytics Pages"
Cohesion: 0.17
Nodes (23): AnalyticsPage(), _arrayLikeToArray(), _arrayWithHoles(), _arrayWithoutHoles(), _asyncToGenerator(), _defineProperty(), HistoryDetailModal(), HistoryPage() (+15 more)

### Community 5 - "Problem View Components"
Cohesion: 0.17
Nodes (23): DiffPill(), _arrayLikeToArray(), _arrayWithHoles(), _arrayWithoutHoles(), _asyncToGenerator(), _defineProperty(), _iterableToArray(), _iterableToArrayLimit() (+15 more)

### Community 6 - "Community Solutions Module"
Cohesion: 0.19
Nodes (21): _arrayLikeToArray(), _arrayWithHoles(), _arrayWithoutHoles(), _asyncToGenerator(), CommunitySolutions(), _defineProperty(), _iterableToArray(), _iterableToArrayLimit() (+13 more)

### Community 7 - "AI Answer Key Parser"
Cohesion: 0.14
Nodes (17): ANTHROPIC_API_KEY, choiceLetter(), CORS_HEADERS, finalizeIfDone(), markFailed(), QuestionBoundary, runWithConcurrency(), SOLVE_TOOL (+9 more)

### Community 8 - "Frontend CDN Dependencies"
Cohesion: 0.13
Nodes (16): App HTML (Problems Page), Favicon SVG, Logo Icon SVG, Google Sign-In (OAuth), Supabase Authentication, UIL General Mathematics Competition, jsPDF (CDN), KaTeX (CDN) (+8 more)

### Community 9 - "Mastery and Achievements"
Cohesion: 0.27
Nodes (14): AchievementCard(), _arrayLikeToArray(), _arrayWithHoles(), _defineProperty(), _iterableToArrayLimit(), MasteryPage(), _nonIterableRest(), _objectSpread() (+6 more)

### Community 10 - "AI Boundary Extraction"
Cohesion: 0.20
Nodes (12): ANTHROPIC_API_KEY, BOUNDARIES_TOOL, ClaudeQuestionBoundary, CORS_HEADERS, extractBoundariesForPage(), markFailed(), processNextPage(), QuestionBoundary (+4 more)

### Community 11 - "Leaderboard Components"
Cohesion: 0.30
Nodes (11): Dropdown(), _arrayLikeToArray(), _arrayWithHoles(), _iterableToArrayLimit(), LBAvatar(), LBRankBadge(), lbRelTime(), LeaderboardPage() (+3 more)

### Community 12 - "AI Question Verifier"
Cohesion: 0.21
Nodes (9): ANTHROPIC_API_KEY, choiceLetter(), CORS_HEADERS, IncomingQuestion, SOLVE_TOOL, streamToolCall(), verifyOne(), VerifyResult (+1 more)

### Community 13 - "App Entry and Settings"
Cohesion: 0.20
Nodes (4): ALLOWED_AVATAR_TYPES, ErrorBoundary, mountApp(), SettingsPage()

### Community 14 - "Custom React Hooks"
Cohesion: 0.38
Nodes (9): _arrayLikeToArray(), _arrayWithHoles(), _iterableToArrayLimit(), _nonIterableRest(), _slicedToArray(), _unsupportedIterableToArray(), useLocalStorage(), useTheme() (+1 more)

### Community 15 - "Leaderboard Page JSX"
Cohesion: 0.29
Nodes (5): LB_DAY_OPTIONS, LB_DIFF_OPTIONS, LB_TOPIC_OPTIONS, lbRelTime(), LeaderboardPage()

## Knowledge Gaps
- **53 isolated node(s):** `presets`, `DIFF_PILL`, `TOPIC_DOT`, `SOURCE_TYPES`, `AVATAR_COLORS` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `App()` connect `Babel Runtime Helpers` to `App Constants and Utilities`, `Admin Panel Components`, `History and Analytics Pages`, `Problem View Components`, `Mastery and Achievements`, `Leaderboard Components`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **Why does `ProblemView()` connect `Problem View Components` to `Babel Runtime Helpers`, `History and Analytics Pages`, `Community Solutions Module`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `ADMIN_EMAILS` connect `App Constants and Utilities` to `Babel Runtime Helpers`, `Admin Panel Components`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `App()` (e.g. with `AdminQuestionManager()` and `AnalyticsPage()`) actually correct?**
  _`App()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `ReviewImportsPanel()` (e.g. with `AdminQuestionManager()` and `DiffPill()`) actually correct?**
  _`ReviewImportsPanel()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `AdminQuestionManager()` (e.g. with `AdminBugReports()` and `AdminUserActivity()`) actually correct?**
  _`AdminQuestionManager()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `ProblemView()` (e.g. with `App()` and `CommunitySolutions()`) actually correct?**
  _`ProblemView()` has 6 INFERRED edges - model-reasoned connections that need verification._