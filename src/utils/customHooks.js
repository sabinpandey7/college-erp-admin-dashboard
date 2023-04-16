import axios from "axios"
import { useEffect, useState } from "react"
import { apiHost } from "./config"

export const useFetch = (uri, token) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${apiHost}/${uri}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setData(res.data)
    } catch (error) {
      console.log(error)
      setData(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [uri, reload])

  return {
    data,
    setReload,
    isLoading,
  }
}
