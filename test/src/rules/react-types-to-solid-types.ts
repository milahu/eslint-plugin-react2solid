import React from "react"

let onDragStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

let onDragEnd: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

function Button(props): React.ReactElement | null {
  return (
    <div>
      <input type="button"/>
    </div>
  )
}
