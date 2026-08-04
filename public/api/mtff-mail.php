<?php
/**
 * MTFF shared mail helper
 *
 * Sends an email either via SMTP (Hostinger) or falls back to PHP mail().
 * All settings are read from environment variables — no credentials in the repo.
 *
 * Environment variables:
 *   MTFF_RECIPIENT   - destination address         (default: mtroutff@gmail.com)
 *   MTFF_FROM        - sender address              (default: contact@massivetroutflyfishing.com)
 *   MTFF_SMTP_HOST   - SMTP host; empty => mail()  (Hostinger: e.g. smtp.hostinger.com)
 *   MTFF_SMTP_PORT   - SMTP port                   (default 465)
 *   MTFF_SMTP_SECURE - tls | ssl | empty           (default ssl)
 *   MTFF_SMTP_USER   - SMTP username
 *   MTFF_SMTP_PASS   - SMTP password
 */

declare(strict_types=1);

function mtff_env(string $name, string $default = ''): string {
    $v = getenv($name);
    return ($v === false || $v === '') ? $default : $v;
}

function mtff_read_json_input(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $_POST;
}

function mtff_clean(string $value): string {
    return trim(strip_tags($value));
}

function mtff_fail(int $status, string $message): void {
    http_response_code($status);
    header('Content-Type: text/plain; charset=utf-8');
    echo $message;
    exit;
}

/**
 * Minimal SMTP client (AUTH LOGIN over ssl:// or tls/STARTTLS).
 * Returns true on success, false on failure.
 */
function mtff_smtp(
    string $host,
    int $port,
    string $user,
    string $pass,
    string $secure,
    string $from,
    array $recipients,
    string $subject,
    string $bodyHtml
): bool {
    $secure = strtolower($secure);

    // Open connection with the appropriate transport.
    $transport = $secure === 'ssl' ? 'ssl://' . $host : $host;
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true,
        ],
    ]);

    $sock = @stream_socket_client($transport . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$sock) {
        return false;
    }

    $readLine = function () use ($sock): string {
        return fgets($sock);
    };
    $cmd = function (string $c) use ($sock): void {
        fputs($sock, $c . "\r\n");
    };

    $readLine(); // banner

    $cmd("EHLO " . gethostname());
    while (substr($readLine(), 3, 1) === '-') {
        // consume multiline EHLO response
    }

    // Upgrade to STARTTLS when requested.
    if ($secure === 'tls') {
        $cmd("STARTTLS");
        while (substr($readLine(), 3, 1) === '-') {
        }
        stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $cmd("EHLO " . gethostname());
        while (substr($readLine(), 3, 1) === '-') {
        }
    }

    $cmd("AUTH LOGIN");
    $readLine();
    $cmd(base64_encode($user));
    $readLine();
    $cmd(base64_encode($pass));
    if (substr($readLine(), 0, 3) !== '235') {
        fclose($sock);
        return false;
    }

    $cmd("MAIL FROM:<" . $from . ">");
    $readLine();
    foreach ($recipients as $to) {
        $cmd("RCPT TO:<" . $to . ">");
        $readLine();
    }

    $subject = mb_encode_mimeheader($subject, 'UTF-8');
    $bodyText = strip_tags(preg_replace('/<br\s*\/?>/i', "\n", $bodyHtml) ?? $bodyHtml);

    $headers = "MIME-Version: 1.0\r\n"
        . "Content-Type: text/html; charset=utf-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n"
        . "From: " . $from . "\r\n"
        . "Reply-To: " . $from . "\r\n"
        . "X-Mailer: MTFF-SMTP";

    $data = "Date: " . date('r') . "\r\n"
        . $headers . "\r\n"
        . "Subject: " . $subject . "\r\n"
        . "\r\n"
        . $bodyHtml . "\r\n"
        . "\r\n";

    $cmd("DATA");
    if (substr($readLine(), 0, 3) !== '354') {
        fclose($sock);
        return false;
    }
    // Escape lines starting with a dot.
    $data = preg_replace('/^\./m', '..', $data);
    fputs($sock, $data . "\r\n.\r\n");
    $readLine();

    $cmd("QUIT");
    $readLine();
    fclose($sock);
    return true;
}

/**
 * Send an email, preferring SMTP when MTFF_SMTP_HOST is set, else mail().
 */
function mtff_send(string $to, string $from, string $subject, string $bodyHtml): bool {
    $smtpHost = mtff_env('MTFF_SMTP_HOST');
    if ($smtpHost !== '') {
        return mtff_smtp(
            $smtpHost,
            (int) mtff_env('MTFF_SMTP_PORT', '465'),
            mtff_env('MTFF_SMTP_USER'),
            mtff_env('MTFF_SMTP_PASS'),
            mtff_env('MTFF_SMTP_SECURE', 'ssl'),
            $from,
            [$to],
            $subject,
            $bodyHtml
        );
    }

    $subject = mb_encode_mimeheader($subject, 'UTF-8');
    $bodyText = strip_tags(preg_replace('/<br\s*\/?>/i', "\n", $bodyHtml) ?? $bodyHtml);
    $headers = "From: " . $from . "\r\n"
        . "Reply-To: " . $from . "\r\n"
        . "MIME-Version: 1.0\r\n"
        . "Content-Type: text/html; charset=utf-8\r\n";
    return mail($to, $subject, $bodyText, $headers);
}