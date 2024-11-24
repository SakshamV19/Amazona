function createInstagramIcon() {
    // Create a link element
    var link = document.createElement('a');
    // Set the href attribute to your Instagram profile URL
    link.setAttribute('href', 'https://www.instagram.com/precisionauto.in?igsh=MWhxeGxjcTFuenh6eg%3D%3D&utm_source=qr');
    // Set target attribute to "_blank" to open the link in a new tab
    link.setAttribute('target', '_blank');
  
    // Create an image element for the Instagram icon
    var icon = document.createElement('img');
    // Set the source of the image to the Instagram icon image URL
    icon.setAttribute('src', 'instagram_icon.png');
    // Set alt text for accessibility
    icon.setAttribute('alt', 'Instagram Icon');
  
    // Append the Instagram icon image to the link
    link.appendChild(icon);
  
    // Append the link to the document body or any other element
    document.body.appendChild(link);
  }
  
  // Call the function to create the Instagram icon
  createInstagramIcon();
  