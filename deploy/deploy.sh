#!/bin/bash

STACK="nextjs-finance-app"
ENVIRONMENT=${ENV:-production}

echo "Trocando para VPS..."
docker context use finance-api

echo "Deploying ${STACK} in ${ENVIRONMENT}..."
docker stack deploy -c "${ENVIRONMENT}.yml" ${STACK} --with-registry-auth

echo "Voltando para maquina local..."
docker context use default
