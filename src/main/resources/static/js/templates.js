const form = document.getElementById("add");
const listContainer = document.getElementById("List");

function getStoredTemplates() {
    const data = localStorage.getItem("myCodeTemplates");
    return data ? JSON.parse(data) : [];
}

function saveTemplates(templates) {
    localStorage.setItem("myCodeTemplates", JSON.stringify(templates));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newTemplate = {
        id: Date.now().toString(),
        description: formData.get("description"),
        code: formData.get("code")
    };

    const templates = getStoredTemplates();
    templates.push(newTemplate);
    saveTemplates(templates);

    event.target.reset();
    fetchAndDisplay();
});

function fetchAndDisplay() {
    const templates = getStoredTemplates();
    listContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    templates.forEach(template => {
        const div = createTemplateElement(template);
        fragment.appendChild(div);
    });
    listContainer.appendChild(fragment);
}

function createTemplateElement(template) {
    const div = document.createElement("div");
    div.classList.add("template-item");

    const strong = document.createElement("strong");
    strong.textContent = template.description || 'No Description';

    const pre = document.createElement("pre");
    pre.classList.add("code");
    pre.textContent = template.code || '';

    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy-btn");
    copyBtn.dataset.code = template.code || '';
    copyBtn.textContent = "Copy";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = template.id;
    deleteBtn.textContent = "Delete";

    div.append(strong, pre, copyBtn, deleteBtn);
    return div;
}

function deleteTemplate(id) {
    let templates = getStoredTemplates();
    templates = templates.filter(t => t.id !== id);
    saveTemplates(templates);
    fetchAndDisplay();
}

listContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-btn")) {
        deleteTemplate(target.getAttribute("data-id"));
    }
    if (target.classList.contains("copy-btn")) {
        const textToCopy = target.getAttribute("data-code");
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = target.textContent;
            target.textContent = "Copied!";
            setTimeout(() => target.textContent = originalText, 1500);
        });
    }
});

fetchAndDisplay();