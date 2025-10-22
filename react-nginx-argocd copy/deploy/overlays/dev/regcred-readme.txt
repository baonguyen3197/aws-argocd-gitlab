This application expects a Docker Hub registry secret named 'regcred' to exist in the 'web-dev' namespace.
Create it (if needed) with:

kubectl create secret docker-registry regcred \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=$DOCKERHUB_USERNAME \
  --docker-password=$DOCKERHUB_TOKEN \
  --namespace web-dev
