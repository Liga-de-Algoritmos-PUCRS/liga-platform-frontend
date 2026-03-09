#!/bin/bash

# ATENÇÃO: Executar a partir do top level.

# aborta se não estiver no top-level
if [[ ! -f package.json ]]; then
  echo "run from project root"
  exit 1
fi

# ------------------------------------
# Script Gerador de ZIP do Amplify
# ------------------------------------

# PROCESSO:
#   1. Gera um build de prod.
#   2. Gera um ZIP da pasta `dist` gerada, pronto para ser usado no deploy com Amplify

set -euo pipefail

npm run build:prod
cd dist
zip -r ../dist.zip .
cd ..
