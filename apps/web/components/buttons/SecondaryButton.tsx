import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/SecondaryButton.module.scss'

const SecondaryButton = (props) => {
  return (
    <button style={{width: props.width, height: props.height, fontSize: props.fontSize, margin: props.margin, marginTop: props.margintop}} {...props} className={classNames('btn', styles.btn, props.classnameprop)}></button>
  )
}

export default SecondaryButton