<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class GenericHelpers
{
    public Static function GenerateGuid(): string
    {
        return (string)Str::uuid();
    }
}
