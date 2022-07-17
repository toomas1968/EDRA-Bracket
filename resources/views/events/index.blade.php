<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Events list') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    events
                </div>

                <div class="flex justify-center">
                  <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                    @foreach($events as $event)
                        <li class="px-6 py-2 border-b border-gray-200 w-full"> 
                            @if($event->isActive)
                                <a style="color: green;" href="{{ route('bracket.test', $event->eventID)}}">{{ $event->eventName }} </a>
                            @else
                                <a href="{{ route('events.classes', $event->eventID)}}">{{ $event->eventName }} not active</a>
                            @endif
                        </li>
                    @endforeach
                  </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>