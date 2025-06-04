// Certificate Database
const certificateDatabase = [
    {
        id: '3SV-2025-001',
        internName: 'Aditya Sharma',
        program: 'Full Stack Web Development',
        startDate: '2025-01-15',
        endDate: '2025-04-15',
        issueDate: '2025-04-20',
        hoursCompleted: 480,
        location: 'Bangalore, India',
        skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API'],
        description: 'Successfully completed a 3-month intensive internship program in Full Stack Web Development.',
        signedBy: 'Rajiv Patel',
        signerTitle: 'CTO, 3SV Software Solutions'
    },
    // Add more certificates as needed
];

// Announcement Banner
const announcements = [
    "New Batch Starting Soon: Full Stack Development Program",
    "Applications Open for Web Development Internship",
    "Applications Open for Python Development Internship",
    "Applications Open for Data Analysis Internship",
    "Applications Open for AI Prompt Internship",
    "Join our UI/UX Design Workshop this weekend"
];

let currentAnnouncementIndex = 0;
const announcementContent = document.querySelector('.announcement-content');

function updateAnnouncement() {
    announcementContent.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
        announcementContent.textContent = announcements[currentAnnouncementIndex];
        announcementContent.style.transform = 'translateY(0)';
    }, 500);
}

// Initialize first announcement
announcementContent.textContent = announcements[0];
setInterval(updateAnnouncement, 5000);

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Certificate Verification
const verifyBtn = document.getElementById('verifyBtn');
const certificateIdInput = document.getElementById('certificateId');
const resultDiv = document.getElementById('result');

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function verifyCertificate(id) {
    return certificateDatabase.find(cert => cert.id === id.trim().toUpperCase());
}

function displayCertificate(certificate) {
    resultDiv.innerHTML = `
        <div class="success">
            <h3>Certificate Verified Successfully!</h3>
            <div class="certificate-details">
                <h4>${certificate.internName}</h4>
                <p><strong>Program:</strong> ${certificate.program}</p>
                <p><strong>Duration:</strong> ${formatDate(certificate.startDate)} - ${formatDate(certificate.endDate)}</p>
                <p><strong>Hours Completed:</strong> ${certificate.hoursCompleted}</p>
                <p><strong>Location:</strong> ${certificate.location}</p>
                <p><strong>Skills:</strong> ${certificate.skills.join(', ')}</p>
                <p><strong>Description:</strong> ${certificate.description}</p>
                <div class="signature">
                    <p><strong>Signed By:</strong> ${certificate.signedBy}</p>
                    <p>${certificate.signerTitle}</p>
                </div>
            </div>
        </div>
    `;
    resultDiv.className = 'verification-result success';
}

function displayError(message) {
    resultDiv.innerHTML = `<p>${message}</p>`;
    resultDiv.className = 'verification-result error';
}

verifyBtn.addEventListener('click', () => {
    const id = certificateIdInput.value;
    
    if (!id.trim()) {
        displayError('Please enter a certificate ID');
        return;
    }

    const certificate = verifyCertificate(id);
    
    if (certificate) {
        displayCertificate(certificate);
    } else {
        displayError('Certificate not found. Please check the ID and try again.');
    }
});