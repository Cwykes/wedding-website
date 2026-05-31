function applyGuestTypeVisibility(guestType) {
  const allGuestElements = document.querySelectorAll('[data-guest-type]');
  
  allGuestElements.forEach(element => {
    const allowedTypes = element.getAttribute('data-guest-type').split(',').map(t => t.trim());
    
    if (allowedTypes.includes(guestType)) {
      element.classList.remove('hidden');
      element.style.display = '';
    } else {
      element.classList.add('hidden');
      element.style.display = 'none';
    }
  });
}
