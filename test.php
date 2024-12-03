<?php 
    $name = $_POST['name']; 
    $email = $_POST['email']; 
    $message = $_POST['message']; 
    $subject = $_POST['subject']; 
    $from = 'From: $name'; 
    $to = 'adpdesign@msn.com'; 
    $subject = '$subject'; 
    $body = "From: $name\n E-Mail: $email\n Message:\n $message"; 
    (mail ($to, $subject, $body, $from)) { 
?> 