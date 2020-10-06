function valid(validations) {
    const validation = {};

    validations.map(
      (rule) => (validation[rule.field] = { isInvalid: false, message: "" })
    );

    return { isValid: true, ...validation };
  }

  export default valid;