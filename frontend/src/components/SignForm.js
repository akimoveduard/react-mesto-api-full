import React from 'react';

function SignForm ({
  onSubmit,
  title,
  name,
  buttonCaption,
  afterformMarkup='',
  children
}) {

  return (
    <div className="content">
      <section className="signform">
        <div className="signform__wrapper">
          <h2 className="signform__title">{title}</h2>
          <form
            className="form signform__form"
            name={name}
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className="button button_type_submit signform__button"
              name={`${name}-submit`}
            >
              {buttonCaption}
            </button>
          </form>
          {afterformMarkup && afterformMarkup}
        </div>
      </section>
    </div>
  );

}

export default SignForm;