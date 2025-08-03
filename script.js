
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDl57yDhGFvZ96mdQZVEtSGxazULcUc2Kc",
    authDomain: "consiliu-2aa29.firebaseapp.com",
    projectId: "consiliu-2aa29",
    storageBucket: "consiliu-2aa29.appspot.com",
    messagingSenderId: "14118547718",
    appId: "1:14118547718:web:XYZ123ABC456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Enable persistence for authentication state
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch((error) => {
    console.error("Error enabling persistence:", error);
  });
  
// Create auth providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// DOM Elements
const welcomeBanner = document.getElementById('welcomeBanner');
const showLoginBtn = document.getElementById('showLoginBtn');
const closeBannerBtn = document.getElementById('closeBannerBtn');
const authModal = document.getElementById('authModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const themeToggle = document.getElementById('themeToggle');
const userProfileContainer = document.getElementById('userProfileContainer');
const userProfile = document.getElementById('userProfile');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileBtn');
const saveProfileBtn = document.getElementById('saveProfile');
const userBio = document.getElementById('userBio');
const profileAvatar = document.getElementById('profileAvatar');
const profileName = document.getElementById('profileName');
const profileGroup = document.getElementById('profileGroup');
const profileEmail = document.getElementById('profileEmail');
const languageSelector = document.getElementById('languageSelector');
const homeLink = document.getElementById('homeLink');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const verifiedBadge = document.getElementById('verifiedBadge');
const profileJoined = document.getElementById('profileJoined');
const sameGroupCount = document.getElementById('sameGroupCount');
const eventsAttended = document.getElementById('eventsAttended');
const loginSpinner = document.getElementById('loginSpinner');
const registerSpinner = document.getElementById('registerSpinner');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
const registerSuccessMsg = document.getElementById('registerSuccessMsg');
const forgotPassword = document.getElementById('forgotPassword');

// Current language
let currentLanguage = 'ro';

// Language dictionary
const translations = {
    ro: {
        welcome_title: "Bine ai venit!",
        welcome_subtitle: "Accesează platforma Consiliului Elevilor",
        login: "Autentificare",
        register: "Înregistrare",
        email: "Email",
        password: "Parolă",
        remember: "Ține-mă minte",
        forgot_password: "Ai uitat parola?",
        login_button: "Autentifică-te",
        social_login: "sau continuă cu",
        full_name: "Nume complet",
        phone: "Număr de telefon",
        group: "Grupa",
        confirm_password: "Confirmă parola",
        register_button: "Înregistrează-te",
        profile_name: "Utilizator",
        profile_group: "Grupa: ",
        profile_joined: "Membru din: ",
        about_me: "Despre mine",
        save_profile: "Salvează profilul",
        same_group: "Elevi în grupa ta",
        events_attended: "Evenimente participat",
        verification_sent: "Un email de verificare a fost trimis!",
        reset_sent: "Un email de resetare a parolei a fost trimis!"
    },
    ru: {
        welcome_title: "Добро пожаловать!",
        welcome_subtitle: "Доступ к платформе Совета учащихся",
        login: "Авторизация",
        register: "Регистрация",
        email: "Электронная почта",
        password: "Пароль",
        remember: "Запомнить меня",
        forgot_password: "Забыли пароль?",
        login_button: "Войти",
        social_login: "или продолжить с",
        full_name: "Полное имя",
        phone: "Номер телефона",
        group: "Группа",
        confirm_password: "Подтвердите пароль",
        register_button: "Зарегистрироваться",
        profile_name: "Пользователь",
        profile_group: "Группа: ",
        profile_joined: "Участник с: ",
        about_me: "Обо мне",
        save_profile: "Сохранить профиль",
        same_group: "Студенты в вашей группе",
        events_attended: "Посещенные мероприятия",
        verification_sent: "Письмо с подтверждением отправлено!",
        reset_sent: "Письмо для сброса пароля отправлено!"
    },
    en: {
        welcome_title: "Welcome!",
        welcome_subtitle: "Access the Student Council platform",
        login: "Login",
        register: "Register",
        email: "Email",
        password: "Password",
        remember: "Remember me",
        forgot_password: "Forgot password?",
        login_button: "Sign in",
        social_login: "or continue with",
        full_name: "Full name",
        phone: "Phone number",
        group: "Group",
        confirm_password: "Confirm password",
        register_button: "Register",
        profile_name: "User",
        profile_group: "Group: ",
        profile_joined: "Member since: ",
        about_me: "About me",
        save_profile: "Save profile",
        same_group: "Students in your group",
        events_attended: "Events attended",
        verification_sent: "Verification email sent!",
        reset_sent: "Password reset email sent!"
    }
};

// Set language function
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.getElementById('modalTitle').textContent = translations[lang].welcome_title;
    document.getElementById('modalSubtitle').textContent = translations[lang].welcome_subtitle;
    document.getElementById('loginTab').textContent = translations[lang].login;
    document.getElementById('registerTab').textContent = translations[lang].register;
    document.querySelector('label[for="loginEmail"]').textContent = translations[lang].email;
    document.querySelector('label[for="loginPassword"]').textContent = translations[lang].password;
    document.querySelector('label[for="remember"]').textContent = translations[lang].remember;
    document.getElementById('forgotPassword').textContent = translations[lang].forgot_password;
    document.getElementById('loginSubmitBtn').textContent = translations[lang].login_button;
    document.querySelector('.social-login p').textContent = translations[lang].social_login;
    document.querySelector('label[for="fullName"]').textContent = translations[lang].full_name;
    document.querySelector('label[for="phone"]').textContent = translations[lang].phone;
    document.querySelector('label[for="group"]').textContent = translations[lang].group;
    document.querySelector('label[for="password"]').textContent = translations[lang].password;
    document.querySelector('label[for="confirmPassword"]').textContent = translations[lang].confirm_password;
    document.getElementById('registerSubmitBtn').textContent = translations[lang].register_button;
    document.querySelector('label[for="userBio"]').textContent = translations[lang].about_me;
    document.getElementById('saveProfile').textContent = translations[lang].save_profile;
    document.querySelector('.stat-card h4').textContent = translations[lang].same_group;
    document.querySelectorAll('.stat-card h4')[1].textContent = translations[lang].events_attended;
}

