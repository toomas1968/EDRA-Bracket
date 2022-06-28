<?php

namespace App\Http\Controllers\API;
use App\Models\TournamentRacingResults;
use App\Models\Events;
use App\Models\Classes;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;



class TournamentRacingResultsAPIController extends Controller
{
    public function index(Request $request) 
    {
        try {
            $results = TournamentRacingResults::where([
                    ['eventID', '=', $request->eventID],
                    ['classID', '=', $request->classID]
                ])
                ->orderBy('ring_round', 'asc')
                ->orderBy('curPos', 'asc')
                ->get();

            $event = Events::where('eventId', $request->eventID)->first();
            $tournamentRacingResults = TournamentRacingResults::where('eventID', $request->eventID)->pluck('classID')->all();
            $carCategories = Classes::whereIn('classId', $tournamentRacingResults)->get();

        } catch (QueryException $e) {
            return $this->respondInvalidQuery();
        }

        //return ['data' => $results, 'test' => 'test'];
        return response()->json([
            "data" => $results,
            "classes" => $carCategories
        ]);
        //dd($results);
    }
}