navigation = [];

fetch('2025.json')
.then(res => res.json())
.then(data => {
  const container = document.getElementById('projectsContainer');

  data.forEach(section => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'categorie';

    const categoryTitle = document.createElement('p');
    categoryTitle.className = 'categoryTitle';
    categoryTitle.textContent = section.header;

    const categoryRef = document.createElement('div');
    categoryRef.className = 'categoryRef';
    if(section.header) {
      const headerRef = formatTitleToRef(section.header);
      categoryRef.id = headerRef;
      const headerTitle = section.header;
      navigation.push({"title": headerTitle, "ref": headerRef});
    }

    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(categoryRef);

    section.content.forEach(project => {
      
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';
      //projectDiv.id = project.id;

      const projectRef = document.createElement('div');
      projectRef.className = 'projectRef';
      projectRef.id = formatTitleToRef(project.title);

      const projectTitle = document.createElement('p');
      projectTitle.className = 'projectTitle';

      if(project.year === "") {
      projectTitle.innerHTML = `
        ${project.title}<br>
        ${project.subtitle}<br><brW
      `;   
      } else {
        projectTitle.innerHTML = `
        ${project.title}<br>
        ${project.subtitle}<br>
        ${project.year}<br><br>
      `;
      }

      const projectText = document.createElement('p');
      projectText.className = 'project_text';
      projectText.innerHTML = project.description.replace(/\n/g, '<br>');

      projectDiv.appendChild(projectRef);
      projectDiv.appendChild(projectTitle);
      // projectDiv.appendChild(projectText);

      const imageContainer = document.createElement('div');
      imageContainer.className = 'imageContainer';
      (project.images || []).forEach(img => {
        const anchor = document.createElement('a');
        anchor.href = `${img.path}`;
        anchor.target = '_blank';
      
        const image = document.createElement('img');
        image.src = `${img.pathLow}`;
        image.loading="lazy"
      
        // Create container for the image(s) if not already inside one
        let imageContainer = projectDiv.querySelector('.imageContainer');
        if (!imageContainer) {
          imageContainer = document.createElement('div');
          imageContainer.className = 'imageContainer';
          projectDiv.appendChild(imageContainer);
        }
      
        // Set width dynamically based on image size
        let width;
        switch (img.size) {
          case 2:
            width = "calc(50% - 2.5px)"; break;
          case 3:
            width = "calc(33% - 2.5px)"; break;
          case 4:
            width = "calc(25% - 2.5px)"; break;
          default:
            width = '100%'; break;
        }
      
        anchor.style.width = width;
        anchor.style.display = 'block';
        image.style.width = '100%';
        image.style.display = 'block';
      
        anchor.appendChild(image);
        imageContainer.appendChild(anchor);
      });

      projectDiv.appendChild(imageContainer); // Add the image container to the project

      categoryDiv.appendChild(projectDiv);
    });

    container.appendChild(categoryDiv);
  });

  generateNavigation();
})
.catch(err => console.error('Error loading projects:', err));

function formatTitleToRef(title) {
  return title.toLowerCase().replace(/\s+/g, '') + 'ref';
}

function generateNavigation() {
  const work = document.getElementById("work");
  navigation.reverse();

  navigation.forEach((navigationItem, index) => {
  const navItem = document.createElement("li");
  const navLink = document.createElement("a");

  navLink.className = "navLarge";
  navLink.href = `#${navigationItem.ref}`;
  navLink.innerHTML = navigationItem.title;

  navItem.appendChild(navLink);

  work.after(navLink)
  });
}
