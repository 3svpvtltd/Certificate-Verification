// Sample certificate data
const certificates = [
    {
        id: '220105131428',
        internName: 'Sai Chechare',
        program: 'Full Stack Web Development Internship',
        duration: 'January 2025 - April 2025 (3 months)',
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        issueDate: 'April 30, 2025',
        issuedBy: 'Dr. Umesh Pawar, HOD',
        status: 'valid'
    },
    {
        id: '220105131207',
        internName: 'Sameer Pawar',
        program: 'UI/UX Design Internship',
        duration: 'February 2025 - May 2025 (3 months)',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
        issueDate: 'May 15, 2025',
        issuedBy: 'Sumit Jadhav, Design Lead',
        status: 'valid'
    }
];

// DOM Elements
const certForm = document.getElementById('certForm');
const verifyBtn = document.getElementById('verifyBtn');
const modal = document.getElementById('resultModal');
const closeBtn = document.querySelector('.close-btn');
const certificateDetails = document.querySelector('.certificate-details');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle with animation and click outside handling
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu')) {
        navLinks.classList.remove('active');
        mobileMenu.textContent = '☰';
    }
});

// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.textContent = '☰';
    }
});

// Form submission handler
certForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const certificateId = document.getElementById('certificateId').value;
    const btnText = verifyBtn.querySelector('.btn-text');
    const loader = verifyBtn.querySelector('.loader');

    if (!certificateId.trim()) {
        alert('Please enter a certificate ID');
        return;
    }

    // Show loading state
    btnText.style.opacity = '0';
    loader.style.display = 'block';
    verifyBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const certificate = verifyCertificate(certificateId);

        if (certificate) {
            showCertificateDetails(certificate);
        } else {
            alert('Certificate not found. Please check the ID and try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    } finally {
        // Reset button state
        btnText.style.opacity = '1';
        loader.style.display = 'none';
        verifyBtn.disabled = false;
    }
});

// Certificate verification function
function verifyCertificate(id) {
    return certificates.find(cert => cert.id.toLowerCase() === id.toLowerCase());
}

// Display certificate details in modal
function showCertificateDetails(certificate) {
    certificateDetails.innerHTML = `
        <div class="detail-item">
            <h4>Intern Name</h4>
            <p>${certificate.internName}</p>
        </div>
        <div class="detail-item">
            <h4>Certificate ID</h4>
            <p>${certificate.id}</p>
        </div>
        <div class="detail-item">
            <h4>Program</h4>
            <p>${certificate.program}</p>
        </div>
        <div class="detail-item">
            <h4>Duration</h4>
            <p>${certificate.duration}</p>
        </div>
        <div class="detail-item">
            <h4>Skills</h4>
            <p>${certificate.skills.join(', ')}</p>
        </div>
        <div class="detail-item">
            <h4>Issue Date</h4>
            <p>${certificate.issueDate}</p>
        </div>
        <div class="detail-item">
            <h4>Issued By</h4>
            <p>${certificate.issuedBy}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

// Close modal handler
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});