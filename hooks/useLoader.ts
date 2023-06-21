import React from "react";

export default function useLoader() {
  const [isLoading, setIsLoading] = React.useState(false);

  return { isLoading, setIsLoading };
}
