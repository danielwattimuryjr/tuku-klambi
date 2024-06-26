<?php

use App\Http\Controllers\Auth\DestroyAccountController;
use App\Http\Controllers\Auth\SecurityController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\CustomerActionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UploadPictureController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CustomerActionController::class, 'getActiveProducts'])->name('home');
Route::get('/product/{product}', [CustomerActionController::class, 'productDetailPage'])->name('product-detail');
Route::post('/product/{product}', [CustomerActionController::class, 'addToCart'])->name('add-to-cart');

Route::get('redirect-user', [HomeController::class, 'redirect'])->name('redirect-user');

Route::middleware('auth')->group(function () {
    Route::get('/my-cart', [CustomerActionController::class, 'showCartItems'])->name('show-user-cart');
    Route::delete('/remove-from-cart/{product}', [CustomerActionController::class, 'removeFromCart'])->name('remove-from-cart');
    Route::get('/checkout-form', [CustomerActionController::class, 'openCheckoutForm'])->name('open-checkout-form');
    Route::post('/checkout-form', [CustomerActionController::class, 'createOrder'])->name('create-order');
    Route::get('/upload-payment/{order}', [CustomerActionController::class, 'openUploadPaymentPage'])->name('open-upload-payment');
    Route::get('/my-orders', [CustomerActionController::class, 'openUserOrders'])->name('open-user-orders');
    Route::patch('/cancel-order/{order}', [CustomerActionController::class, 'cancelOrder'])->name('cancel-order');
    Route::get('/order-details/{order}', [CustomerActionController::class, 'showOrderDetail'])->name('show-order-details');
    Route::post('/store-payment/{order}', [PaymentController::class, 'store'])->name('payments.store');

    Route::controller(UploadPictureController::class)->group(function () {
        Route::post('/upload-picture/{folder_name}', 'upload')->name('upload-picture');
        Route::delete('/revert-picture/{folder_name}/{file_name}', 'revert')->name('revert-picture');
    });

    Route::controller(ProfileController::class)->group(function () {
        Route::get('profile', 'index')->name('profile.index');
        Route::patch('profile', 'update')->name('profile.update');
    });

    Route::controller(SecurityController::class)->group(function () {
        Route::get('security', 'index')->name('security.index');
        Route::patch('security', 'update')->name('security.update');
    });

    Route::controller(DestroyAccountController::class)->group(function () {
        Route::get('danger', 'index')->name('danger.index');
        Route::delete('danger', 'destroy')->name('danger.destroy');
    });

    Route::prefix('/admin-panel/')->middleware(['role:admin'])->group(function () {
        Route::resource('products', ProductController::class);

        Route::patch('products/{product}/update_status/{new_status}', [
            ProductController::class,
            'update_status'
        ])->name('products.update-status');

        Route::get('dashboard', DashboardController::class)->middleware(['verified'])->name('dashboard');

        Route::resource('users', UserController::class);

        Route::patch('/orders/{order}/update-status/{status}', [OrderController::class, 'update'])->name('orders.update');
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::delete('/orders/{order}/destroy', [OrderController::class, 'destroy'])->name('orders.destroy');
        Route::patch('/payments/{payment}/{status}', [PaymentController::class, 'update'])->name('payments.update');
        Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
        Route::patch('/products/{product}/update-image', [ProductController::class, 'updateProductImage'])->name('update-product-image');
        Route::get('/generate-report/{report_type}/{file_type}', [ReportController::class, 'index'])->name('generate-report');
    });
});

require __DIR__ . '/auth.php';
