<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form inputs
    $firstname = htmlspecialchars(trim($_POST["firstname"]));
    $lastname = htmlspecialchars(trim($_POST["lastname"]));
    $phone = htmlspecialchars(trim($_POST["tel"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $comments = htmlspecialchars(trim($_POST["comments"]));
    $preferredContact = htmlspecialchars(trim($_POST["radio"]));

    // Email setup
    $to = "adpdesign@msn.com"; 
    $subject = "New Contact Form Submission";
    $message = "
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> {$firstname} {$lastname}</p>
        <p><strong>Preferred Contact:</strong> {$preferredContact}</p>
        " . ($preferredContact === "phone" ? "<p><strong>Phone:</strong> {$phone}</p>" : "<p><strong>Email:</strong> {$email}</p>") . "
        <p><strong>Comments:</strong> {$comments}</p>
    ";

    $headers = [
        "From: no-reply@yadpdesign.art", // my domain
        "Reply-To: {$email}",
        "Content-Type: text/html; charset=UTF-8",
    ];

    // Send the email
    if (mail($to, $subject, $message, implode("\r\n", $headers))) {
        echo "Your form has been submitted successfully!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
