#!/usr/bin/env bash
set -e # fail on error
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"
cd "${DIR}"

npm i -g firebase firebase-tools
firebase setup:emulators:firestore