# aws-argocd-gitlab
============================
## Get AWS K8s config
```bash
aws eks --region <region> update-kubeconfig --name <cluster_name>
```

============================
## Label Node
```bash
kubectl label nodes <node-name> gitlab=true
kubectl label nodes <node-name> argocd=true

kubectl label nodes ip-10-0-0-101.ap-northeast-1.compute.internal gitlab-node=true
kubectl label nodes ip-10-0-0-5.ap-northeast-1.compute.internal argocd-node=true
kubectl label nodes ip-10-0-0-173.ap-northeast-1.compute.internal npm-node=true
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
  --set global.hosts.domain=nhqb-gitlab.duckdns.org \
  --set global.hosts.externalIP=10.0.0.101 \
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
    -f gitlab-values.yaml
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

## Get Secret
```bash
kubectl get secret gitlab-gitlab-initial-root-password -n gitlab -ojsonpath='{.data.password}' | base64 --decode ; echo
```

```powershell
kubectl get secret gitlab-gitlab-initial-root-password -n gitlab -ojsonpath='{.data.password}' | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($_)) }
``` 

## Uninstall GitLab
```bash
helm uninstall gitlab -n gitlab
kubectl delete namespace gitlab
```

============================
## Deploy NPM Registry
```bash
kubectl apply -f nginx-proxy-manager/npm-values.yaml
kubectl -n npm get svc npm -w
```
