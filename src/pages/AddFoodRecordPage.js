import React from "react";
import { useLocation } from "react-router-dom";

export default function AddFoodRecordPage() {
  const location = useLocation();
  return (
    <div>
      Page
      {console.log(location)}
    </div>
  );
}
