#! /usr/bin/env sh
BASEDIR=$(dirname "$0")

FILE="$BASEDIR/../@smnielsen/cover-my-ass/mocha.js"
mocha "$FILE"
