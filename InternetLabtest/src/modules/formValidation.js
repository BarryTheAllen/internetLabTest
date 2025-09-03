export function initFormValidation() {
    const form = document.querySelector('.form');
    if (!form) return;

    const nameInput = form.querySelector('input[placeholder="Имя"]');
    const phoneInput = form.querySelector('input[placeholder="Телефон"]');
    const agreeCheckbox = document.getElementById('agree');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const checkboxError = document.getElementById('checkbox-error');
    const successMessage = document.getElementById('success-message');

    if (!nameInput || !phoneInput || !agreeCheckbox || !nameError || !phoneError || !successMessage) return;

    const nameIcons = {
        correct: nameInput.parentElement.querySelector('.correct-icon'),
        error: nameInput.parentElement.querySelector('.error-icon')
    };

    const phoneIcons = {
        correct: phoneInput.parentElement.querySelector('.correct-icon'),
        error: phoneInput.parentElement.querySelector('.error-icon')
    };

    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            showError(nameInput, nameError, nameIcons, 'Поле обязательно для заполнения');
            return false;
        } else if (value.length < 2) {
            showError(nameInput, nameError, nameIcons, 'Имя должно содержать минимум 2 символа');
            return false;
        } else {
            showSuccess(nameInput, nameError, nameIcons);
            return true;
        }
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (!value) {
            showError(phoneInput, phoneError, phoneIcons, 'Поле обязательно для заполнения');
            return false;
        } else if (!phoneRegex.test(value)) {
            showError(phoneInput, phoneError, phoneIcons, 'Введите корректный номер телефона');
            return false;
        } else {
            showSuccess(phoneInput, phoneError, phoneIcons);
            return true;
        }
    }

    function validateCheckbox() {
        if (!agreeCheckbox.checked) {
            agreeCheckbox.parentElement.classList.add('error');
            if (checkboxError) {
                checkboxError.textContent = 'Необходимо согласие на обработку данных';
                checkboxError.style.display = 'flex';
            }
            return false;
        } else {
            agreeCheckbox.parentElement.classList.remove('error');
            if (checkboxError) checkboxError.style.display = 'none';
            return true;
        }
    }

    function showError(input, errorElement, icons, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'flex';
        if (icons.error) icons.error.style.display = 'flex';
        if (icons.correct) icons.correct.style.display = 'none';
    }

    function showSuccess(input, errorElement, icons) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        if (icons.correct) icons.correct.style.display = 'flex';
        if (icons.error) icons.error.style.display = 'none';
    }

    function clearError(input, errorElement, icons) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        if (icons.error) icons.error.style.display = 'none';
        if (icons.correct) icons.correct.style.display = 'none';
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isCheckboxValid = validateCheckbox();

        if (isNameValid && isPhoneValid && isCheckboxValid) {
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                agreed: agreeCheckbox.checked
            };
            console.log('Данные формы:', formData);

            successMessage.style.display = 'flex';
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
                clearError(nameInput, nameError, nameIcons);
                clearError(phoneInput, phoneError, phoneIcons);
                agreeCheckbox.parentElement.classList.remove('error');
                if (checkboxError) checkboxError.style.display = 'none';
            }, 3000);
        } else {
            const firstError = form.querySelector('.error, .checkbox__wrapper.error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    form.addEventListener('submit', handleSubmit);

    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('focus', () => clearError(nameInput, nameError, nameIcons));

    phoneInput.addEventListener('input', validatePhone);
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('focus', () => clearError(phoneInput, phoneError, phoneIcons));

    agreeCheckbox.addEventListener('change', validateCheckbox);
    agreeCheckbox.addEventListener('focus', () => {
        agreeCheckbox.parentElement.classList.remove('error');
        if (checkboxError) checkboxError.style.display = 'none';
    });
}