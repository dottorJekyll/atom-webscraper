#!/bin/sh

node ./app.js -c $CONFIG_PATH/$1 -u $2 -o $DATA_PATH/$3 | tee
