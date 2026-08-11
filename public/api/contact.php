<?php
/**
 * Contact form endpoint (Massive Trout Fly Fishing)
 *
 * Accepts POST JSON or form data: name, email, phone, recipient, message, subscribe
 * Sends via SMTP (MTFF_SMTP_HOST) or falls back to PHP mail().
 *
 * Settings come from environment variables (see api/mtff-mail.php).
 */

declare(strict_types=1);
require __DIR__ . '/mtff-mail.php';

$input = mtff_read_json_input();

$name = mtff_clean($input['name'] ?? '');
$email = mtff_clean($input['email'] ?? '');
$phone = mtff_clean($input['phone'] ?? '');
$recipient = mtff_clean($input['recipient'] ?? 'General Message');
$message = mtff_clean($input['message'] ?? '');
$subscribe = !empty($input['subscribe']) ? 'YES' : 'NO';

if ($name === '') {
    mtff_fail(400, 'Please enter your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mtff_fail(400, 'Please enter a valid email address.');
}
if ($message === '') {
    mtff_fail(400, 'Please enter a message.');
}
if (strlen($message) > 5000) {
    mtff_fail(400, 'Message too long.');
}

$to = mtff_env('MTFF_RECIPIENT', 'mtroutff@gmail.com');
$from = mtff_env('MTFF_FROM', 'contact@massivetroutflyfishing.com');

$html = '<h3>[Massive Trout] ' . htmlspecialchars($recipient) . '</h3>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '<br>'
    . '<strong>E-mail:</strong> ' . htmlspecialchars($email) . '<br>'
    . '<strong>Phone:</strong> ' . htmlspecialchars($phone) . '<br>'
    . '<strong>Newsletter subscription:</strong> ' . $subscribe . '</p>'
    . '<p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';

$ok = mtff_send($to, $email, '[Massive Trout] ' . $recipient, $html);

if (!$ok) {
    mtff_fail(500, 'Error sending message. Please try again.');
}

http_response_code(200);
header('Content-Type: text/plain; charset=utf-8');
echo 'Message sent successfully!';