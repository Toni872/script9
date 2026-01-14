$ServerIP = "46.224.199.64"
$User = "root"
$RemotePath = "/root/frontend"

# 1. Skip Clean (Assume manual Tar)
# if (Test-Path "deploy_frontend.tar") { Remove-Item "deploy_frontend.tar" }

# 2. Skip Archive (Assume manual Tar)
# Write-Host "📦 Packaging Frontend (tar)..." -ForegroundColor Cyan
# cmd /c "tar -cf deploy_frontend.tar --exclude=node_modules --exclude=.next --exclude=.git --exclude=.venv ."

# 3. Upload
Write-Host "OUT: Uploading to $ServerIP..." -ForegroundColor Cyan
scp ./deploy_frontend.tar "${User}@${ServerIP}:/root/deploy_frontend.tar"
scp ./docker-compose.frontend.yml "${User}@${ServerIP}:/root/docker-compose.frontend.yml"

# 4. Deploy Remote
Write-Host "OUT: deploying..." -ForegroundColor Cyan
$RemoteCmd = "mkdir -p $RemotePath && tar -xvf /root/deploy_frontend.tar -C $RemotePath > /dev/null 2>&1 && mv /root/docker-compose.frontend.yml $RemotePath/docker-compose.yml && cd $RemotePath && docker compose down || true && docker compose up -d --build"
ssh $User@$ServerIP $RemoteCmd

Write-Host "DONE: DEPLOY SUCCESS! Visit http://$ServerIP" -ForegroundColor Green
