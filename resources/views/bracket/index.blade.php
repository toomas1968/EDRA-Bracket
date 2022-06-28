<x-app-layout>
    <div class="py-12">
        <body id="wrapper-main-bracket" class="bg-white">
            <div id="wrapper-header-bracket" class="bg-light-gray rounded verdana-gray header">
                <div>Tournament Bracket Maker</div>
            </div>

            <div id="wrapper-content-bracket">            
                <div id="content">
                    <div id="content-left-pane" class="rounded bg-light-gray">
                        <div id="left-pane-header", class="verdana-gray">
                            <div>Car Numbers:</div>
                        </div>

                        <div id="left-pane-content">
                            <div id="e-list"></div>
                        </div>
                    </div>

                    <div id="content-main">
                        <div id="bracket" class="verdana-gray">            
                            <!-- FILLS ON makeBracket() CLICK -->
                        </div>

                    </div>
                </div>
            </div>
        </body>

        @section('footer-scripts')
            <script type="text/javascript">
                window.onload = function() {
                    _E_List = new EntriesList({{ $eventID }} , {{$classID }});
                    _E_List_Element = document.getElementById(ID_E_LIST);
                    _B_Element = document.getElementById(ID_B);
                    _B_Row_Elements = [];
                    
                    makeBracket();
                }
            </script>
        @endsection
        
    </div>
</x-app-layout>