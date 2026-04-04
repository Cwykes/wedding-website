# Day vs Evening Guest Content Guide

## Overview
The website now supports showing different content to day guests and evening guests based on the password they enter in the Gatekeeper.

## How It Works

1. **Gatekeeper Authentication** (`Gatekeeper/Gatekeeper.js`)
   - Day guests enter a password that hashes to: `8f2364e11b8be3ff008f32b3dedb54e659362429bcc9e3eb6acb6070de4ffbff`
   - Evening guests enter a password that hashes to: `458c1fed574354042397e664d6dabe58415c8ab629f052db5723fb42b490d280`
   - The guest type is stored in `sessionStorage.setItem("guestType", "day")` or `sessionStorage.setItem("guestType", "evening")`

2. **JavaScript Logic** (`Index.js`)
   - The `applyGuestTypeVisibility(guestType)` function runs when the page loads
   - It finds all elements with the `data-guest-type` attribute
   - Shows only the elements that match the current guest type
   - Hides all others using the `.hidden` CSS class

## How to Add Day/Evening-Specific Content

### Option 1: Wrap different content in separate divs (Recommended)

```html
<section id="schedule">
  <h1>Schedule</h1>
  
  <!-- Content shown to day guests only -->
  <div data-guest-type="day">
    <h2>Full Day Schedule</h2>
    <ul>
      <li>12:30 PM - Arrival</li>
      <!-- more times -->
    </ul>
  </div>

  <!-- Content shown to evening guests only -->
  <div data-guest-type="evening" class="hidden">
    <h2>Evening Schedule</h2>
    <ul>
      <li>6:00 PM - Arrival</li>
      <!-- more times -->
    </ul>
  </div>
</section>
```

### Option 2: Show content to multiple types

If you want content visible to both types, use a comma-separated list:

```html
<div data-guest-type="day,evening">
  <!-- This shows to both day and evening guests -->
  <p>Parking is available on site</p>
</div>
```

## Updated Sections

Currently, the following sections have day/evening-specific content:

- **Schedule** (`#schedule`) - Different timings for day vs evening guests
- **Menu** (`#menu`) - Different menu names for day vs evening guests

## CSS Class

- `.hidden` - Used to initially hide elements. The JavaScript applies this class dynamically.

## Testing

1. Access the site with a day guest password
2. Verify the "Full Day Schedule" and "Wedding Breakfast Menu" sections appear
3. Access the site with an evening guest password
4. Verify only the "Evening Schedule" and "Evening Food Menu" sections appear

## Future Customization

To add more day/evening-specific content:

1. Wrap the content in a `<div>` with the `data-guest-type` attribute
2. Set `data-guest-type="day"` for day-only content
3. Set `data-guest-type="evening"` for evening-only content
4. Add `class="hidden"` to evening content initially (it will be shown if matching)
5. No JavaScript changes needed!
