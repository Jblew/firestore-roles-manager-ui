#!/usr/bin/env bash
set -e # fail on error
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
cd "${DIR}"

npx firestore-rules generate demo/config.js demo/project.firestore.rules demo/deploy.firestore.rules

cd demo && firebase emulators:start &

npm run serve