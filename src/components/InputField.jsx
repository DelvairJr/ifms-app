import React from 'react'

const InputField = (props) => {

  const { refValue, keyUp, idValue, typeValue, requiredValue, textValue } = props

  return (
    <div >
      <label className="col-form-label" htmlFor={idValue}>{textValue}</label>
      <input className="form-control" ref={refValue} onKeyUp={keyUp} id={idValue} type={typeValue} required={requiredValue} />

    </div>
  )
}

export default InputField
