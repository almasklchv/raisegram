import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/PrimaryButton.module.scss'

const PrimaryButton = (props) => {
  return (
    <button {...props} className={classNames('btn', styles.btn)}></button>
  )
}

export default PrimaryButton