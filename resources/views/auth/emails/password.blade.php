{{-- resources/views/emails/password.blade.php --}}

{{ trans('adminLang::message.passwordclickreset') }} <a href="{{ url('password/reset/'.$token) }}">{{ url('password/reset/'.$token) }}</a>