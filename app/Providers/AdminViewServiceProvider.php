<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AdminViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishLanguages();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Publish package language to Laravel project.
     */
    private function publishLanguages()
    {
        $this->loadTranslationsFrom(ROOT_PATH.'/resources/lang', 'adminLang');

    }
}
