import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
// import dotenv from 'react-ho'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

   const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="contact-section bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="mt-2 text-lg text-gray-600">Have questions? Reach out to us!</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="your-name flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="your-email flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="your-message w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="button px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;