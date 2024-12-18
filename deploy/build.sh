#!/bin/bash

IMAGE="app"
ENVIRONMENT=latest
IMAGE_NAME="supreme-succotash"
DESCRIPTION="NextJS App"

TAG=$(git rev-parse HEAD)
BASE_REGISTRY="ghcr.io/jeanmolossi"

IMAGE_LABEL="org.opencontainers.image.source=https://github.com/jeanmolossi"
IMAGE_DESC="org.opencontainers.image.description=$DESCRIPTION"

if [[ "$CR_PAT" == "" ]]; then
	echo "You should provide an ghp token"
	exit 1
fi

echo "Building $IMAGE..."
if [ ! -f Dockerfile ]; then
	echo "Dockerfile not found for $IMAGE..."
	exit 1
fi

IMG_TAG="${BASE_REGISTRY}/${IMAGE_NAME}-${IMAGE}"

docker build \
	--label="${IMAGE_LABEL}/$IMAGE_NAME" \
	--label="${IMAGE_DESC}" \
	-t $IMAGE .

CONTAINER_ID=$(docker image ls --filter=reference="$IMAGE:latest" -q)
echo "tagging image ${CONTAINER_ID//[$'\t\r\n']/}..."

docker tag $CONTAINER_ID "${IMG_TAG}:$TAG"
docker tag $CONTAINER_ID "${IMG_TAG}:${ENVIRONMENT}"

echo "TAG: ${IMG_TAG}:${TAG}"
echo "TAG: ${IMG_TAG}:${ENVIRONMENT}"
sleep 2

echo "Logging into github container registry..."
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

echo "Pushing docker image to github registry..."
docker push "${BASE_REGISTRY}/${IMAGE_NAME}-${IMAGE}:${ENVIRONMENT}"
