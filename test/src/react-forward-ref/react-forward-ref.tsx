import React from 'react'

type ButtonOptions = {
  color?: string,
}

export const Button = React.forwardRef<
  HTMLDivElement,
  ButtonOptions
>(
  function Button(props, ref): React.ReactElement {
    return <div ref={ref} style={{ color: props.color }}>button</div>
  }
)
