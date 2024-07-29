const formElement = document.getElementById("newsletter-form");
const email = formElement.querySelector("#email");
const formPage = document.querySelector(".form-page");
const successPage = document.querySelector(".success-page");

// DISABLE HTML VALIDATION IF JAVASCRIPT IS ENABLED
formElement.setAttribute("novalidate", "");

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ SWITCH VISIBLE SECTIONS FUNCTION ~ ~ ~ ~ ~ ~ ~

const switchVisibleSections = () => {
  formPage.classList.toggle("hidden");
  formPage.classList.toggle("flex");
  successPage.classList.toggle("hidden");
  successPage.classList.toggle("flex");
};

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ CLEAR ALL FORM INPUTS FUNCTION ~ ~ ~ ~ ~ ~ ~

const clearFormInputs = () => {
  formElement.reset();
};

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ UPDATE MESSAGE FUNCTION ~ ~ ~ ~ ~ ~ ~

const updateMessage = (email) => {
  const messageTarget = document.getElementById("confirmed-email");
  messageTarget.textContent = email;
};

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ VALIDATE FORM FUNCTION ~ ~ ~ ~ ~ ~ ~

const validateForm = (formElement) => {
  // TOTAL FORM ERROR COUNTER
  let totalFormErrors = 0;

  // ARRAY OF OPTIONS TO CHECK FOR AND VALIDATE FOR EACH FORM GROUP
  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
    {
      attribute: "pattern",
      isValid: (input) => {
        const patternRegEx = new RegExp(input.getAttribute("pattern"));
        return patternRegEx.test(input.value);
      },
      errorMessage: (input, label) =>
        `Valid ${label.textContent.toLowerCase()} is required`,
    },
  ];

  // VALIDATION FOR EACH SINGLE GROUP
  const validateSingleFormGroup = (formGroup) => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input");
    const errorContainer = formGroup.querySelector(".error");

    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        input.classList.add(
          "bg-vermellionInput",
          "border-vermellion",
          "text-vermellion",
        );
        errorContainer.classList.add("opacity-100");
        formGroupError = true;
        totalFormErrors++;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      input.classList.remove(
        "bg-vermellionInput",
        "border-vermellion",
        "text-vermellion",
      );
      errorContainer.classList.remove("opacity-100");
    }
  };

  // MAKE ARRAY OF FORM GROUPS, THEN LOOP THROUGH AND VALIDATE EACH GROUP
  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".form-group"),
    );

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };

  validateAllFormGroups(formElement);

  return totalFormErrors === 0;
};

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(formElement)) {
    updateMessage(email.value);
    switchVisibleSections();
    clearFormInputs();
  }
});
