<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Events;
use App\Models\Classes;
use App\Models\TournamentRacingResults;
use DB;

class EventsController extends Controller
{
    public function index() 
    {
        $events = Events::orderBy('isActive', 'desc')->get();
        
        return view('events.index')->with('events', $events);
    }

    public function create() 
    {
        return view('create');
    }

    public function classesList($eventId) 
    {
        $event = Events::where('eventId', $eventId)->first();
        $tournamentRacingResults = TournamentRacingResults::where('eventID', $eventId)->pluck('classID')->all();
        $carCategories = Classes::whereIn('classId', $tournamentRacingResults)->get();

        return view('classes.index')->with('event', $event)->with('carCategories', $carCategories);
    }


    public function bracketTest($eventID) 
    {
        $event = Events::where('eventId', $eventID)->first();
        $tournamentRacingResults = TournamentRacingResults::where('eventID', $eventID)->pluck('classID')->all();
        $classID = Classes::whereIn('classId', $tournamentRacingResults)->first();
        
        return view('bracket.index')->with('eventID', $eventID)->with('classID', $classID->classID);
    }

    public function bracket($eventID, $classID) 
    {
        return view('bracket.index')->with('eventID', $eventID)->with('classID', $classID);
    }


}
