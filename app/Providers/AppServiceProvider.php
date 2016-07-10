<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Log;
use Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->setupListeners();
    }



    /**
     * Setup the event listeners.
     *
     * @return void
     */
    protected function setupListeners()
    {
        //
    }


    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerLogLevel();
    }

    /**
     *  register default log level
     */
    protected function registerLogLevel(){
        require_once __DIR__ . '/../../config/constant.php';
        $monolog = Log::getMonolog();
        foreach($monolog->getHandlers() as $handler) {
            $handler->setLevel(Config::get('app.log-level'));
        }
    }
}
