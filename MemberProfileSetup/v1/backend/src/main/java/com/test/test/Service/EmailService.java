package com.test.test.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("makineni.uday7@gmail.com");

            mailSender.send(message);
            System.out.println("Email sent to " + toEmail);

        } catch (Exception e) {
            System.out.println("Failed to send email to " + toEmail + ". Error: " + e.getMessage());
        }
    }
}
