#!/bin/bash

# ATENÇÃO: Executar a partir do top level.

# aborta se não estiver no top-level
if [[ ! -f package.json ]]; then
  echo "run from project root"
  exit 1
fi

# ------------------------------------
# Script Gerador de Build de Prod
# ------------------------------------

# PROCESSO:
#   1. Muda o path para produção em todos os arquivos do SDK
#   2. Builda o projeto
#   3. Muda o path para desenvolviemnto novamente para os arquvios do SDK

set -euo pipefail

DEV_URL="http://localhost"
DEV_PORT="3000"
PROD_URL="https://api-flameup.oryzalabs.com"

# macOS sed requires -i ''
if [[ "$(uname)" == "Darwin" ]]; then
  SED_I=(-i '')
else
  SED_I=(-i)
fi

sed "${SED_I[@]}" "s|$DEV_URL:$DEV_PORT|$PROD_URL|g" ./src/api/client.ts
sed "${SED_I[@]}" "s|$DEV_URL|$PROD_URL|g" ./src/api/sdk/base.ts

npm run build

sed "${SED_I[@]}" "s|$PROD_URL|$DEV_URL:$DEV_PORT|g" ./src/api/client.ts
sed "${SED_I[@]}" "s|$PROD_URL|$DEV_URL|g" ./src/api/sdk/base.ts
