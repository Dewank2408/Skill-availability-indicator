# Campus Connect

## DIFFICULTY IN CONNECTING WITH SKILLED AND LIKE-MINDED STUDENTS WITHIN A COLLEGE

A modern website addressing the challenge of connecting skilled and like-minded students within college environments. Built with HTML, CSS, and JavaScript, featuring responsive design, smooth animations, and interactive elements.

## The Problem

Students in colleges often face difficulty connecting with peers who share similar skills, interests, and academic goals. Despite being surrounded by hundreds of talented individuals, finding the right collaborators remains a challenge.

## Our Solution

Campus Connect aims to bridge this gap by providing a platform where students can:
- Find peers based on skills and interests
- Join communities around shared passions
- Discover collaboration opportunities
- Share knowledge and resources
- Form goal-oriented study and project groups
- Network across departments campus-wide

## Website Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional interface with smooth animations
- **Interactive Navigation**: Mobile-friendly hamburger menu with smooth transitions
- **Waitlist Form**: Functional form to collect student information and interests
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Section Navigation**: Active link highlighting based on scroll position
- **Accessibility**: Semantic HTML structure for better accessibility

## Project Structure

```
functional-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet with responsive design
├── js/
│   └── main.js         # JavaScript for interactivity
├── assets/
│   └── images/         # Directory for images
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd functional-website
```

2. Open the website:
   - **Option 1**: Simply open `index.html` in your browser
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. Visit `http://localhost:8000` in your browser

## Usage

### Navigation
- Click on navigation links to smoothly scroll to different sections
- On mobile devices, use the hamburger menu to access navigation

### Waitlist Form
- Fill out the form with your name, college email, skills/interests, and what connections you're looking for
- The form includes client-side validation
- Currently simulates submission (add backend integration for real functionality to store student data)

## Customization

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --text-color: #1f2937;
    /* ... more variables */
}
```

### Content
- Edit `index.html` to modify content
- Update text, images, and sections as needed

### Styling
- Modify `css/styles.css` to adjust styles
- Add custom animations or layouts

### Functionality
- Extend `js/main.js` to add more interactive features
- Integrate with backend services for form submission

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for contact form
- Additional pages (blog, portfolio, etc.)
- Dark mode toggle
- Animations library integration
- Performance optimizations
- SEO enhancements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created with ❤️ for the web

---

**Note**: This is a starter template. Customize it to fit your specific needs!
