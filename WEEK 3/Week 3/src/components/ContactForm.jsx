import { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subscribe: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: fieldValue
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setIsSubmitted(true);
            console.log('Form submitted:', formData);

            setTimeout(() => {
                setIsSubmitting(false);
                setFormData({ name: '', email: '', message: '', subscribe: false });
            }, 500);
        } else {
            setIsSubmitted(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
            <h2>Contact Form</h2>

            <div style={{ marginBottom: '12px' }}>
                <label>
                    Name:<br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderColor: errors.name ? 'red' : '#ccc' }}
                    />
                </label>
                {errors.name && <div style={{ color: 'red', marginTop: '4px' }}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>
                    Email:<br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', borderColor: errors.email ? 'red' : '#ccc' }}
                    />
                </label>
                {errors.email && <div style={{ color: 'red', marginTop: '4px' }}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>
                    Message:<br />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        style={{ width: '100%', padding: '8px', borderColor: errors.message ? 'red' : '#ccc' }}
                    />
                </label>
                {errors.message && <div style={{ color: 'red', marginTop: '4px' }}>{errors.message}</div>}
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleInputChange}
                    />
                    {' '}Subscribe to newsletter
                </label>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 16px', cursor: 'pointer' }}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {isSubmitted && <p style={{ color: 'green', marginTop: '10px' }}>Form submitted successfully!</p>}
        </form>
    );
}

export default ContactForm;