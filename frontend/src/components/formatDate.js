import React from "react";

export function formatDate(date) {
  const event = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return event.toLocaleDateString(undefined, options);
}
