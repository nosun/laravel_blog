<?php

/*site define*/
define('CACHE_TIME',1440);

/*pathDefine*/

/* base path */
define('ROOT_PATH', dirname(__DIR__));
define('APP_PATH', ROOT_PATH . '/app');

/* resources */
define('RESOURCES_PATH', ROOT_PATH .'/resources');
define('VIEW_PATH', RESOURCES_PATH . '/views');

/* statics */
define('ASSETS_PATH', '/');

/* ajax http code */

define('AJAX_SUCCESS',200);
define('AJAX_INFO',201);
define('AJAX_DATA_END',210);
define('AJAX_ARGUMENT_ERROR',400);
define('AJAX_SIGNATURE_ERROR',401);
define('AJAX_FORBIDDEN',403);
define('AJAX_DATA_EMPTY',404);
define('AJAX_METHOD_NOT_ALLOW',405);
define('AJAX_UN_PROCESSABLE_ENTITY',422);
define('AJAX_TOO_MANY_ATTEMPTS',428);
define('AJAX_TOO_MANY_REQUEST',429);
define('AJAX_SERVER_ERROR',500);
