import * as React from "react"

export function useIsSafari() {
  const [isSafari, setIsSafari] = React.useState<boolean>(false)

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent
    const safari = /^((?!chrome|android).)*safari/i.test(userAgent)
    setIsSafari(safari)
  }, [])

  return isSafari
}