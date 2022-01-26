
class Input {
    constructor({
        type,
        name,
        isRequired,
        id,
        classes,
        placeholder,
        errorText,
    }) {
        this.type = type;
        this.name = name;
        this.isRequired = isRequired;
        this.id = id;
        this.classes = classes;
        this.placeholder = placeholder;
        this.errorText = errorText;
    }

    render() {
        const input = document.createElement("input");
        input.type = this.type;
        input.name = this.name;
        if (this.isRequired) {
            input.required = this.isRequired;
        }
        input.id = this.id;
        input.classList.add(...this.classes);
        if (this.type === "submit") {
            input.value = this.placeholder;
        } else {
            input.placeholder = this.placeholder;
        }

        input.addEventListener("blur", () => {
            this.handleBlur(input);
        });

        return input;
    }

    handleBlur(input) {
        if (!input.value.trim()) {
            input.setCustomValidity(this.errorText);
            input.checkValidity();
        }
    }
}



export default Input