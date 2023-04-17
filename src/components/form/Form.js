import React from 'react'

import { Form as FinalForm } from 'react-final-form'

// Component
const Form = props => {
  const { initialValues = {}, onSubmit, children, ...rest } = props

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={renderProps => {
        const { handleSubmit, ...formProps } = renderProps
        return <form onSubmit={handleSubmit}>{React.cloneElement(children, formProps)}</form>
      }}
      {...rest}
    />
  )
}

export default Form
