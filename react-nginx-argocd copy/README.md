# React + Nginx + Argo CD • Lab Starter

## 1) Build & Push Image
```bash
cd app
# Edit image registry in deploy/base/deployment.yaml or use kustomize images override
docker build -t ghcr.io/your-org/react-nginx-lab:1.0.0 .
docker push ghcr.io/your-org/react-nginx-lab:1.0.0
```

## 2) Apply Argo CD Applications
```bash
kubectl create ns argocd --dry-run=client -o yaml | kubectl apply -f - 2>/dev/null || true
kubectl apply -f deploy/argocd/app-dev.yaml
# kubectl apply -f deploy/argocd/app-uat.yaml
# kubectl apply -f deploy/argocd/app-prod.yaml
```

Open Argo CD UI → Sync app → Wait for `Healthy/Synced`.

## 3) Access Service
If you have an Ingress controller, add an ingress in overlays or port-forward:
```bash
kubectl -n web-dev port-forward svc/dev-react-nginx 8080:80
open http://localhost:8080
```

## 4) CI Hint
Your CI should:
- build & push image
- bump the overlay image tag (kustomize `images:`)
- commit & push → Argo CD auto-sync
```bash
# example to bump tag via yq
yq -i '.images[0].newTag = "1.0.1"' deploy/overlays/dev/kustomization.yaml
git commit -am "bump dev to 1.0.1" && git push
```
