<?php
/*
 * Mailer Script: Appointment Form
 * Author: Webisir
 * Author URI: http://themeforest.net/user/webisir
*/
ini_set("display_errors", 1);
require( 'config.php' );

if ( isset( $_POST['email'] ) ) {
	// Function to strip html tags from form data
	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}

	extract( array_map( 'cleanFields', $_POST ) );

	// Check if all fields are valid (It's an additional check if the javascript validation has failed)
	if ( empty( $name ) || empty( $email ) || empty( $message ) || empty( $theme )) {

		echo 'fail';
	} else {

		$subject = $theme;

		$message = '<html><body>';
		$message .= '<h2>' . $subject . '</h2><br>';
		$message .= '<table rules="all" cellpadding="10" style="border-color: #cccccc;">';
		$message .= '<tr><td style="width: 120px;">Имя: </td><td><strong>' . $name . '</strong></td></tr>';
		$message .= '<tr><td>email: </td><td><strong>' . $email . '</strong></td></tr>';
		$message .= '<tr><td>Сообщение: </td><td><strong>' . $message . '</strong></td></tr>';
		$message .= '</table></body></html>';
		// required for SMTP
		if ( $smtp ) {
			date_default_timezone_set('Etc/UTC');
		}
		require( 'PHPMailer/PHPMailerAutoload.php' );

		$mail = new PHPMailer;

		if ( $smtp ) {
			// SMTP configuration
			$mail->isSMTP();
			$mail->Host = $smtp_host;
			$mail->Port = $smtp_port;
			$mail->SMTPSecure = $smtp_secure;
			$mail->SMTPAuth = true;
			$mail->Username = $smtp_username;
			$mail->Password = $smtp_password;
		}
		$mail->setFrom( $email, '=?UTF-8?B?' . base64_encode( $first_name . ' ' . $last_name ) . '?=' );
		$mail->addReplyTo( $email );

		$mail->addAddress( $to );
		if ( $send_to_artist && array_key_exists( $artist, $artists_email ) ) {
			$mail->addAddress( $artists_email[$artist] );
		}
		$mail->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';
		$mail->isHTML( true );
		$mail->Body = $message;
		$mail->CharSet = 'UTF-8';
		if ( $mail->send() ) {
		    echo 'success';
		} else {
		    echo 'fail ' . $mail->ErrorInfo;
		}

	}

}