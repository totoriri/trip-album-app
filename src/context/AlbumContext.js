import React, { createContext } from "react";

export const AlbumContext = createContext();

const AlbumProvider = (children) => {
  return (
    <AlbumContext.Provider>{children}</AlbumContext.Provider>
  )
}

export default AlbumProvider;