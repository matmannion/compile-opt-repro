'use client';
import { useCallback, useState } from "react";

const availableKeys = {
  a: 1,
  b: 2,
  c: 3
}

const state = {}

function useForceUpdate() {
  const [, setValue] = useState(0)

  return useCallback(() => setValue(value => value + 1), [])
}

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  const forceUpdate = useForceUpdate()

  const onChange = useCallback(key => {
    let val = availableKeys[key]?.defaultValue || ''
    let newKey
    if (key === 'name-with-position') {
      newKey = 'name'
      val = { position: '', suffix: '_name' }
    } else if (key === 'bulkUploadV2') {
      val = {
        ENTER_COLUMN_TITLE_HERE: {},
      }
    }
    val = typeof val === 'object' ? JSON.stringify(val, undefined, 2) : val
    state[newKey || key] = { val, autoFocus: true }
    forceUpdate()
  }, [forceUpdate])

  return <><p>State is {JSON.stringify(state)}</p>
    <button type="button" onClick={() => onChange('buh')}>change me</button>
  </>
}
