<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->integer('points')->default(0);
            $table->string('nfc_number', 255);
            $table->string('password', 255);
            $table->unsignedBigInteger('teams_id');
            $table->timestamps();

            $table->foreign('teams_id')
                ->references('id')
                ->on('teams')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('players', function (Blueprint $table) {
            $table->dropForeign(['teams_id']);
        });

        Schema::dropIfExists('players');
    }
};

