<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts',function(Blueprint $table){
            $table->increments('id');
            $table->integer('sid');
            $table->string('name', 100);
            $table->string('type', 20);
            $table->string('belong',128);
            $table->string('account', 128);
            $table->string('password', 128);
            $table->string('address', 255);
            $table->string('tag',1024);
            $table->text('info');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('accounts');
    }
}
