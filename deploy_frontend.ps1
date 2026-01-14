$ServerIP = "46.224.199.64"
$User = "root"
$RemotePath = "/root/frontend"

# 1. Clean previous
if (Test-Path "deploy_frontend.tar") { Remove-Item "deploy_frontend.tar" }

# 2. Archive source (Excluding heavy folders)
# Using git archive requires committed changes. Using 7z or specific git command.
# Let's use git archive because it's cleanest (only tracked files).
# CHECK: Are changes committed? If not, we might lose them.
# BETTER: Use tar/7z to include local changes.
# Assuming standard tar is available or using git.

Write-Host "📦 Packaging Frontend..." -ForegroundColor Cyan
git archive --format=tar --output=./deploy_frontend.tar HEAD

# 3. Upload
Write-Host "📤 Uploading to $ServerIP..." -ForegroundColor Cyan
scp ./deploy_frontend.tar "${User}@${ServerIP}:/root/deploy_frontend.tar"
scp ./docker-compose.frontend.yml "${User}@${ServerIP}:/root/docker-compose.frontend.yml"

# 4. Deploy Remote
Write-Host "🔄 deploying..." -ForegroundColor Cyan
ssh $User@$ServerIP "
    mkdir -p $RemotePath &&
    tar -xvf /root/deploy_frontend.tar -C $RemotePath &&
    mv /root/docker-compose.frontend.yml $RemotePath/docker-compose.yml &&
    cd $RemotePath &&
    docker compose down || true &&
    docker compose up -d --build --remove-orphans
"

Write-Host "✅ DEPLOY SUCCESS! Visit http://$ServerIP" -ForegroundColor Green
