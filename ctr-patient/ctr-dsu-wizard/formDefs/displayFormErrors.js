/**
 * Put formErrors inside a DOM element for display.
 * @param {object} document The document from the browser, used to create DOM elements.
 * @param {object} element The DOM element where errors are displayed.
 * @param {object} formErrors Errors to display, as returned from LForms.Util.checkValidity(domFormElement)
 * @returns true if errors are displayed. false if not.
 */
const displayFormErrors = function (document, element, formErrors) {
    console.log("formErrors", formErrors);
    if (!formErrors || !Array.isArray(formErrors) || formErrors.length <= 0) {
        return false;
    }
    let ul = document.createElement('div'); // ul
    formErrors.forEach((aText) => {
        let li = document.createElement('p'); // li
        li.style.cssText = 'color: #E60B2F; padding-left: 4em;';
        li.appendChild(document.createTextNode(aText));
        ul.appendChild(li);
    });
    let div = document.createElement('div');
    div.innerHTML = '<p>Please <span style="color: #E60B2F;">fix the errors</span>:</p>';
    element.innerHTML = '';
    element.appendChild(div);
    element.appendChild(ul);
    element.scrollIntoView();
    return true;
}

module.exports = displayFormErrors;