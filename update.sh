#!/bin/bash

git stash
git stash clear
git fetch origin master
git reset --hard FETCH_HEAD
npm run stop
npm run start