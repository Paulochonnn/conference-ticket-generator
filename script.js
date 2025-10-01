// ============================================
// 1. RÉCUPÉRATION DES ÉLÉMENTS HTML
// ============================================
const photoInput = document.getElementById('photoInput');
const uploadArea = document.getElementById('uploadArea');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const changeBtn = document.getElementById('changeBtn');
const removeBtn = document.getElementById('removeBtn');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github');
const generateBtn = document.getElementById('generateBtn');

const formPage = document.getElementById('formPage');
const ticketPage = document.getElementById('ticketPage');

const ticketPhoto = document.getElementById('ticketPhoto');
const ticketName = document.getElementById('ticketName');
const ticketGithub = document.getElementById('ticketGithub');
const ticketCode = document.getElementById('ticketCode');
const headerName = document.getElementById('headerName');
const headerEmail = document.getElementById('headerEmail');

const newTicketBtn = document.getElementById('newTicketBtn');


// ============================================
// 2. GESTION DE L'UPLOAD DE PHOTO
// ============================================
photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const maxSize = 500 * 1024; // 500KB
        if (file.size > maxSize) {
            alert('⚠️ Your photo is too large! Maximum size: 500KB');
            photoInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            previewContainer.style.display = 'flex';
            uploadArea.classList.add('has-image');
            
            checkFormValidity();
        };
        
        reader.readAsDataURL(file);
    }
});


// ============================================
// 3. GESTION DES BOUTONS CHANGE ET REMOVE
// ============================================
changeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    photoInput.click();
});

removeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    photoInput.value = '';
    previewImage.src = '';
    previewContainer.style.display = 'none';
    uploadPlaceholder.style.display = 'block';
    uploadArea.classList.remove('has-image');
    
    checkFormValidity();
});


// ============================================
// 4. VALIDATION DU FORMULAIRE
// ============================================
function checkFormValidity() {
    const hasPhoto = previewImage.src !== '';
    const hasName = fullNameInput.value.trim() !== '';
    const hasEmail = emailInput.value.trim() !== '';
    const hasGithub = githubInput.value.trim() !== '';
    
    if (hasPhoto && hasName && hasEmail && hasGithub) {
        generateBtn.disabled = false;
    } else {
        generateBtn.disabled = true;
    }
}

fullNameInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
githubInput.addEventListener('input', checkFormValidity);


// ============================================
// 5. GÉNÉRATION DU TICKET
// ============================================
generateBtn.addEventListener('click', function() {
    const userName = fullNameInput.value.trim();
    const userEmail = emailInput.value.trim();
    
    // Mise à jour du header
    headerName.textContent = userName;
    headerEmail.textContent = userEmail;
    
    // Mise à jour du ticket
    ticketPhoto.src = previewImage.src;
    ticketName.textContent = userName;
    
    // GitHub avec @ si nécessaire
    let githubValue = githubInput.value.trim();
    if (!githubValue.startsWith('@')) {
        githubValue = '@' + githubValue;
    }
    ticketGithub.textContent = githubValue;
    
    // Numéro de ticket aléatoire
    const randomNumber = Math.floor(Math.random() * 10000);
    ticketCode.textContent = '#' + randomNumber.toString().padStart(4, '0') + ' CH';
    
    // Changement de page
    formPage.classList.add('hidden');
    ticketPage.classList.remove('hidden');
    
    window.scrollTo(0, 0);
});


// ============================================
// 6. RÉINITIALISATION (NOUVEAU TICKET)
// ============================================
newTicketBtn.addEventListener('click', function() {
    photoInput.value = '';
    fullNameInput.value = '';
    emailInput.value = '';
    githubInput.value = '';
    
    previewImage.src = '';
    previewContainer.style.display = 'none';
    uploadPlaceholder.style.display = 'block';
    uploadArea.classList.remove('has-image');
    
    generateBtn.disabled = true;
    
    ticketPage.classList.add('hidden');
    formPage.classList.remove('hidden');
    
    window.scrollTo(0, 0);
});