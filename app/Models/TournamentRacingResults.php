<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentRacingResults extends Model
{
    use HasFactory;

    protected $connection = 'external_mysql';
    protected $table = 'tournament_racing_results';
}
