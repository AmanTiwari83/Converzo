function getCurrentDateAndTime() {
  const now = new Date();

  // Time
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const hour12 = hours % 12 || 12; // Convert to 12-hour format

  // Date
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  let date = `${day}/${month}/${year}`;
  let time = `${hour12}:${String(minutes).padStart(2, '0')}  ${ampm}`

  return { date, time };
}

export default getCurrentDateAndTime