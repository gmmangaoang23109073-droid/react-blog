import React, { useState } from "react";
import "../App.css";

function ContactPage() {

  // ===== FORM STATE =====
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({}); // Added error state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    // ===== VALIDATIONS =====
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Message submitted successfully!");

      // reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setErrors({});
    }
  };

  return (
    <div>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact-content">
        <h2 className="contact-title">Contact Me</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="error">{errors.name}</span> {/* Error display */}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="error">{errors.email}</span> {/* Error display */}

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <span className="error">{errors.message}</span> {/* Error display */}

          <button type="submit">Submit</button>
        </form>
      </section>

      {/* ===== RESOURCES TABLE ===== */}
      <h3 className="section-title">Useful Resources</h3>

      <table className="resources-table">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://www.vogue.com/" target="_blank" rel="noreferrer">
                Vogue
              </a>
            </td>
            <td>
              A fashion website that shares trends, styling tips, and inspiration.
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                Pinterest
              </a>
            </td>
            <td>
              A visual platform where I find outfit ideas and style inspiration.
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://www.whowhatwear.com/" target="_blank" rel="noreferrer">
                Who What Wear
              </a>
            </td>
            <td>
              A fashion site that focuses on modern and classy everyday fashion.
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== MAP SECTION ===== */}
      <section className="map">
        <h2>Find Me</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417371.70963689976!2d128.7040100733377!3d35.188618370705385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb6de823cd35%3A0x35d8cb74247108a7!2sBusan%2C%20South%20Korea!5e0!3m2!1sen!2sph!4v1768828262893!5m2!1sen!2sph"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Busan Map"
        ></iframe>
      </section>

    </div>
  );
}

export default ContactPage;