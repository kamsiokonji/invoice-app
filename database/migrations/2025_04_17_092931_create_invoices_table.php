<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('from_address');
            $table->string('from_city');
            $table->string('from_zipcode');
            $table->string('from_country');
            $table->string('to_address');
            $table->string('to_city');
            $table->string('to_zipcode');
            $table->string('to_country');
            $table->string('client_email');
            $table->string('client_name');
            $table->string('invoice_number');
            $table->enum('status', ['pending', 'paid', 'draft'])->default('pending');
            $table->date('due_date');
            $table->string('project_description');
            $table->unsignedInteger('payment_terms')->default(30);
            $table->integer('total_amount');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