// Load saved language
if (localStorage.getItem('language')) {
    const lang = localStorage.getItem('language');
    languageSelector.value = lang;
    setLanguage(lang);
}

// Event listeners for like buttons
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const heartIcon = this.querySelector('i');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            this.classList.add('liked');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            this.classList.remove('liked');
        }
    });
});

// Funcții pentru afișarea și ascunderea modalului
function openAuthModal() {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openProfileModal() {
    profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
        if (userData.photoURL) {
            profileAvatar.style.backgroundImage = `url(${userData.photoURL})`;
            userAvatar.style.backgroundImage = `url(${userData.photoURL})`;
            userAvatar.textContent = '';
        } else {
            profileAvatar.style.backgroundImage = '';
            userAvatar.style.backgroundImage = '';
            profileAvatar.textContent = userData.displayName.charAt(0).toUpperCase();
            userAvatar.textContent = userData.displayName.charAt(0).toUpperCase();
        }
        
        profileName.textContent = userData.displayName;
        profileGroup.textContent = translations[currentLanguage].profile_group + (userData.group || '-');
        profileEmail.textContent = userData.email;
        userBio.value = userData.bio || '';
        
        // Format join date
        if (userData.createdAt) {
            const date = new Date(userData.createdAt);
            profileJoined.textContent = translations[currentLanguage].profile_joined + date.toLocaleDateString();
        } else {
            profileJoined.textContent = translations[currentLanguage].profile_joined + 'Necunoscut';
        }
        
        // Show verification badge
        if (userData.emailVerified) {
            verifiedBadge.style.display = 'inline-block';
        } else {
            verifiedBadge.style.display = 'none';
        }
        
        // Load statistics
        loadUserStats(userData.uid, userData.group);
    }
}

// Load user statistics
async function loadUserStats(userId, group) {
    try {
        // Count users in same group
        const groupSnapshot = await db.collection('users').where('group', '==', group).get();
        sameGroupCount.textContent = groupSnapshot.size;
        
        // Count events attended (placeholder)
        eventsAttended.textContent = Math.floor(Math.random() * 10);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function closeProfileModal() {
    profileModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Banner events
showLoginBtn.addEventListener('click', openAuthModal);
closeBannerBtn.addEventListener('click', () => {
    welcomeBanner.style.display = 'none';
    localStorage.setItem('bannerClosed', 'true');
});

// Modal events
closeModalBtn.addEventListener('click', closeAuthModal);
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
});

closeProfileBtn.addEventListener('click', closeProfileModal);
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) closeProfileModal();
});

// Tab switching functionality
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    clearErrors();
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    clearErrors();
});

// Funcție pentru ștergerea mesajelor de eroare
function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    document.querySelectorAll('.success-msg').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Funcție pentru afișarea erorilor
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    successElement.textContent = message;
    successElement.style.display = 'block';
}

