<html>
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />
    <meta
        http-equiv="X-UA-Compatible"
        content="ie=edge"
    />
    <title>
        Team Challenge
    </title>
    <link
        rel="stylesheet"
        href="{{ asset('css/app.css') }}"
    />
</head>
<body class="w-full h-full bg-gray-100">
    <div class="w-4/5 mx-auto">
        <div class="text-center pt-20">
            <h1 class="text-3xl text-gray-700">
                All Teams
            </h1>
            <hr class="border border-1 border-gray-300 mt-10">
        </div>
    </div>

    @foreach($teams as $team)
        <div class="w-4/5 mx-auto pb-10">
            <div class="bg-white pt-10 rounded-lg drop-shadow-2xl sm:basis-3/4 basis-full sm:mr-8 pb-10 sm:pb-0">
                <div class="w-11/12 mx-auto pb-10">

                    <p class="text-gray-900 text-lg py-8 w-full break-words">
                        {{ $team->name }}
                    </p>

                    <span class="text-gray-500 text-sm sm:text-base">
                    Team:
                        <a href="{{ route('team.show', $team->id) }}"
                           class="text-green-500 italic hover:text-green-400 hover:border-b-2 border-green-400 pb-3 transition-all">
                        </a>
                </span>
                </div>
            </div>
        </div>
    @endforeach
</body>
</html>
