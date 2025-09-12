import React, {useState} from 'react';
import {Mail, Phone, Send, CheckCircle, AlertCircle} from 'lucide-react';
import emailjs from '@emailjs/browser';
import GoogleDriveService from '../services/googleDriveService';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        position: '',
        resume: null as File | null,
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Increased file size limit since we're using Google Drive (up to 100MB)
            if (file.size > 100 * 1024 * 1024) {
                setError('File size must be less than 100MB');
                return;
            }
            setFormData({
                ...formData,
                resume: file
            });
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Initialize EmailJS with environment variables
            emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

            let resumeLink = '';
            let fileName = '';

            if (formData.resume) {
                try {
                    // Upload resume to Google Drive
                    const driveService = GoogleDriveService.getInstance();
                    // resumeLink = "https://drive.google.com/file/d/MOCK_FILE_ID/view"
                    resumeLink = await driveService.uploadFile(formData.resume, formData.name);
                    fileName = formData.resume.name;
                } catch (driveError) {
                    console.error('Google Drive upload failed:', driveError);
                    setError('Failed to upload resume. Please try again or contact us directly.');
                    return;
                }
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                experience: formData.experience,
                position: formData.position,
                message: formData.message,
                resume_link: resumeLink,
                resume_filename: fileName,
                to_email: 'mauleeplacements@gmail.com',
                time: new Date().toLocaleString()
            };

            console.log(templateParams)

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            );

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    experience: '',
                    position: '',
                    resume: null,
                    message: ''
                });
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }, 5000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            setError('Failed to send email. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Submit Your Resume
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to take the next step in your career? Send us your resume and let's discuss
                        how we can help you find your perfect job opportunity.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Mail className="text-blue-600" size={24}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">info@mauliplacements.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-emerald-100 p-3 rounded-full">
                                    <Phone className="text-emerald-600" size={24}/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        {isSubmitted ? (
                            <div className="bg-green-50 p-8 rounded-lg text-center">
                                <CheckCircle className="text-green-500 mx-auto mb-4" size={48}/>
                                <h3 className="text-2xl font-bold text-green-800 mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-green-700">
                                    Your resume has been successfully submitted. We'll review your application
                                    and get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div
                                        className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-2">
                                        <AlertCircle className="text-red-500" size={20}/>
                                        <span className="text-red-700">{error}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Experience Level
                                        </label>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                        >
                                            <option value="">Select experience</option>
                                            <option value="fresher">Fresher (0-1 years)</option>
                                            <option value="junior">Junior (1-3 years)</option>
                                            <option value="mid">Mid-level (3-7 years)</option>
                                            <option value="senior">Senior (7+ years)</option>
                                            <option value="executive">Executive Level</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Position of Interest
                                        </label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                            placeholder="e.g., Software Developer, Marketing Manager"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Resume/CV *
                                    </label>
                                    <input
                                        type="file"
                                        name="resume"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:bg-gray-100"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Accepted formats: PDF, DOC, DOCX (Max size: 100MB)
                                    </p>
                                    {formData.resume && (
                                        <p className="text-sm text-green-600 mt-1">
                                            Selected: {formData.resume.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                        placeholder="Tell us about your career goals or any specific requirements..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div
                                                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20}/>
                                            <span>Submit Resume</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
