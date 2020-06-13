#! /usr/bin/env sh
BASEDIR=$(dirname "$0")

RUNNER=jest

while [ "$1" != "" ]; do
  case $1 in
  -r | --runner)
    shift
    RUNNER=$1
    ;;
  esac
  shift
done

echo "> Running with $RUNNER"

$($RUNNER $BASEDIR/../@smnielsen/cover-my-ass/$RUNNER.js)
