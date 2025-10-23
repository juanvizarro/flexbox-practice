document.addEventListener('DOMContentLoaded', () => {
    const flexContainer = document.querySelector('.flex-container');
    const cssCodeElement = document.getElementById('css-code');
    const copyButton = document.getElementById('copy-css-button');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');

    // --- State Management ---
    const state = {
        'flex-direction': 'row',
        'justify-content': 'flex-start',
        'align-items': 'start'
    };

    const defaults = {
        'justify-content': 'flex-start',
        'align-items': 'stretch' // Correct default for align-items
    };

    const updateStylesAndCode = () => {
        const finalJustifyContent = document.getElementById('justify-content-toggle').checked ? state['justify-content'] : defaults['justify-content'];
        const finalAlignItems = document.getElementById('align-items-toggle').checked ? state['align-items'] : defaults['align-items'];

        // 1. Update styles
        flexContainer.style.flexDirection = state['flex-direction'];
        flexContainer.style.justifyContent = finalJustifyContent;
        flexContainer.style.alignItems = finalAlignItems;

        // 2. Update code view
        let cssText = `
.flex-container {
    display: flex;
    flex-direction: ${state['flex-direction']};`;

        if (document.getElementById('justify-content-toggle').checked) {
            cssText += `\n    justify-content: ${finalJustifyContent};`;
        }

        if (document.getElementById('align-items-toggle').checked) {
            cssText += `\n    align-items: ${finalAlignItems};`;
        }

        cssText += `\n}
`;
        cssCodeElement.textContent = cssText.trim();
    };

    // --- Toggle Checkbox Logic ---
    document.querySelectorAll('.toggle-checkbox').forEach(toggle => {
        toggle.addEventListener('change', e => {
            const property = e.target.dataset.property;
            const selectWrapper = document.querySelector(`.custom-select-wrapper[data-property="${property}"]`);
            
            if (e.target.checked) {
                selectWrapper.classList.remove('disabled');
            } else {
                selectWrapper.classList.add('disabled');
            }
            updateStylesAndCode();
        });
    });

    // --- Custom Select Logic ---
    document.addEventListener('click', e => {
        const isCustomSelectTrigger = e.target.closest('.custom-select-trigger');
        const isCustomSelectOption = e.target.closest('.custom-select-option');

        document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
            if (!wrapper.contains(e.target)) {
                wrapper.querySelector('.custom-select-options').classList.add('hidden');
            }
        });

        if (isCustomSelectTrigger) {
            const wrapper = isCustomSelectTrigger.closest('.custom-select-wrapper');
            wrapper.querySelector('.custom-select-options').classList.toggle('hidden');
        }

        if (isCustomSelectOption) {
            const wrapper = isCustomSelectOption.closest('.custom-select-wrapper');
            const trigger = wrapper.querySelector('.custom-select-trigger span');
            const property = wrapper.dataset.property;
            const value = isCustomSelectOption.dataset.value;
            const text = isCustomSelectOption.textContent;

            state[property] = value;
            trigger.textContent = text;

            wrapper.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));
            isCustomSelectOption.classList.add('selected');
            wrapper.querySelector('.custom-select-options').classList.add('hidden');
            
            updateStylesAndCode();
        }
    });

    // --- Copy Button Logic ---
    copyButton.addEventListener('click', () => {
        const codeToCopy = cssCodeElement.textContent;
        navigator.clipboard.writeText(codeToCopy).then(() => {
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');
            copyButton.classList.add('bg-green-500');
            copyButton.classList.remove('bg-gray-600', 'hover:bg-gray-500');

            setTimeout(() => {
                checkIcon.classList.add('hidden');
                copyIcon.classList.remove('hidden');
                copyButton.classList.remove('bg-green-500');
                copyButton.classList.add('bg-gray-600', 'hover:bg-gray-500');
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el código: ', err);
        });
    });

    // Initial call
    updateStylesAndCode();
});
