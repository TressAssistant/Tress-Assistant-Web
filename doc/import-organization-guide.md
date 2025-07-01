# Import Organization Guide

To keep your codebase clean and maintainable, follow this import order in your `.jsx` files:

1. **External Libraries**
   - e.g. `import React from 'react';`
   - e.g. `import { Button } from '@mui/material';`

2. **Enums and Constants**
   - e.g. `import Gender from '../../enums/Gender';`

3. **Components**
   - e.g. `import DisplaySubHeader from '../../components/Display/DisplaySubHeader';`

4. **Hooks and Stores**
   - e.g. `import useAppearanceStore from '../../stores/appearanceStore';`

5. **Styles or Other Imports**
   - e.g. `import './styles.css';`

---

## Example
```jsx
import React from 'react';

// Enums and constants
import Gender from '../../enums/Gender';

// Components
import DisplaySubHeader from '../../components/Display/DisplaySubHeader';

// Hooks and stores
import useAppearanceStore from '../../stores/appearanceStore';
```

---

**Tips:**
- Always group imports by category and leave a blank line between groups.
- Use relative paths that are as short as possible.
- Keep import statements at the very top of the file.

Following this structure will make your code easier to read and maintain.
