#!/bin/bash

# copyDest = the local path to which the built project will get copied

# remotePath = the path on the server (gets copied to pasteboard so can be pasted into termius)

src=$(pwd)/dist

for i in "$@"; do
  case $i in
  --copyDest=*)
    dest="${i#*=}"
    ;;
  --remotePath=*)
    path="${i#*=}"
    ;;
  esac
done

[ ! -d $dest ] && mkdir $dest

cd $dest && rm -rf *

cp -r $src/* $dest

cd $dest
git add -A
git commit -m "Update"
git push
sleep 2
echo "cd $path && git pull" | pbcopy
open "/Applications/Termius.app"
