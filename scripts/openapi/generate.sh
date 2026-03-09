#!/bin/bash

# ATENÇÃO: Executar a partir do top level.

# aborta se não estiver no top-level
if [[ ! -f package.json ]]; then
  echo "run from project root"
  exit 1
fi

# ------------------------------------
# Gerador do SDK
# ------------------------------------

# PROCESSO:
#   1. Gera o SDK usando $BACKEND_OPENAPI_JSON_URL

BACKEND_OPENAPI_JSON_URL="http://localhost:3000/api-json"

set -euo pipefail

openapi-generator-cli generate -i "$BACKEND_OPENAPI_JSON_URL" -g typescript-axios -o src/api/sdk
