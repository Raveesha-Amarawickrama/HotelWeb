import React from "react";
import "./Contact.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-description">
        We'd love to hear from you! Whether you have a question about rooms, pricing, or anything else, our team is ready to answer all your questions.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" placeholder="Subject" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Our Location</h3>
        <p>Hotel Paradise, 123 Ocean Drive, Colombo, Sri Lanka</p>
        <p>Email: info@hotelparadise.com</p>
        <p>Phone: +94 11 234 5678</p>
      </div>
    </div>
  );
};

export default ContactUs;
