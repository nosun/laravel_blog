#! /bin/bash

chown -R nosun.www-data $PWD
chmod -R 777 $PWD"/storage"
chmod -R 777 $PWD"/bootstrap/cache"

cp .env.example .env

/usr/bin/php artisan key:generate
