# aws-argocd-gitlab
============================
## Get AWS K8s config
```bash
aws eks --region <region> update-kubeconfig --name <cluster_name>
```
============================
## Install GitLab with Helm
```bash
helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm upgrade --install gitlab gitlab/gitlab \
  -n gitlab \
  --create-namespace \
  -f ./gitlab/gitlab-values.yaml \
  --set global.hosts.domain=nhqb-gitlab.duckdns.org \
  --set global.hosts.externalIP=10.0.0.62 \
  --set certmanager-issuer.email=baonguyen3197@gmail.com \
  --namespace gitlab

kubectl apply -f gitlab/gp2-csi.yaml
kubectl patch storageclass gp2-csi -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

helm upgrade --install gitlab gitlab/gitlab -n gitlab -f gitlab/gitlab-values.yaml

kubectl apply -f gitlab/gitlab-ingress.yaml
```
```powershell
helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm upgrade --install gitlab gitlab/gitlab `
  -n gitlab `
  --create-namespace `
  -f ./gitlab/gitlab-values.yaml `
  --set global.hosts.domain=nhqb-gitlab.duckdns.org `
  --set global.hosts.externalIP=52.192.65.76 `
  --set certmanager-issuer.email=baonguyen3197@gmail.com `
  --namespace gitlab
```

## Update StorageClass to gp2
```bash
kubectl apply -f gitlab/gp2-csi.yaml
kubectl patch storageclass gp2-csi -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

helm upgrade --install gitlab gitlab/gitlab -n gitlab -f gitlab/gitlab-values.yaml

kubectl apply -f gitlab/gitlab-ingress.yaml
```

```bash
helm upgrade --install gitlab gitlab/gitlab \
    -n gitlab \
  -f ./gitlab/gitlab-values.yaml
```

```powershell
helm upgrade --install gitlab gitlab/gitlab `
    -n gitlab `
  -f .\gitlab\gitlab-values.yaml
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
