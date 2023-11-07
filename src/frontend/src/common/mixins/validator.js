const emailRegex = /^\S+@\S+\.\S+$/;

const rules = {
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
};

const validator = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  methods: {
    $clearValidationErrors() {
      if (!this.validations) {
        return;
      }
      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },
    $validateFields(fields, validations) {
      const validationsKeys = Object.keys(fields);
      let isValid = true;

      Object.keys(validations).forEach((key) => {
        // Валидируем только переданные поля
        if (!validationsKeys.includes(key)) {
          return;
        }

        validations[key].error = validator(fields[key], validations[key].rules);
        if (validations[key].error) {
          isValid = false;
        }
      });
      return isValid;
    },
  },
};
