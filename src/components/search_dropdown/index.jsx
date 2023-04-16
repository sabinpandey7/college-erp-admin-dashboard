import axios from "axios"
import React, { memo, useContext, useState } from "react"
import AsyncSelect from "react-select/async"
import { apiHost } from "../../utils/config"
import { AuthContext } from "../../context/AuthContext"

const SearchDropDown = ({ uri, setValue }) => {
  const {
    state: { token },
  } = useContext(AuthContext)
  const loadOptions = (inputValue, callback) => {
    axios
      .get(`${apiHost}/${uri}&name=${inputValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((value) => {
        callback(value.data)
      })
  }
  return (
    <>
      <AsyncSelect
        onChange={(value) => setValue(value.id)}
        getOptionLabel={(option) => option.name || option.title}
        getOptionValue={(option) => option.id}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
      />
    </>
  )
}

export default memo(SearchDropDown)
