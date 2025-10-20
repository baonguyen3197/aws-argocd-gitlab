# aws-argocd-gitlab
## Label Node
```bash
kubectl label nodes <node-name> gitlab=true
kubectl label nodes <node-name> argocd=true

kubectl label nodes ip-10-0-0-109.ap-northeast-1.compute.internal gitlab-node=true
kubectl label nodes ip-10-0-1-197.ap-northeast-1.compute.internal argocd-node=true
```
## Set up
```bash
kubectl create namespace gitlab
```

## Install GitLab with Helm
```bash
helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm upgrade --install gitlab gitlab/gitlab \
  --timeout 600s \
  --set global.hosts.domain=example.com \
  --set global.hosts.externalIP=10.0.0.109 \
  --set certmanager-issuer.email=baonguyen3197@gmail.com \
  --namespace gitlab
```
```powershell
helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm upgrade --install gitlab gitlab/gitlab `
  --timeout 600s `
  --set global.hosts.domain=example.com `
  --set global.hosts.externalIP=10.0.0.109 `
  --set certmanager-issuer.email=baonguyen3197@gmail.com `
  --namespace gitlab
```

## Update StorageClass to gp2
```bash
helm upgrade --install gitlab gitlab/gitlab \
    -n gitlab \
    -f gitlab-values.yaml \
```

```powershell
helm upgrade --install gitlab gitlab/gitlab `
    -n gitlab `
    -f gitlab-values.yaml
```

## Check status
```bash
helm status gitlab -n gitlab
```