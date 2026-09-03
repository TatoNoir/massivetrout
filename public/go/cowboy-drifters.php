<?php
/**
 * Referral redirect: Cowboys Drifters
 *
 * When a visitor clicks the "Powered by Cowboy Drifters" link on the Massive
 * Trout site, this script:
 *   1. Sends a notification email (reusing the shared SMTP helper).
 *   2. Redirects the visitor to the partner website.
 *
 * Settings come from environment variables (see mtff-mail.php).
 */

declare(strict_types=1);
require __DIR__ . '/../api/mtff-mail.php';

$target = 'https://wyocowboydrifters.com/';
$destination = 'Cowboy Drifters (us/cowboy-drifters)';

$to = mtff_env('MTFF_RECIPIENT', 'mtroutff@gmail.com');
$from = mtff_env('MTFF_FROM', 'contact@massivetroutflyfishing.com');

$referer = mtff_clean($_SERVER['HTTP_REFERER'] ?? 'direct');
$agent = mtff_clean($_SERVER['HTTP_USER_AGENT'] ?? '');

$html = '<h3>[Massive Trout] Referral click</h3>'
    . '<p>A visitor clicked the referral link to <strong>' . htmlspecialchars($destination) . '</strong> from the Massive Trout website.</p>'
    . '<p><strong>Destination:</strong> ' . htmlspecialchars($target) . '</p>'
    . '<p><strong>Date:</strong> ' . date('Y-m-d H:i:s T') . '</p>'
    . '<p><strong>Referrer page:</strong> ' . htmlspecialchars($referer) . '</p>'
    . '<p><strong>User agent:</strong> ' . htmlspecialchars($agent) . '</p>';

mtff_send($to, $from, '[Massive Trout] Referral click: ' . $destination, $html);

header('Location: ' . $target, true, 302);
exit;
