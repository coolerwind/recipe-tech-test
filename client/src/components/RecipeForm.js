import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./AddRecipe/validate";

const RecipeForm = (props) => {

  const renderError = ({ touched, error, submitFailed, dirty }) => {
    if ((touched && error) || (dirty && error) || (submitFailed && error)) {
      return <div className="error-message">{error}</div>;
    } else {
      return null;
    }
  };

  const renderField = ({ input, label, type, meta }) => (
    <div>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...input} type={type} placeholder={label} />
      {renderError(meta)}
    </div>
  );

  const renderIngredientsField = ({ input, label, type, meta }) => (
    <>
      <Form.Control
        className="ingredients-input-field"
        {...input}
        type={type}
        placeholder={label}
      />
    </>
  );

  const renderInstructionsField = ({ input, label, type, meta }) => (
    <>
      <textarea
        className="instructions-input-field form-control"
        {...input}
        type={type}
        placeholder={label}
      />
    </>
  );

  const renderIngredients = ({ fields, meta }) => (
    <div className="form-add-multiple">
      <Form.Label>Add ingredients:</Form.Label>
      <ul>
        {fields.map((ingredient, index) => (
          <li key={index} className="d-flex align-items-center">
            <Field
              name={ingredient}
              type="text"
              component={renderIngredientsField}
              label={`Ingedient  ${index + 1}`}
            />
            <Button
              className="delete-btn align-self-stretch"
              size="sm"
              variant="danger"
              type="button"
              title="Remove Ingredient"
              onClick={() => fields.remove(index)}
            >
              <i className="fas fa-trash-alt" />
            </Button>
          </li>
        ))}
        <li>
          <Button
            className="mt-1"
            size="sm"
            variant="secondary"
            type="button"
            onClick={() => fields.push()}
          >
            <i className="plus-icon fas fa-plus" /> Add ingredient
          </Button>
          {renderError(meta)}
        </li>
      </ul>
    </div>
  );

  const renderInstructions = ({ fields, meta }) => (
    <div className="form-add-multiple">
      <Form.Label>Add instructions:</Form.Label>
      <ul>
        {fields.map((ingredient, index) => (
          <li key={index}>
            <Field
              name={ingredient}
              type="textarea"
              component={renderInstructionsField}
              label={`Step ${index + 1}`}
            />
            <Button
              className="align-self-stretch mt-1"
              size="sm"
              variant="danger"
              type="button"
              title="Remove Step"
              onClick={() => fields.remove(index)}
            >
              <i className="plus-icon fas fa-trash-alt" /> Remove
            </Button>
          </li>
        ))}
        <li>
          <Button
            className="mt-1"
            variant="secondary"
            sm={2}
            size="sm"
            type="button"
            onClick={() => fields.push()}
          >
            <i className="plus-icon fas fa-plus" /> Add instruction
          </Button>
          {renderError(meta)}
        </li>
      </ul>
    </div>
  );

  const renderDescriptionField = ({ input, label, type, meta }) => (
    <>
      <Form.Label>{label}</Form.Label>
      <textarea
        className="description-input-field form-control"
        {...input}
        type={type}
        placeholder={label}
      />
      {renderError(meta)}
    </>
  );

  const onSubmit = formValues => {
    const newFormValues = formValues;
    for (let key in newFormValues) {
      if (Array.isArray(newFormValues[key])) {
        newFormValues[key] = newFormValues[key].filter(
          item => item !== undefined
        );
      }
    }
    props.onSubmit(formValues);
  };

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Recipe Name"
      />
      <br />
      <Field
        name="description"
        type="textarea"
        component={renderDescriptionField}
        label="Recipe Description"
      />
      <FieldArray name="ingredients" component={renderIngredients} />

      <FieldArray name="instructions" component={renderInstructions} />
      <hr />
      <div className="submit-btnd-group">
        <Button
          style={{ marginRight: "1rem" }}
          variant="dark"
          type="submit"
          disabled={submitting}
        >
          Submit
        </Button>
        <Button
          variant="outline-dark"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </Button>
      </div>
    </form>
  );
}

export default reduxForm({
  form: "createRecipeForm",
  validate
})(RecipeForm);
