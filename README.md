# Space Portal

This project is a sleek dashboard for important space-related activity
 
## UX

The site has a space feel to it, it uses orbitron font and has a color scheme and background images that are space-focused

### User Stories
 
- As a space enthusiast, I want to know where the ISS is, so I can track it
- As a Satellite vendor, I want to get the most updated news stories to see what is happening in the industry
- As a blogger and former astronaut, I want to be able to email the creators of Space Portal to recommend content they should add to their website 

### Wireframe

![Wireframe](assets/wireframe/wireframe.jpg)

### Page Features

- Parralax page scrolling (html)
- NASA Astronomy Picture of the Day (NASA Open API)
- Current user location in comparison with ISS location (NASA Open API)
- Social Media Feed (Spaceflight Now API)
- Contact Us (EmailJS)
 
### Features Left to Implement

- Calculate the next time the ISS will pass overhead based on your position
- Graph the orbital inclination of the ISS
- Be able to search for a variety of satellites and see their position

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- HTML 
    - The project uses HTML to render the page in the browser
- [CSS](https://stackpath.bootstrapcdn.com)  
    - The project uses CSS to style the pages and uses Bootstrap to improve styling and icons\
- Javascript
    - The project uses Javascript to update elements within the HTML document (DOM) and pull data in from external sources
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Leaflet](https://leafletjs.com)
    - The project uses leaflet to render a map, place the users location, and plot the location of the ISS
- [emailJS](https://emailjs.com)
    - The project uses emailJS to enable users to submit inquiries directly from the page
- [SpaceFlight Now](http://spaceflightnow.com)
    - The project uses the SpaceFlight Now API to pull in images, links, headlines, and brief descriptions for the most up to date space news

## Testing

### Map Choice

- I went with leafletJS over google maps because Google Maps API calls is throttled
- I added the ability to identify an error and console log the respective issues when an API call did not go through
- Reactive design
- Thorough user testing
1. NASA APOD
    1. Is it a video?
    2. Does the file size works
2. ISS position
    1. Don't allow the browser to see your position (is there a default it can revert to)



## Deployment

The deployment at this stage is still relatively simple, once I thoroughly tested the site and got feedback from my mentor, I created a separate Git Branch for the final version and deployed via Github. 

To run the project locally, you should just have to download all the files, place the root in the same folder, and click on index.html to open in browser.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
