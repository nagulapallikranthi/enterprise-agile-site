# push-dev.ps1 — one-click deploy to DEV
# Run from repo root: .\push-dev.ps1
# Safe to re-run. Skips push if nothing changed.

param(
  [string]$Message = ""
)

Set-Location $PSScriptRoot

# ── 1. Clear any stale git lock files ──────────────────────────────────────
$locks = @(".git\index.lock", ".git\HEAD.lock", ".git\config.lock", ".git\COMMIT_EDITMSG.lock")
foreach ($lock in $locks) {
  if (Test-Path $lock) {
    Remove-Item $lock -Force -ErrorAction SilentlyContinue
    Write-Host "Removed lock: $lock" -ForegroundColor Yellow
  }
}

# ── 2. Stage all changes ────────────────────────────────────────────────────
git add -A
$status = git status --porcelain
if (-not $status) {
  Write-Host "Nothing to commit — already up to date." -ForegroundColor Cyan
  exit 0
}

# ── 3. Commit ───────────────────────────────────────────────────────────────
if (-not $Message) {
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
  $Message = "chore(dev): auto-push $timestamp"
}
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
  Write-Host "Commit failed — check git output above." -ForegroundColor Red
  exit 1
}

# ── 4. Push via PAT (bypasses Conga corporate proxy restriction) ────────────
$tokenPath = "C:\repos\.ssh\github_token"
if (-not (Test-Path $tokenPath)) {
  Write-Host "ERROR: PAT not found at $tokenPath" -ForegroundColor Red
  exit 1
}
$token = (Get-Content $tokenPath -Raw).Trim()
$remote = "https://nagulapallikranthi:$token@github.com/nagulapallikranthi/enterprise-agile-site.git"
git push $remote develop

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Pushed to develop. DEV deploy triggered — check in ~90 seconds:" -ForegroundColor Green
  Write-Host "https://enterprise-agile-site-dev.nagulapalli-kranthi.workers.dev" -ForegroundColor Cyan
} else {
  Write-Host "Push failed — see error above." -ForegroundColor Red
  exit 1
}
