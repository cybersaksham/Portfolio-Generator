# Counter.js File

- This file contains data of counters to showcase.
- Those details are as follows.

```txt
- Icon Class (Bootstrap bi icon class that will appear as icon)
- Count (No of maximum count upto animation should go)
- Duration (Duration in which counter should complete)
- Title (Name of counter item)
```

## Data Structure

```js
String iconClass; // Eg: bi bi-lightbulb-fill
Int count; // Eg: 5
Float duration; // Eg: 0.5
String title; // Eg: "Years of Experience"
```

## Code Structure

```js
const counterItems = [
  {
    icon: iconClass,
    count: count,
    duration: duration,
    title: title,
  },
  ...
];

export default counterItems;
```
