
<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $subject = htmlspecialchars($_POST['subject']);
    // Prepare email headers and body
    $from = "From: $name <$email>";
    $to = 'adpdesign@msn.com'; // Set the recipient email address
    $body = "From: $name\nE-Mail: $email\nMessage:\n$message";
    // Attempt to send the email
    if (mail($to, $subject, $body, $from)) {
        echo "Email sent successfully!";
    } else {
        echo "Email sending failed.";
    }
}
?>