// Validare formular login
function validateLoginForm() {
    clearErrors();
    let isValid = true;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email) {
        showError('loginEmailError', translations[currentLanguage].email + ' este necesar');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('loginEmailError', translations[currentLanguage].email + ' nu este valid');
        isValid = false;
    }

    if (!password) {
        showError('loginPasswordError', translations[currentLanguage].password + ' este necesară');
        isValid = false;
    } else if (password.length < 6) {
        showError('loginPasswordError', translations[currentLanguage].password + ' trebuie să aibă minim 6 caractere');
        isValid = false;
    }

    return isValid;
}

// Validare formular înregistrare
function validateRegisterForm() {
    clearErrors();
    let isValid = true;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const group = document.getElementById('group').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!fullName) {
        showError('fullNameError', translations[currentLanguage].full_name + ' este necesar');
        isValid = false;
    }

    if (!email) {
        showError('emailError', translations[currentLanguage].email + ' este necesar');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('emailError', translations[currentLanguage].email + ' nu este valid');
        isValid = false;
    }

    if (!phone) {
        showError('phoneError', translations[currentLanguage].phone + ' este necesar');
        isValid = false;
    } else if (!/^\+?[0-9]{9,15}$/.test(phone)) {
        showError('phoneError', translations[currentLanguage].phone + ' nu este valid');
        isValid = false;
    }

    if (!group) {
        showError('groupError', translations[currentLanguage].group + ' este necesară');
        isValid = false;
    }

    if (!password) {
        showError('passwordError', translations[currentLanguage].password + ' este necesară');
        isValid = false;
    } else if (password.length < 6) {
        showError('passwordError', translations[currentLanguage].password + ' trebuie să aibă minim 6 caractere');
        isValid = false;
    }

    if (!confirmPassword) {
        showError('confirmPasswordError', translations[currentLanguage].confirm_password + ' este necesară');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Parolele nu coincid');
        isValid = false;
    }

    return isValid;
}

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Show spinner, disable button
        loginSpinner.style.display = 'block';
        loginSubmitBtn.disabled = true;
        
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get additional user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        // Prepare user data for storage
        const userProfileData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || email.split('@')[0],
            phone: userData?.phone || '',
            group: userData?.group || '',
            bio: userData?.bio || '',
            photoURL: userData?.photoURL || user.photoURL || '',
            emailVerified: user.emailVerified,
            createdAt: userData?.createdAt || new Date(),
            lastLogin: new Date()
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userProfileData));
        
        // Update UI
        updateUserUI(userProfileData);
        
        // Close modal
        closeAuthModal();
        
    } catch (error) {
        console.error('Eroare autentificare:', error);
        let errorMessage = 'Date de autentificare incorecte sau cont inexistent';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Contul nu există';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Parolă incorectă';
        }
        
        showError('loginGeneralError', errorMessage);
    } finally {
        loginSpinner.style.display = 'none';
        loginSubmitBtn.disabled = false;
    }
});

// Register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const group = document.getElementById('group').value;
    const password = document.getElementById('password').value;
    
    try {
        // Show spinner, disable button
        registerSpinner.style.display = 'block';
        registerSubmitBtn.disabled = true;
        
        // Create account in Firebase
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update profile
        await user.updateProfile({
            displayName: fullName
        });
        
        // Send verification email
        await user.sendEmailVerification();
        showSuccess('registerSuccessMsg', translations[currentLanguage].verification_sent);
        
        // Save additional data to Firestore
        await db.collection('users').doc(user.uid).set({
            fullName,
            email,
            phone,
            group,
            bio: '',
            photoURL: '',
            createdAt: new Date(),
            deviceInfo: navigator.userAgent,
            ip: await getClientIP(),
            emailVerified: false
        });
        
        // Prepare user data for storage
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: fullName,
            phone,
            group,
            bio: '',
            photoURL: '',
            emailVerified: false,
            createdAt: new Date(),
            lastLogin: new Date()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Update UI
        updateUserUI(userData);
        
        // Show success message for 3 seconds
        setTimeout(() => {
            closeAuthModal();
        }, 3000);
        
    } catch (error) {
        console.error('Eroare înregistrare:', error);
        let errorMessage = 'A apărut o eroare la înregistrare';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Acest email este deja înregistrat';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Parola este prea slabă';
        }
        
        showError('registerGeneralError', errorMessage);
    } finally {
        registerSpinner.style.display = 'none';
        registerSubmitBtn.disabled = false;
    }
});

// Forgot password
forgotPassword.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        showError('loginEmailError', 'Introduceți adresa de email pentru resetare');
        return;
    }
    
    try {
        await auth.sendPasswordResetEmail(email);
        showSuccess('loginGeneralError', translations[currentLanguage].reset_sent);
    } catch (error) {
        console.error('Error sending reset email:', error);
        showError('loginGeneralError', 'Eroare la trimiterea email-ului de resetare');
    }
});

