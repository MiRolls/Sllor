export default function isPhone(): boolean {
  if (window.innerWidth <= 768) {
    // phone}
    return true;
  } else {
    return false;
  }
}
