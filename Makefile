GHCR_REPO=ghcr.io/nokka/d2-armory-gui
GHCR_COMMIT_TAG=$(GHCR_REPO):commit-$(GITHUB_SHA)
VALID_TAG=$(shell echo $(TAG_NAME) | sed 's/[^a-z0-9_\.-]/-/g')

# Builds a local docker image for local use.
docker/local:
	docker build -f Dockerfile -t d2-armory-gui:local .

docker/run:
	docker run -p 9001:80 d2-armory-gui:local

# Builds docker image with the Github container registry commit tag.
docker/build:
	docker build -f Dockerfile -t $(GHCR_COMMIT_TAG) .

docker/tag:
	docker tag $(GHCR_COMMIT_TAG) $(GHCR_REPO):$(VALID_TAG)

docker/push:
	docker push $(GHCR_REPO)
