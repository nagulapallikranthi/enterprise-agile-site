# push-prod.ps1 — promote develop → main → triggers PROD deploy (requires GitHub manual approval)
# Run only after DEV QA passes. Run from repo root: .\push-prod.ps1

Set-Location $PSScriptRoot

$locks = @(".git\index.lock", ".git\HEAD.lock", ".git\config.lock")
foreach ($lock in $locks) {
  if (Test-Path $lock) { Remove-Item $lock -Force -ErrorAction SilentlyContinue }
}

$tokenPath = "C:\repos\.ssh\github_token"
if (-not (Test-Path $tokenPath)) {
  Write-Host "ERROR: PAT not found at $tokenPath" -ForegroundColor Red
  exit 1
}
$token = (Get-Content $tokenPath -Raw).Trim()
$remote = "https://nagulapallikranthi:$token@github.com/nagulapallikranthi/enterprise-agile-site.git"

# Merge develop into main and push
git checkout main
git merge develop --no-ff -m "chore(release): promote develop → main $(Get-Date -Format 'yyyy-MM-dd')"
git push $remote main

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Pushed to main. PROD deploy queued — approve in GitHub Actions:" -ForegroundColor Green
  Write-Host "https://github.com/nagulapallikranthi/enterprise-agile-site/actions" -ForegroundColor Cyan
} else {
  Write-Host "Push failed — see error above." -ForegroundColor Red
}

# Return to develop
git checkout develop
