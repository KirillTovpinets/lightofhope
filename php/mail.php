<?php
require 'PHPMailer/PHPMailerAutoload.php';

$to = 'kirill.tovpinets@icloud.com'; // Put your mail here

$name = (isset($_POST['name']) ? $_POST['name'] : " ");
$email = (isset($_POST['email']) ? $_POST['email'] : " ");
$title = (isset($_POST['title']) ? $_POST['title'] : " ");
$message = (isset($_POST['message']) ? $_POST['message'] : " ");
$js = (isset($_POST['disabled']) ? $_POST['disabled'] : 1);


$mail = new PHPMailer;

$mail->setFrom( $email, $name);
$mail->addAddress( $to );

$mail->isHTML(true);

$mail->Subject = $title;
$mail->Body    = $message;
$mail->AltBody = $message;

if(!$mail->send()) {

    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;

}
/** Disabled JavaScript **/
if( $js == 1 ) {
    header("Location: ../index.html");
}
