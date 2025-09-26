<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LicenseBypassMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Bypass tất cả kiểm tra license
        if ($request->is('install/*') || $request->is('admin/license*')) {
            // Cho phép truy cập vào các route license
            return $next($request);
        }

        return $next($request);
    }
}