// Function to get client IP
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown';
    }
}

// Actualizare UI după autentificare
function updateUserUI(userData) {
    // Hide banner
    welcomeBanner.style.display = 'none';
    localStorage.setItem('bannerClosed', 'true');
    
    // Show user profile
    userProfileContainer.style.display = 'block';
    
    if (userData.photoURL) {
        userAvatar.style.backgroundImage = `url(${userData.photoURL})`;
        userAvatar.textContent = '';
    } else {
        userAvatar.style.backgroundImage = '';
        userAvatar.textContent = userData.displayName.charAt(0).toUpperCase();
    }
    
    userName.textContent = userData.displayName;
    
    // Change profile button behavior
    document.getElementById('userMenu').style.display = 'none';
    
    // Add profile functionality
    userProfile.addEventListener('click', () => {
        openProfileModal();
    });
}

// Save profile
saveProfileBtn.addEventListener('click', async () => {
    const bio = userBio.value;
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData) {
        try {
            // Update Firestore
            await db.collection('users').doc(userData.uid).update({
                bio: bio
            });
            
            // Update local storage
            userData.bio = bio;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            alert('Profilul a fost actualizat cu succes!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Eroare la salvarea profilului');
        }
    }
});

// Upload profile photo
profilePhotoInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (!userData) return;
    
    try {
        // Upload to Firebase Storage
        const storageRef = storage.ref(`profile_photos/${userData.uid}`);
        const snapshot = await storageRef.put(file);
        const photoURL = await snapshot.ref.getDownloadURL();
        
        // Update user profile
        await auth.currentUser.updateProfile({
            photoURL: photoURL
        });
        
        // Update Firestore
        await db.collection('users').doc(userData.uid).update({
            photoURL: photoURL
        });
        
        // Update local storage
        userData.photoURL = photoURL;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Update UI
        profileAvatar.style.backgroundImage = `url(${photoURL})`;
        profileAvatar.textContent = '';
        userAvatar.style.backgroundImage = `url(${photoURL})`;
        userAvatar.textContent = '';
        
        alert('Fotografia de profil a fost actualizată!');
    } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Eroare la încărcarea fotografiei');
    }
});

// Verificare stare autentificare la încărcarea paginii
auth.onAuthStateChanged(user => {
    if (user) {
        // User is authenticated
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                userData.uid = user.uid;
                userData.displayName = user.displayName || user.email.split('@')[0];
                userData.photoURL = user.photoURL || userData.photoURL || '';
                userData.emailVerified = user.emailVerified;
                localStorage.setItem('currentUser', JSON.stringify(userData));
                updateUserUI(userData);
            }
        });
    } else {
        // Not authenticated
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            // Use localStorage data if exists
            updateUserUI(JSON.parse(savedUser));
        } else {
            // Show banner if not closed
            const bannerClosed = localStorage.getItem('bannerClosed') === 'true';
            if (!bannerClosed) {
                welcomeBanner.style.display = 'flex';
            }
        }
    }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if(document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Verificare preferință temă
if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Buton profil dacă nu este autentificat
document.getElementById('userMenu').addEventListener('click', openAuthModal);

// Social login buttons
document.getElementById('googleLogin').addEventListener('click', () => {
    signInWithPopup(googleProvider);
});

document.getElementById('facebookLogin').addEventListener('click', () => {
    signInWithPopup(facebookProvider);
});

document.getElementById('githubLogin').addEventListener('click', () => {
    signInWithPopup(githubProvider);
});

// Social login function
async function signInWithPopup(provider) {
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user in Firestore
            await db.collection('users').doc(user.uid).set({
                fullName: user.displayName,
                email: user.email,
                phone: '',
                group: '',
                bio: '',
                photoURL: user.photoURL || '',
                createdAt: new Date(),
                deviceInfo: navigator.userAgent,
                ip: await getClientIP(),
                emailVerified: true
            });
        }
        
        // Prepare user data for storage
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            phone: user.phone || '',
            group: user.group || '',
            bio: user.bio || '',
            photoURL: user.photoURL || '',
            emailVerified: user.emailVerified,
            createdAt: new Date(),
            lastLogin: new Date()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        updateUserUI(userData);
        closeAuthModal();
        
    } catch (error) {
        console.error('Social login error:', error);
        showError('loginGeneralError', 'Eroare la autentificare: ' + error.message);
    }
}

// Language selector
languageSelector.addEventListener('change', function() {
    const lang = this.value;
    setLanguage(lang);
});

// Home link
homeLink.addEventListener('click', () => {
    window.location.href = 'index.html';
});