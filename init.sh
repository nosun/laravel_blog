#! /bin/bash

chown -R www-data.www-data $PWD
chmod -R 777 $PWD"/storage"
chmod -R 777 $PWD"/bootstrap/cache"
