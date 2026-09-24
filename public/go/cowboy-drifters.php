<?php
/**
 * Referral redirect: Cowboys Drifters - DESHABILITADO
 * Antes enviaba mail de aviso con mtff_send. Ahora solo redirige,
 * porque el flujo actual exige suscripción vía CowboyModal antes de salir.
 * No enviar más mails de "Referral click".
 */

declare(strict_types=1);

$target = 'https://wyocowboydrifters.com/';

header('Location: ' . $target, true, 302);
exit;
