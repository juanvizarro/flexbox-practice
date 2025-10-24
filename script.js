document.addEventListener('DOMContentLoaded', () => {
    const flexContainer = document.querySelector('.flex-container');
    const cssCodeElement = document.getElementById('css-code');
    const copyButton = document.getElementById('copy-css-button');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');

    // Hint elements
    const justifyContentHint = document.getElementById('justify-content-hint');
    const alignItemsHint = document.getElementById('align-items-hint');
    // const flexDirectionHint = document.getElementById('flex-direction-hint');

    // Explanation element
    const explanationTextElement = document.getElementById('explanation-text');

    // --- State Management ---
    const state = {
        'flex-direction': 'row',
        'justify-content': 'start',
        'align-items': 'start'
    };

    const defaults = {
        'justify-content': 'start',
        'align-items': 'stretch' // Correct default for align-items
    };

    const updateHints = () => {
        let mainAxis = '';
        let crossAxis = '';
        if (state['flex-direction'] === 'row' || state['flex-direction'] === 'row-reverse') {
            mainAxis = 'Eje X (Horizontal)';
            crossAxis = 'Eje Y (Vertical)';
        } else { // column or column-reverse
            mainAxis = 'Eje Y (Vertical)';
            crossAxis = 'Eje X (Horizontal)';
        }

        // flexDirectionHint.textContent = `(Define el ${mainAxis})`;
        justifyContentHint.textContent = `(Alineación en el ${mainAxis})`;
        alignItemsHint.textContent = `(Alineación en el ${crossAxis})`;
    };

    const updateExplanation = () => {
        let tableHtml = `
<table class="min-w-full divide-y divide-gray-200 explanation-table">
    <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código CSS</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eje Afectado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alineación</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
`;

        // Determine Axes
        let mainAxisName = '';
        let crossAxisName = '';
        if (state['flex-direction'] === 'row' || state['flex-direction'] === 'row-reverse') {
            mainAxisName = 'Eje Principal (Horizontal)';
            crossAxisName = 'Eje Secundario (Vertical)';
        } else { // column or column-reverse
            mainAxisName = 'Eje Principal (Vertical)';
            crossAxisName = 'Eje Secundario (Horizontal)';
        }

        // --- flex-direction ---
        let flexDirectionDesc = "";
        if (state['flex-direction'] === 'row') {
            flexDirectionDesc = "Los elementos se organizan en una fila, de izquierda a derecha.";
        } else if (state['flex-direction'] === 'column') {
            flexDirectionDesc = "Los elementos se organizan en una columna, de arriba a abajo.";
        }
        tableHtml += `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">flex-direction: ${state['flex-direction']};</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${mainAxisName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Define la dirección del flujo</td>
            <td class="px-6 py-4 text-sm text-gray-500">${flexDirectionDesc}</td>
        </tr>
    `;

        // --- justify-content ---
        const isJustifyContentEnabled = document.getElementById('justify-content-toggle').checked;
        const currentJustifyContent = isJustifyContentEnabled ? state['justify-content'] : defaults['justify-content'];
        let justifyContentAlignment = "";
        let justifyContentDesc = "";
        if (!isJustifyContentEnabled) {
            justifyContentAlignment = "Por defecto";
            justifyContentDesc = `(Desactivado) Los elementos se alinean por defecto al inicio del Eje Principal.`;
        } else {
            switch (currentJustifyContent) {
                case 'start': justifyContentAlignment = "Inicio"; justifyContentDesc = "Los elementos se alinean al inicio del Eje Principal."; break;
                case 'end': justifyContentAlignment = "Final"; justifyContentDesc = "Los elementos se alinean al final del Eje Principal."; break;
                case 'center': justifyContentAlignment = "Centro"; justifyContentDesc = "Los elementos se centran en el Eje Principal."; break;
                case 'space-between': justifyContentAlignment = "Espacio entre"; justifyContentDesc = "Los elementos se distribuyen con espacio uniforme entre ellos, sin espacio en los extremos."; break;
                case 'space-around': justifyContentAlignment = "Espacio alrededor"; justifyContentDesc = "Los elementos se distribuyen con espacio uniforme alrededor de ellos (incluyendo los extremos). "; break;
                case 'space-evenly': justifyContentAlignment = "Espacio equitativo"; justifyContentDesc = "Los elementos se distribuyen con espacio uniforme entre ellos y en los extremos."; break;
            }
        }
        if (isJustifyContentEnabled) { // Only add row if enabled
            tableHtml += `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">justify-content: ${currentJustifyContent};</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${mainAxisName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${justifyContentAlignment}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${justifyContentDesc}</td>
        </tr>
    `;
        }


        // --- align-items ---
        const isAlignItemsEnabled = document.getElementById('align-items-toggle').checked;
        const currentAlignItems = isAlignItemsEnabled ? state['align-items'] : defaults['align-items'];
        let alignItemsAlignment = "";
        let alignItemsDesc = "";
        if (!isAlignItemsEnabled) {
            alignItemsAlignment = "Por defecto";
            alignItemsDesc = `(Desactivado) Los elementos se alinean por defecto en el Eje Secundario.`;
        } else {
            switch (currentAlignItems) {
                case 'start': alignItemsAlignment = "Inicio"; alignItemsDesc = "Los elementos se alinean al inicio del Eje Secundario."; break;
                case 'end': alignItemsAlignment = "Final"; alignItemsDesc = "Los elementos se alinean al final del Eje Secundario."; break;
                case 'center': alignItemsAlignment = "Centro"; alignItemsDesc = "Los elementos se centran en el Eje Secundario."; break;
                case 'stretch': alignItemsAlignment = "Estirar"; alignItemsDesc = "Los elementos se estiran para llenar el contenedor en el Eje Secundario (si no tienen un tamaño fijo)."; break;
                case 'baseline': alignItemsAlignment = "Línea base"; alignItemsDesc = "Los elementos se alinean según sus líneas base de texto en el Eje Secundario."; break;
            }
        }
        if (isAlignItemsEnabled) { // Only add row if enabled
            tableHtml += `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">align-items: ${currentAlignItems};</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${crossAxisName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${alignItemsAlignment}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${alignItemsDesc}</td>
        </tr>
    `;
        }

        tableHtml += `
    </tbody>
</table>
`;
        explanationTextElement.innerHTML = tableHtml;
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
            cssText += `
    justify-content: ${finalJustifyContent};`;
        }

        if (document.getElementById('align-items-toggle').checked) {
            cssText += `
    align-items: ${finalAlignItems};`;
        }

        cssText += `
}
`;
        cssCodeElement.textContent = cssText.trim();

        // 3. Update hints
        updateHints();
        // 4. Update explanation
        updateExplanation();
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
