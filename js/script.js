// #1 Creating Global Variables
const studentList = document.querySelector('.student-list').children;
const numberOfItems = 10;

// Extra Credit 1: Adding a search component
const div = document.createElement('div');
div.className = 'student-search';
div.innerHTML = `
   <input placeholder='Search for Students...'>
   <button>Search</button>
`;

document.querySelector('.page-header').appendChild(div);

// #2 Displaying a “page”
displayPage = (list, page) => {
   const startIndex = (page * numberOfItems) - numberOfItems;
   const endIndex = page * numberOfItems;

   for (let i = 0; i < list.length; i++){ 
      if(i >= startIndex && i < endIndex){
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   } 
}

// #3 Adding Pagination links
 appendPageLinks = (list) =>  {
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');
   div.appendChild(ul);
   const pageNumber = list.length / numberOfItems;

   for(let i = 0; i < pageNumber; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = '#';
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
   }

   if(ul.children.length > 0) {
      ul.children[0].firstElementChild.className = 'active';
   }

   document.querySelector('.page').appendChild(div);

   displayPage(list, 1);

   const a = document.querySelectorAll('.pagination a');
   a.forEach(link => {
      link.addEventListener('click', (e) => {
         e.preventDefault();
         a.forEach(link => link.className = '');
         e.target.className = 'active';
         displayPage(list, e.target.textContent);
      });
   });
}

// Extra Credit 2: Triggering the Event + Adding functionality
const searchInput = document.querySelector('.student-search').firstElementChild;
searchInput.addEventListener('keyup', e => {
   search(e);
});

searchInput.addEventListener( 'change', e => search(e) );

function search(input) {
   if(document.querySelector('.error')){
      document.querySelector('.error').remove();
   }
   // Extra Credit 3: Paginating search results
   const searchResults = [];

   Array.from(studentList).forEach(student => {
      if(student.textContent.includes(input.target.value.toLowerCase())){
         searchResults.push(student);
         student.style.display = 'block';
      } else {
         student.style.display = 'none';
      }
   });

   const pagination = document.querySelector('.pagination');
   pagination.remove();
   // Extra Credits 4: Handling no results returned
   if(searchResults.length <= 0) {
      const page = document.querySelector('.page');
      const h1 = document.createElement('h1');
      h1.className = 'error';
      h1.textContent = `No Results`;
      const h1Style = h1.style;
      h1Style.textTransform = 'uppercase';
      h1Style.textAlign = 'center'
      h1Style.fontWeight = 'bold';
      h1Style.fontSize = '3rem'
      page.appendChild(h1);
   }

   appendPageLinks(searchResults);

}


appendPageLinks(studentList);
