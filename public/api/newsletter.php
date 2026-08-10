<?php
/**
 * Newsletter subscription endpoint (Massive Trout Fly Fishing)
 *
 * Accepts POST JSON or form data: email
 * Sends via SMTP (MTFF_SMTP_HOST) or falls back to PHP mail().
 *
 * Settings come from environment variables (see api/mtff-mail.php).
 */

declare(strict_types=1);
require __DIR__ . '/mtff-mail.php';

$input = mtff_read_json_input();
$email = mtff_clean($input['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mtff_fail(400, 'Please enter a valid email address.');
}

$to = mtff_env('MTFF_RECIPIENT', 'marianopainefil@gmail.com');
$from = mtff_env('MTFF_FROM', 'contact@massivetroutflyfishing.com');

$html = '<p>Hello!</p>'
    . '<p>The following email has subscribed to the newsletter:</p>'
    . '<p><strong>E-mail:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p>End of message</p>';

$ok = mtff_send($to, $email, '[Massive Trout] Newsletter Subscription', $html);

if (!$ok) {
    mtff_fail(500, 'Error sending message. Please try again.');
}

http_response_code(200);
header('Content-Type: text/plain; charset=utf-8');
echo 'Subscription received. Thank you!';