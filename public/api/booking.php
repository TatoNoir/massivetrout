<?php
/**
 * Booking request endpoint (Massive Trout Fly Fishing)
 *
 * Accepts POST JSON or form data: program_id, program, name, email, phone,
 * passengers, season, dates (+ company_website honeypot field).
 * Sends via SMTP (MTFF_SMTP_HOST) or falls back to PHP mail().
 *
 * Settings come from environment variables (see api/mtff-mail.php).
 */

declare(strict_types=1);
require __DIR__ . '/mtff-mail.php';

$input = mtff_read_json_input();

// Honeypot: silently ignore bots.
if (!empty($input['company_website'])) {
    mtff_ok('Booking request received. Thank you!');
}

$programId = mtff_clean($input['program_id'] ?? '');
$program = mtff_clean($input['program'] ?? '');
$category = mtff_clean($input['category'] ?? '');
$name = mtff_clean($input['name'] ?? '');
$email = mtff_clean($input['email'] ?? '');
$phone = mtff_clean((string) ($input['phone'] ?? ''));
$passengers = mtff_clean((string) ($input['passengers'] ?? ''));
$season = mtff_clean($input['season'] ?? '');
$dates = mtff_clean($input['dates'] ?? '');

if ($name === '') {
    mtff_fail(400, 'Please enter your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mtff_fail(400, 'Please enter a valid email address.');
}
if ($programId === '') {
    mtff_fail(400, 'Please select a program.');
}
if ($passengers === '' || (int) $passengers < 1 || (int) $passengers > 8) {
    mtff_fail(400, 'Please enter a valid number of passengers (1-8).');
}

$to = mtff_env('MTFF_RECIPIENT', 'mtroutff@gmail.com');
$from = mtff_env('MTFF_FROM', 'contact@massivetroutflyfishing.com');

$subject = '[Massive Trout] Booking Request'
    . ($category !== '' ? ' - ' . $category : '')
    . ($program !== '' ? ' - ' . $program : '');

$html = '<h3>[Massive Trout] Booking Request</h3>'
    . '<p>'
    . ($category !== '' ? '<strong>Category:</strong> ' . htmlspecialchars($category) . '<br>' : '')
    . '<strong>Program:</strong> ' . htmlspecialchars($program)
    . ' (' . htmlspecialchars($programId) . ')<br>'
    . '<strong>Name:</strong> ' . htmlspecialchars($name) . '<br>'
    . '<strong>E-mail:</strong> ' . htmlspecialchars($email) . '<br>'
    . '<strong>Phone:</strong> ' . htmlspecialchars($phone) . '<br>'
    . '<strong>Passengers:</strong> ' . htmlspecialchars($passengers) . '<br>'
    . '<strong>Travel season:</strong> ' . htmlspecialchars($season) . '<br>'
    . '<strong>Travel dates:</strong> ' . htmlspecialchars($dates) . '</p>';

$ok = mtff_send($to, $email, $subject, $html);

if (!$ok) {
    mtff_fail(500, 'Error sending message. Please try again.');
}

mtff_ok('Booking request sent successfully!');

/**
 * Respond 200 with a plain-text message.
 */
function mtff_ok(string $message): void {
    http_response_code(200);
    header('Content-Type: text/plain; charset=utf-8');
    echo $message;
    exit;
}
